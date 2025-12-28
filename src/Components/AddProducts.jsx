import React, { useState } from 'react';

export default function AddProducts({ onClose }) {
	const [dragActive, setDragActive] = useState(false);
	const [preview, setPreview] = useState(null);

	const handleDrag = (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === "dragenter" || e.type === "dragover") {
			setDragActive(true);
		} else if (e.type === "dragleave") {
			setDragActive(false);
		}
	};

	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			// Handle file upload here
			const file = e.dataTransfer.files[0];
			setPreview(URL.createObjectURL(file));
		}
	};

	const handleChange = (e) => {
		e.preventDefault();
		if (e.target.files && e.target.files[0]) {
			// Handle file upload here
			const file = e.target.files[0];
			setPreview(URL.createObjectURL(file));
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm transition-all duration-300">
			{/* Backdrop click handler */}
			<div className="absolute inset-0" onClick={onClose}></div>
			<div className="relative w-full max-w-2xl bg-white/80 dark:bg-zinc-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-white/10 overflow-hidden transform transition-all">

				{/* Decoration */}
				<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

				{/* Header */}
				<div className="px-8 py-6 flex items-center justify-between border-b border-gray-100 dark:border-white/5">
					<div>
						<h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
							New Product
						</h2>
						<p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
							Add a new item to your inventory
						</p>
					</div>
					<button
						onClick={onClose}
						className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				<div className="p-8 max-h-[calc(100vh-200px)] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 dark:[&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 dark:hover:[&::-webkit-scrollbar-thumb]:bg-white/20">
					<form className="space-y-6">
						{/* Image Upload Area */}
						<div
							className={`relative group h-48 rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center cursor-pointer overflow-hidden
								${dragActive
									? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-500/10'
									: 'border-gray-300 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-400 bg-gray-50 dark:bg-black/20'
								}`}
							onDragEnter={handleDrag}
							onDragLeave={handleDrag}
							onDragOver={handleDrag}
							onDrop={handleDrop}
						>
							<input
								type="file"
								className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
								onChange={handleChange}
								accept="image/*"
							/>

							{preview ? (
								<div className="relative w-full h-full">
									<img src={preview} alt="Preview" className="w-full h-full object-contain p-4" />
									<div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
										<p className="text-white font-medium">Click or drag to replace</p>
									</div>
								</div>
							) : (
								<div className="text-center p-4">
									<div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-500/20 text-indigo-500 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
										<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
										</svg>
									</div>
									<p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
										Upload Product Image
									</p>
									<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
										SVG, PNG, JPG or GIF (max. 5MB)
									</p>
								</div>
							)}
						</div>

						{/* Form Grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="space-y-1.5">
								<label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">
									Product Name
								</label>
								<input
									type="text"
									placeholder="e.g. MacBook Pro M3"
									className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all dark:text-white placeholder:text-gray-400"
								/>
							</div>

							<div className="space-y-1.5">
								<label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">
									Price
								</label>
								<div className="relative">
									<span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
									<input
										type="number"
										placeholder="0.00"
										className="w-full pl-8 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all dark:text-white placeholder:text-gray-400"
									/>
								</div>
							</div>

							<div className="space-y-1.5">
								<label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">
									Category
								</label>
								<select className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all dark:text-white text-gray-700 cursor-pointer appearance-none">
									<option value="" disabled selected>Select Category</option>
									<option value="electronics">Electronics</option>
									<option value="clothing">Clothing</option>
									<option value="home">Home & Garden</option>
									<option value="toys">Toys</option>
								</select>
							</div>

							<div className="space-y-1.5">
								<label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">
									Stock Quantity
								</label>
								<input
									type="number"
									placeholder="0"
									className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all dark:text-white placeholder:text-gray-400"
								/>
							</div>
						</div>

						<div className="space-y-1.5">
							<label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">
								Description
							</label>
							<textarea
								rows="4"
								placeholder="Enter product description..."
								className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all dark:text-white placeholder:text-gray-400 resize-none"
							/>
						</div>
					</form>
				</div>

				{/* Footer */}
				<div className="px-8 py-5 bg-gray-50 dark:bg-white/5 border-t border-gray-100 dark:border-white/5 flex items-center justify-end gap-3">
					<button
						onClick={onClose}
						type="button"
						className="px-6 py-2.5 rounded-xl font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
						Cancel
					</button>
					<button className="px-6 py-2.5 rounded-xl font-semibold text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/20">
						Create Product
					</button>
				</div>

			</div>
		</div>
	)
}