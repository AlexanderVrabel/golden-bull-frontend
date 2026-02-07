import { getLocale } from "@lib/data/locale-actions"
import { getTranslation } from "@lib/i18n/server"

import LoginTemplate from "@modules/account/templates/login-template"

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Gold Bull account.",
}

export default async function Login() {
  const currentLocale = await getLocale()
  const { t } = await getTranslation(currentLocale || "en", "common")

  const loginTranslations = {
    welcome: t("login.welcome"),
    sign_in_description: t("login.sign_in_description"),
    email: t("login.email"),
    email_invalid: t("login.email_invalid"),
    password: t("login.password"),
    sign_in: t("login.sign_in"),
    not_a_member: t("login.not_a_member"),
    join_us: t("login.join_us"),
  }

  const registerTranslations = {
    become_member: t("register.become_member"),
    register_description: t("register.register_description"),
    first_name: t("register.first_name"),
    last_name: t("register.last_name"),
    email: t("register.email"),
    phone: t("register.phone"),
    password: t("register.password"),
    privacy: t("register.privacy"),
    terms: t("register.terms"),
    agree_prefix: t("register.agree_prefix"),
    agree_and: t("register.agree_and"),
    join: t("register.join"),
    already_member: t("register.already_member"),
    sign_in: t("register.sign_in"),
  }

  return (
    <LoginTemplate
      loginTranslations={loginTranslations}
      registerTranslations={registerTranslations}
    />
  )
}
