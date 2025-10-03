import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { applications } from '@/lib/data';
import type { ApplicationStatus } from '@/lib/types';

const getBadgeVariant = (status: ApplicationStatus) => {
  switch (status) {
    case 'Selected':
      return 'success';
    case 'Rejected':
      return 'destructive';
    case 'Under Review':
      return 'secondary';
    case 'Interviewing':
      return 'warning';
    case 'Applied':
    default:
      return 'outline';
  }
};

// We need to extend BadgeProps to include custom variants
const badgeVariants: any = {
  success: "border-transparent bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  warning: "border-transparent bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
};

const CustomBadge = ({ variant, ...props }: any) => {
  return <Badge className={badgeVariants[variant]} {...props} />;
};


export default function ApplicationsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Applications</h1>
        <p className="text-muted-foreground">
          Track the status of all your internship applications in one place.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Application History</CardTitle>
          <CardDescription>A list of all your submitted applications.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%]">Internship</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Date Applied</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.internshipTitle}</TableCell>
                  <TableCell>{app.company}</TableCell>
                  <TableCell>
                    {new Date(app.appliedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant={getBadgeVariant(app.status) as any}>
                      {app.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
