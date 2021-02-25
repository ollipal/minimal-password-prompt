const prompt = require('minimal-password-prompt'); // if cloned: require('../index');

/*
The same as previous example, but the second parameter
'ctrlcExits' has value false.

This means that if Ctrl+C is pressed during prompt
it will throw an error that can be handled in catch block
*/

const getPassword = async () => {
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

(async () => {
  const password = await getPassword();
  console.log(`password: ${password}`); // 'password: undefined'
})();
