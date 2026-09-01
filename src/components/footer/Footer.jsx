import React from 'react';
import './Footer.scss';
import fallbackLogo from '../../assets/gbsLogo.png'
import { NavLink } from 'react-router-dom';
import LocationIcon from '../../assets/icons/LocationIcon';
import EmailIcon from '../../assets/icons/EmailIcon';
import PhoneIcon from '../../assets/icons/PhoneIcon';
import InstagramIcon from '../../assets/icons/InstagramIcon';
import FaceBookIcon from '../../assets/icons/FacebookIcon';
import WhatsappIcon from '../../assets/icons/WhatsappIcon';
import LinkedinIcon from '../../assets/icons/LinkedinIcon';
import { useGlobal } from '../../context/globalContext';

const SOCIAL_ICONS = {
  instagram: InstagramIcon,
  facebook: FaceBookIcon,
  whatsapp: WhatsappIcon,
  linkedin: LinkedinIcon,
};

const Footer = () => {
  const { global } = useGlobal();

  return (
   <footer>
    <div className="container py-4">
      <div className="row  justify-content-between">
        <div className="col-lg-4">
          <div className="footerLogo">
            <img src={global?.logo || fallbackLogo} alt={global?.siteName || ''} />

            <p>{global?.footerDescription}</p>
          </div>
        </div>
        <div className="col-lg-2">
            <h3 className='footerLinksHeader'>Navigation</h3>
          <ul className="footerLinks">
            <li>
              <NavLink to={'/'}>Home</NavLink>
            </li>
            <li>
              <NavLink to={'/product'}>Products</NavLink>
            </li>
            <li>
              <NavLink to={'/project'}>Projects</NavLink>
            </li>
            <li>
              <NavLink to={'/about'}>About</NavLink>
            </li>
            <li>
              <NavLink to={'/contact'}>Contact</NavLink>
            </li>
          </ul>
        </div>
        <div className="col-lg-4">
            <div className="footerInfo">
              <div className="footerText">
                {global?.address && (
                  <p>
                    <LocationIcon/>
                    <span>{global.address}</span>
                  </p>
                )}
                {global?.email && (
                  <p>
                    <EmailIcon/>
                    <a href={`mailto:${global.email}`}>
                      <span>{global.email}</span>
                    </a>
                  </p>
                )}
                {global?.phoneNumber && (
                  <p>
                    <PhoneIcon/>
                    <a href={`tel:${global.phoneNumber.replace(/\s+/g, '')}`}>
                      <span>{global.phoneNumber}</span>
                    </a>
                  </p>
                )}
              </div>

              <div className="footerSocial">
                <h3>Socials</h3>
                <div className="iconBox">
                 {global?.socialLinks?.map(({ platform, url }) => {
                   const Icon = SOCIAL_ICONS[platform];

                   if (!Icon) return null;
                   return (
                     <a
                       key={platform}
                       className="icon"
                       href={url || '#'}
                       target="_blank"
                       rel="noreferrer"
                     >
                        <Icon/>
                     </a>
                   );
                 })}
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
   </footer>
  )
}

export default Footer
