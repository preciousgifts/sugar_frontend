// import React from 'react';
// import { Link } from 'react-router-dom';

// function Products() {
//   return (
//     <div>
//       <div className='d-flex justify-content-end'>
//         <button className='navrati-button font-1'>
//           <Link className='navrati-but' to='/admin-page/add-product'>
//             Add Product
//           </Link>
//         </button>
//       </div>
//       <div></div>
//     </div>
//   );
// }

// export default Products;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${import.meta.env.VITE_API_URL}/products/all-products`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.success) {
          setProducts(data.data);
        } else {
          setError('Failed to fetch products');
        }
      } catch (err) {
        setError('Error fetching products: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className='d-flex justify-content-center align-items-center' style={{ height: '50vh' }}>
        <div className='spinner-border text-primary' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='alert alert-danger m-3' role='alert'>
        {error}
      </div>
    );
  }

  return (
    <div className='container-fluid'>
      {/* Header with Add Product Button */}
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <h2 className='font-3 mb-0'>Products Management</h2>
        <button className='btn btn-primary navrati-button font-1'>
          <Link className='navrati-but text-white text-decoration-none' to='/admin-page/add-product'>
            + Add Product
          </Link>
        </button>
      </div>

      {/* Summary Stats */}
      {products.length > 0 && (
        <div className='row mt-4 mb-4'>
          <div className='col-md-3'>
            <div className='card bg-primary text-white'>
              <div className='card-body'>
                <h5 className='card-title'>Total Products</h5>
                <h3 className='card-text'>{products.length}</h3>
              </div>
            </div>
          </div>
          <div className='col-md-3'>
            <div className='card bg-success text-white'>
              <div className='card-body'>
                <h5 className='card-title'>Total Quantity</h5>
                <h3 className='card-text'>
                  {products.reduce((sum, product) => sum + (product.totalQuantity || 0), 0)}
                </h3>
              </div>
            </div>
          </div>
          <div className='col-md-3'>
            <div className='card bg-info text-white'>
              <div className='card-body'>
                <h5 className='card-title'>Special Products</h5>
                <h3 className='card-text'>{products.filter(product => product.navratiSpecial).length}</h3>
              </div>
            </div>
          </div>
          <div className='col-md-3'>
            <div className='card bg-warning text-dark'>
              <div className='card-body'>
                <h5 className='card-title'>Categories</h5>
                <h3 className='card-text'>{new Set(products.map(product => product.category)).size}</h3>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className='card shadow-sm'>
        <div className='card-header bg-light'>
          <h5 className='card-title mb-0 font-2'>All Products</h5>
        </div>
        <div className='card-body p-0'>
          {products.length === 0 ? (
            <div className='text-center p-5'>
              <p className='text-muted'>No products found.</p>
              <button className='btn btn-primary navrati-button font-1 mt-2'>
                <Link className='navrati-but text-white text-decoration-none' to='/admin-page/add-product'>
                  Add Your First Product
                </Link>
              </button>
            </div>
          ) : (
            <div className='table-responsive'>
              <table className='table table-hover table-striped mb-0'>
                <thead className='table-dark'>
                  <tr>
                    <th scope='col' className='font-2'>
                      Product Name
                    </th>
                    <th scope='col' className='font-2'>
                      Category
                    </th>
                    <th scope='col' className='font-2'>
                      Price (₦)
                    </th>
                    <th scope='col' className='font-2'>
                      Ratings
                    </th>
                    <th scope='col' className='font-2'>
                      Total Quantity
                    </th>
                    <th scope='col' className='font-2'>
                      Available
                    </th>
                    <th scope='col' className='font-2 text-center'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id}>
                      <td className='align-middle'>
                        <div className='d-flex align-items-center'>
                          {product.imageUrl && (
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className='rounded me-3'
                              style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                            />
                          )}
                          <div>
                            <strong className='font-1'>{product.name}</strong>
                            {product.navratiSpecial && <span className='badge bg-warning text-dark ms-2'>Special</span>}
                          </div>
                        </div>
                      </td>
                      <td className='align-middle'>
                        <span className='badge bg-info text-dark text-capitalize'>{product.category}</span>
                      </td>
                      <td className='align-middle'>
                        <div>
                          <strong className='text-success'>₦{product.currentPrice?.toLocaleString()}</strong>
                          {product.originalPrice && (
                            <div>
                              <small className='text-muted text-decoration-line-through'>
                                ₦{product.originalPrice?.toLocaleString()}
                              </small>
                              {product.discount && <span className='badge bg-danger ms-1'>{product.discount}</span>}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className='align-middle'>
                        {product.ratings ? (
                          <div>
                            <span className='text-warning'>★</span> {product.ratings}
                            {product.numberOfRatings && (
                              <small className='text-muted d-block'>({product.numberOfRatings})</small>
                            )}
                          </div>
                        ) : (
                          <span className='text-muted'>No ratings</span>
                        )}
                      </td>
                      <td className='align-middle'>
                        <span className='font-1'>{product.totalQuantity || 0}</span>
                      </td>
                      <td className='align-middle'>
                        {/* You might want to calculate available quantity based on sales */}
                        <span className='font-1'>{product.totalQuantity - (product.noOfSales || 0)}</span>
                      </td>
                      <td className='align-middle text-center'>
                        <button className='btn btn-outline-primary btn-sm font-1'>
                          <Link
                            to={`/admin-page/product/${product._id}`}
                            className='btn btn-outline-primary btn-sm font-1'>
                            View Details
                          </Link>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;
