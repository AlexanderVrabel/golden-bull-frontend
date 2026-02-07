import { getLocale } from "@lib/data/locale-actions"
import { getTranslation } from "@lib/i18n/server"

import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import Divider from "@modules/common/components/divider"
import { HttpTypes } from "@medusajs/types"

const CartTemplate = async ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const currentLocale = await getLocale()
  const { t } = await getTranslation(currentLocale || "en", "common")

  const cartTranslations = {
    title: t("cart.title"),
    empty_message: t("cart.empty_message"),
    explore_products: t("cart.explore"),
    already_have_account: t("cart.already_have_account"),
    sign_in_experience: t("cart.sign_in_experience"),
    sign_in: t("cart.sign_in"),
    item: t("cart.item"),
    quantity: t("cart.quantity"),
    price: t("cart.price"),
    total: t("cart.total"),
    summary: t("cart.summary"),
    go_to_checkout: t("cart.go_to_checkout"),
    subtotal_label: t("cart.subtotal_label"),
    shipping: t("cart.shipping"),
    discount: t("cart.discount"),
    taxes: t("cart.taxes"),
    total_label: t("cart.total_label"),
  }

  return (
    <div className="py-12">
      <div className="content-container" data-testid="cart-container">
        {cart?.items?.length ? (
          <div className="grid grid-cols-1 small:grid-cols-[1fr_360px] gap-x-40">
            <div className="flex flex-col bg-grey-0 py-6 gap-y-6">
              {!customer && (
                <>
                  <SignInPrompt translations={cartTranslations} />
                  <Divider />
                </>
              )}
              <ItemsTemplate cart={cart} translations={cartTranslations} />
            </div>
            <div className="relative">
              <div className="flex flex-col gap-y-8 sticky top-12">
                {cart && cart.region && (
                  <>
                    <div className="bg-grey-0 py-6">
                      <Summary
                        cart={cart as any}
                        translations={cartTranslations}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <EmptyCartMessage translations={cartTranslations} />
          </div>
        )}
      </div>
    </div>
  )
}

export default CartTemplate
