import Badge from '@/components/Badge';
import TransitionLink from './TransitionLink';
import { useRouteHandle } from 'miniapp-core/src';
import { useCart } from 'miniapp-core/src';
import { ShoppingCartCheck01Icon } from 'hugeicons-react';

function FloatingCartPreview() {
  const cart = useCart();
  const totalItems = cart.length;
  const [handle] = useRouteHandle();

  if (totalItems === 0 || handle?.noFloatingCart) {
    return null;
  }

  return (
    <TransitionLink
      to="/cart"
      className={`fixed right-4 ${
        handle?.noFooter ? 'bottom-6' : 'bottom-16'
      } mb-sb bg-primary border border-white rounded-lg p-3 shadow-lg`}
    >
      <Badge value={totalItems}>
        <ShoppingCartCheck01Icon className="text-white" strokeWidth={1} />
      </Badge>
    </TransitionLink>
  );
}

export default FloatingCartPreview;
