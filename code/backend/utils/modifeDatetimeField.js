exports.modifyDatetimeField = (datetimeString) => {
  // parse the datetime string
  const dateTime = new Date(datetimeString);

  // Format the date and hours
  const formattedDate = dateTime.toLocaleDateString(); // Format date as per locale
  const formattedHours = dateTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }); // Format hours as HH:mm

  // combine formatted date and hours
  const formattedDateTime = `${formattedDate} ${formattedHours}`;

  return formattedDateTime;
};
