"use client";

import { useState } from "react";

export const AI_ChatbotAgent = () => {
  const [message, setMessage] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");

  const handleMessage = async () => {
    if (!input.trim()) return;

    const newUserMessage = {
      role: "user",
      content: input,
    };
    const updatedMessages = [...message, newUserMessage];
    setMessage(updatedMessages);
    setInput("");
    try{
      const response = await fetch("https://simple-ai-chatbot-eoei.onrender.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        messages: updatedMessages,
      }),
    });
    if (!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    setMessage(prevMessage => [...prevMessage, {role: 'assistant', content: data.final_output}])
    } catch(error){
      console.error("Error sending message to Chainlit:", error);
      setMessage(prevMessage => [...prevMessage, { role: 'assistant', content: "Sorry, I am facing some technical issues. Please try again later." }]);
    } 
}

  return (
  <div className="border-2 border-red-400 p-4 max-w-md mx-auto">
    <div className="chat-container text-black h-96 overflow-y-auto mb-4">
      {message.map((msg, index) => (
        <div key={index} className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
          <span
            className={`inline-block p-2 rounded ${
              msg.role === "user" ? "bg-blue-200" : "bg-gray-200 text-black"
            }`}
          >
            {msg.role === "user" ? "You" : "Assistant"}: {msg.content}
          </span>
        </div>
      ))}
    </div>
    <div className="flex">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleMessage()}
        className="flex-1 p-2 text-black border rounded"
        placeholder="Type your message..."

      />
      <button
        onClick={handleMessage}
        className="ml-2 p-2 bg-blue-500 text-white rounded"
        
      >
        Send
      </button>
    </div>
  </div>
);

};

