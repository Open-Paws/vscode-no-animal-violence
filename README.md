# No Animal Violence — VS Code Extension

A VS Code extension that detects speciesist language in code comments, strings, and documentation -- and offers one-click replacements with clearer, non-violent alternatives.

Language shapes thought. Idioms that trivialize violence toward animals reinforce the cultural norm that animals are objects to be used. This extension surfaces those phrases where developers encounter them most: in the editor, in real time.

## What It Looks Like

When speciesist language is detected, the extension:

1. Underlines the phrase with a squiggly diagnostic (warning by default).
2. Shows the phrase and its suggested alternative in the **Problems** panel.
3. Offers a **Quick Fix** (lightbulb / Ctrl+.) to replace the phrase in one click.

For example, typing `// TODO: don't beat a dead horse` will produce a warning with the suggestion to use `belabor the point` instead.

## Installation

### From VSIX (local)

1. Download or build the `.vsix` file:
   ```bash
   npx @vscode/vsce package
   ```
2. In VS Code, open the Command Palette (`Ctrl+Shift+P`) and run **Extensions: Install from VSIX...**.
3. Select the generated `.vsix` file.

### From the Marketplace

*Coming soon.* The extension will be published under the `open-paws` publisher ID once the marketplace listing is finalized.

## Configuration

| Setting                          | Type    | Default     | Description                                    |
|----------------------------------|---------|-------------|------------------------------------------------|
| `noAnimalViolence.enable`        | boolean | `true`      | Enable or disable scanning                     |
| `noAnimalViolence.severity`      | string  | `"warning"` | Diagnostic severity: `error`, `warning`, `information`, or `hint` |

You can set these in your `settings.json`:

```json
{
  "noAnimalViolence.severity": "information",
  "noAnimalViolence.enable": true
}
```

## Detected Phrases

| Speciesist phrase                      | Suggested alternative              |
|----------------------------------------|------------------------------------|
| kill two birds with one stone          | accomplish two things at once      |
| beat a dead horse                      | belabor the point                  |
| beating a dead horse                   | belaboring the point               |
| bring home the bacon                   | bring home the results             |
| guinea pig                             | test subject                       |
| more than one way to skin a cat        | more than one way to solve this    |
| let the cat out of the bag             | reveal the secret                  |
| open a can of worms                    | create a complicated situation     |
| wild goose chase                       | pointless pursuit                  |
| sacred cow / sacred cows               | unquestioned belief(s)             |
| cattle vs. pets                        | ephemeral vs. persistent           |
| canary deployment / canary release     | progressive rollout                |
| monkey patch / monkey-patch            | runtime patch                      |
| dogfooding                             | self-hosting                       |
| like shooting fish in a barrel         | extremely easy                     |

## Why This Matters

Speciesist language normalizes the exploitation of animals by embedding violence into everyday speech. When developers write "kill two birds with one stone" in a code comment, they reinforce the cultural assumption that birds are disposable props for human convenience. These idioms are not neutral -- they carry the weight of real practices (stoning birds, skinning cats, using canaries as gas detectors until they die).

Replacing them costs nothing. The alternatives are often more precise. And the act of noticing creates a small but real shift in how we conceptualize our relationship with other species.

## Academic References

- Dunayer, J. (2001). *Animal Equality: Language and Liberation*. Ryce Publishing.
- Stibbe, A. (2012). *Animals Erased: Discourse, Ecology and Reconnection with the Natural World*. Wesleyan University Press.
- Singer, P. (1975). *Animal Liberation*. HarperCollins.
- PETA (2018). "Words Matter: Speciesist Language." Retrieved from peta.org.
- Painter, C. (2016). "Speciesism: An Expositive Study of the Conceptualization of Animals in English." *Functional Linguistics*, 3(1), Article 10.

## Contributing

Issues and PRs are welcome at [Open-Paws/vscode-no-animal-violence](https://github.com/Open-Paws/vscode-no-animal-violence). If you know of speciesist phrases that should be added to the scanner, open an issue with the phrase, its origin, and a suggested alternative.

## License

MIT -- see [LICENSE](LICENSE).

---

Built by [Open Paws](https://github.com/Open-Paws) -- AI infrastructure for animal liberation.
