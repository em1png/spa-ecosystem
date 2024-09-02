export interface IProductItem {
    title: string,
    body: string,
    id: number,
};

export interface IProductItemCreate {
    title: string,
    body: string,
};

export interface IProductsState {
    productsList: IProductItem[] | null,
    likedList: number[],
    loading: boolean,
};