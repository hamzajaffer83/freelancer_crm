import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useSidebar } from './ui/sidebar';

export default function AppLogo() {
    const { app_settings } = usePage<SharedData>().props;
    const { state } = useSidebar();

    return (
        <div className="flex w-full items-center justify-center gap-4">
            {state === 'expanded' ? (
                <img
                    src={`/storage/${app_settings.app_logo}`}
                    alt="logo"
                    className="h-[40px] w-[174px]"
                />
            ) : (
                <img
                    src={`/storage/${app_settings.favicon}`}
                    alt="logo"
                    className="h-[32px] w-[32px]"
                />
            )}

            {/* <img src={`/storage/public/${app_settings.app_logo}`} alt="logo" className='h-[40px] w-[174px]' /> */}
        </div>
    );
}
