import React, { useState } from 'react';
import axios from 'axios'
import './Form.css'
const Form = () => {
  const [colorData, setColorData] = useState({
    srNo: '',
    color: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setColorData({
      ...colorData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(colorData);

    axios.post('https://cygnii.onrender.com',colorData).then((res)=>{
        console.log("done");
        alert('Data sent successfully');
        
    }).catch((Err)=>{
        console.log(Err);
        
    })


  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="srNo">Serial Number</label>
          <input
            type="text"
            id="srNo"
            name="srNo"
            value={colorData.srNo}
            onChange={handleChange}
            placeholder="Enter Serial Number" 
          />
        </div>
        <div>
          <label htmlFor="color">Color</label>
          <input
            type="text"
            id="color"
            name="color"
            value={colorData.color}
            onChange={handleChange}
            placeholder="Enter Color"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
