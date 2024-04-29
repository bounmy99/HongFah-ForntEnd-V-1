import React from 'react'
import { NavLink } from 'react-router-dom'
import  LogoSideBarTop  from '../assets/logo/logo-sidebar-top.png'
import  LogoSideBarBottom  from '../assets/logo/logo-sidebar-bottom.png'
import  LogoSideBarMiddle  from '../assets/logo/logo-sidebar-middle.png'
import  Logo from '../assets/logo/logo.png'
import {useSelector} from 'react-redux'
const SideBarUser = () => {

    const {ToggleSideBar} = useSelector((state)=>({...state}))

    const menu = [
        {
            name: "ໜ້າຂາຍສິນຄ້າ",
            path: "/users/listProducts/saleProducts",
            icon: <i className='bx bxs-home'></i>
        },
        {
            name: "ຈັດການອໍເດີ້",
            path: "/users/homeOrders",
            icon: <i className='bx bxs-cart'></i>
        }
    ]
    return (
        <nav className={`nav-bar ${ToggleSideBar ? "close" : ""}`}>
            <div className="logo">
                <div className="logo-image">
                    <img src={Logo} alt={`images`} />
                </div>
            </div>
            <div className="menu-items">
                <ul className="nav-links">
                    {menu && menu.map((menus,idx) =>
                        <li key={idx}>
                            <NavLink to={menus.path} >
                                {menus.icon}
                                <span className="link-name">{menus.name}</span>
                            </NavLink>
                        </li>
                    )}
                </ul>
                <div className="logo-sidebar">
                    <div className="logo-top">
                        <img src={LogoSideBarTop} alt={`images`} />
                    </div>
                    <div className="logo-middle">
                        <img src={LogoSideBarMiddle} alt={`images`} />
                    </div>
                    <div className="logo-bottom">
                        <img src={LogoSideBarBottom} alt={`images`} />
                    </div>
                </div>
            </div>
        </nav>

    )
}

export default SideBarUser
