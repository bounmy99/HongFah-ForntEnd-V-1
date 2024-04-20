import React, { useState, useEffect } from "react";
import { Empty, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CartTable from "../../components/CartTable";
import PaginationComponent from "../../components/PaginationComponent";
import { formatPrice } from "../../functions/FormatPrices";
const CartProduct = () => {
  const { carts } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [count] = useState(carts.length);
  const [pageSize, setPageSize] = useState(3);
  const [pages, setPages] = useState(1);

// create pagination
  const indexOfLastPages = pages * pageSize;
  const indexOfFirstPages = indexOfLastPages - pageSize;
  const currentPages = carts.slice(indexOfFirstPages, indexOfLastPages);

// function Total price
  const TotalPrice = () => {
    return carts.reduce((currentValue, nexttValue) => {
      return currentValue + nexttValue.qty * nexttValue.price;
    }, 0);
  };
// function Total point
  const TotalPoint = () => {
    return carts.reduce((currentValue, nexttValue) => {
      return currentValue + nexttValue.qty * nexttValue.point;
    }, 0);
  };

// function Clear Carts
  const handleClearCart = () => {
    dispatch({
      type: "EMPTY_CART",
      payload: [],
    });
    dispatch({
      type: "EMPTY_ORDER",
      payload: [],
    });
  };

  return (
    <>
      <div className="product-cart card">
        <div className="table-cart">
          {carts.length ? (
            <>
              <div className="table-cart-products">
                <div>
                  <table cellPadding={0} cellSpacing={0}>
                    <thead>
                      <tr>
                        <th>ລະຫັດສິນຄ້າ</th>
                        <th>ຮູບພາບ</th>
                        <th>ຊື່ສິນຄ້າ</th>
                        <th>ລາຄາ</th>
                        <th>ຄະແນນ</th>
                        <th>ຈຳນວນ</th>
                        <th>ລວມລາຄາ</th>
                        <th>ລວມຄະແນນ</th>
                        <th>ຈັດການ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentPages.map((items, i) => (
                        <CartTable
                          items={items}
                          key={i}
                          formatPrice={formatPrice}
                        />
                      ))}
                    </tbody>
                  </table>
                  {count > 3 ? (
                    <>
                      <div className="pagination-cart">
                        <PaginationComponent
                          count={count}
                          setPageSize={setPageSize}
                          pageSize={pageSize}
                          setPages={setPages}
                          pages={pages}
                        />
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="empty-card">
              <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{
                  height: 60,
                }}
                description={
                  <span>
                    <a>ບໍ່ທັນມີລາຍການ</a>
                  </span>
                }
              ></Empty>
            </div>
          )}
        </div>
        <div className="summery-cart">
          {carts.length != 0 ? (
            <>
              <div className="clear-cart-btn" onClick={handleClearCart}>
                <Button type="primary" danger>
                  ລ້າງກະຕ່າສິນຄ້າ
                </Button>
              </div>
            </>
          ) : (
            ""
          )}
          {carts.length != 0 ? (
            <div className="summery">
              <div className="text-summery">
                <h3 className="text-point">
                  Point ທີ່ທ່ານຈະໄດ້ຮັບ <span>{TotalPoint()} </span>point
                </h3>
                <h3 className="text-price">
                  ເງິນທີ່ທ່ານຕ້ອງຊຳລະ <span>{formatPrice(TotalPrice())} </span>
                  ກີບ
                </h3>
              </div>
              <div className="pay">
                <button
                  onClick={() => navigate("/listProducts/saleProducts/pay")}
                  className="btn-pay"
                >
                  ຊຳລະ
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default CartProduct;
