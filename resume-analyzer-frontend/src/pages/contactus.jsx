import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Sparkles } from 'lucide-react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState(""); // To track "Sending...", "Success", etc.

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    // REPLACE 'your-form-id' with the ID from Formspree
    const FORMSPREE_ID = "https://formspree.io/f/xeeelven"; 

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: '', email: '', message: '' });
        alert("Success! Your message was sent directly to our email inbox.");
      } else {
        setStatus("error");
        alert("Oops! There was a problem sending your message.");
      }
    } catch (error) {
      setStatus("error");
      alert("Network error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 md:p-12">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100">
        
        {/* --- LEFT SIDE: INFO SECTION --- */}
        <div className="bg-slate-900 p-10 md:p-16 text-white relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full -mr-20 -mt-20" />
          
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-blue-500/30">
              <Sparkles size={14} />
              Email Integration Active
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              Let's Talk About <br />
              <span className="text-blue-500 font-black">Your Career.</span>
            </h1>
            <p className="text-slate-400 text-lg mb-12 max-w-sm leading-relaxed">
              Have questions? Submit this form and it will be delivered directly to our support team's inbox.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center">
                  <Mail className="text-blue-400" size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Direct Email</p>
                  <p className="font-bold text-slate-100 italic">contact@skillsight.ai</p>
                </div>
              </div>
              {/* Phone and Address cards stay the same... */}
            </div>
          </div>

          <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] mt-16">
            SkillSight AI v2.0 • Formspree Integrated
          </div>
        </div>

        {/* --- RIGHT SIDE: FORM SECTION --- */}
        <div className="p-10 md:p-16 flex flex-col justify-center">
          <div className="mb-10">
            <h2 className="text-2xl font-black text-slate-800 mb-2 uppercase tracking-tight">Send a Message</h2>
            <div className="w-12 h-1.5 bg-blue-600 rounded-full" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})} // Handling email specifically
                required
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-medium resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-slate-900 hover:bg-blue-600 text-white font-black py-5 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-sm disabled:bg-slate-400"
            >
              <Send size={18} />
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-400 text-xs font-medium italic">
            This form uses Formspree to send messages directly to our developers.
          </p>
        </div>
      </div>
    </div>
  );
}