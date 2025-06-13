import Header from '@/components/shared/header';
import Footer from '@/components/footer';
import { Toaster } from 'sonner'; // ✅ Import Sonner's Toaster

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex h-screen flex-col'>
      <Header />
      <main className='flex-1 wrapper'>{children}</main>
      <Footer />

      {/* ✅ Sonner toaster goes here */}
      <Toaster richColors closeButton position="top-right" />
    </div>
  );
}
