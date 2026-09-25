import Header from "./components/Header";

const pullKey = "BURAYA_KENDI_PULL_KEYIN";

const rtirlMapUrl =
  `https://overlays.rtirl.com/generic.html?key=${ak6fu9l6rf4x4kav}&zoom=13&lang=en`;

function App() {
  return (
    <div className="overlay">
      <Header />

      <div className="map">
        <iframe
          className="rtirlMap"
          src={rtirlMapUrl}
          title="RealtimeIRL GPS Map"
        />
      </div>
    </div>
  );
}

export default App;