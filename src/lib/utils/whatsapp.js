import { getBookTitle, getBookAuthor } from "../../api/freebooksApi";

// TODO: replace with your real WhatsApp number in E.164 format without "+"
// Example: +234 816 000 0000 -> "2348160000000"
const WHATSAPP_NUMBER = "2348160000000";

export function buildWhatsAppOrderUrl(book) {
  const title = getBookTitle(book);
  const author = getBookAuthor(book);

  const message = `Hi, I want to order this book.\n\nTitle: ${title}${
    author ? `\nAuthor: ${author}` : ""
  }\n\nPrice: ₦4,000`;

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}
