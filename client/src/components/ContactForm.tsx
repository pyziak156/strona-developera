import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const contactMutation = useMutation({
    mutationFn: (data: typeof formData) => apiRequest("/api/contact", "POST", data),
    onSuccess: (response: any) => {
      toast({
        title: "Wiadomość wysłana!",
        description: response.message || "Skontaktujemy się z Tobą w ciągu 24 godzin.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    },
    onError: (error) => {
      console.error("Contact form error:", error);
      toast({
        title: "Błąd wysyłania",
        description: "Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Telefon",
      value: "+48 123 456 789",
      description: "Pon-Pt: 9:00-18:00"
    },
    {
      icon: Mail,
      title: "Email",
      value: "kontakt@premierestates.pl",
      description: "Odpowiadamy w ciągu 24h"
    },
    {
      icon: MapPin,
      title: "Adres",
      value: "ul. Główna 123, 00-001 Warszawa",
      description: "Zapraszamy do biura"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="contact-title">
            Skontaktuj się z nami
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="contact-description">
            Masz pytania o nasze projekty? Chcesz umówić się na prezentację? 
            Skontaktuj się z nami - chętnie odpowiemy na wszystkie pytania.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <Card key={index} data-testid={`contact-info-${index}`}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1" data-testid={`contact-info-title-${index}`}>
                        {info.title}
                      </h3>
                      <p className="text-primary font-medium mb-1" data-testid={`contact-info-value-${index}`}>
                        {info.value}
                      </p>
                      <p className="text-sm text-muted-foreground" data-testid={`contact-info-description-${index}`}>
                        {info.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle data-testid="form-title">Wyślij wiadomość</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Imię i nazwisko
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        data-testid="input-name"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Telefon
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        data-testid="input-phone"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      data-testid="input-email"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Wiadomość
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      required
                      data-testid="input-message"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={contactMutation.isPending}
                    className="w-full"
                    data-testid="button-submit"
                  >
                    {contactMutation.isPending ? (
                      "Wysyłanie..."
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Wyślij wiadomość
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}