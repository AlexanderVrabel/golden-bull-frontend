"use client"

import { useActionState } from "react"
import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
  translations: {
    become_member: string
    register_description: string
    first_name: string
    last_name: string
    email: string
    phone: string
    password: string
    privacy: string
    terms: string
    agree_prefix: string
    agree_and: string
    join: string
    already_member: string
    sign_in: string
  }
}

const Register = ({ setCurrentView, translations }: Props) => {
  const [message, formAction] = useActionState(signup, null)

  return (
    <div
      className="max-w-sm flex flex-col items-center"
      data-testid="register-page"
    >
      <h1 className="text-large-semi uppercase mb-6">
        {translations.become_member}
      </h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-4">
        {translations.register_description}
      </p>
      <form className="w-full flex flex-col" action={formAction}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label={translations.first_name}
            name="first_name"
            required
            autoComplete="given-name"
            data-testid="first-name-input"
          />
          <Input
            label={translations.last_name}
            name="last_name"
            required
            autoComplete="family-name"
            data-testid="last-name-input"
          />
          <Input
            label={translations.email}
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />
          <Input
            label={translations.phone}
            name="phone"
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
          />
          <Input
            label={translations.password}
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          />
        </div>
        <ErrorMessage error={message} data-testid="register-error" />
        <span className="text-center text-ui-fg-base text-small-regular mt-6">
          {translations.agree_prefix}{" "}
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="underline"
          >
            {translations.privacy}
          </LocalizedClientLink>{" "}
          {translations.agree_and}{" "}
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="underline"
          >
            {translations.terms}
          </LocalizedClientLink>
          .
        </span>
        <SubmitButton className="w-full mt-6" data-testid="register-button">
          {translations.join}
        </SubmitButton>
      </form>
      <span className="text-center text-ui-fg-base text-small-regular mt-6">
        {translations.already_member}{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline"
        >
          {translations.sign_in}
        </button>
        .
      </span>
    </div>
  )
}

export default Register
