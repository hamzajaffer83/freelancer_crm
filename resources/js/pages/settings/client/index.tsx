import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';

import AppLayout from '@/layouts/app-layout';
import AppSettingsLayout from '@/layouts/settings/app-setting';
import { type BreadcrumbItem } from '@/types';

import CreateClientIndustryModal from '@/components/modals/client/create-client-industry-modal';
import CreateClientLabelModal from '@/components/modals/client/create-client-label-modal';
import CreateClientSourceModal from '@/components/modals/client/create-client-source-modal';
import TabBar from '@/components/tab-bar';
import { Button } from '@/components/ui/button';
import settings, { getClientLabelData } from '@/routes/settings';
import { ClientLabelData } from '@/types/data';
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

export default function Client() {
    const [open, setOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState('label');

    const [labels, setLabels] = useState<ClientLabelData[]>([]);

    const fetchLabels = async () => {
        const res = await fetch(getClientLabelData().url);
        const data = await res.json();
        if (data.success) setLabels(data.data);
    };

    useEffect(() => {
        fetchLabels();
    }, []);

    const handleModalClose = () => setOpen(false);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Client settings" />

            <AppSettingsLayout>
                <div>
                    <div className="flex w-full justify-between border-b">
                        <TabBar
                            tabs={[
                                { title: 'Labels', source: 'label' },
                                { title: 'Source', source: 'source' },
                                { title: 'Industry', source: 'industry' },
                            ]}
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
                            <LabelTable labels={labels} setLabels={setLabels} />
                        )}

                        {selectedTab === 'source' && <SourceTable />}

                        {selectedTab === 'industry' && <IndustryTable />}
                    </section>
                </div>
            </AppSettingsLayout>

            {/* MODALS */}
            <>
                {selectedTab === 'label' && (
                    <CreateClientLabelModal
                        open={open}
                        setOpenChange={handleModalClose}
                        onCreated={(newLabel) =>
                            setLabels((prev) => [...prev, newLabel])
                        }
                    />
                )}

                {selectedTab === 'source' && (
                    <CreateClientSourceModal
                        open={open}
                        setOpenChange={handleModalClose}
                    />
                )}

                {selectedTab === 'industry' && (
                    <CreateClientIndustryModal
                        open={open}
                        setOpenChange={handleModalClose}
                    />
                )}
            </>
        </AppLayout>
    );
}
