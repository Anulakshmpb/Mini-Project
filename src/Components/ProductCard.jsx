const ProductCard = ({ product }) => {
	return (
		<div className="group relative w-full max-w-[280px] mx-auto [perspective:1000px]">
			<div className="relative h-[400px] w-full rounded-3xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

				{/* Front Face */}
				<div className="absolute inset-0 h-full w-full rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/20 shadow-xl overflow-hidden [backface-visibility:hidden]">
					{/* Image Container with Gradient Overlay */}
					<div className="relative h-[65%] w-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-900 p-6 flex items-center justify-center overflow-hidden">
						<div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
						<img
							src={product.image}
							alt={product.name}
							className="relative w-full h-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-110"
						/>

						{/* Floating Badge */}
						{product.stock < 5 && (
							<span className="absolute top-4 left-4 px-3 py-1 bg-red-500/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg">
								Low Stock
							</span>
						)}
					</div>

					{/* Content Front */}
					<div className="h-[35%] p-5 flex flex-col justify-between bg-white/50 dark:bg-zinc-900/50">
						<div>
							<h3 className="text-lg font-bold text-gray-900 dark:text-white truncate tracking-tight">
								{product.name}
							</h3>
							<p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">
								{product.category}
							</p>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
								${product.price}
							</span>
							<div className="flex gap-1">
								{[...Array(5)].map((_, i) => (
									<svg key={i} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
										<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
									</svg>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Back Face */}
				<div className="absolute inset-0 h-full w-full rounded-3xl bg-gray-900 dark:bg-black text-white p-6 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-center items-center text-center shadow-2xl border border-zinc-800">
					<h4 className="text-xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
						Overview
					</h4>
					<p className="text-sm text-gray-300 mb-8 leading-relaxed">
						{product.description}
					</p>

					<div className="space-y-3 w-full">
						<button className="w-full py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg active:scale-95 text-sm">
							Add to Cart
						</button>
						<button className="w-full py-3 bg-white/10 text-white border border-white/20 rounded-xl font-bold hover:bg-white/20 transition-colors text-sm flex items-center justify-center gap-2">
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
							</svg>
							Wishlist
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
