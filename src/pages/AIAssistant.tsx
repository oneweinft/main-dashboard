import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, PhoneOff, Send, ArrowLeft, MessageSquare, Home, Settings, Volume2, VolumeX, Brain, Bell, BellOff, Zap, Globe, Shield } from "lucide-react"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useData } from "@/context/DataContext";
import OrganicOrb from "@/components/OrganicOrb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Message = { role: "user" | "assistant"; content: string };

// Using OrganicOrb component - see @/components/OrganicOrb.tsx

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { addAILog } = useData();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const [aiEnabled, setAiEnabled] = useState(true);
  const [volume, setVolume] = useState([70]);
  const [notifications, setNotifications] = useState(true);
  const [voiceResponse, setVoiceResponse] = useState(false);
  const [responseSpeed, setResponseSpeed] = useState("balanced");
  const [language, setLanguage] = useState("en");
  const [safeMode, setSafeMode] = useState(true);

  const handleSend = () => {
    if (!input.trim() || !aiEnabled) return;
    const queryText = input.trim();
    const userMsg: Message = { role: "user", content: queryText };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setShowChat(true);

    const responseText =
      "I'm your PM Dashboard AI assistant. I can help you manage properties, track maintenance requests, analyse arrears, and more. What would you like to know?";

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: responseText },
      ]);
      addAILog({
        timestamp: new Date().toISOString(),
        query: queryText,
        response: responseText,
        source: "assistant",
      });
    }, 1200);
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-background text-foreground relative overflow-hidden">
      {/* Subtle background particles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-0.5 w-0.5 rounded-full bg-primary/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0, 0.6, 0], y: [0, -30, 0] }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Top nav */}
      <div className="relative z-10 flex w-full items-center justify-between px-6 py-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/")}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> Back
        </Button>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowChat(false)}
            className={`text-muted-foreground hover:text-foreground ${!showChat ? "bg-secondary text-foreground" : ""}`}
          >
            <Home className="mr-1 h-4 w-4" /> Home
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowChat(true)}
            className={`text-muted-foreground hover:text-foreground ${showChat ? "bg-secondary text-foreground" : ""}`}
          >
            <MessageSquare className="mr-1 h-4 w-4" /> Chat
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                <Settings className="mr-1 h-4 w-4" /> Settings
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 p-4 space-y-4">
              <DropdownMenuLabel className="text-base font-semibold px-0">AI Assistant Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {/* AI On/Off */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">AI Enabled</span>
                </div>
                <Switch checked={aiEnabled} onCheckedChange={setAiEnabled} />
              </div>

              {/* Volume */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {volume[0] > 0 ? <Volume2 className="h-4 w-4 text-primary" /> : <VolumeX className="h-4 w-4 text-muted-foreground" />}
                    <span className="text-sm font-medium">Volume</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{volume[0]}%</span>
                </div>
                <Slider value={volume} onValueChange={setVolume} max={100} step={5} className="w-full" />
              </div>

              {/* Voice Response */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mic className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Voice Responses</span>
                </div>
                <Switch checked={voiceResponse} onCheckedChange={setVoiceResponse} />
              </div>

              {/* Notifications */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {notifications ? <Bell className="h-4 w-4 text-primary" /> : <BellOff className="h-4 w-4 text-muted-foreground" />}
                  <span className="text-sm font-medium">Notifications</span>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>

              <DropdownMenuSeparator />

              {/* Response Speed */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Response Mode</span>
                </div>
                <Select value={responseSpeed} onValueChange={setResponseSpeed}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fast">Fast — Quick answers</SelectItem>
                    <SelectItem value="balanced">Balanced — Default</SelectItem>
                    <SelectItem value="thorough">Thorough — Detailed analysis</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Language */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Language</span>
                </div>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="zh">Chinese</SelectItem>
                    <SelectItem value="ar">Arabic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Safe Mode */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Safe Mode</span>
                </div>
                <Switch checked={safeMode} onCheckedChange={setSafeMode} />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main content area */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center w-full max-w-2xl px-6">
        <AnimatePresence mode="wait">
          {!showChat ? (
            <motion.div
              key="orb"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-8"
            >
              <OrganicOrb isActive={isListening} intensity={1.2} size={280} />

              <motion.p
                className="text-sm tracking-widest text-primary/80"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {isListening ? "Listening..." : "Available..."}
              </motion.p>

              <button
                onClick={() => setIsListening((p) => !p)}
                className={`flex h-12 w-12 items-center justify-center rounded-full transition-all ${
                  isListening
                    ? "bg-primary/20 shadow-[0_0_20px_hsla(160,80%,50%,0.3)]"
                    : "bg-secondary hover:bg-muted"
                }`}
              >
                <Mic className={`h-5 w-5 ${isListening ? "text-primary" : "text-muted-foreground"}`} />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="flex w-full flex-1 flex-col pb-4"
            >
              <div className="flex justify-center py-4">
                <div className="relative h-16 w-16">
                  <motion.div
                    className="h-16 w-16 rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle at 40% 35%, hsl(160, 80%, 75%), hsl(160, 80%, 50%) 40%, hsl(170, 70%, 35%) 70%, hsl(180, 60%, 15%) 100%)",
                      boxShadow: "0 0 30px 8px hsla(160, 80%, 50%, 0.3)",
                    }}
                    animate={{ scale: [1, 1.05, 1], rotate: [0, 360] }}
                    transition={{
                      scale: { duration: 3, repeat: Infinity },
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    }}
                  />
                </div>
              </div>

              <div className="flex-1 space-y-4 overflow-auto px-2 pb-4 scrollbar-thin">
                {messages.length === 0 && (
                  <p className="text-center text-sm text-muted-foreground pt-8">
                    Ask me anything about your properties...
                  </p>
                )}
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-primary/15 text-primary"
                          : "bg-secondary text-foreground"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input bar */}
      <div className="relative z-10 w-full max-w-2xl px-6 pb-8">
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-secondary px-4 py-3 backdrop-blur-sm">
          <button
            onClick={() => setIsListening((p) => !p)}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all ${
              isListening
                ? "bg-primary/20 text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Mic className="h-4 w-4" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask your AI assistant..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary transition-all hover:bg-primary/25 disabled:opacity-30"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
