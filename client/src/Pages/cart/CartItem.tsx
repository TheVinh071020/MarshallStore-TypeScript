import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { formatCurrency } from "../../helpers";
interface CartItemProps {
  detail: any;
}
function CartItem({ detail }: CartItemProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useDispatch();

  useEffect(() => {
    setQuantity(detail.clickNumber);
  }, [detail.clickNumber]);

  const handleIncrease = (id: number) => {
    setQuantity(quantity + 1);
    dispatch({ type: "INCREASE_CART_PRODUCT", payload: id });
  };

  const handleDown = (id: number) => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      dispatch({
        type: "DECREASE_CART_PRODUCT",
        payload: id,
      });
    }
  };

  const deleteCart = (id: number) => {
    const cartItems = JSON.parse(localStorage.getItem("cart") as string);

    const itemIndex = cartItems.findIndex(
      (item: { product_id: number }) => item.product_id === id
    );

    if (itemIndex !== -1) {
      cartItems.splice(itemIndex, 1);
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }

    dispatch({
      type: "DELETE_CART",
      payload: cartItems,
    });
  };
  return (
    <>
      <tr className="border-b border-gray-300">
        <td className="px-4 py-2">
          <i
            onClick={() => deleteCart(detail.product_id)}
            className="fa-solid fa-xmark "
          ></i>
        </td>
        <td className="w-1/6">
          <img
            src={detail.sources[0].url}
            alt=""
            className="max-w-full h-auto"
          />
        </td>
        <td className="px-4 py-2 text-left font-semibold">{detail.name}</td>
        <td style={{ color: "#777" }} className="px-4 py-2">
          {formatCurrency(detail.price - (detail.price * detail.sale) / 100)}
        </td>
        <td className="px-4 py-2">
          <div className="flex items-center justify-center">
            <button
              onClick={() => handleDown(detail.product_id)}
              className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center cursor-pointer"
            >
              -
            </button>
            <div className="px-4">{quantity}</div>
            <button
              onClick={() => handleIncrease(detail.product_id)}
              className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center cursor-pointer"
            >
              +
            </button>
          </div>
        </td>
        <td className="px-4 py-2 font-semibold">
          {formatCurrency(detail.price * (1 - detail.sale / 100) * quantity)}
        </td>
      </tr>
    </>
  );
}

export default CartItem;
