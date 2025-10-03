import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Users, Briefcase, CheckSquare, FileText } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { applications, studentProfile } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


const monitoredStudents = [
  { id: '1', name: 'Rohan Sharma', internship: 'Data Science at DataDriven Co.', status: 'Active' },
  { id: '2', name: 'Priya Patel', internship: 'Frontend at Innovate Inc.', status: 'Active' },
  { id: '3', name: 'Amit Singh', internship: 'Not Started', status: 'Searching' },
];

const pendingApprovals = [
  { id: '1', studentName: 'Kavita Iyer', internship: 'Marketing at Growth Gurus' },
  { id: '2', studentName: 'Sameer Khan', internship: 'Product Management at Productify' },
];

export default function FacultyDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Faculty Dashboard</h1>
        <p className="text-muted-foreground">
          Oversee student internships and approvals.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Students Monitored
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">125</div>
            <p className="text-xs text-muted-foreground">
              Across 5 departments
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Internships
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">88</div>
            <p className="text-xs text-muted-foreground">
              In 45 companies
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingApprovals.length}</div>
            <p className="text-xs text-muted-foreground">
              Require your review
            </p>
          </CardContent>
        </Card>
      </div>
       <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Monitored Students</CardTitle>
            <CardDescription>An overview of your students' internship status.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Internship</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {monitoredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={`/avatars/${student.id}.png`} alt="Avatar" />
                          <AvatarFallback>{student.name.slice(0,2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{student.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{student.internship}</TableCell>
                    <TableCell>
                       <Badge variant={student.status === 'Active' ? 'success' : 'secondary'}>{student.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">View Logbook</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
             <CardDescription>Review and approve student internship applications.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
              {pendingApprovals.map((approval) => (
                <div key={approval.id} className="flex items-center justify-between p-2 rounded-lg border">
                  <div>
                    <p className="font-medium">{approval.studentName}</p>
                    <p className="text-sm text-muted-foreground">{approval.internship}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Review</Button>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
