import { Button } from '../ui/button'
import { ChevronLeftIcon, ShoppingCart } from 'lucide-react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = ({ count }) => {

    return(
        <div className="flex justify-between items-center py-8 px-8 bg-secondary">
            <Button 
                onClick={() => window.history.back()}
            className='bg-secondary text-primary border-primary border hover:text-secondary hover:bg-primary'>
                <span><ChevronLeftIcon /></span>
                Back
            </Button>

            <h2 className='font-semibold text-primary text-2xl'>In Room Dining</h2>
            <div className='relative'>
                <span >
                    <ShoppingCart className='text-primary fill-primary cursor-pointer w-10 h-10'/>
                </span>
                <span className='absolute -top-2 -right-2 w-5 h-5 flex justify-center items-center text-white bg-primary rounded-full'>{count}</span>
            </div>
        </div>
    )

}

const ClientLayout = () => {
    const { count } = useSelector(state => state.cart)
  return (
    <div className='max-w-screen-md w-full min-h-screen'>
        <Navbar  count={count}/>
        <main className='overflow-auto'>
            <Outlet />
        </main>
    </div>
  )
}

export default ClientLayout