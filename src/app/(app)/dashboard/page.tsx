import Link from 'next/link';
import {
  Activity,
  ArrowUpRight,
  CircleCheck,
  CircleDashed,
  CircleX,
  FilePlus,
  Truck,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import { tenders } from '@/lib/data';
import { cn } from '@/lib/utils';
import type { TenderStatus } from '@/lib/types';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

const statusConfig: Record<TenderStatus, { label: string; icon: React.ComponentType<{className?: string}>; color: string }> = {
  Submitted: { label: 'Submitted', icon: CircleDashed, color: 'text-blue-500' },
  'In Review': { label: 'In Review', icon: Activity, color: 'text-yellow-500' },
  Approved: { label: 'Approved', icon: CircleCheck, color: 'text-green-500' },
  Awarded: { label: 'Awarded', icon: Truck, color: 'text-accent' },
  Rejected: { label: 'Rejected', icon: CircleX, color: 'text-red-500' },
  Draft: { label: 'Draft', icon: CircleDashed, color: 'text-gray-500' },
};

export default function DashboardPage() {
  const totalTenders = tenders.length;
  const pendingTenders = tenders.filter(t => t.status === 'In Review' || t.status === 'Submitted').length;
  const totalValue = tenders.reduce((sum, t) => sum + t.amount, 0);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-headline">Dashboard</h1>
        <Button asChild>
          <Link href="/tenders/new">
            <FilePlus className="mr-2 h-4 w-4" />
            Submit Tender
          </Link>
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tender Value</CardTitle>
            <span className="text-muted-foreground">Rp</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalValue).replace('Rp', '')}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tenders</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{totalTenders}</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tenders</CardTitle>
            <CircleDashed className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingTenders}</div>
            <p className="text-xs text-muted-foreground">+2 since last hour</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Tenders</CardTitle>
          <CardDescription>An overview of the most recent tender submissions.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tender</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="hidden md:table-cell">Submission Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tenders.slice(0, 5).map((tender) => (
                <TableRow key={tender.id}>
                  <TableCell>
                    <div className="font-medium">{tender.title}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {tender.vendor}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge className="text-xs" variant="outline">
                      <span className={cn('mr-1.5 h-2 w-2 rounded-full', statusConfig[tender.status].color.replace('text-', 'bg-'))} />
                      {statusConfig[tender.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(tender.submissionDate).toLocaleDateString('en-GB', {
                      day: 'numeric', month: 'long', year: 'numeric'
                    })}
                  </TableCell>
                  <TableCell className="text-right">{formatCurrency(tender.amount)}</TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="outline" size="sm">
                       <Link href={`/tenders/${tender.id}`}>
                        View <ArrowUpRight className="ml-1 h-4 w-4" />
                       </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
