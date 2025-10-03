'use server';

/**
 * @fileOverview An AI-powered internship recommendation flow.
 *
 * - recommendInternships - A function that recommends internships based on student profile, skills, and major.
 * - InternshipRecommendationInput - The input type for the recommendInternships function.
 * - InternshipRecommendationOutput - The return type for the recommendInternships function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InternshipRecommendationInputSchema = z.object({
  profile: z.string().describe('Student profile, including academic major, skills, and experience.'),
  skills: z.string().describe('List of student skills.'),
  academicMajor: z.string().describe('Student academic major.'),
});
export type InternshipRecommendationInput = z.infer<typeof InternshipRecommendationInputSchema>;

const InternshipRecommendationOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('A list of recommended internships based on the student profile, skills, and academic major.'),
});
export type InternshipRecommendationOutput = z.infer<typeof InternshipRecommendationOutputSchema>;

export async function recommendInternships(input: InternshipRecommendationInput): Promise<InternshipRecommendationOutput> {
  return recommendInternshipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'internshipRecommendationPrompt',
  input: {schema: InternshipRecommendationInputSchema},
  output: {schema: InternshipRecommendationOutputSchema},
  prompt: `You are an AI assistant that recommends internships to students based on their profile, skills, and academic major.\n\nStudent Profile: {{{profile}}}\nSkills: {{{skills}}}\nAcademic Major: {{{academicMajor}}}\n\nBased on this information, recommend a list of internships that would be a good fit for the student. Return the recommendations as a list of internship titles, in an array. Consider both relevance and the student's qualifications when forming the list.\n`, config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const recommendInternshipsFlow = ai.defineFlow(
  {
    name: 'recommendInternshipsFlow',
    inputSchema: InternshipRecommendationInputSchema,
    outputSchema: InternshipRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
