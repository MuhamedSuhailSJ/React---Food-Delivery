import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/storecontext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItem, food_list, removetoCart, gettotalCartAmount,url } =
    useContext(StoreContext);

  const navigate = useNavigate()
  
  return (
    <div className="cart">
      <div className="cart-item">
        <div className="cart-item-title">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (cartItem[item._id] > 0) {
            return (
              <div>
                <div className="cart-item-title cart-items-item">
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItem[item._id]}</p>
                  <p>${item.price * cartItem[item._id]}</p>
                  <p onClick={() => removetoCart(item._id)} className="cross">
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="car-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="total-details">
              <p>Subtotal</p>
              <p>${gettotalCartAmount()}</p>
            </div>
            <hr />
            <div className="total-details">
              <p>Delivery Fees</p>
              <p>${gettotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="total-details">
              <b>Total</b>
              <b>
                ${gettotalCartAmount() === 0 ? 0 : gettotalCartAmount() + 2}
              </b>
            </div>
          </div>
          <button onClick={() => navigate("/placeorder")}>
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="PromoCode" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
