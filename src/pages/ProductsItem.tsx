import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store";
import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductItem: FC = () => {
    // HOoks
    const id = Number(useParams().id);
    const navigate = useNavigate();

    const products = useAppSelector((store) => store.products.productsList);
    const item = products && products.find(item => item.id == id);

    return (
        <div className="container">
            {item ? (
                <div className="flex-center flex-col justify-between min-h-[100vh]">
                    <div className="">
                        <h1 className="text-center text-5xl font-bold mb-10 pt-10">{item.id}. {item.title}</h1>
                        <p className="mb-10  text-center w-full m-auto">{item.body}</p>
                    </div>

                    <div className="fixed bottom-0 flex gap-3 p-3 items-end">
                        <Button variant={"secondary"} onClick={() => navigate(`/products/${id - 1}`)}>Prev</Button>
                        <Button variant={"outline"} onClick={() => navigate('/products?page=1')}>Home</Button>
                        <Button variant={"secondary"} onClick={() => navigate(`/products/${id + 1}`)}>Next</Button>
                    </div>
                </div>
            ) : (
                <div className="flex-center flex-col h-[100vh] gap-10">
                    <h1 className="flex-center font-bold text-5xl overflow-hidden">PRODUCT NOT FOUND</h1>
                    <Button variant={"destructive"} onClick={() => navigate('/products?page=1')}>Home</Button>
                </div>
            )

            }

        </div>
    )
};

export default ProductItem;