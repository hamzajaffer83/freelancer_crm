// Updated code with URL query param syncing for `tab`
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

import AppLayout from '@/layouts/app-layout';
import AppSettingsLayout from '@/layouts/settings/app-setting';
import { type BreadcrumbItem } from '@/types';

import CreateClientIndustryModal from '@/components/modals/client/create-client-industry-modal';
import CreateClientLabelModal from '@/components/modals/client/create-client-label-modal';
import CreateClientSourceModal from '@/components/modals/client/create-client-source-modal';
import TabBar from '@/components/tab-bar';
import { Button } from '@/components/ui/button';
import settings, {
    getClientIndustryData,
    getClientLabelData,
    getClientSourceData,
} from '@/routes/settings';
import {
    ClientIndustryData,
    ClientLabelData,
    ClientSourceData,
} from '@/types/data';
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

export default function Client({ tab }: { tab: string }) {
    const { url } = usePage();

    // Sync selectedTab with URL value
    const [selectedTab, setSelectedTab] = useState<string>(tab ?? 'label');
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    const [labels, setLabels] = useState<ClientLabelData[]>([]);
    const [source, setSource] = useState<ClientSourceData[]>([]);
    const [industry, setIndustry] = useState<ClientIndustryData[]>([]);

    // Update URL on tab change
    const changeTab = (newTab: string) => {
        setSelectedTab(newTab);
        const base = url.split('?')[0];
        const newUrl = `${base}?tab=${newTab}`;
        window.history.replaceState({}, '', newUrl);
    };

    const fetchLabels = async () => {
        setLoading(true);
        const res = await fetch(getClientLabelData().url);
        const data = await res.json();
        if (data.success) setLabels(data.data);
        setLoading(false);
    };

    const fetchSource = async () => {
        setLoading(true);
        const res = await fetch(getClientSourceData().url);
        const data = await res.json();
        if (data.success) setSource(data.data);
        setLoading(false);
    };

    const fetchIndustry = async () => {
        setLoading(true);
        const res = await fetch(getClientIndustryData().url);
        const data = await res.json();
        if (data.success) setIndustry(data.data);
        setLoading(false);
    };

    useEffect(() => {
        if (selectedTab === 'label') fetchLabels();
        if (selectedTab === 'source') fetchSource();
        if (selectedTab === 'industry') fetchIndustry();
    }, [selectedTab]);

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
                            setSelectedTab={changeTab}
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
                            <LabelTable
                                labels={labels}
                                setLabels={setLabels}
                                loading={loading}
                            />
                        )}

                        {selectedTab === 'source' && (
                            <SourceTable
                                source={source}
                                setSource={setSource}
                                loading={loading}
                            />
                        )}

                        {selectedTab === 'industry' && (
                            <IndustryTable
                                industry={industry}
                                setIndustry={setIndustry}
                                loading={loading}
                            />
                        )}
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
                        onCreated={(newSource) =>
                            setSource((prev) => [...prev, newSource])
                        }
                    />
                )}

                {selectedTab === 'industry' && (
                    <CreateClientIndustryModal
                        open={open}
                        setOpenChange={handleModalClose}
                        onCreated={(newIndustry) =>
                            setIndustry((prev) => [...prev, newIndustry])
                        }
                    />
                )}
            </>
        </AppLayout>
    );
}
