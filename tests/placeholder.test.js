/**
 * Tests for the VS Code extension.
 *
 * The extension requires the `vscode` runtime which is only available inside
 * an Extension Development Host. These tests exercise the extension module
 * directly by stubbing the vscode API.
 */

const assert = require("node:assert/strict");
const { test } = require("node:test");
const Module = require("node:module");

// Stub the vscode module so extension.js can be required outside VS Code.
const noop = () => ({ dispose: () => {} });
const vscodeStub = {
	DiagnosticSeverity: { Warning: 1, Error: 0, Information: 2, Hint: 3 },
	Diagnostic: class {
		constructor(range, message, severity) {
			this.range = range;
			this.message = message;
			this.severity = severity;
		}
	},
	Range: class {
		constructor(start, end) {
			this.start = start;
			this.end = end;
		}
	},
	Position: class {
		constructor(line, character) {
			this.line = line;
			this.character = character;
		}
	},
	CodeAction: class {
		constructor(title, kind) {
			this.title = title;
			this.kind = kind;
		}
	},
	CodeActionKind: { QuickFix: "quickfix" },
	WorkspaceEdit: class {
		replace() {}
	},
	languages: {
		createDiagnosticCollection: () => ({
			set: () => {},
			clear: () => {},
			dispose: () => {},
		}),
		registerCodeActionsProvider: () => ({ dispose: () => {} }),
	},
	workspace: {
		onDidOpenTextDocument: noop,
		onDidChangeTextDocument: noop,
		onDidSaveTextDocument: noop,
		onDidCloseTextDocument: noop,
		onDidChangeConfiguration: noop,
		getConfiguration: () => ({ get: (_key, def) => def }),
		visibleTextEditors: [],
	},
	window: {
		activeTextEditor: null,
		onDidChangeActiveTextEditor: noop,
		visibleTextEditors: [],
	},
};

const originalLoad = Module._load;
Module._load = function (request, parent, isMain) {
	if (request === "vscode") {
		return vscodeStub;
	}
	return originalLoad.call(this, request, parent, isMain);
};

// Load the extension after the stub is in place.
const extension = require("../extension.js");
const pkg = require("../package.json");

test("extension exports activate function", () => {
	assert.equal(typeof extension.activate, "function", "extension must export activate()");
});

test("extension exports deactivate function", () => {
	assert.equal(typeof extension.deactivate, "function", "extension must export deactivate()");
});

test("extension activates without throwing", () => {
	const context = { subscriptions: [] };
	assert.doesNotThrow(() => extension.activate(context), "activate() must not throw");
});

test("extension deactivates without throwing", () => {
	assert.doesNotThrow(() => extension.deactivate(), "deactivate() must not throw");
});

test("package.json declares a main entry point", () => {
	assert.ok(pkg.main, "package.json must declare a main entry point");
	assert.equal(pkg.main, "./extension.js", "main entry must point to extension.js");
});

test("package.json declares vscode engine requirement", () => {
	assert.ok(pkg.engines?.vscode, "package.json must declare a vscode engine requirement");
});

test("package.json declares no-animal-violence.enable configuration", () => {
	const props = pkg.contributes?.configuration?.properties;
	assert.ok(props, "package.json must declare configuration properties");
	assert.ok(
		props["no-animal-violence.enable"],
		"must declare no-animal-violence.enable configuration key (matches diagnostic-collection name and diagnostic.source)",
	);
	assert.ok(props["no-animal-violence.severity"], "must declare no-animal-violence.severity configuration key");
	assert.equal(props["speciesism.enable"], undefined, "must NOT retain the legacy speciesism.* namespace");
	assert.equal(props["speciesism.severity"], undefined, "must NOT retain the legacy speciesism.* namespace");
});
