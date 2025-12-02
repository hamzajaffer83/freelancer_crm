import { Head } from '@inertiajs/react';
import { useState } from 'react';

import AppLayout from '@/layouts/app-layout';
import AppSettingsLayout from '@/layouts/settings/app-setting';
import { type BreadcrumbItem } from '@/types';

import CreateCustomerIndustryModal from '@/components/modals/customer/create-customer-industry-modal';
import CreateCustomerLabelModal from '@/components/modals/customer/create-customer-label-modal';
import CreateCustomerSourceModal from '@/components/modals/customer/create-customer-source-modal';
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
        href: settings.customer().url,
    },
];

export default function AppSettings() {
    const [open, setOpen] = useState<boolean>(false);
    const tabs = [
        { title: 'Labels', source: 'label' },
        { title: 'Source', source: 'source' },
        { title: 'Industry', source: 'industry' },
    ];
    const [selectedTab, setSelectedTab] = useState<string>('label');

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
                        {selectedTab === 'label' && <LabelTable />}
                        {selectedTab === 'source' && <SourceTable />}
                        {selectedTab === 'industry' && <IndustryTable />}
                    </section>
                </div>
            </AppSettingsLayout>
            <>
                {selectedTab === 'label' && (
                    <CreateCustomerLabelModal
                        open={open}
                        setOpenChange={() => setOpen(false)}
                    />
                )}
                {selectedTab === 'source' && (
                    <CreateCustomerSourceModal
                        open={open}
                        setOpenChange={() => setOpen(false)}
                    />
                )}
                {selectedTab === 'industry' && (
                    <CreateCustomerIndustryModal
                        open={open}
                        setOpenChange={() => setOpen(false)}
                    />
                )}
            </>
        </AppLayout>
    );
}
