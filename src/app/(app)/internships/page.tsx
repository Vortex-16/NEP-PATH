'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { internships as allInternships } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Briefcase, MapPin, Search } from 'lucide-react';
import Link from 'next/link';

export default function InternshipsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('all');
  const [type, setType] = useState('all');
  const [industry, setIndustry] = useState('all');
  
  const filteredInternships = allInternships.filter((internship) => {
    return (
      (internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        internship.company.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (location === 'all' || internship.location === location || internship.location === 'Remote') &&
      (type === 'all' || internship.type === type) &&
      (industry === 'all' || internship.industry === industry)
    );
  });
  
  const locations = ['all', ...Array.from(new Set(allInternships.map(i => i.location)))];
  const types = ['all', 'On-site', 'Remote', 'Hybrid'];
  const industries = ['all', ...Array.from(new Set(allInternships.map(i => i.industry)))];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Find Your Next Opportunity</h1>
        <p className="text-muted-foreground">
          Browse and filter through hundreds of available internships.
        </p>
      </div>
      
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div className="relative lg:col-span-2">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
               <Input
                placeholder="Search by title or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map(loc => <SelectItem key={loc} value={loc}>{loc === 'all' ? 'All Locations' : loc}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                {types.map(t => <SelectItem key={t} value={t}>{t === 'all' ? 'All Types' : t}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={industry} onValueChange={setIndustry}>
              <SelectTrigger>
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map(ind => <SelectItem key={ind} value={ind}>{ind === 'all' ? 'All Industries' : ind}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredInternships.map((internship) => (
          <Card key={internship.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 flex-shrink-0 rounded-md bg-muted flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{internship.title}</CardTitle>
                      <CardDescription>{internship.company}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline">{internship.type}</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {internship.description}
              </p>
              <div className="mt-4 flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{internship.location}</span>
                </div>
                <div className="font-semibold text-primary">{internship.stipend}</div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/internships/${internship.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {filteredInternships.length === 0 && (
        <div className="text-center py-12">
            <p className="text-lg font-medium">No internships found</p>
            <p className="text-muted-foreground">Try adjusting your search filters.</p>
        </div>
      )}
    </div>
  );
}
