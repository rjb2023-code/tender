'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Upload } from 'lucide-react';

const tenderFormSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters.'),
  vendor: z.string().min(2, 'Vendor name is required.'),
  department: z.string().min(2, 'Department is required.'),
  amount: z.coerce.number().min(1000, 'Amount must be at least 1,000.'),
  description: z.string().min(30, 'Description must be at least 30 characters.'),
  documents: z.any().optional(),
});

type TenderFormValues = z.infer<typeof tenderFormSchema>;

export default function NewTenderPage() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<TenderFormValues>({
    resolver: zodResolver(tenderFormSchema),
    defaultValues: {
      title: '',
      vendor: '',
      department: '',
      amount: 0,
      description: '',
    },
  });

  function onSubmit(data: TenderFormValues) {
    console.log(data);
    toast({
      title: 'Tender Submitted!',
      description: `Your tender "${data.title}" has been successfully submitted for review.`,
    });
    router.push('/dashboard');
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Submit New Tender</h1>
        <p className="text-muted-foreground">Fill out the form below to create a new tender application.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Tender Information</CardTitle>
          <CardDescription>Please provide all the necessary details for the new tender.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tender Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Pengadaan Laptop Kantor 2024" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FormField
                  control={form.control}
                  name="vendor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vendor Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., PT. Teknologi Nusantara" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., IT Department" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount (IDR)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 500000000" {...field} />
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
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide a detailed description of the tender requirements, scope, and objectives."
                        className="min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="documents"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Attach Documents</FormLabel>
                    <FormControl>
                       <div className="relative flex items-center justify-center w-full">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-secondary/50 hover:bg-secondary">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                                <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-muted-foreground">PDF, DOCX, XLSX (MAX. 10MB)</p>
                            </div>
                            <Input id="dropzone-file" type="file" className="hidden" {...field} />
                        </label>
                      </div> 
                    </FormControl>
                    <FormDescription>
                      Upload proposals, quotes, and other relevant files.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end space-x-4">
                 <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
                 <Button type="submit">Submit for Review</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
