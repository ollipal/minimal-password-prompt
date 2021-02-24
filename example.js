const prompt = require('./index');

(async () => {
  let password, repassword;
  while (true) {
    password = await prompt('enter password: ');
    repassword = await prompt('re-enter password: ');
    if (password === repassword) break;
    console.log('passwords did not match, please try again:');
  }
  console.log(`Password: ${password}`);
})();
