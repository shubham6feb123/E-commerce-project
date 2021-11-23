import React,{useState,useLayoutEffect} from 'react'

import {list} from '../../../functions/category';

import {subCategories} from '../../../functions/subcategory';
//css
import './product.css'

//components
import { Input, Button,InputNumber,Select} from 'antd';
import UploadImage from '../../../components/fileuploader/UploadImage';
import { useSelector } from 'react-redux';
import { Create } from '../../../functions/product';
import {toast} from 'react-toastify';
const {Option} = Select;

//initialState
const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  subcategories: [],
  shipping: "",
  quantity: "",
  images: [],
  color: [],
  brand: "",
};


let allUploadedFiles = [];

function Product() {
  const [values,setValues] = useState(initialState);
  const [fetched,setFetched] = useState(false);
  const [categories,setCategories] = useState(null);
  const [subcategories,setSubcategories] = useState(null);
  const [renderSubcategories,setRenderSubcategories] = useState(false);
  const [images,setImages] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

useLayoutEffect(()=>{
  loadCategory();
  return ()=>fetched;
  // eslint-disable-next-line
},[])

useLayoutEffect(()=>{
  subCategories(values?.category).then(response=>{
    setSubcategories([...response.data]);
    // console.log("subcategories value",response.data)
  }).catch((error)=>console.log("subcategories error",error))

  // eslint-disable-next-line
},[renderSubcategories])

const loadCategory = ()=>{
  list().then((res)=>{
    setCategories([...res.data]);
    setFetched(true)
    })
}


const typeChange = (value)=>{
if(value.currentTarget.value){
  setValues({...values,[value.currentTarget.name]:value.currentTarget.value})
}
}

const priceChange = (value)=>{
value && setValues({...values,price:value})
}

const quantityChange = (value)=>{
  value && setValues({...values,quantity:value})
}

const shippingChange = (value)=>{
  value && setValues({...values,shipping:value})
}

const colorChange = (value)=>{
  value && setValues({...values,color:value})
}

const categoryChange = (value)=>{
  value && setValues({...values,category:value})
  setRenderSubcategories(!renderSubcategories)
}

const categoriesChange = (value)=>{
  value && setValues({...values,subcategories:value})
  console.log(subcategories,value);
}


const buttonClick = ()=>{
  
  const{title,description,price,color,brand,images,quantity,subcategories,category,shipping} = values;
  if(title&&description&&price&&color.length>0&&brand&&images.length>0&&quantity&&subcategories.length>0&&category&&shipping){
    // console.log("all values",values);
    createProduct(values)
  }else{
      console.log("fill all the fileds")
  }
}

const createProduct = async(values)=>{
  try{
    const created  = await Create(values,user.email);
    created&&toast.success("product created",{position:"bottom-right"})
  }catch(error){
    toast.error("failed to create product",{position:"bottom-right"})
  }
}
 

// console.log("color value",values.color)

  return (
    <div className="admin__Product">
      <div className="admin__product__wrapper">
     <h2 style={{textAlign:"center"}}>Create Product</h2>
     <form action="" className="product__form">
     <div className="input__field">
       <label htmlFor="title">Name of Product</label>
       <Input name="title" placeholder="" id="title" onChange={typeChange}/>
     </div>
     <div className="input__field">
       <label htmlFor="brand">Brand of Product</label>
       <Input name="brand" placeholder="" id="brand"  onChange={typeChange}/>
     </div>
     <div className="input__field">
       <label htmlFor="title">Price of Product</label>
       <InputNumber
       name="price"
       id="price"
       onChange={priceChange}
       style={{width:'100%'}}
      defaultValue={1000}
      formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      parser={value => value.replace(/\$\s?|(,*)/g, '')}
    />
     </div>
     <div className="input__field">
       <label htmlFor="title">Quantity of Product</label>
       <InputNumber id="quantity" name="quantity" style={{width:'100%'}} defaultValue={3} onChange={quantityChange}/>
     </div>
     <div className="input__field">
       <label htmlFor="title">Shipping of Product</label>
       <Select
       id="shipping"
       name="shipping"
    style={{ width:' 100%' }}
    placeholder="Select a shipping option"
    onChange={shippingChange}
  >
    <Option value="Yes">Yes</Option>
    <Option value="No">No</Option>
  </Select>
     </div>

     <div className="input__field">
       <label htmlFor="title">Color of Product</label>
       <Select
       id="color"
       name="color"
       onChange={colorChange}
        mode="tags"
        placeholder="Please select color options"
        // defaultValue={['red','silver','grey','black','blue']}
        style={{ width: '100%' }}
      >
        <Option key="4" value="Silver">Silver</Option>
        <Option key="1" value="Black">Black</Option>
        <Option key="2" value="Blue">Blue</Option>
        <Option key="3" value="Red">Red</Option> 
      </Select>
     </div>

     <div className="input__field">
       <label htmlFor="title">Category of Product</label>
       <Select
       id="category"
       name="category"
       onChange={categoryChange}
        placeholder="Please select category"
        style={{ width: '100%' }}
      >
        {categories?.map((category)=>(
          <Option key={category._id} value={category._id}>{category.name}</Option>
        ))}
      </Select>
     </div>

    {values.category && (<div className="input__field">
       <label htmlFor="title">Subcategories of Product</label>
       <Select
       id="color"
       name="subcategories"
       onChange={categoriesChange}
        mode="tags"
        placeholder="Please select subcategories options"
        // defaultValue={['red','silver','grey','black','blue']}
        style={{ width: '100%' }}
      >
    {
subcategories?.map((subcategory)=>(
<Option key={subcategory._id} value={subcategory._id}>{subcategory.name}</Option>
))
    }
      </Select>
     </div>)
}

<div className="input__field">
       <label htmlFor="description">Description of Product</label>
       <Input.TextArea showCount maxLength={3000} name="description" placeholder="Please type description of product" id="description"  onChange={typeChange}/>
 </div>

 <div className="input__field">
   <UploadImage  setImages={setImages} images={images} values={values} setValues={setValues}  allUploadedFiles={allUploadedFiles}/>
 </div>

     <div className="input__field">
     <Button type="primary" block onClick={buttonClick}>
      Create
    </Button>
     </div>
     </form>
      </div>
    </div>
  )
}

export default Product
