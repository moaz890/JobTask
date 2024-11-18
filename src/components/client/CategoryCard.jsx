import { Card } from '../ui/card'
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ category }) => {
    const navigate = useNavigate();
    
    const checkMenuAvailability = () => {
        if (category?.is_closed) {
            return category?.opens_at;
        }
        return null;
    }

    const closedNote = checkMenuAvailability();

    return (
        <Card className='w-full max-w-sm mx-auto overflow-hidden cursor-pointer'
            onClick={() => navigate(`/categories/${category?.id}/items`)}
        >
            <div className='relative'>
                <img src={category?.image} 
                    alt={category?.name} 
                    className='w-full h-[300px] object-cover rounded-t-lg'
                />
                <h2 className='text-xl font-bold mb-2 absolute bottom-3 left-0 right-0 text-center text-white'>{category?.name}</h2>
                {closedNote && (
                    <span className='absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm'>
                        {closedNote}
                    </span>
                )}
            </div>
        </Card>
    )
}

export default CategoryCard
