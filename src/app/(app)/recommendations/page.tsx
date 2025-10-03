
'use client';

import { useState, useTransition } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';
import { recommendInternships } from '@/ai/ai-internship-recommendations';
import { studentProfile } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

export default function RecommendationsPage() {
  const [profile, setProfile] = useState(
    `Major: ${studentProfile.major}, Experience: Entry-level`
  );
  const [skills, setSkills] = useState(studentProfile.skills.join(', '));
  const [major, setMajor] = useState(studentProfile.major);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setRecommendations([]);

    startTransition(async () => {
      try {
        const result = await recommendInternships({ profile, skills, major });
        if (result.recommendations && result.recommendations.length > 0) {
          setRecommendations(result.recommendations);
        } else {
          toast({
            variant: 'default',
            title: 'No recommendations found',
            description: 'The AI could not find any recommendations based on your input. Try refining your profile.',
          });
        }
      } catch (error) {
        console.error(error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'An error occurred while fetching recommendations.',
        });
      }
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Sparkles className="text-primary" /> AI Internship Recommendations
        </h1>
        <p className="text-muted-foreground">
          Let our AI assistant help you find the perfect internship.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
                <CardDescription>
                  Provide your details for personalized recommendations.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="major">Academic Major</Label>
                  <Input
                    id="major"
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skills">Skills</Label>
                  <Textarea
                    id="skills"
                    placeholder="e.g., React, Python, Data Analysis"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profile">Profile Summary</Label>
                  <Textarea
                    id="profile"
                    placeholder="Briefly describe your academic background, projects, and career interests."
                    value={profile}
                    onChange={(e) => setProfile(e.target.value)}
                    rows={4}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Wand2 className="mr-2 h-4 w-4" />
                  )}
                  Get Recommendations
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="min-h-[500px]">
            <CardHeader>
              <CardTitle>Your AI-Powered Suggestions</CardTitle>
              <CardDescription>
                Here are some internship roles the AI thinks would be a great
                fit for you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isPending && (
                <div className="flex flex-col items-center justify-center gap-4 text-center h-64">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <p className="text-muted-foreground">Finding the best internships for you...</p>
                </div>
              )}
              {!isPending && recommendations.length === 0 && (
                <div className="flex flex-col items-center justify-center gap-4 text-center h-64">
                  <Sparkles className="h-12 w-12 text-muted-foreground/50" />
                  <p className="text-muted-foreground">
                    Your recommended internships will appear here.
                  </p>
                </div>
              )}
              {recommendations.length > 0 && (
                <ul className="space-y-3">
                  {recommendations.map((rec, index) => (
                    <li
                      key={index}
                      className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm transition-all hover:bg-accent hover:text-accent-foreground"
                    >
                      <p className="font-semibold">{rec}</p>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
