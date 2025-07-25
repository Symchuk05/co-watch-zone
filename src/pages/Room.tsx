import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import YouTubePlayer from "@/components/YouTubePlayer";
import WebsiteViewer from "@/components/WebsiteViewer";
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
  Copy,
  Home,
  ArrowLeft
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Room = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(100);
  const [contentType, setContentType] = useState<'youtube' | 'vimeo' | 'website' | 'none'>('none');
  const [videoId, setVideoId] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [users, setUsers] = useState([
    { id: 1, name: "Ви", isHost: true, online: true },
    { id: 2, name: "Анна", isHost: false, online: true },
    { id: 3, name: "Максим", isHost: false, online: false }
  ]);
  const [messages, setMessages] = useState([
    { id: 1, user: "Анна", text: "Привіт всім! 👋", time: "20:30", type: 'message' },
    { id: 2, user: "Максим", text: "Готовий до перегляду!", time: "20:31", type: 'message' },
    { id: 3, user: "Система", text: "Анна приєдналася до кімнати", time: "20:29", type: 'system' },
    { id: 4, user: "Ви", text: "Починаємо!", time: "20:32", type: 'message' }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [inputUrl, setInputUrl] = useState("");

  // Extract YouTube video ID from URL
  const extractYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  // Extract Vimeo video ID from URL  
  const extractVimeoId = (url: string) => {
    const match = url.match(/(?:vimeo\.com\/)([0-9]+)/);
    return match ? match[1] : null;
  };

  // Load content from URL
  const handleLoadContent = () => {
    if (!inputUrl.trim()) return;

    const youtubeId = extractYouTubeId(inputUrl);
    const vimeoId = extractVimeoId(inputUrl);
    
    if (youtubeId) {
      setVideoId(youtubeId);
      setContentType('youtube');
      addSystemMessage(`Завантажено YouTube відео: ${youtubeId}`);
    } else if (vimeoId) {
      setVideoId(vimeoId);
      setContentType('vimeo');
      addSystemMessage(`Завантажено Vimeo відео: ${vimeoId}`);
    } else {
      setWebsiteUrl(inputUrl);
      setContentType('website');
      addSystemMessage(`Завантажено веб-сайт: ${inputUrl}`);
    }
    setInputUrl('');
  };

  const addSystemMessage = (text: string) => {
    const message = {
      id: messages.length + 1,
      user: "Система",
      text,
      time: new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }),
      type: 'system' as const
    };
    setMessages(prev => [...prev, message]);
    
    // Auto scroll to bottom for system messages
    setTimeout(() => {
      const chatContainer = document.getElementById('chat-container');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 100);
  };

  const handlePlayPause = () => {
    const newIsPlaying = !isPlaying;
    setIsPlaying(newIsPlaying);
    
    // Simulate sync message
    addSystemMessage(newIsPlaying ? "Відтворення розпочато" : "Відтворення зупинено");
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        user: "Ви",
        text: newMessage,
        time: new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }),
        type: 'message' as const
      };
      setMessages(prev => [...prev, message]);
      setNewMessage("");
      
      // Auto scroll to bottom
      setTimeout(() => {
        const chatContainer = document.getElementById('chat-container');
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      }, 100);
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

  // Simulate user activity
  useEffect(() => {
    const interval = setInterval(() => {
      setUsers(prev => prev.map(user => ({
        ...user,
        online: user.id === 1 ? true : Math.random() > 0.1 // Simulate online/offline
      })));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/">
                  <ArrowLeft className="h-4 w-4" />
                  На головну
                </Link>
              </Button>
              <div className="h-6 w-px bg-border"></div>
              <h1 className="text-lg font-semibold">Кімната #{id}</h1>
              <Badge variant="secondary" className="flex items-center space-x-1">
                <Users className="h-3 w-3" />
                <span>{users.filter(u => u.online).length}/{users.length}</span>
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
          {/* Video/Content Player */}
          <div className="lg:col-span-3 space-y-4">
            <Card className="overflow-hidden shadow-card">
              <div className="relative bg-black aspect-video">
                {contentType === 'youtube' && videoId ? (
                  <YouTubePlayer
                    videoId={videoId}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onTimeUpdate={setCurrentTime}
                    isPlaying={isPlaying}
                    currentTime={currentTime}
                  />
                ) : contentType === 'vimeo' && videoId ? (
                  <iframe
                    src={`https://player.vimeo.com/video/${videoId}?autoplay=0`}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title="Vimeo Player"
                  />
                ) : contentType === 'website' && websiteUrl ? (
                  <WebsiteViewer url={websiteUrl} />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-background/20 to-background/40">
                    <div className="text-center space-y-4">
                      <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                        <Play className="h-8 w-8 text-primary" />
                      </div>
                      <p className="text-muted-foreground">Вставте посилання нижче для початку перегляду</p>
                    </div>
                  </div>
                )}

                {/* Video Controls - only show for YouTube */}
                {contentType === 'youtube' && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="space-y-3">
                      {/* Progress Bar */}
                      <div className="flex items-center space-x-2 text-white text-sm">
                        <span>{formatTime(currentTime)}</span>
                        <div 
                          className="flex-1 bg-white/20 rounded-full h-1 cursor-pointer"
                          onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const percent = (e.clientX - rect.left) / rect.width;
                            const newTime = percent * duration;
                            setCurrentTime(newTime);
                            addSystemMessage(`Перемотано на ${formatTime(newTime)}`);
                          }}
                        >
                          <div 
                            className="bg-primary h-1 rounded-full transition-all relative"
                            style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                          >
                            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-primary rounded-full -mr-1.5"></div>
                          </div>
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
                          <div className="text-xs text-white/80 ml-2">
                            Синхронізовано
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-white hover:bg-white/20"
                            onClick={() => {
                              const comment = prompt(`Додати коментар на ${formatTime(currentTime)}:`);
                              if (comment) {
                                const message = {
                                  id: messages.length + 1,
                                  user: "Ви",
                                  text: `💬 ${comment} [${formatTime(currentTime)}]`,
                                  time: new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }),
                                  type: 'message' as const
                                };
                                setMessages(prev => [...prev, message]);
                              }
                            }}
                          >
                            💬
                          </Button>
                          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                            <FullscreenIcon className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* URL Input */}
            <Card className="p-4">
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Вставте посилання на YouTube відео або веб-сайт..."
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleLoadContent()}
                    className="flex-1"
                  />
                  <Button variant="default" onClick={handleLoadContent}>
                    Завантажити
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground">
                  Підтримуються: YouTube, Vimeo, веб-сайти та інші посилання
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setInputUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')}
                    className="text-xs"
                  >
                    Demo YouTube
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setInputUrl('https://vimeo.com/148751763')}
                    className="text-xs"
                  >
                    Demo Vimeo
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setInputUrl('https://github.com')}
                    className="text-xs"
                  >
                    GitHub
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setInputUrl('https://lovable.dev')}
                    className="text-xs"
                  >
                    Lovable
                  </Button>
                </div>
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
                      <div className="relative">
                        <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {user.name[0]}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
                          user.online ? 'bg-success' : 'bg-muted-foreground'
                        }`}></div>
                      </div>
                      <div>
                        <div className="text-sm">{user.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {user.online ? 'Онлайн' : 'Офлайн'}
                        </div>
                      </div>
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
              
              <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-64" id="chat-container">
                {messages.map(message => (
                  <div key={message.id} className={`space-y-1 ${message.type === 'system' ? 'text-center' : ''} animate-slide-up`}>
                    {message.type === 'system' ? (
                      <div className="text-xs text-muted-foreground bg-secondary/20 rounded-lg p-2 italic">
                        🔄 {message.text}
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <span className="font-medium text-primary">{message.user}</span>
                          <span>{message.time}</span>
                        </div>
                        <div className={`text-sm rounded-lg p-2 ${
                          message.user === 'Ви' 
                            ? 'bg-primary/10 border border-primary/20 ml-8' 
                            : 'bg-secondary/30'
                        }`}>
                          {message.text}
                        </div>
                      </>
                    )}
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