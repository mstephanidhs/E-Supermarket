// check the strength of the password
// some checks happen both in the backend and frontend just to be safier
exports.passwordStrength = function (password) {
  let strength = 0;

  // check if password contains both lower and uppercase chars
  if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength += 1;

  // check if it includes numbers besides characters
  if (password.match(/([0-9])/)) strength += 1;

  // check if password length > 7
  if (password.length > 7) strength += 1;

  // check if it has atleast one special character
  if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1;

  // Extra comments
  // if value>2, it's not good
  // if value=3, it's ok but not good enough
  // if value=4, it's perfect
  return strength;
};
