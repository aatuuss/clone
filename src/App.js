import './App.css';
import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import sendBtn from './assets/send.svg';
import userIcon from './assets/user-icon.png';
import gptImgLogo from './assets/chatgptLogo.svg';
import { sendMsgToOpenAI } from './openai';
import { useEffect, useRef, useState } from 'react';

function App() {
  const msgEnd = useRef(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hi there! How can I help you today?", isBot: true },
  ]);

  useEffect(() => {
    msgEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const text = input.trim();
    setInput('');

    setMessages((prev) => [...prev, { text, isBot: false }]);
    const res = await sendMsgToOpenAI(text);
    setMessages((prev) => [...prev, { text: res, isBot: true }]);
  };

  const handleEnter = async (e) => {
    if (e.key === 'Enter') await handleSend();
  };

  const handleQuery = async (text) => {
    setInput('');
    setMessages((prev) => [...prev, { text, isBot: false }]);
    const res = await sendMsgToOpenAI(text);
    setMessages((prev) => [...prev, { text: res, isBot: true }]);
  };

  console.log("OPENAI KEY:", process.env.REACT_APP_OPENROUTER_API_KEY);

  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={gptLogo} alt="Logo" className="logo" />
            <span className="brand">ChatGPT</span>
          </div>
          <button className="midBtn" onClick={() => window.location.reload()}>
            <img src={addBtn} alt="new chat" className="addBtn" />New Chat
          </button>
          <div className="upperSideButton">
            <button className="query" onClick={() => handleQuery("What is Programming?")}>
              <img src={msgIcon} alt="Query" />What is Programming?
            </button>
            <button className="query" onClick={() => handleQuery("How to use an API?")}>
              <img src={msgIcon} alt="Query" />How to use an API?
            </button>
          </div>
        </div>
        <div className="lowerSide">
          <div className="listItems">
            <img src={home} alt="Home" className="listItemImg" />Home
          </div>
          <div className="listItems">
            <img src={saved} alt="Saved" className="listItemImg" />Saved
          </div>
          <div className="listItems">
            <img src={rocket} alt="Upgrade" className="listItemImg" />Upgrade
          </div>
        </div>
      </div>

      <div className="main">
        <div className="chats">
          {messages.map((msg, i) => (
            <div key={i} className={msg.isBot ? "chat bot" : "chat"}>
              <img className="chatImg" src={msg.isBot ? gptImgLogo : userIcon} alt="" />
              <p className="txt">{msg.text}</p>
            </div>
          ))}
          <div ref={msgEnd}></div>
        </div>

        <div className="chatFooter">
          <div className="inp">
            <input
              type="text"
              placeholder="Send a message"
              value={input}
              onKeyDown={handleEnter}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="send" onClick={handleSend}>
              <img src={sendBtn} alt="Send" />
            </button>
          </div>
          <p>Chat may produce inaccurate information.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
