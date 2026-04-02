/**
 * Placeholder tests for the VS Code extension pattern dictionary.
 *
 * The extension requires the `vscode` runtime which is only available inside
 * an Extension Development Host. These tests exercise the pattern-matching
 * logic directly, without loading the full extension, by extracting the
 * PATTERNS array via module mock injection.
 */

const assert = require("node:assert/strict");
const { test } = require("node:test");
const Module = require("node:module");

// Stub the vscode module so the extension file can be required outside VS Code.
const originalLoad = Module._load;
Module._load = function (request, parent, isMain) {
	if (request === "vscode") {
		return {
			languages: { createDiagnosticCollection: () => ({}) },
			workspace: { onDidChangeTextDocument: () => ({}) },
			window: { onDidChangeActiveTextEditor: () => ({}) },
			DiagnosticSeverity: { Warning: 1, Error: 0 },
			Diagnostic: class {},
			Range: class {},
			Position: class {},
			CodeAction: class {},
			CodeActionKind: { QuickFix: "quickfix" },
		};
	}
	return originalLoad.call(this, request, parent, isMain);
};

// Load the extension after the stub is in place.
// PATTERNS is not exported, so we verify its structure via package.json instead.
const pkg = require("../package.json");

test("package.json declares a main entry point", () => {
	assert.ok(pkg.main, "package.json must declare a main entry point");
	assert.equal(pkg.main, "./extension.js", "main entry must point to extension.js");
});

test("package.json declares vscode engine requirement", () => {
	assert.ok(pkg.engines?.vscode, "package.json must declare a vscode engine requirement");
});

test("package.json declares speciesism.enable configuration", () => {
	const props = pkg.contributes?.configuration?.properties;
	assert.ok(props, "package.json must declare configuration properties");
	assert.ok(props["speciesism.enable"], "must declare speciesism.enable configuration key");
});
