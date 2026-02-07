import { Metadata } from "next"
import { notFound } from "next/navigation"

import ProfilePhone from "@modules/account/components/profile-phone"
import ProfileBillingAddress from "@modules/account/components/profile-billing-address"
import ProfileEmail from "@modules/account/components/profile-email"
import ProfileName from "@modules/account/components/profile-name"

import { listRegions } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"
import { getLocale } from "@lib/data/locale-actions"
import { getTranslation } from "@lib/i18n/server"
import { retrieveCustomer } from "@lib/data/customer"
import { listRegions } from "@lib/data/regions"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Profile",
  description: "View and edit your Gold Bull profile.",
}

export default async function Profile() {
  const customer = await retrieveCustomer()
  const regions = await listRegions()
  const currentLocale = await getLocale()
  const { t } = await getTranslation(currentLocale || "en", "common")

  if (!customer || !regions) {
    notFound()
  }

  const commonTranslations = {
    edit: t("account.edit"),
    cancel: t("account.cancel"),
    save_changes: t("account.save_changes"),
    update_success: t("account.update_success"),
    error_occurred: t("account.error_occurred"),
  }

  return (
    <div className="w-full" data-testid="profile-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">{t("account.profile")}</h1>
        <p className="text-base-regular">
          {t("account.profile_description")}
        </p>
      </div>
      <div className="flex flex-col gap-y-8 w-full">
        <ProfileName
          customer={customer}
          translations={{
            ...commonTranslations,
            first_name: t("account.first_name"),
            last_name: t("account.last_name"),
            name: t("account.name"),
          }}
        />
        <Divider />
        <ProfileEmail
          customer={customer}
          translations={{
            ...commonTranslations,
            email: t("account.email"),
          }}
        />
        <Divider />
        <ProfilePhone
          customer={customer}
          translations={{
            ...commonTranslations,
            phone: t("account.phone"),
          }}
        />
        <Divider />
        <ProfileBillingAddress
          customer={customer}
          regions={regions}
          translations={{
            ...commonTranslations,
            billing_address: t("account.billing_address"),
            first_name: t("account.first_name"),
            last_name: t("account.last_name"),
            company: t("account.company"),
            phone: t("account.phone"),
            address_label: t("account.address_label"),
            apartment_suite: t("account.apartment_suite"),
            postal_code: t("account.postal_code"),
            city: t("account.city"),
            province: t("account.province"),
            no_billing_address: t("account.no_billing_address"),
          }}
        />
      </div>
    </div>
  )
}

const Divider = () => {
  return <div className="w-full h-px bg-grey-20" />
}
  ; ``
