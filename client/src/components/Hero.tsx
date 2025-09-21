import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import heroImage from "@assets/generated_images/Modern_apartment_building_exterior_bf1320ba.png";

export default function Hero() {
  const handleSearchClick = () => {
    console.log("Search properties triggered");
  };

  const handleContactClick = () => {
    console.log("Contact us triggered");
  };

  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
          Twój wymarzony dom
          <br />
          <span className="text-accent">czeka na Ciebie</span>
        </h1>
        
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed opacity-90" data-testid="hero-description">
          Odkryj ekskluzywne projekty mieszkaniowe w najlepszych lokalizacjach. 
          Nowoczesna architektura, wysoki standard wykończenia i pełna infrastruktura.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            onClick={handleSearchClick}
            className="bg-white/10 text-white border-white/20 backdrop-blur-sm hover:bg-white/20"
            data-testid="button-search-properties"
          >
            <MapPin className="h-5 w-5 mr-2" />
            Zobacz ofertę
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            onClick={handleContactClick}
            className="bg-white/10 text-white border-white/30 backdrop-blur-sm hover:bg-white/20"
            data-testid="button-contact-us"
          >
            Skontaktuj się z nami
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-white/20">
          <div className="text-center" data-testid="stat-projects">
            <div className="text-3xl font-bold mb-2">25+</div>
            <div className="text-sm opacity-80">Projektów</div>
          </div>
          <div className="text-center" data-testid="stat-apartments">
            <div className="text-3xl font-bold mb-2">1500+</div>
            <div className="text-sm opacity-80">Mieszkań</div>
          </div>
          <div className="text-center" data-testid="stat-families">
            <div className="text-3xl font-bold mb-2">800+</div>
            <div className="text-sm opacity-80">Szczęśliwych rodzin</div>
          </div>
          <div className="text-center" data-testid="stat-experience">
            <div className="text-3xl font-bold mb-2">15</div>
            <div className="text-sm opacity-80">lat doświadczenia</div>
          </div>
        </div>
      </div>
    </section>
  );
}