import { createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null);
import axios from "axios";

const StorecontextProvider = (props) => {
  const [cartItem, setcartItem] = useState({});
  const [food_list, setFoodlist] = useState([]);
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");

  useEffect(() => {
    async function loadData() {
      await fetchFoodlist();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const fetchFoodlist = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    setFoodlist(response.data.data);
  };

  const addtoCart = (itemId) => {
    if (!cartItem[itemId]) {
      setcartItem((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setcartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removetoCart = (itemId) => {
    setcartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const gettotalCartAmount = () => {
    let totalamount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalamount += itemInfo.price * cartItem[item];
      }
    }
    return totalamount;
  };

  const contextvalue = {
    food_list,
    cartItem,
    setcartItem,
    addtoCart,
    removetoCart,
    gettotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextvalue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StorecontextProvider;
