import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, FileText, Lightbulb, Video } from 'lucide-react';

const resources = [
  {
    title: 'Pre-internship Training',
    description: 'Interactive modules to brush up on your technical and soft skills before you start.',
    icon: <Video className="h-8 w-8 text-primary" />,
    link: '#',
  },
  {
    title: 'Resume Templates',
    description: 'Professionally designed resume templates to make your profile stand out to recruiters.',
    icon: <FileText className="h-8 w-8 text-primary" />,
    link: '#',
  },
  {
    title: 'Interview Prep Guides',
    description: 'Common interview questions, tips, and mock interview simulators for practice.',
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    link: '#',
  },
];

export default function ResourcesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Skill Readiness & Learning</h1>
        <p className="text-muted-foreground">
          Get industry-ready with our curated collection of resources.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <Card key={resource.title}>
            <CardHeader className="flex flex-row items-center gap-4">
              {resource.icon}
              <div>
                <CardTitle>{resource.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{resource.description}</CardDescription>
            </CardContent>
            <CardContent>
              <Button asChild variant="outline">
                <Link href={resource.link}>
                  Explore <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
