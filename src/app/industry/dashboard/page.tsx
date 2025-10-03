import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Users, FileText, Plus, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { internships, applications } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


const industryInternships = internships.slice(0, 3);
const recentApplicants = applications.filter(a => ['1','2','3'].includes(a.internshipId)).slice(0, 5);


export default function IndustryDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Industry Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your internships and connect with talent.
          </p>
        </div>
        <Button asChild>
          <Link href="/industry/post-internship">
            <Plus className="mr-2 h-4 w-4" /> Post New Internship
          </Link>
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Open Positions
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{industryInternships.length}</div>
            <p className="text-xs text-muted-foreground">
              Across 3 teams
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Applicants
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications.length}</div>
            <p className="text-xs text-muted-foreground">
              +45 this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground">
              Received today
            </p>
          </CardContent>
        </Card>
      </div>

       <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Posted Internships</CardTitle>
              <CardDescription>A list of your active internship postings.</CardDescription>
            </CardHeader>
            <CardContent>
               <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Applicants</TableHead>
                    <TableHead>Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {industryInternships.map((internship) => (
                    <TableRow key={internship.id}>
                      <TableCell className="font-medium">{internship.title}</TableCell>
                      <TableCell>{internship.applicants}</TableCell>
                      <TableCell><Badge variant="outline">{internship.type}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Applicants</CardTitle>
              <CardDescription>New students who applied to your internships.</CardDescription>
            </CardHeader>
            <CardContent>
               <Table>
                <TableBody>
                  {recentApplicants.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell>
                         <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={`/avatars/${app.id}.png`} alt="Avatar" />
                            <AvatarFallback>AB</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Applicant #{app.id.slice(-2)}</p>
                            <p className="text-xs text-muted-foreground">{app.internshipTitle}</p>
                          </div>
                        </div>
                      </TableCell>
                       <TableCell className="text-right">
                         <Button variant="outline" size="sm">View Profile</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
             <CardFooter>
              <Button asChild className="w-full" variant="outline">
                  <Link href="#">
                    View All Applicants <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
            </CardFooter>
          </Card>
       </div>
    </div>
  );
}
