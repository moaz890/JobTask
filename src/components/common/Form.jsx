import { Button } from '../ui/button';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Plus } from 'lucide-react';

const Form = ({ formData, setFormData, buttonText, onSubmit, formControls, isFromValid, total, setTotal }) => {
  const renderFormControllers = (control, index) => {

    
    let element = null;
    const value = formData[`extras[${index}][option_id]`] || "";
    if (!control.is_active) return null;
    switch (control.extra_type_name) {
        case "radio":
            element = (
                <div className='flex flex-col gap-3 mb-4'>
                    <Label className='bg-[#eee] p-3 rounded text-gray-800 text-lg flex justify-between items-center'>
                        <span>{control.name}</span>

                        {
                            control?.is_required &&
                            <span className='text-red-600'>Required</span>

                        }
                    </Label>
                    <RadioGroup
                        value={value}
                        onValueChange={(value) => {
                            setFormData({
                                ...formData,
                                [`extras[${index}][option_id]`]: value
                            })
                        }}
                    >
                        {
                            control.option.map((opt) => (
                                <div className='flex justify-between items-center' key={opt.id}>
                                    <Label htmlFor={`option-${opt.id}`} className='text-lg text-gray-600'>{opt.name}</Label>
                                    <div className='flex items-center'>
                                        <span className='text-[#333] font-normal mr-2'>+ {opt.currency} {opt.price}</span>
                                        <RadioGroupItem
                                            className='w-4 h-4 border-[#111]'
                                            name={`extras[${index}][option_id]`}
                                            value={opt.id}
                                            required={control.is_required}
                                            id={`option-${opt.id}`}
                                        >
                                        </RadioGroupItem>
                                    </div>
                                </div>
                            ))
                        }
                    </RadioGroup>
                </div>
            )
            break;
        default: 
            element = (
                <div className='flex flex-col gap-3'>
                    <Label className='bg-[#eee]'>{control.name}</Label>
                    <RadioGroup
                        value={value}
                        onValueChange={(value) => {
                            setFormData({
                                ...formData,
                                [`extras[${index}][option_id]`]: value
                            })
                        }}
                    >
                        {
                            control.option.forEach((opt) => (
                                <div className='flex justify-between items-center'>
                                    <Label htmlFor={`option-${opt.id}`}>{opt.name}</Label>
                                    <div>
                                        <span className='text-primary'>{opt.currency}</span>
                                        <Checkbox
                                            name={`extras[${index}][option_id]`}
                                            value={opt.id}
                                            required={control.is_required}
                                            id={`option-${opt.id}`}
                                        >
                                        </Checkbox>
                                    </div>
                                </div>
                            ))
                        }
                    </RadioGroup>
                </div>
            )
    }
    return element;
  }  
  
    return (
    <form onSubmit={onSubmit}
        autoComplete='off' 
        className='w-full h-full'
    >
        {formControls.map((extra, index) => (
            <div key={index}>
                {renderFormControllers(extra, index)}
            </div>
            
        ))}
        <Button
            type='submit'
            disabled={isFromValid ? !isFromValid() : null} variant='default' className='flex justify-between w-full mt-4 py-8'>
            <div className='flex gap-3 items-center'>
                <span className='bg-white border-2'>
                    <Plus className='text-primary font-bold' size={'icon'}/>
                </span>
                <span className='text-xl font-bold'  >{buttonText}</span>
            </div>
            <span className='text-white text-xl font-semibold'>AED {total}</span>
        </Button>
    </form>
  )
}

export default Form