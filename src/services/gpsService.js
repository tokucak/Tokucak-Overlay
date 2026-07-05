let lastPosition = null;

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000;

  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) ** 2;

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

export function watchSpeed(callback) {
  if (!navigator.geolocation) {
    callback(0);
    return;
  }

  navigator.geolocation.watchPosition(
    (position) => {

      if (lastPosition) {

        const distance = getDistance(
          lastPosition.coords.latitude,
          lastPosition.coords.longitude,
          position.coords.latitude,
          position.coords.longitude
        );

        const time =
          (position.timestamp - lastPosition.timestamp) / 1000;

        if (time > 0) {
          const kmh = Math.round((distance / time) * 3.6);
          callback(kmh);
        }
      }

      lastPosition = position;
    },
    () => callback(0),
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 10000,
    }
  );
}