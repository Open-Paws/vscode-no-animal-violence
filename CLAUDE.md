# vscode-no-animal-violence

VS Code extension that detects speciesist language in code and documentation, offering one-click Quick Fix replacements. Part of the [Open Paws](https://github.com/Open-Paws) speciesist language detection suite.

## Quick Start

```bash
# Package the extension
npx @vscode/vsce package

# Install in VS Code
# Command Palette > "Extensions: Install from VSIX..." > select .vsix file

# Debug: press F5 in VS Code to launch Extension Development Host
```

## Architecture

Single-file extension (`extension.js`) with no build step:

1. **Pattern dictionary** — array of `{ pattern, phrase, suggest }` objects with case-insensitive regex and word boundaries
2. **Diagnostic provider** — scans open documents on change/save, creates VS Code diagnostics (squiggly underlines)
3. **Code action provider** — offers Quick Fix replacements via the lightbulb menu (Ctrl+.)
4. **Configuration** — `speciesism.enable` (boolean) and `speciesism.severity` (error/warning/information/hint)

Activates on all languages (`onLanguage:*`). Auto-generated from `project-compassionate-code`.

## Key Files

| File | Description |
|------|-------------|
| `extension.js` | Main extension — patterns, diagnostics, Quick Fix provider |
| `package.json` | Extension manifest, VS Code config schema, activation events |
| `README.md` | Full phrase dictionary, installation, configuration docs |

## Development

```bash
# Package as .vsix
npx @vscode/vsce package

# Publish to marketplace (requires PAT)
npx @vscode/vsce publish

# No test suite yet — test manually via F5 Extension Development Host
```

## Organizational Context

**Strategic role (Lever 1 + Lever 3):** Developer IDE integration — catches speciesist language as it's typed, before CI. The first line of defense in the developer workflow. Every developer who installs this extension becomes aware of speciesist language patterns during normal coding — this is a direct Lever 3 touchpoint.

**Note:** Extension pattern dictionary is auto-generated from `project-compassionate-code`. Pattern updates come through that pipeline, not manual edits to `extension.js`.

**Current org priorities relevant to this repo:**
- Bootcamp integration is the highest-leverage pending action: include this extension in bootcamp setup instructions. See `ecosystem/integration-todos.md` §27a.
- Adoption metrics (VS Code marketplace installs) are not yet tracked — a concrete Lever 3 measurement gap.
- Suite maintenance has **no named owner** as of 2026-04-02. Verify the auto-generation pipeline from `project-compassionate-code` is still active.
- No automated test suite. Tested manually via F5 Extension Development Host only.

**Decisions affecting this repo:**
- 2026-04-01: Pattern dictionary syncs from `project-compassionate-code` — do not manually edit the pattern array in `extension.js`. Pattern changes go through the generation pipeline.
- 2026-03-25: VS Code is the primary IDE for the developer pipeline. This extension is the recommended real-time language checker for all org developers.

## Related Repos

- [no-animal-violence](https://github.com/Open-Paws/no-animal-violence) — Canonical rule dictionary
- [semgrep-rules-no-animal-violence](https://github.com/Open-Paws/semgrep-rules-no-animal-violence) — Semgrep CI rules
- [no-animal-violence-pre-commit](https://github.com/Open-Paws/no-animal-violence-pre-commit) — pre-commit hook (local git enforcement)
- [danger-plugin-no-animal-violence](https://github.com/Open-Paws/danger-plugin-no-animal-violence) — Danger.js plugin for PR checks

## Development Standards

### 10-Point Review Checklist (ranked by AI violation frequency)

1. **DRY** — Pattern dictionary is auto-generated. Do not manually duplicate patterns. New patterns go through the generation pipeline.
2. **Deep modules** — Three distinct responsibilities: pattern matching, diagnostics, Quick Fix. Keep them clearly separated.
3. **Single responsibility** — Pattern matching is separate from diagnostic reporting, which is separate from Quick Fix.
4. **Error handling** — Diagnostic providers that throw will crash VS Code language features. Every error must be caught and handled gracefully (skip file, log to console, never crash).
5. **Information hiding** — Extension configuration (`speciesism.enable`, `speciesism.severity`) is the public interface. Internal pattern-matching is an implementation detail.
6. **Ubiquitous language** — "farmed animal" not "livestock," "factory farm" not "farm." Never introduce synonyms for domain terms.
7. **Design for change** — Pattern dictionary updates must require only updating the generated array, not structural code changes.
8. **Legacy velocity** — Before modifying diagnostic or code action logic, test against Extension Development Host with existing patterns first.
9. **Over-patterning** — Single-file, no-build extension is the right architecture. Resist adding a build step.
10. **Test quality** — No automated test suite. Before any release: document and manually execute the test scenarios.

### Quality Gates

- **Package test**: `npx @vscode/vsce package` — ensure the .vsix builds cleanly.
- **Manual test**: F5 in VS Code, open a file with a known phrase, verify squiggly underline and Quick Fix appear correctly.
- **Desloppify**: `desloppify scan --path .` — minimum score ≥85.
- **Two-failure rule**: After two failed fixes on the same problem, stop and restart.

### Testing Methodology

- Manual testing via Extension Development Host (F5) before any release.
- Before release: verify (1) known phrase gets flagged, (2) Quick Fix offers the correct alternative, (3) `speciesism.enable: false` suppresses all diagnostics, (4) `speciesism.severity` configuration is respected.

### Seven Concerns — Repo-Specific Notes

1. **Testing** — No automated test suite. Manual testing required.
2. **Security** — Extension runs in developer IDE. Never execute code from scanned files. Pattern matching is regex-only. Verify no telemetry is added on any update.
3. **Privacy** — Extension operates entirely locally. No external calls. Must stay this way.
4. **Cost optimization** — Free to install and run. No API calls.
5. **Advocacy domain** — Pattern alternatives must use movement-standard language consistently.
6. **Accessibility** — Quick Fix suggestions must be clear and actionable inline in the editor.
7. **Emotional safety** — Diagnostic messages should explain the alternative without requiring engagement with graphic content.

### Structured Coding Reference

For tool-specific AI coding instructions (Claude Code rules, Cursor MDC, Copilot, Windsurf, etc.), copy the corresponding directory from `structured-coding-with-ai` into this project root.
