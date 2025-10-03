import type { Internship, Application, LogEntry } from './types';

export const internships: Internship[] = [
  {
    id: '1',
    title: 'Frontend Developer Intern',
    company: 'Innovate Inc.',
    companyLogo: '/innovate-logo.png',
    location: 'Remote',
    type: 'Remote',
    stipend: '₹20,000/month',
    industry: 'Technology',
    description: 'Join our team to work on exciting new features for our flagship product. You will learn about modern frontend frameworks and best practices.',
    responsibilities: ['Develop new user-facing features', 'Build reusable code and libraries', 'Ensure the technical feasibility of UI/UX designs'],
    requirements: ['Experience with React', 'Understanding of HTML, CSS, and JavaScript', 'Familiarity with RESTful APIs'],
    applicants: 120,
  },
  {
    id: '2',
    title: 'Data Science Intern',
    company: 'DataDriven Co.',
    companyLogo: '/datadriven-logo.png',
    location: 'Bangalore',
    type: 'On-site',
    stipend: '₹25,000/month',
    industry: 'Data Science',
    description: 'Work with our data science team to analyze large datasets and generate valuable insights. This is a great opportunity to apply your machine learning knowledge.',
    responsibilities: ['Data cleaning and preprocessing', 'Building predictive models', 'Creating data visualizations'],
    requirements: ['Proficiency in Python (pandas, scikit-learn)', 'Knowledge of machine learning algorithms', 'Strong analytical skills'],
    applicants: 85,
  },
  {
    id: '3',
    title: 'Product Management Intern',
    company: 'Productify',
    companyLogo: '/productify-logo.png',
    location: 'Hybrid',
    type: 'Hybrid',
    stipend: '₹18,000/month',
    industry: 'Product Management',
    description: 'As a Product Management Intern, you will help define product roadmaps, conduct market research, and work closely with engineering and design teams.',
    responsibilities: ['Conducting user research', 'Writing product specifications', 'Tracking product metrics'],
    requirements: ['Strong communication skills', 'Analytical and problem-solving abilities', 'Interest in technology and business'],
    applicants: 200,
  },
  {
    id: '4',
    title: 'Marketing Intern',
    company: 'Growth Gurus',
    companyLogo: '/growthgurus-logo.png',
    location: 'Mumbai',
    type: 'On-site',
    stipend: '₹15,000/month',
    industry: 'Marketing',
    description: 'Join our dynamic marketing team and contribute to our digital marketing campaigns. You will get hands-on experience with SEO, SMM, and content marketing.',
    responsibilities: ['Manage social media accounts', 'Assist in creating marketing content', 'Analyze campaign performance'],
    requirements: ['Familiarity with social media platforms', 'Good writing skills', 'Eagerness to learn about digital marketing'],
    applicants: 150,
  },
];

export const applications: Application[] = [
  {
    id: 'app1',
    internshipId: '1',
    internshipTitle: 'Frontend Developer Intern',
    company: 'Innovate Inc.',
    status: 'Under Review',
    appliedDate: '2024-07-15',
  },
  {
    id: 'app2',
    internshipId: '2',
    internshipTitle: 'Data Science Intern',
    company: 'DataDriven Co.',
    status: 'Selected',
    appliedDate: '2024-07-10',
  },
  {
    id: 'app3',
    internshipId: '3',
    internshipTitle: 'Product Management Intern',
    company: 'Productify',
    status: 'Applied',
    appliedDate: '2024-07-20',
  },
  {
    id: 'app4',
    internshipId: '4',
    internshipTitle: 'Marketing Intern',
    company: 'Growth Gurus',
    status: 'Rejected',
    appliedDate: '2024-07-01',
  },
];

export const studentProfile = {
  name: 'Aisha Sharma',
  major: 'Computer Science Engineering',
  skills: ['React', 'Node.js', 'Python', 'Machine Learning', 'UI/UX Design'],
};

export const initialLogEntries: LogEntry[] = [
    {
      id: 1,
      date: "2024-07-22",
      content: "Started my internship at DataDriven Co. Attended the orientation session and met the team. Got an overview of the project I'll be working on: Customer Churn Prediction."
    },
    {
      id: 2,
      date: "2024-07-23",
      content: "Began the data exploration phase. Received the dataset and started analyzing it using pandas. Found some missing values and inconsistencies that need to be cleaned."
    }
]

export const analyticsData = {
  studentParticipation: [
    { month: 'Jan', applications: 45 },
    { month: 'Feb', applications: 60 },
    { month: 'Mar', applications: 75 },
    { month: 'Apr', applications: 80 },
    { month: 'May', applications: 110 },
    { month: 'Jun', applications: 130 },
  ],
  industryEngagement: [
    { name: 'Technology', value: 400, fill: "var(--color-chart-1)" },
    { name: 'Marketing', value: 300, fill: "var(--color-chart-2)" },
    { name: 'Data Science', value: 250, fill: "var(--color-chart-3)" },
    { name: 'Product Mgmt', value: 200, fill: "var(--color-chart-4)" },
    { name: 'Other', value: 150, fill: "var(--color-chart-5)" },
  ],
  skillGaps: {
    required: [
      { skill: 'Python', value: 90 },
      { skill: 'React', value: 85 },
      { skill: 'SQL', value: 70 },
      { skill: 'AWS', value: 60 },
      { skill: 'Go', value: 40 },
    ],
    available: [
      { skill: 'Python', value: 75 },
      { skill: 'React', value: 60 },
      { skill: 'SQL', value: 50 },
      { skill: 'AWS', value: 25 },
      { skill: 'Go', value: 10 },
    ],
  },
};
