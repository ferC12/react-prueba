import {ChevronDoubleRightIcon, CalendarDaysIcon} from '@heroicons/react/24/solid'

const OrdersCard = props => {
    const {totalPrice, totalProducts} = props
    const currentDate = () => {
        const date = new Date().toLocaleDateString();
        return date
    }


    return(
        <div className="flex justify-between items-center mb-5 border rounded-lg border-black p-6 w-80 bg-teal-100">
            <div className='flex justify-between w-full'>
                <p className='flex flex-col'>
                    <p className='flex items-center gap-1'>
                        <CalendarDaysIcon className='w-5 h-5' />
                        <span className='font-light text-lg'>{currentDate()}</span>
                    </p>
                    <span className='font-light text-lg'>{totalProducts} Articles</span> 
                </p>
                <p className='flex items-center gap-2'>
                    <span className='font-bold text-3xl'>${totalPrice}</span>
                    <ChevronDoubleRightIcon className='h-6 w-6 text-black cursor-pointer' />
                </p>
                
            </div>
        </div>
    )
}

export default OrdersCard