import React from 'react'
import { NavLink } from 'react-router-dom'
import  LogoSideBarTop  from '../assets/logo/logo-sidebar-top.png'
import  LogoSideBarBottom  from '../assets/logo/logo-sidebar-bottom.png'
import  LogoSideBarMiddle  from '../assets/logo/logo-sidebar-middle.png'
import  Logo from '../assets/logo/logo.png'
import {useSelector} from 'react-redux'
const SideBar = () => {

    const {ToggleSideBar} = useSelector((state)=>({...state}))

    const menu = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: <i className='bx bxs-home'></i>
        },
        {
            name: "ຈັດການຂໍ້ມູນສິນຄ້າ",
            path: "/listProducts",
            icon: <i className='bx bxs-shopping-bag'></i>
        },
        {
            name: "ຈັດການອໍເດີ້",
            path: "/homeOrders",
            icon: <i className='bx bxs-cart'></i>
        },
        {
            name: "ຈັດການສະມາຊິກ",
            path: "/lineWork",
            icon: <i className='bx bx-sitemap'></i>
        },
        {
            name: "ຈັດການແພັກເກດ",
            path: "/ListPackage",
            icon: <i className='bx bx-food-menu'></i>
        },
        {
            name: "ຈັດການຕຳແໜ່ງ",
            path: "/position",
            icon: <i className='bx bx-bar-chart-alt'></i>
        },
        {
            name: "ການຈ່າຍໂບນັດ",
            path: "/Bonus",
            icon: <i className='bx bx-select-multiple'></i>
        },
        {
            name: "ຂໍ້ມູນຜຸ້ໃຊ້",
            path: "/users",
            icon: <i class='bx bxs-user'></i>
        },
        {
            name: "ຈັດການທິບທ່ອງທ່ຽວ",
            path: "/travels",
            icon: <i className='bx bxs-plane-take-off'></i>
        },
        {
            name: "ສິດການເຂົ້າເຖິງ",
            path: "/auth",
            icon: <i className='bx bx-cog'></i>
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

export default SideBar
