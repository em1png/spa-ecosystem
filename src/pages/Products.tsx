import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { HeartIcon, HeartFilledIcon, TrashIcon, FileTextIcon } from '@radix-ui/react-icons'
import { Button } from "@/components/ui/button"
import { addLikedProduct, deleteLikedProduct, deleteProduct } from "@/store/slices/productsSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Input } from "@/components/ui/input"
import ProductEditForm from "@/components/shared/ProductEditForm";


const Products: FC = () => {
    // Consts
    const itemsPerPage = 12;

    // HOoks
    const [isLikedFilter, setIsLikedFilter] = useState<boolean>(false);
    const [searchField, setSearchField] = useState<string>('');

    const liked = useAppSelector((store) => store.products.likedList);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // Get params from URL
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const pageNumber = Number(queryParams.get('page'));
    console.log(pageNumber)
    useEffect(() => {
        if (!pageNumber) navigate(`/products?page=1`)
    }, []);

    // Handler
    const onChangeInput = (e) => {
        if (pageNumber !== 1) {
            navigate(`/products?page=1`)
        }
        setSearchField(e.target.value.toLocaleLowerCase());
    }

// Get products list, then filter
const products = useAppSelector((store) => store.products.productsList);
const filteredProducts = isLikedFilter
    ? products?.filter((product) => liked.includes(product.id))
    : products;

return (
    <div className="container">
        <h1 className="mb-10 pt-10 text-center font-bold text-3xl">PRODUCTS LIST - {products?.length || 0}</h1>
        <div className="flex gap-3">
            {isLikedFilter
                ? <Button variant={"outline"} onClick={() => setIsLikedFilter(prev => !prev)}>
                    <HeartFilledIcon />
                </Button>
                : <Button variant={"outline"} onClick={() => setIsLikedFilter(prev => !prev)}>
                    <HeartIcon />
                </Button>
            }
            <Button className="mb-5" variant={"outline"} onClick={() => navigate(`/create-product`)}>
                <FileTextIcon />
            </Button>
            <Input className="mb-5" value={searchField} onChange={onChangeInput} placeholder="Search.." />
        </div>

        {products && (
            <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                {filteredProducts?.filter(item => item.title.toLowerCase().includes(searchField)).slice((pageNumber - 1) * itemsPerPage, pageNumber ? pageNumber * itemsPerPage : itemsPerPage).map((item) => (
                    <div key={item.id} className="flex flex-col justify-between p-3 min-h-[150px] border border-white/10 rounded-xl cursor-pointer">
                        <div className="flex-center flex-col h-[100%] mb-5 xs:mb-0" onClick={() => navigate(`/products/${item.id}`)}>
                            <p className="font-bold overflow-hidden whitespace-nowrap text-ellipsis w-[90%]">{item.id}. {item.title}</p>
                            <p className="text-xs text-white/50 overflow-hidden whitespace-nowrap text-ellipsis w-[90%]">{item.body}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 justify-around">
                            {liked.includes(item.id)
                                ? <Button onClick={() => dispatch(deleteLikedProduct(item.id))} variant="outline" className="w-[100%]"><HeartFilledIcon /></Button>
                                : <Button onClick={() => dispatch(addLikedProduct(item.id))} variant="outline" className="w-[100%]"><HeartIcon /></Button>
                            }
                            <Button onClick={() => dispatch(deleteProduct(item.id))} variant="outline" className="w-[100%]"><TrashIcon /></Button>
                            <ProductEditForm product={item} styles="w-[100%]" />
                        </div>
                    </div>)
                )}
            </div>)
        }
        <Pagination className="mb-10 cursor-pointer">
            <PaginationContent >
                <PaginationItem hidden={pageNumber <= 1 && true}>
                    <PaginationPrevious onClick={() => navigate(`/products?page=${pageNumber - 1}`)} />
                </PaginationItem>
                <PaginationItem hidden={filteredProducts && filteredProducts?.length / itemsPerPage < pageNumber ? true : false}>
                    <PaginationNext onClick={() => navigate(`/products?page=${pageNumber + 1}`)} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    </div>
)
};

export default Products;