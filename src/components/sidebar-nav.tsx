'use client';

import {
  BookCopy,
  Briefcase,
  ChevronDown,
  LayoutDashboard,
  LineChart,
  LogOut,
  NotebookText,
  Settings,
  User,
  Users,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { UserNav } from './user-nav';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

const studentLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/internships', label: 'Internships', icon: Briefcase },
  { href: '/applications', label: 'Applications', icon: NotebookText },
  { href: '/resources', label: 'Resources', icon: BookCopy },
  { href: '/logbook', label: 'Internship Logbook', icon: NotebookText },
];

const facultyLinks = [
  { href: '/faculty/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/faculty/monitoring', label: 'Student Monitoring', icon: Users },
  { href: '/faculty/approvals', label: 'Approvals', icon: Briefcase },
];

const industryLinks = [
  { href: '/industry/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/industry/post-internship', label: 'Post Internship', icon: Briefcase },
  { href: '/industry/applicants', label: 'Applicants', icon: Users },
];

export function SidebarNav() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  const NepPathLogo = () => (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6" /><path d="M2 10v6" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /><path d="m6.34 17.66-1.41 1.41" /><circle cx="12" cy="12" r="4" /></svg>
      </div>
      <h1 className="text-lg font-bold">NEP PATH</h1>
    </div>
  );

  return (
    <>
      <SidebarHeader>
        <NepPathLogo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Student</SidebarGroupLabel>
          <SidebarMenu>
            {studentLinks.map((link) => (
              <SidebarMenuItem key={link.href}>
                <Link href={link.href} legacyBehavior passHref>
                  <SidebarMenuButton
                    isActive={isActive(link.href)}
                    tooltip={{ children: link.label }}
                  >
                    <link.icon />
                    <span>{link.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Other Dashboards</SidebarGroupLabel>
          <Collapsible>
            <CollapsibleTrigger asChild>
                <SidebarMenuButton className="w-full justify-start">
                    <Users /> 
                    <span>Other Roles</span>
                    <ChevronDown className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200" />
                </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-4">
                 <SidebarMenu className="mt-2">
                    <SidebarMenuItem>
                        <Link href="#" legacyBehavior passHref><SidebarMenuButton variant="ghost" className="w-full justify-start"><Users className="text-muted-foreground"/>Faculty</SidebarMenuButton></Link>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <Link href="#" legacyBehavior passHref><SidebarMenuButton variant="ghost" className="w-full justify-start"><Briefcase className="text-muted-foreground" />Industry</SidebarMenuButton></Link>
                    </SidebarMenuItem>
                 </SidebarMenu>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        <SidebarGroup>
            <SidebarGroupLabel>Analytics</SidebarGroupLabel>
            <SidebarMenu>
                <SidebarMenuItem>
                    <Link href="/analytics" legacyBehavior passHref>
                        <SidebarMenuButton isActive={isActive('/analytics')} tooltip={{ children: "Analytics" }}>
                            <LineChart />
                            <span>Analytics</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>


      </SidebarContent>
      <SidebarFooter>
        <Separator className="my-2" />
        <div className="hidden md:block">
            <UserNav />
        </div>
      </SidebarFooter>
    </>
  );
}
