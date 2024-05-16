
import { DeleteOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { message,} from "antd";
const CartTable = ({ items, formatPrice }) => {
  const { carts } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleDelete = () => {
    let carts = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        carts = JSON.parse(localStorage.getItem("cart"));
      }
      carts.map((product, i) => {
        if (product._id === items._id) {
          carts.splice(i, 1);
        }
      });

      localStorage.setItem("cart", JSON.stringify(carts));
      dispatch({
        type: "ADD_TO_CART",
        payload: carts,
      });
      console.log("Delete Cart Products", carts);
    }

    let orders = [];
    if (localStorage.getItem("orders")) {
      orders = JSON.parse(localStorage.getItem("orders"));
    }
    orders.map((product, i) => {
      if (product.product_id === items._id) {
        orders.splice(i, 1);
      }
    });
    localStorage.setItem("orders", JSON.stringify(orders));
    dispatch({
      type: "SAVE_ORDER",
      payload: orders,
    });
    console.log("Count Change Update orders", orders);
  };

  const handleCountChange = (e) => {
    // console.log("Count Change", e.target.value);
    // console.log("Available quantity", items.amount);
    let count = e.target.value < 1 ? 1 : e.target.value;
    if (count > items.amount) {
      message.error(`Max available amount : ${items.amount}`);
      return;
    }

    let carts = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        carts = JSON.parse(localStorage.getItem("cart"));
      }
      carts.map((product, i) => {
        if (product._id === items._id) {
          carts[i].qty = count;
        }
      });
      localStorage.setItem("cart", JSON.stringify(carts));
      dispatch({
        type: "ADD_TO_CART",
        payload: carts,
      });
      // console.log("Count Change Update carts", carts);

      let orders = [];
      if (localStorage.getItem("orders")) {
        orders = JSON.parse(localStorage.getItem("orders"));
      }
      orders.map((product, i) => {
        if (product.product_id === items._id) {
          orders[i].qty = count;
        }
      });
      localStorage.setItem("orders", JSON.stringify(orders));
      dispatch({
        type: "SAVE_ORDER",
        payload: orders,
      });
      console.log("Count Change Update orders", orders);
    }
  };

  return (
    <>
      <tr>
        <td>{items.productCode}</td>
        <td>
          <img
            src={items.images[0]}
            width={50}
            height={50}
            style={{ margin: 5 }}
          />
        </td>
        <td>{items.name}</td>
        <td>{formatPrice(items.price)}</td>
        <td>{items.point}</td>
        <td>
          <input
            type="number"
            onChange={handleCountChange}
            className="form-controls-cart"
            value={items.qty}
          />
        </td>
        <td>{formatPrice(items.qty * items.price)}</td>
        <td>{items.qty * items.point}</td>
        <td>
          <DeleteOutlined
            onClick={() => handleDelete(items._id)}
            style={{
              color: "red",
              cursor: "pointer",
            }}
          />
        </td>
      </tr>
    </>
  );
};

export default CartTable;
