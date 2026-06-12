import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EmojiPicker from 'emoji-picker-react';
import { useTranslation } from 'react-i18next';
import html2pdf from 'html2pdf.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Image as ImageIcon, Mic, Download, Search, X, Volume2, VolumeX, Globe } from 'lucide-react';
import { Button } from './ui/Button';
import { Card, CardContent } from './ui/Card';

export default function Chat() {
  const { t } = useTranslation();
  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [input, setInput] = useState('');
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputRef = useRef(null);
  const [lastImage, setLastImage] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentResultIndex, setCurrentResultIndex] = useState(null);
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [targetLang, setTargetLang] = useState('hi');
  const [speakingMessageIndex, setSpeakingMessageIndex] = useState(null);
  const [spokenWordIndex, setSpokenWordIndex] = useState(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle Search
  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      setCurrentResultIndex(null);
      return;
    }
    const results = [];
    messages.forEach((msg, msgIndex) => {
      const lines = msg.text.split(/\n|(?=\d+\.\s)/g);
      lines.forEach((line, lineIndex) => {
        if (line.toLowerCase().includes(searchQuery.toLowerCase())) {
          results.push({ msgIndex, lineIndex });
        }
      });
    });
    setSearchResults(results);
    setCurrentResultIndex(results.length > 0 ? 0 : null);
  }, [searchQuery, messages]);

  const translateText = async (text, targetLang = 'hi') => {
    try {
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`
      );
      const data = await response.json();
      return data[0]?.map(segment => segment[0]).join(' ') || '❌ Translation failed';
    } catch (error) {
      return '❌ Translation failed: ' + error.message;
    }
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => setInput(prev => prev + event.results[0][0].transcript);
    recognition.start();
  };

  const exportPDF = () => {
    const element = chatContainerRef.current;
    const opt = {
      margin: 1,
      filename: 'agrichat_history.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || e.dataTransfer.files);
    const validImages = files.filter(file => file.type.startsWith('image/'));
    const previews = validImages.map(file => ({ file, url: URL.createObjectURL(file) }));
    setImages(prev => [...prev, ...validImages]);
    setImagePreviews(prev => [...prev, ...previews]);
  };

  const sendMessage = async () => {
    if (!input.trim() && images.length === 0) return;

    const userMessage = {
      from: 'user',
      text: input || '[Image only]',
      image: imagePreviews.map(img => img.url),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const formData = new FormData();
    const chatHistory = messages.map(m => ({ role: m.from === 'user' ? 'user' : 'assistant', content: m.text }));
    chatHistory.push({ role: 'user', content: input });
    formData.append('chatHistory', JSON.stringify(chatHistory));

    if (images.length > 0) {
      images.forEach((img) => formData.append('images', img));
      setLastImage(images[images.length - 1]);
    }

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setImages([]);
    setImagePreviews([]);
    setIsLoading(true);

    try {
      const BASE_URL = process.env.REACT_APP_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'http://172.20.10.4:5000');
      const response = await axios.post(`${BASE_URL}/api/chat`, formData, { headers: { 'Content-Type': 'multipart/form-data' }});
      setMessages(prev => [...prev, { from: 'bot', text: response.data.reply, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    } catch (error) {
      setMessages(prev => [...prev, { from: 'bot', text: 'Error: Unable to get a response.' }]);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6">
      <div className="flex-1 flex flex-col bg-white dark:bg-dark-900 rounded-2xl shadow-sm border border-gray-200 dark:border-dark-800 overflow-hidden relative">
        
        {/* Header Actions */}
        <div className="h-14 border-b border-gray-200 dark:border-dark-800 flex items-center justify-between px-4">
          <h2 className="font-semibold text-gray-800 dark:text-gray-200">{t('chat')}</h2>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" onClick={() => setShowSearchPopup(!showSearchPopup)}>
              <Search className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={exportPDF} title={t('export_pdf')}>
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Search Popup */}
        <AnimatePresence>
          {showSearchPopup && (
            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="absolute top-14 left-0 right-0 bg-white dark:bg-dark-800 border-b p-3 flex gap-2 z-10 shadow-md">
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search messages..." className="flex-1 border rounded px-3 py-1 text-sm dark:bg-dark-900 dark:border-dark-700 dark:text-gray-200" />
              <Button size="sm" onClick={() => setShowSearchPopup(false)}><X className="w-4 h-4"/></Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={chatContainerRef}>
          {messages.map((msg, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] rounded-2xl px-5 py-3 ${msg.from === 'user' ? 'bg-primary-600 text-white rounded-br-none' : 'bg-gray-100 dark:bg-dark-800 text-gray-900 dark:text-gray-100 rounded-bl-none'}`}>
                {msg.image?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {msg.image.map((img, idx) => <img key={idx} src={img} alt="upload" className="max-w-[150px] rounded-lg" />)}
                  </div>
                )}
                <div className="whitespace-pre-wrap text-sm leading-relaxed">{msg.translated || msg.text}</div>
                <div className="text-[10px] opacity-70 text-right mt-2">{msg.timestamp}</div>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-dark-800 rounded-2xl rounded-bl-none px-5 py-3 flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white dark:bg-dark-900 border-t border-gray-200 dark:border-dark-800">
          {imagePreviews.length > 0 && (
            <div className="flex gap-2 mb-3 overflow-x-auto">
              {imagePreviews.map((img, i) => (
                <div key={i} className="relative">
                  <img src={img.url} alt="preview" className="h-16 w-16 object-cover rounded-lg border border-gray-200" />
                </div>
              ))}
            </div>
          )}
          
          <div className="flex items-end gap-2 bg-gray-50 dark:bg-dark-800 rounded-xl p-2 border border-gray-200 dark:border-dark-700 focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500">
            <label className="cursor-pointer p-2 text-gray-500 hover:text-primary-600 transition-colors">
              <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
              <ImageIcon className="w-5 h-5" />
            </label>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              placeholder={t('ask_anything')}
              className="flex-1 max-h-32 min-h-[40px] bg-transparent border-none resize-none py-2 px-2 text-sm focus:outline-none dark:text-gray-200"
              rows={1}
            />
            <button onClick={handleVoiceInput} className={`p-2 transition-colors ${isListening ? 'text-red-500 animate-pulse' : 'text-gray-500 hover:text-primary-600'}`}>
              <Mic className="w-5 h-5" />
            </button>
            <Button size="icon" onClick={sendMessage} disabled={isLoading || (!input.trim() && images.length === 0)} className="rounded-lg h-10 w-10 shrink-0">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
