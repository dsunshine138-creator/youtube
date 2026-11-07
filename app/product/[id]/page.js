import React from "react";

function App() {

  const product = {
    name: "Samsung S27 Ultra",
    price: 234567,
    image: "https://sammyguru.com/wp-content/uploads/2026/08/Galaxy-S27-Ultra-leaked-render-2.webp"
  };

  return (
    <div className="min-h-screen bg-[#080610] text-white overflow-hidden">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 md:px-20 py-6 border-b border-purple-900/30">

        <h1 className="text-3xl font-black">
          FAHAM<span className="text-purple-500">STACKS.</span>
        </h1>

        <div className="hidden md:flex gap-10 text-gray-400">
          <a href="#" className="hover:text-purple-400 transition">Home</a>
          <a href="#" className="hover:text-purple-400 transition">Store</a>
          <a href="#" className="hover:text-purple-400 transition">Products</a>
          <a href="#" className="hover:text-purple-400 transition">Contact</a>
        </div>

        <button className="bg-purple-600 px-6 py-2 rounded-full hover:bg-purple-500 transition">
          My Bag
        </button>

      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 items-center gap-12">

        {/* Left Content */}
        <div>

          <p className="text-purple-400 uppercase tracking-[5px] text-sm font-bold">
            Premium Collection
          </p>

          <h1 className="text-5xl md:text-7xl font-black mt-6 leading-tight">
            {product.name}
          </h1>

          <p className="text-gray-400 text-lg mt-6 leading-8">
            Discover the next level of technology.
            Experience premium design, powerful performance
            and extraordinary quality.
          </p>

          <h2 className="text-4xl font-bold mt-8 text-purple-400">
            Rs. {product.price.toLocaleString()}
          </h2>

          <div className="flex flex-wrap gap-5 mt-10">

            <button className="bg-purple-600 px-9 py-4 rounded-full font-bold hover:bg-purple-500 transition shadow-lg shadow-purple-600/30">
              Buy Now
            </button>

            <button className="border border-purple-500 px-9 py-4 rounded-full font-bold hover:bg-purple-600 transition">
              Add To Cart
            </button>

          </div>

        </div>

        {/* Right Product Image */}
        <div className="relative flex items-center justify-center">

          <div className="absolute w-72 h-72 md:w-[450px] md:h-[450px] bg-purple-700/30 rounded-full blur-[100px]">
          </div>

          <img
            src={product.image}
            alt={product.name}
            className="relative z-10 w-full max-w-[500px] h-[450px] object-contain animate-product"
          />

          <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] border border-purple-500/30 rounded-full">
          </div>

        </div>

      </section>

      {/* Features Section */}
      <section className="bg-[#100b1d] py-24 px-6">

        <div className="max-w-7xl mx-auto">

          <div className="text-center">

            <p className="text-purple-400 tracking-[5px] uppercase text-sm">
              Why Choose Us
            </p>

            <h2 className="text-4xl md:text-6xl font-black mt-5">
              Beyond Ordinary.
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">

            {[
              {
                title: "Premium Design",
                desc: "Experience modern design and beautiful details."
              },
              {
                title: "Powerful Performance",
                desc: "Enjoy smooth performance and amazing technology."
              },
              {
                title: "Premium Quality",
                desc: "Get outstanding quality and reliability."
              }
            ].map((item, index) => (

              <div
                key={index}
                className="bg-[#191329] border border-purple-900/40 p-10 rounded-3xl hover:border-purple-500 hover:-translate-y-3 transition duration-500"
              >

                <div className="w-14 h-14 bg-purple-600/20 rounded-2xl flex items-center justify-center text-purple-400 text-2xl mb-7">
                  ✦
                </div>

                <h3 className="text-2xl font-bold">
                  {item.title}
                </h3>

                <p className="text-gray-400 mt-4 leading-7">
                  {item.desc}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="text-center py-10 border-t border-purple-900/30">

        <h2 className="text-3xl font-black">
          FAHAM<span className="text-purple-500">STACKS.</span>
        </h2>

        <p className="text-gray-500 mt-4">
          Technology Meets Luxury.
        </p>

        <p className="text-gray-600 text-sm mt-6">
          © 2026 FahamStacks. All rights reserved.
        </p>

      </footer>

    </div>
  );
}

export default App;