import React, { useEffect, useState } from "react";
import "./Header.scss";
import fallbackLogo from "../../assets/gbsLogo.png";
import { NavLink } from "react-router-dom";
import { useGlobal } from "../../context/globalContext";
const Header = () => {
  const { global } = useGlobal();
     const [scrollNavbar, setScrollNavbar] = useState(false);
     useEffect(()=>{
        const handleScroll = () => { 
          if (window.scrollY > 100) {
            setScrollNavbar(true);
          } else {
            setScrollNavbar(false);
          }
        };
    window.addEventListener('scroll', handleScroll);
  },[])
  return (
    <header className={scrollNavbar?"desktobHeader navSticky":" desktobHeader"} >
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="col-2">
            <div className="logo">
              <img src={global?.logo || fallbackLogo} alt={global?.siteName || ""} />
            </div>
          </div>
          <div className="col-7">
            <div className="navLinks">
              <ul>
                <li>
                  <NavLink  to="/" 
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >Home</NavLink>

                </li>
                <li>
                  <NavLink  to="/product" 
                    className={({ isActive }) => (isActive ? "active" : "")}>Products</NavLink>
                </li>
                <li>
                  <NavLink  to="/project" 
                    className={({ isActive }) => (isActive ? "active" : "")}>Projects</NavLink>
                </li>
                <li>
                  <NavLink  to="/about" 
                    className={({ isActive }) => (isActive ? "active" : "")}>About</NavLink>
                </li>
                <li>
                  <NavLink  to="/contact" 
                    className={({ isActive }) => (isActive ? "active" : "")}>Contact Us</NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-2">
            <div className="navInfo">
              {global?.phoneNumber && (
                <a href={`tel:${global.phoneNumber.replace(/\s+/g, "")}`}>
                  <span>{global.phoneNumber}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
