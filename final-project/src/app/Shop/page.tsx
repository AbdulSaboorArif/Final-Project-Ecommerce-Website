
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import createClient from "@sanity/client";
import Link from "next/link";
import Header from "@/components/Header";
import Swal from "sweetalert2";
import Feature from "@/components/Feature";
import Fotter from "@/components/Fotter"
import ProductTypeGloble from "../ProductType/producttypes";

const sanity = createClient({
  projectId: "g66g9rag",
  dataset: "production",
  useCdn: true,
  apiVersion: "2021-03-25",
});

const Shop = () => {
  const [products, setProducts] = useState<ProductTypeGloble[]>([]);
  const [cart, setCart] = useState<ProductTypeGloble[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductTypeGloble[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProducts = async () => {
    try {
      const query = `*[_type == "product"]{
        _id,
        title,
        price,
        description,
        "imageurl": productImage.asset->url,
        productImage,
        tags
      }`;
      const data = await sanity.fetch<ProductTypeGloble[]>(query);
      setProducts(data);
      setFilteredProducts(data); // Set the filtered list initially to all products
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };
  const addToCart = (product: ProductTypeGloble) => {
    setCart((prevCart) => [...prevCart, product]);

  };
  

  const handleAddToCart = (e: React.MouseEvent, product: ProductTypeGloble) => {
    e.preventDefault();
    Swal.fire({
      title: "Added To Cart",
      text: `${product.title} added to your cart`,
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
    setCart((prevCart) => [...prevCart, product]);
    addToCart(product)
  };

  console.log(cart)
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Header />
      <div className="w-full max-w-[1440px] mx-auto bg-[url('/BackgroundImage.jpg')] py-12 md:py-16 bg-cover bg-center bg-no-repeat opacity-90">
        <div className="text-center space-y-5">
          <h1 className="text-5xl font-bold leading-8 text-black">Shop</h1>
          <div className="text-lg">
            <Link
              href="/"
              className="hover:text-amber-800 transition-colors font-semibold"
            >
              Home
            </Link>
            <span> {">"} </span>
            <span className="text-black">Shop</span>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="max-w-[1200px] mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearch}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-[300px] focus:outline-none"
          />
        </div>
      </div>

      <div>
        <h1 className="text-4xl font-bold mx-auto py-8 text-center pb-4">
          Product List
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {filteredProducts.map((product) => (
            <Link key={product._id} href={`/Shop/${product._id}`}>
              <div className="flex flex-col group">
                <div className="relative w-full aspect-[285/301] mb-6 overflow-hidden">
                  <Image
                    src={product.imageurl || "/placeholder.jpg"}
                    alt={product.title}
                    width={285}
                    height={301}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex-1 bg-[#F4F5F7] p-4">
                  <h3 className="text-xl font-bold text-[#3A3A3A] leading-7 line-clamp-1">
                    {product.title}
                  </h3>
                  <p className="text-base text-[#898989] mt-1 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xl font-semibold text-[#3A3A3A]">
                      ${product.price}
                    </span>
                    <span className="text-base text-[#B0B0B0] line-through">
                      ${(product.price * 1.2).toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="mt-8 flex flex-wrap">
                  {product.tags.map((tag, index) => (
                    <span
                      key={` ${product._id}-${tag}-${index} `}
                      className="text-xs bg-[#F4F5F7] text-[#3A3A3A] px-2 py-1 rounded-full mr-2 mb-2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {/* Add To Cart */}
                <div>
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className="bg-[#B88E2F] text-white px-4 py-2 rounded mt-4"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Feature />
      <Fotter />
    </>
  );
};

export default Shop;
