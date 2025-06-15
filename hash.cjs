const bcrypt = require('bcrypt');
const password = '16Ignacio#';
bcrypt.hash(password, 10, (err, hash) => {
  if (err) throw err;
  console.log('Este es el hash de tu contraseña:');
  console.log(hash);
});
