import React from 'react'
import AboutBanner from './aboutBanner/AboutBanner'
import { getAboutPage } from '../../api'
import { useApi } from '../../hooks/useApi'
import DataState from '../../components/dataState/DataState'

const About = () => {
  const { data, loading, error } = useApi((options) => getAboutPage(options), [])

  return (
<main>
  <DataState loading={loading} error={error}>
    <AboutBanner content={data}/>
  </DataState>
</main>
  )
}

export default About
