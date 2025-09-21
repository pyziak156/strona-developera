import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Users, Building, Shield } from "lucide-react";
import teamImage from "@assets/generated_images/Professional_real_estate_team_54779e85.png";

export default function About() {
  const features = [
    {
      icon: Award,
      title: "15 lat doświadczenia",
      description: "Jesteśmy na rynku od 2009 roku, realizując najwyższej jakości projekty mieszkaniowe."
    },
    {
      icon: Building,
      title: "25+ projektów",
      description: "Zrealizowaliśmy ponad 25 inwestycji mieszkaniowych w największych miastach Polski."
    },
    {
      icon: Users,
      title: "800+ zadowolonych klientów",
      description: "Nasi klienci to nasz największy sukces. Budujemy długotrwałe relacje oparte na zaufaniu."
    },
    {
      icon: Shield,
      title: "Gwarancja jakości",
      description: "Wszystkie nasze inwestycje są objęte pełną gwarancją i ubezpieczeniem deweloperskim."
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <Badge className="mb-4" data-testid="about-badge">O firmie</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6" data-testid="about-title">
              Budujemy domy, tworzymy wspólnoty
            </h2>
            <p className="text-lg text-muted-foreground mb-8" data-testid="about-description">
              Premier Estates to wiodący deweloper na polskim rynku nieruchomości. 
              Specjalizujemy się w tworzeniu nowoczesnych, funkcjonalnych i estetycznych 
              przestrzeni mieszkalnych, które odpowiadają na potrzeby współczesnych rodzin.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="border-none shadow-none bg-transparent" data-testid={`feature-${index}`}>
                  <CardContent className="p-0">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2" data-testid={`feature-title-${index}`}>
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground" data-testid={`feature-description-${index}`}>
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden">
              <img
                src={teamImage}
                alt="Zespół Premier Estates"
                className="w-full h-[500px] object-cover"
                data-testid="about-team-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Stats overlay */}
            <Card className="absolute -bottom-6 left-6 right-6 md:right-auto md:w-64">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div data-testid="stat-projects-delivered">
                    <div className="text-2xl font-bold text-primary">1500+</div>
                    <div className="text-sm text-muted-foreground">mieszkań oddanych</div>
                  </div>
                  <div data-testid="stat-satisfaction">
                    <div className="text-2xl font-bold text-primary">98%</div>
                    <div className="text-sm text-muted-foreground">zadowolenia</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}