exports.containsOnlyNumbers = (str) => {
  // Regular expression to match only digits
  const regex = /^[\d,\.]+$/;
  return regex.test(str);
};
