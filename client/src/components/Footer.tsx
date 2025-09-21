import { Link } from "wouter";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { href: "/", label: "Strona główna" },
    { href: "/projekty", label: "Projekty" },
    { href: "/o-nas", label: "O nas" },
    { href: "/kontakt", label: "Kontakt" },
  ];

  const legalLinks = [
    { href: "/polityka-prywatnosci", label: "Polityka prywatności" },
    { href: "/regulamin", label: "Regulamin" },
    { href: "/rodo", label: "RODO" },
  ];

  const socialLinks = [
    { href: "#", icon: Facebook, label: "Facebook" },
    { href: "#", icon: Instagram, label: "Instagram" },
    { href: "#", icon: Linkedin, label: "LinkedIn" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4" data-testid="footer-company-name">
              Premier Estates
            </h3>
            <p className="text-primary-foreground/80 mb-6" data-testid="footer-company-description">
              Budujemy nowoczesne mieszkania najwyższej jakości w najlepszych lokalizacjach Polski.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                  aria-label={social.label}
                  data-testid={`social-${social.label.toLowerCase()}`}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4" data-testid="footer-quick-links-title">
              Szybkie linki
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href}>
                    <span 
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                      data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4" data-testid="footer-legal-title">
              Informacje prawne
            </h4>
            <ul className="space-y-2">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href}>
                    <span 
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                      data-testid={`footer-legal-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4" data-testid="footer-contact-title">
              Kontakt
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3" data-testid="footer-contact-address">
                <MapPin className="h-5 w-5 text-primary-foreground/60" />
                <span className="text-primary-foreground/80 text-sm">
                  ul. Główna 123<br />00-001 Warszawa
                </span>
              </div>
              <div className="flex items-center space-x-3" data-testid="footer-contact-phone">
                <Phone className="h-5 w-5 text-primary-foreground/60" />
                <span className="text-primary-foreground/80 text-sm">
                  +48 123 456 789
                </span>
              </div>
              <div className="flex items-center space-x-3" data-testid="footer-contact-email">
                <Mail className="h-5 w-5 text-primary-foreground/60" />
                <span className="text-primary-foreground/80 text-sm">
                  kontakt@premierestates.pl
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60 text-sm" data-testid="footer-copyright">
            © 2024 Premier Estates. Wszelkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  );
}