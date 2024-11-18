import { useEffect, useState } from "react";
import { DialogContent } from "../ui/dialog"
import { useDispatch } from "react-redux";
import Form from "../common/Form";
import { addToCart } from "@/store/cartSlice";
import { useToast } from "@/hooks/use-toast";
import { setItemDetails } from "@/store/categorySlice";

const ItemDetailsDialog = ({ itemDetails, restaurantId, setOpenItemDialog }) => {    
    const [formData, setFormData] = useState({})
    const [total, setTotal] = useState(0);
    const { toast } = useToast()
    const dispatch = useDispatch();
    
    const onSubmit = (e) => {
      e.preventDefault();
      const checkFormDataValues = Object.values(formData).every((value) => value !== "")

      if(!checkFormDataValues) {
        toast({
          title: "Failed Submit",
          description: "There are some inputs required you leave it empty",
          variant: "destructive"
        })
        setOpenItemDialog(false);
        return
      };

      dispatch(addToCart(formData)).then((data) => {
        if(data.payload.status) {
          toast({
            title: "Success Process",
            description: "Item Added To Cart Successfully"
          })
          setOpenItemDialog(false)
          dispatch(setItemDetails(null))
        }
      })
    }

    useEffect(() => {
      if (itemDetails?.extrasWithOptions?.length > 0) {
        let extras = {}
        itemDetails?.extrasWithOptions?.forEach((extra, indexOfExtra) => {
          extra?.option?.forEach((opt) => {
            extras[`extras[${indexOfExtra}][option_id]`] = ""
          })
        })
        setFormData(prev => ({
          restaurant_id : restaurantId,
          item_id: itemDetails?.id, 
          quantity: 1,
          ...extras
        }))
      }else{
        setFormData(prev => ({
          restaurant_id : restaurantId,
          item_id: itemDetails?.id, 
          quantity: 1,
        }))
      }
      setTotal(itemDetails?.price * formData['quantity'] || 0);
    }, [itemDetails])


  return (
    <DialogContent className='grid grid-cols-1 gap-4 p-4 px-8 max-w-screen-md max-h-[90vh] overflow-y-auto'>
        <div className="flex items-center justify-center">
            <img src={itemDetails?.image} alt={itemDetails?.name} className='max-w-[80%] w-full object-cover' />
        </div>
        <h2 className='text-xl font-semibold text-start'>{itemDetails?.name}</h2>
        <p className='text-gray-900'>{itemDetails?.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-primary text-lg font-normal">AED {total}</span>
          <div className="flex items-center gap-2 border-primary w-48 justify-between border-2 rounded">
            <button className="text-primary px-2 py-1 rounded-md text-2xl font-bold" onClick={() => {
            setTotal(prev => formData['quantity'] > 1 ? prev - itemDetails?.price : prev)
              setFormData(prev => ({
                ...prev,
                quantity: formData['quantity'] > 1 ? formData['quantity'] - 1 : formData['quantity']  
              }))
            }}>-</button>
            <span className="text-lg font-semibold text-primary">{formData['quantity'] || 0}</span>
            <button className="text-primary px-2 py-1 rounded-md text-2xl font-bold" onClick={() => {
              setFormData(prev => ({
                ...prev,
                quantity: formData['quantity'] + 1  
              }))
              setTotal(prev => prev + itemDetails.price)
            }}>+</button>
          </div>
        </div>

        {
          itemDetails?.extrasWithOptions &&
          <Form
          formControls={itemDetails?.extrasWithOptions}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          buttonText={"Add to Cart"}
          total={total}
          setTotal={setTotal}
        >
        </Form>}        
    </DialogContent>
  )
}

export default ItemDetailsDialog