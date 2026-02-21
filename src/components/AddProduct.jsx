import React, { useState } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';

const AddProduct = () => {
  const [form, setForm] = useState({
    name: '',
    currentPrice: '',
    originalPrice: '',
    discount: '',
    colors: [],
    category: '',
    subCategory: '',
    subSubCategory: '',
    navratiSpecial: false,
    sugarPop: false,
    sugarPlay: false,
    gifting: false,
    totalQuantity: '',
    files: [],
  });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = e => {
    setForm(prev => ({ ...prev, files: e.target.files }));
  };

  const colorOptions = [
    { value: 'red', label: 'Red' },
    { value: 'blue', label: 'Blue' },
    { value: 'black', label: 'Black' },
    { value: 'wine', label: 'Wine' },
    { value: 'brown', label: 'Brown' },
  ];

  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach(key => {
      if (key === 'files') {
        for (let file of form.files) formData.append('images', file);
      } else if (key === 'colors') {
        form.colors.forEach(color => formData.append('colors', color));
      } else {
        formData.append(key, form[key]);
      }
    });

    if (!form.files.length) {
      alert('Please upload at least one image');
      return;
    }

    try {
      const token = localStorage.getItem('token');

      const res = await fetch(`${import.meta.env.VITE_API_URL}/products/create-product`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        alert('Product added successfully!');
        setForm({
          name: '',
          currentPrice: '',
          originalPrice: '',
          discount: '',
          colors: [],
          category: '',
          subCategory: '',
          subSubCategory: '',
          navratiSpecial: false,
          sugarPop: false,
          sugarPlay: false,
          gifting: false,
          noOfavailableProduct: '',
          files: [],
        });
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (err) {
      alert('Something went wrong!');
      console.error(err);
    }
  };

  return (
    <div className=''>
      <div className='d-flex align-items-center mb-5 position-relative'>
        <button className='navrati-button font-1'>
          <Link className='navrati-but' to='/admin-page/products'>
            Back
          </Link>
        </button>
        <div className='flex-grow-1 text-center'>
          <h3 className='font-3 mb-0'>Add New Product</h3>
        </div>
      </div>
      {/* <div className='d-flex justify-content-between align-items-center mb-5'>
        <button className='navrati-button font-1'>
          <Link className='navrati-but' to='/admin-page/products'>
            Back
          </Link>
        </button>
        <div className='position-absolute start-50 translate-middle-x'>
          <h3 className='font-3 mb-0'>Add New Product</h3>
        </div>
      </div> */}
      {/* <div className=' d-flex mb-5'>
        <button className='navrati-button font-1'>
          <Link className='navrati-but' to='/admin-page/products'>
            Back
          </Link>
        </button>
        <div className='d-flex justify-content-center'>
          <h3 className='font-3'>Add New Product</h3>
        </div>
      </div> */}

      <form onSubmit={handleSubmit} className='font-3 add-product-form'>
        <div className='form-floating mb-3'>
          <input
            type='name'
            name='name'
            id='name'
            placeholder='Good products'
            className='form-control'
            value={form.productName}
            onChange={handleChange}
            required
          />
          <label htmlFor='name'>Name</label>
        </div>

        <div className='form-floating mb-3'>
          <input
            type='currentPrice'
            name='currentPrice'
            id='currentPrice'
            className='form-control'
            value={form.currentPrice}
            placeholder='123456'
            onChange={handleChange}
            required
          />
          <label htmlFor='currentPrice'>Current Price</label>
        </div>

        <div className='form-floating mb-3'>
          <input
            type='originalPrice'
            id='OriginalPrice'
            name='originalPrice'
            className='form-control'
            value={form.originalPrice}
            placeholder='123456'
            onChange={handleChange}
          />
          <label htmlFor='originalPrice'>Original Price</label>
        </div>

        <div className='form-floating mb-3'>
          <input
            type='category'
            id='category'
            name='category'
            className='form-control'
            value={form.category}
            placeholder='lips'
            onChange={handleChange}
            required
          />
          <label htmlFor='category'>Category</label>
        </div>

        <div className='form-floating mb-3'>
          <input
            name='subCategory'
            id='subCategory'
            type='subCategory'
            className='form-control'
            value={form.subCategory}
            placeholder='lipsticks'
            onChange={handleChange}
            required
          />
          <label htmlFor='subCategory'>Sub Category</label>
        </div>

        <div className='form-floating mb-3'>
          <input
            name='subSubCategory'
            id='subSubCategory'
            type='subSubCategory'
            className='form-control'
            value={form.subSubCategory}
            placeholder='lipsticks'
            onChange={handleChange}
            required
          />
          <label htmlFor='subCategory'>Sub subCategory</label>
        </div>

        <div className='form-floating mb-3'>
          <input
            type='discount'
            id='discount'
            name='discount'
            className='form-control'
            value={form.discount}
            placeholder='25% off'
            onChange={handleChange}
          />
          <label htmlFor='discount'>Discount</label>
        </div>
        <div className='form-floating mb-3'>
          <input
            type='totalQuantity'
            id='totalQuantity'
            name='totalQuantity'
            className='form-control'
            value={form.totalQuantity}
            placeholder='25% off'
            onChange={handleChange}
            required
          />
          <label htmlFor='discount'>Total quantity</label>
        </div>

        <div className='mb-3'>
          <label>
            Colors:
            <Select
              isMulti
              name='colors'
              options={colorOptions}
              className='basic-multi-select form-control mb-3'
              classNamePrefix='select'
              value={colorOptions.filter(opt => form.colors.includes(opt.value))}
              onChange={selected =>
                setForm(prev => ({
                  ...prev,
                  colors: selected.map(opt => opt.value),
                }))
              }
            />
          </label>
        </div>

        <div className='mb-3 form-check'>
          <label className='form-check-label'>
            Navrati Special
            <input
              type='checkbox'
              name='navratiSpecial'
              className='form-check-input'
              checked={form.navratiSpecial}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className='mb-3 form-check'>
          <label className='form-check-label'>
            Sugar Pop
            <input
              type='checkbox'
              name='sugarPop'
              className='form-check-input'
              checked={form.sugarPop}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className='mb-3 form-check'>
          <label className='form-check-label'>
            Sugar Play
            <input
              type='checkbox'
              name='sugarPlay'
              className='form-check-input'
              checked={form.sugarPlay}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className='mb-3 form-check'>
          <label className='form-check-label'>
            Gifting
            <input
              type='checkbox'
              name='gifting'
              className='form-check-input'
              checked={form.gifting}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className='mb-3'>
          <label>
            Images:
            <input type='file' multiple className='form-control' onChange={handleFileChange} />
          </label>
        </div>

        <button type='submit' className='btn btn-dark '>
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
