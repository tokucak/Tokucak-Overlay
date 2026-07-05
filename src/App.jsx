import Header from "./components/Header";
import Chat from "./components/Chat";

function App() {
  return (
    <div className="overlay">
      <Header />

      {/* GPS için sadece boş çerçeve */}
      <div className="map"></div>

      <div className="chat">
        <Chat />
      </div>
    </div>
  );
}

export default App;