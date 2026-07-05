let watchId = null;
let lastPosition = null;

const speedHistory = [];

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000;

  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function averageSpeed() {
  if (speedHistory.length === 0) return 0;

  const total = speedHistory.reduce((a, b) => a + b, 0);

  return Math.round(total / speedHistory.length);
}

export function watchSpeed(callback) {
  if (!navigator.geolocation) {
    callback(0);
    return;
  }

  watchId = navigator.geolocation.watchPosition(

    (position) => {

      // GPS doğruluğu kötü ise bekle
      if (position.coords.accuracy > 25) {

        callback(0);

        lastPosition = position;

        return;

      }

      if (lastPosition) {

        const distance = getDistance(

          lastPosition.coords.latitude,
          lastPosition.coords.longitude,

          position.coords.latitude,
          position.coords.longitude

        );

        const seconds =

          (position.timestamp - lastPosition.timestamp) / 1000;

        if (seconds > 0) {

                      let kmh = (distance / seconds) * 3.6;

          // Çok küçük hızları sıfır kabul et
          if (kmh < 2) {
            kmh = 0;
          }

          // Mantıksız değerleri yok say
          if (kmh > 180) {
            lastPosition = position;
            return;
          }

          // Son 5 ölçümü tut
          speedHistory.push(kmh);

          if (speedHistory.length > 5) {
            speedHistory.shift();
          }

          // Ortalama hız
          callback(averageSpeed());
        }
      }

      lastPosition = position;
    },

    (error) => {
      console.error("GPS Error:", error);
      callback(0);
    },

    {
      enableHighAccuracy: true,
      maximumAge: 1000,
      timeout: 10000,
    }
  );
}

export function stopWatching() {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
  }
}