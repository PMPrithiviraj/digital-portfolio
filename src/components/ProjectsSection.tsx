import LoginForm from './LoginForm'
import ProjectCase from './ProjectCase'
import ShopDemo from './shop/ShopDemo'

const REPO = 'https://github.com/PMPrithiviraj/digital-portfolio/blob/main/src'

export default function ProjectsSection() {
  return (
    <section id="work" className="bg-bg-raised px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-display text-3xl text-ink-primary sm:text-4xl">Selected work</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-ink-secondary">
          Each project below is the actual running component — try it.
        </p>

        <div className="mt-12 space-y-10">
          <ProjectCase
            title="JWT-authenticated login UI"
            summary="A production-quality login form, rebuilt from a static markup exercise into real validated logic."
            tags={['React', 'TypeScript', 'Tailwind CSS', 'Accessible (WCAG AA)']}
            problem="The original version was a CSS-only floating-label form with no JavaScript at all — no validation, no error states, no password visibility, nothing that reflected how a real login flow behaves."
            process="Rebuilt as a controlled React form: regex-driven email and password rules, validate-on-blur with live re-validation once a field has been touched, and an async submit flow with a genuine loading state instead of an instant fake success."
            decisions="Chose validate-on-blur-then-live over instant keystroke validation to avoid interrupting users mid-input. Modeled the submit as a real network round-trip (disabled inputs, spinner) because that's what production auth actually looks like. Informed by hands-on experience implementing JWT authentication with role-based access control in a separate project — an AES-256 encrypted file storage system built with Python, MongoDB, and a REST API."
            codeHref={`${REPO}/components/LoginForm.tsx`}
          >
            <div className="flex items-center justify-center bg-bg-base p-8">
              <LoginForm />
            </div>
          </ProjectCase>

          <ProjectCase
            title="E-commerce product catalog with real cart state"
            summary="A static product grid turned into an actually-functional shopping cart."
            tags={['React', 'TypeScript', 'useReducer', 'Tailwind CSS']}
            problem="The original page advertised 'shopping cart functionality' that was never built — just a static grid of product images and prices with zero interactivity."
            process="Built a cart system on React's useReducer: add-to-cart, per-line quantity editing, removal, a live running total, and a cart-count badge with a slide-in drawer."
            decisions="Used useReducer instead of scattered useState calls because cart state has several related transitions (add, remove, set-quantity) that read more clearly as explicit, testable action types than as ad-hoc handlers spread across the component."
            codeHref={`${REPO}/components/shop/ShopDemo.tsx`}
          >
            <ShopDemo />
          </ProjectCase>
        </div>
      </div>
    </section>
  )
}
