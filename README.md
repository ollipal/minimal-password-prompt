# minimal-password-prompt
![npm bundle size](https://img.shields.io/bundlephobia/min/minimal-password-prompt.svg)
![NPM](https://img.shields.io/npm/l/minimal-password-prompt.svg)
![GitHub top language](https://img.shields.io/github/languages/top/ollipal/minimal-password-prompt.svg)
![GitHub issues](https://img.shields.io/github/issues-raw/ollipal/minimal-password-prompt.svg)

Minimal hidden password prompt for Node.js! [[npm](https://www.npmjs.com/package/minimal-password-prompt)] [[github](https://github.com/ollipal/minimal-password-prompt)]

![prompt-password example](https://github.com/ollipal/minimal-password-prompt/blob/main/misc/example.gif)

## Simple, no extra hassles

| package                                                                          | dependencies                                               | dependents                                                 | total lines of production code                                                                        |
|----------------------------------------------------------------------------------|------------------------------------------------------------|------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| [minimal-password-prompt](https://www.npmjs.com/package/minimal-password-prompt) | [0](https://www.npmjs.com/package/minimal-password-prompt) | [0](https://www.npmjs.com/package/minimal-password-prompt) | [48](https://github.com/ollipal/minimal-password-prompt/blob/main/misc/lines-of-code-comparison.md )  |
| [password-prompt](https://www.npmjs.com/package/password-prompt)                 | [2](https://www.npmjs.com/package/password-prompt)         | [43](https://www.npmjs.com/package/password-prompt)        | [2147](https://github.com/ollipal/minimal-password-prompt/blob/main/misc/lines-of-code-comparison.md) |

- No dependencies
- Multiplatform: tested on Windows, Linux and macOS
- Minimal: **[Less than 50 lines of code](https://github.com/ollipal/minimal-password-prompt/blob/main/index.js)**

Seriously, you can also just copy and paste to your project:

```js
const stdin = process.stdin;
const stdout = process.stdout;

const captureStdin = (onData) => {
  stdin.setEncoding('utf-8');
  stdin.setRawMode(true);
  stdin.on('data', onData);
  stdin.resume();
};

const releaseStdin = (onData) => {
  stdin.pause();
  stdin.removeListener('data', onData);
  stdin.setRawMode(false);
  stdout.write('\n');
};

const prompt = (question, ctrlcExits = true) => (
  new Promise((resolve, reject) => {
    let input = '';
    const onData = (data) => {
      switch (data) {
        case '\u000A': // \n
        case '\u000D': // \r
        case '\u0004': // Ctrl+D
          releaseStdin(onData);
          resolve(input);
          break;
        case '\u0003': // Ctrl+C
          releaseStdin(onData);
          ctrlcExits // exit or raise error
            ? process.exit()
            : reject(new Error('Ctrl+C'));
          break;
        case '\u0008': // Backspace
        case '\u007F': // Delete
          input = input.slice(0, -1);
          break;
        default: // any other
          input += data;
      };
    };
    captureStdin(onData);
    stdout.write(question);
  })
);

module.exports = prompt;
```

(please sill do remember to include MIT license/copyright)

## Usage

```js
const prompt = require('minimal-password-prompt');

prompt('enter password: ').then(pw => {
  console.log(`Password: ${pw}`);
});
```

or with async/await:

```js
const prompt = require('minimal-password-prompt');

(async () => {
  const pw = await prompt('enter password: ');
  console.log(`password: ${pw}`);
})();
```

More examples [here](https://github.com/ollipal/minimal-password-prompt/tree/main/examples)

# prompt reference

**Parameters:**
  * `question (String)` prompt output before user input
  * `ctrlcExits (Boolean)`, optional
    * *true:* Ctrl+C exits program (default)
    * *false:* Ctrl+C throws error

**Returns:**
  * `Promise<String>` user input during prompt

# Installation

Install with [npm](https://www.npmjs.com/package/minimal-password-prompt):

```
npm install --save minimal-password-prompt
```