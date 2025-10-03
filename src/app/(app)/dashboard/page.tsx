import { applications, internships, studentProfile } from '@/lib/data';
import {
  Activity,
  ArrowUpRight,
  Briefcase,
  CheckCircle,
  Clock,
  FileText,
  Heart,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

const statusIcons: { [key: string]: React.ReactNode } = {
  Selected: <CheckCircle className="h-4 w-4 text-green-500" />,
  'Under Review': <Clock className="h-4 w-4 text-yellow-500" />,
  Applied: <FileText className="h-4 w-4 text-blue-500" />,
};

export default function DashboardPage() {
  const recommendedInternships = internships.slice(0, 2);
  const recentApplications = applications.slice(0, 3);
  const selectedApplication = applications.find(app => app.status === 'Selected');

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {studentProfile.name.split(' ')[0]}!</h1>
        <p className="text-muted-foreground">Here's your internship journey at a glance.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Applications Sent
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications.length}</div>
            <p className="text-xs text-muted-foreground">
              +2 this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Internships
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{selectedApplication ? 1 : 0}</div>
            <p className="text-xs text-muted-foreground">
              {selectedApplication ? `at ${selectedApplication.company}` : "No active internships"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+42</div>
            <p className="text-xs text-muted-foreground">
              +15% from last week
            </p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skills Matched</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">
              Your profile is a strong fit for many roles
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recommended for You</CardTitle>
            <CardDescription>
              Based on your profile and skills, we think you'd be a great fit for these roles.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendedInternships.map((internship) => (
                <div
                  key={internship.id}
                  className="flex items-center justify-between gap-4 rounded-lg border p-3"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 flex-shrink-0 rounded-md bg-muted flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold">{internship.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {internship.company} &middot; {internship.location}
                      </p>
                    </div>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/internships/${internship.id}`}>
                      View <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
             <Button asChild className="w-full">
                <Link href="/internships">Explore All Internships</Link>
              </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Updates on your recent applications.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                {recentApplications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                          {statusIcons[app.status] || <FileText className="h-4 w-4" />}
                        </div>
                        <div>
                          <p className="font-medium">{app.internshipTitle}</p>
                          <p className="text-xs text-muted-foreground">{app.company}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant={app.status === 'Selected' ? 'default' : app.status === 'Rejected' ? 'destructive' : 'secondary'}>
                        {app.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
           <CardFooter>
             <Button asChild className="w-full" variant="outline">
                <Link href="/applications">View All Applications</Link>
              </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
