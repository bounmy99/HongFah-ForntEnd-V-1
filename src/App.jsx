import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
// ==================== protectRoutes =====================
import RouteProtect from "./protectRoute/RouteProtect";
//==================== Layout ======================
import Headers from "./layouts/Headers";
import SideBar from "./layouts/SideBar";
import SideBarUser from "./layouts/SideBarUser";

//==================== Pages  =====================
import LoginPages from "./pages/LoginPages";
import ForgetPassword from "./pages/ForgetPassword";
import Dashboard from "./pages/Dashboard";

// =================== admin access =================
import ListProducts from "./pages/admin/Products/ListProducts";
import EditProduct from "./pages/admin/Products/EditProduct";
import AddProduct from "./pages/admin/Products/AddProduct";
import SaleProduct from "./pages/admin/Products/SaleProduct";
import CartProduct from "./pages/admin/Products/CartProduct";
import Pay from "./pages/admin/Products/Pay";
import DetailProductSale from "./pages/admin/Products/DetailProductSale";

import HomeOrders from "./pages/admin/orders/HomeOrders";
import InfoOrders from "./pages/admin/orders/InfoOrders";
import InfoCancel from "./pages/admin/orders/InfoCancel";
import InfoHistory from "./pages/admin/orders/InfoHistory";
import ListLineWork from "./pages/admin/lineWorks/ListLineWork";
import DetailsEmp from "./pages/admin/lineWorks/DetailsEmp";
import ListPackage from "./pages/admin/packages/ListPackage";

import Travels from "./pages/admin/travels/Travels";
import AddTravels from "./pages/admin/travels/AddTravels";
import DetailTravels from "./pages/admin/travels/DetailTravels";
import DetailSuccesTrip from "./pages/admin/travels/DetailSuccesTrip";

import Auth from "./pages/admin/auth/Auth";
import EditUser from "./pages/admin/auth/EditUser";
import AddUser from "./pages/admin/auth/AddUser";

import HomeSales from "./pages/admin/bonus/HomeSales";
import HistoryTransfer from "./pages/admin/bonus/HistoryTransfer";
import MaintainFalse from "./pages/admin/bonus/MaintainFalse";
import MaintainTrue from "./pages/admin/bonus/MaintainTrue";

import ListPosition from "./pages/admin/position/ListPosition";

import ListUsers from "./pages/admin/users/ListUsers";
import UsersDetail from "./pages/admin/users/UsersDetail";

// ====================== user access ================
import HomeUser from "./pages/user/SaleProduct";

