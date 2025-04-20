import React, { useContext } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/storecontext";

const PlaceOrder = () => {
  const { gettotalCartAmount } = useContext(StoreContext);
  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-filed">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
        </div>
        <input type="email" placeholder="Email address" />
        <input type="text" placeholder="Street" />
        <div className="multi-filed">
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State" />
        </div>
        <div className="multi-filed">
          <input type="text" placeholder="Pincode" />
          <input type="text" placeholder="County" />
        </div>
        <input text="text" placeholder="Phone Number" />
      </div>
      <div className="place-order-right">
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
          <button>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
