import React, { useState, useEffect, useContext } from 'react';
import { ProductContext } from './ProductContext';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';

export default function Products() {
	const [isVisible, setIsVisible] = useState(false);
	const navigate = useNavigate();
	const [value, setValue] = useState("");
	const [select, setSelect] = useState("");
	const [sortOrder, setSortOrder] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 8;

	const { products } = React.useContext(ProductContext);

	useEffect(() => {
		setIsVisible(true);
	}, []);

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-black overflow-x-hidden selection:bg-indigo-500 selection:text-white">
			<div className="fixed inset-0 z-0 pointer-events-none">
				<div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[100px]" />
				<div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[100px]" />
			</div>




			<div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className={`text-center mb-20 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
					<h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
						<span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-gray-400 animate-pulse">
							Discover the Future
						</span>
					</h1>
					<p className="mt-4 text-xl md:text-2xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
						Explore our curated collection of premium tech gadgets designed to elevate your lifestyle.
					</p>

					<button
						onClick={() => navigate('/add-products')}
						className="mt-8 me-4 px-8 py-3 bg-black text-white dark:bg-white dark:text-black rounded-full font-semibold hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-xl"
					>
						Add Product
					</button>
					<input
						onChange={(e) => setValue(e.target.value)}
						value={value}
						type='text'
						placeholder='Search Products...'
						className="mt-8 px-8 py-3 bg-black text-white dark:bg-white dark:text-black rounded-full font-semibold hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-xl"
					/>

					<div className="flex flex-wrap justify-center gap-3 mt-10">
						<label htmlFor="filter" className="text-gray-500 dark:text-gray-400">Sorted By</label>
						<select
							onChange={(e) => setSortOrder(e.target.value)}
							className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${'bg-white text-gray-600 hover:bg-gray-100 dark:bg-zinc-900 dark:text-gray-300 dark:hover:bg-zinc-800'
								}`}>
							<optgroup label="price">
								<option value="low">Low to High</option>
								<option value="high">High to Low</option>
							</optgroup>

						</select>
						{
							['All', 'Laptops', 'Smartphones', 'Audio', 'Gaming'].map((tag) => (
								<button
									key={tag}
									onClick={() => setSelect(tag)}
									className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${select === tag || (select === '' && tag === 'All')
										? 'bg-black text-white shadow-lg scale-105 dark:bg-white dark:text-black'
										: 'bg-white text-gray-600 hover:bg-gray-100 dark:bg-zinc-900 dark:text-gray-300 dark:hover:bg-zinc-800'
										}`}
								>
									{tag}
								</button>
							))}


					</div>
				</div>

				{/*  Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 gap-y-12">
					{products
						.filter((product) =>
							product.name.toLowerCase().includes(value.toLowerCase())
						)
						.filter((product) => {
							if (select === 'All' || select === '') return true;
							return product.category.toLowerCase().includes(select.toLowerCase());
						})
						.sort((a, b) => {
							if (sortOrder === 'low') return a.price - b.price;
							if (sortOrder === 'high') return b.price - a.price;
							return 0;
						})
						.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
						.map((product, index) => (
							<div
								key={product._id}
								className={`transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
								style={{ transitionDelay: `${index * 100}ms` }}
							>
								<ProductCard product={product} />
							</div>
						))}
				</div>

				{/* Pagination */}
				<div className="flex justify-center items-center gap-4 mt-12">
					<button
						onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
						disabled={currentPage === 1}
						className={`px-6 py-2 rounded-full font-semibold transition-all ${currentPage === 1
							? 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-zinc-800 dark:text-gray-600'
							: 'bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 shadow-lg hover:scale-105'
							}`}
					>
						Previous
					</button>
					<div className="flex items-center gap-2">
						<span className="text-gray-600 dark:text-gray-300 font-medium">
							Page {currentPage}
						</span>
						<span className="text-gray-400 dark:text-gray-500">
							of {Math.ceil(products.filter(p => p.name.toLowerCase().includes(value.toLowerCase())).filter(p => (select === 'All' || select === '') ? true : p.category.toLowerCase().includes(select.toLowerCase())).length / itemsPerPage)}
						</span>
					</div>
					<button
						onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(products.filter(p => p.name.toLowerCase().includes(value.toLowerCase())).filter(p => (select === 'All' || select === '') ? true : p.category.toLowerCase().includes(select.toLowerCase())).length / itemsPerPage)))}
						disabled={currentPage >= Math.ceil(products.filter(p => p.name.toLowerCase().includes(value.toLowerCase())).filter(p => (select === 'All' || select === '') ? true : p.category.toLowerCase().includes(select.toLowerCase())).length / itemsPerPage)}
						className={`px-6 py-2 rounded-full font-semibold transition-all ${currentPage >= Math.ceil(products.filter(p => p.name.toLowerCase().includes(value.toLowerCase())).filter(p => (select === 'All' || select === '') ? true : p.category.toLowerCase().includes(select.toLowerCase())).length / itemsPerPage)
							? 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-zinc-800 dark:text-gray-600'
							: 'bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 shadow-lg hover:scale-105'
							}`}
					>
						Next
					</button>
				</div>
			</div>
		</div >
	)
}
