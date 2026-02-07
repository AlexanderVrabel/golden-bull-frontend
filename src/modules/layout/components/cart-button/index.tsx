import { retrieveCart } from "@lib/data/cart"
import { getLocale } from "@lib/data/locale-actions"
import { getTranslation } from "@lib/i18n/server"
import CartDropdown from "../cart-dropdown"

export default async function CartButton() {
  const cart = await retrieveCart().catch(() => null)
  const currentLocale = await getLocale()
  const { t } = await getTranslation(currentLocale || "en", "common")

  const translations = {
    cart: t("nav.cart"),
    subtotal: t("cart.subtotal"),
    excl_taxes: t("cart.excl_taxes"),
    quantity: t("cart.quantity"),
    remove: t("cart.remove"),
    go_to_cart: t("cart.go_to_cart"),
    empty: t("cart.empty"),
    explore: t("cart.explore"),
  }

  return <CartDropdown cart={cart} translations={translations} />
}
