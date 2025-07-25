import { Button } from "@/components/ui/button";
import { Play, Users, MessageCircle, Share2 } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero"></div>
      
      {/* Hero image */}
      <div className="absolute inset-0 opacity-30">
        <img 
          src={heroImage} 
          alt="SWatch - дивіться разом" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-glow/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Дивіться разом
              </span>
              <br />
              <span className="text-foreground">
                в реальному часі
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Синхронний перегляд відео з YouTube, Vimeo та інших платформ. 
              Чат, коментарі та спільні емоції одним кліком.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="hero" 
              size="xl" 
              className="group"
              onClick={() => window.location.href = `/room/${Math.random().toString(36).substr(2, 9)}`}
            >
              <Play className="h-5 w-5 group-hover:scale-110 transition-transform" />
              Створити кімнату
            </Button>
            <Button variant="outline" size="xl" className="border-border/50 hover:border-primary/50">
              <Share2 className="h-5 w-5" />
              Приєднатися за посиланням
            </Button>
          </div>

          {/* Features preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg p-6 hover:bg-card/50 transition-colors">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <Play className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Синхронізація</h3>
              </div>
              <p className="text-muted-foreground">
                Автоматична синхронізація відтворення для всіх учасників
              </p>
            </div>

            <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg p-6 hover:bg-card/50 transition-colors">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Живий чат</h3>
              </div>
              <p className="text-muted-foreground">
                Спілкуйтеся в реальному часі під час перегляду
              </p>
            </div>

            <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg p-6 hover:bg-card/50 transition-colors">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Групи</h3>
              </div>
              <p className="text-muted-foreground">
                Запрошуйте друзів одним посиланням
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;