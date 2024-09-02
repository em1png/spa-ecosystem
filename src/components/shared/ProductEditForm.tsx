import { useAppDispatch } from "@/store";
import { editProduct } from "@/store/slices/productsSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { Pencil1Icon } from '@radix-ui/react-icons'

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormDescription, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { IProductItem } from "@/types/types";

const ProductEditForm: FC<{ product: IProductItem, styles: string }> = ({ product, styles }) => {
    // States
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Hooks
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // Valid
    const formSchema = z.object({
        title: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
        body: z.string().min(5, {
            message: "Username must be at least 5 characters.",
        }),
    })

    // Form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: product.title,
            body: product.body,
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        dispatch(editProduct({ ...product, ...values }));
        setIsModalOpen(false);
    };

    return (
        <Dialog onOpenChange={setIsModalOpen} open={isModalOpen}>
            <DialogTrigger className='w-full'>
                <Button variant={'outline'} className={`${styles}`}>
                    <Pencil1Icon />
                </Button>

            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mb-2 text-2xl">Edit product</DialogTitle>
                    <div className="container mb-10">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                A brief and descriptive label for the content, summarizing the main topic or purpose.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="body"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Body</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Some body" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                The main content area where detailed information, explanations, or text related to the title is provided.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex gap-3">
                                    <Button variant={"outline"} type="submit">Edit</Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default ProductEditForm;