// AUTO-GENERATED from project-compassionate-code. Do not edit directly.
const vscode = require("vscode");

/**
 * Animal violence language patterns mapped to their suggested alternatives.
 *
 * Each entry contains:
 *   pattern  - A case-insensitive RegExp that matches the violent animal phrase.
 *              Word boundaries (\b) prevent false positives inside larger words.
 *   phrase   - The human-readable label shown in the diagnostic message.
 *   suggest  - The recommended replacement text.
 *
 * Order matters: longer / more-specific patterns are listed first so that
 * "beating a dead horse" is matched before a hypothetical shorter variant.
 */
const PATTERNS = [
  {
    pattern: /\bkill\s+two\s+birds\s+with\s+one\s+stone\b/gi,
    phrase: "kill two birds with one stone",
    suggest: "accomplish two things at once",
  },
  {
    pattern: /\bbeat(ing)?\s+a\s+dead\s+horse\b/gi,
    phrase: "beat a dead horse",
    suggest: "belabor the point",
  },
  {
    pattern: /\bmore\s+than\s+one\s+way\s+to\s+skin\s+a\s+cat\b/gi,
    phrase: "more than one way to skin a cat",
    suggest: "more than one way to solve this",
  },
  {
    pattern: /\blet\s+the\s+cat\s+out\s+of\s+the\s+bag\b/gi,
    phrase: "let the cat out of the bag",
    suggest: "reveal the secret",
  },
  {
    pattern: /\bopen(ing)?\s+a\s+can\s+of\s+worms\b/gi,
    phrase: "open a can of worms",
    suggest: "create a complicated situation",
  },
  {
    pattern: /\bwild\s+goose\s+chase\b/gi,
    phrase: "wild goose chase",
    suggest: "futile search",
  },
  {
    pattern: /\blike\s+shooting\s+fish\s+in\s+a\s+barrel\b/gi,
    phrase: "like shooting fish in a barrel",
    suggest: "trivially easy",
  },
  {
    pattern: /\bflog(ging)?\s+a\s+dead\s+horse\b/gi,
    phrase: "flog a dead horse",
    suggest: "belabor the point",
  },
  {
    pattern: /\bbigger\s+fish\s+to\s+fry\b/gi,
    phrase: "there are bigger fish to fry",
    suggest: "more important matters to address",
  },
  {
    pattern: /\bguinea\s+pig\b/gi,
    phrase: "guinea pig",
    suggest: "test subject",
  },
  {
    pattern: /\bhold\s+your\s+horses\b/gi,
    phrase: "hold your horses",
    suggest: "wait a moment",
  },
  {
    pattern: /\bthe\s+elephant\s+in\s+the\s+room\b/gi,
    phrase: "the elephant in the room",
    suggest: "the obvious issue",
  },
  {
    pattern: /\bstraight\s+from\s+the\s+horse'?s\s+mouth\b/gi,
    phrase: "straight from the horse's mouth",
    suggest: "directly from the source",
  },
  {
    pattern: /\bbring(ing)?\s+home\s+the\s+bacon\b/gi,
    phrase: "bring home the bacon",
    suggest: "bring home the results",
  },
  {
    pattern: /\btake?(ing|ook)?\s+the\s+bull\s+by\s+the\s+horns\b/gi,
    phrase: "take the bull by the horns",
    suggest: "face the challenge head-on",
  },
  {
    pattern: /\blike\s+lambs?\s+to\s+(the\s+)?slaughter\b/gi,
    phrase: "like lambs to the slaughter",
    suggest: "without resistance",
  },
  {
    pattern: /\bno\s+room\s+to\s+swing\s+a\s+cat\b/gi,
    phrase: "no room to swing a cat",
    suggest: "very cramped",
  },
  {
    pattern: /\bred\s+herring\b/gi,
    phrase: "red herring",
    suggest: "distraction",
  },
  {
    pattern: /\bdon'?t\s+be\s+a\s+chicken\b/gi,
    phrase: "don't be a chicken",
    suggest: "don't hesitate",
  },
  {
    pattern: /\b(code|memory|resource)\s+pig\b/gi,
    phrase: "pig",
    suggest: "resource-intensive",
  },
  {
    pattern: /\bcowboy\s+cod(ing|er)\b/gi,
    phrase: "cowboy coding",
    suggest: "undisciplined coding",
  },
  {
    pattern: /\bcode\s+monkeys?\b/gi,
    phrase: "code monkey",
    suggest: "developer",
  },
  {
    pattern: /\bcattle\s+(vs?\.?|versus)\s+pets?\b/gi,
    phrase: "cattle vs. pets",
    suggest: "ephemeral vs. persistent",
  },
  {
    pattern: /\bpet\s+project\b/gi,
    phrase: "pet project",
    suggest: "side project",
  },
  {
    pattern: /\bcanary\s+in\s+(a|the)\s+coal\s+mine\b/gi,
    phrase: "canary in a coal mine",
    suggest: "early warning signal",
  },
  {
    pattern: /\bdog\s?food(ing)?\b/gi,
    phrase: "dogfooding",
    suggest: "self-hosting",
  },
  {
    pattern: /\bherding\s+cats\b/gi,
    phrase: "herding cats",
    suggest: "coordinating independent contributors",
  },
  {
    pattern: /\bfishing\s+expedition\b/gi,
    phrase: "go on a fishing expedition",
    suggest: "exploratory investigation",
  },
  {
    pattern: /\bsacred\s+cows?\b/gi,
    phrase: "sacred cow",
    suggest: "unquestioned belief",
  },
  {
    pattern: /\bscapegoat(ed|ing|s)?\b/gi,
    phrase: "scapegoat",
    suggest: "blame target",
  },
  {
    pattern: /\brat\s+race\b/gi,
    phrase: "rat race",
    suggest: "daily grind",
  },
  {
    pattern: /\bdead[\s_-]?cat[\s_-]?bounce\b/gi,
    phrase: "dead cat bounce",
    suggest: "temporary rebound",
  },
  {
    pattern: /\bdog[\s-]eat[\s-]dog\b/gi,
    phrase: "dog-eat-dog",
    suggest: "ruthlessly competitive",
  },
  {
    pattern: /\bwhack[\s-]a[\s-]mole\b/gi,
    phrase: "whack-a-mole",
    suggest: "recurring problem",
  },
  {
    pattern: /\bkill\s+(the\s+)?process\b/gi,
    phrase: "kill process",
    suggest: "terminate the process",
  },
  {
    pattern: /\bkill\s+(the\s+)?server\b/gi,
    phrase: "kill the server",
    suggest: "stop the server",
  },
  {
    pattern: /\bnuke\s+(it|the|this|that|everything)\b/gi,
    phrase: "nuke",
    suggest: "delete completely",
  },
  {
    pattern: /\babort(ed|ing)?\b/gi,
    phrase: "abort",
    suggest: "cancel",
  },
  {
    pattern: /\b(master|slave)\b/gi,
    phrase: "master/slave",
    suggest: "primary/replica",
  },
  {
    pattern: /\b(white|black)list\b/gi,
    phrase: "whitelist/blacklist",
    suggest: "allowlist/denylist",
  },
  {
    pattern: /\bgrandfather(ed|ing)?\b/gi,
    phrase: "grandfathered",
    suggest: "legacy",
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
const DIAGNOSTIC_SOURCE = "Animal Violence Language Scanner";

/** Code used to link diagnostics to their quick-fix code actions. */
const DIAGNOSTIC_CODE = "animal-violence";

/**
 * Scan a TextDocument and return an array of Diagnostics for every
 * animal-violence phrase found.
 */
function scanDocument(document) {
  const config = vscode.workspace.getConfiguration("noAnimalViolence");

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
        `Animal violence language: "${entry.phrase}". Consider: "${entry.suggest}"`,
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
 * animal-violence-language diagnostic in the current selection / range.
 */
class NoAnimalViolenceCodeActionProvider {
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
    vscode.languages.createDiagnosticCollection("noAnimalViolence");

  // Register the code-action provider for all languages.
  const codeActionProvider = vscode.languages.registerCodeActionsProvider(
    { scheme: "file", language: "*" },
    new NoAnimalViolenceCodeActionProvider(),
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
    if (event.affectsConfiguration("noAnimalViolence")) {
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
