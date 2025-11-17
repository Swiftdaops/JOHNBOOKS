 
import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

function Hero() {
  return (
    <section className=" ">
      
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        className="relative overflow-hidden rounded-3xl px-4 py-4 shadow-sm sm:px-6 sm:py-5"
      >
        
        <div className="pointer-events-none absolute -left-10 -top-16 h-32 w-32 rounded-full blur-2xl" />
        <div className="pointer-events-none absolute -right-10 -bottom-12 h-40 w-40 rounded-full  blur-2xl" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ">
          
          

            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl font-semibold leading-tight tracking-tight sm:text-2xl"
            >
              Find Rare Books
              <span className="bg-linear-to-r bg-clip-text text-transparent">
                {' '}on your phone
              </span>
              .
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="max-w-md text-[12px] leading-relaxed"
            >
              Here at JohnBooks we only sell unique, hard-to-find titles approved and used by many universities across Nigeria.
            </motion.p>

            
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-2 pt-1"
            >
             
            </motion.div>
          </div>
        </motion.div>
    </section>
  );
}

export default Hero;
