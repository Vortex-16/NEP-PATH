'use client';

import { useState, useTransition, useRef, useEffect } from 'react';
import { useFormState } from 'react-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { initialLogEntries } from '@/lib/data';
import type { LogEntry } from '@/lib/types';
import { generateReportAction } from '@/lib/actions';
import { Bot, Loader2, Plus, FileText } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from './ui/dialog';

const initialState = {
  message: '',
  report: '',
  success: false,
};

export function ReportGenerator() {
  const [logEntries, setLogEntries] = useState<LogEntry[]>(initialLogEntries);
  const [newEntry, setNewEntry] = useState('');
  const [state, formAction] = useFormState(generateReportAction, initialState);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [isReportModalOpen, setReportModalOpen] = useState(false);

  useEffect(() => {
    if (state.message && !state.success && !isPending) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      });
    }
    if(state.success && state.report) {
      setReportModalOpen(true);
    }
  }, [state, toast, isPending]);

  const handleAddEntry = () => {
    if (newEntry.trim()) {
      const newLog: LogEntry = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        content: newEntry.trim(),
      };
      setLogEntries([...logEntries, newLog]);
      setNewEntry('');
    }
  };

  const allEntriesAsString = logEntries
    .map((entry) => `Date: ${entry.date}\nLog: ${entry.content}`)
    .join('\n\n');

  return (
    <>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Logbook Entries</CardTitle>
            <CardDescription>Record your daily activities and learnings.</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] w-full rounded-md border p-4">
              {logEntries.length > 0 ? (
                logEntries.map((entry, index) => (
                  <div key={entry.id}>
                    <div className="mb-4">
                      <p className="font-semibold text-sm">
                        {new Date(entry.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      <p className="text-muted-foreground text-sm">{entry.content}</p>
                    </div>
                    {index < logEntries.length - 1 && <Separator className="mb-4" />}
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No log entries yet.</p>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
        
        <div className="space-y-8">
            <Card>
            <CardHeader>
                <CardTitle>Add New Log Entry</CardTitle>
            </CardHeader>
            <CardContent>
                <Textarea
                placeholder="What did you work on today?"
                value={newEntry}
                onChange={(e) => setNewEntry(e.target.value)}
                className="min-h-[150px]"
                />
            </CardContent>
            <CardFooter>
                <Button onClick={handleAddEntry} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Entry
                </Button>
            </CardFooter>
            </Card>

            <Card className="bg-primary/5 dark:bg-primary/10 border-primary/20">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Bot className="text-primary"/> AI Report Generator
                </CardTitle>
                <CardDescription>
                Automatically generate your NEP-compliant internship report based on your log entries.
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <form action={(formData) => {
                    startTransition(() => formAction(formData));
                }} ref={formRef} className='w-full'>
                    <input type="hidden" name="logbookEntries" value={allEntriesAsString} />
                    <Button type="submit" disabled={isPending || logEntries.length === 0} className="w-full">
                        {isPending ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <FileText className="mr-2 h-4 w-4" />
                        )}
                        Generate Report
                    </Button>
                </form>
            </CardFooter>
            </Card>
        </div>
      </div>

      <Dialog open={isReportModalOpen} onOpenChange={setReportModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Generated Internship Report</DialogTitle>
            <DialogDescription>
              Here is the AI-generated report based on your logbook. Please review and edit as needed.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[60vh] rounded-md border p-4">
            <pre className="whitespace-pre-wrap text-sm">{state.report}</pre>
          </ScrollArea>
           <DialogClose asChild>
                <Button type="button" variant="secondary">
                    Close
                </Button>
            </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
}
