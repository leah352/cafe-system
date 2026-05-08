const bcrypt = require('bcryptjs');

const [, , plain] = process.argv;
if (!plain) {
  console.error('Usage: node hash-password.js <password>');
  process.exit(1);
}

(async () => {
  const hash = await bcrypt.hash(plain, 10);
  console.log(hash);
})();
