/**
 * v0 by Vercel.
 * @see https://v0.dev/t/5L4G3TduvsN
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ReactSVG } from "react"
import Footer from "@/components/footer"
import ConnectButton from "@/components/cb"

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-gradient-to-b from-[#0d1117] to-[#161b22] text-white">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <DiamondIcon className="h-6 w-6 text-[#9e9e9e]" />
          <span className="text-lg font-medium">Freelance Forge</span>
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link href="#" className="text-sm font-medium hover:text-[#9e9e9e] transition-colors" prefetch={false}>
            Explore
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-[#9e9e9e] transition-colors" prefetch={false}>
            Pricing
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-[#9e9e9e] transition-colors" prefetch={false}>
            About
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-[#9e9e9e] transition-colors" prefetch={false}>
            Contact
          </Link>
          <ConnectButton />
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Unlock Your Freelance Potential
                  </h1>
                  <p className="max-w-[600px] text-[#9e9e9e]">
                    Discover a thriving community of talented freelancers and clients on our cutting-edge platform.
                    Elevate your career with secure crypto payments and seamless project management.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="h-10 px-6 text-sm">Get Started</Button>
                  <Button variant="outline" className="h-10 px-6 text-sm">
                    Explore Talent
                  </Button>
                </div>
              </div>
              <img
                src="/placeholder.svg"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#0d1117]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-[#161b22] px-3 py-1 text-sm">Crypto Payments</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Secure Transactions, Seamless Payouts
                </h2>
                <p className="max-w-[900px] text-[#9e9e9e] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Leverage the power of blockchain technology to receive payments in your preferred cryptocurrency. Our
                  platform ensures fast, transparent, and secure transactions, so you can focus on your work.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <img
                src="/placeholder.svg"
                width="550"
                height="310"
                alt="Wallet"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Seamless Crypto Payments</h3>
                      <p className="text-[#9e9e9e]">
                        Receive payments in your preferred cryptocurrency with lightning-fast transactions and low fees.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Transparent Payouts</h3>
                      <p className="text-[#9e9e9e]">
                        Track your earnings and view detailed payment histories with our user-friendly dashboard.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Secure Transactions</h3>
                      <p className="text-[#9e9e9e]">
                        Protect your financial data with our state-of-the-art security measures and blockchain-based
                        technology.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#0d1117]">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Discover Exceptional Talent</h2>
              <p className="max-w-[600px] text-[#9e9e9e] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Browse our curated marketplace of skilled freelancers across various industries. Find the perfect match
                for your project needs.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
              <Button className="h-10 px-6 text-sm">Hire Talent</Button>
              <Button variant="outline" className="h-10 px-6 text-sm">
                Become a Freelancer
              </Button>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#0d1117]">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Trusted by the Best</h2>
              <p className="mx-auto max-w-[700px] text-[#9e9e9e] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform is trusted by leading companies and talented freelancers worldwide. Join the Freelance
                Forge community today.
              </p>
            </div>
            <div className="divide-y rounded-lg border-[#161b22]">
              <div className="grid w-full grid-cols-3 items-stretch justify-center divide-x-[#161b22] md:grid-cols-3">
                <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                  <img
                    src="/placeholder.svg"
                    width="140"
                    height="70"
                    alt="Logo"
                    className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
                  />
                </div>
                <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                  <img
                    src="/placeholder.svg"
                    width="140"
                    height="70"
                    alt="Logo"
                    className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
                  />
                </div>
                <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                  <img
                    src="/placeholder.svg"
                    width="140"
                    height="70"
                    alt="Logo"
                    className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
                  />
                </div>
              </div>
              <div className="grid w-full grid-cols-3 items-stretch justify-center divide-x-[#161b22] md:grid-cols-3">
                <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                  <img
                    src="/placeholder.svg"
                    width="140"
                    height="70"
                    alt="Logo"
                    className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
                  />
                </div>
                <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                  <img
                    src="/placeholder.svg"
                    width="140"
                    height="70"
                    alt="Logo"
                    className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
                  />
                </div>
                <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                  <img
                    src="/placeholder.svg"
                    width="140"
                    height="70"
                    alt="Logo"
                    className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function DiamondIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z" />
    </svg>
  )
}