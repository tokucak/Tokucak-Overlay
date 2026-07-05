import { useEffect, useState } from "react";
import { getWeather } from "../services/weatherService";
import { watchSpeed } from "../services/gpsService";

export default function Header() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  const [speed, setSpeed] = useState(0);

  const [weather, setWeather] = useState({
    temperature: "--",
    humidity: "--",
  });

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();

      setTime(
        now.toLocaleTimeString("tr-TR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );

      setDate(
        now.toLocaleDateString("tr-TR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      );
    };

    updateClock();

    const clock = setInterval(updateClock, 1000);

    return () => clearInterval(clock);
  }, []);

  useEffect(() => {
    async function loadWeather() {
      const data = await getWeather(36.7867, 31.4433);
      setWeather(data);
    }

    loadWeather();

    const interval = setInterval(loadWeather, 300000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    watchSpeed((kmh) => {
      setSpeed(kmh);
    });
  }, []);

  return (
    <div className="header">
      <h1>kick.com/tokucak</h1>

      <div className="info">

        <div className="lastSub">
          ⭐
        </div>

        <div className="lastGift">
          🎁
        </div>

        <div className="lastFollow">
          ❤️
        </div>

        <div>📍 Manavgat / Antalya</div>

        <div>🌤️ {weather.temperature}°C</div>

        <div>💧 %{weather.humidity}</div>

        <div>🏍️ Hız: {speed} km/sa</div>

        <div>🕒 {time}</div>

        <div>📅 {date}</div>

      </div>
    </div>
  );
}