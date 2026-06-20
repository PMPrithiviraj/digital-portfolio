export type Product = {
  id: string
  name: string
  price: number
  image: string
}

export type CartLine = { product: Product; quantity: number }

export type CartState = { lines: CartLine[] }

export type CartAction =
  | { type: 'add'; product: Product }
  | { type: 'remove'; productId: string }
  | { type: 'setQuantity'; productId: string; quantity: number }

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'add': {
      const existing = state.lines.find((l) => l.product.id === action.product.id)
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            l.product.id === action.product.id ? { ...l, quantity: l.quantity + 1 } : l,
          ),
        }
      }
      return { lines: [...state.lines, { product: action.product, quantity: 1 }] }
    }
    case 'remove':
      return { lines: state.lines.filter((l) => l.product.id !== action.productId) }
    case 'setQuantity': {
      if (action.quantity <= 0) {
        return { lines: state.lines.filter((l) => l.product.id !== action.productId) }
      }
      return {
        lines: state.lines.map((l) =>
          l.product.id === action.productId ? { ...l, quantity: action.quantity } : l,
        ),
      }
    }
    default:
      return state
  }
}

export function cartTotal(state: CartState): number {
  return state.lines.reduce((sum, l) => sum + l.product.price * l.quantity, 0)
}

export function cartCount(state: CartState): number {
  return state.lines.reduce((sum, l) => sum + l.quantity, 0)
}
