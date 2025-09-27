import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare, BookOpen, Timer, Users, Code, Target } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-foreground">TripTuner</h1>
          </div>
          <div className="space-x-2">
            <Button variant="ghost" asChild>
              <Link to="/auth">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/auth">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
          Advanced To-Do List for
          <span className="text-primary block">Computer Science Students</span>
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          More than a basic to-do list. TripTuner combines task management with programming-specific features, 
          code snippet storage, and project milestone tracking designed for CS students.
        </p>
        <div className="space-x-4">
          <Button size="lg" asChild>
            <Link to="/auth">Start Building</Link>
          </Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">Built for CS Students</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-primary/10 hover:border-primary/30 transition-colors">
            <CardHeader>
              <CheckSquare className="w-10 h-10 text-primary mb-2" />
              <CardTitle>Smart Task Management</CardTitle>
              <CardDescription>
                Create tasks with priority levels, difficulty ratings, and time estimates specifically for coding projects.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-primary/10 hover:border-primary/30 transition-colors">
            <CardHeader>
              <BookOpen className="w-10 h-10 text-primary mb-2" />
              <CardTitle>Project Organization</CardTitle>
              <CardDescription>
                Group tasks under courses, projects, or learning modules with milestone tracking and progress visualization.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-primary/10 hover:border-primary/30 transition-colors">
            <CardHeader>
              <Code className="w-10 h-10 text-primary mb-2" />
              <CardTitle>Code Integration</CardTitle>
              <CardDescription>
                Attach code snippets, documentation links, and technical resources directly to your tasks.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-primary/10 hover:border-primary/30 transition-colors">
            <CardHeader>
              <Timer className="w-10 h-10 text-primary mb-2" />
              <CardTitle>Study Sessions</CardTitle>
              <CardDescription>
                Built-in Pomodoro timer with session tracking specifically for coding and study activities.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-primary/10 hover:border-primary/30 transition-colors">
            <CardHeader>
              <Users className="w-10 h-10 text-primary mb-2" />
              <CardTitle>Collaboration</CardTitle>
              <CardDescription>
                Share project tasks and progress with classmates and study groups in real-time.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-primary/10 hover:border-primary/30 transition-colors">
            <CardHeader>
              <Target className="w-10 h-10 text-primary mb-2" />
              <CardTitle>Progress Tracking</CardTitle>
              <CardDescription>
                Visual charts and progress bars showing completion rates across different projects and courses.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <Card className="max-w-2xl mx-auto bg-gradient-primary text-white">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Boost Your Productivity?</h3>
            <p className="mb-6 opacity-90">
              Join thousands of CS students who use TripTuner to manage their coursework, 
              coding projects, and study schedules more effectively.
            </p>
            <Button variant="secondary" size="lg" asChild>
              <Link to="/auth">Get Started Free</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>&copy; 2024 TripTuner. Built for Computer Science Students.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;