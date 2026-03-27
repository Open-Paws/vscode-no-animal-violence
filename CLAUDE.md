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

## Related Repos

- [semgrep-rules-no-animal-violence](https://github.com/Open-Paws/semgrep-rules-no-animal-violence) — Semgrep CI rules
- [danger-plugin-no-animal-violence](https://github.com/Open-Paws/danger-plugin-no-animal-violence) — Danger.js plugin for PR checks
