'use server';

import { generateInternshipReport } from '@/ai/flows/generate-internship-report';
import { studentProfile, internships } from '@/lib/data';

type FormState = {
  message: string;
  report?: string;
  success: boolean;
};

export async function generateReportAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const logbookEntries = formData.get('logbookEntries') as string;

  if (!logbookEntries || logbookEntries.trim().length === 0) {
    return { message: 'Logbook entries cannot be empty.', success: false };
  }

  try {
    // Using mock data for student profile and internship details
    const internshipDetails = internships.find(i => i.id === '2'); // Assuming student has the Data Science internship

    const input = {
      logbookEntries,
      studentProfile: `Name: ${studentProfile.name}, Major: ${studentProfile.major}, Skills: ${studentProfile.skills.join(', ')}`,
      internshipDetails: `Title: ${internshipDetails?.title}, Company: ${internshipDetails?.company}, Description: ${internshipDetails?.description}`,
    };

    const result = await generateInternshipReport(input);

    if (result.report) {
      return { message: 'Report generated successfully.', report: result.report, success: true };
    } else {
      return { message: 'Failed to generate report. The AI model did not return a report.', success: false };
    }
  } catch (error) {
    console.error(error);
    return { message: 'An unexpected error occurred while generating the report.', success: false };
  }
}
