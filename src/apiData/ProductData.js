export const ProductCarouselResponsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1024 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1024, min: 800 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export const NewArrivalData = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/products/new-arrivals`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'failed to fetch products');
    }

    return data.data || [];
  } catch (err) {
    console.error('Error fetching new arrivals:', err);
    return [];
  }
};

export const NavratriSpecialData = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/products/navrati-special`);
    const data = await response.json();

    return data.data || [];
  } catch (err) {
    console.error('Error fetching NavratiSpecial data:', err);
    return [];
  }
};

export const BestSellersData = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/products/best-seller`);
    const result = await response.json();

    // Flatten topProduct array
    return result.data.map(item => item.topProduct);
  } catch (err) {
    console.error('Error fetching best seller data:', err);
    return [];
  }
};
