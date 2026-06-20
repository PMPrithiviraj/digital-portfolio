import { useReducer, useState } from 'react'
import { cartCount, cartReducer, cartTotal, type CartState, type Product } from '../../lib/cart'
import { products } from './products'

export default function ShopDemo() {
  const [cart, dispatch] = useReducer(cartReducer, { lines: [] })
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <div className="relative min-h-130 bg-bg-base p-6 text-ink-primary">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex items-center justify-between">
          <h3 className="font-display text-2xl">Shop</h3>
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative rounded-control border border-ink-muted/30 px-4 py-2 text-sm font-medium hover:border-accent"
          >
            Cart
            {cartCount(cart) > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-bg-base">
                {cartCount(cart)}
              </span>
            )}
          </button>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={() => dispatch({ type: 'add', product })}
            />
          ))}
        </div>
      </div>

      {cartOpen && (
        <CartDrawer
          cart={cart}
          onClose={() => setCartOpen(false)}
          onSetQuantity={(productId, quantity) => dispatch({ type: 'setQuantity', productId, quantity })}
          onRemove={(productId) => dispatch({ type: 'remove', productId })}
        />
      )}
    </div>
  )
}

function ProductCard({ product, onAdd }: { product: Product; onAdd: () => void }) {
  return (
    <div className="rounded-card bg-bg-card p-4">
      <img
        src={product.image}
        alt={product.name}
        width={400}
        height={300}
        loading="lazy"
        decoding="async"
        className="mb-3 h-40 w-full rounded-control object-cover"
      />
      <h3 className="font-medium">{product.name}</h3>
      <p className="mb-3 text-ink-secondary">${product.price.toFixed(2)}</p>
      <button
        type="button"
        onClick={onAdd}
        className="w-full rounded-control bg-accent py-2 text-sm font-medium text-bg-base hover:bg-accent-dim"
      >
        Add to cart
      </button>
    </div>
  )
}

function CartDrawer({
  cart,
  onClose,
  onSetQuantity,
  onRemove,
}: {
  cart: CartState
  onClose: () => void
  onSetQuantity: (productId: string, quantity: number) => void
  onRemove: (productId: string) => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50" onClick={onClose}>
      <div
        role="dialog"
        aria-label="Shopping cart"
        onClick={(e) => e.stopPropagation()}
        className="flex h-full w-full max-w-sm flex-col bg-bg-card p-6"
      >
        <div className="mb-4 flex items-center justify-between">
          <h4 className="font-display text-xl">Your cart</h4>
          <button type="button" onClick={onClose} aria-label="Close cart" className="text-ink-muted hover:text-ink-primary">
            ✕
          </button>
        </div>

        {cart.lines.length === 0 ? (
          <p className="text-ink-muted">Your cart is empty.</p>
        ) : (
          <ul className="flex-1 space-y-4 overflow-y-auto">
            {cart.lines.map((line) => (
              <li key={line.product.id} className="flex items-center gap-3">
                <img
                  src={line.product.image}
                  alt=""
                  width={56}
                  height={56}
                  loading="lazy"
                  decoding="async"
                  className="h-14 w-14 rounded-control object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{line.product.name}</p>
                  <p className="text-sm text-ink-secondary">${line.product.price.toFixed(2)}</p>
                </div>
                <input
                  type="number"
                  min={0}
                  value={line.quantity}
                  aria-label={`Quantity for ${line.product.name}`}
                  onChange={(e) => onSetQuantity(line.product.id, Number(e.target.value))}
                  className="w-14 rounded-control border border-ink-muted/30 bg-bg-raised px-2 py-1 text-center"
                />
                <button
                  type="button"
                  onClick={() => onRemove(line.product.id)}
                  aria-label={`Remove ${line.product.name}`}
                  className="text-ink-muted hover:text-danger"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 flex items-center justify-between border-t border-ink-muted/20 pt-4">
          <span className="font-medium">Total</span>
          <span className="font-medium">${cartTotal(cart).toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}
