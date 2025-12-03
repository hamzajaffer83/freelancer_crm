import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { destroyClientLabel } from '@/routes/settings';
import { ClientLabelData } from '@/types/data';
import { router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'sonner';

const LabelTable = ({
    labels,
    setLabels,
}: {
    labels: ClientLabelData[];
    setLabels: Dispatch<SetStateAction<ClientLabelData[]>>;
}) => {
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this label?')) return;

        setDeletingId(id);

        await router.delete(destroyClientLabel(id).url, {
            onSuccess: () => {
                toast.success('Label deleted successfully');
                setLabels((prev) => prev.filter((l) => l.id !== id));
            },
            onError: () => {
                toast.error('Failed to delete label');
            },
            onFinish: () => {
                setDeletingId(null);
            },
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
                    {labels.length > 0 ? (
                        labels.map((label) => (
                            <tr key={label.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium">
                                    {label.name}
                                </td>

                                <td className="px-6 py-4">
                                    <span
                                        className="inline-block h-6 w-6 rounded-full border"
                                        style={{
                                            backgroundColor: label.tag_color,
                                        }}
                                    ></span>
                                </td>

                                <td className="px-6 py-4">
                                    <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold text-green-800">
                                        Active
                                    </span>
                                </td>

                                <td className="px-6 py-4 text-right">
                                    <Button
                                        variant="destructive"
                                        className="text-white"
                                        disabled={deletingId === label.id}
                                        onClick={() => handleDelete(label.id)}
                                    >
                                        {deletingId === label.id ? (
                                            <Spinner className="h-4 w-4" />
                                        ) : (
                                            <Trash2 />
                                        )}
                                    </Button>
                                </td>
                            </tr>
                        ))
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
        </section>
    );
};

export default LabelTable;
