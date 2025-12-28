import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import AddProducts from './AddProducts';

export default function Products() {
	const [isVisible, setIsVisible] = useState(false);
	const [showAddProduct, setShowAddProduct] = useState(false);
	const [value, setValue] = useState("");
	const [select, setSelect] = useState("");
	useEffect(() => {
		setIsVisible(true);
	}, []);

	const products = [
		{
			id: 1,
			name: "MacBook Pro 16\"",
			price: 2499,
			description: "The most powerful MacBook Pro ever. Supercharged by M2 Pro or M2 Max.",
			image: "https://tse3.mm.bing.net/th/id/OIP._HOuc0Cnl4XtKsZlUFHQ1gHaF6?pid=Api&P=0&h=180",
			category: "Laptops",
			stock: 12
		},
		{
			id: 2,
			name: "iPhone 15 Pro",
			price: 1199,
			description: "Titanium design, A17 Pro chip, and the most advanced camera system.",
			image: "https://tse3.mm.bing.net/th/id/OIP._HOuc0Cnl4XtKsZlUFHQ1gHaF6?pid=Api&P=0&h=180",
			category: "Smartphones",
			stock: 45
		},
		{
			id: 3,
			name: "Sony WH-1000XM5",
			price: 398,
			description: "Industry-leading noise canceling with two processors controlling 8 microphones.",
			image: "https://tse3.mm.bing.net/th/id/OIP._HOuc0Cnl4XtKsZlUFHQ1gHaF6?pid=Api&P=0&h=180",
			category: "Audio",
			stock: 8
		},
		{
			id: 4,
			name: "iPad Air",
			price: 599,
			description: "Light. Bright. Full of might. Supercharged by the Apple M1 chip.",
			image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
			category: "Tablets",
			stock: 25
		},
		{
			id: 5,
			name: "PS5 Console",
			price: 499,
			description: "Experience lightning fast loading with an ultra-high speed SSD.",
			image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
			category: "Gaming",
			stock: 0
		}
	];

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-black overflow-x-hidden selection:bg-indigo-500 selection:text-white">
			{/* Decorative Background Elements */}
			<div className="fixed inset-0 z-0 pointer-events-none">
				<div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[100px]" />
				<div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[100px]" />
			</div>

			{/* Add Product Modal */}
			{showAddProduct && <AddProducts onClose={() => setShowAddProduct(false)} />}


			<div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
				{/* Hero Section */}
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
						onClick={() => setShowAddProduct(true)}
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

					{/* Filter/Tags (Optional UI element for aesthetics) */}
					<div className="flex flex-wrap justify-center gap-3 mt-10">
						<label htmlFor="filter" className="text-gray-500 dark:text-gray-400">Sorted By</label>
						<select
							onChange={(e) => setSelect(e.target.value)}
							className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${'bg-white text-gray-600 hover:bg-gray-100 dark:bg-zinc-900 dark:text-gray-300 dark:hover:bg-zinc-800'
								}`}>
							<option value="all">All</option>
							{/* <option value="category">Category</option> */}
							<optgroup label="price">
								<option value="low">Low to High</option>
								<option value="high">High to Low</option>
							</optgroup>
							<option value="rating">Rating</option>

						</select>
						{
							['All', 'Laptops', 'Smartphones', 'Audio', 'Gaming'].map((tag, idx) => (
								<button
									key={tag}
									className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${idx === 0
										? 'bg-black text-white shadow-lg scale-105 dark:bg-white dark:text-black'
										: 'bg-white text-gray-600 hover:bg-gray-100 dark:bg-zinc-900 dark:text-gray-300 dark:hover:bg-zinc-800'
										}`}
								>
									{tag}
								</button>
							))}


					</div>
				</div>

				{/* Products Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 gap-y-12">
					{products
						.filter((product) =>
							product.name.toLowerCase().includes(value.toLowerCase()) ||
							product.category.toLowerCase().includes(value.toLowerCase())
						)
						.map((product, index) => (
							<div
								key={product.id}
								className={`transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
								style={{ transitionDelay: `${index * 100}ms` }}
							>
								<ProductCard product={product} />
							</div>
						))}
				</div>
			</div>
		</div >
	)
}
