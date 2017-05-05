const shortcuts = require('../src/index.js');

const shortcutsDict = {
  bold: ["CmdXorCtrl", "b"],
  zoom_in: ["Ctrl", "+"],
  foo: ["Ctrl", "Shift", "c"]
};

const winShortcuts = shortcuts(shortcutsDict);

const macShortcuts = shortcuts(shortcutsDict, true);


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
