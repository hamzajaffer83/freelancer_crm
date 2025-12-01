import { Form, Head } from '@inertiajs/react';
import { useState } from 'react';

import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import AppLayout from '@/layouts/app-layout';
import AppSettingsLayout from '@/layouts/settings/app-setting';
import { CheckCircle, UploadIcon } from 'lucide-react';

import { app, appSettingForm } from '@/routes/settings';
import { AppSettingData } from '@/types/data';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'App settings',
        href: app().url,
    },
];

export default function AppSettings({
    appSetting,
}: {
    appSetting: AppSettingData[];
}) {
    // --------------------------
    // GET EXISTING VALUES
    // --------------------------
    const storedLogo =
        appSetting.find((item) => item.key === 'app_logo')?.value ?? null;

    const storedFavicon =
        appSetting.find((item) => item.key === 'favicon')?.value ?? null;

    const storedTitle =
        appSetting.find((item) => item.key === 'app_title')?.value ??
        'Degvora Freelancer CRM';

    // --------------------------
    // PREVIEW STATES
    // --------------------------
    const [logoPreview, setLogoPreview] = useState<string | null>(
        storedLogo ? `/storage/${storedLogo}` : null,
    );

    const [faviconPreview, setFaviconPreview] = useState<string | null>(
        storedFavicon ? `/storage/${storedFavicon}` : null,
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="App settings" />

            <AppSettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="App settings"
                        description="Update site general settings"
                    />

                    <Form
                        method="post"
                        action={appSettingForm().url}
                        resetOnSuccess
                        // enctype="multipart/form-data"
                        className="flex flex-col gap-6"
                    >
                        {({ processing, errors }) => (
                            <div className="space-y-6">
                                {/* APP LOGO */}
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <label className="text-sm text-muted-foreground">
                                        App Logo (174 × 40)
                                    </label>

                                    <div className="col-span-2">
                                        <div className="flex items-center gap-3">
                                            <div className="h-[40px] w-[174px] border flex items-center justify-center bg-white">
                                                {logoPreview ? (
                                                    <img
                                                        src={logoPreview}
                                                        className="h-full w-full object-contain"
                                                        alt="Logo Preview"
                                                    />
                                                ) : (
                                                    <span className="text-xs text-gray-400">
                                                        No image
                                                    </span>
                                                )}
                                            </div>

                                            {/* Hidden input */}
                                            <input
                                                type="file"
                                                name="app_logo"
                                                hidden
                                                id="logoInput"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file =
                                                        e.target.files?.[0];
                                                    if (file) {
                                                        setLogoPreview(
                                                            URL.createObjectURL(
                                                                file,
                                                            ),
                                                        );
                                                    }
                                                }}
                                            />

                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() =>
                                                    document
                                                        .getElementById(
                                                            'logoInput',
                                                        )
                                                        ?.click()
                                                }
                                            >
                                                <UploadIcon className="mr-2 h-4 w-4" />
                                                Upload
                                            </Button>
                                        </div>

                                        <InputError message={errors.app_logo} />
                                    </div>
                                </div>

                                {/* FAVICON */}
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <label className="text-sm text-muted-foreground">
                                        Favicon (32 × 32)
                                    </label>

                                    <div className="col-span-2">
                                        <div className="flex items-center gap-3">
                                            <div className="h-[32px] w-[32px] border flex items-center justify-center bg-white">
                                                {faviconPreview ? (
                                                    <img
                                                        src={faviconPreview}
                                                        className="h-full w-full object-contain"
                                                        alt="Favicon Preview"
                                                    />
                                                ) : (
                                                    <span className="text-xs text-gray-400">
                                                        No image
                                                    </span>
                                                )}
                                            </div>

                                            {/* Hidden input */}
                                            <input
                                                type="file"
                                                name="favicon"
                                                hidden
                                                id="faviconInput"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file =
                                                        e.target.files?.[0];
                                                    if (file) {
                                                        setFaviconPreview(
                                                            URL.createObjectURL(
                                                                file,
                                                            ),
                                                        );
                                                    }
                                                }}
                                            />

                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() =>
                                                    document
                                                        .getElementById(
                                                            'faviconInput',
                                                        )
                                                        ?.click()
                                                }
                                            >
                                                <UploadIcon className="mr-2 h-4 w-4" />
                                                Upload
                                            </Button>
                                        </div>

                                        <InputError message={errors.favicon} />
                                    </div>
                                </div>

                                {/* APP TITLE */}
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <label className="text-sm text-muted-foreground">
                                        App Title
                                    </label>

                                    <div className="col-span-2">
                                        <Input
                                            name="app_title"
                                            defaultValue={storedTitle}
                                        />
                                        <InputError
                                            message={errors.app_title}
                                        />
                                    </div>
                                </div>

                                {/* SUBMIT */}
                                <Button
                                    type="submit"
                                    className="mt-2"
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <Spinner />
                                    ) : (
                                        <CheckCircle className="h-4 w-4" />
                                    )}
                                    Save
                                </Button>
                            </div>
                        )}
                    </Form>
                </div>
            </AppSettingsLayout>
        </AppLayout>
    );
}
