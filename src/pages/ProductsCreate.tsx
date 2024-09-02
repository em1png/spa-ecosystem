import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAppDispatch } from "@/store";
import { useNavigate } from "react-router-dom";
import { addProduct } from "@/store/slices/productsSlice";

const ProductCreate: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const formSchema = z.object({
        title: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
        body: z.string().min(5, {
            message: "Username must be at least 5 characters.",
        }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            body: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        dispatch(addProduct(values));
        navigate(`/products?page=1`)
    };

    return (
        <div className="container pt-10 mb-10">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Hello world!" {...field} />
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
                                    <Input placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit." {...field} />
                                </FormControl>
                                <FormDescription>
                                    The main content area where detailed information, explanations, or text related to the title is provided.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex gap-3">
                        <Button variant={"outline"} type="submit">Create</Button>
                        <Button variant={"destructive"} onClick={() => navigate('/products?page=1')}> Home </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default ProductCreate;