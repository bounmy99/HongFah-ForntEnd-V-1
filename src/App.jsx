import { useEffect } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import "./App.css"
// ==================== protectRoutes =====================
import RouteProtect from "./protectRoute/RouteProtect"
//==================== Layout ======================
import Headers from "./layouts/Headers"
import SideBar from "./layouts/SideBar"

//==================== Pages  =====================
import LoginPages from "./pages/LoginPages"
import ForgetPassword from "./pages/ForgetPassword"
import HomePages from "./pages/HomePages"
import Dashboard from "./pages/Dashboard"

import ListProducts from "./pages/Products/ListProducts"
import EditProduct from "./pages/Products/EditProduct"
import AddProduct from "./pages/Products/AddProduct"

import HomeOrders from "./pages/orders/HomeOrders"
import InfoOrders from "./pages/orders/InfoOrders"
import InfoCancel from "./pages/orders/InfoCancel"
import InfoHistory from "./pages/orders/InfoHistory"
import ListEmployee from "./pages/lineWorks/ListEmployee"
import DetailsEmp from "./pages/lineWorks/DetailsEmp"
import ListPackage from "./pages/packages/ListPackage"
import Travels from "./pages/travels/Travels"
import AddTravels from "./pages/travels/AddTravels"
import DetailTravels from "./pages/travels/DetailTravels"
import Auth from "./pages/auth/Auth"
import EditUser from "./pages/auth/EditUser"
import AddUser from "./pages/auth/AddUser"
import HomeSales from "./pages/bonus/HomeSales"
import ListPosition from './pages/position/ListPosition';
import ListWithdraw from "./pages/withdraw/ListWithdraw"
import CreateWithDraw from "./pages/withdraw/CreateWithDraw"

function App() {
  const { users } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let getData = JSON.parse(localStorage.getItem("data"))

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
          profile : getData.profile,
          userCode: getData.userCode,
          tokenExpiresAt: getData.tokenExpiresAt
        }
      })
    }
  
  }, [])

  return (

    <>
      {users && users.token && users.role === "admin" ?
        <>
          <SideBar />
          <section className="dashboard">
            <Headers />
            <div className="dash-content">
              <div className="container">
                <Routes>
                  <Route path="/dashboard" element={
                    <RouteProtect>
                      <Dashboard />
                    </RouteProtect>
                  } />
                  <Route path="/listProducts" element={
                    <RouteProtect>
                      <ListProducts />
                    </RouteProtect>
                  } />
                  <Route path="/listProducts/editProduct/:id" element={
                    <RouteProtect>
                      <EditProduct />
                    </RouteProtect>

                  } />
                  <Route path="/listProducts/addProduct" element={
                    <RouteProtect>
                      <AddProduct />
                    </RouteProtect>
                  } />

                  <Route path="/homeOrders" element={
                    <RouteProtect>
                      <HomeOrders />
                    </RouteProtect>
                  } />
                  <Route path="/HomeOrders/infoOrders/:id" element={
                    <RouteProtect>
                      <InfoOrders />
                    </RouteProtect>
                  } />
                  <Route path="/HomeOrders/infoCancel/:id" element={
                    <RouteProtect>
                      <InfoCancel />
                    </RouteProtect>
                  } />
                  <Route path="/HomeOrders/infoHistory/:id" element={
                    <RouteProtect>
                      <InfoHistory />
                    </RouteProtect>
                  } />

                  <Route path="/listEmployee" element={
                    <RouteProtect>
                      <ListEmployee />
                    </RouteProtect>
                  } />
                  <Route path="/listEmployee/DetailsEmp/:id" element={
                    <RouteProtect>
                      <DetailsEmp />
                    </RouteProtect>
                  } />

                  <Route path="/ListPackage" element={
                    <RouteProtect>
                      <ListPackage />
                    </RouteProtect>
                  } />

                  <Route path="/position" element={
                    <RouteProtect>
                      <ListPosition />
                    </RouteProtect>
                  } />

                  <Route path="/withdraw" element={
                    <RouteProtect>
                      <ListWithdraw />
                    </RouteProtect>
                  } />
                  <Route path="/withdraw/createwithdraw" element={
                    <RouteProtect>
                      <CreateWithDraw />
                    </RouteProtect>
                  } />

                  <Route path="/travels" element={
                    <RouteProtect>
                      <Travels />
                    </RouteProtect>
                  } />
                  <Route path="/travels/detailtravels/:id" element={
                    <RouteProtect>
                      <DetailTravels />
                    </RouteProtect>
                  } />
                  <Route path="/travels/addtravels" element={
                    <RouteProtect>
                      <AddTravels />
                    </RouteProtect>
                  } />

                  <Route path="/auth" element={
                    <RouteProtect>
                      <Auth />
                    </RouteProtect>
                  } />
                  <Route path="/auth/addUser" element={
                    <RouteProtect>
                      <AddUser />
                    </RouteProtect>
                  } />
                  <Route path="/auth/editUser/:id" element={
                    <RouteProtect>
                      <EditUser />
                    </RouteProtect>
                  } />

                  <Route path="/Bonus" element={
                    <RouteProtect>
                      <HomeSales />
                    </RouteProtect>
                  } />
                </Routes>
              </div>
            </div>
          </section>
        </>
        :
        <Routes>
          <Route path="/" element={<LoginPages />} />
          <Route path="/ForgetPassword" element={<ForgetPassword />} />
        </Routes>
      }
    </>
  )
}

export default App
