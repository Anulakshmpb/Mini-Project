import React, { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		fetchProducts();
	}, []);

	const fetchProducts = async () => {
		try {
			const response = await fetch('http://localhost:5000/api/products');
			const data = await response.json();

			const processedProducts = data.map(product => ({
				...product,
				image: product.image && product.image.startsWith('/public')
					? `http://localhost:5000${product.image}`
					: product.image
			}));

			setProducts(processedProducts);
		} catch (error) {
			console.error('Error fetching products:', error);
		}
	};

	return (
		<ProductContext.Provider value={{ products, fetchProducts }}>
			{children}
		</ProductContext.Provider>
	);
};
