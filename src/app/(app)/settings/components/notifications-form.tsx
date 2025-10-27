'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

const notificationsFormSchema = z.object({
  tenderUpdates: z.boolean().default(true),
  approvalRequests: z.boolean().default(true),
  deadlineReminders: z.boolean().default(false),
  summaryEmails: z.boolean().default(true),
});

type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;

export default function NotificationsForm() {
  const { toast } = useToast();

  const form = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      tenderUpdates: true,
      approvalRequests: true,
      deadlineReminders: true,
      summaryEmails: false,
    },
  });

  function onSubmit(data: NotificationsFormValues) {
    toast({
      title: 'Preferences Saved',
      description: 'Your notification settings have been updated.',
    });
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8 max-w-2xl">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="tenderUpdates"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Tender Status Updates</FormLabel>
                  <FormDescription>
                    Receive notifications for new submissions, approvals, and rejections.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="approvalRequests"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Approval Requests</FormLabel>
                  <FormDescription>
                    Get notified when your approval is required for a tender.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="deadlineReminders"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Deadline Reminders</FormLabel>
                  <FormDescription>
                    Receive reminders for approaching tender deadlines.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="summaryEmails"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Weekly Summary Emails</FormLabel>
                  <FormDescription>
                    Get a weekly summary of all tender activities.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Save Preferences</Button>
      </form>
    </Form>
  );
}
