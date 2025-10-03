'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from '@/hooks/use-toast';

const internshipSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  company: z.string().min(2, 'Company name is required'),
  location: z.string().min(2, 'Location is required'),
  type: z.enum(['On-site', 'Remote', 'Hybrid']),
  stipend: z.string().optional(),
  industry: z.string().min(2, 'Industry is required'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  responsibilities: z.string().min(20, 'Responsibilities must be at least 20 characters'),
  requirements: z.string().min(20, 'Requirements must be at least 20 characters'),
});

export default function PostInternshipPage() {
  const form = useForm<z.infer<typeof internshipSchema>>({
    resolver: zodResolver(internshipSchema),
    defaultValues: {
      title: '',
      company: '',
      location: '',
      stipend: '',
      industry: '',
      description: '',
      responsibilities: '',
      requirements: '',
    },
  });

  function onSubmit(values: z.infer<typeof internshipSchema>) {
    console.log(values);
    toast({
        title: "Internship Posted!",
        description: `The ${values.title} position has been successfully posted.`,
    })
    form.reset();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Post a New Internship</h1>
        <p className="text-muted-foreground">
          Fill out the details below to find the best talent for your open position.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Internship Details</CardTitle>
              <CardDescription>Provide the core information about the internship.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Internship Title</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g. Frontend Developer Intern" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Your company's name" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                     <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g. Bangalore, Remote" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                     <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Internship Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                <SelectItem value="On-site">On-site</SelectItem>
                                <SelectItem value="Remote">Remote</SelectItem>
                                <SelectItem value="Hybrid">Hybrid</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="stipend"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Stipend (Optional)</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g. ₹20,000/month" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Industry</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g. Technology" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                 <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Job Description</FormLabel>
                        <FormControl>
                            <Textarea rows={4} placeholder="Provide a detailed description of the role..." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormField
                    control={form.control}
                    name="responsibilities"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Responsibilities</FormLabel>
                        <FormControl>
                            <Textarea rows={4} placeholder="List the key responsibilities. Separate each with a new line." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormField
                    control={form.control}
                    name="requirements"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Requirements</FormLabel>
                        <FormControl>
                            <Textarea rows={4} placeholder="List the required skills and qualifications. Separate each with a new line." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
            </CardContent>
            <CardFooter>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'Posting...' : 'Post Internship'}
                </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
