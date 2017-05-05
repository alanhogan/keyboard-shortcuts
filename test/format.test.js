const shortcuts = require('../src/index.js');

const sharedShortcutDict = {
  bold: ["CmdXorCtrl", "b"],
  foo: ["CmdXorCtrl", "Shift", "c"]
};
const winShortcuts = shortcuts(Object.assign({}, sharedShortcutDict, {
  zoom_in: ["Ctrl", "+"]
}));

const macShortcuts = shortcuts(Object.assign({}, sharedShortcutDict, {
  ctrl_plus: ["Ctrl", "+"],
  cmd_plus: ["Cmd", "+"]
}), true);

describe("on windows", () => {

  test("defaults to not mac", () => {
      expect(winShortcuts.mac).toBe(false);
  });

  test("bold is right", () => {
      expect(winShortcuts.describeAsString("bold")).toBe("Ctrl+B");
  });


  test("zoom_in is right", () => {
      expect(winShortcuts.describeAsString("zoom_in")).toBe("Ctrl +");
  });

  test("will believe you every time you tell it is on mac or not", () => {
    winShortcuts.mac = true;
    expect(winShortcuts.mac).toBe(true);
    winShortcuts.mac = false;
    expect(winShortcuts.mac).toBe(false);
  })

  test("will correctly format a platform-independent Ctrl+Shift+C", () => {
    expect(winShortcuts.describeAsString("foo")).toBe("Ctrl+Shift+C");
  });

});

describe("on mac", () => {

  test("thinks it's mac if instantiated like that", () => {
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
  test("will correctly format a platform-independent Ctrl+Shift+C", () => {
    expect(macShortcuts.describeAsString("foo")).toBe("⇧⌘C");
  });
});
