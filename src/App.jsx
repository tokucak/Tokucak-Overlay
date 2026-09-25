import Header from "./components/Header";

const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

const rtirlMapUrl =
  `https://overlays.rtirl.com/leaflet.html` +
  `?ak6fu9l6rf4x4kav=ak6fu9l6rf4x4kav` +
  `&access_token=${mapboxToken}` +
  `&style=mapbox/streets-v11` +
  `&zoom=5` +
  `&lang=en` +
  `&attribution=0` +
  `&indicatorStyle=eyJoZWlnaHQiOjEyLCJ3aWR0aCI6MTIsImJvcmRlclJhZGl1cyI6NTAsImJhY2tncm91bmRDb2xvciI6ImN5YW4ifQ%3D%3D`;

function App() {
  return (
    <div className="overlay">
      <Header />

      <div className="map">
        <iframe
          className="rtirlMap"
          src={rtirlMapUrl}
          title="RealtimeIRL GPS Map"
          allow="geolocation"
        />
      </div>
    </div>
  );
}

export default App;