const prompt = require('../index');

/**
 * Here are the examples that you can manually test by running
 * 'npm test' + number 0-3
 *
 * The examples are copied here instead of importing mainly because
 * npm gives better search scores when the test files are larger...
 */

const myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs[0]);

const pickPassword2 = async () => {
  let password, repassword;
  while (true) {
    password = await prompt('pick a password: ');
    repassword = await prompt('re-enter password: ');
    if (password === repassword) break;
    console.log('passwords did not match, please try again:');
  }
  return password;
};

const getPassword3 = async () => {
  try {
    let password, repassword;
    while (true) {
      password = await prompt('pick a password: ', false); // NOW PRESS CTRL+C
      repassword = await prompt('re-enter password: ', false); // NOW PRESS CTRL+C
      if (password === repassword) break;
      console.log('passwords did not match, please try again:');
    }
    return password;
  } catch (err) {
    console.log('ctrl+c was pressed during the prompt'); // Ctrl+C can be handled here
  }
};

switch (process.argv.slice(2)[0]) {
  case '0':
    // 0-simple.js

    // Second parameter 'ctrlcExits' has the default value true.
    // If Ctrl+C is pressed during prompt, program will just exit.
    prompt('enter password: ').then(pw => {
      console.log(`Password: ${pw}`);
    });
    break;
  case '1':
    // 1-simple-error.js

    // Second parameter 'ctrlcExits' has value false.
    // Now will throw error if Ctrl+C is pressed during prompt
    prompt('enter password: ', false) // NOW PRESS CTRL+C
      .then(pw => console.log(`password: ${pw}`))
      .catch(err => console.log('ctrl+c was pressed during the prompt')); // Ctrl+C can be handled here
    break;
  case '2':
    // 2-pick.js

    /*
    More complex example asking user to pick
    a password by using async/await syntax
    */

    (async () => {
      const password = await pickPassword2();
      console.log(`password: ${password}`);
    })();
    break;
  case '3':
    /*
    The same as previous example, but the second parameter
    'ctrlcExits' has value false.

    This means that if Ctrl+C is pressed during prompt
    it will throw an error that can be handled in catch block
    */

    (async () => {
      const password = await getPassword3();
      console.log(`password: ${password}`); // 'password: undefined'
    })();
    break;
  default:
    // 0-simple.js

    // Second parameter 'ctrlcExits' has the default value true.
    // If Ctrl+C is pressed during prompt, program will just exit.
    prompt('enter password: ').then(pw => {
      console.log(`Password: ${pw}`);
    });
};
