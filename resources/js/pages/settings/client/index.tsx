import { Head } from '@inertiajs/react';
import { useState } from 'react';

import AppLayout from '@/layouts/app-layout';
import AppSettingsLayout from '@/layouts/settings/app-setting';
import { type BreadcrumbItem } from '@/types';

import CreateCustomerIndustryModal from '@/components/modals/client/create-customer-industry-modal';
import CreateCustomerLabelModal from '@/components/modals/client/create-customer-label-modal';
import CreateCustomerSourceModal from '@/components/modals/client/create-customer-source-modal';
import TabBar from '@/components/tab-bar';
import { Button } from '@/components/ui/button';
import settings from '@/routes/settings';
import { PlusCircle } from 'lucide-react';
import IndustryTable from './industry-table';
import LabelTable from './label-table';
import SourceTable from './source-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'App settings',
        href: settings.client().url,
    },
];

export default function AppSettings() {
    const [open, setOpen] = useState<boolean>(false);
    const [refreshKey, setRefreshKey] = useState<number>(0);
    const tabs = [
        { title: 'Labels', source: 'label' },
        { title: 'Source', source: 'source' },
        { title: 'Industry', source: 'industry' },
    ];
    const [selectedTab, setSelectedTab] = useState<string>('label');

    const handleModalClose = () => {
        setOpen(false);
        setRefreshKey((prev) => prev + 1);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customer settings" />

            <AppSettingsLayout>
                <div>
                    <div className="flex w-full justify-between border-b">
                        <TabBar
                            tabs={tabs}
                            selectedTab={selectedTab}
                            setSelectedTab={setSelectedTab}
                        />
                        <Button
                            variant="outline"
                            className="mb-2 cursor-pointer"
                            onClick={() => setOpen(true)}
                        >
                            <PlusCircle />
                            Create
                        </Button>
                    </div>
                    <section className="mt-6">
                        {selectedTab === 'label' && (
                            <LabelTable key={refreshKey} />
                        )}
                        {selectedTab === 'source' && (
                            <SourceTable key={refreshKey} />
                        )}
                        {selectedTab === 'industry' && (
                            <IndustryTable key={refreshKey} />
                        )}
                    </section>
                </div>
            </AppSettingsLayout>

            {/* Modals */}
            <>
                {selectedTab === 'label' && (
                    <CreateCustomerLabelModal
                        open={open}
                        setOpenChange={handleModalClose}
                    />
                )}
                {selectedTab === 'source' && (
                    <CreateCustomerSourceModal
                        open={open}
                        setOpenChange={handleModalClose}
                    />
                )}
                {selectedTab === 'industry' && (
                    <CreateCustomerIndustryModal
                        open={open}
                        setOpenChange={handleModalClose}
                    />
                )}
            </>
        </AppLayout>
    );
}
