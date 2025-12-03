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
import { storeSource, updateClientSource } from '@/routes/settings';
import { ClientSourceData } from '@/types/data';
import { Form } from '@inertiajs/react';

const EditClientSourceModal = ({
    open,
    setOpenChange,
    onUpdated,
    source
}: {
    open: boolean;
    setOpenChange: (open: boolean) => void;
    onUpdated?: (newLabel: ClientSourceData) => void;
    source: ClientSourceData;
}) => {
    return (
        <Dialog open={open} onOpenChange={setOpenChange}>
            <form>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create Client Source</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-3">
                        <Form
                            action={updateClientSource.url(source.id)}
                            method="put"
                            onSuccess={({ props }) => {
                                const updatedSource =
                                    //@ts-expect-error
                                    props.flash?.updatedData;
                                if (updatedSource) onUpdated?.(updatedSource);
                                setOpenChange(false);
                            }}
                            resetOnSuccess
                        >
                            {({ errors, processing }) => (
                                <div className="grid gap-4">
                                    <div className="grid gap-3">
                                        <Label htmlFor="name-1">Name</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            placeholder="e.g. Tiktok, Youtube"
                                            defaultValue={source.name}
                                            required
                                            autoFocus
                                            tabIndex={1}
                                        />
                                        <InputError message={errors.name} />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="name-1">
                                            Description
                                        </Label>
                                        <Textarea
                                            id="description"
                                            name="description"
                                            placeholder="Write about this source..."
                                            defaultValue={source.description}
                                            tabIndex={2}
                                        />
                                        <InputError
                                            message={errors.description}
                                        />
                                    </div>
                                    <Button
                                        className="w-full"
                                        disabled={processing}
                                        type="submit"
                                    >
                                        {processing && <Spinner />}
                                        Save changes
                                    </Button>
                                </div>
                            )}
                        </Form>
                    </div>
                </DialogContent>
            </form>
        </Dialog>
    );
};

export default EditClientSourceModal;
