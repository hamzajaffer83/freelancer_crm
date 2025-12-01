import { SharedData } from '@/types';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

export default function MetaHead() {
    const { app_settings } = usePage<SharedData>().props;

    return (
        <Head>
            <title>{app_settings.app_title ?? 'Laravel'}</title>
            <link
                rel="icon"
                href={app_settings.favicon ? `/storage/${app_settings.favicon}` : '/favicon.ico'}
                sizes="any"
            />
            <link
                rel="apple-touch-icon"
                href={app_settings.app_logo ? `/storage/${app_settings.app_logo}` : '/apple-touch-icon.png'}
            />
        </Head>
    );
}
