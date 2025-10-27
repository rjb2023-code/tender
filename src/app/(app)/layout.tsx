'use client';

import { useUser } from '@/hooks/use-user';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bell, FilePlus, Home, LogOut, PanelLeft, Settings, User as UserIcon, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Logo } from '@/components/icons';
import { notifications, users } from '@/lib/data';

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Dashboard', roles: ['admin', 'manager', 'vendor'] },
  { href: '/tenders/new', icon: FilePlus, label: 'Submit Tender', roles: ['admin', 'vendor'] },
  { href: '/admin', icon: Shield, label: 'Admin', roles: ['admin'] },
  { href: '/settings', icon: Settings, label: 'Settings', roles: ['admin', 'manager', 'vendor'] },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, logout } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-dashed border-primary"></div>
      </div>
    );
  }

  const availableNavItems = navItems.filter(item => item.roles.includes(user.role));

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-card md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Logo className="h-6 w-6 text-primary" />
              <span className="font-headline text-xl">TenderFlow</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {availableNavItems.map(item => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Button size="sm" className="w-full" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold mb-4"
                >
                  <Logo className="h-8 w-8 text-primary" />
                  <span className="sr-only">TenderFlow</span>
                </Link>
                {availableNavItems.map(item => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                ))}
              </nav>
               <div className="mt-auto">
                <Button size="sm" className="w-full" onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            {/* Can add breadcrumbs or search here */}
          </div>
          <NotificationPopover />
          <UserDropdown user={user} logout={logout} />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}

function NotificationPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-headline">Notifications</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 max-h-96 overflow-y-auto">
            {notifications.slice(0, 3).map((notif) => (
              <div key={notif.id} className="grid grid-cols-[25px_1fr] items-start pb-2 last:pb-0">
                <span className={`flex h-2 w-2 translate-y-1 rounded-full ${notif.read ? 'bg-muted' : 'bg-accent'}`} />
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">{notif.title}</p>
                  <p className="text-sm text-muted-foreground">{notif.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="p-2 border-t">
            <Button variant="link" size="sm" className="w-full">View all notifications</Button>
          </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  );
}

function UserDropdown({ user, logout }: { user: any; logout: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <Image
            src={user.avatar}
            width={36}
            height={36}
            alt="User avatar"
            className="rounded-full"
            data-ai-hint="person portrait"
          />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <p className="font-medium">{user.name}</p>
          <p className="text-xs text-muted-foreground font-normal">{user.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild><Link href="/settings"><UserIcon className="mr-2 h-4 w-4" />Profile</Link></DropdownMenuItem>
        <DropdownMenuItem asChild><Link href="/settings"><Settings className="mr-2 h-4 w-4" />Settings</Link></DropdownMenuItem>
        <DropdownMenuItem asChild><Link href="/admin"><Shield className="mr-2 h-4 w-4" />Admin</Link></DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
