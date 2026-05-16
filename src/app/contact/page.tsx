import { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { personalInfo, socialLinks } from '@/data/site';
import { Mail, Youtube, Github, Instagram, Facebook, MapPin, Send } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact',
  description: "Get in touch with me. I'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact"
        description="I'd love to hear from you. Whether it's a question, collaboration idea, or just to say hi."
      />

      <section className="pb-12 md:pb-16">
        <div className="container max-w-4xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card>
                <h2 className="text-text-primary mb-6 text-xl font-semibold">Send a Message</h2>
                <form
                  action="https://formspree.io/f/YOUR_FORM_ID"
                  method="POST"
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Input label="Name" name="name" type="text" placeholder="Your name" required />
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <Input
                    label="Subject"
                    name="subject"
                    type="text"
                    placeholder="What's this about?"
                    required
                  />

                  <Textarea
                    label="Message"
                    name="message"
                    placeholder="Your message..."
                    rows={6}
                    required
                  />

                  <Button type="submit" size="lg" className="w-full" style={{ color: '#ffffff' }}>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <h3 className="text-text-primary mb-4 font-semibold">Email</h3>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-text-secondary hover:text-accent flex items-center gap-3 transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  {personalInfo.email}
                </a>
              </Card>

              <Card>
                <h3 className="text-text-primary mb-4 font-semibold">Location</h3>
                <div className="text-text-secondary flex items-center gap-3">
                  <MapPin className="h-5 w-5" />
                  {personalInfo.location}
                </div>
              </Card>

              <Card>
                <h3 className="text-text-primary mb-4 font-semibold">Connect</h3>
                <div className="space-y-3">
                  <a
                    href={socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:bg-bg-secondary flex items-center gap-3 rounded-lg p-2 transition-colors"
                  >
                    <Youtube className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="text-text-primary text-sm font-medium">YouTube</p>
                      <p className="text-text-muted text-xs">@yourchannel</p>
                    </div>
                  </a>

                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:bg-bg-secondary flex items-center gap-3 rounded-lg p-2 transition-colors"
                  >
                    <Github className="text-text-primary h-5 w-5" />
                    <div>
                      <p className="text-text-primary text-sm font-medium">GitHub</p>
                      <p className="text-text-muted text-xs">@yourusername</p>
                    </div>
                  </a>

                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:bg-bg-secondary flex items-center gap-3 rounded-lg p-2 transition-colors"
                  >
                    <Instagram className="h-5 w-5 text-pink-500" />
                    <div>
                      <p className="text-text-primary text-sm font-medium">Instagram</p>
                      <p className="text-text-muted text-xs">@yourusername</p>
                    </div>
                  </a>

                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:bg-bg-secondary flex items-center gap-3 rounded-lg p-2 transition-colors"
                  >
                    <Facebook className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-text-primary text-sm font-medium">Facebook</p>
                      <p className="text-text-muted text-xs">/yourusername</p>
                    </div>
                  </a>
                </div>
              </Card>

              <Card className="bg-accent-light">
                <h3 className="text-text-primary mb-2 font-semibold">Response Time</h3>
                <p className="text-text-secondary text-sm">
                  I typically respond within 24-48 hours. For urgent matters, reach out via Instagram
                  DM.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
