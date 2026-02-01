import { getBookTitle, getBookAuthor } from "../../api/freebooksApi";

// TODO: replace with your real WhatsApp number in E.164 format without "+"
// Example: +2348160000000 for +234 816 000 0000
export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "2348160000000";

export function buildWhatsAppOrderUrl(book) {
  const title = getBookTitle(book);
  const author = getBookAuthor(book);

  const message = `Hi, I want to order this book.\n\nTitle: ${title}${
    author ? `\nAuthor: ${author}` : ""
  }\n\nPrice: ₦4,000`;

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

export function buildWhatsAppPaymentConfirmationUrl(book, payerName = '{Your Name}', amount) {
  const title = getBookTitle(book);

  // resolve amount: prefer explicit `amount` argument, else try book.price
  let amt = '';
  if (amount !== undefined && amount !== null && amount !== '') {
    amt = amount;
  } else if (book && book.price !== undefined && book.price !== null) {
    if (typeof book.price === 'object') {
      amt = book.price.amount ?? book.price.value ?? book.price.price ?? '';
    } else {
      amt = book.price;
    }
  }

  const cleanName = (payerName || '{Your Name}').trim() || '{Your Name}';
  const amountText = amt === '' ? '₦{Amount}' : (typeof amt === 'number' ? `₦${amt}` : `₦${amt}`);

  const message = `Hello 👋\n\nMy name is ${cleanName}.\n\nI have completed payment of ${amountText} for the book "${title}".\n\nPlease confirm my payment. I have attached my proof of payment here.\n\nThank you.`;

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}
