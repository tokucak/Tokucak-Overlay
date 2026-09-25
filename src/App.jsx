import Header from "./components/Header";
import RealtimeMap from "./RealtimeMap";

function App() {
  return (
    <div className="overlay">
      <Header />

      <div className="map">
        <RealtimeMap />
      </div>
    </div>
  );
}

export default App;