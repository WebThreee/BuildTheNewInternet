'use client'

import { useAccount, useDisconnect } from 'wagmi'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ConnectButton from '../components/cb'
import { Button } from "@/components/ui/button"
import Footer from "@/components/footer"
import Link from 'next/link'
import { motion } from "framer-motion"
import { Tilt } from "react-tilt"
import { RoughNotation } from "react-rough-notation"
export default function Home() {
  const { address, isConnected } = useAccount()
  const router = useRouter()
  const [isExistingUser, setIsExistingUser] = useState(false)
  const { disconnect } = useDisconnect()
  const [userType, setUserType] = useState('')

  useEffect(() => {
    if (isConnected && address) {
      checkUser(address)
    }
  }, [isConnected, address])

  const checkUser = async (walletAddress: string) => {
    try {
      const response = await fetch(`/api/check-user?address=${walletAddress}`)
      const data = await response.json()
      setIsExistingUser(data.exists)
      if (data.exists) {
        setUserType(data.userType)
        router.push(data.userType === 'client' ? '/c' : '/f')
      } else {
        router.push('/register')
      }
    } catch (error) {
      console.error('Error checking user:', error)
    }
  }
  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#0a0a0a] text-white font-futuristic">
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="px-4 lg:px-6 h-14 flex items-center justify-between bg-[#1a1a1a] backdrop-filter backdrop-blur-lg bg-opacity-30"
    >
      <Link href="#" className="flex items-center gap-2" prefetch={false}>
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <DiamondIcon className="h-6 w-6 text-[#00ffff]" />
        </motion.div>
        <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00ffff] to-[#ff00ff]">
          Freelance Forge
        </span>
      </Link>
      <nav className="flex items-center gap-4 sm:gap-6">
        {["Explore", "Pricing", "About"].map((item) => (
          <Link
            key={item}
            href="#"
            className="text-sm font-medium hover:text-[#00ffff] transition-colors"
            prefetch={false}
          >
            <RoughNotation type="underline" show={true} color="#00ffff">
              {item}
            </RoughNotation>
          </Link>
        ))}
        <ConnectButton />
          {isConnected && (
   <div>  
  {isExistingUser && <p>Welcome back!</p>}   <button className= "border p-2" onClick={() => disconnect()}>Disconnect</button>
 </div>
)}
      </nav>
    </motion.header>
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-center space-y-4"
            >
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-[#00ffff] to-[#ff00ff]">
                  Unlock Your Freelance Potential
                </h1>
                <p className="max-w-[600px] text-[#9e9e9e] text-xl">
                  Discover a thriving community of talented freelancers and clients on our cutting-edge platform.
                  Elevate your career with secure crypto payments and seamless project management.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button className="h-12 px-6 text-lg bg-gradient-to-r from-[#00ffff] to-[#ff00ff] text-black font-bold hover:opacity-80 transition-opacity">
                  Get Started
                </Button>
                <Button variant="outline" className="h-12 px-6 text-lg border-[#00ffff] text-[#00ffff] hover:bg-[#00ffff] hover:text-black transition-colors">
                  Explore Talent
                </Button>
              </div>
            </motion.div>
            <Tilt options={{ max: 25, scale: 1.05 }}>
              <motion.img
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                src="/1.webp"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square shadow-[0_0_15px_rgba(0,255,255,0.5)]"
              />
            </Tilt>
          </div>
        </div>
      </section>
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full py-12 md:py-24 lg:py-32 bg-[#0d1117]"
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-block rounded-lg bg-gradient-to-r from-[#00ffff] to-[#ff00ff] px-3 py-1 text-sm text-black font-bold"
              >
                Crypto Payments
              </motion.div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-[#00ffff] to-[#ff00ff]">
                Secure Transactions, Seamless Payouts
              </h2>
              <p className="max-w-[900px] text-[#9e9e9e] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Leverage the power of blockchain technology to receive payments in your preferred cryptocurrency. Our
                platform ensures fast, transparent, and secure transactions, so you can focus on your work.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <Tilt options={{ max: 25, scale: 1.05 }}>
              <motion.img
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                src="/2.png"
                width="550"
                height="310"
                alt="Wallet"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last shadow-[0_0_15px_rgba(255,0,255,0.5)]"
              />
            </Tilt>
            <div className="flex flex-col justify-center space-y-4">
              <ul className="grid gap-6">
                {[
                  { title: "Seamless Crypto Payments", description: "Receive payments in your preferred cryptocurrency with lightning-fast transactions and low fees." },
                  { title: "Transparent Payouts", description: "Track your earnings and view detailed payment histories with our user-friendly dashboard." },
                  { title: "Secure Transactions", description: "Protect your financial data with our state-of-the-art security measures and blockchain-based technology." }
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-[#00ffff]">{item.title}</h3>
                      <p className="text-[#9e9e9e]">{item.description}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.section>
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full py-12 md:py-24 lg:py-32 bg-[#0d1117]"
      >
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-[#00ffff] to-[#ff00ff]">
              Discover Exceptional Talent
            </h2>
            <p className="max-w-[600px] text-[#9e9e9e] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Browse our curated marketplace of skilled freelancers across various industries. Find the perfect match
              for your project needs.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
            <Button className="h-12 px-6 text-lg bg-gradient-to-r from-[#00ffff] to-[#ff00ff] text-black font-bold hover:opacity-80 transition-opacity">
              Hire Talent
            </Button>
            <Button variant="outline" className="h-12 px-6 text-lg border-[#00ffff] text-[#00ffff] hover:bg-[#00ffff] hover:text-black transition-colors">
              Become a Freelancer
            </Button>
          </div>
        </div>
      </motion.section>
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full py-12 md:py-24 lg:py-32 bg-[#0d1117]"
      >
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-[#00ffff] to-[#ff00ff]">
              Trusted by the Best
            </h2>
            <p className="mx-auto max-w-[700px] text-[#9e9e9e] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform is trusted by leading companies and talented freelancers worldwide. Join the Freelance
              Forge community today.
            </p>
          </div>
          <div className="divide-y rounded-lg border-[#161b22]">
            <div className="grid w-full grid-cols-3 items-stretch justify-center divide-x-[#161b22] md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Tilt key={i} options={{ max: 15, scale: 1.05 }}>
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="mx-auto flex w-full items-center justify-center p-4 sm:p-8"
                  >
                    <img
                      src="/next.svg"
                      width="140"
                      height="70"
                      alt="Logo"
                      className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
                    />
                  </motion.div>
                </Tilt>
              ))}
            </div>
            <div className="grid w-full grid-cols-3 items-stretch justify-center divide-x-[#161b22] md:grid-cols-3">
              {[4, 5, 6].map((i) => (
                <Tilt key={i} options={{ max: 15, scale: 1.05 }}>
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="mx-auto flex w-full items-center justify-center p-4 sm:p-8"
                  >
                    <img
                      src="/vercel.svg"
                      width="140"
                      height="70"
                      alt="Logo"
                      className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
                    />
                  </motion.div>
                </Tilt>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
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



// //  {isConnected && (
//   <div>
//   <p>Connected to {address}</p>
//   {isExistingUser && <p>Welcome back!</p>}
//   <button onClick={() => disconnect()}>Disconnect</button>
// </div>
// )}