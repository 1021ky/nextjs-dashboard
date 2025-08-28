// app直下のlayout.tsxがRoot layoutと呼ばれ、必ず存在する
import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import Link from 'next/link'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <nav>
          {/* Prefetched when the link is hovered or enters the viewport */}
          <Link href="/blog">Blog</Link>
          {/* No prefetching */}
          <a href="/contact">Contact</a>
        </nav>
        {children}</body>
    </html>
  );
}