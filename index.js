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
