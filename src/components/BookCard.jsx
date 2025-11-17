 
import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { getBookTitle, getBookAuthor, getCoverImage } from "../api/freebooksApi";
import { buildWhatsAppOrderUrl } from "../lib/utils/whatsapp";

function BookCard({ book, index }) {
  const title = getBookTitle(book);
  const author = getBookAuthor(book);
  const cover = getCoverImage(book);
  const year = book.year;
  const buyUrl = buildWhatsAppOrderUrl(book);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.03, type: "spring", stiffness: 120, damping: 18 }}
    >
      <Card className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white/90 shadow-sm">
        <CardHeader className="p-0">
          <div className="relative aspect-3/4 overflow-hidden bg-slate-100">
            {cover ? (
              <img
                src={cover}
                alt={title}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-[11px] text-gray-400">
                No cover image
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-1 px-3 pt-3">
          <h3 className="line-clamp-2 text-[13px] font-semibold leading-snug">
            {title}
          </h3>
          {author && (
            <p className="text-[11px] text-gray-500">
              {author} {year && <span>• {year}</span>}
            </p>
          )}
          <p className="mt-1 text-[11px] font-medium text-emerald-700">
            Rare pick • ₦4,000
          </p>
        </CardContent>
        <CardFooter className="px-3 pb-3 pt-1">
          <Button
            asChild
            className="h-14 w-full rounded-xl  text-[14px] font-medium shadow-sm hover:bg-emerald-700 flex items-center justify-center text-green-950 border-2 border-red-950"
          >
            <a href={buyUrl} target="_blank" rel="noopener noreferrer">
              Buy on WhatsApp
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default BookCard;
