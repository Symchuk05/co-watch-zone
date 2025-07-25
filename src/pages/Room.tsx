import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Pause, 
  Users, 
  MessageCircle, 
  Send, 
  Share2, 
  Settings,
  Volume2,
  FullscreenIcon,
  Copy
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Room = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(100);
  const [users, setUsers] = useState([
    { id: 1, name: "Ви", isHost: true },
    { id: 2, name: "Анна", isHost: false },
    { id: 3, name: "Максим", isHost: false }
  ]);
  const [messages, setMessages] = useState([
    { id: 1, user: "Анна", text: "Привіт всім! 👋", time: "20:30" },
    { id: 2, user: "Максим", text: "Готовий до перегляду!", time: "20:31" },
    { id: 3, user: "Ви", text: "Починаємо!", time: "20:32" }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [videoUrl, setVideoUrl] = useState("https://www.youtube.com/watch?v=dQw4w9WgXcQ");

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // Тут буде синхронізація з іншими користувачами
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        user: "Ви",
        text: newMessage,
        time: new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  const handleShareRoom = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Посилання скопійовано!",
      description: "Поділіться цим посиланням з друзями для спільного перегляду.",
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-lg font-semibold">Кімната #{id}</h1>
              <Badge variant="secondary" className="flex items-center space-x-1">
                <Users className="h-3 w-3" />
                <span>{users.length}</span>
              </Badge>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleShareRoom}>
                <Share2 className="h-4 w-4" />
                Поділитися
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Video Player */}
          <div className="lg:col-span-3 space-y-4">
            <Card className="overflow-hidden shadow-card">
              <div className="relative bg-black aspect-video">
                {/* Video Player Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-background/20 to-background/40">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                      <Play className="h-8 w-8 text-primary" />
                    </div>
                    <p className="text-muted-foreground">Готовий до перегляду</p>
                  </div>
                </div>

                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="space-y-3">
                    {/* Progress Bar */}
                    <div className="flex items-center space-x-2 text-white text-sm">
                      <span>{formatTime(currentTime)}</span>
                      <div className="flex-1 bg-white/20 rounded-full h-1 cursor-pointer">
                        <div 
                          className="bg-primary h-1 rounded-full transition-all"
                          style={{ width: `${(currentTime / duration) * 100}%` }}
                        />
                      </div>
                      <span>{formatTime(duration)}</span>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handlePlayPause}
                          className="text-white hover:bg-white/20"
                        >
                          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                          <Volume2 className="h-5 w-5" />
                        </Button>
                      </div>
                      
                      <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                        <FullscreenIcon className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* URL Input */}
            <Card className="p-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Вставте посилання на YouTube, Vimeo або інший сайт..."
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="flex-1"
                />
                <Button variant="default">
                  Завантажити
                </Button>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Users List */}
            <Card className="p-4">
              <h3 className="font-semibold mb-4 flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Учасники ({users.length})</span>
              </h3>
              <div className="space-y-2">
                {users.map(user => (
                  <div key={user.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/50">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {user.name[0]}
                      </div>
                      <span className="text-sm">{user.name}</span>
                    </div>
                    {user.isHost && (
                      <Badge variant="outline" className="text-xs">
                        Хост
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Chat */}
            <Card className="flex flex-col h-96">
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold flex items-center space-x-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>Чат</span>
                </h3>
              </div>
              
              <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                {messages.map(message => (
                  <div key={message.id} className="space-y-1">
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span className="font-medium">{message.user}</span>
                      <span>{message.time}</span>
                    </div>
                    <p className="text-sm bg-secondary/30 rounded-lg p-2">
                      {message.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-border">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Напишіть повідомлення..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button size="sm" onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Brand Footer */}
      <div className="border-t border-border mt-8">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-sm text-muted-foreground">
            Створено <span className="font-semibold text-primary">SDev</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Room;