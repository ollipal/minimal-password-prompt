const prompt = require('minimal-password-prompt'); // if cloned: require('../index');

// Second parameter 'ctrlCExits' has value false.
// Now will throw error if ctrl+c is pressed during prompt
prompt('enter password: ', false) // NOW PRESS CTRL+C
  .then(pw => console.log(`password: ${pw}`))
  .catch(err => console.log('ctrl+c was pressed during the prompt')); // ctrl+c can be handled here
