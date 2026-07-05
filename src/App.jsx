import Header from "./components/Header";

function App() {
  return (
    <div className="overlay">
      <Header />

      {/* Moblin Map Widget buraya gelecek */}
      <div className="map"></div>
    </div>
  );
}

export default App;