import { useState } from "react";

export default function App() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { role: "user", content: input }];
        setMessages(newMessages);
        setInput("");

        const response = await fetch("http://localhost:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: input }),
        });

        const data = await response.json();
        setMessages([...newMessages, { role: "assistant", content: data.response }]);
    };

    return (
        <div className="flex flex-col h-screen p-4 bg-gray-900 text-white">
            <h1 className="text-2xl font-bold mb-4">MRC Chatbot</h1>
            <div className="flex-grow overflow-auto p-2 border border-gray-700 rounded">
                {messages.map((msg, index) => (
                    <div key={index} className={`p-2 ${msg.role === "user" ? "text-blue-400" : "text-green-400"}`}>
                        <strong>{msg.role === "user" ? "You" : "MRC Chatbot"}:</strong> {msg.content}
                    </div>
                ))}
            </div>
            <div className="flex gap-2 mt-4">
                <input
                    className="flex-grow p-2 rounded bg-gray-800 text-white"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                />
                <button className="bg-blue-500 p-2 rounded" onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}
