import React from "react"

import UnderlineLink from "@modules/common/components/interactive-link"

import AccountNav from "../components/account-nav"
import { HttpTypes } from "@medusajs/types"
import { getLocale } from "@lib/data/locale-actions"
import { getTranslation } from "@lib/i18n/server"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = async ({
  customer,
  children,
}) => {
  const currentLocale = await getLocale()
  const { t } = await getTranslation(currentLocale || "en", "common")

  const navTranslations = {
    overview: t("account.overview"),
    profile: t("account.profile"),
    addresses: t("account.addresses"),
    orders: t("account.orders"),
    log_out: t("account.log_out"),
    hello: t("account.hello"),
    account: t("account.account"),
  }

  return (
    <div className="flex-1 small:py-12" data-testid="account-page">
      <div className="flex-1 content-container h-full max-w-5xl mx-auto bg-grey-0 flex flex-col">
        <div className="grid grid-cols-1  small:grid-cols-[240px_1fr] py-12">
          <div>
            {customer && (
              <AccountNav customer={customer} translations={navTranslations} />
            )}
          </div>
          <div className="flex-1">{children}</div>
        </div>
        <div className="flex flex-col small:flex-row items-end justify-between small:border-t border-grey-20 py-12 gap-8">
          <div>
            <h3 className="text-xl-semi mb-4">{t("account.got_questions")}</h3>
            <span className="txt-medium">
              {t("account.questions_description")}
            </span>
          </div>
          <div>
            <UnderlineLink href="/customer-service">
              {t("account.customer_service")}
            </UnderlineLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
