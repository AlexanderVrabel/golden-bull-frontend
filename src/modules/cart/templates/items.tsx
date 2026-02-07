import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"
import { Heading, Table } from "@medusajs/ui"

import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart
  translations: any
}

const ItemsTemplate = ({ cart, translations }: ItemsTemplateProps) => {
  const items = cart?.items
  return (
    <div>
      <div className="pb-3 px-5 flex items-center">
        <Heading className="text-[2rem] leading-[2.75rem]">
          {translations.title}
        </Heading>
      </div>
      <Table>
        <Table.Header className="border-0">
          <Table.Row className="text-ui-fg-subtle txt-medium-plus">
            <Table.HeaderCell className="!pl-4">
              {translations.item}
            </Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>{translations.quantity}</Table.HeaderCell>
            <Table.HeaderCell className="hidden small:table-cell">
              {translations.price}
            </Table.HeaderCell>
            <Table.HeaderCell className="!pr-4 text-right">
              {translations.total}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items
            ? items
              .sort((a, b) => {
                return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
              })
              .map((item) => {
                return (
                  <Item
                    key={item.id}
                    item={item}
                    currencyCode={cart?.currency_code}
                  />
                )
              })
            : repeat(5).map((i) => {
              return <SkeletonLineItem key={i} />
            })}
        </Table.Body>
      </Table>
    </div>
  )
}

export default ItemsTemplate
