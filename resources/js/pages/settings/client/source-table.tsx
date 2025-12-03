import EditClientSourceModal from '@/components/modals/client/edit-client-source-modal';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { destroyClientSource } from '@/routes/settings';
import { ClientSourceData } from '@/types/data';
import { router } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'sonner';

interface SourceTableProps {
    source: ClientSourceData[];
    setSource: Dispatch<SetStateAction<ClientSourceData[]>>;
    loading: boolean;
}

const SourceTable = ({ source, setSource, loading }: SourceTableProps) => {
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [editOpenModal, setEditCloseModal] = useState<boolean>(false);
    const [selectedSource, setSelectedSource] = useState<ClientSourceData | null>(
        null,
    );

    const handleDelete = (id: number) => {
        if (!confirm('Are you sure you want to delete this label?')) return;

        setDeletingId(id);

        router.delete(destroyClientSource(id).url, {
            onSuccess: () => {
                toast.success('Label deleted successfully');
                setSource((prev) => prev.filter((l) => l.id !== id));
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
                    ) : source.length > 0 ? (
                        source.map((label) => {
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
                                                setSelectedSource(label);
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
                                No source found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {editOpenModal && selectedSource && (
                <EditClientSourceModal
                    open={editOpenModal}
                    setOpenChange={setEditCloseModal}
                    source={selectedSource}
                    onUpdated={(updatedSource) =>
                        setSource((prev) =>
                            prev.map((source) =>
                                source.id === updatedSource.id
                                    ? updatedSource
                                    : source,
                            ),
                        )
                    }
                />
            )}
        </section>
    );
};

export default SourceTable;
