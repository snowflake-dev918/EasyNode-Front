import React, { useState } from 'react';
// import menu from './new_menu.json';
import styled from 'styled-components';
import { NavLink, Link } from "react-router-dom";
import ConnectButton from '../ConnectButton/ConnectButton';
import logoImage from '../../assets/image/logo.png';
import { useEffect } from 'react';

const Header = (props: PropsType) => {
 
  const [isExpanded, setExpand] = useState(false);
  const [activeMenuIndex, setActiveMenuIndex] = useState(-1);
  const menu:any[] = [];

  useEffect(() => {
    window.addEventListener('click', (e) =>{
      e.preventDefault();
      setExpand(false);
    });
  }, []);

  const isMobile = window.innerWidth < 567;
  const handleToggle = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setExpand(!isExpanded);
  }

  const onHoverLink = (index: number) => {
    setActiveMenuIndex(index);
  }

  return (
    <MenuBar>
      <Navigation className="navigation-layout" onMouseLeave={() => setActiveMenuIndex(-1)}>
        <Logo>
          <Link to="/">
            <Image src={logoImage}/>
          </Link>
        </Logo>
        <nav className="nav" >
          <i
            className="fa fa-bars"
            aria-hidden="true"
            onClick={e => handleToggle(e)}
          />
          <ul className={`collapsed ${isExpanded ? "is-expanded" : ""}`} >
            {
              menu.map((item, index) => (
                  <NavLink to={item.link} key={index} className="nav-link-item active" onMouseEnter={() => onHoverLink(index)} >
                    <li>{item.title}</li>
                    {
                      item.submenu && item.submenu.length > 0 && (
                        <SubMenu className={`sub-menu ${activeMenuIndex === index ? 'active' : ''}`}>
                          {item.submenu.map((subItem:any) => (
                            <NavLink className="sub-menu-item" to={subItem.link}>{subItem.title}</NavLink>
                          ))}
                        </SubMenu>
                      )
                    }
                  </NavLink>
              ))
            }
            <div className="connect-btn-wrapper">
              <ConnectButton />
            </div>
          </ul>
        </nav>
      </Navigation>
    </MenuBar>
  )
}

export default Header;

interface PropsType {

}

const MenuBar = styled.div`
    display: flex;
    margin: 0 auto;
    align-items: center;
    width: 100%;
    justify-content: center;
    position: fixed;
    top: 0;
    z-index: 2;
    background: var(--active-color);
    backdrop-filter: blur(3px);
    margin: 0 auto;
    .nav-link-item {
      position: relative;
      font-size: 20px;
    }
    border-color: #3b3d76!important;
    border-bottom: 1px solid;

    .navigation-layout {
      max-width: var(--max-width);
    }
`;

const SubMenu = styled.div`
    position: absolute;
    background: var(--primary-color);
    flex-direction: column;
    display: none;
    &.active {
      display: flex;
    }
    gap: 8px;
    left: 0;
    border: none;
    border-radius: 10px;
    box-shadow: 0 4px 14px 6px rgb(0 0 0 / 25%);
    top: 150.5%;
    padding: 8px 15px;
    font-size: 16px;
    .sub-menu-item {
      background-color: transparent;
      border: 0;
      clear: both;
      color: #f2f2f2;
      display: block;
      font-weight: 400;
      padding: 0.25rem 1rem;
      text-align: inherit;
      text-decoration: none;
      white-space: nowrap;
      width: 100%;
    }
`;

const Logo = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    a {
      display: flex;
      clear: both;
      align-items: center;
      text-decoration: none;
      color: white;
      opacity: 1 !important;
      font-size: 1.5em !important;
    }
    @media(max-width: 991px) {
      margin-right: 70px;
      display: none;
    }
`;

const Navigation = styled.header`
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  background: transparent;
  padding: 0 5%;  
  a.button-link, .connect-btn-wrapper {
    opacity: 1 !important;
    margin-left: 30px;
    @media(max-width: 991px) {
      margin-left: 0;
    }
  }
  .gray {
    color: #ccc;
  }
  a {
    color: white;
    opacity: 0.55;
    transition: all 0.6s;
    color: white;
    font-size: 1.4vw;
    @media(min-width: 1400px) {
      font-size: 18px;
    }
    @media(max-width: 991px) {
      font-size: 1em;
    }
  }
  a:hover {
    opacity: 1;
  }
  .fa-bars {
    display: none;
    color: white;
    font-size: 2rem;
  }
  nav {
    ul {
      display: flex;
      justify-content: space-between;
      align-items: center;
      list-style: none;
      margin: 0;
    }
    li {
      margin: 0 15px;
      justify-content: space-between;
    }
    a {
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Poppins';
      .active {
        color: tomato;
      }
    }
    a.active {
      color: white;
      opacity: 1;
    }
    @media(max-width: 991px) {
      justify-content: center;
      display: flex;
      align-items: center;
      width: 100%;
      flex-direction: column;
      ul {
        margin: 0!important;
        padding: 0px;
      }
    }
  }

  @media only screen and (max-width: 991px) {
    height: auto;
    min-height: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 20px;
    .logo {
      width: 100%;
      display: block;
      padding-top: 20px;
      margin: 0px;
      margin-left: -5px;
      a {
        padding: 20px 0px;
      }
    }
    .fa-bars {
      display: inline-block;
      cursor: pointer;
    }
    ul.collapsed {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      overflow: hidden;
      max-height: 0;
      -moz-transition-duration: 0.4s;
      -webkit-transition-duration: 0.4s;
      -o-transition-duration: 0.4s;
      transition-duration: 0.4s;
      -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
      -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
      -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
      transition-timing-function: cubic-bezier(0, 1, 0.5, 1);

      &.is-expanded {
        overflow: hidden;
        max-height: 500px; /* approximate max height */
        -moz-transition-duration: 0.4s;
        -webkit-transition-duration: 0.4s;
        -o-transition-duration: 0.4s;
        transition-duration: 0.4s;
        -moz-transition-timing-function: ease-in;
        -webkit-transition-timing-function: ease-in;
        -o-transition-timing-function: ease-in;
        transition-timing-function: ease-in;
      }
      li {
        padding: 10px 10px;
        margin: 0px 0px;
        width: 100%;
      }
    }
  }
`;
const Image = styled.img`
  height: 56px;
  width: auto;
`;

const Button = styled.button`
    width: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1c3862;
    padding: 20px;
    color: white;
    font-size: 18px;
    font-family: 'Poppins';
    position: relative;
    border: 2px solid transparent;
    border-radius: 16px;
    background-clip: padding-box;
    padding: 10px;
    cursor: pointer;
    @media(max-width: 991px) {
        padding: 5px;
        width: 100px;
        font-size: 16px;
        border-radius: 12px;
    }
    &: hover {
        color: #bbabff
    }
    &:after {
        position: absolute;
        top: -2px; bottom: -2px;
        left: -2px; right: -2px;
        background: linear-gradient(#6A4EE8, #FF9B63);
        content: '';
        z-index: -1;
        border-radius: 16px;
        @media(max-width: 991px) {
            border-radius: 12px;
        }
    }
`