"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FiArrowRight, FiCheck, FiMessageSquare, FiMic, FiUser, FiStar, FiMenu, FiX } from "react-icons/fi";
import { FaBriefcaseMedical } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { name: "How It Works", href: "#how-it-works" },
  ];

  return (
    <div className="bg-neutral-950 text-neutral-100 min-h-screen">
      <nav className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-neutral-800">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-4 no-underline group"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="size-10 sm:size-12 rounded-full bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 ring-2 ring-offset-2 ring-offset-neutral-950 ring-emerald-500/30 group-hover:shadow-emerald-500/40 transition-all"
            >
              <FaBriefcaseMedical className="text-white text-lg sm:text-xl" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-300 via-teal-400 to-cyan-400 bg-clip-text text-transparent tracking-tight drop-shadow-[0_0_8px_rgba(74,222,128,0.4)] group-hover:drop-shadow-[0_0_12px_rgba(74,222,128,0.6)] transition-all"
            >
              Dr. Dialog
            </motion.h1>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-emerald-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-md text-neutral-400 hover:text-white focus:outline-none"
          >
            {mobileMenuOpen ? (
              <FiX className="h-6 w-6" />
            ) : (
              <FiMenu className="h-6 w-6" />
            )}
          </button>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-4 py-2 cursor-pointer rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:opacity-90 transition-opacity">
                Login
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Link href="/dashboard">
              <button className="flex items-center cursor-pointer gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-700 text-white hover:opacity-90 transition-all">
                <LayoutDashboard className="w-5 h-5" />
                Dashboard
              </button>
            </Link>
            <UserButton />
          </SignedIn>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-neutral-900 border-b border-neutral-800"
          >
            <div className="px-4 py-3 space-y-4">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-neutral-300 hover:text-white hover:bg-neutral-800"
                  whileHover={{ x: 5 }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}

              <div className="pt-2 border-t border-neutral-800">
                <SignedOut>
                  <SignInButton mode="modal">
                    <button
                      className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:opacity-90 transition-opacity"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </button>
                  </SignInButton>
                </SignedOut>

                <SignedIn>
                  <Link href="/dashboard" className="block">
                    <button
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-700 text-white hover:opacity-90 transition-all"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <LayoutDashboard className="w-5 h-5" />
                      Dashboard
                    </button>
                    
                  </Link>
                  <UserButton/>
                </SignedIn>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative overflow-hidden py-12 sm:py-20 px-4 sm:px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/10 to-transparent"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 sm:mb-6 px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-emerald-900/50 border border-emerald-800 text-emerald-400 text-xs sm:text-sm"
            >
              AI-Powered Medical Diagnosis
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-b from-neutral-100 to-neutral-300 bg-clip-text text-transparent"
            >
              Your Personal AI <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">Medical Assistant</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-neutral-400 max-w-3xl mb-8 sm:mb-10"
            >
              Describe your symptoms, get connected with specialized doctors, and receive personalized care through natural voice conversations.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-12 sm:mb-16 w-full sm:w-auto"
            >
              <Link href="/dashboard" className="w-full sm:w-auto no-underline">
                <button className="
                  px-6 py-3 sm:px-8 sm:py-4 
                  rounded-xl
                  bg-gradient-to-r from-emerald-500 to-teal-600
                  text-white font-medium text-base sm:text-lg md:text-xl
                  hover:bg-gradient-to-r hover:from-emerald-600 hover:to-teal-700
                  shadow-lg hover:shadow-emerald-500/30
                  transition-all duration-200
                  flex items-center justify-center gap-2
                  cursor-pointer
                  w-full
                ">
                  Try Dr. Dialog
                  <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-xl"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="relative z-10 p-1">
              <div className="flex items-center gap-2 p-2 sm:p-3 bg-neutral-800 rounded-t-lg sm:rounded-t-xl">
                <div className="size-2 sm:size-3 rounded-full bg-red-500"></div>
                <div className="size-2 sm:size-3 rounded-full bg-yellow-500"></div>
                <div className="size-2 sm:size-3 rounded-full bg-green-500"></div>
              </div>
              <div className="p-4 sm:p-6 md:p-10">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="size-8 sm:size-10 rounded-full bg-emerald-900/50 border border-emerald-800 flex items-center justify-center text-emerald-400">
                    <FiUser className="text-sm sm:text-base" />
                  </div>
                  <div className="flex-1 bg-neutral-800 rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <p className="text-sm sm:text-base text-neutral-300">I've been having persistent headaches and dizziness for the past 3 days, especially when I stand up quickly. Sometimes I feel nauseous too.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4 mt-4 sm:mt-6">
                  <div className="size-8 sm:size-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <FiMessageSquare className="text-sm sm:text-base" />
                  </div>
                  <div className="flex-1 bg-gradient-to-br from-emerald-900/50 to-teal-900/50 border border-emerald-800/50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <p className="text-sm sm:text-base text-neutral-100">Based on your symptoms, I recommend consulting with a neurologist. Your symptoms could indicate several conditions including migraine, low blood pressure, or other neurological issues.</p>
                    <div className="mt-3 sm:mt-4 flex flex-wrap gap-1 sm:gap-2">
                      <button className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-emerald-900/70 border border-emerald-800 text-xs text-emerald-400">Neurology</button>
                      <button className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-emerald-900/70 border border-emerald-800 text-xs text-emerald-400">Migraine</button>
                      <button className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-emerald-900/70 border border-emerald-800 text-xs text-emerald-400">Vertigo</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-3 sm:p-4 bg-neutral-800 rounded-b-lg sm:rounded-b-xl border-t border-neutral-700 flex items-center">
                <input
                  type="text"
                  placeholder="Describe your symptoms or ask a question..."
                  className="flex-1 bg-neutral-900 rounded-lg px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base text-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
                <button className="ml-2 p-1.5 sm:p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition-colors">
                  <FiMic className="text-white text-sm sm:text-base" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="how-it-works" className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4"
            >
              How <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">Dr. Dialog</span> Works
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg sm:text-xl text-neutral-400 max-w-3xl mx-auto"
            >
              Get accurate medical advice in just a few simple steps.
            </motion.p>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 h-full w-px bg-gradient-to-b from-transparent via-emerald-500 to-transparent md:left-1/2"></div>

            <div className="grid md:grid-cols-2 gap-8 sm:gap-10">
              {[
                {
                  step: "1",
                  title: "Describe Your Symptoms",
                  description: "Tell Dr. Dialog about your symptoms, either by typing or through natural voice conversation.",
                  icon: <FiMic className="text-emerald-400" />
                },
                {
                  step: "2",
                  title: "AI Analysis",
                  description: "Our AI cross-references your symptoms with medical databases to identify potential conditions.",
                  icon: <FiMessageSquare className="text-emerald-400" />
                },
                {
                  step: "3",
                  title: "Doctor Matching",
                  description: "Get connected with the most appropriate medical specialist for your condition.",
                  icon: <FiUser className="text-emerald-400" />
                },
                {
                  step: "4",
                  title: "Personalized Report",
                  description: "Receive a comprehensive report with diagnosis, treatment options, and next steps.",
                  icon: <FiCheck className="text-emerald-400" />
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative ${index % 2 === 0 ? 'md:text-right' : 'md:ml-auto md:pl-10'}`}
                >
                  <div className={`flex ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} gap-3 sm:gap-4`}>
                    <div className="flex-shrink-0 size-10 sm:size-12 rounded-full bg-emerald-900/50 border border-emerald-800 flex items-center justify-center text-emerald-400">
                      {item.icon}
                    </div>
                    <div className={`${index % 2 === 0 ? 'md:mr-3 sm:md:mr-4' : 'md:ml-3 sm:md:ml-4'}`}>
                      <div className="text-xs font-medium text-emerald-400 mb-1">STEP {item.step}</div>
                      <h3 className="text-lg sm:text-xl font-medium mb-1 sm:mb-2">{item.title}</h3>
                      <p className="text-sm sm:text-base text-neutral-400">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-emerald-900/30 to-teal-300/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6"
          >
            Ready to Experience <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">AI-Powered</span> Healthcare?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg sm:text-xl text-neutral-300 mb-8 sm:mb-10"
          >
            Join thousands of patients who trust Dr. Dialog for accurate medical advice and specialist connections.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
          >
            <Button className="
              px-6 py-3 sm:px-8 sm:py-4 rounded-xl
              bg-gradient-to-r from-emerald-500 to-teal-600
              text-white font-medium
              hover:bg-gradient-to-r hover:from-emerald-600 hover:to-teal-700
              transition-all
              shadow-md hover:shadow-lg
              transform hover:scale-105
              active:scale-95
              focus-visible:ring-2 focus-visible:ring-emerald-500
              h-auto
              cursor-pointer
              text-sm sm:text-base
            ">
              Get Started for Free
            </Button>

            <Button variant="outline" className="
              px-6 py-3 sm:px-8 sm:py-4 rounded-xl
              bg-neutral-900 hover:bg-neutral-800
              border border-neutral-700
              text-neutral-200 hover:text-white
              font-medium
              transition-all
              shadow-sm hover:shadow-md
              transform hover:scale-105
              active:scale-95
              focus-visible:ring-2 focus-visible:ring-emerald-500
              h-auto
              cursor-pointer
              text-sm sm:text-base
            ">
              Speak to Sales
            </Button>
          </motion.div>
        </div>
      </section>

      <footer className="py-8 sm:py-12 px-4 sm:px-6 border-t border-neutral-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10 mb-8 sm:mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="size-6 sm:size-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <FiMessageSquare className="text-white text-xs sm:text-sm" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                  Dr. Dialog
                </h3>
              </div>
              <p className="text-sm sm:text-base text-neutral-400">
                AI-powered medical assistance that connects you with the right specialists.
              </p>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">Product</h4>
              <ul className="space-y-2 sm:space-y-3">
                <li><a href="#" className="text-xs sm:text-sm text-neutral-400 hover:text-emerald-400 transition-colors">Dashboard</a></li>
                <li><a href="#" className="text-xs sm:text-sm text-neutral-400 hover:text-emerald-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="text-xs sm:text-sm text-neutral-400 hover:text-emerald-400 transition-colors">API</a></li>
                <li><a href="#" className="text-xs sm:text-sm text-neutral-400 hover:text-emerald-400 transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">Company</h4>
              <ul className="space-y-2 sm:space-y-3">
                <li><a href="#" className="text-xs sm:text-sm text-neutral-400 hover:text-emerald-400 transition-colors">About</a></li>
                <li><a href="#" className="text-xs sm:text-sm text-neutral-400 hover:text-emerald-400 transition-colors">Careers</a></li>
                <li><a href="#" className="text-xs sm:text-sm text-neutral-400 hover:text-emerald-400 transition-colors">Privacy</a></li>
                <li><a href="#" className="text-xs sm:text-sm text-neutral-400 hover:text-emerald-400 transition-colors">Terms</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">Contact</h4>
              <ul className="space-y-2 sm:space-y-3">
                <li><a href="#" className="text-xs sm:text-sm text-neutral-400 hover:text-emerald-400 transition-colors">Support</a></li>
                <li><a href="#" className="text-xs sm:text-sm text-neutral-400 hover:text-emerald-400 transition-colors">Sales</a></li>
                <li><a href="#" className="text-xs sm:text-sm text-neutral-400 hover:text-emerald-400 transition-colors">Partnerships</a></li>
                <li><a href="#" className="text-xs sm:text-sm text-neutral-400 hover:text-emerald-400 transition-colors">Press</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-4 sm:pt-6 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs sm:text-sm text-neutral-500 mb-3 sm:mb-0">© 2025 Dr. Dialog. All rights reserved.</p>
            <div className="flex items-center gap-3 sm:gap-4">
              <a href="#" className="text-xs sm:text-sm text-neutral-400 hover:text-emerald-400 transition-colors">Twitter</a>
              <a href="#" className="text-xs sm:text-sm text-neutral-400 hover:text-emerald-400 transition-colors">LinkedIn</a>
              <a href="#" className="text-xs sm:text-sm text-neutral-400 hover:text-emerald-400 transition-colors">Facebook</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}