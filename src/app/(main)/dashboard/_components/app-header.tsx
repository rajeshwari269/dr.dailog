"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaBriefcaseMedical } from "react-icons/fa";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

const AppHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "History", href: "/history" },
    { name: "Pricing", href: "/pricing" },
    { name: "Profile", href: "/profile" },
  ];

  return (
    <nav className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-neutral-800 bg-neutral-950">
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

      <div className="hidden md:flex items-center gap-9">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="hover:text-emerald-400 hover:font-bold transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
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

        <UserButton afterSignOutUrl="/" />
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-16 left-0 right-0 bg-neutral-900 border-b border-neutral-800 z-50"
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default AppHeader;