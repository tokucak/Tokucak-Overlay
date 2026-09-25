import Header from "./components/Header";

const pullKey = "ak6fu9l6rf4x4kav";

const rtirlMapUrl =
  `https://overlays.rtirl.com/generic.html?key=${pullKey}&zoom=13&lang=en`;

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