function tokensForWin(tokens) {
  return tokens.map((token) => {
    if (token === 'CmdXorCtrl') {
      return 'Ctrl'
    } else if (token.length === 1) {
      return token.toUpperCase();
    } else {
      return token;
    }
  })
}

function tokensForMac(tokens) {
  return tokens.map((token) => {
    if (token === 'CmdXorCtrl') {
      return '⌘'
    } else if (token === 'Cmd') {
      return '⌘'
    } else if (token === 'Ctrl') {
      return '^'
    } else if (token === 'Alt') {
      return '⎇'
    } else if (token === 'Shift') {
      return '⇧'
    } else if (token.length === 1) {
      return token.toUpperCase();
    } else {
      return token;
    }
  })
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

    let tokens = tokensForWin(this.dict[shortcut]);
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

    return tokensForMac(this.dict[shortcut]).join("");
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
