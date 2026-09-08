// frontend/src/app/cart/page.tsx

/**
 * The cart became the quote list when we moved to a quotation flow.
 * This redirect keeps any old links, bookmarks and search results working.
 */

import { redirect } from 'next/navigation';

export default function CartPage() {
  redirect('/quote');
}
