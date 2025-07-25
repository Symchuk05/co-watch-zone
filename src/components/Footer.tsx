import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">SWatch</h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              Платформа для синхронного перегляду відео з друзями. 
              Дивіться фільми, відео та сайти разом, незалежно від відстані.
            </p>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Створено з</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span className="font-semibold text-primary">SDev</span>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-4">Платформа</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Функції</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Ціни</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Статус</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Підтримка</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="/faq" className="hover:text-foreground transition-colors">FAQ</a></li>
              <li><a href="/about" className="hover:text-foreground transition-colors">Про нас</a></li>
              <li><a href="/privacy" className="hover:text-foreground transition-colors">Приватність</a></li>
              <li><a href="/terms" className="hover:text-foreground transition-colors">Умови</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 SWatch. Всі права захищені.
          </p>
          <p className="text-sm font-medium">
            <span className="text-muted-foreground">Розроблено</span>{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent font-bold">
              SDev
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;