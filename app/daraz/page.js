
"use client";

import { useState } from "react";

function DarazPage() {

  const products = [
    { id: 1, name: "Wireless Bluetooth Headphones", price: 2499, oldPrice: 3999, discount: 38, category: "Electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500" },
    { id: 2, name: "Smart Watch Series 8", price: 3299, oldPrice: 5999, discount: 45, category: "Electronics", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500" },
    { id: 3, name: "Men's Casual Sneakers", price: 2899, oldPrice: 4500, discount: 36, category: "Fashion", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500" },
    { id: 4, name: "Premium Backpack", price: 1899, oldPrice: 2999, discount: 37, category: "Fashion", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500" },
    { id: 5, name: "Modern Sunglasses", price: 999, oldPrice: 1800, discount: 44, category: "Fashion", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500" },
    { id: 6, name: "Digital Camera", price: 15999, oldPrice: 19999, discount: 20, category: "Electronics", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500" },
    { id: 7, name: "Women's Handbag", price: 2199, oldPrice: 3500, discount: 37, category: "Fashion", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500" },
    { id: 8, name: "Wireless Gaming Mouse", price: 1499, oldPrice: 2499, discount: 40, category: "Electronics", image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500" },
    { id: 9, name: "Portable Bluetooth Speaker", price: 1999, oldPrice: 2999, discount: 33, category: "Electronics", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500" },
    { id: 10, name: "Men's Stylish Jacket", price: 3499, oldPrice: 4999, discount: 30, category: "Fashion", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500" },
    { id: 11, name: "Skin Care Beauty Set", price: 1299, oldPrice: 1999, discount: 35, category: "Beauty", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500" },
    { id: 12, name: "Luxury Perfume", price: 1799, oldPrice: 2999, discount: 40, category: "Beauty", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500" },
    { id: 13, name: "Modern Table Lamp", price: 1599, oldPrice: 2499, discount: 36, category: "Home", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500" },
    { id: 14, name: "Comfortable Sofa Chair", price: 12999, oldPrice: 17999, discount: 28, category: "Home", image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500" },
    { id: 15, name: "Coffee Mug Set", price: 899, oldPrice: 1499, discount: 40, category: "Home", image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500" },
    { id: 16, name: "Running Sports Shoes", price: 2999, oldPrice: 4500, discount: 33, category: "Fashion", image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500" },
    { id: 17, name: "Laptop Computer", price: 89999, oldPrice: 109999, discount: 18, category: "Electronics", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500" },
    { id: 18, name: "Makeup Brush Set", price: 1199, oldPrice: 1899, discount: 37, category: "Beauty", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500" },
    { id: 19, name: "Decorative Wall Clock", price: 1499, oldPrice: 2299, discount: 35, category: "Home", image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=500" },
    { id: 20, name: "Smartphone", price: 45999, oldPrice: 54999, discount: 16, category: "Electronics", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500" },
    { id: 21, name: "Women's Fashion Dress", price: 2499, oldPrice: 3999, discount: 38, category: "Fashion", image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=500" },
    { id: 22, name: "Kitchen Cooking Set", price: 2999, oldPrice: 4499, discount: 33, category: "Home", image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500" },
    { id: 23, name: "Wireless Earbuds", price: 1999, oldPrice: 3499, discount: 43, category: "Electronics", image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500" },
    { id: 24, name: "Face Care Cream", price: 799, oldPrice: 1299, discount: 38, category: "Beauty", image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=500" },
  ];

  const categories = [
    { name: "All", icon: "🛍️" },
    { name: "Electronics", icon: "📱" },
    { name: "Fashion", icon: "👕" },
    { name: "Beauty", icon: "💄" },
    { name: "Home", icon: "🏠" },
  ];

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [sort, setSort] = useState("default");

  // FILTER PRODUCTS

  let filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  if (sort === "low") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.price - b.price
    );
  }

  if (sort === "high") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.price - a.price
    );
  }

  // ADD TO CART

  const addToCart = (product) => {
    setCart((previousCart) => {
      const existing = previousCart.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return previousCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previousCart, { ...product, quantity: 1 }];
    });
  };

  // CHANGE QUANTITY

  const updateQuantity = (id, amount) => {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // REMOVE FROM CART

  const removeFromCart = (id) => {
    setCart((previousCart) =>
      previousCart.filter((item) => item.id !== id)
    );
  };

  // FAVORITES

  const toggleFavorite = (id) => {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // CHECKOUT

  const checkout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const name = prompt("Enter your full name:");
    if (!name || !name.trim()) return;

    const phone = prompt("Enter your phone number:");
    if (!phone || !phone.trim()) return;

    const address = prompt("Enter your delivery address:");
    if (!address || !address.trim()) return;

    alert(
      `Thank you ${name}!\nYour order has been prepared.\nTotal: Rs. ${totalPrice.toLocaleString("en-PK")}\nDelivery address: ${address}\nPhone: ${phone}\n\nThis is a demo checkout. No real order has been placed.`
    );

    setCart([]);
    setShowCart(false);
  };

  return (

    <div className="min-h-screen bg-[#f5f5f5] text-gray-800">

      {/* TOP NAVIGATION */}

      <div className="bg-[#f85606] text-white">

        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-end gap-5 text-xs font-medium">

          <a href="#" className="hover:underline">SAVE MORE ON APP</a>
          <a href="#" className="hover:underline">SELL ON DARAZ</a>
          <a href="#" className="hover:underline">HELP & SUPPORT</a>
          <a href="#" className="hover:underline">LOGIN</a>
          <a href="#" className="hover:underline">SIGN UP</a>

        </div>

        {/* MAIN HEADER */}

        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-wrap items-center gap-5">

          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Daraz<span className="text-orange-200">.</span>
          </h1>

          <div className="flex-1 flex bg-white rounded-md overflow-hidden min-w-[200px]">

            <input
              type="text"
              placeholder="Search in Daraz..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-3 outline-none text-gray-800"
            />

            <button className="bg-[#ffe1d2] text-[#f85606] px-6 text-xl hover:bg-orange-100">
              🔍
            </button>

          </div>

          <button
            onClick={() => setShowCart(!showCart)}
            className="relative text-3xl hover:scale-110 transition"
          >
            🛒

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-white text-[#f85606] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}

          </button>

        </div>

      </div>

      {/* CATEGORY NAVIGATION */}

      <div className="bg-white shadow-sm">

        <div className="max-w-7xl mx-auto px-4 py-3 flex gap-6 overflow-x-auto">

          {categories.map((item) => (

            <button
              key={item.name}
              onClick={() => setCategory(item.name)}
              className={`whitespace-nowrap text-sm font-semibold transition ${
                category === item.name
                  ? "text-[#f85606] border-b-2 border-[#f85606]"
                  : "text-gray-600 hover:text-[#f85606]"
              }`}
            >
              {item.icon} {item.name}
            </button>

          ))}

        </div>

      </div>

      {/* HERO BANNER */}

      <div className="max-w-7xl mx-auto px-4 mt-5">

        <div className="rounded-xl overflow-hidden bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-400 min-h-[230px] md:min-h-[300px] flex items-center justify-between px-6 md:px-16 relative">

          <div className="text-white z-10">

            <p className="uppercase tracking-widest text-sm font-bold mb-3">
              Biggest Shopping Festival
            </p>

            <h2 className="text-4xl md:text-6xl font-black mb-4">
              MEGA SALE
            </h2>

            <p className="text-lg md:text-xl font-semibold mb-5">
              Up to 70% OFF on your favourite products!
            </p>

            <button
              onClick={() => {
                setCategory("All");
                setSearch("");
                document.getElementById("products")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="bg-white text-[#f85606] px-7 py-3 rounded-md font-bold hover:bg-gray-100 hover:scale-105 transition"
            >
              SHOP NOW →
            </button>

          </div>

          <div className="hidden sm:flex text-[110px] md:text-[160px]">
            🛍️
          </div>

          <div className="absolute w-60 h-60 rounded-full bg-white/10 -right-10 -bottom-20" />

        </div>

      </div>

      {/* SERVICES */}

      <div className="max-w-7xl mx-auto px-4 mt-6">

        <div className="bg-white rounded-lg shadow-sm grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">

          {[
            ["🚚", "Free Delivery"],
            ["💳", "Secure Payments"],
            ["↩️", "Easy Returns"],
            ["🎧", "24/7 Support"],
          ].map(([icon, label]) => (

            <div
              key={label}
              className="flex items-center justify-center gap-3 p-4"
            >
              <span className="text-2xl">{icon}</span>
              <span className="font-semibold text-sm">{label}</span>
            </div>

          ))}

        </div>

      </div>

      {/* FLASH SALE */}

      <section className="max-w-7xl mx-auto px-4 mt-8">

        <div className="bg-white rounded-lg shadow-sm p-5">

          <div className="flex flex-wrap justify-between items-center gap-3 border-b pb-4">

            <div>
              <h2 className="text-2xl font-bold text-[#f85606]">
                Flash Sale ⚡
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                Limited time deals on popular products
              </p>
            </div>

            <button
              onClick={() => {
                setCategory("All");
                setSearch("");
                document.getElementById("products")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="border border-[#f85606] text-[#f85606] px-5 py-2 rounded-md font-bold text-sm hover:bg-[#f85606] hover:text-white transition"
            >
              SHOP MORE
            </button>

          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-5">

            {products.slice(0, 6).map((product) => (

              <div
                key={product.id}
                onClick={() => addToCart(product)}
                className="cursor-pointer group"
              >

                <div className="relative overflow-hidden rounded-lg">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-36 md:h-44 object-cover group-hover:scale-105 transition duration-300"
                  />

                  <span className="absolute top-2 left-2 bg-[#f85606] text-white text-xs px-2 py-1 rounded">
                    -{product.discount}%
                  </span>

                </div>

                <p className="text-sm font-semibold mt-3 line-clamp-2">
                  {product.name}
                </p>

                <p className="text-[#f85606] font-bold mt-2">
                  Rs. {product.price.toLocaleString("en-PK")}
                </p>

                <p className="text-xs text-gray-400 line-through">
                  Rs. {product.oldPrice.toLocaleString("en-PK")}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* PRODUCTS */}

      <section
        id="products"
        className="max-w-7xl mx-auto px-4 mt-10 pb-12"
      >

        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">

          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Just For You
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Discover amazing products at great prices
            </p>
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-gray-300 bg-white rounded-md px-4 py-2 outline-none"
          >
            <option value="default">Sort By: Default</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>

        </div>

        {/* CATEGORY FILTER */}

        <div className="flex gap-2 overflow-x-auto pb-4">

          {categories.map((item) => (

            <button
              key={item.name}
              onClick={() => setCategory(item.name)}
              className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition ${
                category === item.name
                  ? "bg-[#f85606] text-white"
                  : "bg-white text-gray-700 hover:bg-orange-100"
              }`}
            >
              {item.name}
            </button>

          ))}

        </div>

        {/* PRODUCT GRID */}

        {filteredProducts.length === 0 ? (

          <div className="bg-white rounded-lg p-12 text-center">

            <div className="text-6xl mb-4">🔍</div>

            <h3 className="text-xl font-bold">
              No Products Found
            </h3>

            <p className="text-gray-500 mt-2">
              Try searching for another product.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="bg-[#f85606] text-white px-6 py-2 rounded-md mt-5"
            >
              Clear Filters
            </button>

          </div>

        ) : (

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">

            {filteredProducts.map((product) => (

              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-lg transition duration-300 overflow-hidden group"
              >

                {/* IMAGE */}

                <div className="relative overflow-hidden">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 md:h-52 object-cover group-hover:scale-105 transition duration-300"
                  />

                  <span className="absolute top-2 left-2 bg-[#f85606] text-white px-2 py-1 text-xs font-bold rounded">
                    -{product.discount}%
                  </span>

                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className={`absolute top-2 right-2 w-9 h-9 rounded-full bg-white shadow flex items-center justify-center text-xl ${
                      favorites.includes(product.id)
                        ? "text-red-500"
                        : "text-gray-500"
                    }`}
                  >
                    {favorites.includes(product.id) ? "♥" : "♡"}
                  </button>

                </div>

                {/* PRODUCT DETAILS */}

                <div className="p-3">

                  <h3 className="font-semibold text-sm h-10 overflow-hidden">
                    {product.name}
                  </h3>

                  <p className="text-[#f85606] text-lg font-bold mt-2">
                    Rs. {product.price.toLocaleString("en-PK")}
                  </p>

                  <div className="flex items-center gap-2 mt-1">

                    <span className="text-xs text-gray-400 line-through">
                      Rs. {product.oldPrice.toLocaleString("en-PK")}
                    </span>

                    <span className="text-xs text-green-600 font-semibold">
                      {product.discount}% OFF
                    </span>

                  </div>

                  <div className="text-yellow-500 text-sm mt-2">
                    ★★★★★
                    <span className="text-gray-400 text-xs ml-2">
                      (120)
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 mt-1">
                    📍 Pakistan
                  </p>

                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-[#f85606] hover:bg-orange-700 text-white font-bold py-2 rounded-md mt-3 transition text-sm"
                  >
                    🛒 Add To Cart
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

      {/* SHOPPING CART */}

      {showCart && (

        <div className="fixed inset-0 z-50 flex justify-end">

          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowCart(false)}
          />

          <div className="relative bg-white w-full max-w-md h-full shadow-2xl flex flex-col">

            <div className="bg-[#f85606] text-white p-5 flex items-center justify-between">

              <h2 className="text-2xl font-bold">
                🛒 My Shopping Cart
              </h2>

              <button
                onClick={() => setShowCart(false)}
                className="text-2xl"
              >
                ✕
              </button>

            </div>

            <div className="flex-1 overflow-y-auto p-4">

              {cart.length === 0 ? (

                <div className="text-center mt-20">

                  <div className="text-7xl mb-5">🛒</div>

                  <h3 className="font-bold text-xl">
                    Your Cart Is Empty
                  </h3>

                  <p className="text-gray-500 mt-2">
                    Add some products to start shopping!
                  </p>

                </div>

              ) : (

                <div className="space-y-4">

                  {cart.map((item) => (

                    <div
                      key={item.id}
                      className="flex gap-3 border-b pb-4"
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-md object-cover"
                      />

                      <div className="flex-1">

                        <h3 className="font-bold text-sm">
                          {item.name}
                        </h3>

                        <p className="text-[#f85606] font-bold mt-1">
                          Rs. {item.price.toLocaleString("en-PK")}
                        </p>

                        <div className="flex items-center gap-3 mt-2">

                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="bg-gray-200 w-7 h-7 rounded"
                          >
                            -
                          </button>

                          <span className="font-bold">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="bg-gray-200 w-7 h-7 rounded"
                          >
                            +
                          </button>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 text-sm ml-auto"
                          >
                            Remove
                          </button>

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </div>

            {/* CART TOTAL */}

            <div className="border-t p-5">

              <div className="flex justify-between text-lg font-bold mb-4">

                <span>Total:</span>

                <span className="text-[#f85606]">
                  Rs. {totalPrice.toLocaleString("en-PK")}
                </span>

              </div>

              <button
                onClick={checkout}
                disabled={cart.length === 0}
                className="w-full bg-[#f85606] text-white py-3 rounded-md font-bold hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                PROCEED TO CHECKOUT
              </button>

            </div>

          </div>

        </div>

      )}

      {/* FOOTER */}

      <footer className="bg-[#222f3e] text-white pt-12 pb-6">

        <div className="max-w-7xl mx-auto px-5 grid grid-cols-2 md:grid-cols-4 gap-8">

          <div>
            <h3 className="font-bold text-lg mb-4">Customer Care</h3>
            <p className="text-gray-300 text-sm mb-2">Help Center</p>
            <p className="text-gray-300 text-sm mb-2">How to Buy</p>
            <p className="text-gray-300 text-sm mb-2">Returns & Refunds</p>
            <p className="text-gray-300 text-sm">Contact Us</p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Daraz</h3>
            <p className="text-gray-300 text-sm mb-2">About Daraz</p>
            <p className="text-gray-300 text-sm mb-2">Careers</p>
            <p className="text-gray-300 text-sm mb-2">Terms & Conditions</p>
            <p className="text-gray-300 text-sm">Privacy Policy</p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Payment Methods</h3>
            <p className="text-gray-300 text-sm mb-2">Cash on Delivery</p>
            <p className="text-gray-300 text-sm mb-2">Credit Card</p>
            <p className="text-gray-300 text-sm">Online Payment</p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Download Our App</h3>
            <div className="flex items-center gap-3">
              <span className="text-4xl">📱</span>
              <div>
                <p className="font-bold">Daraz Shopping</p>
                <p className="text-xs text-gray-300">Shop anytime, anywhere!</p>
              </div>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-5 border-t border-gray-600 mt-10 pt-5 text-center text-gray-400 text-sm">
          © 2026 Daraz UI Project. All Rights Reserved.
        </div>

      </footer>

    </div>
  );
}

export default DarazPage;
