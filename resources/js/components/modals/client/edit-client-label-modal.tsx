import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { updateClientLabel } from '@/routes/settings';
import { ClientLabelData } from '@/types/data';
import { Form } from '@inertiajs/react';
import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

const EditClientLabelModal = ({
    open,
    setOpenChange,
    selectedLabel,
    onUpdated,
}: {
    open: boolean;
    setOpenChange: (open: boolean) => void;
    selectedLabel: ClientLabelData;
    onUpdated?: (newLabel: ClientLabelData) => void;
}) => {
    const [color, setColor] = useState<string>(selectedLabel.tag_color);
    return (
        <Dialog open={open} onOpenChange={setOpenChange}>
            <DialogContent className="flex max-h-[90vh] flex-col p-0 sm:max-w-[450px]">
                {/* Header */}
                <div className="border-b p-6">
                    <DialogHeader>
                        <DialogTitle>Create Client Label</DialogTitle>
                    </DialogHeader>
                </div>

                {/* Scrollable Content */}
                <Form
                    action={updateClientLabel.url(selectedLabel.id)}
                    method="put"
                    onSuccess={({ props }) => {
                        // @ts-expect-error
                        const updatedLabel = props.flash?.updatedData as ClientLabelData;
                        if (updatedLabel) onUpdated?.(updatedLabel);
                        setOpenChange(false);
                    }}
                    resetOnSuccess
                    className="thin-scrollbar flex-1 space-y-4 overflow-y-auto p-6"
                >
                    {({ errors, processing }) => (
                        <>
                            <div className="grid gap-4">
                                {/* Name */}
                                <div className="grid gap-2">
                                    <Label htmlFor="label-name">Name</Label>
                                    <Input
                                        id="label-name"
                                        name="name"
                                        placeholder="Enter label name"
                                        // required
                                        autoFocus
                                        tabIndex={1}
                                        defaultValue={selectedLabel.name}
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                {/* Description */}
                                <div className="grid gap-2">
                                    <Label htmlFor="label-description">
                                        Description
                                    </Label>
                                    <Textarea
                                        id="label-description"
                                        name="description"
                                        placeholder="Write about this label..."
                                        tabIndex={2}
                                        defaultValue={selectedLabel.description}
                                    />
                                    <InputError message={errors.description} />
                                </div>

                                {/* Tag Color */}
                                <div className="grid gap-3">
                                    <Label htmlFor="label-color">
                                        Tag Color
                                    </Label>

                                    {/* Preview + Input Row */}
                                    <div className="flex items-center gap-3">
                                        {/* Color Preview */}
                                        <div
                                            className="h-10 w-10 rounded-xl border shadow-sm"
                                            style={{ backgroundColor: color }}
                                        />

                                        {/* Hex Input */}
                                        <Input
                                            id="label-color"
                                            name="color"
                                            value={color}
                                            onChange={(e) =>
                                                setColor(e.target.value)
                                            }
                                            className="flex-1"
                                            placeholder="#ff6b6b"
                                            defaultValue={
                                                selectedLabel.tag_color
                                            }
                                        />
                                    </div>

                                    {/* Color Picker */}
                                    <HexColorPicker
                                        color={color}
                                        onChange={setColor}
                                        className="!w-full rounded-xl border p-2 shadow-sm"
                                    />
                                    <InputError message={errors.color} />
                                </div>
                            </div>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={processing}
                            >
                                {processing && <Spinner />}
                                Save changes
                            </Button>
                        </>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default EditClientLabelModal;
