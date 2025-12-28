import React from 'react';
import { Link } from 'react-router-dom';
import Products from './Components/Products';
import AddProducts from './Components/AddProducts';

function App() {
  return (
    <div className="App">
      <header>
        <nav className="flex items-center justify-between px-8 py-4
          bg-gradient-to-r from-purple-900 via-cyan-900 to-blue-900
          shadow-lg">

          {/* Logo + Brand */}
          <div className="flex items-center gap-3">
            <img src="./favicon.ico" alt="logo" className="h-8 w-8 rounded-md bg-white/20" />
            <h2 className="text-xl font-extrabold tracking-wide
              text-white bg-white/10 px-3 py-1 rounded-lg
              backdrop-blur-md">
              TechCom
            </h2>
          </div>

          {/* Nav Links */}
          <ul className="flex items-center gap-8 text-white font-medium">
            {["Home", "Add Products", "LogOut"].map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : "/" + item.toLowerCase()}
                className="cursor-pointer transition-all duration-300
                  hover:scale-110 hover:text-yellow-300
                  relative after:absolute after:left-0 after:-bottom-1
                  after:h-[2px] after:w-0 after:bg-yellow-300
                  after:transition-all after:duration-300
                  hover:after:w-full"
              >
                {item}
              </Link>
            ))}
          </ul>

        </nav>
      </header>
      {/* <AddProducts /> */}
      <Products />
    </div>
  );
}

export default App;
