import EditClientLabelModal from '@/components/modals/client/edit-client-lable-modal';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { destroyClientLabel } from '@/routes/settings';
import { ClientLabelData } from '@/types/data';
import { router } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'sonner';

interface LabelTableProps {
    labels: ClientLabelData[];
    setLabels: Dispatch<SetStateAction<ClientLabelData[]>>;
    loading: boolean;
}

const LabelTable = ({ labels, setLabels, loading }: LabelTableProps) => {
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [editOpenModal, setEditCloseModal] = useState<boolean>(false);
    const [selectedLabel, setSelectedLabel] = useState<ClientLabelData | null>(
        null,
    );

    const handleDelete = (id: number) => {
        if (!confirm('Are you sure you want to delete this label?')) return;

        setDeletingId(id);

        router.delete(destroyClientLabel(id).url, {
            onSuccess: () => {
                toast.success('Label deleted successfully');
                setLabels((prev) => prev.filter((l) => l.id !== id));
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
                            Color
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
                    ) : labels.length > 0 ? (
                        labels.map((label) => {
                            const isDeleting = deletingId === label.id;

                            return (
                                <tr key={label.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium">
                                        {label.name}
                                    </td>

                                    <td className="px-6 py-4">
                                        <span
                                            className="inline-block h-6 w-6 rounded-full border"
                                            style={{
                                                backgroundColor:
                                                    label.tag_color,
                                            }}
                                        />
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
                                                setSelectedLabel(label);
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
                                No labels found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {editOpenModal && selectedLabel && (
                <EditClientLabelModal
                    open={editOpenModal}
                    setOpenChange={setEditCloseModal}
                    selectedLabel={selectedLabel}
                    onUpdated={(updatedLabel) =>
                        setLabels((prev) =>
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

export default LabelTable;
