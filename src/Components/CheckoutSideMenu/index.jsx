import { useContext } from "react";
import {Link} from 'react-router-dom'
import { XCircleIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../Context";
import OrderCard from "../../Components/OrderCard";
import { totalPrice } from "../../utils";
import "./styles.css";

const CheckoutSideMenu = () => {
  const context = useContext(ShoppingCartContext);

  const handleDelete = (id) => {
    const filteredProducts = context.cartProducts.filter(product => product.id != id)
    context.setCartProducts(filteredProducts)
  }

  const handleCheckout = () => {
    const orderToAdd = {
      date: '01.02.23',
      products: context.cartProducts,
      totalProducts: context.cartProducts.length,
      totalPrice: totalPrice(context.cartProducts)
    }

    context.setOrder([...context.order, orderToAdd])
    context.setCartProducts([])
    context.setSearchByTitle(null)
  }

  return (
    <aside
      className={`${
        context.isCheckoutSideMenuOpen ? "flex" : "hidden"
      } checkout-side-menu flex-col fixed items-center right-1 border border-black rounded-lg bg-stone-200`}
    >
      <div className="flex justify-between items-center p-6 w-full bg-slate-300 mb-2">
        <h2 className="font-medium text-xl">My Order</h2>
        <div>
          <XCircleIcon
            className="h-6 w-6 text-red-700 cursor-pointer"
            onClick={() => context.closeCheckoutSideMenu()}
          ></XCircleIcon>
        </div>
      </div>
      <div className="px-5 overflow-y-scroll flex-1">
        {
          context.cartProducts.map(product => (
            <OrderCard
              key={product.id} 
              id={product.id} 
              title={product.title} 
              imageUrl={product.images} 
              price={product.price}
              handleDelete={handleDelete}
            />
          ))
        }
      </div>
      <div className="px-6 mb-2 w-full">
        <p className="flex justify-between items-center w-full mr-20 mb-1">
          <span className="font-light">Total:</span>
          <span className="font-medium text-2xl">${totalPrice(context.cartProducts)}</span>
        </p>
        <Link to='/my-orders/last'>
          <button className='bg-black py-3 text-white w-full rounded-lg mb-2' onClick={() => handleCheckout()}>Checkout</button>
        </Link>
        
      </div>
    </aside>
  );
};

export default CheckoutSideMenu;
