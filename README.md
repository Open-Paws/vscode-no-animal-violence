# No Animal Violence — VS Code Extension

[![Status: Active Development](https://img.shields.io/badge/status-active%20development-yellow)](https://github.com/Open-Paws/vscode-no-animal-violence)
[![Version](https://img.shields.io/badge/version-0.1.0-blue)](https://github.com/Open-Paws/vscode-no-animal-violence/blob/main/package.json)
[![License: MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Open Paws](https://img.shields.io/badge/Open%20Paws-AI%20for%20animal%20liberation-orange)](https://github.com/Open-Paws)

A VS Code extension that detects speciesist language in code comments, strings, and documentation — and offers one-click replacements with clearer, non-violent alternatives.

Part of the [Open Paws no-animal-violence ecosystem](#ecosystem), which enforces the same canonical rule dictionary across VS Code, Semgrep CI, pre-commit hooks, ESLint, Danger.js PR checks, and AI agent runtimes.

Language shapes thought. Idioms that trivialize harm toward animals reinforce the cultural norm that animals are objects to be used. This extension surfaces those phrases where developers encounter them most: in the editor, in real time.

---

## What It Does

When speciesist language is detected, the extension:

1. **Underlines** the phrase with a squiggly diagnostic (warning severity by default).
2. **Reports** the phrase and its suggested alternative in the **Problems** panel (`Ctrl+Shift+M`).
3. **Offers a Quick Fix** via the lightbulb icon or `Ctrl+.` — one click replaces the phrase.
4. **Rescans automatically** on every keystroke (debounced 300 ms), on save, and when configuration changes.
5. **Cleans up** diagnostics when a document is closed.

**Example:** Typing `// TODO: don't beat a dead horse here` triggers a warning:
> Animal violence language: "beat a dead horse". Consider: "belabor the point"

The Quick Fix then replaces the phrase in place, preserving the original capitalization style.

---

## Installation

### From the Marketplace

The extension will be published under the `open-paws` publisher ID. Once live, search for **"Animal Violence Language Scanner"** in the VS Code Extensions panel or visit the marketplace listing directly.

### From VSIX (local / pre-release)

1. Clone the repository and package the extension:
   ```bash
   git clone https://github.com/Open-Paws/vscode-no-animal-violence.git
   cd vscode-no-animal-violence
   npx @vscode/vsce package
   ```
2. In VS Code, open the Command Palette (`Ctrl+Shift+P`) and run **Extensions: Install from VSIX...**.
3. Select the generated `.vsix` file.

### For Development (Extension Development Host)

Press `F5` in VS Code with this repository open. This launches a new VS Code window with the extension loaded — any open file will be scanned immediately.

---

## Features

### Real-Time Diagnostics

The extension scans every open document using a dictionary of 65+ case-insensitive regex patterns. Matches appear as squiggly underlines at warning severity by default. The **Problems** panel (`Ctrl+Shift+M`) shows the full list with suggested alternatives.

### Quick Fix Replacements

Cursor on or near a flagged phrase and press `Ctrl+.` (or click the lightbulb icon) to see the replacement action. The fix preserves the original casing — if the phrase starts with an uppercase letter, the replacement does too. The action is marked as the preferred fix, so `Ctrl+.` → `Enter` applies it immediately.

### Works Across All Languages

The extension activates for every file type (`onLanguage:*`). It scans the raw document text, so it catches speciesist phrases in comments, string literals, documentation, markdown files, shell scripts, YAML configs, and anywhere else text appears.

### Configuration-Aware

Scanning and severity are configurable per workspace. Changes take effect immediately without restarting — all visible editors are rescanned when settings change.

---

## Configuration

Set these in your `settings.json` (user or workspace):

| Setting | Type | Default | Description |
|---|---|---|---|
| `noAnimalViolence.enable` | boolean | `true` | Enable or disable scanning globally |
| `noAnimalViolence.severity` | string | `"warning"` | Diagnostic severity: `"error"`, `"warning"`, `"information"`, or `"hint"` |

> **Note:** `package.json` currently declares the settings under the `speciesism.*` namespace. The runtime code reads `noAnimalViolence.*`. Use `noAnimalViolence.*` in your `settings.json` until this discrepancy is resolved.

**Example workspace settings:**
```json
{
  "noAnimalViolence.enable": true,
  "noAnimalViolence.severity": "information"
}
```

To disable during a session without uninstalling:
```json
{
  "noAnimalViolence.enable": false
}
```

---

## Detected Patterns

The extension ships with 65+ patterns covering idioms, industry euphemisms, and developer-specific terms. A representative selection:

| Speciesist phrase | Suggested alternative |
|---|---|
| kill two birds with one stone | accomplish two things at once |
| beat / beating a dead horse | belabor the point |
| more than one way to skin a cat | more than one way to solve this |
| let the cat out of the bag | reveal the secret |
| open a can of worms | create a complicated situation |
| wild goose chase | futile search |
| like shooting fish in a barrel | trivially easy |
| guinea pig | test subject |
| hold your horses | wait a moment |
| the elephant in the room | the obvious issue |
| straight from the horse's mouth | directly from the source |
| bring home the bacon | bring home the results |
| take the bull by the horns | face the challenge head-on |
| like lambs to the slaughter | without resistance |
| red herring | distraction |
| curiosity killed the cat | curiosity backfired |
| like a chicken with its head cut off | in a panic |
| throw someone to the wolves | abandon to criticism |
| the straw that broke the camel's back | the tipping point |
| canary in a coal mine | early warning signal |
| dogfooding / dog food | self-hosting |
| herding cats | coordinating independent contributors |
| sacred cow | unquestioned belief |
| scapegoat | blame target |
| rat race | daily grind |
| dead cat bounce | temporary rebound |
| dog-eat-dog | ruthlessly competitive |
| whack-a-mole | recurring problem |
| cash cow | profit center |
| sitting duck | easy target |
| code monkey | developer |
| cowboy coding | undisciplined coding |
| cattle vs. pets | ephemeral vs. persistent |
| livestock | farmed animals |
| poultry | farmed birds |
| processing plant / facility | slaughterhouse |
| humane slaughter | slaughter |
| depopulation | mass killing |
| battery cage | small wire cage |
| gestation crate | pregnancy cage |
| master / slave | primary / replica |
| whitelist / blacklist | allowlist / denylist |
| abort | cancel |
| cull | remove |
| kill the process / server | terminate / stop |

The full pattern dictionary lives in `extension.js` and is auto-generated from the [`project-compassionate-code`](https://github.com/Open-Paws/project-compassionate-code) pipeline. Do not edit patterns directly in `extension.js` — submit pattern changes through that pipeline.

---

## Why This Matters

Speciesist language normalizes the exploitation of animals by embedding harm into everyday speech. When developers write "kill two birds with one stone" in a code comment, they reinforce the cultural assumption that birds are disposable. These idioms are not neutral — they carry the weight of real practices.

Replacing them costs nothing. The alternatives are often more precise. And the act of noticing creates a small but real shift in how we conceptualize our relationship with other species.

### Academic References

- Dunayer, J. (2001). *Animal Equality: Language and Liberation*. Ryce Publishing.
- Stibbe, A. (2012). *Animals Erased: Discourse, Ecology and Reconnection with the Natural World*. Wesleyan University Press.
- Singer, P. (1975). *Animal Liberation*. HarperCollins.
- Painter, C. (2016). "Speciesism: An Expositive Study of the Conceptualization of Animals in English." *Functional Linguistics*, 3(1), Article 10.

---

## Ecosystem

This extension is part of a suite of tools that enforce the same canonical speciesist-language rules across the entire developer workflow:

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
| mcp-server-nav-language | AI agent runtime enforcement (MCP) |

---

## Contributing

Issues and PRs are welcome at [Open-Paws/vscode-no-animal-violence](https://github.com/Open-Paws/vscode-no-animal-violence).

### Build and Test

```bash
# Package the extension as a .vsix file
npx @vscode/vsce package

# Run the placeholder test suite (Node.js built-in test runner)
node --test tests/placeholder.test.js

# Run the linter (Biome)
npx @biomejs/biome check .
```

### Manual Testing (Extension Development Host)

1. Open this repository in VS Code.
2. Press `F5` — a new VS Code window (Extension Development Host) opens.
3. Open any file in that window and type a known phrase (e.g. `// beat a dead horse`).
4. Verify: squiggly underline appears, Problems panel shows the diagnostic, `Ctrl+.` offers the Quick Fix.
5. Test `noAnimalViolence.enable: false` suppresses all diagnostics.
6. Test that changing `noAnimalViolence.severity` to `"error"` updates the squiggly color without restarting.

### Adding New Patterns

Pattern changes go through the [`project-compassionate-code`](https://github.com/Open-Paws/project-compassionate-code) auto-generation pipeline. To propose a new pattern, open an issue with:
- The phrase to detect
- Its origin / why it is speciesist
- The suggested alternative
- A regex that matches it with word boundaries

### Code Standards

- Single-file, no-build architecture — resist adding a build step or bundler.
- Every catch block must handle a specific error, not suppress silently.
- New patterns require manual verification in the Extension Development Host before release.
- Run `desloppify scan --path .` and maintain a score of 85 or higher.

---

## License

MIT — see [LICENSE](LICENSE).

---

Built by [Open Paws](https://github.com/Open-Paws) — AI infrastructure for animal liberation.
