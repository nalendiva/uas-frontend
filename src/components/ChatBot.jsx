import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from '../assets/logo.svg';
import LoginContext from "../context/LoginContext"; // import context login

const ChatBot = () => {
  const { isLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const firstLoadRef = useRef(true); // Ref untuk mengecek load pertama

  // Redirect jika belum login
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll otomatis hanya jika ada pesan baru, bukan saat load pertama
  useEffect(() => {
    if (firstLoadRef.current) {
      firstLoadRef.current = false;
      return; // skip scroll di load pertama
    }
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const handleSubmit = async () => {
    if (!query.trim()) return;

    setMessages((prev) => [...prev, { type: "user", content: query }]);
    setLoading(true);

    try {
      const res = await axios.post(
        "http://54.83.112.249:8000/submit_query",
        { query_text: query },
        { headers: { "Content-Type": "application/json" } }
      );

      let content = res.data?.response_text?.content || "No response";
      const sources = res.data?.sources || [];

      // Gabungkan baris yang terpotong
      content = content.replace(/\n(?=[a-z])/gi, " ");

      // Pecah jadi baris
      let lines = content.split(/\n|•|-/).map(line => line.trim()).filter(line => line);

      let numbering = 1;
      const formattedLines = lines.map(line => {
        if (line.startsWith("**")) {
          // Kalau mulai dengan ** maka kasih nomor
          return `${numbering++}. ${line}`;
        }
        return line; // selain itu tampilkan apa adanya
      });

      const formattedContent = formattedLines.join("\n");

      setMessages(prev => [
        ...prev,
        { type: "bot", content: formattedContent, sources }
      ]);
      setQuery("");
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { type: "bot", content: "Terjadi kesalahan saat mengambil jawaban." },
      ]);
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 flex flex-col h-screen">
      {/* Bagian logo + judul di tengah */}
      <div className="flex justify-center items-center mb-6">
        <img src={Logo} alt="Health Nest Logo" className="h-10 w-auto mr-2" />
        <span className="text-2xl font-bold text-accent">Health Nest</span>
      </div>
      <div className="flex-1 overflow-y-auto border-4 rounded-lg p-4 bg-light flex flex-col gap-4 max-h-[60vh]">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[80%] p-3 rounded-xl shadow ${msg.type === "user"
              ? "self-end bg-accent text-white"
              : "self-start bg-white text-black"
              }`}
          >
            <p style={{ whiteSpace: "pre-line" }}>{msg.content}</p>
            {msg.type === "bot" && msg.sources && msg.sources.length > 0 && (
              <div className="mt-2 text-xs text-gray-500 italic">
                <strong>Sources:</strong>
                <ul className="list-disc list-inside ml-2">
                  {msg.sources.map((src, i) => (
                    <li key={i}>{src}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="mt-4 flex gap-2">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Tulis pertanyaan kamu..."
          rows={2}
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
        />
        <button
          onClick={handleSubmit}
          disabled={loading || !query.trim()}
          className={`px-4 py-2 rounded-md text-white transition ${loading || !query.trim()
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-accent hover:bg-primary"
            }`}
        >
          {loading ? "Loading..." : "Kirim"}
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
