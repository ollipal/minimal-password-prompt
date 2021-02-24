# minimal-password-prompt

Minimal hidden password prompt for Node.js! Install with [npm](https://www.npmjs.com/package/minimal-password-prompt):

```
npm install --save minimal-password-prompt
```

## Simple, no extra hassles

- no dependencies
- hides all user input
- easy to use
- **less than 50 lines of code**

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

More examples [here](examples)

# prompt reference

Parameters:
  * `question (String)` prompt output before user input
  * `ctrlcExits (Boolean)`, optional
    * *true:* Ctrl+C exits program (default)
    * *false:* Ctrl+C throws error

Returns:
  * `Promise<String>` user input during prompt

## TODO

- Usage GIF
- comparison to other similar packages
- test more platforms
