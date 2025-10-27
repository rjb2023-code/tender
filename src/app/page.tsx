import { Logo } from '@/components/icons';
import LoginClient from '@/app/login-client';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center justify-center space-y-4 text-center">
          <Logo className="h-16 w-16 text-primary" />
          <h1 className="font-headline text-4xl font-bold tracking-tight text-primary">
            TenderFlow
          </h1>
          <p className="text-muted-foreground">
            Streamlining Tender Management for PT. Chitra Paratama
          </p>
        </div>
        <LoginClient />
      </div>
    </div>
  );
}
