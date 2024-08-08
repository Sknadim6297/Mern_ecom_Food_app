import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name:'',
    desc:'',
    category: 'Salad',
    price:''
  });

  const onChangeHandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const onSubmitHandler= async (event)=>{
    event.preventDefault();
   const formData=new FormData();
    formData.append('name',data.name);
    formData.append('desc',data.desc);
    formData.append('category',data.category);
    formData.append('price',Number(data.price));
    formData.append('image',image);
    
    try {
      const response = await axios.post('http://localhost:4000/api/food/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      if (response.data.success) {
        toast.success('Product added successfully');
        setData({
          name: '',
          desc: '',
          category: 'Salad',
          price: ''
        });
        setImage(null);
      }
    } catch (error) {
      toast.error('Error adding product');
      console.error('Error adding product:', error.response ? error.response.data : error.message);
    }
  }



  return (
    <div className='add'>
      <form onSubmit={onSubmitHandler} className='flex-col'>
        <div className='add-image-upload flex-col'>
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image):assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />


        </div>
        <div className='add-product-name flex-col'>
          <p>Product name</p>
          <input type="text" onChange={onChangeHandler} value={data.name} name="name" placeholder='type here' />
        </div>
        <div className='add-product-desc flex-col'>
          <p>Product Description</p>
          <textarea onChange={onChangeHandler} value={data.desc} name="desc" rows='6' placeholder='Write content here'></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
          <p>Product Category</p>
          <select onChange={onChangeHandler} value={data.category} name="category">
            <option value="Salad">Salad</option>
            <option value="Rolls">Rolls</option>
            <option value="Deserts">Deserts</option>
            <option value="Sandwich">Sandwich</option>
            <option value="Cake">Cake</option>
            <option value="Pure Veg">Pure Veg</option>
            <option value="Pasta">Pasta</option>
            <option value="Noodles">Noodles</option>
          </select>
          </div>
          <div className='add-price flex-col'>
            <p>Product price</p>
            <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20' />
          </div>
        </div>
        <button type='submit' className='add-btn'>Add</button>
      </form>

    </div>
  )
}

export default Add
