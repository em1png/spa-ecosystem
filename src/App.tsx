import { Route, Routes } from 'react-router-dom'
import Products from './pages/Products'
import Home from './pages/Home'
import { useAppDispatch } from './store';
import { fetchProducts } from './store/slices/productsSlice';
import { useEffect } from 'react';
import ProductItem from './pages/ProductsItem';
import ProductCreate from './pages/ProductsCreate';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getData = async () => {
      await dispatch(fetchProducts());
    };

    getData();
  }, []);


  return (
    <main>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:id' element={<ProductItem />} />
        <Route path='/create-product' element={<ProductCreate />} />
      </Routes>
    </main>
  )
}

export default App
