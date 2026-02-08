import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import { getLocale } from "@lib/data/locale-actions"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const locale = await getLocale()

  return (
    <html lang={locale ?? "en"} data-mode="light">
      <body className="bg-grey-0">
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
