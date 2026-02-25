const vscode = require("vscode");

/**
 * Speciesist language patterns mapped to their suggested alternatives.
 *
 * Each entry contains:
 *   pattern  - A case-insensitive RegExp that matches the speciesist phrase.
 *              Word boundaries (\b) prevent false positives inside larger words.
 *   phrase   - The human-readable label shown in the diagnostic message.
 *   suggest  - The recommended replacement text.
 *
 * Order matters: longer / more-specific patterns are listed first so that
 * "beating a dead horse" is matched before a hypothetical shorter variant.
 */
const PATTERNS = [
  {
    pattern: /\bkill two birds with one stone\b/gi,
    phrase: "kill two birds with one stone",
    suggest: "accomplish two things at once",
  },
  {
    pattern: /\bbeating a dead horse\b/gi,
    phrase: "beating a dead horse",
    suggest: "belaboring the point",
  },
  {
    pattern: /\bbeat a dead horse\b/gi,
    phrase: "beat a dead horse",
    suggest: "belabor the point",
  },
  {
    pattern: /\bbring home the bacon\b/gi,
    phrase: "bring home the bacon",
    suggest: "bring home the results",
  },
  {
    pattern: /\bguinea pig\b/gi,
    phrase: "guinea pig",
    suggest: "test subject",
  },
  {
    pattern: /\bmore than one way to skin a cat\b/gi,
    phrase: "more than one way to skin a cat",
    suggest: "more than one way to solve this",
  },
  {
    pattern: /\blet the cat out of the bag\b/gi,
    phrase: "let the cat out of the bag",
    suggest: "reveal the secret",
  },
  {
    pattern: /\bopen a can of worms\b/gi,
    phrase: "open a can of worms",
    suggest: "create a complicated situation",
  },
  {
    pattern: /\bwild goose chase\b/gi,
    phrase: "wild goose chase",
    suggest: "pointless pursuit",
  },
  {
    pattern: /\bsacred cows\b/gi,
    phrase: "sacred cows",
    suggest: "unquestioned beliefs",
  },
  {
    pattern: /\bsacred cow\b/gi,
    phrase: "sacred cow",
    suggest: "unquestioned belief",
  },
  {
    pattern: /\bcattle vs\.?\s*pets\b/gi,
    phrase: "cattle vs. pets",
    suggest: "ephemeral vs. persistent",
  },
  {
    pattern: /\bcanary deployment\b/gi,
    phrase: "canary deployment",
    suggest: "progressive rollout",
  },
  {
    pattern: /\bcanary release\b/gi,
    phrase: "canary release",
    suggest: "progressive rollout",
  },
  {
    pattern: /\bmonkey[\s-]?patch/gi,
    phrase: "monkey patch",
    suggest: "runtime patch",
  },
  {
    pattern: /\bdogfooding\b/gi,
    phrase: "dogfooding",
    suggest: "self-hosting",
  },
  {
    pattern: /\blike shooting fish in a barrel\b/gi,
    phrase: "like shooting fish in a barrel",
    suggest: "extremely easy",
  },
];

/** Map config strings to VS Code DiagnosticSeverity values. */
const SEVERITY_MAP = {
  error: vscode.DiagnosticSeverity.Error,
  warning: vscode.DiagnosticSeverity.Warning,
  information: vscode.DiagnosticSeverity.Information,
  hint: vscode.DiagnosticSeverity.Hint,
};

/** The unique diagnostic source identifier shown in the Problems panel. */
const DIAGNOSTIC_SOURCE = "Speciesist Language Scanner";

/** Code used to link diagnostics to their quick-fix code actions. */
const DIAGNOSTIC_CODE = "speciesism";

/**
 * Scan a TextDocument and return an array of Diagnostics for every
 * speciesist phrase found.
 */
function scanDocument(document) {
  const config = vscode.workspace.getConfiguration("speciesism");

  if (!config.get("enable", true)) {
    return [];
  }

  const severityKey = config.get("severity", "warning");
  const severity =
    SEVERITY_MAP[severityKey] ?? vscode.DiagnosticSeverity.Warning;

  const text = document.getText();
  const diagnostics = [];

  for (const entry of PATTERNS) {
    // Reset lastIndex — RegExp objects with the `g` flag are stateful.
    entry.pattern.lastIndex = 0;

    let match;
    while ((match = entry.pattern.exec(text)) !== null) {
      const startPos = document.positionAt(match.index);
      const endPos = document.positionAt(match.index + match[0].length);
      const range = new vscode.Range(startPos, endPos);

      const diag = new vscode.Diagnostic(
        range,
        `Speciesist language: "${entry.phrase}". Consider: "${entry.suggest}" (speciesism)`,
        severity
      );
      diag.source = DIAGNOSTIC_SOURCE;
      diag.code = DIAGNOSTIC_CODE;

      // Stash the suggestion on the diagnostic so CodeActions can read it.
      diag._suggestion = entry.suggest;

      diagnostics.push(diag);
    }
  }

  return diagnostics;
}

