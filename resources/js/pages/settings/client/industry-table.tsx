import EditClientIndustryModal from '@/components/modals/client/edit-client-industry-modal';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { destroyClientIndustry, destroyClientLabel } from '@/routes/settings';
import { ClientIndustryData } from '@/types/data';
import { router } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'sonner';

interface IndustryTableProps {
    industry: ClientIndustryData[];
    setIndustry: Dispatch<SetStateAction<ClientIndustryData[]>>;
    loading: boolean;
}

const industryTable = ({
    industry,
    setIndustry,
    loading,
}: IndustryTableProps) => {
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [editOpenModal, setEditCloseModal] = useState<boolean>(false);
    const [selectedIndustry, setSelectedIndustry] =
        useState<ClientIndustryData | null>(null);

    const handleDelete = (id: number) => {
        if (!confirm('Are you sure you want to delete this label?')) return;

        setDeletingId(id);

        router.delete(destroyClientIndustry(id).url, {
            onSuccess: () => {
                toast.success('Label deleted successfully');
                setIndustry((prev) => prev.filter((l) => l.id !== id));
            },
            onError: () => {
                toast.error('Failed to delete label');
            },
            onFinish: () => setDeletingId(null),
        });
    };

    return (
        <section className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 rounded-lg border shadow-sm">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Label
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Active
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 bg-white">
                    {loading ? (
                        <tr>
                            <td
                                colSpan={4}
                                className="w-full justify-center py-4 text-center text-gray-500"
                            >
                                <Spinner className="mx-auto h-8 w-8" />
                            </td>
                        </tr>
                    ) : industry.length > 0 ? (
                        industry.map((label) => {
                            const isDeleting = deletingId === label.id;

                            return (
                                <tr key={label.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium">
                                        {label.name}
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold text-green-800">
                                            Active
                                        </span>
                                    </td>

                                    <td className="justify-end gap-2 p-2 text-right">
                                        <Button
                                            // variant="destructive"
                                            className="text-white"
                                            disabled={isDeleting}
                                            onClick={() => {
                                                setSelectedIndustry(label);
                                                setEditCloseModal(true);
                                            }}
                                        >
                                            {isDeleting ? (
                                                <Spinner className="h-4 w-4" />
                                            ) : (
                                                <Pencil className="h-4 w-4" />
                                            )}
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            className="ml-2 text-white"
                                            disabled={isDeleting}
                                            onClick={() =>
                                                handleDelete(label.id)
                                            }
                                        >
                                            {isDeleting ? (
                                                <Spinner className="h-4 w-4" />
                                            ) : (
                                                <Trash2 className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td
                                colSpan={4}
                                className="py-4 text-center text-gray-500"
                            >
                                No industry found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {editOpenModal && selectedIndustry && (
                <EditClientIndustryModal
                    open={editOpenModal}
                    setOpenChange={setEditCloseModal}
                    industry={selectedIndustry}
                    onUpdated={(updatedLabel) =>
                        setIndustry((prev) =>
                            prev.map((label) =>
                                label.id === updatedLabel.id
                                    ? updatedLabel
                                    : label,
                            ),
                        )
                    }
                />
            )}
        </section>
    );
};

export default industryTable;
