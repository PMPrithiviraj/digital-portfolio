import { useReducer, useState } from 'react'
import { cartCount, cartReducer, cartTotal, type CartState, type Product } from '../../lib/cart'
import { products } from './products'
import { playAlert, playClickActuate, playHoverTick, playSuccess } from '../../lib/soundEngine'

const rarities: Record<string, { label: string; color: string }> = {
  'running-shoes': { label: 'Recon Series', color: 'border-accent/40 text-accent' },
  'sports-shoes': { label: 'Assault Runner', color: 'border-border-subtle text-ink-primary' },
  'sneakers': { label: 'Stealth Stalker', color: 'border-accent/40 text-accent' },
  'puma-slippers': { label: 'Base Spec', color: 'border-border-subtle text-ink-muted' },
  'woodland-premium': { label: 'Armored Edition', color: 'border-accent text-accent' },
  'school-shoes': { label: 'Cadet Classic', color: 'border-border-subtle text-ink-secondary' },
}

export default function ShopDemo() {
  const [cart, dispatch] = useReducer(cartReducer, { lines: [] })
  const [cartOpen, setCartOpen] = useState(false)

  function handleAdd(product: Product) {
    playClickActuate()
    dispatch({ type: 'add', product })
  }

  function handleToggleCart(open: boolean) {
    playClickActuate()
    setCartOpen(open)
  }

  return (
    <div className="relative min-h-[480px] rounded-xl bg-bg-base p-3 sm:p-6 text-ink-primary font-mono">
      <div className="mx-auto max-w-5xl">
        {/* Terminal Header */}
        <header className="mb-5 sm:mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle pb-4">
          <div>
            <div className="text-[10px] sm:text-[11px] text-accent tracking-wider font-semibold uppercase flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-accent animate-ping" />
              <span>GEAR STORE // RUNNING STATE</span>
            </div>
            <h4 className="font-mono text-lg sm:text-2xl font-bold text-ink-primary tracking-tight">
              E-Commerce Cart Simulator
            </h4>
          </div>

          <button
            type="button"
            onClick={() => handleToggleCart(true)}
            onMouseEnter={playHoverTick}
            aria-label="Open shopping cart"
            className="relative flex min-h-[44px] items-center gap-2 rounded-full border border-border-subtle bg-bg-card px-4 py-2 font-mono text-xs font-semibold text-ink-primary hover:border-accent hover:text-accent transition"
          >
            <span>Cart</span>
            {cartCount(cart) > 0 ? (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-black shadow-[0_0_8px_var(--color-accent)]">
                {cartCount(cart)}
              </span>
            ) : (
              <span className="text-ink-muted text-[11px]">(0)</span>
            )}
          </button>
        </header>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const rarity = rarities[product.id] || { label: 'Standard', color: 'border-border-subtle text-ink-primary' }
            return (
              <div
                key={product.id}
                onMouseEnter={playHoverTick}
                className="group relative rounded-xl border border-border-subtle bg-bg-card p-4 transition-all duration-200 hover:border-accent hover:shadow-[0_0_15px_var(--color-accent-dim)] flex flex-col justify-between"
              >
                <div>
                  {/* Rarity & Asset ID Tag */}
                  <div className="mb-2 flex items-center justify-between font-mono text-[10px]">
                    <span className={`rounded-full border px-2 py-0.5 font-medium ${rarity.color}`}>
                      {rarity.label}
                    </span>
                    <span className="text-ink-muted">#{product.id.slice(0, 5)}</span>
                  </div>

                  <div className="relative mb-3 overflow-hidden rounded-lg border border-border-subtle bg-bg-raised">
                    <img
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={300}
                      loading="lazy"
                      decoding="async"
                      className="h-32 sm:h-36 w-full object-cover filter contrast-105 group-hover:scale-105 transition duration-300"
                    />
                  </div>

                  <h5 className="font-mono font-bold text-xs sm:text-sm text-ink-primary truncate">
                    {product.name}
                  </h5>

                  <p className="mt-1 font-mono text-xs text-accent font-semibold">
                    ${product.price.toFixed(2)} USD
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleAdd(product)}
                  onMouseEnter={playHoverTick}
                  className="mt-4 flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-full border border-border-subtle bg-bg-raised py-2.5 font-mono text-xs font-semibold text-ink-primary hover:border-accent hover:bg-accent hover:text-black transition-all"
                >
                  <span>+ Add to Cart</span>
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Cart Drawer Modal */}
      {cartOpen && (
        <CartDrawer
          cart={cart}
          onClose={() => handleToggleCart(false)}
          onSetQuantity={(productId, quantity) => {
            playClickActuate()
            dispatch({ type: 'setQuantity', productId, quantity })
          }}
          onRemove={(productId) => {
            playAlert()
            dispatch({ type: 'remove', productId })
          }}
        />
      )}
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
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        role="dialog"
        aria-label="Shopping Cart Drawer"
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-full w-full max-w-md flex-col border-l border-border-subtle bg-bg-card p-5 sm:p-6 shadow-2xl font-mono text-ink-primary"
      >
        <div className="mb-4 flex items-center justify-between border-b border-border-subtle pb-3">
          <div>
            <div className="text-[10px] text-accent tracking-wider uppercase font-semibold">
              // ACTIVE CART STATE
            </div>
            <h4 className="font-mono text-base sm:text-lg font-bold text-ink-primary">
              Selected Items
            </h4>
          </div>
          <button
            type="button"
            onClick={onClose}
            onMouseEnter={playHoverTick}
            aria-label="Close cart"
            className="flex min-h-[44px] items-center rounded-full border border-border-subtle px-3 py-1 text-xs text-ink-secondary hover:border-accent hover:text-ink-primary transition"
          >
            Close ✕
          </button>
        </div>

        {cart.lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <span className="text-3xl text-ink-muted mb-2">🛒</span>
            <p className="text-xs text-ink-muted">
              Your cart is currently empty.
            </p>
          </div>
        ) : (
          <ul className="flex-1 space-y-3 overflow-y-auto pr-1">
            {cart.lines.map((line) => (
              <li
                key={line.product.id}
                className="flex items-center gap-3 rounded-xl border border-border-subtle bg-bg-base/80 p-3"
              >
                <img
                  src={line.product.image}
                  alt={line.product.name}
                  width={56}
                  height={56}
                  loading="lazy"
                  decoding="async"
                  className="h-12 w-12 rounded-lg border border-border-subtle object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-xs font-bold text-ink-primary truncate">
                    {line.product.name}
                  </p>
                  <p className="text-[11px] text-accent font-semibold">
                    ${line.product.price.toFixed(2)}
                  </p>
                </div>

                {/* Stepper Input */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    aria-label={`Decrease quantity for ${line.product.name}`}
                    onClick={() => onSetQuantity(line.product.id, line.quantity - 1)}
                    className="flex h-8 w-8 items-center justify-center rounded border border-border-subtle bg-bg-card text-xs text-ink-secondary hover:border-accent hover:text-ink-primary"
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-xs font-bold text-ink-primary">
                    {line.quantity}
                  </span>
                  <button
                    type="button"
                    aria-label={`Increase quantity for ${line.product.name}`}
                    onClick={() => onSetQuantity(line.product.id, line.quantity + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded border border-border-subtle bg-bg-card text-xs text-ink-secondary hover:border-accent hover:text-ink-primary"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => onRemove(line.product.id)}
                  aria-label={`Remove ${line.product.name}`}
                  className="flex h-8 w-8 items-center justify-center ml-1 text-xs text-ink-muted hover:text-danger transition"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 border-t border-border-subtle pt-4">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="text-ink-muted">Estimated Total:</span>
            <span className="text-xl font-bold text-accent">
              ${cartTotal(cart).toFixed(2)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              playSuccess()
              onClose()
            }}
            className="mt-4 w-full min-h-[44px] rounded-full bg-accent py-3 font-mono text-xs font-bold text-black hover:scale-[1.02] active:scale-95 shadow-[0_0_15px_var(--color-accent-dim)] transition"
          >
            Checkout Demo Order
          </button>
        </div>
      </div>
    </div>
  )
}
