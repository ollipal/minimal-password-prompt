const startProcessingStdin = (onData) => {
  process.stdin.setEncoding('utf-8');
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.on('data', onData);
};

const stopProcessingStdin = (onData) => {
  process.stdin.removeListener('data', onData);
  process.stdin.pause();
  process.stdin.setRawMode(false);
  process.stdout.write('\n');
};

const prompt = (question, ctrlCExits = true) => {
  return new Promise((resolve, reject) => {
    let input = '';
    const onData = (data) => {
      switch (data) {
        case '\n': // EOL
        case '\r': // EOL
        case '\u0004': // Ctrl+D
          stopProcessingStdin(onData);
          resolve(input);
          break;
        case '\u0003': // Ctrl+C
          stopProcessingStdin(onData);
          ctrlCExits
            ? process.exit()
            : reject(new Error('Ctrl + C / SIGINT'));
          break;
        default:
          [8, 127].includes(data.charCodeAt(0))
            ? input = input.slice(0, -1) // backspace or DEL
            : input += data; // other char
      };
    };
    startProcessingStdin(onData);
    process.stdout.write(question);
  });
};

module.exports = prompt;
