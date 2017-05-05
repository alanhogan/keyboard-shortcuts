const shortcuts = require('../src/index.js');

const winShortcuts = shortcuts({
  bold: ["CmdXorCtrl", "b"],
  zoom_in: ["Ctrl", "+"],
  foo: ["Ctrl", "Shift", "c"]
});

const macShortcuts = shortcuts({
  bold: ["CmdXorCtrl", "b"],
  ctrl_plus: ["Ctrl", "+"],
  cmd_plus: ["Cmd", "+"],
  foo: ["Ctrl", "Shift", "c"]
}, true);


test("defaults to not mac", () => {
    expect(winShortcuts.mac).toBe(false);
});

test("bold is right on Windows", () => {
    expect(winShortcuts.describeAsString("bold")).toBe("Ctrl+B");
});


test("zoom_in is right on Windows", () => {
    expect(winShortcuts.describeAsString("zoom_in")).toBe("Ctrl +");
});

test("thinks it's mac if you say so", () => {
  expect(macShortcuts.mac).toBe(true);
});

test("bold is right on Mac", () => {
    expect(macShortcuts.describeAsString("bold")).toBe("⌘B");
});

test("explicit ctrl_plus is right on Mac", () => {
    expect(macShortcuts.describeAsString("ctrl_plus")).toBe("^+");
});

test("explicit cmd_plus is right on Mac", () => {
    expect(macShortcuts.describeAsString("cmd_plus")).toBe("⌘+");
});
