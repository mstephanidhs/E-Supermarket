exports.readBitField = (bitValue) => {
  // convert the buffer to an array of bytes
  const byteArray = Array.from(bitValue);

  // convert the array of bytes to an integer value
  const intValue = byteArray[0];

  // compare the integer value to determine if it's 0 or 1
  if (intValue === 0) return "user";
  else return "admin";
};
