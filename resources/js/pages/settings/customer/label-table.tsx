import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { destroyCustomerLabel, getCustomerLabelData } from '@/routes/settings';
import { CustomerLabelData } from '@/types/data';
import { router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const LabelTable = () => {
    const [labels, setLabels] = useState<CustomerLabelData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    // Function to fetch labels
    const fetchLabels = async () => {
        setLoading(true);
        try {
            const response = await fetch(getCustomerLabelData().url);
            const data = await response.json();
            if (data.success) {
                setLabels(data.data);
            } else {
                toast.error(data.message);
            }
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLabels();
    }, []);

    // Delete handler
    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this label?')) return;

        try {
            router.delete(destroyCustomerLabel(id).url);
            toast.success('Label deleted successfully');
            // Update state to remove deleted label
            setLabels((prev) => prev.filter((label) => label.id !== id));
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <section className="overflow-x-auto">
            {loading ? (
                <div className="mt-20 flex items-center justify-center">
                    <Spinner className="h-10 w-10" />
                </div>
            ) : (
                <table className="min-w-full divide-y divide-gray-200 rounded-lg border shadow-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                Label
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                Color
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                Active
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {labels.map((label) => (
                            <tr key={label.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                                    {label.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className="inline-block h-6 w-6 rounded-full border"
                                        style={{
                                            backgroundColor: label.tag_color,
                                        }}
                                    ></span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="inline-flex rounded-full bg-green-100 px-2 text-xs leading-5 font-semibold text-green-800">
                                        Active
                                    </span>
                                </td>
                                <td className="flex justify-end gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap">
                                    <Button
                                        variant="destructive"
                                        className="text-white"
                                        onClick={() => handleDelete(label.id)}
                                    >
                                        <Trash2 />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </section>
    );
};

export default LabelTable;
