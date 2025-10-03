'use server';
/**
 * @fileOverview A flow for generating authentic, NEP-compliant internship reports based on logbook entries.
 *
 * - generateInternshipReport - A function that handles the generation of internship reports.
 * - GenerateInternshipReportInput - The input type for the generateInternshipReport function.
 * - GenerateInternshipReportOutput - The return type for the generateInternshipReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInternshipReportInputSchema = z.object({
  logbookEntries: z.string().describe('A string containing the student’s logbook entries.'),
  studentProfile: z.string().describe('A string containing the student’s profile information, including skills and academic major.'),
  internshipDetails: z.string().describe('A string containing the details of the internship, including description, responsibilities, and requirements.'),
});
export type GenerateInternshipReportInput = z.infer<typeof GenerateInternshipReportInputSchema>;

const GenerateInternshipReportOutputSchema = z.object({
  report: z.string().describe('The generated NEP-compliant internship report.'),
});
export type GenerateInternshipReportOutput = z.infer<typeof GenerateInternshipReportOutputSchema>;

export async function generateInternshipReport(input: GenerateInternshipReportInput): Promise<GenerateInternshipReportOutput> {
  return generateInternshipReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInternshipReportPrompt',
  input: {schema: GenerateInternshipReportInputSchema},
  output: {schema: GenerateInternshipReportOutputSchema},
  prompt: `You are an expert in generating NEP-compliant internship reports. You will receive the student’s logbook entries, profile information, and internship details. Based on this information, you will generate a comprehensive and authentic internship report.

Logbook Entries: {{{logbookEntries}}}
Student Profile: {{{studentProfile}}}
Internship Details: {{{internshipDetails}}}

Generate the internship report:
`,
});

const generateInternshipReportFlow = ai.defineFlow(
  {
    name: 'generateInternshipReportFlow',
    inputSchema: GenerateInternshipReportInputSchema,
    outputSchema: GenerateInternshipReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
