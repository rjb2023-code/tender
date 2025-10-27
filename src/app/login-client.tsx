'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/use-user';
import type { UserRole } from '@/lib/types';
import { ShieldCheck, UserCog, Building } from 'lucide-react';

export default function LoginClient() {
  const router = useRouter();
  const { login } = useUser();

  const handleLogin = (role: UserRole) => {
    login(role);
    router.push('/dashboard');
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <h2 className="text-center font-semibold">Select a Role to Continue</h2>
          <Button
            onClick={() => handleLogin('admin')}
            className="w-full justify-start"
            variant="outline"
          >
            <ShieldCheck className="mr-2 h-5 w-5 text-destructive" />
            <span className="font-semibold">Login as Admin</span>
          </Button>
          <Button
            onClick={() => handleLogin('manager')}
            className="w-full justify-start"
            variant="outline"
          >
            <UserCog className="mr-2 h-5 w-5 text-primary" />
            <span className="font-semibold">Login as Manager</span>
          </Button>
          <Button
            onClick={() => handleLogin('vendor')}
            className="w-full justify-start"
            variant="outline"
          >
            <Building className="mr-2 h-5 w-5 text-accent" />
            <span className="font-semibold">Login as Vendor</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
