import Footer from './components/Footer'
import Navbar from './components/Navbar'
import './globals.css'


export const metadata = {
  title: 'Dr. Mind - Psychology & Mental Wellness',
  description: 'Professional psychology services for mental wellness and personal growth',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0D0D0D] text-[#F5F5F5] font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}