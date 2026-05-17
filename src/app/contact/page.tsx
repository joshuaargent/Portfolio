import { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { personalInfo, socialLinks } from '@/data/site';
import { Mail, Youtube, Github, Instagram, Facebook, MapPin, Send } from 'lucide-react';

const FORMSPREE_FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;

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
                {FORMSPREE_FORM_ID ? (
                  <form
                    action={`https://formspree.io/f/${FORMSPREE_FORM_ID}`}
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
                ) : (
                  <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-yellow-800">
                    <p className="font-medium">Contact form not configured</p>
                    <p className="mt-1 text-sm">
                      To enable the contact form, add your Formspree form ID to the environment variable{' '}
                      <code className="bg-yellow-100 px-1 py-0.5 rounded">NEXT_PUBLIC_FORMSPREE_FORM_ID</code>.<br />
                      Create a form at{' '}
                      <a href="https://formspree.io" target="_blank" rel="noopener noreferrer" className="underline">
                        formspree.io
                      </a>
                    </p>
                    <div className="mt-4">
                      <a
                        href={`mailto:${personalInfo.email}`}
                        className="inline-flex items-center gap-2 text-accent hover:text-accent-hover"
                      >
                        <Mail className="h-4 w-4" />
                        {personalInfo.email}
                      </a>
                    </div>
                  </div>
                )}
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
                      <p className="text-text-muted text-xs">@joshua_argent</p>
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
                      <p className="text-text-muted text-xs">@joshuaargent</p>
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
                      <p className="text-text-muted text-xs">@joshua_argent</p>
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
                      <p className="text-text-muted text-xs">@joshua_argent</p>
                    </div>
                  </a>

                  <a
                    href={socialLinks.strava}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:bg-bg-secondary flex items-center gap-3 rounded-lg p-2 transition-colors"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066l-2.084 8.116zM12.735 8.403L9.141 0H0l5.338 15.597h3.182l.215-1.397 3.182-7.797h-3.182l.215-2.055 1.833-4.944h-2.918z" />
                    </svg>
                    <div>
                      <p className="text-text-primary text-sm font-medium">Strava</p>
                      <p className="text-text-muted text-xs">Running & Cycling</p>
                    </div>
                  </a>

                  <a
                    href={socialLinks.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:bg-bg-secondary flex items-center gap-3 rounded-lg p-2 transition-colors"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.12-.41.12-.43 1-.37 1.58.22.24.57.4 1.03.4.04 0 .09.01.14-.03.43-.26.83-.56 1.2-.87.34-.31.75-.51 1.2-.49.33.01.67.16.92.46.13.16.13 1.13-.16 1.56-.33.5-.88.84-1.46.86-.07.01-.15-.02-.22-.02-.04 2.01 1.51 3.98 3.45 4.18 1.08.11 2.18-.2 2.91-1.01.73-.81 1.11-1.87.97-2.92-.14-1.03-.89-1.89-1.99-2.1-.63-.12-1.3-.03-1.89.27-.3.15-.46.47-.44.8v-.01c-.02.32.13.62.38.83.5.41 1.18.36 1.77.23.42-.09.84-.27 1.16-.52.32-.25.49-.69.49-1.12V.02z" />
                    </svg>
                    <div>
                      <p className="text-text-primary text-sm font-medium">TikTok</p>
                      <p className="text-text-muted text-xs">@joshuaargent5</p>
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
