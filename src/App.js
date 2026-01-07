import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Products from './Components/Products';
import AddProducts from './Components/AddProducts';
//CONTAXT API,FORM VALIDATION,MULTER,COMPASS CONNECTION DB,HOST,
function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="App">
      <header className="sticky top-0 z-50">
        <nav className="bg-gradient-to-r from-purple-900 via-cyan-900 to-blue-900 shadow-lg">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">

              {/* Logo + Brand */}
              <div className="flex items-center gap-3">
                <img src="./favicon.ico" alt="logo" className="h-8 w-8 rounded-md bg-white/20" />
                <h2 className="hidden md:block text-xl font-extrabold tracking-wide text-white bg-white/10 px-3 py-1 rounded-lg backdrop-blur-md">
                  TechCom
                </h2>
              </div>

              {/* Desktop Nav Links */}
              <div className="hidden md:block">
                <ul className="flex items-center gap-8 text-white font-medium">
                  {[
                    { name: "Home", path: "/" },
                    { name: "Add Products", path: "/add-products" },
                    { name: "LogOut", path: "/" }
                  ].map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="cursor-pointer transition-all duration-300 hover:scale-110 hover:text-yellow-300 relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-yellow-300 after:transition-all after:duration-300 hover:after:w-full"
                    >
                      {item.name}
                    </Link>
                  ))}
                </ul>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-white p-2 rounded-md hover:bg-white/10 transition-colors"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {isMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-black/20 backdrop-blur-lg">
              {[
                { name: "Home", path: "/" },
                { name: "Add Products", path: "/add-products" },
                { name: "LogOut", path: "/" }
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 hover:text-yellow-300 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/add-products" element={<AddProducts />} />
      </Routes>
    </div>
  );
}

export default App;
