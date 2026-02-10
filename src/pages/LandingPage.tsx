import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Brain, BookOpen, Users, Sparkles, ArrowRight, Zap, Shield, TrendingUp } from "lucide-react";

const LandingPage = () => {
  const baseUrl = import.meta.env.BASE_URL;
  
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Forward
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/auth">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/app">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-primary/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="relative container mx-auto px-4 py-24 md:py-32 lg:py-40">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-4">
              <Zap className="w-4 h-4" />
              <span>AI-Powered Study Platform</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              <span className="text-gradient">Transform Your</span>
              <br />
              Academic Journey
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The all-in-one platform that combines smart scheduling, AI-powered study guides, 
              collaborative learning, and intelligent task management—all designed to help you excel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button 
                asChild 
                size="lg" 
                className="text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all"
              >
                <Link to="/app">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 h-auto border-2"
              >
                <Link to="/app">View Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need, <span className="text-gradient">All in One Place</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to streamline your academic journey
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            <div className="group p-8 rounded-2xl border-2 border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Calendar className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Smart Calendar</h3>
              <p className="text-muted-foreground leading-relaxed">
                AI-powered scheduling that syncs with your classes and optimizes your study time automatically
              </p>
            </div>
            <div className="group p-8 rounded-2xl border-2 border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Brain className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">AI Study Guides</h3>
              <p className="text-muted-foreground leading-relaxed">
                Generate comprehensive study guides from your notes and course materials in seconds
              </p>
            </div>
            <div className="group p-8 rounded-2xl border-2 border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <BookOpen className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Integrated Notes</h3>
              <p className="text-muted-foreground leading-relaxed">
                Rich text editing, audio notes, and drawing capabilities all seamlessly integrated
              </p>
            </div>
            <div className="group p-8 rounded-2xl border-2 border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Study Groups</h3>
              <p className="text-muted-foreground leading-relaxed">
                Collaborate with classmates and organize group study sessions effortlessly
              </p>
            </div>
            <div className="group p-8 rounded-2xl border-2 border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Sparkles className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Task Management</h3>
              <p className="text-muted-foreground leading-relaxed">
                Extract todos from notes and manage all your assignments with intelligent prioritization
              </p>
            </div>
            <div className="group p-8 rounded-2xl border-2 border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <TrendingUp className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Weekly Recaps</h3>
              <p className="text-muted-foreground leading-relaxed">
                Track your progress and get actionable insights into your study patterns
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-24 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Built by <span className="text-gradient">Passionate Innovators</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A team dedicated to transforming education through innovative technology
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 rounded-2xl border-2 border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                <div className="w-36 h-36 rounded-2xl overflow-hidden mx-auto mb-6 ring-4 ring-primary/10 shadow-lg">
                  <img 
                    src={`${baseUrl}oni.jpeg`}
                    alt="Fredre'Oni (Oni) Terrado" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2">Fredre'Oni (Oni) Terrado</h3>
                <p className="text-primary font-medium mb-1">CEO & Co-Founder</p>
                <p className="text-sm text-muted-foreground">Visionary leader driving innovation</p>
              </div>
              <div className="text-center p-8 rounded-2xl border-2 border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                <div className="w-36 h-36 rounded-2xl overflow-hidden mx-auto mb-6 ring-4 ring-primary/10 shadow-lg">
                  <img 
                    src={`${baseUrl}etornam.jpeg`}
                    alt="Etornam Agbemabiese" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2">Etornam Agbemabiese</h3>
                <p className="text-primary font-medium mb-1">COO & Co-Founder</p>
                <p className="text-sm text-muted-foreground">Operations excellence & strategy</p>
              </div>
              <div className="text-center p-8 rounded-2xl border-2 border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                <div className="w-36 h-36 rounded-2xl overflow-hidden mx-auto mb-6 ring-4 ring-primary/10 shadow-lg">
                  <img 
                    src={`${baseUrl}grace.jpeg`}
                    alt="Grace Odondi" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2">Grace Odondi</h3>
                <p className="text-primary font-medium mb-1">CTO & Co-Founder</p>
                <p className="text-sm text-muted-foreground">Technical innovation & architecture</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8 p-12 md:p-16 rounded-3xl border-2 border-primary/20 bg-gradient-to-br from-card to-card/50 shadow-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-4">
              <Shield className="w-4 h-4" />
              <span>Trusted by thousands of students</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Ready to Transform Your <span className="text-gradient">Study Experience?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of students who are already achieving academic excellence with Forward
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                asChild 
                size="lg" 
                className="text-lg px-10 py-7 h-auto shadow-lg hover:shadow-xl transition-all"
              >
                <Link to="/app">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="text-lg px-10 py-7 h-auto border-2"
              >
                <Link to="/app">Schedule a Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Forward</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The all-in-one platform for academic success
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/app" className="hover:text-foreground transition-colors">Features</Link></li>
                <li><Link to="/app" className="hover:text-foreground transition-colors">Pricing</Link></li>
                <li><Link to="/app" className="hover:text-foreground transition-colors">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/app" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link to="/app" className="hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link to="/app" className="hover:text-foreground transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/app" className="hover:text-foreground transition-colors">Help Center</Link></li>
                <li><Link to="/app" className="hover:text-foreground transition-colors">Contact</Link></li>
                <li><Link to="/app" className="hover:text-foreground transition-colors">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© 2024 Forward. All rights reserved. Built with passion for students everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

