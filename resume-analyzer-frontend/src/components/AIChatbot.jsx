// import React, { useState, useEffect, useRef } from 'react';
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { MessageSquare, X, Send, Bot, Gamepad2, Trophy, RotateCcw } from 'lucide-react';

// const genAI = new GoogleGenerativeAI("YOUR_GEMINI_API_KEY");

// export default function AIChatbot() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [mode, setMode] = useState('chat'); // 'chat' or 'game'
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState([{ role: 'bot', text: 'Hi! I am your AI Assistant. Need resume help or want to play a game?' }]);
//   const [isTyping, setIsTyping] = useState(false);
  
//   // --- Game States ---
//   const [score, setScore] = useState(0);
//   const [gameOver, setGameOver] = useState(false);
//   const canvasRef = useRef(null);
//   const chatEndRef = useRef(null);

//   useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

//   // --- AI Chat Logic ---
//   const handleSend = async () => {
//     if (!input.trim()) return;
//     const userMsg = { role: 'user', text: input };
//     setMessages(prev => [...prev, userMsg]);
//     setInput("");
//     setIsTyping(true);

//     try {
//       const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//       const prompt = `You are a helpful assistant for a Resume Analyzer website. User asks: ${input}`;
//       const result = await model.generateContent(prompt);
//       const botText = result.response.text();
//       setMessages(prev => [...prev, { role: 'bot', text: botText }]);
//     } catch (e) {
//       setMessages(prev => [...prev, { role: 'bot', text: "I'm offline. Check your API key!" }]);
//     } finally { setIsTyping(false); }
//   };

//   // --- Flappy Bird Logic ---
//   useEffect(() => {
//     if (mode !== 'game' || !isOpen) return;
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     let animationFrameId;

//     let bird = { x: 50, y: 150, velocity: 0, gravity: 0.5, jump: -7, radius: 10 };
//     let pipes = [];
//     let frame = 0;
//     let localGameOver = false;

//     const gameLoop = () => {
//       if (localGameOver) return;
      
//       // Clear Canvas
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       ctx.fillStyle = "#60a5fa"; // Sky Blue
//       ctx.fillRect(0, 0, canvas.width, canvas.height);

//       // Bird Physics
//       bird.velocity += bird.gravity;
//       bird.y += bird.velocity;
//       ctx.fillStyle = "#fbbf24"; // Yellow Bird
//       ctx.beginPath();
//       ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
//       ctx.fill();

//       // Pipes
//       if (frame % 90 === 0) {
//         let gap = 100;
//         let pipeTopHeight = Math.random() * (canvas.height - gap - 50) + 20;
//         pipes.push({ x: canvas.width, top: pipeTopHeight, bottom: pipeTopHeight + gap });
//       }

//       pipes.forEach((p, i) => {
//         p.x -= 2;
//         ctx.fillStyle = "#22c55e"; // Green Pipe
//         ctx.fillRect(p.x, 0, 40, p.top);
//         ctx.fillRect(p.x, p.bottom, 40, canvas.height);

//         // Collision detection
//         if (bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + 40) {
//           if (bird.y - bird.radius < p.top || bird.y + bird.radius > p.bottom) {
//             localGameOver = true;
//             setGameOver(true);
//           }
//         }
//         if (p.x === 50) setScore(s => s + 1);
//       });

//       pipes = pipes.filter(p => p.x > -40);
//       if (bird.y > canvas.height || bird.y < 0) {
//         localGameOver = true;
//         setGameOver(true);
//       }

//       frame++;
//       animationFrameId = requestAnimationFrame(gameLoop);
//     };

//     const handleJump = () => { bird.velocity = bird.jump; };
//     window.addEventListener('keydown', (e) => e.code === 'Space' && handleJump());
//     canvas.addEventListener('mousedown', handleJump);

//     gameLoop();
//     return () => {
//       cancelAnimationFrame(animationFrameId);
//       window.removeEventListener('keydown', handleJump);
//     };
//   }, [mode, isOpen, gameOver === false]);

//   return (
//     <div className="fixed bottom-6 right-6 z-[9999]">
//       {/* Crisp-style Bubble */}
//       <button 
//         onClick={() => setIsOpen(!isOpen)} 
//         className="bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all active:scale-95"
//       >
//         {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
//       </button>

//       {isOpen && (
//         <div className="absolute bottom-20 right-0 w-[350px] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in slide-in-from-bottom-5">
          
//           {/* Header */}
//           <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
//             <div className="flex items-center gap-2">
//               <Bot size={24} />
//               <div>
//                 <h3 className="font-bold text-sm leading-tight">Career Bot</h3>
//                 <p className="text-[10px] opacity-80">Online & Ready to help</p>
//               </div>
//             </div>
//             <button 
//                 onClick={() => {setMode(mode === 'chat' ? 'game' : 'chat'); setGameOver(false); setScore(0);}}
//                 className="p-2 hover:bg-blue-500 rounded-full transition"
//                 title="Play Game"
//             >
//               {mode === 'chat' ? <Gamepad2 size={20} /> : <MessageSquare size={20} />}
//             </button>
//           </div>

//           {/* Body */}
//           <div className="h-[400px] bg-slate-50 relative">
//             {mode === 'chat' ? (
//               /* --- Chat Mode --- */
//               <div className="h-full overflow-y-auto p-4 space-y-4">
//                 {messages.map((msg, i) => (
//                   <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
//                     <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-slate-700 border rounded-tl-none'}`}>
//                       {msg.text}
//                     </div>
//                   </div>
//                 ))}
//                 {isTyping && <div className="text-[10px] text-gray-400 italic">Gemini is thinking...</div>}
//                 <div ref={chatEndRef} />
//               </div>
//             ) : (
//               /* --- Game Mode --- */
//               <div className="h-full flex flex-col items-center justify-center bg-blue-400">
//                 <div className="absolute top-4 left-4 text-white font-bold text-xl drop-shadow-md">Score: {score}</div>
//                 <canvas ref={canvasRef} width={350} height={350} className="cursor-pointer" />
//                 {gameOver && (
//                   <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white p-6 text-center">
//                     <Trophy size={48} className="text-yellow-400 mb-2" />
//                     <h2 className="text-2xl font-black mb-1">GAME OVER</h2>
//                     <p className="mb-4">Score: {score}</p>
//                     <button 
//                       onClick={() => {setGameOver(false); setScore(0);}}
//                       className="bg-blue-600 px-6 py-2 rounded-full font-bold flex items-center gap-2"
//                     >
//                       <RotateCcw size={18}/> Try Again
//                     </button>
//                   </div>
//                 )}
//                 {!gameOver && <p className="text-white text-[10px] mt-2 font-bold animate-pulse uppercase">Click or Press Space to Jump</p>}
//               </div>
//             )}
//           </div>

//           {/* Footer Input (Only in Chat Mode) */}
//           {mode === 'chat' && (
//             <div className="p-3 bg-white border-t flex gap-2">
//               <input 
//                 className="flex-1 text-sm p-2 outline-none border rounded-xl" 
//                 placeholder="Ask me anything..." 
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyPress={(e) => e.key === 'Enter' && handleSend()}
//               />
//               <button onClick={handleSend} className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700"><Send size={18} /></button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }