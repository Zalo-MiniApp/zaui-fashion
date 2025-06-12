import Section from '@/components/Section';
import ProductItem2 from '@/components/ProductItem2';
import { useHomeProducts } from 'miniapp-core/src';

export function RecommendedProducts() {
  const recommendedProducts = useHomeProducts();

  return (
    <Section title="Gợi ý sản phẩm">
      <div className="py-2 px-4 pb-6 flex space-x-2 overflow-x-aut no-scrollbar">
        {recommendedProducts.map((product) => (
          <div
            key={product.id}
            className="flex-none"
            style={{ flexBasis: 'calc((100vw - 48px) / 2)' }}
          >
            <ProductItem2 product={product} />
          </div>
        ))}
      </div>
    </Section>
  );
}
