// AUTO-GENERATED from Open-Paws/no-animal-violence. Do not edit directly.
"use strict";

const vscode = require("vscode");

const PATTERNS = [
		{
			pattern: /kill\s+two\s+birds\s+with\s+one\s+stone/gi,
			phrase: "kill two birds with one stone",
			suggest: "accomplish two things at once",
		},
		{
			pattern: /beat(ing)?\s+a\s+dead\s+horse/gi,
			phrase: "beat a dead horse",
			suggest: "belabor the point",
		},
		{
			pattern: /(?:more\s+than\s+one|many|other)\s+ways?\s+to\s+skin\s+a\s+cat/gi,
			phrase: "more than one way to skin a cat",
			suggest: "more than one way to solve this",
		},
		{
			pattern: /let\s+the\s+cat\s+out\s+of\s+the\s+bag/gi,
			phrase: "let the cat out of the bag",
			suggest: "reveal the secret",
		},
		{
			pattern: /open(ing)?\s+a\s+can\s+of\s+worms/gi,
			phrase: "open a can of worms",
			suggest: "create a complicated situation",
		},
		{
			pattern: /wild\s+goose\s+chase/gi,
			phrase: "wild goose chase",
			suggest: "futile search",
		},
		{
			pattern: /like\s+shooting\s+fish\s+in\s+a\s+barrel/gi,
			phrase: "like shooting fish in a barrel",
			suggest: "trivially easy",
		},
		{
			pattern: /flog(ging)?\s+a\s+dead\s+horse/gi,
			phrase: "flog a dead horse",
			suggest: "belabor the point",
		},
		{
			pattern: /bigger\s+fish\s+to\s+fry/gi,
			phrase: "there are bigger fish to fry",
			suggest: "more important matters to address",
		},
		{
			pattern: /\\bguinea\s+pig\\b/gi,
			phrase: "guinea pig",
			suggest: "test subject",
		},
		{
			pattern: /hold\s+your\s+horses/gi,
			phrase: "hold your horses",
			suggest: "wait a moment",
		},
		{
			pattern: /the\s+elephant\s+in\s+the\s+room/gi,
			phrase: "the elephant in the room",
			suggest: "the obvious issue",
		},
		{
			pattern: /straight\s+from\s+the\s+horse'?s\s+mouth/gi,
			phrase: "straight from the horse's mouth",
			suggest: "directly from the source",
		},
		{
			pattern: /(?:bring(?:ing|s)?|brought)\s+home\s+the\s+bacon/gi,
			phrase: "bring home the bacon",
			suggest: "bring home the results",
		},
		{
			pattern: /(?:take|taking|took)\s+the\s+bull\s+by\s+the\s+horns/gi,
			phrase: "take the bull by the horns",
			suggest: "face the challenge head-on",
		},
		{
			pattern: /like\s+lambs?\s+to\s+(the\s+)?slaughter/gi,
			phrase: "like lambs to the slaughter",
			suggest: "without resistance",
		},
		{
			pattern: /no\s+room\s+to\s+swing\s+a\s+cat/gi,
			phrase: "no room to swing a cat",
			suggest: "very cramped",
		},
		{
			pattern: /\\bred\s+herring\\b/gi,
			phrase: "red herring",
			suggest: "distraction",
		},
		{
			pattern: /curiosity\s+killed\s+the\s+cat/gi,
			phrase: "curiosity killed the cat",
			suggest: "curiosity backfired",
		},
		{
			pattern: /like\s+a\s+chicken\s+with\s+(its|their)\s+head\s+cut\s+off/gi,
			phrase: "like a chicken with its head cut off",
			suggest: "in a panic",
		},
		{
			pattern: /(your|their|his|her)\s+goose\s+is\s+cooked/gi,
			phrase: "your goose is cooked",
			suggest: "you're in trouble",
		},
		{
			pattern: /throw(ing|n)?\s+\w+\s+to\s+the\s+wolves/gi,
			phrase: "throw someone to the wolves",
			suggest: "abandon to criticism",
		},
		{
			pattern: /hook,?\s+line,?\s+and\s+sinker/gi,
			phrase: "hook, line, and sinker",
			suggest: "completely",
		},
		{
			pattern: /clip(ping|ped)?\s+(\w+('s)?\s+)?wings/gi,
			phrase: "clip someone's wings",
			suggest: "restrict someone's freedom",
		},
		{
			pattern: /(the\s+)?straw\s+that\s+broke\s+the\s+camel'?s\s+back/gi,
			phrase: "the straw that broke the camel's back",
			suggest: "the tipping point",
		},
		{
			pattern: /bird\s+in\s+(the|a)\s+hand\s+(is\s+)?worth\s+two\s+in\s+the\s+bush/gi,
			phrase: "a bird in the hand is worth two in the bush",
			suggest: "a sure thing beats a possibility",
		},
		{
			pattern: /\\beat(ing)?\s+crow\\b/gi,
			phrase: "eat crow",
			suggest: "admit being wrong",
		},
		{
			pattern: /fight(ing)?\s+like\s+cats\s+and\s+dogs/gi,
			phrase: "fight like cats and dogs",
			suggest: "constantly argue",
		},
		{
			pattern: /(?:take|taking|took)\s+the\s+bait/gi,
			phrase: "take the bait",
			suggest: "fall for it",
		},
		{
			pattern: /don'?t\s+count\s+your\s+chickens/gi,
			phrase: "don't count your chickens before they hatch",
			suggest: "don't assume success prematurely",
		},
		{
			pattern: /\\blivestock\\b/gi,
			phrase: "livestock",
			suggest: "farmed animals",
		},
		{
			pattern: /\\bpoultry\\b/gi,
			phrase: "poultry",
			suggest: "farmed birds",
		},
		{
			pattern: /\\bgestation crates?\\b/gi,
			phrase: "gestation crate",
			suggest: "pregnancy cage",
		},
		{
			pattern: /\\bdepopulat(ion|ed|ing)\\b/gi,
			phrase: "depopulation",
			suggest: "mass killing",
		},
		{
			pattern: /\\bprocessing (plants?|facilit(y|ies))\\b/gi,
			phrase: "processing plant",
			suggest: "slaughterhouse",
		},
		{
			pattern: /\\bfarrowing crates?\\b/gi,
			phrase: "farrowing crate",
			suggest: "birthing cage",
		},
		{
			pattern: /\\bbattery cages?\\b/gi,
			phrase: "battery cage",
			suggest: "small wire cage",
		},
		{
			pattern: /\\bspent hens?\\b/gi,
			phrase: "spent hen",
			suggest: "discarded hen",
		},
		{
			pattern: /\\b(humane(ly)? (slaughter(ed)?|kill(ing|ed)))\\b/gi,
			phrase: "humane slaughter",
			suggest: "slaughter",
		},
		{
			pattern: /\\bbroilers?\\b/gi,
			phrase: "broiler",
			suggest: "chicken raised for meat",
		},
		{
			pattern: /don'?t\s+be\s+a\s+chicken/gi,
			phrase: "don't be a chicken",
			suggest: "don't hesitate",
		},
		{
			pattern: /\\b(code|memory|resource)\s+pig\\b/gi,
			phrase: "pig",
			suggest: "resource-intensive",
		},
		{
			pattern: /\\bcowboy\s+cod(ing|er)\\b/gi,
			phrase: "cowboy coding",
			suggest: "undisciplined coding",
		},
		{
			pattern: /\\bcode\s+monkeys?\\b/gi,
			phrase: "code monkey",
			suggest: "developer",
		},
		{
			pattern: /\\bbadger(ed|ing|s)?\\b/gi,
			phrase: "badger someone",
			suggest: "pester",
		},
		{
			pattern: /\\bferret(ed|ing)?\s+out\\b/gi,
			phrase: "ferret out",
			suggest: "uncover",
		},
		{
			pattern: /cattle\s+(vs?\.?|versus)\s+pets?/gi,
			phrase: "cattle vs. pets",
			suggest: "ephemeral vs. persistent",
		},
		{
			pattern: /\\bpet\s+project\\b/gi,
			phrase: "pet project",
			suggest: "side project",
		},
		{
			pattern: /canary\s+in\s+(a|the)\s+coal\s+mine/gi,
			phrase: "canary in a coal mine",
			suggest: "early warning signal",
		},
		{
			pattern: /\\bdog\s?food(ing)?\\b/gi,
			phrase: "dogfooding",
			suggest: "self-hosting",
		},
		{
			pattern: /\\bherding\s+cats\\b/gi,
			phrase: "herding cats",
			suggest: "coordinating independent contributors",
		},
		{
			pattern: /fishing\s+expedition/gi,
			phrase: "go on a fishing expedition",
			suggest: "exploratory investigation",
		},
		{
			pattern: /\\bsacred\s+cows?\\b/gi,
			phrase: "sacred cow",
			suggest: "unquestioned belief",
		},
		{
			pattern: /\\bscapegoat(ed|ing|s)?\\b/gi,
			phrase: "scapegoat",
			suggest: "blame target",
		},
		{
			pattern: /\\brat\s+race\\b/gi,
			phrase: "rat race",
			suggest: "daily grind",
		},
		{
			pattern: /dead[\s_-]?cat[\s_-]?bounce/gi,
			phrase: "dead cat bounce",
			suggest: "temporary rebound",
		},
		{
			pattern: /\\bdog[\s-]eat[\s-]dog\\b/gi,
			phrase: "dog-eat-dog",
			suggest: "ruthlessly competitive",
		},
		{
			pattern: /\\bwhack[\s-]a[\s-]mole\\b/gi,
			phrase: "whack-a-mole",
			suggest: "recurring problem",
		},
		{
			pattern: /\\bcash\s+cows?\\b/gi,
			phrase: "cash cow",
			suggest: "profit center",
		},
		{
			pattern: /\\bsacrificial\s+lambs?\\b/gi,
			phrase: "sacrificial lamb",
			suggest: "expendable person",
		},
		{
			pattern: /\\bsitting\s+ducks?\\b/gi,
			phrase: "sitting duck",
			suggest: "easy target",
		},
		{
			pattern: /\\bopen\s+season\\b/gi,
			phrase: "open season",
			suggest: "free-for-all",
		},
		{
			pattern: /put(ting)?\s+(\w+\s+)?out\s+to\s+pasture/gi,
			phrase: "put out to pasture",
			suggest: "retire",
		},
		{
			pattern: /\\bdead\s+ducks?\\b/gi,
			phrase: "dead duck",
			suggest: "lost cause",
		},
		{
			pattern: /\\bkill\s+(the\s+)?process\\b/gi,
			phrase: "kill process",
			suggest: "terminate the process",
		},
		{
			pattern: /kill\s+(the\s+)?server/gi,
			phrase: "kill the server",
			suggest: "stop the server",
		},
		{
			pattern: /\\bnuke\s+(it|the|this|that|everything)\\b/gi,
			phrase: "nuke",
			suggest: "delete completely",
		},
		{
			pattern: /\\babort(ed|ing)?\\b/gi,
			phrase: "abort",
			suggest: "cancel",
		},
		{
			pattern: /\\bcull(ed|ing|s)?\\b/gi,
			phrase: "cull",
			suggest: "remove",
		},
		{
			pattern: /\\b(master|slave)\\b/gi,
			phrase: "master/slave",
			suggest: "primary/replica",
		},
		{
			pattern: /\\b(white|black)list\\b/gi,
			phrase: "whitelist/blacklist",
			suggest: "allowlist/denylist",
		},
		{
			pattern: /\\bgrandfather(ed|ing)?\\b/gi,
			phrase: "grandfathered",
			suggest: "legacy",
		},
		{
			pattern: /\\bveal\\b/gi,
			phrase: "veal",
			suggest: "calf flesh",
		},
		{
			pattern: /\\blame[\s-]duck\\b/gi,
			phrase: "lame duck",
			suggest: "outgoing",
		},
];

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	const collection = vscode.languages.createDiagnosticCollection("no-animal-violence");

	function analyzeDocument(document) {
		const diagnostics = [];
		const text = document.getText();

		for (const { pattern, phrase, suggest } of PATTERNS) {
			pattern.lastIndex = 0;
			let match;
			while ((match = pattern.exec(text)) !== null) {
				const startPos = document.positionAt(match.index);
				const endPos = document.positionAt(match.index + match[0].length);
				const range = new vscode.Range(startPos, endPos);
				const diagnostic = new vscode.Diagnostic(
					range,
					`Avoid "${phrase}". Consider: "${suggest}"`,
					vscode.DiagnosticSeverity.Warning,
				);
				diagnostic.source = "no-animal-violence";
				diagnostics.push(diagnostic);
			}
		}

		collection.set(document.uri, diagnostics);
	}

	if (vscode.window.activeTextEditor) {
		analyzeDocument(vscode.window.activeTextEditor.document);
	}

	context.subscriptions.push(
		vscode.workspace.onDidOpenTextDocument(analyzeDocument),
		vscode.workspace.onDidChangeTextDocument((e) => analyzeDocument(e.document)),
		vscode.workspace.onDidCloseTextDocument((doc) => collection.delete(doc.uri)),
		collection,
	);
}

function deactivate() {}

module.exports = { activate, deactivate };
