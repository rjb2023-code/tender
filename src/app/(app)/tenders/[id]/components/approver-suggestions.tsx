'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Wand2, Loader2, UserPlus, Users } from 'lucide-react';
import { suggestApprovers, type SuggestApproversOutput } from '@/ai/flows/suggest-approvers';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface ApproverSuggestionsProps {
  tenderDetails: string;
  pastApprovers: string;
}

export function ApproverSuggestions({ tenderDetails, pastApprovers }: ApproverSuggestionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestApproversOutput | null>(null);
  const { toast } = useToast();

  const handleSuggest = async () => {
    setIsLoading(true);
    setSuggestions(null);
    try {
      const result = await suggestApprovers({ tenderDetails, pastApprovers });
      setSuggestions(result);
    } catch (error) {
      console.error('Error suggesting approvers:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to get approver suggestions.',
      });
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" onClick={handleSuggest}>
          <Wand2 className="mr-2 h-4 w-4" />
          Suggest Approvers
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-headline">
            <Wand2 className="h-5 w-5 text-primary" />
            AI Approver Suggestions
          </DialogTitle>
          <DialogDescription>
            Based on the tender details, here are some suggested approvers.
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-4 text-muted-foreground">Analyzing tender data...</p>
          </div>
        ) : suggestions ? (
          <div className="py-4 space-y-4">
            <div>
              <h3 className="font-semibold text-sm mb-2 flex items-center"><Users className="mr-2 h-4 w-4"/>Suggested Approvers</h3>
              <div className="flex flex-wrap gap-2">
                {suggestions.suggestedApprovers.map((approver, index) => (
                  <Badge key={index} variant="secondary" className="text-base font-normal">
                    {approver}
                  </Badge>
                ))}
              </div>
            </div>
            <Separator/>
            <div>
              <h3 className="font-semibold text-sm mb-2">Reasoning</h3>
              <p className="text-sm text-muted-foreground bg-secondary/50 p-3 rounded-md">
                {suggestions.reasoning}
              </p>
            </div>
          </div>
        ) : null}
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Close
          </Button>
          <Button disabled={isLoading || !suggestions}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add to Workflow
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