function App() {
  const { users } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let getData = JSON.parse(localStorage.getItem("data"));

  useEffect(() => {
    if (getData) {
      dispatch({
        type: "USER_LOGIN",
        payload: {
          token: getData.token,
          resfresToken: getData.refresToken,
          email: getData.email,
          phoneNumber: getData.phoneNumber,
          username: `${getData.firstName} ${getData.lastName}`,
          role: getData.role,
          profile: getData.profile,
          userCode: getData.userCode,
          tokenExpiresAt: getData.tokenExpiresAt,
        },
      });
    }
  }, []);

  return (
    <>
      {users && users.token && users.role === "admin" ? (
        <>
          <SideBar />
          <section className="dashboard">
            <Headers />
            <div className="dash-content">
              <div className="container">
                <Routes>
                  <Route
                    path="/dashboard"
                    element={
                      <RouteProtect>
                        <Dashboard />
                      </RouteProtect>
                    }
                  />
                  <Route
                    path="/listProducts"
                    element={
                      <RouteProtect>
                        <ListProducts />
                      </RouteProtect>
                    }
                  />
                  <Route
                    path="/listProducts/saleProducts"
                    element={
                      <RouteProtect>
                        <SaleProduct />
                      </RouteProtect>
                    }
                  />
                  <Route
                    path="/listProducts/cart"
                    element={
                      <RouteProtect>
                        <CartProduct />
                      </RouteProtect>
                    }
                  />
                  <Route
                    path="/listProducts/saleProducts/pay"
                    element={
                      <RouteProtect>
                        <Pay />
                      </RouteProtect>
                    }
                  />
                  <Route
                    path="/listProducts/editProduct/:id"
                    element={
                      <RouteProtect>
                        <EditProduct />
                      </RouteProtect>
                    }
                  />
                  <Route
                    path="/listProducts/DetailProductSale/:id"
                    element={
                      <RouteProtect>
                        <DetailProductSale />
                      </RouteProtect>
                    }
                  />
                  <Route
                    path="/listProducts/addProduct"
                    element={
                      <RouteProtect>
                        <AddProduct />
                      </RouteProtect>
                    }
                  />

                  <Route
                    path="/homeOrders"
                    element={
                      <RouteProtect>
                        <HomeOrders />
                      </RouteProtect>
                    }
                  />
                  <Route
                    path="/HomeOrders/infoOrders/:id"
                    element={
                      <RouteProtect>
                        <InfoOrders />
                      </RouteProtect>
                    }
                  />
                  <Route
                    path="/HomeOrders/infoCancel/:id"
                    element={
                      <RouteProtect>
                        <InfoCancel />
                      </RouteProtect>
                    }
                  />
                  <Route
                    path="/HomeOrders/infoHistory/:id"
                    element={
                      <RouteProtect>
                        <InfoHistory />
                      </RouteProtect>
                    }
                  />

                  <Route
                    path="/lineWork"
                    element={
                      <RouteProtect>
                        <ListLineWork />
                      </RouteProtect>
                    }
                  />
                  <Route
                    path="/lineWork/Details/:id"
                    element={
                      <RouteProtect>
                        <DetailsEmp />
                      </RouteProtect>
                    }
                  />

                  <Route
                    path="/ListPackage"
                    element={
                      <RouteProtect>
                        <ListPackage />
                      </RouteProtect>
                    }
                  />

                  <Route
                    path="/position"
                    element={
                      <RouteProtect>
                        <ListPosition />
                      </RouteProtect>
                    }
                  />

                  <Route
                    path="/users"
                    element={
                      <RouteProtect>
                        <ListUsers />
                      </RouteProtect>
                    }
                  />
                  <Route
                    path="/users/detail/:id"
                    element={
                      <RouteProtect>
                        <UsersDetail />
                      </RouteProtect>
                    }
                  />

                  <Route
                    path="/travels"
                    element={
                      <RouteProtect>
                        <Travels />
                      </RouteProtect>
                    }
                  />
                  <Route
                    path="/travels/detailtravels/:id"
                    element={
                      <RouteProtect>
                        <DetailTravels />
                      </RouteProtect>
                    }
                  />
                  <Route
                    path="/travels/DetailSuccesTrip/:id"
                    element={
                      <RouteProtect>
                        <DetailSuccesTrip />
                      </RouteProtect>
                    }
                  />
                  <Route
                    path="/travels/addtravels"
                    element={
                      <RouteProtect>
                        <AddTravels />
                      </RouteProtect>
                    }
                  />

                  <Route
                    path="/auth"
                    element={
                      <RouteProtect>
                        <Auth />
                      </RouteProtect>
                    }
                  />
                  <Route
                    path="/auth/addUser"
                    element={
                      <RouteProtect>
                        <AddUser />
                      </RouteProtect>
                    }
                  />
                  <Route
                    path="/auth/editUser/:id"
                    element={
                      <RouteProtect>
                        <EditUser />
                      </RouteProtect>
                    }
                  />

                  <Route
                    path="/Bonus"
                    element={
                      <RouteProtect>
                        <HomeSales />
                      </RouteProtect>
                    }
                  />
                  <Route
                    path="/Bonus/history"
                    element={
                      <RouteProtect>
                        <HistoryTransfer />
                      </RouteProtect>
                    }
                  />
                  <Route
                    path="/Bonus/maintain/true"
                    element={
                      <RouteProtect>
                        <MaintainTrue />
                      </RouteProtect>
                    }
                  />
                  <Route
                    path="/Bonus/maintain/false"
                    element={
                      <RouteProtect>
                        <MaintainFalse />
                      </RouteProtect>
                    }
                  />
                </Routes>
              </div>
            </div>
          </section>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<LoginPages />} />
          <Route path="/ForgetPassword" element={<ForgetPassword />} />
          <Route
            path="/listProducts/saleProducts"
            element={
              <>
                <SideBarUser />
                <section className="dashboard">
                  <Headers />
                  <div className="dash-content">
                    <div className="container">
                      <HomeUser />
                    </div>
                  </div>
                </section>
              </>
            }
          />
          <Route
            path="/listProducts/DetailProductSale/:id"
            element={<DetailProductSale />}
          />
        </Routes>
      )}
    </>
  );
}

export default App;
