const prompt = require('../index'); // if cloned: require('../index');

/*
More complex example asking user to pick
a password by using async/await syntax
*/

const pickPassword = async () => {
  let password, repassword;
  while (true) {
    password = await prompt('pick a password: ');
    repassword = await prompt('re-enter password: ');
    if (password === repassword) break;
    console.log('passwords did not match, please try again:');
  }
  return password;
};

(async () => {
  const password = await pickPassword();
  console.log(`password: ${password}`);
})();
