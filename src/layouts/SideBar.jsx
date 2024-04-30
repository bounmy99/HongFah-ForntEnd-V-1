import React from "react";
import { NavLink } from "react-router-dom";
import LogoSideBarTop from "../assets/logo/logo-sidebar-top.png";
import LogoSideBarBottom from "../assets/logo/logo-sidebar-bottom.png";
import LogoSideBarMiddle from "../assets/logo/logo-sidebar-middle.png";
import Logo from "../assets/logo/logo.png";
import { useSelector } from "react-redux";
const SideBar = () => {
  const { ToggleSideBar, users } = useSelector((state) => ({ ...state }));

  // const menu = [
  //   {
  //     name: "Dashboard",
  //     path: "/dashboard",
  //     icon: <i className="bx bxs-home"></i>,
  //   },
  //   {
  //     name: "ຈັດການຂໍ້ມູນສິນຄ້າ",
  //     path: "/listProducts",
  //     icon: <i className="bx bxs-shopping-bag"></i>,
  //   },
  //   {
  //     name: "ຈັດການອໍເດີ້",
  //     path: "/homeOrders",
  //     icon: <i className="bx bxs-cart"></i>,
  //   },
  //   {
  //     name: "ຈັດການສະມາຊິກ",
  //     path: "/lineWork",
  //     icon: <i className="bx bx-sitemap"></i>,
  //   },
  //   {
  //     name: "ຈັດການແພັກເກດ",
  //     path: "/ListPackage",
  //     icon: <i className="bx bx-food-menu"></i>,
  //   },
  //   {
  //     name: "ຈັດການຕຳແໜ່ງ",
  //     path: "/position",
  //     icon: <i className="bx bx-bar-chart-alt"></i>,
  //   },
  //   {
  //     name: "ການຈ່າຍໂບນັດ",
  //     path: "/Bonus",
  //     icon: <i className="bx bx-select-multiple"></i>,
  //   },
  //   {
  //     name: "ຂໍ້ມູນຜຸ້ໃຊ້",
  //     path: "/users",
  //     icon: <i class="bx bxs-user"></i>,
  //   },
  //   {
  //     name: "ຈັດການທິບທ່ອງທ່ຽວ",
  //     path: "/travels",
  //     icon: <i className="bx bxs-plane-take-off"></i>,
  //   },
  //   {
  //     name: "ສິດການເຂົ້າເຖິງ",
  //     path: "/auth",
  //     icon: <i className="bx bx-cog"></i>,
  //   },
  // ];

  return (
    <nav className={`nav-bar ${ToggleSideBar ? "close" : ""}`}>
      <div className="logo">
        <div className="logo-image">
          <img src={Logo} alt={`images`} />
        </div>
      </div>
      <div className="menu-items">
        <ul className="nav-links">
          
          {/* {menu &&
            menu.map((menus, idx) => (
              <li key={idx}>
                <NavLink to={menus.path}>
                  {menus.icon}
                  <span className="link-name">{menus.name}</span>
                </NavLink>
              </li>
            ))} */}

          {users.role === "admin" || users.role === "super" ? (
            <>
              <li>
                <NavLink to={`/dashboard`}>
                  <i className="bx bxs-home"></i>
                  <span className="link-name">Dashboard</span>
                </NavLink>
              </li>

              <li>
                <NavLink to={`/listProducts`}>
                  <i className="bx bxs-shopping-bag"></i>
                  <span className="link-name">ຈັດການຂໍ້ມູນສິນຄ້າ</span>
                </NavLink>
              </li>

              <li>
                <NavLink to={`/homeOrders`}>
                  <i className="bx bxs-cart"></i>
                  <span className="link-name">ຈັດການອໍເດີ້</span>
                </NavLink>
              </li>

              <li>
                <NavLink to={`/lineWork`}>
                  <i className="bx bx-sitemap"></i>
                  <span className="link-name">ຈັດການສະມາຊິກ</span>
                </NavLink>
              </li>

              <li>
                <NavLink to={`/ListPackage`}>
                  <i className="bx bx-food-menu"></i>
                  <span className="link-name">ຈັດການແພັກເກດ</span>
                </NavLink>
              </li>

              <li>
                <NavLink to={`/position`}>
                  <i className="bx bx-bar-chart-alt"></i>
                  <span className="link-name">ຈັດການຕຳແໜ່ງ</span>
                </NavLink>
              </li>

              <li>
                <NavLink to={`/Bonus`}>
                  <i className="bx bx-select-multiple"></i>
                  <span className="link-name">ການຈ່າຍໂບນັດ</span>
                </NavLink>
              </li>

              <li>
                <NavLink to={`/users`}>
                  <i class="bx bxs-user"></i>
                  <span className="link-name">ຂໍ້ມູນຜຸ້ໃຊ້</span>
                </NavLink>
              </li>

              <li>
                <NavLink to={`/travels`}>
                  <i className="bx bxs-plane-take-off"></i>
                  <span className="link-name">ຈັດການທິບທ່ອງທ່ຽວ</span>
                </NavLink>
              </li>

              <li>
                <NavLink to={`/auth`}>
                  <i className="bx bx-cog"></i>
                  <span className="link-name">ສິດການເຂົ້າເຖິງ</span>
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to={`/dashboard`}>
                  <i className="bx bxs-home"></i>
                  <span className="link-name">Dashboard</span>
                </NavLink>
              </li>

              <li>
                <NavLink to={`listProducts/saleProducts/users`}>
                  <i className="bx bxs-shopping-bag"></i>
                  <span className="link-name">ຂາຍສິນຄ້າ</span>
                </NavLink>
              </li>

              <li>
                <NavLink to={`/homeOrders/users`}>
                  <i className="bx bxs-cart"></i>
                  <span className="link-name">ຈັດການອໍເດີ້</span>
                </NavLink>
              </li>
            </>
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
  );
};

export default SideBar;
