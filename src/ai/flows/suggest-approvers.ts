// src/ai/flows/suggest-approvers.ts
'use server';

/**
 * @fileOverview A flow to suggest approvers for tender applications using generative AI.
 *
 * - suggestApprovers - A function that suggests approvers for a tender application.
 * - SuggestApproversInput - The input type for the suggestApprovers function.
 * - SuggestApproversOutput - The return type for the suggestApprovers function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestApproversInputSchema = z.object({
  tenderDetails: z.string().describe('Details of the tender application, including the department, amount, and vendor.'),
  pastApprovers: z.string().describe('A list of past approvers and their roles in previous tender applications.'),
});
export type SuggestApproversInput = z.infer<typeof SuggestApproversInputSchema>;

const SuggestApproversOutputSchema = z.object({
  suggestedApprovers: z.array(z.string()).describe('An array of suggested approvers for the tender application.'),
  reasoning: z.string().describe('The reasoning behind the suggestions.'),
});
export type SuggestApproversOutput = z.infer<typeof SuggestApproversOutputSchema>;

export async function suggestApprovers(input: SuggestApproversInput): Promise<SuggestApproversOutput> {
  return suggestApproversFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestApproversPrompt',
  input: {schema: SuggestApproversInputSchema},
  output: {schema: SuggestApproversOutputSchema},
  prompt: `You are an AI assistant that suggests approvers for tender applications based on their past roles and approvals.

  Tender Details: {{{tenderDetails}}}
  Past Approvers: {{{pastApprovers}}}

  Based on the tender details and the list of past approvers, suggest a list of approvers for this tender application. Also provide a reasoning for the suggestions.

  Format your response as a JSON object with the following keys:
  - suggestedApprovers: An array of suggested approvers.
  - reasoning: The reasoning behind the suggestions.
  `,
});

const suggestApproversFlow = ai.defineFlow(
  {
    name: 'suggestApproversFlow',
    inputSchema: SuggestApproversInputSchema,
    outputSchema: SuggestApproversOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
