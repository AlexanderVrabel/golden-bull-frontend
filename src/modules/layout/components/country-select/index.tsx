"use client"

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react"
import { Fragment, useEffect, useMemo, useState, useTransition } from "react"
import ReactCountryFlag from "react-country-flag"

import { StateType } from "@lib/hooks/use-toggle-state"
import { useParams, usePathname } from "next/navigation"
import { updateRegion } from "@lib/data/cart"
import { updateLocale } from "@lib/data/locale-actions"
import { HttpTypes } from "@medusajs/types"
import { Locale } from "@lib/data/locales"

type CountryOption = {
  country: string
  region: string
  label: string
  localeCode: string
  localizedCountryName: string
}

type CountrySelectProps = {
  toggleState: StateType
  regions: HttpTypes.StoreRegion[]
  locales: Locale[]
}

const getCountryCodeFromLocale = (localeCode: string): string => {
  try {
    const locale = new Intl.Locale(localeCode)
    if (locale.region) {
      return locale.region.toUpperCase()
    }
    const maximized = locale.maximize()
    return maximized.region?.toUpperCase() ?? localeCode.toUpperCase()
  } catch {
    const parts = localeCode.split(/[-_]/)
    return parts.length > 1 ? parts[1].toUpperCase() : parts[0].toUpperCase()
  }
}

const getLocalizedCountryName = (
  countryCode: string,
  fallbackName: string,
  displayLocale: string = "en-US"
): string => {
  try {
    const displayNames = new Intl.DisplayNames([displayLocale], {
      type: "region",
    })
    return displayNames.of(countryCode) ?? fallbackName
  } catch {
    return fallbackName
  }
}

const CountrySelect = ({
  toggleState,
  regions,
  locales,
}: CountrySelectProps) => {
  const { countryCode } = useParams()
  const currentPath = usePathname().split(`/${countryCode}`)[1]

  const { state, close } = toggleState

  const options = useMemo(() => {
    return regions
      ?.map((r) => {
        return r.countries?.map((c) => {
          // Find the best locale for this country
          // We try to match the country code with the locale's country component
          const countryIso = c.iso_2?.toLowerCase()
          const matchingLocale =
            locales.find(
              (l) => getCountryCodeFromLocale(l.code).toLowerCase() === countryIso
            ) ||
            locales.find((l) => l.code.startsWith("en")) ||
            locales[0]

          return {
            country: c.iso_2 ?? "",
            region: r.id,
            label: c.display_name ?? "",
            localeCode: matchingLocale.code,
            localizedCountryName: getLocalizedCountryName(
              c.iso_2?.toUpperCase() ?? "",
              c.display_name ?? "",
              matchingLocale.code
            ),
          }
        })
      })
      .flat()
      .sort((a, b) => (a?.label ?? "").localeCompare(b?.label ?? "")) as CountryOption[]
  }, [regions, locales])

  const [current, setCurrent] = useState<CountryOption | undefined>(() => {
    if (countryCode && options) {
      return options.find((o) => o?.country === countryCode)
    }
    return undefined
  })

  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (countryCode && options) {
      const option = options.find((o) => o?.country === countryCode)
      if (option) {
        setCurrent(option)
      }
    }
  }, [options, countryCode])

  const handleChange = (option: CountryOption) => {
    startTransition(async () => {
      await updateLocale(option.localeCode)
      await updateRegion(option.country, currentPath)
      close()
    })
  }

  return (
    <div>
      <Listbox
        as="span"
        onChange={handleChange}
        value={current}
        disabled={isPending}
      >
        <ListboxButton className="py-1 w-full">
          <div className="txt-compact-small flex items-start gap-x-2">
            <span>Shipping to:</span>
            {current && (
              <span className="txt-compact-small flex items-center gap-x-2">
                {/* @ts-ignore */}
                <ReactCountryFlag
                  svg
                  style={{
                    width: "16px",
                    height: "16px",
                  }}
                  countryCode={current.country ?? ""}
                />
                {current.localizedCountryName}
              </span>
            )}
          </div>
        </ListboxButton>
        <div className="flex relative w-full min-w-[320px]">
          <Transition
            show={state}
            as={Fragment}
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions
              className="absolute -bottom-[calc(100%-36px)] left-0 xsmall:left-auto xsmall:right-0 max-h-[442px] overflow-y-scroll z-[900] bg-grey-0 drop-shadow-md text-small-regular uppercase text-grey-90 no-scrollbar rounded-rounded w-full"
              static
            >
              {options?.map((o, index) => {
                return (
                  <ListboxOption
                    key={index}
                    value={o}
                    className="py-2 hover:bg-grey-20 px-3 cursor-pointer flex items-center gap-x-2"
                  >
                    {/* @ts-ignore */}
                    <ReactCountryFlag
                      svg
                      style={{
                        width: "16px",
                        height: "16px",
                      }}
                      countryCode={o?.country ?? ""}
                    />{" "}
                    {o?.localizedCountryName}
                  </ListboxOption>
                )
              })}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default CountrySelect

