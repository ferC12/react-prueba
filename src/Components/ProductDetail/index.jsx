import { useContext } from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../Context";
import "./styles.css";


const ProductDetail = () => {
  const context = useContext(ShoppingCartContext)
    
  return (
    <aside
      className={`${context.isProductDetailOpen ? 'flex' : 'hidden'} product-detail flex-col fixed items-center border border-black rounded-lg bg-stone-200`}>
      <div className='flex justify-between items-center p-6 w-full'>
        <h2 className='font-medium text-xl'>Detail</h2>
        <div>
          <XCircleIcon
            className='h-6 w-6 text-red-700 cursor-pointer'
            onClick={() => context.closeProductDetail()}></XCircleIcon>
        </div>
      </div>
      <figure className='px-5'>
        <img
          className='w-full h-full rounded-lg'
          src={context.productToShow.images}
          alt={context.productToShow.title} />
      </figure>
      <p className='flex flex-col p-5'>
        <span className='font-medium text-2xl mb-2'>${context.productToShow.price}</span>
        <span className='font-bold text-md'>${context.productToShow.title}</span>
        <span className='font-light text-sm'>${context.productToShow.description}</span>
      </p>
    </aside>
  )
};

export default ProductDetail
