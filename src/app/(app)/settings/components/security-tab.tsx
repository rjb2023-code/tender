'use client';

import { useUser } from '@/hooks/use-user';
import { Badge } from '@/components/ui/badge';
import { Building, ShieldCheck, UserCog, CheckCircle2, XCircle } from 'lucide-react';

const roleConfig = {
  admin: {
    label: 'Administrator',
    icon: ShieldCheck,
    color: 'bg-destructive/20 text-destructive',
    permissions: {
      'View all tenders': true,
      'Submit tenders': true,
      'Approve tenders': true,
      'Manage users': true,
      'Access settings': true,
    },
  },
  manager: {
    label: 'Manager',
    icon: UserCog,
    color: 'bg-primary/20 text-primary',
    permissions: {
      'View all tenders': true,
      'Submit tenders': false,
      'Approve tenders': true,
      'Manage users': false,
      'Access settings': true,
    },
  },
  vendor: {
    label: 'Vendor',
    icon: Building,
    color: 'bg-accent/20 text-accent',
    permissions: {
      'View all tenders': false,
      'Submit tenders': true,
      'Approve tenders': false,
      'Manage users': false,
      'Access settings': true,
    },
  },
};

export default function SecurityTab() {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  const config = roleConfig[user.role];
  const Icon = config.icon;

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h3 className="font-semibold">Your Role</h3>
        <p className="text-muted-foreground text-sm">Your role determines what you can see and do in TenderFlow.</p>
        <div className="mt-2">
           <Badge variant="outline" className={`text-base font-medium px-4 py-2 ${config.color}`}>
            <Icon className="mr-2 h-5 w-5" />
            {config.label}
          </Badge>
        </div>
      </div>
      <div>
        <h3 className="font-semibold">Permissions</h3>
        <p className="text-muted-foreground text-sm">Here is a summary of your permissions.</p>
        <ul className="mt-4 space-y-2">
          {Object.entries(config.permissions).map(([permission, allowed]) => (
            <li key={permission} className="flex items-center text-sm">
              {allowed ? (
                <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 mr-2 text-muted-foreground" />
              )}
              <span className={!allowed ? 'text-muted-foreground' : ''}>{permission}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
