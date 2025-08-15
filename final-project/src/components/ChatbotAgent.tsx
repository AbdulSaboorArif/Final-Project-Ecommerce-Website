"use client";

import { useState } from "react";
import { LuMessageCircleCode } from "react-icons/lu";

import { FiMinimize, FiX } from "react-icons/fi"; // Added new icons
import { Send } from "lucide-react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [storeMessage, setStoreMessage] = useState([
    {
      sender: "bot",
      text: "Hi! I'm a helpful chatbot of this Furniture Website. How can I help you?",
    },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newUserMessage = { sender: "user", text: input };
    setStoreMessage((prev) => [...prev, newUserMessage]);
    setInput("");

    try {
      const request = await fetch("https://tester-chatbot.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await request.json();

      const botResponse = { sender: "bot", text: data.response };
      setStoreMessage((prev) => [...prev, botResponse]);
    } catch {
      const errorResponse = {
        sender: "bot",
        text: "Sorry, there was a technical issue. Please try again later.",
      };
      setStoreMessage((prev) => [...prev, errorResponse]);
    }
  };

  return (
    <div>
      {/* Chat button */}
      <div
        className="animate-bounce fixed bottom-6 right-6 bg-blue-600 text-black p-4 rounded-full cursor-pointer shadow-lg hover:bg-indigo-700 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <LuMessageCircleCode size={24} />
      </div>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-[450px] bg-white border border-gray-800 rounded-xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ease-in-out">
          {/* Chat header */}
          <div className="bg-gradient-to-r from-sky-600 to-pink-600 p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <h2 className="text-md font-semibold text-black">Furniture Assistant</h2>
            </div>
            <div className="flex items-center space-x-2">
              <FiMinimize
                size={18}
                className="text-black cursor-pointer hover:text-gray-600"
                onClick={() => setIsOpen(false)}
              />
              <FiX
                size={18}
                className="text-black cursor-pointer hover:text-gray-600"
                onClick={() => setIsOpen(false)}
              />
            </div>
          </div>

          {/* Chat messages area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {storeMessage.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 shadow-sm ${
                    msg.sender === "user"
                      ? "bg-indigo-600 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input field */}
          <div className="text-black p-4 border-t border-gray-200 flex items-center bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message..."
              className="flex-1 p-3 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={sendMessage}
              className="ml-3 p-3 bg-indigo-600 text-white  rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Send />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;

// "use client";

// import { request } from "http";
// import { LuMessageCircleCode } from "react-icons/lu";
// import { useState } from "react";

// const Chatbot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [storeMessage, setStoreMessage] = useState([
//     {
//       sender: "user",
//       text: "Hi! I am a help full chatbot of this Furniture Website How Can I Help You",
//     },
//   ]);
//   const [input, setInput] = useState("");

//   // Check if user type space or empty input so it convert in one string ""
//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     // Using Spread Operator to add new messagae in existing arrary
//     setStoreMessage([...storeMessage, { sender: "user", text: input }]);

//     // Fetch Chatbot By API
//     try {
//       const request = await fetch("https://tester-chatbot.onrender.com/chat", {
//         method: "Post",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: input }),
//       });
//       const data = await request.json();

//       // Add Bot Response
//       setStoreMessage((pre) => [
//         ...pre,
//         { sender: "bot", text: data.response },
//       ]);
//     } catch (err) {
//       setStoreMessage((pre) => [
//         ...pre,
//         { sender: "bot", text: "Sorry For Techinical Issues Please Try Leter" },
//       ]);
//     }
//     setInput("");
//   };

//   return (
//     <div>
//       {/* Chat Button */}
//       <div
//         className="fixed bottom-6 right-6 bg-purple-600 text-black px-6 py-4 rounded-full cursor-pointer shadow-lg"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <LuMessageCircleCode />
//       </div>
//       {/* Chat Window */}
//       {isOpen && (
//         <div className="fixed bottom-20 right-6 w-80 bg-white border rounded-lg shadow-lg flex flex-col">
//           <div className="text-black">AI Chatbot</div>

//           <div>
//             {storeMessage.map((msg, i) => (
//               <div
//                 key={i}
//                 className={`my-2 p-2 rounded-lg max-w-[80%] ${
//                   msg.sender === "bot"
//                     ? "bg-gray-200 text-black self-start"
//                     : "bg-gray-200 text-black self-start"
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             ))}
//           </div>

//           <div className="text-black">
//             <input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//               placeholder="Enter Any Qureirs About Website"
//             />
//           </div>
//           <button
//             onClick={sendMessage}
//             className="bg-purple-600 text-white px-4 rounded-r-lg"
//           >
//             ➤
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chatbot;

// "use client";

// import { useState } from "react";

// export default function ChatbotWidget() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     { sender: "bot", text: "Assalam o Alaikum! How can I help you today?" }
//   ]);
//   const [input, setInput] = useState("");
//   console.log(input)
//   const sendMessage = async () => {
//     if (!input.trim()) return;
//     console.log(sendMessage)
//     // Show user message instantly
//     setMessages([...messages, { sender: "user", text: input }]);

//     // Send to your chatbot API
//     try {
//       const res = await fetch("https://tester-chatbot.onrender.com/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: input })
//       });
//       const data = await res.json();
//       console.log(data)
//       // Add bot response
//       setMessages(prev => [...prev, { sender: "bot", text: data.response }]);
//     } catch (err) {
//       setMessages(prev => [...prev, { sender: "bot", text: "Error connecting to chatbot." }]);
//     }

//     setInput("");
//     console.log(setInput)
//   };

//   return (
//     <div>
//       {/* Floating Button */}
//       <div
//         className="fixed bottom-6 right-6 bg-purple-600 text-black px-4 py-3 rounded-full cursor-pointer shadow-lg"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         💬 Chat
//       </div>

//       {/* Chat Window */}
//       {isOpen && (
//         <div className="fixed bottom-20 right-6 w-80 bg-white border rounded-lg shadow-lg flex flex-col">
//           <div className="bg-purple-600 text-black p-3 font-bold">
//             AbdulGPT
//           </div>

//           <div className="flex-1 p-3 overflow-y-auto max-h-96">
//             {messages.map((msg, i) => (
//               <div
//                 key={i}
//                 className={`my-2 p-2 rounded-lg max-w-[80%] ${
//                   msg.sender === "bot"
//                     ? "bg-gray-200 text-black self-start"
//                     : "bg-purple-500 text-black self-end"
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             ))}
//           </div>

//           <div className="flex p-2 border-t text-black">
//             <input
//               value={input}
//               onChange={e => setInput(e.target.value)}
//               onKeyDown={e => e.key === "Enter" && sendMessage()}
//               placeholder="Type your message..."
//               className="flex-1 p-2 border rounded-l-lg outline-none"
//             />
//             <button
//               onClick={sendMessage}
//               className="bg-purple-600 text-black px-4 rounded-r-lg"
//             >
//               ➤
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
