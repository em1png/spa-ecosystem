import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "@/axios";
import { IProductItem, IProductItemCreate, IProductsState } from "@/types/types";
import { AxiosError } from "axios";

export const fetchProducts = createAsyncThunk<IProductItem[], void, { rejectValue: string }>
    ('products/fetchProducts', async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<IProductItem[]>('/posts');
            return response.data;
        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(err.message);
        }
    });

const productsSlice = createSlice({
    name: "products",
    initialState: {
        productsList: null,
        likedList: [],
        loading: true,
    } as IProductsState,
    reducers: {
        addLikedProduct: (store, action: PayloadAction<number>) => {
            store.likedList.push(action.payload);
            return store;
        },
        deleteLikedProduct: (store, action: PayloadAction<number>) => {
            const index = store.likedList.indexOf(action.payload);
            store.likedList.splice(index, 1);
            return store;
        },
        deleteProduct: (store, action: PayloadAction<number>) => {
            const item = store.productsList?.find((product: IProductItem) => product.id === action.payload);

            if (item) {
                const index = store.productsList?.indexOf(item);
                if (index !== undefined && index > -1) {
                    store.productsList?.splice(index, 1);
                    return store;
                };
            };
        },
        addProduct: (store, action: PayloadAction<IProductItemCreate>) => {
            if (store.productsList && store.productsList.length > 0) {
                const lastId = store.productsList?.length - 1;
                store.productsList?.push({
                    ...action.payload,
                    id: store.productsList[lastId].id + 1
                });
                return store;
            }
        },
        editProduct: (store, action: PayloadAction<IProductItem>) => {
            if (store.productsList && store.productsList.length > 0) {
                const item = store.productsList?.find((item: IProductItem) => item.id == action.payload.id);
                if (item) {
                    const index = store.productsList?.indexOf(item);
                    store.productsList[index] = action.payload;
                    return store;
                }
            };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.productsList = action.payload;
                state.loading = false;
            })
    },
});

export default productsSlice.reducer;
export const { addLikedProduct, deleteLikedProduct, deleteProduct, addProduct, editProduct } = productsSlice.actions