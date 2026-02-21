import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RatingSystem = ({ productId }) => {
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ratingStats, setRatingStats] = useState(null);
  const [existingRating, setExistingRating] = useState(null);

  // Fetch user's existing rating and product rating stats
  useEffect(() => {
    const fetchRatingData = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch product rating statistics
        const statsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}/ratings`);

        if (statsResponse.data.success) {
          setRatingStats(statsResponse.data.data.statistics);
        }

        // Fetch user's rating if logged in
        if (token) {
          const userRatingResponse = await fetch(`${import.meta.env.VITE_API_URL}/products/${productId}/my-rating`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
          });

          if (userRatingResponse.data.success && userRatingResponse.data.data) {
            const rating = userRatingResponse.data.data;
            setExistingRating(rating);
            setUserRating(rating.rating);
            setComment(rating.comment || '');
          }
        }
      } catch (error) {
        console.error('Error fetching rating data:', error);
      }
    };

    fetchRatingData();
  }, [productId]);

  const handleSubmitRating = async () => {
    if (userRating === 0) {
      alert('Please select a rating');
      return;
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        alert('Please login to submit a rating');
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/ratings`,
        {
          productId: parseInt(productId),
          rating: userRating,
          comment: comment,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        alert(existingRating ? 'Rating updated successfully!' : 'Rating submitted successfully!');
        setExistingRating(response.data.data);
        // Refresh the page or update stats
        window.location.reload();
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Error submitting rating: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteRating = async () => {
    if (!existingRating) return;

    if (window.confirm('Are you sure you want to delete your rating?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${import.meta.env.VITE_API_URL}/ratings/${existingRating._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        alert('Rating deleted successfully!');
        setUserRating(0);
        setComment('');
        setExistingRating(null);
        window.location.reload();
      } catch (error) {
        console.error('Error deleting rating:', error);
        alert('Error deleting rating');
      }
    }
  };

  const StarRating = ({ rating, onRatingChange, hoverRating, onHoverChange }) => {
    return (
      <div className='star-rating'>
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            type='button'
            className={`btn btn-link p-0 ${star <= (hoverRating || rating) ? 'text-warning' : 'text-muted'}`}
            onClick={() => onRatingChange(star)}
            onMouseEnter={() => onHoverChange(star)}
            onMouseLeave={() => onHoverChange(0)}
            style={{ textDecoration: 'none', fontSize: '1.5rem' }}>
            ★
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className='card shadow-sm'>
      <div className='card-body'>
        <h5 className='card-title'>Rate this Product</h5>

        {/* Rating Statistics */}
        {ratingStats && (
          <div className='mb-4'>
            <div className='d-flex align-items-center mb-2'>
              <h2 className='text-warning mb-0 me-2'>{ratingStats.averageRating}</h2>
              <div>
                <StarRating
                  rating={Math.round(ratingStats.averageRating)}
                  onRatingChange={() => {}}
                  hoverRating={0}
                  onHoverChange={() => {}}
                />
                <small className='text-muted'>({ratingStats.totalRatings} ratings)</small>
              </div>
            </div>

            {/* Rating Breakdown */}
            {[5, 4, 3, 2, 1].map(star => (
              <div key={star} className='d-flex align-items-center mb-1'>
                <small className='text-nowrap me-2' style={{ width: '30px' }}>
                  {star} ★
                </small>
                <div className='progress flex-grow-1 me-2' style={{ height: '8px' }}>
                  <div
                    className='progress-bar bg-warning'
                    style={{
                      width: `${(ratingStats.breakdown[star] / ratingStats.totalRatings) * 100}%`,
                    }}></div>
                </div>
                <small className='text-muted' style={{ width: '40px' }}>
                  {ratingStats.breakdown[star]}
                </small>
              </div>
            ))}
          </div>
        )}

        {/* User Rating Input */}
        <div className='mb-3'>
          <label className='form-label'>Your Rating:</label>
          <StarRating
            rating={userRating}
            onRatingChange={setUserRating}
            hoverRating={hoverRating}
            onHoverChange={setHoverRating}
          />
          <small className='text-muted'>
            {userRating > 0 ? `You rated this ${userRating} star${userRating > 1 ? 's' : ''}` : 'Select your rating'}
          </small>
        </div>

        {/* Comment Input */}
        <div className='mb-3'>
          <label htmlFor='comment' className='form-label'>
            Your Review {!existingRating && '(Optional)'}
          </label>
          <textarea
            id='comment'
            className='form-control'
            rows='3'
            placeholder='Share your experience with this product...'
            value={comment}
            onChange={e => setComment(e.target.value)}
            disabled={isSubmitting}></textarea>
        </div>

        {/* Action Buttons */}
        <div className='d-flex gap-2'>
          <button className='btn btn-primary' onClick={handleSubmitRating} disabled={isSubmitting || userRating === 0}>
            {isSubmitting ? 'Submitting...' : existingRating ? 'Update Rating' : 'Submit Rating'}
          </button>

          {existingRating && (
            <button className='btn btn-outline-danger' onClick={handleDeleteRating} disabled={isSubmitting}>
              Delete Rating
            </button>
          )}
        </div>

        {existingRating && (
          <div className='mt-2'>
            <small className='text-muted'>
              You rated this product on {new Date(existingRating.createdAt).toLocaleDateString()}
            </small>
          </div>
        )}
      </div>
    </div>
  );
};

export default RatingSystem;
