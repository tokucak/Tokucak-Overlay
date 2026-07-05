export default function Chat() {
  return (
    <>
      <div className="chatHeader">
        💬 CANLI SOHBET
      </div>

      <div className="chatMessages">

        <div className="chatMessage">
          <span className="chatUser">
            Tokucak
          </span>
          : Hoş geldiniz 👋
        </div>

        <div className="chatMessage">
          <span className="chatUser">
            İzleyici
          </span>
          : İyi yayınlar ❤️
        </div>

      </div>
    </>
  );
}