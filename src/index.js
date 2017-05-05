function tokensForWin(tokens) {
  return tokens.map((token) => {
    if (token === 'CmdXorCtrl') {
      return 'Ctrl'
    } else if (token === 'Meta') {
      return 'Win'
    } else if (token.length === 1) {
      return token.toUpperCase();
    } else {
      return token;
    }
  })
}

function orderMacTokens(tokens) {
  return tokens.sort((a, b) => {
    // Order is ^⌥⇧⌘
    if (a == "^") return -1;
    if (b == "^") return 1;
    if (a == "⌥") return -1;
    if (b == "⌥") return 1;
    if (a == "⇧") return -1;
    if (b == "⇧") return 1;
    if (a == "⌘") return -1;
    if (b == "⌘") return 1;
    return b.charCode - a.charCode;
  });
}

function tokensForMac(tokens) {
  return orderMacTokens(tokens.map((token) => {
    if (token === 'CmdXorCtrl') {
      return '⌘'
    } else if (token === 'Meta') {
      return '⌘'
    } else if (token === 'Ctrl') {
      return '^'
    } else if (token === 'Alt') {
      return '⌥'
    } else if (token === 'Shift') {
      return '⇧'
    } else if (token.length === 1) {
      return token.toUpperCase();
    } else {
      return token;
    }
  }));
}

function standardizeTokens(tokens) {
  return tokens.map((origToken) => {
    const token = origToken.toLowerCase();
    switch(token) {
      case "ctrl":
        return "Ctrl";
      case "control":
        return "Ctrl";
      case "^":
        return "Ctrl";
      case "cmdxorctrl":
        return "CmdXorCtrl";
      case "cmd":
        return "Meta";
      case "command":
        return "Meta";
      case "⌘":
        return "Meta";
      case "alt":
        return "Alt";
      case "option":
        return "Alt";
      case "opt":
        return "Alt";
      case "⎇":
        return "Alt";
      case "⌥":
        return "Alt";
      case "shift":
        return "Shift";
      case "win":
        return "Meta";
      case "windows":
        return "Meta";
      case "meta":
        return "Meta";
      case "left arrow":
        return "←";
      case "up arrow":
        return "↑";
      case "down arrow":
        return "↓";
      case "right arrow":
        return "→";
      default:
        return origToken.toUpperCase();
    }
  });
}

class Shortcuts {
  constructor(dict, isMac = false) {
    this.dict = dict;
    this.mac = !! isMac;
  }

  set mac(isMac) {
    this.isMac = !! isMac;
  }
  get mac () {
    return this.isMac;
  }

  describeAsString(shortcut) {
    if (this.mac) {
      return this.describeAsMacString(shortcut);
    } else {
      return this.describeAsWinString(shortcut);
    }
  }

  describeAsWinString(shortcut) {
    this.requireShortcut(shortcut);

    let tokens = tokensForWin(standardizeTokens(this.dict[shortcut]));
    const lastToken = tokens[tokens.length - 1];

    if (["+", "-"].indexOf(lastToken) > -1) {
      // Special case. We want "Ctrl +" instead of "Ctrl++"
      tokens.pop();
      return `${tokens.join("+")} ${lastToken}`
    }

    return tokens.join("+");
  }

  describeAsMacString(shortcut) {
    this.requireShortcut(shortcut);

    return tokensForMac(standardizeTokens(this.dict[shortcut])).join("");
  }

  requireShortcut(shortcut) {
    if (!Object.prototype.hasOwnProperty.call(this.dict, shortcut)) {
      throw new Error(`Shortcut “${shortcut}” does not exist`);
    }
  }
}


function shortcuts (dict, mac) {
  return new Shortcuts(dict, mac);
}

module.exports = shortcuts;
