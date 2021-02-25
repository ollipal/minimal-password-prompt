const prompt = require('minimal-password-prompt'); // if cloned: require('../index');

// Second parameter 'ctrlcExits' has value false.
// Now will throw error if Ctrl+C is pressed during prompt
prompt('enter password: ', false) // NOW PRESS CTRL+C
  .then(pw => console.log(`password: ${pw}`))
  .catch(err => console.log('ctrl+c was pressed during the prompt')); // Ctrl+C can be handled here
