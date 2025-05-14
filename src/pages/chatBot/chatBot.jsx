import axios from "axios";
import { useState } from "react";

const ChatBot = () => {
    const [input, setInput] = useState("");
    const [chat, setChat] = useState([]);

    const handleSend = async () => {
        const userMsg = { sender: "user", text: input };
        setChat([...chat, userMsg]);

        const res = await axios.post("http://localhost:5000/api/chatBot/chat", {
            message: input,
        });

        const botMsg = { sender: "bot", text: res.data.reply };
        setChat((prev) => [...prev, botMsg]);
        setInput("");
    };

    return (
        <div className="bg-gray-900 text-white p-4 max-w-2xl mx-auto mt-36 rounded-lg">
            <h2 className="text-lg font-bold mb-4">🎬 Movie Assistant Chat</h2>
            <div className="h-72 overflow-y-scroll bg-gray-800 p-2 mb-4 rounded">
                {chat.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`mb-2 p-2 rounded ${msg.sender === "user" ? "text-right ml-auto" : "text-left"}`}
                    >
                        <div className={`inline-block p-2 rounded ${msg.sender === "user" ? "bg-cyan-600 text-white" : "bg-teal-400 text-black"}`}>
                            <strong>{msg.sender === "user" ? "You" : "Movie Expert"}:</strong> {msg.text}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about a movie..."
                    className="flex-1 p-2 bg-gray-700 rounded-l"
                />
                <button onClick={handleSend} className="bg-blue-600 px-4 rounded-r">
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatBot;