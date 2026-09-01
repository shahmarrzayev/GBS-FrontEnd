import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import ScrollToTop from '../components/ScrolToTop/ScrolToTop'
import GlobalProvider from '../context/GlobalProvider'

const ClientRoot = () => {
  return (
    <GlobalProvider>
    <Header/>
    <Outlet />
    <Footer/>
    <ScrollToTop/>
    </GlobalProvider>
  )
}

export default ClientRoot
