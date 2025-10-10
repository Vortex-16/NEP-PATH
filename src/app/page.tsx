import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const roles = [
  {
    name: 'Student',
    description: 'Find internships, track applications, and build your career.',
    href: '/login?role=student',
    icon: '🎓',
  },
  {
    name: 'Faculty',
    description: 'Monitor student progress, approve internships, and collaborate with industry.',
    href: '/login?role=faculty',
    icon: '🏫',
  },
  {
    name: 'Industry',
    description: 'Post internships, find top talent, and manage applicants.',
    href: '/login?role=industry',
    icon: '🏢',
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="mb-12 text-center">
  <h1 className="text-5xl font-bold tracking-tighter">Welcome to Trybe</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Your all-in-one platform for internships.
        </p>
      </div>
      <div className="grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
        {roles.map((role) => (
          <Link href={role.href} key={role.name}>
            <Card className="flex h-full transform flex-col justify-between transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div>
                <CardHeader>
                  <div className="mb-4 text-5xl">{role.icon}</div>
                  <CardTitle>{role.name}</CardTitle>
                  <CardDescription>{role.description}</CardDescription>
                </CardHeader>
              </div>
              <CardContent>
                <div className="flex items-center font-semibold text-primary">
                  <span>Get Started</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
