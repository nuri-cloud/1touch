import React from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import Banner from '../../components/banner/Banner'
import Ourtariffs from '../../components/ourtariffs/ourtariffs'
import HowItWorks from '../../components/howItwork/HowItWork'
import WhyChooseUs from '../../components/whychooseus/WhyChooseUs'
import AppDownload from '../../components/App/AppDownland'
import Features from '../../components/featutes/Features'
import Problems from '../../components/problem/Problem'
function Home() {
  return (
    <div>
      <Banner/>
      <Problems/>
      <Features/>
      <HowItWorks/>
      <WhyChooseUs/>
      <Ourtariffs/>
      <AppDownload/>
      </div>
  )
}

export default Home
