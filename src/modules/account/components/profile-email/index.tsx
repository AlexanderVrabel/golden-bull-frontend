"use client"

import React, { useEffect, useActionState } from "react";

import Input from "@modules/common/components/input"

import AccountInfo from "../account-info"
import { HttpTypes } from "@medusajs/types"
import { updateCustomer } from "@lib/data/customer"

type MyInformationProps = {
  customer: HttpTypes.StoreCustomer
  translations: {
    edit: string
    cancel: string
    save_changes: string
    update_success: string
    error_occurred: string
    email: string
  }
}

const ProfileEmail: React.FC<MyInformationProps> = ({ customer, translations }) => {
  const [successState, setSuccessState] = React.useState(false)


  const updateCustomerEmail = (
    _currentState: Record<string, unknown>,
    formData: FormData
  ) => {
    const customer = {
      email: formData.get("email") as string,
    }

    try {

      return { success: true, error: null }
    } catch (error: any) {
      return { success: false, error: error.toString() }
    }
  }

  const [state, formAction] = useActionState(updateCustomerEmail, {
    error: false,
    success: false,
  })

  const clearState = () => {
    setSuccessState(false)
  }

  useEffect(() => {
    setSuccessState(state.success)
  }, [state])

  return (
    <form action={formAction} className="w-full">
      <AccountInfo
        label={translations.email}
        currentInfo={`${customer.email}`}
        isSuccess={successState}
        isError={!!state.error}
        clearState={clearState}
        translations={translations}
        data-testid="account-email-editor"
      >
        <div className="grid grid-cols-1 gap-y-2">
          <Input
            label={translations.email}
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={customer.email}
            data-testid="email-input"
          />
        </div>
      </AccountInfo>
    </form>
  )
}

export default ProfileEmail
