import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { useDispatch } from 'react-redux';
import { setItemDetails } from '@/store/categorySlice';

const ItemCard = ({ item, setOpenItemDialog }) => {
  const dispatch = useDispatch();
  return (
    <Card 
      onClick={() => {
        dispatch(setItemDetails(item))
        setOpenItemDialog(true)
      }}
      className='relative w-full cursor-pointer flex items-center'>
        <div className='h-full w-[150px] sm:w-[300px] '>
            <img src={item?.image} alt={item?.name} className='min-w-full h-[240px] object-cover' />
        </div>
        <div className='flex-1 px-6'>
            <h3 className='font-semibold text-2xl'>{item?.name}</h3>
            <p className='text-sm font-medium text-[#030303] line-clamp-2 sm:line-clamp-none'>{item?.description}</p>

            <div className="flex mt-6 items-center justify-between">
                <span className='text-primary text-sm font-semibold sm:text-[1.25rem]'>AED {item?.price}</span>
                <Button>Add To Cart</Button>
            </div>
        </div>
        <span className='absolute -right-4 w-4 top-[10%] h-[80%] bg-gradient-to-t from-gray-300 to-gray-100'></span>
        <span className='absolute -left-4 w-4 top-[10%] h-[80%] bg-gradient-to-b from-gray-300 to-gray-100 z-20' ></span>
    </Card>
  );
}

export default ItemCard;