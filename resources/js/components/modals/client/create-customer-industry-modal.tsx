import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form } from '@inertiajs/react';
const CreateCustomerIndustryModal = ({
    open,
    setOpenChange,
}: {
    open: boolean;
    setOpenChange: (open: boolean) => void;
}) => {
    return (
        <Dialog open={open} onOpenChange={setOpenChange}>
            <form>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create Customer Industry</DialogTitle>
                    </DialogHeader>
                    <Form>
                        <div className="flex flex-col gap-3">
                            <div className="grid gap-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="name-1">Name</Label>
                                    <Input
                                        id="name-1"
                                        name="name"
                                        defaultValue="Pedro Duarte"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="username-1">Username</Label>
                                    <Input
                                        id="username-1"
                                        name="username"
                                        defaultValue="@peduarte"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">Save changes</Button>
                            </DialogFooter>
                        </div>
                    </Form>
                </DialogContent>
            </form>
        </Dialog>
    );
};

export default CreateCustomerIndustryModal;
