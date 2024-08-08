import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'; 2
import { toast } from 'react-toastify';

const List = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/food/list');
        if (response.data.success) {
          setList(response.data.data);
          console.log(response);
          
        }
    } catch (error) {
      toast.error('Error fetching list');
      console.log(error);
    }
  }
  const removeFood= async (foodId) => {
  const response=await axios.post('http://localhost:4000/api/food/remove',{id:foodId});
  await fetchList();
  if(response.data.success){
    toast.success('Food removed successfully');
  }
  else{
    toast.error('Error removing food');
  }
}


  useEffect(() => {
    fetchList();
  },[]);

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className='list-table'>
        <div className='list-table-format title'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div className='list-table-format' key={index}>
            <img src={'http://localhost:4000/images/'+ item.image} alt={item.name} />
            <p>{item.name}</p>
            
            <p>{item.category}</p>
            <p>{item.price}</p>
            <p className='cursor' onClick={()=>removeFood(item._id)}>X</p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default List
