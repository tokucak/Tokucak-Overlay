import { useState } from "react";
import Header from "./components/Header";
import RealtimeMap from "./RealtimeMap";

function App() {
  const [speed, setSpeed] = useState(0);

  return (
    <div className="overlay">

      <Header />

      <div className="mapArea">

        {/* HIZ KADRANI */}
        <div className="speedGauge">

          <div className="speedValue">
            {speed}
          </div>

          <div className="speedUnit">
            km/h
          </div>

        </div>

        {/* HARİTA */}
        <div className="map">

          <RealtimeMap
            onSpeedChange={setSpeed}
          />

        </div>

      </div>

    </div>
  );
}

export default App;