# No Animal Violence — VS Code Extension

[![VS Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/open-paws.vscode-no-animal-violence?label=marketplace)](https://marketplace.visualstudio.com/items?itemName=open-paws.vscode-no-animal-violence)
[![VS Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/open-paws.vscode-no-animal-violence)](https://marketplace.visualstudio.com/items?itemName=open-paws.vscode-no-animal-violence)
[![License: MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/Open-Paws/vscode-no-animal-violence)](https://github.com/Open-Paws/vscode-no-animal-violence/commits/main)

A VS Code extension that detects speciesist language in code, comments, and documentation in real time — and offers one-click Quick Fix replacements with clearer alternatives. It covers 65+ patterns: idioms that trivialize animal harm, industry euphemisms (e.g. "processing plant", "livestock"), and developer-specific terms (e.g. "cattle vs. pets", "dogfooding"). It is the IDE-level layer of a suite that enforces the same canonical rule dictionary across pre-commit hooks, CI, ESLint, PR review automation, and AI agent runtimes.

> [!NOTE]
> This project is part of the [Open Paws](https://openpaws.ai) ecosystem — AI infrastructure for the animal liberation movement. [Explore the full platform →](https://github.com/Open-Paws)

<!-- TODO: add a screenshot of the extension highlighting a violation in VS Code with the Quick Fix lightbulb visible -->

## Quickstart

1. **Install** — search for **"Animal Violence Language Scanner"** in the VS Code Extensions panel, or install from the [VS Marketplace](https://marketplace.visualstudio.com/items?itemName=open-paws.vscode-no-animal-violence).
2. **Open any file** — the extension activates immediately for all file types.
3. **See violations** — speciesist phrases are underlined; the **Problems** panel (`Ctrl+Shift+M`) lists each match with its suggested alternative.
4. **Apply Quick Fix** — place your cursor on a flagged phrase and press `Ctrl+.` (or click the lightbulb icon), then press `Enter` to apply the replacement.
5. **Configure** — add `noAnimalViolence.enable` or `noAnimalViolence.severity` to your `settings.json` to tune behavior per workspace.

### Install from VSIX (pre-release or local build)

```bash
git clone https://github.com/Open-Paws/vscode-no-animal-violence.git
cd vscode-no-animal-violence
npx @vscode/vsce package
# Then: VS Code Command Palette → "Extensions: Install from VSIX..." → select the .vsix file
```

### Run in Extension Development Host

Open this repository in VS Code and press `F5`. A new VS Code window opens with the extension loaded and ready to test immediately.

## Features

### Real-Time Diagnostics

The extension scans every open document using 65+ case-insensitive regex patterns with word boundaries. Matches appear as squiggly underlines at warning severity by default. The Problems panel (`Ctrl+Shift+M`) shows the full list with suggested alternatives.

**Example:** typing `// TODO: don't beat a dead horse here` triggers:
> Animal violence language: "beat a dead horse". Consider: "belabor the point"

### Quick Fix Replacements

Place the cursor on a flagged phrase and press `Ctrl+.` to see the replacement action. The fix preserves the original casing — if the phrase starts with an uppercase letter, the replacement does too. The action is marked as the preferred fix, so `Ctrl+.` → `Enter` applies it in one keystroke.

### Works Across All File Types

The extension activates for every file type (`onLanguage:*`). It scans raw document text, so it catches speciesist phrases in comments, string literals, documentation, Markdown, shell scripts, YAML configs, and anywhere else text appears.

### Configuration-Aware Rescanning

Scanning and severity are configurable per workspace. Changes take effect immediately without restarting — all visible editors are rescanned when settings change.

### Detected Pattern Categories

| Category | Examples |
|---|---|
| Idioms | "beat a dead horse", "kill two birds with one stone", "let the cat out of the bag" |
| Industry euphemisms | "livestock" → farmed animals, "processing plant" → slaughterhouse, "humane slaughter" → slaughter |
| Developer terms | "cattle vs. pets" → ephemeral vs. persistent, "dogfooding" → self-hosting, "code monkey" → developer |
| Tech terminology | "master/slave" → primary/replica, "whitelist/blacklist" → allowlist/denylist, "kill the process" → terminate the process |

The full pattern dictionary (65+ entries) is in [`extension.js`](extension.js). Patterns are auto-generated from the [`project-compassionate-code`](https://github.com/Open-Paws/project-compassionate-code) pipeline — submit pattern additions through that pipeline, not as direct edits to `extension.js`.

## Configuration

Set these in your `settings.json` (user or workspace):

| Setting | Type | Default | Description |
|---|---|---|---|
| `noAnimalViolence.enable` | boolean | `true` | Enable or disable scanning globally |
| `noAnimalViolence.severity` | string | `"warning"` | Diagnostic severity: `"error"`, `"warning"`, `"information"`, or `"hint"` |

> **Note:** `package.json` currently declares settings under the `speciesism.*` namespace. The runtime code reads `noAnimalViolence.*`. Use `noAnimalViolence.*` in your `settings.json` until this discrepancy is resolved.

**Example workspace settings:**

```json
{
  "noAnimalViolence.enable": true,
  "noAnimalViolence.severity": "information"
}
```

## Documentation

- [Pattern source of truth — no-animal-violence](https://github.com/Open-Paws/no-animal-violence)
- [Pattern generation pipeline — project-compassionate-code](https://github.com/Open-Paws/project-compassionate-code)
- [Full ecosystem tool list](#ecosystem)
- [Contributing — proposing new patterns](#contributing)

## Architecture

<details>
<summary>Internal structure</summary>

Single-file, no-build architecture — the entire extension is `extension.js` with no bundler or compilation step. VS Code requires `^1.74.0`.

**Three responsibilities, kept separate:**

1. **Pattern dictionary** (`PATTERNS` array) — auto-generated array of `{ pattern, phrase, suggest }` objects. Case-insensitive RegExp with word boundaries. Longer/more-specific patterns listed first to avoid partial shadowing. Do not edit this array manually.

2. **Diagnostic provider** (`scanDocument` function) — reads `noAnimalViolence.enable` and `noAnimalViolence.severity` from workspace config, iterates `PATTERNS` against the document text, creates `vscode.Diagnostic` objects with `_suggestion` stashed for Quick Fix access. Scans are debounced at 300 ms on change events, immediate on save.

3. **Code action provider** (`NoAnimalViolenceCodeActionProvider`) — reads `_suggestion` from each matching diagnostic, preserves original casing, creates a `QuickFix` `CodeAction` marked as `isPreferred`. Registered for `{ scheme: "file", language: "*" }`.

**Extension lifecycle:**
- `activate` — creates the `DiagnosticCollection`, registers the code-action provider, wires up `onDidOpenTextDocument`, `onDidChangeTextDocument`, `onDidSaveTextDocument`, `onDidCloseTextDocument`, and `onDidChangeConfiguration` listeners.
- `deactivate` — clears the debounce timer, clears and disposes the `DiagnosticCollection`.

**Key files:**

| File | Purpose |
|---|---|
| `extension.js` | Full extension — pattern dictionary, diagnostics, Quick Fix provider, lifecycle |
| `package.json` | Extension manifest, activation events (`onLanguage:*`), VS Code config schema |
| `tests/placeholder.test.js` | Placeholder test suite (Node.js built-in test runner) |
| `biome.json` | Biome linter configuration |
| `.pre-commit-config.yaml` | Pre-commit hooks |

**No external runtime dependencies.** Dev dependency: `@biomejs/biome` for linting.

</details>

## Contributing

Issues and pull requests are welcome at [Open-Paws/vscode-no-animal-violence](https://github.com/Open-Paws/vscode-no-animal-violence). If you work in animal advocacy or want to help build movement infrastructure, this is a good first project — the codebase is a single JavaScript file with no build step.

### Build and Test

```bash
# Package the extension as a .vsix file
npx @vscode/vsce package

# Run the placeholder test suite (Node.js built-in test runner)
node --test tests/placeholder.test.js

# Run the linter (Biome)
npx @biomejs/biome check .

# Maintain desloppify score ≥85
desloppify scan --path .
```

### Manual Testing (Extension Development Host)

1. Open this repository in VS Code.
2. Press `F5` — a new VS Code window opens.
3. Open any file and type a known phrase (e.g. `// beat a dead horse`).
4. Verify: squiggly underline appears, Problems panel shows the diagnostic, `Ctrl+.` offers the Quick Fix.
5. Verify `noAnimalViolence.enable: false` suppresses all diagnostics.
6. Verify that changing `noAnimalViolence.severity` to `"error"` updates the squiggly color without restarting.

### Proposing New Patterns

Pattern changes go through the [`project-compassionate-code`](https://github.com/Open-Paws/project-compassionate-code) auto-generation pipeline. To propose a new pattern, open an issue with:
- The phrase to detect
- Why it is speciesist
- The suggested alternative
- A regex that matches it with word boundaries

### Code Standards

- Single-file, no-build architecture — resist adding a build step or bundler.
- Every catch block must handle a specific error; never suppress silently.
- New patterns require manual verification in the Extension Development Host before release.
- Run `desloppify scan --path .` and maintain a score of 85 or higher.

## Ecosystem

This extension is the IDE layer of a suite that enforces the same canonical rule dictionary across the full developer workflow:

| Tool | Enforcement point |
|---|---|
| **This extension** | Real-time, in the editor as you type |
| [no-animal-violence](https://github.com/Open-Paws/no-animal-violence) | Canonical rule dictionary (source of truth) |
| [no-animal-violence-pre-commit](https://github.com/Open-Paws/no-animal-violence-pre-commit) | Local git commit hook |
| [semgrep-rules-no-animal-violence](https://github.com/Open-Paws/semgrep-rules-no-animal-violence) | CI pipeline (Semgrep) |
| [eslint-plugin-no-animal-violence](https://github.com/Open-Paws/eslint-plugin-no-animal-violence) | ESLint / JS/TS linting |
| [danger-plugin-no-animal-violence](https://github.com/Open-Paws/danger-plugin-no-animal-violence) | PR review automation (Danger.js) |
| [reviewdog-no-animal-violence](https://github.com/Open-Paws/reviewdog-no-animal-violence) | PR inline annotations (reviewdog) |
| [no-animal-violence-action](https://github.com/Open-Paws/no-animal-violence-action) | GitHub Actions CI check |
| [vale-no-animal-violence](https://github.com/Open-Paws/vale-no-animal-violence) | Prose linting (Vale) |

## Impact and Adoption

<!-- TODO: add VS Marketplace install count once available from the marketplace dashboard -->

The extension is published under the `open-paws` publisher ID on the VS Marketplace. Marketplace install metrics are not yet instrumented into the org's Lever 3 tracking — this is a known gap noted in the strategy repo.

The extension is recommended as the standard real-time language checker for all Open Paws developers and is included in contributor onboarding setup instructions.

## License and Acknowledgments

[MIT](LICENSE) — Open Paws, a 501(c)(3) nonprofit.

Pattern dictionary sourced from the [no-animal-violence](https://github.com/Open-Paws/no-animal-violence) canonical rule set, auto-generated via the [project-compassionate-code](https://github.com/Open-Paws/project-compassionate-code) pipeline.

Academic grounding:
- Dunayer, J. (2001). *Animal Equality: Language and Liberation*. Ryce Publishing.
- Stibbe, A. (2012). *Animals Erased: Discourse, Ecology and Reconnection with the Natural World*. Wesleyan University Press.
- Singer, P. (1975). *Animal Liberation*. HarperCollins.

---

<!-- metadata
tech_stack: JavaScript, VS Code Extension API
project_status: active development (v0.1.0)
difficulty: beginner-friendly
skill_tags: vscode-extension, language-server, regex, advocacy-tooling, speciesist-language
related_repos: no-animal-violence, project-compassionate-code, eslint-plugin-no-animal-violence, no-animal-violence-pre-commit, semgrep-rules-no-animal-violence, danger-plugin-no-animal-violence, reviewdog-no-animal-violence, no-animal-violence-action, vale-no-animal-violence
-->

[Donate](https://openpaws.ai/donate) · [Discord](https://discord.gg/openpaws) · [openpaws.ai](https://openpaws.ai) · [Volunteer](https://openpaws.ai/volunteer)
