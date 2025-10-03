export type UserRole = 'student' | 'faculty' | 'industry';

export type ApplicationStatus = 'Applied' | 'Under Review' | 'Interviewing' | 'Selected' | 'Rejected';

export type Internship = {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  type: 'Remote' | 'On-site' | 'Hybrid';
  stipend: string;
  industry: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  applicants: number;
};

export type Application = {
  id: string;
  internshipId: string;
  internshipTitle: string;
  company: string;
  status: ApplicationStatus;
  appliedDate: string;
};

export type LogEntry = {
  id: number;
  date: string;
  content: string;
};
