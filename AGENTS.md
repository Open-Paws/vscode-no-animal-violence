# AGENTS.md — vscode-no-animal-violence

## Summary

A single-file, no-build VS Code extension (v0.1.0) that scans every open document for speciesist language using a dictionary of 65+ case-insensitive regex patterns and offers one-click Quick Fix replacements. It is the real-time IDE layer of the Open Paws no-animal-violence enforcement suite. The pattern dictionary is auto-generated from [`project-compassionate-code`](https://github.com/Open-Paws/project-compassionate-code) — do not edit patterns manually in `extension.js`. Status: **Active Development** (pre-marketplace, functional, no automated integration test suite yet).

---

## Status

**Active Development** — the extension is functional and installable via VSIX. Marketplace publication is pending. The automated test suite is currently a placeholder (smoke tests only). Manual testing via the Extension Development Host (`F5`) is required before any release.

**Change implications:** Changes to `extension.js` are high-impact — a bug in the diagnostic provider or code action provider can degrade the editor experience for any developer who has the extension installed. Test every change manually in the Extension Development Host before merging.

---

## Key Files

| File | Role |
|---|---|
| `extension.js` | Entire extension: pattern dictionary, `scanDocument()`, `NoAnimalViolenceCodeActionProvider`, activation/deactivation lifecycle |
| `package.json` | VS Code extension manifest — activation events, contributed configuration schema, engine requirement, scripts |
| `tests/placeholder.test.js` | Smoke tests using Node.js built-in test runner with a vscode API stub |
| `biome.json` | Biome linter/formatter configuration |
| `.github/workflows/ci.yml` | CI pipeline (lint + test) |
| `.github/workflows/no-animal-violence.yml` | Semgrep speciesist-language scan on PRs |
| `.vscodeignore` | Files excluded from the packaged `.vsix` |
| `semgrep-no-animal-violence.yaml` | Semgrep config used by the CI speciesist-language check |

---

## Build and Test Commands

```bash
# Package the extension as a .vsix (requires Node.js)
npx @vscode/vsce package

# Run smoke tests (Node.js built-in test runner — no extra dependencies)
node --test tests/placeholder.test.js

# Lint with Biome
npx @biomejs/biome check .

# Publish to VS Code Marketplace (requires a Personal Access Token)
npx @vscode/vsce publish

# Quality scan
desloppify scan --path .        # target score >= 85
semgrep --config semgrep-no-animal-violence.yaml extension.js README.md
```

**Manual testing (required before release):**
1. Press `F5` in VS Code to open the Extension Development Host.
2. Open any file and type a known phrase (e.g. `// beat a dead horse`).
3. Confirm: squiggly underline appears, Problems panel shows the diagnostic, `Ctrl+.` offers the correct Quick Fix.
4. Verify `noAnimalViolence.enable: false` suppresses all diagnostics.
5. Verify `noAnimalViolence.severity` changes take effect immediately without restarting.

---

## Architecture

### Design

Single-file, no-build. The entire extension is `extension.js` — plain CommonJS, no TypeScript, no bundler. This is intentional: no build step minimises maintenance surface and keeps the packaging pipeline trivial (`npx @vscode/vsce package`).

### Three Responsibilities (in extension.js)

1. **Pattern dictionary** (`PATTERNS` array) — 65+ objects of the form `{ pattern: RegExp, phrase: string, suggest: string }`. Patterns use case-insensitive flags (`gi`) and word boundaries (`\b`) to avoid false positives. Order is significant: more specific patterns appear before shorter alternatives. **Auto-generated from `project-compassionate-code` — do not edit manually.**

2. **Diagnostic provider** (`scanDocument()`) — reads `noAnimalViolence.enable` and `noAnimalViolence.severity` from workspace config, iterates `PATTERNS`, resets `lastIndex` on each stateful `RegExp` before use, and returns an array of `vscode.Diagnostic` objects. Each diagnostic stores the suggested replacement on `_suggestion` for downstream use by the code action provider.

3. **Code action provider** (`NoAnimalViolenceCodeActionProvider`) — implements `provideCodeActions()`. For each diagnostic in the current range with `code === "animal-violence"`, it creates a `QuickFix` `CodeAction` that replaces the matched text with the suggestion, preserving the original first-character casing. Marked `isPreferred: true`.

### Lifecycle

- `activate()` — creates the `DiagnosticCollection`, registers the `CodeActionsProvider`, subscribes to `onDidOpenTextDocument`, `onDidChangeTextDocument` (debounced 300 ms), `onDidSaveTextDocument` (immediate), `onDidCloseTextDocument`, and `onDidChangeConfiguration`. All disposables are pushed to `context.subscriptions`.
- `deactivate()` — clears the debounce timer and disposes the diagnostic collection.

### VS Code API Usage

Direct VS Code extension API — no language server protocol, no separate process. Everything runs in the extension host process. This keeps startup fast and avoids IPC complexity at the cost of running in the same process as the editor.

### Configuration Namespace Discrepancy

`package.json` declares config under `speciesism.*` (`speciesism.enable`, `speciesism.severity`). The runtime code in `extension.js` reads from `noAnimalViolence.*` (`noAnimalViolence.enable`, `noAnimalViolence.severity`). Only the `noAnimalViolence.*` keys are actually active. This is a known inconsistency — fixing it requires aligning `package.json` with the runtime namespace before marketplace publication.

---

## Integration Points

| Integration | Details |
|---|---|
| **project-compassionate-code** | Auto-generates the `PATTERNS` array in `extension.js`. Pattern changes must go through this pipeline, not manual edits. |
| **no-animal-violence** (canonical rules) | Source of truth for which phrases are speciesist and what alternatives to use. Patterns are derived from this dictionary. |
| **mcp-server-nav-language** | Enforces the same patterns at AI agent runtime via the Gary MCP hub. The VS Code extension and the MCP server are parallel enforcement layers — editor vs. agent generation time. |
| **lbr8-mcp-constraints** | Bundles 12 offline NAV patterns as `StaticConstraintSource` middleware for MCP tool handlers. |
| **semgrep-rules-no-animal-violence** | CI-layer enforcement of the same rules in GitHub Actions. |
| **no-animal-violence-pre-commit** | Local git hook layer — runs before a commit is created. |
| **danger-plugin-no-animal-violence** | PR-level annotation using Danger.js. |
| **Audit-to-dispatch pipeline** (decision #37, 2026-04-11) | NAV violations found during org-wide audits are now auto-dispatched as agent fix tasks. |

---

## Safe vs. Risky Changes

### Safe
- Updating documentation (README.md, AGENTS.md, CLAUDE.md, comments).
- Adjusting `biome.json` formatting rules (no runtime impact).
- Adding new smoke tests to `tests/placeholder.test.js`.
- Modifying CI workflow files (`.github/workflows/`).
- Updating `.vscodeignore` to exclude additional files from the packaged VSIX.

### Risky — Test Carefully in Extension Development Host
- **Any change to `extension.js`** — affects diagnostics, Quick Fix behavior, or lifecycle event handling. A crash in `scanDocument()` or `provideCodeActions()` degrades the editor for all installed users.
- **Adding regex patterns manually** — patterns must be auto-generated via `project-compassionate-code`. Manual additions will be overwritten on the next generation run and may conflict.
- **Changing the configuration namespace** — aligning `package.json` (`speciesism.*`) with the runtime namespace (`noAnimalViolence.*`) is necessary before marketplace publication, but is a breaking change for any user who has set `speciesism.*` in their settings.
- **Adding a build step or bundler** — the current no-build architecture is intentional. Adding TypeScript compilation or webpack changes the entire packaging and development workflow.
- **Adding external dependencies** — any `npm` dependency increases supply-chain risk and bundle size. Verify every dependency independently before adding.
- **Changing activation events** — moving away from `onLanguage:*` could cause the extension to miss file types.

---

## TODOs

- [ ] **Resolve config namespace mismatch** — align `package.json` schema (`speciesism.*`) with the runtime namespace (`noAnimalViolence.*`) before marketplace publication.
- [ ] **Publish to VS Code Marketplace** — finalize the `open-paws` publisher listing and publish v0.1.0.
- [ ] **Add integration tests** — replace `tests/placeholder.test.js` smoke tests with pattern-matching unit tests that directly exercise `scanDocument()` against known phrases and verify both detection and suggestion correctness.
- [ ] **Track adoption metrics** — VS Code Marketplace install count is not yet tracked; this is a Lever 3 measurement gap.
- [ ] **Add hover provider** — show the phrase origin and the advocacy reasoning directly in an editor hover tooltip, not just in the Problems panel.
- [ ] **Named maintainer** — as of 2026-04-02, the suite has no named owner. Assign one.
- [ ] **Bootcamp integration** — include this extension in org developer bootcamp setup instructions (see `ecosystem/integration-todos.md` §27a).
- [ ] **Verify auto-generation pipeline** — confirm `project-compassionate-code` auto-generation into `extension.js` is still active.
