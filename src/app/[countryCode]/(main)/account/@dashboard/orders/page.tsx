import { Metadata } from "next"

import OrderOverview from "@modules/account/components/order-overview"
import { notFound } from "next/navigation"
import { listOrders } from "@lib/data/orders"
import Divider from "@modules/common/components/divider"
import TransferRequestForm from "@modules/account/components/transfer-request-form"

import { getLocale } from "@lib/data/locale-actions"
import { getTranslation } from "@lib/i18n/server"

export const metadata: Metadata = {
  title: "Orders",
  description: "Overview of your previous orders.",
}

export default async function Orders() {
  const orders = await listOrders()
  const currentLocale = await getLocale()
  const { t } = await getTranslation(currentLocale || "en", "common")

  if (!orders) {
    notFound()
  }

  const orderOverviewTranslations = {
    nothing_to_see: t("account.nothing_to_see"),
    no_orders_description: t("account.no_orders_description"),
    continue_shopping: t("account.continue_shopping"),
  }

  return (
    <div className="w-full" data-testid="orders-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">{t("account.orders")}</h1>
        <p className="text-base-regular">
          {t("account.orders_description")}
        </p>
      </div>
      <div>
        <OrderOverview orders={orders} translations={orderOverviewTranslations} />
        <Divider className="my-16" />
        <TransferRequestForm />
      </div>
    </div>
  )
}
