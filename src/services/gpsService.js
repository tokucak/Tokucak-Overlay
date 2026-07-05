export function watchSpeed(callback) {
  if (!navigator.geolocation) {
    callback(0);
    return;
  }

  navigator.geolocation.watchPosition(
    (position) => {
      let speed = position.coords.speed;

      if (speed == null) {
        callback(0);
        return;
      }

      speed = Math.round(speed * 3.6);

      callback(speed);
    },
    () => {
      callback(0);
    },
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 5000,
    }
  );
}