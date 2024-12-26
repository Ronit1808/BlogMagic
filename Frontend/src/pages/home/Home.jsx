import React from 'react'
import HeroSection from './HeroSection'
import FeaturesSection from './FeaturesSection'
import DescriptionSection from './DescriptionSection'

const Home = () => {
  return (
    <div className='mt-14 sm:mt-24'>
        <HeroSection/>
        <FeaturesSection/>
        <DescriptionSection/>
    
    </div>
  )
}

export default Home