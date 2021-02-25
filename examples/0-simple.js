const prompt = require('minimal-password-prompt'); // if cloned: require('../index');

// Second parameter 'ctrlcExits' has the default value true.
// If Ctrl+C is pressed during prompt, program will just exit.
prompt('enter password: ').then(pw => {
  console.log(`Password: ${pw}`);
});
