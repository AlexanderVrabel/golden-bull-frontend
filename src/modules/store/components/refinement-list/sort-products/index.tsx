"use client"

import FilterRadioGroup from "@modules/common/components/filter-radio-group"

export type SortOptions = "price_asc" | "price_desc" | "created_at"

type SortProductsProps = {
  sortBy: SortOptions
  setQueryParams: (name: string, value: SortOptions) => void
  translations: {
    sort_by: string
    latest: string
    price_asc: string
    price_desc: string
  }
  "data-testid"?: string
}

const SortProducts = ({
  "data-testid": dataTestId,
  sortBy,
  setQueryParams,
  translations,
}: SortProductsProps) => {
  const sortOptions = [
    {
      value: "created_at",
      label: translations.latest,
    },
    {
      value: "price_asc",
      label: translations.price_asc,
    },
    {
      value: "price_desc",
      label: translations.price_desc,
    },
  ]

  const handleChange = (value: SortOptions) => {
    setQueryParams("sortBy", value)
  }

  return (
    <FilterRadioGroup
      title={translations.sort_by}
      items={sortOptions}
      value={sortBy}
      handleChange={handleChange}
      data-testid={dataTestId}
    />
  )
}

export default SortProducts
