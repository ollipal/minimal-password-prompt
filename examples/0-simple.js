const prompt = require('minimal-password-prompt'); // if cloned: require('../index');

// Second parameter 'ctrlCExits' has the default value true.
// If ctrl+c is pressed during prompt, program will just exit.
prompt('enter password: ').then(pw => {
  console.log(`Password: ${pw}`);
});
