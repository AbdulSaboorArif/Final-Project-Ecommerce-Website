
import Header from '@/components/Header'
import Hero from '@/components/Hero'
// import OurProduct from "@/components/Our-Product"
import BeautifullRoom from '@/components/Beautifullroom'
import Footer from '@/components/Fotter'
import HomeProduct from '@/components/HomeProduct'

export default function Home() {
  return (
    <main className="min-h-screen">
          
      <Header />
      <Hero />
      <HomeProduct/>
      <BeautifullRoom/>
      <Footer/>
    </main>
  )
}