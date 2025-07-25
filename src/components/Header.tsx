import { Button } from "@/components/ui/button";
import { Users, Video, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <div className="relative">
                <Video className="h-8 w-8 text-primary" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-primary rounded-full animate-pulse"></div>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                SWatch
              </h1>
            </Link>
            <div className="hidden md:flex items-center space-x-1 text-sm text-muted-foreground ml-4">
              <Users className="h-4 w-4" />
              <span>Дивіться разом</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-foreground/80 hover:text-foreground transition-colors">
              Функції
            </a>
            <a href="#about" className="text-foreground/80 hover:text-foreground transition-colors">
              Про нас
            </a>
            <a href="#faq" className="text-foreground/80 hover:text-foreground transition-colors">
              FAQ
            </a>
          </nav>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="hidden md:flex">
              Увійти
            </Button>
            <Button 
              variant="hero" 
              size="sm"
              asChild
            >
              <Link to={`/room/${Math.random().toString(36).substr(2, 9)}`}>
                Створити кімнату
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;