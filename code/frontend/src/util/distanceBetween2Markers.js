// a function that calculates the distance between 2 points
// because the one provided from leaflet wasn't working
const DegreesToRadius = (degrees) => {
  return degrees * (Math.PI / 180);
};

exports.getDistanceInMeters = (lat1, lng1, lat2, lng2) => {
  const earthRadius = 6371;
  const distanceLat = DegreesToRadius(lat2 - lat1);
  const distanceLng = DegreesToRadius(lng2 - lng1);
  const a =
    Math.sin(distanceLat / 2) * Math.sin(distanceLat / 2) +
    Math.cos(DegreesToRadius(lat1)) *
      Math.cos(DegreesToRadius(lat2)) *
      Math.sin(distanceLng / 2) *
      Math.sin(distanceLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;

  return distance * 1000;
};
