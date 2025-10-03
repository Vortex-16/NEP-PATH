'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm, FormProvider } from 'react-hook-form';

function LoginComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'student';
  const methods = useForm();

  const onSubmit = () => {
    // In a real app, you'd handle authentication here.
    // For now, we'll just redirect based on the role.
    const dashboardPaths: { [key: string]: string } = {
      student: '/dashboard',
      faculty: '/faculty/dashboard',
      industry: '/industry/dashboard',
    };
    router.push(dashboardPaths[role] || '/dashboard');
  };
  
  const getRoleTitle = (role: string) => {
    switch (role) {
      case 'faculty':
        return 'Faculty Login';
      case 'industry':
        return 'Industry Login';
      case 'student':
      default:
        return 'Student Login';
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Card className="w-full max-w-sm">
            <CardHeader className="text-center">
                <div className="mb-4 text-5xl">
                    {role === 'student' && '🎓'}
                    {role === 'faculty' && '🏫'}
                    {role === 'industry' && '🏢'}
                </div>
              <CardTitle>{getRoleTitle(role)}</CardTitle>
              <CardDescription>Enter your credentials to access your dashboard.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="user@example.com" required defaultValue="user@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required defaultValue="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">Login</Button>
            </CardFooter>
          </Card>
        </form>
      </FormProvider>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginComponent />
    </Suspense>
  );
}
