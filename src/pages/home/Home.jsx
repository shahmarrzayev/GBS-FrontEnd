import React from 'react'
import Banner from './banner/Banner'
import Overview from './overview/Overview'
import OurProducts from './ourProducts/OurProducts'
import HomeProject from './homeProject/HomeProject'
import SliderComponent from '../../components/sliderComponent/SliderComponent'
import HomeWrapper from './homeWrapper/HomeWrapper'
import { getConsumers, getHomePage, getPartners } from '../../api'
import { useApi } from '../../hooks/useApi'

const Home = () => {
  // The page copy lives in one single type, so it is fetched here and handed
  // down instead of being re-requested by every section.
  const { data: page } = useApi((options) => getHomePage(options), [])
  const { data: partners } = useApi((options) => getPartners(options), [])
  const { data: consumers } = useApi((options) => getConsumers(options), [])

  return (
    <main>
        <Banner content={page}/>
        <Overview content={page}/>
        <OurProducts content={page}/>
        <HomeProject content={page}/>
        <SliderComponent data={partners} title="Our Partners"/>
        <HomeWrapper cards={page?.promoCards}/>
        <SliderComponent data={consumers} title="Our Consumers"/>
    </main>
  )
}

export default Home
