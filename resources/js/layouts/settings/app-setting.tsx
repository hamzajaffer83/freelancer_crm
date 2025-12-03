import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { cn, isSameUrl, resolveUrl } from '@/lib/utils';
import { app, client } from '@/routes/settings';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren, useMemo, useState } from 'react';

const sidebarNavItems: NavItem[] = [
    {
        title: 'App Settings',
        href: app(),
        icon: null,
    },
    {
        title: 'Client',
        href: client(),
        icon: null,
    },
];

export default function AppSettingsLayout({ children }: PropsWithChildren) {
    if (typeof window === 'undefined') {
        return null;
    }

    const currentPath = window.location.pathname;

    const [query, setQuery] = useState('');

    // Filter items based on search query
    const filteredItems = useMemo(() => {
        if (!query.trim()) return sidebarNavItems;

        return sidebarNavItems.filter((item) =>
            item.title.toLowerCase().includes(query.toLowerCase()),
        );
    }, [query]);

    return (
        <div className="px-4 py-6">
            <div className="flex flex-col lg:flex-row lg:space-x-12">
                <aside className="w-full max-w-xl lg:w-48">
                    <nav className="flex flex-col space-y-1 space-x-0">
                        <Input
                            placeholder="Search settings..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="mb-2"
                        />

                        {filteredItems.length === 0 && (
                            <p className="px-2 py-1 text-sm text-muted-foreground">
                                No results found.
                            </p>
                        )}

                        {filteredItems.map((item, index) => (
                            <Button
                                key={`${resolveUrl(item.href)}-${index}`}
                                size="sm"
                                variant="ghost"
                                asChild
                                className={cn('w-full justify-start', {
                                    'bg-muted': isSameUrl(
                                        currentPath,
                                        item.href,
                                    ),
                                })}
                            >
                                <Link href={item.href}>
                                    {item.icon && (
                                        <item.icon className="mr-2 h-4 w-4" />
                                    )}
                                    {item.title}
                                </Link>
                            </Button>
                        ))}
                    </nav>
                </aside>

                <Separator className="my-6 lg:hidden" />

                <div className="w-full flex-1">
                    <section className="space-y-12">{children}</section>
                </div>
            </div>
        </div>
    );
}
