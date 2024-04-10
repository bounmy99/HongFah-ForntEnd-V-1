import React, { useState, useEffect } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Tooltip, message, Image } from "antd";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
const CardProduct = ({ ordersId, items, idx, formatPrice,setPreviewImages }) => {
  const dispatch = useDispatch();
  const { users, carts } = useSelector((state) => ({ ...state }));
  // Tooltip
  const [tooltip, setTooltip] = useState("ເພິ່ມສິນຄ້າໃສ່ກະຕ່າ");

  // function add to cart
  const addToCart = () => {
    let cart = [];
    let ordersId = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.push({
        ...items,
        qty: 1,
        product_id: items._id,
      });

      let unique = _.uniqWith(cart, _.isEqual);
      localStorage.setItem("cart", JSON.stringify(unique));
      setTooltip("ລາຍການນີ້ເພີ່ມແລ້ວ");
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }

    if (typeof window !== "undefined") {
      if (localStorage.getItem("orders")) {
        ordersId = JSON.parse(localStorage.getItem("orders"));
      }
      ordersId.push({
        product_id: items._id,
        qty: 1,
      });

      let uniqueOrders = _.uniqWith(ordersId, _.isEqual);
      localStorage.setItem("orders", JSON.stringify(uniqueOrders));
      setTooltip("ລາຍການນີ້ເພີ່ມແລ້ວ");
      dispatch({
        type: "SAVE_ORDER",
        payload: ordersId,
      });
    }
  };

  return (
    <>
      <div className="content" key={idx}>
        <div className="point">{items.point} PV</div>
        <div className="card-content">
          <div className="images">
            <Image
              src={items.images[0]}
              alt=""
              preview={{ visible: false }}
              onClick={() => setPreviewImages(items.images)}
            />
          </div>
          <div className="description">
            <h5>{`${items.name && items.name.substring(0, 10)}.....`}</h5>
          </div>
        </div>
        <div className="text-bottom">
          <div className="price-text">
            <h5>₭ {formatPrice(items.price)}</h5>
          </div>
          <Tooltip title={tooltip} color="#01A5E8">
            <div className="button">
              <ShoppingCartOutlined
                onClick={() => addToCart(items)}
                style={{
                  fontSize: "18px",
                  color: "#01a5e8",
                  cursor: "pointer",
                }}
              />
            </div>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default CardProduct;
