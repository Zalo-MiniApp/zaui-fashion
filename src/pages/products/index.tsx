import { ProductsCategory, ProductList } from '@/pages/products/components';

const ProductsPage: React.FunctionComponent = () => {
  return (
    <div className="min-h-full bg-white">
      <ProductsCategory />
      <ProductList />
    </div>
  );
};

export default ProductsPage;
