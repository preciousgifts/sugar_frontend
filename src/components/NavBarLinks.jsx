import {React, useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import logo from "../assets/sugarLogo.png";
import { IoIosSearch, IoIosArrowForward} from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";


function NavBarLinks() {
  const [scrolled, setScrolled] = useState(false);
    
    useEffect(() => {
      const handleScroll = () => {
        if(window.scrollY > 50) {
          setScrolled(true)
        } else {
          setScrolled(false)
        }
    }; 
  
      window.addEventListener("scroll", handleScroll);
      return() => window.removeEventListener("scroll", handleScroll);
    }, []);


  return (
    <div className=  {`navbarmain d-flex gap-5 justify-content-around container-fluid navbar-links font-1 ${scrolled ? "scrolled" : ""}`}>
        <div className="logo d-flex gap-2 align-items-center">
          <Link to="/" className=""><img src={logo} alt="" className="img-fluid w-100 h-100 object-fit-cover"/></Link> 
          <h2 className=" font-2">SUGAR</h2>
        </div>

        <div className=' navbar-expand-sm d-flex gap-3 d-none d-sm-flex align-items-center'>
          <Link to='/collections/new-collections' className=' nav-link navbar-nav dropdown-toggle no-caret' role='button'>NEW</Link>
        
          <li className='nav-item navbar-nav dropdown'>
            <Link to='/collections/lips' className='nav-link dropdown-toggle no-caret ' role='button'>LIPS</Link>
            <ul className='dropdown-menu'>
              <li className='dropdown-submenu'><Link className='d-flex justify-content-between align-items-center dropdown-item dropdown-toggle no-caret' to='/collections/lipsticks'>LIPSTICKS   <IoIosArrowForward/></Link>
                <ul className='dropdown-menu' >
                  <li><Link className='dropdown-item' to='/collections/transfer-proof-lipsticks'>TRANSFER PROOF LIPSTICKS</Link></li>
                  <li><Link className='dropdown-item' to='/collections/matte-lipstick'>MATTE LIPSTICKS</Link></li>
                  <li><Link className='dropdown-item' to='/collections/liquid-lipstick'>LIQUID LIPSTICKS</Link></li>
                  <li><Link className='dropdown-item' to='/collections/powder-lipstick'>POWDER LIPSTICKS</Link></li>
                  <li><Link className='dropdown-item' to='/collections/crayon-lipstick'>CRAYON LIPSTICKS</Link></li>
                  <li><Link className='dropdown-item' to='/collections/bullet-lipstick'>BULLET LIPSTICKS</Link></li>
                  <li><Link className='dropdown-item' to='/collections/lipgloss-and-liners'>LIP GLOSS & LINERS</Link></li>
                </ul>
              </li>

              <li className='dropdown-submenu'><Link className='d-flex justify-content-between align-items-center dropdown-item dropdown-toggle no-caret' to='/collections/lipsstick-sets-and-combos'>LIPSTICK SETS & COMBOS <IoIosArrowForward/></Link>
                <ul className='dropdown-menu'>
                  <li><Link className='dropdown-item' to='/collections/lipstick-set'>LIPSTICK SETS</Link></li>
                </ul>
              </li>
            </ul>
          </li>

          <li className='nav-item navbar-nav dropdown'>
            <Link to='/collections/eyes' className='nav-link dropdown-toggle no-caret' role='button'>EYES</Link>
            <ul className='dropdown-menu'>
              <li className='dropdown-submenu'><Link className='d-flex justify-content-between align-items-center dropdown-item dropdown-toggle no-caret' to='/collections/lipsticks'>KOHL & KAJAL <IoIosArrowForward/></Link>
                <ul className='dropdown-menu'>
                  <li><Link className='dropdown-item' to='/collections/transfer-proof-lipsticks'>KOHLS</Link></li>
                  <li><Link className='dropdown-item' to='/collections/matte-lipstick'>KAJAL</Link></li>
                </ul>
              </li>

              <li className='dropdown-submenu'><Link className='d-flex justify-content-between align-items-center dropdown-item dropdown-toggle no-caret' to='/collections/lipsstick-sets-and-combos'>EYELINER <IoIosArrowForward/></Link>
                <ul className='dropdown-menu'>
                  <li><Link className='dropdown-item' to='/collections/lipstick-set'>LIQUID EYELINER</Link></li>
                  <li><Link className='dropdown-item' to='/collections/lipstick-set'>PEN EYELINER</Link></li>
                  <li><Link className='dropdown-item' to='/collections/lipstick-set'>GEL EYELINER</Link></li>
                  <li><Link className='dropdown-item' to='/collections/lipstick-set'>MAGNETIC EYELASHES</Link></li>
                </ul>
              </li>

              <li className='dropdown-submenu'><Link className='d-flex justify-content-between align-items-center dropdown-item dropdown-toggle no-caret' to='/collections/lipsstick-sets-and-combos'>MASCARA <IoIosArrowForward/></Link>
                <ul className='dropdown-menu'>
                  <li><Link className='dropdown-item' to='/collections/lipstick-set'>VOLUMIZING MASCARA</Link></li>
                </ul>
              </li>

              <li className='dropdown-submenu'><Link className='d-flex justify-content-between align-items-center dropdown-item dropdown-toggle no-caret' to='/collections/lipsstick-sets-and-combos'>EYEBROW <IoIosArrowForward/></Link>
                <ul className='dropdown-menu'>
                  <li><Link className='dropdown-item' to='/collections/lipstick-set'>BROW DEFINER</Link></li>
                </ul>
              </li>
            </ul>
          </li>

          <li className='nav-item navbar-nav dropdown'>
            <Link to='/collections/eyes' className='nav-link dropdown-toggle no-caret' role='button'>FACE</Link>
            <ul className='dropdown-menu'>
              <li className='dropdown-submenu'><Link className='d-flex justify-content-between align-items-center dropdown-item dropdown-toggle no-caret' to='/collections/lipsticks'>FOUNDATION & BB CREAM <IoIosArrowForward/></Link>
                <ul className='dropdown-menu'>
                  <li><Link className='dropdown-item' to='/collections/transfer-proof-lipsticks'>STICK FOUNDATION</Link></li>
                  <li><Link className='dropdown-item' to='/collections/matte-lipstick'>LIQUID FOUNDATION</Link></li>
                  <li><Link className='dropdown-item' to='/collections/matte-lipstick'>BB CREAM</Link></li>
                </ul>
              </li>

              <li className='dropdown-submenu'><Link className='d-flex justify-content-between align-items-center dropdown-item dropdown-toggle no-caret' to='/collections/lipsstick-sets-and-combos'>COMPACTS & FIXERS <IoIosArrowForward/></Link>
                <ul className='dropdown-menu'>
                  <li><Link className='dropdown-item' to='/collections/lipstick-set'>SETTING SPRAY</Link></li>
                  <li><Link className='dropdown-item' to='/collections/lipstick-set'>LOOSE POWDER</Link></li>
                  <li><Link className='dropdown-item' to='/collections/lipstick-set'>COMPACT</Link></li>
                </ul>
              </li>

              <li className='dropdown-submenu'><Link className='d-flex justify-content-between align-items-center dropdown-item dropdown-toggle no-caret' to='/collections/lipsstick-sets-and-combos'>BLUSH <IoIosArrowForward/> </Link>
                <ul className='dropdown-menu'>
                  <li><Link className='dropdown-item' to='/collections/lipstick-set'>FACE BLUSH</Link></li>
                </ul>
              </li>

              <li className='dropdown-submenu'><Link className='d-flex justify-content-between align-items-center dropdown-item dropdown-toggle no-caret' to='/collections/lipsstick-sets-and-combos'>PALETTES <IoIosArrowForward/></Link>
              </li>

              <li className='dropdown-submenu'><Link className='d-flex justify-content-between align-items-center dropdown-item dropdown-toggle no-caret' to='/collections/lipsstick-sets-and-combos'>CONCEALER & CORRECTORS <IoIosArrowForward/></Link>
                <ul className='dropdown-menu'>
                  <li><Link className='dropdown-item' to='/collections/lipstick-set'>COLOUR CORRECTIORS</Link></li>
                </ul>
              </li>

              <li className='dropdown-submenu'><Link className='dropdown-item dropdown-toggle no-caret' to='/collections/lipsstick-sets-and-combos'>BRONZER & CONTOUR </Link>
              </li>

              <li className='dropdown-submenu'><Link className='d-flex justify-content-between align-items-center dropdown-item dropdown-toggle no-caret' to='/collections/lipsstick-sets-and-combos'>PRIMER <IoIosArrowForward/></Link>
                <ul className='dropdown-menu'>
                  <li><Link className='dropdown-item' to='/collections/lipstick-set'>TRANSLUCENT PRIMERS</Link></li>
                </ul>
              </li>

              <li className='dropdown-submenu'><Link className='dropdown-item dropdown-toggle no-caret' to='/collections/lipsstick-sets-and-combos'>HIGHLIGHTERS </Link>
              </li>
            </ul>
          </li>

          <Link to='/collections/new-collections' className='nav-link navbar-nav dropdown-toggle no-caret' role='button'>NAILS</Link>

          <li className='nav-item navbar-nav dropdown'>
            <Link to='/collections/eyes' className='nav-link dropdown-toggle no-caret' role='button'>SKIN</Link>
            <ul className='dropdown-menu'>
              <li className='dropdown-submenu'><Link className='d-flex justify-content-between align-items-center dropdown-item dropdown-toggle no-caret' to='/collections/lipsticks'>MOISTURIZERS & SUNSCREENS <IoIosArrowForward/></Link>
                <ul className='dropdown-menu'>
                  <li><Link className='dropdown-item' to='/collections/transfer-proof-lipsticks'>MOISTURIZERS</Link></li>
                  <li><Link className='dropdown-item' to='/collections/matte-lipstick'>SUNSCREENS</Link></li>
                </ul>
              </li>

              <li className='dropdown-submenu'><Link className='dropdown-item dropdown-toggle no-caret' to='/collections/lipsstick-sets-and-combos'>MISTS & HYDRATING STICKS</Link></li>

              <li className='dropdown-submenu'><Link className='dropdown-item dropdown-toggle no-caret' to='/collections/lipsstick-sets-and-combos'>SKINCARE RANGES</Link></li>

              <li className='dropdown-submenu'><Link className='dropdown-item dropdown-toggle no-caret' to='/collections/lipsstick-sets-and-combos'>MASKS & SERUMS</Link></li>

              <li className='dropdown-submenu'><Link className='dropdown-item dropdown-toggle no-caret' to='/collections/lipsstick-sets-and-combos'>LIP & EYE CARE</Link></li>

              <li className='dropdown-submenu'><Link className='dropdown-item dropdown-toggle no-caret' to='/collections/lipsstick-sets-and-combos'>CLEANSERS & EXFOLIATORS</Link></li>

              <li className='dropdown-submenu'><Link className='dropdown-item dropdown-toggle no-caret' to='/collections/lipsstick-sets-and-combos'>CLEANERS</Link></li>

              <li className='dropdown-submenu'><Link className='dropdown-item dropdown-toggle no-caret' to='/collections/lipsstick-sets-and-combos'>EXFOLIATION</Link></li>
            </ul>
          </li>

          <li className='nav-item navbar-nav dropdown'>
            <Link to='/collections/eyes' className='nav-link dropdown-toggle no-caret' role='button'>GIFTING</Link>
            <ul className='dropdown-menu'>
              <li className='dropdown-submenu'><Link className='dropdown-item dropdown-toggle no-caret' to='/collections/lipsticks'>LIPSTICK SETS</Link></li>

              <li className='dropdown-submenu'><Link className='dropdown-item dropdown-toggle no-caret' to='/collections/lipsstick-sets-and-combos'>SUGAR Merch</Link></li>

              <li className='dropdown-submenu'><Link className='dropdown-item dropdown-toggle no-caret' to='/collections/lipsstick-sets-and-combos'>VALUE SETS</Link></li>

              <li className='dropdown-submenu'><Link className='dropdown-item dropdown-toggle no-caret' to='/collections/lipsstick-sets-and-combos'>MAKEUP KITS</Link></li>

              <li className='dropdown-submenu'><Link className='dropdown-item dropdown-toggle no-caret' to='/collections/lipsstick-sets-and-combos'>SUGAR SETS</Link></li>
            </ul>
          </li>

          <li className='nav-item navbar-nav dropdown'>
            <Link to='/collections/eyes' className='nav-link dropdown-toggle no-caret' role='button'>SUGAR POP</Link>
            <ul className='dropdown-menu'>
              <li className='dropdown-submenu'><Link className='dropdown-item dropdown-toggle no-caret' to='/collections/lipsticks'>LIPS</Link></li>

              <li className='dropdown-submenu'><Link className='dropdown-item dropdown-toggle no-caret' to='/collections/lipsstick-sets-and-combos'>EYES</Link></li>

              <li className='dropdown-submenu'><Link className='dropdown-item dropdown-toggle no-caret' to='/collections/lipsstick-sets-and-combos'>FACE</Link></li>

              <li className='dropdown-submenu'><Link className='dropdown-item dropdown-toggle no-caret' to='/collections/lipsstick-sets-and-combos'>NAILS</Link></li>

              <li className='dropdown-submenu'><Link className='dropdown-item dropdown-toggle no-caret' to='/collections/lipsstick-sets-and-combos'>BEST OF SUGAR POP</Link></li>

              <li className='dropdown-submenu'><Link className='dropdown-item dropdown-toggle no-caret' to='/collections/lipsstick-sets-and-combos'>VIEW ALL</Link></li>
            </ul>
          </li>

          <Link to='/collections/new-collections' className='nav-link navbar-nav dropdown-toggle no-caret' role='button'>SUGAR PLAY</Link>

          <Link to='/collections/new-collections' className='nav-link navbar-nav dropdown-toggle no-caret' role='button'>OFFERS</Link>
        
        </div>

        <div className="d-flex gap-4 align-items-center">
          <Link to="/home" className="text-black "><IoIosSearch/></Link>
          <Link to="/profile" className="text-black "><FaUser/>  </Link> 
          <Link to="/cart" className="text-black"><BsCart3/> </Link> 
        </div>     
      </div>
  )
}

export default NavBarLinks
