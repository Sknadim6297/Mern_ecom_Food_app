import { createContext, useEffect, useState } from "react";
import { menu_list } from "../assets/assets";
import axios from "axios";
    
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const [ordersData, setOrdersData] = useState({});
    const [token, setToken] = useState(''); 
    const [food_list, setFood_list]=useState([]);
    const url='https://mern-ecom-food-app-5.onrender.com/'

    const addToCart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1
        }));
        if(token){
            await axios.post(url+'api/cart/add',{itemId},{headers:{token}});
        }
    };



    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if(token){
            axios.post(url+'api/cart/remove',{itemId},{headers:{token}});
        }
    }
 
    const getTotalCartAmount = () => {
        let totalAmount = 0;

    
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
              
                let itemId = item.toString();
                let itemInfo = food_list.find((product) => product._id === itemId);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                } else {
                    console.warn(`Item with ID ${itemId} not found in food_list`);
                }
            }
        }
        return totalAmount;
    }


    const foodFetchList = async () => {
        const response =await axios.get(url+'api/food/list');
        setFood_list(response.data.data);
        console.log(response.data.data);
        
    }

    const loadCartData=async(token)=>{
        const response=await axios.post(url+'api/cart/get',{},{headers:{token}});
       setCartItems(response.data.data);
    }

    useEffect(() => {
        async function loadData(){
            await foodFetchList(); 
        if(localStorage.getItem('token')){
            setToken(localStorage.getItem('token'));
            await loadCartData(localStorage.getItem('token'));
    }
}
    loadData();
},[]);

    const placeOrder = (deliveryData) => {
         console.log(deliveryData);
    }

    const contextValue = {
        food_list,
        menu_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        placeOrder,
        token,
        url,
        setToken
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider;
