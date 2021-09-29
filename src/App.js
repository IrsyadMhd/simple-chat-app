import { Fragment, useEffect } from "react";
import { useState } from "react";

import "./App.css";
import firebase from "firebase/compat/app";
import db from "./firebase";
import MessageList from "./MessageList";

function App() {
  const [inputMsg, setInputMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("fulan");
  const [intro, setIntro] = useState("");

  useEffect(() => {
    const username = prompt("Silahkan masukkan nama anda")?.trim();
    if (!username) {
      setIntro(<p>Maaf, anda belum memasukkan nama!!</p>);
    } else {
      setIntro(
        <p>
          Ahlan wa sahlan
          <span className="username">{username}</span>
        </p>
      );
      db.collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }

    setUsername(username);
  }, []);

  const inputHandler = (e) => {
    setInputMsg(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!username) return;
    // setMessages((prevMsg) => [
    //   ...prevMsg,
    //   { username: username, message: inputMsg },
    // ]);
    db.collection("messages").add({
      message: inputMsg,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInputMsg("");
  };

  return (
    <Fragment>
      <header className="center App-header container">
        <h1>Ya Akhi Simple Chat App</h1>
        {intro}
        <form onSubmit={submitHandler} className="app__form">
          <input value={inputMsg} onChange={inputHandler} />
          <button disabled={!inputMsg || !username} type="submit">
            KIRIM PESAN {`>`}
          </button>
        </form>
      </header>
      <main className="container main">
        {messages.length !== 0 && (
          <MessageList items={messages} user={username} />
        )}
      </main>
    </Fragment>
  );
}

export default App;
