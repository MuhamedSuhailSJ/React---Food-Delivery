import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItem, addtoCart, removetoCart ,url} = useContext(StoreContext);

  return (
    <div>
      <div className="food-item">
        <div className="food-item-img-container">
          <img className="food-item-image" src={url+"/images/"+image} alt="" />
          {!cartItem[id] ? (
            <img
              className="add"
              onClick={() => addtoCart(id)}
              src={assets.add_icon_white}
              alt=""
            />
          ) : (
            <div className="food-item-counter">
              <img
                onClick={() => removetoCart(id)}
                src={assets.remove_icon_red}
                alt=""
              />
              <p>{cartItem[id]}</p>
              <img
                onClick={() => addtoCart(id)}
                src={assets.add_icon_green}
                alt=""
              />
            </div>
          )}
        </div>
        <div className="food-item-info">
          <div className="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="" />
          </div>
          <p className="food-item-descrip">{description}</p>
          <p className="food-item-price">${price}</p>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
