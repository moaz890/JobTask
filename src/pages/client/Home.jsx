import CategoryCard from '@/components/client/CategoryCard';
import { Input } from '@/components/ui/input';
import { fetchCategories } from '@/store/categorySlice';
import { SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {

    const { categories } = useSelector((state) => state.category);
    const [search, setSearch] = useState("");
    const [filterCategories, setFilterCategories] = useState(categories);
    const dispatch = useDispatch();

    const handleFilterCategories = (e) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        dispatch(fetchCategories()).then((data) => console.log(data))
    }, [dispatch]);

    console.log(categories)

    useEffect(() => {
        setFilterCategories(categories.filter(category => category.name.toLowerCase().includes(search.toLowerCase())))
    }, [categories, search])
  return (
    <div>
        <div className='my-4 flex justify-center items-center relative'>
            <div className='relative max-w-screen-sm w-full'>
                <Input className='w-full py-6 border-2 border-primary pl-12 text-primary' placeholder='Search For Categories ...'
                    onChange={handleFilterCategories}
                    value={search}
                ></Input>
                <SearchIcon className='absolute top-1/2 -translate-y-1/2 left-4 text-primary' />
            </div>
        </div>
        <div className='py-4 grid grid-cols-1 sm:grid-cols-2 gap-4'>
            {
                filterCategories?.length > 0 && filterCategories?.map((category) => (
                    <CategoryCard key={category.id} category={category} />
                ))
            }
        </div>
    </div>
  )
}

export default Home