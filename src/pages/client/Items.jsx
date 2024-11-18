import ItemCard from '@/components/client/ItemCard';
import ItemDetailsDialog from '@/components/client/ItemDetailsDialog';
import { Dialog } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { fetchCategories, fetchCategoryItems } from '@/store/categorySlice';
import { SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const Items = () => {
    const [openItemDialog, setOpenItemDialog] = useState(false);
    const { categories, restaurantId, itemDetails, categoryItems } = useSelector(state => state.category);
    const { count, price } = useSelector(state => state.cart);
    const { categoryId } = useParams();
    const [search, setSearch] = useState("");
    const [filterItems, setFilterItems] = useState(categoryItems);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleFilterItems = (e) => {
        setSearch(e.target.value)
    }
    useEffect(() => {
        dispatch(fetchCategoryItems(categoryId)).then((data) => console.log(data))
    }, [dispatch, categoryId])

    useEffect(() => {
        setFilterItems(categoryItems?.filter(item => item.name.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase())))
    }, [categoryItems, search])

    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch])

    console.log(restaurantId)
  return (
    <div className='relative overflow-hidden'>
        <div className='my-4 flex justify-center items-center relative'>
            <div className='relative max-w-screen-sm w-full'>
                <Input className='w-full py-6 border-2 border-primary pl-12 text-primary' placeholder='Search For Dishes, Drinks ...'
                
                    onChange={handleFilterItems}
                    value={search}
                ></Input>
                <SearchIcon className='absolute top-1/2 -translate-y-1/2 left-4 text-primary' />
            </div>
        </div>
        <div className='flex justify-between items-center overflow-auto max-w-[90vw] gap-4 py-4 items-scroll-bar'>
            {
                categories?.map((category) => (
                    <div 
                        key={category?.id}
                        onClick={() => navigate(`/categories/${category?.id}/items`)}
                        className={`${category?.id == categoryId ? 'text-white bg-primary' : 'text-primary bg-white'} min-w-max border-primary border-2 cursor-pointer rounded-md px-3 py-3`}>
                        {category?.name}
                    </div>
                ))
            }
        </div>
        <div className='py-4 px-8 grid grid-cols-1 gap-4'>
        {   
            filterItems?.length > 0 && filterItems?.map((item) => (
                <ItemCard key={item.id} item={item} setOpenItemDialog={setOpenItemDialog} />
            ))
        }
        </div>
        
        <div>
            <div className="flex px-6 py-4  items-center justify-between w-full rounded-t-[32px] bg-primary">
                <div className="flex items-center gap-4">
                    <span className='py-1 px-2 text-primary bg-white rounded-sm'>{count}</span>
                    <h4 className='text-xl font-semibold text-white'>View Cart</h4>
                </div>
                <h3 className='text-xl font-semibold text-white'>
                    <span className='mr-2'>AED</span>
                    {
                        price
                    }
                </h3>
            </div>
            <p className='text-primary text-sm bg-white p-3 text-center'>
            Prices are in AED and are inclusive of 10% service charges, 5% VAT
            & 7% Municipality fee
            </p>
        </div>
        <Dialog open={openItemDialog} 
            onOpenChange={() => {
                setOpenItemDialog(false);
            }}
            className='overflow-auto'
            
        >
            <ItemDetailsDialog restaurantId={restaurantId} itemDetails={itemDetails} categories={categories} setOpenItemDialog={setOpenItemDialog} />
        </Dialog>
    </div>
  )
}

export default Items