/**
 * CodeActionProvider that offers quick-fix replacements for every
 * speciesist-language diagnostic in the current selection / range.
 */
class SpeciesismCodeActionProvider {
  provideCodeActions(document, range, context) {
    const actions = [];

    for (const diag of context.diagnostics) {
      if (diag.code !== DIAGNOSTIC_CODE) continue;

      const suggestion = diag._suggestion;
      if (!suggestion) continue;

      const matchedText = document.getText(diag.range);

      // Preserve the original casing style of the first character.
      let replacement = suggestion;
      if (matchedText[0] === matchedText[0].toUpperCase()) {
        replacement =
          replacement.charAt(0).toUpperCase() + replacement.slice(1);
      }

      const fix = new vscode.CodeAction(
        `Replace with "${replacement}"`,
        vscode.CodeActionKind.QuickFix
      );
      fix.edit = new vscode.WorkspaceEdit();
      fix.edit.replace(document.uri, diag.range, replacement);
      fix.diagnostics = [diag];
      fix.isPreferred = true;

      actions.push(fix);
    }

    return actions;
  }
}

// ---------------------------------------------------------------------------
// Extension lifecycle
// ---------------------------------------------------------------------------

/** @type {vscode.DiagnosticCollection | undefined} */
let diagnosticCollection;

/** @type {NodeJS.Timeout | undefined} */
let debounceTimer;

const DEBOUNCE_MS = 300;

/**
 * Schedule a diagnostic scan for the given document, debounced so that
 * rapid keystrokes don't thrash the scanner.
 */
function scheduleScan(document) {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  debounceTimer = setTimeout(() => {
    if (diagnosticCollection) {
      diagnosticCollection.set(document.uri, scanDocument(document));
    }
  }, DEBOUNCE_MS);
}

/**
 * Called by VS Code when the extension is activated.
 *
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  diagnosticCollection =
    vscode.languages.createDiagnosticCollection("speciesism");

  // Register the code-action provider for all languages.
  const codeActionProvider = vscode.languages.registerCodeActionsProvider(
    { scheme: "file", language: "*" },
    new SpeciesismCodeActionProvider(),
    { providedCodeActionKinds: [vscode.CodeActionKind.QuickFix] }
  );

  // Scan the active editor on activation.
  if (vscode.window.activeTextEditor) {
    scheduleScan(vscode.window.activeTextEditor.document);
  }

  // Scan when a document is opened.
  const onOpen = vscode.workspace.onDidOpenTextDocument((doc) => {
    scheduleScan(doc);
  });

  // Re-scan on every edit (debounced).
  const onChange = vscode.workspace.onDidChangeTextDocument((event) => {
    scheduleScan(event.document);
  });

  // Re-scan on save (immediate).
  const onSave = vscode.workspace.onDidSaveTextDocument((doc) => {
    if (diagnosticCollection) {
      diagnosticCollection.set(doc.uri, scanDocument(doc));
    }
  });

  // Clear diagnostics when a document is closed.
  const onClose = vscode.workspace.onDidCloseTextDocument((doc) => {
    if (diagnosticCollection) {
      diagnosticCollection.delete(doc.uri);
    }
  });

  // Re-scan when configuration changes.
  const onConfig = vscode.workspace.onDidChangeConfiguration((event) => {
    if (event.affectsConfiguration("speciesism")) {
      // Re-scan all visible editors.
      for (const editor of vscode.window.visibleTextEditors) {
        if (diagnosticCollection) {
          diagnosticCollection.set(
            editor.document.uri,
            scanDocument(editor.document)
          );
        }
      }
    }
  });

  context.subscriptions.push(
    diagnosticCollection,
    codeActionProvider,
    onOpen,
    onChange,
    onSave,
    onClose,
    onConfig
  );
}

/**
 * Called by VS Code when the extension is deactivated.
 */
function deactivate() {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  if (diagnosticCollection) {
    diagnosticCollection.clear();
    diagnosticCollection.dispose();
  }
}

module.exports = { activate, deactivate };
