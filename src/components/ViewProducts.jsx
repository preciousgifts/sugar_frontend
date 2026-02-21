import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import RatingSystem from '../components/RatingSystem';

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  // Fetch single product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${productId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (data.success) {
          setProduct(data.data);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Error fetching product details: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  // Image gallery array
  const productImages = [];
  if (product?.imageUrl) productImages.push(product.imageUrl);
  if (product?.imageUrl2) productImages.push(product.imageUrl2);

  if (loading) {
    return (
      <div className='container-fluid'>
        <div className='d-flex justify-content-center align-items-center' style={{ height: '50vh' }}>
          <div className='spinner-border text-primary' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='container-fluid'>
        <div className='alert alert-danger m-3' role='alert'>
          {error}
          <div className='mt-3'>
            <Link to='/admin-page/products' className='btn btn-primary'>
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className='container-fluid'>
        <div className='alert alert-warning m-3' role='alert'>
          Product not found.
          <div className='mt-3'>
            <Link to='/admin-page/products' className='btn btn-primary'>
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='container-fluid'>
      {/* Header with Back Button */}
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <div className='d-flex align-items-center'>
          <Link to='/admin-page/products' className='btn btn-outline-secondary me-3'>
            ← Back to Products
          </Link>
          <h2 className='font-3 mb-0'>Product Details</h2>
        </div>
        <div>
          <button className='btn btn-warning me-2'>Edit Product</button>
          <button className='btn btn-danger'>Delete Product</button>
        </div>
      </div>

      <div className='row'>
        {/* Product Images */}
        <div className='col-md-6'>
          <div className='card shadow-sm mb-4'>
            <div className='card-body'>
              <h5 className='card-title font-2'>Product Images</h5>

              {/* Main Image */}
              <div className='text-center mb-3'>
                <img
                  src={productImages[activeImage]}
                  alt={product.name}
                  className='img-fluid rounded'
                  style={{ maxHeight: '400px', objectFit: 'contain' }}
                />
              </div>

              {/* Thumbnail Gallery */}
              {productImages.length > 1 && (
                <div className='d-flex justify-content-center gap-2'>
                  {productImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className={`img-thumbnail cursor-pointer ${activeImage === index ? 'border-primary' : ''}`}
                      style={{
                        width: '80px',
                        height: '80px',
                        objectFit: 'cover',
                        cursor: 'pointer',
                      }}
                      onClick={() => setActiveImage(index)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Information */}
        <div className='col-md-6'>
          <div className='card shadow-sm mb-4'>
            <div className='card-body'>
              <h3 className='card-title font-3 text-primary'>{product.name}</h3>

              {/* Price Information */}
              <div className='mb-3'>
                <h4 className='text-success mb-1'>₦{product.currentPrice?.toLocaleString()}</h4>
                {product.originalPrice && (
                  <div className='d-flex align-items-center gap-2'>
                    <span className='text-muted text-decoration-line-through'>
                      ₦{product.originalPrice?.toLocaleString()}
                    </span>
                    {product.discount && <span className='badge bg-danger'>{product.discount}</span>}
                  </div>
                )}
              </div>

              {/* Ratings */}
              {product.ratings && (
                <div className='mb-3'>
                  <span className='text-warning fs-5'>★</span>
                  <strong className='ms-1'>{product.ratings}</strong>
                  {product.numberOfRatings && (
                    <span className='text-muted ms-2'>({product.numberOfRatings} ratings)</span>
                  )}
                </div>
              )}

              {/* Basic Info */}
              <div className='row mb-4'>
                <div className='col-6'>
                  <strong>Category:</strong>
                  <br />
                  <span className='badge bg-info text-dark text-capitalize'>{product.category}</span>
                </div>
                <div className='col-6'>
                  <strong>Product ID:</strong>
                  <br />
                  <code>{product._id}</code>
                </div>
              </div>

              {/* Inventory */}
              <div className='row mb-4'>
                <div className='col-6'>
                  <strong>Total Quantity:</strong>
                  <br />
                  <span className='fs-5'>{product.totalQuantity || 0}</span>
                </div>
                <div className='col-6'>
                  <strong>Number of Sales:</strong>
                  <br />
                  <span className='fs-5'>{product.noOfSales || 0}</span>
                </div>
              </div>

              {/* Available Calculation */}
              <div className='alert alert-info'>
                <strong>Available Stock:</strong> {(product.totalQuantity || 0) - (product.noOfSales || 0)} units
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Details Row */}
      <div className='row'>
        {/* Product Features */}
        <div className='col-md-6'>
          <div className='card shadow-sm mb-4'>
            <div className='card-body'>
              <h5 className='card-title font-2'>Product Features</h5>

              <div className='row'>
                <div className='col-6 mb-2'>
                  <strong>Navrati Special:</strong>
                  <br />
                  <span className={`badge ${product.navratiSpecial ? 'bg-warning text-dark' : 'bg-secondary'}`}>
                    {product.navratiSpecial ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className='col-6 mb-2'>
                  <strong>Sugar Pop:</strong>
                  <br />
                  <span className={`badge ${product.sugarPop ? 'bg-success' : 'bg-secondary'}`}>
                    {product.sugarPop ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className='col-6 mb-2'>
                  <strong>Sugar Play:</strong>
                  <br />
                  <span className={`badge ${product.sugarPlay ? 'bg-info' : 'bg-secondary'}`}>
                    {product.sugarPlay ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className='col-6 mb-2'>
                  <strong>Gifting:</strong>
                  <br />
                  <span className={`badge ${product.gifting ? 'bg-primary' : 'bg-secondary'}`}>
                    {product.gifting ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Colors & Additional Info */}
        <div className='col-md-6'>
          <div className='card shadow-sm mb-4'>
            <div className='card-body'>
              <h5 className='card-title font-2'>Additional Information</h5>

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div className='mb-3'>
                  <strong>Available Colors:</strong>
                  <div className='d-flex flex-wrap gap-2 mt-2'>
                    {product.colors.map((color, index) => (
                      <span
                        key={index}
                        className='badge bg-light text-dark border'
                        style={{ textTransform: 'capitalize' }}>
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Dates */}
              <div className='mb-2'>
                <strong>Created:</strong> <span className='text-muted'>{product.createdAt}</span>
              </div>
              <div className='mb-2'>
                <strong>Last Updated:</strong> <span className='text-muted'>{product.updatedAt}</span>
              </div>

              {/* Image Public IDs */}
              <div className='mt-3'>
                <small className='text-muted'>
                  <strong>Image Public ID:</strong> {product.imagePublicId}
                </small>
                {product.image2PublicId && (
                  <small className='text-muted'>
                    <strong>Second Image Public ID:</strong> {product.image2PublicId}
                  </small>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className='card shadow-sm'>
        <div className='card-body text-center'>
          <div className='btn-group' role='group'>
            <button className='btn btn-warning btn-lg'>
              <i className='bi bi-pencil-square me-2'></i>
              Edit Product
            </button>
            <button className='btn btn-danger btn-lg'>
              <i className='bi bi-trash me-2'></i>
              Delete Product
            </button>
            <Link to='/admin-page/products' className='btn btn-secondary btn-lg'>
              <i className='bi bi-arrow-left me-2'></i>
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
