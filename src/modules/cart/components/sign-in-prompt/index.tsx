import { Button, Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = ({ translations }: { translations: any }) => {
  return (
    <div className="bg-grey-0 flex items-center justify-between">
      <div>
        <Heading level="h2" className="txt-xlarge">
          {translations.already_have_account}
        </Heading>
        <Text className="txt-medium text-ui-fg-subtle mt-2">
          {translations.sign_in_experience}
        </Text>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <Button
            variant="secondary"
            className="h-10"
            data-testid="sign-in-button"
          >
            {translations.sign_in}
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
