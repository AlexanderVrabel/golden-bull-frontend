import { Heading } from "@medusajs/ui"
import Image from "next/image"

const Hero = () => {
  return (
    <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.png"
          alt="GoldBull Gym Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <span>
          <Heading
            level="h1"
            className="text-3xl leading-10 text-white font-normal"
          >
            Coming Soon
          </Heading>
          <Heading
            level="h2"
            className="text-3xl leading-10 text-gray-200 font-normal"
          >
            Goldbull
          </Heading>
        </span>
      </div>
    </div>
  )
}

export default Hero
