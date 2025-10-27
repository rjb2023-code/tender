import { tenders, users } from '@/lib/data';
import { notFound } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  CircleCheck,
  CircleDashed,
  CircleX,
  Clock,
  Download,
  FileText,
  Paperclip,
  Users,
} from 'lucide-react';
import type { ApprovalStatus, TenderStatus } from '@/lib/types';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ApproverSuggestions } from './components/approver-suggestions';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

const statusConfig: Record<TenderStatus, { label: string; color: string }> = {
  Submitted: { label: 'Submitted', color: 'bg-blue-500' },
  'In Review': { label: 'In Review', color: 'bg-yellow-500' },
  Approved: { label: 'Approved', color: 'bg-green-500' },
  Awarded: { label: 'Awarded', color: 'bg-teal-500' },
  Rejected: { label: 'Rejected', color: 'bg-red-500' },
  Draft: { label: 'Draft', color: 'bg-gray-500' },
};

const approvalStatusConfig: Record<ApprovalStatus, { icon: React.ComponentType<{className?: string}>; color: string }> = {
  Pending: { icon: Clock, color: 'text-yellow-500' },
  Approved: { icon: CircleCheck, color: 'text-green-500' },
  Rejected: { icon: CircleX, color: 'text-red-500' },
};

export default function TenderDetailPage({ params }: { params: { id: string } }) {
  const tender = tenders.find((t) => t.id === params.id);

  if (!tender) {
    notFound();
  }
  
  const pastApproversForAI = users.filter(u => u.role === 'manager').map(u => `${u.name} (${u.email})`).join(', ');

  return (
    <div className="grid gap-6">
       <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{tender.id}</p>
          <h1 className="text-3xl font-bold font-headline">{tender.title}</h1>
        </div>
        <Badge className="text-sm py-1 px-3">
          <span className={cn('mr-2 h-2 w-2 rounded-full', statusConfig[tender.status].color)} />
          {statusConfig[tender.status].label}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Tender Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{tender.description}</p>
              <Separator />
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">Vendor</p>
                  <p className="text-muted-foreground">{tender.vendor}</p>
                </div>
                <div>
                  <p className="font-medium">Department</p>
                  <p className="text-muted-foreground">{tender.department}</p>
                </div>
                <div>
                  <p className="font-medium">Amount</p>
                  <p className="text-muted-foreground font-semibold">{formatCurrency(tender.amount)}</p>
                </div>
                <div>
                  <p className="font-medium">Submission Date</p>
                  <p className="text-muted-foreground">{new Date(tender.submissionDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Tabs defaultValue="approvals">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="approvals">
                <Users className="mr-2 h-4 w-4" /> Approvals
              </TabsTrigger>
              <TabsTrigger value="documents">
                <Paperclip className="mr-2 h-4 w-4" /> Documents
              </TabsTrigger>
            </TabsList>
            <TabsContent value="approvals">
              <Card>
                <CardHeader>
                  <CardTitle>Approval Workflow</CardTitle>
                  <CardDescription>Track the approval status of this tender.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tender.approvers.map((approver) => {
                      const user = users.find((u) => u.id === approver.userId);
                      const StatusIcon = approvalStatusConfig[approver.status].icon;
                      if (!user) return null;

                      return (
                        <div key={user.id} className="flex items-center gap-4">
                          <Image
                            src={user.avatar}
                            alt={user.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <div className="flex-1">
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                            {approver.comments && <p className="text-xs italic text-muted-foreground mt-1">"{approver.comments}"</p>}
                          </div>
                          <div className="flex items-center gap-2">
                            <StatusIcon className={cn('h-5 w-5', approvalStatusConfig[approver.status].color)} />
                            <span className="text-sm">{approver.status}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <Separator className="my-4"/>
                  <ApproverSuggestions tenderDetails={tender.description} pastApprovers={pastApproversForAI} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle>Documents</CardTitle>
                  <CardDescription>All documents related to this tender.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableBody>
                      {tender.documents.map((doc) => (
                        <TableRow key={doc.name}>
                          <TableCell className="font-medium flex items-center gap-2"><FileText className="h-4 w-4 text-muted-foreground"/>{doc.name}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
