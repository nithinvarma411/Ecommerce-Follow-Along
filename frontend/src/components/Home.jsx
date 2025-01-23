import { useState } from "react";
import Products from "../pages/Products";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  

  const productDetails = [
    {
      name: "Adidas grand court toddler shoes",
      image:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/78b76ab3632d4251a7f2ae2b005fb600_9366/Grand_Court_TD_Lifestyle_Court_Casual_Shoes_White_GW9250_01_standard.jpg",
      description:
        "Adidas Grand Court Toddler Shoes combine classic style with all-day comfort for little feet. Featuring a durable design, lightweight cushioning, and easy-to-wear straps, these shoes are perfect for active toddlers on the go.",
      actualPrice: 4599,
      sellingPrice: 2599,
    },
    {
      name: "Adidas mens basketball pro bounce madness",
      image:
        "https://images.jdmagicbox.com/quickquotes/images_main/adidas-mens-basketball-pro-bounce-madness-2019-basketball-shoes-mens-footwear-active-red-footwear-white-core-black-size-11-160092248-t991b.jpg",
      description:
        "Adidas Pro Bounce Madness 2019 basketball shoes offer excellent ankle support, responsive Bounce cushioning, and a durable outsole for superior grip on the court",
      actualPrice: 5500,
      sellingPrice: 4000,
    },
    {
      name: "Nike Revolution 7 running shoe",
      image:
        "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/450ed1df-8e17-4d87-a244-85697874661c/NIKE+REVOLUTION+7.png",
      description: " This shoe is known for its lightweight design and breathable mesh upper, offering comfort and support for daily runs. The foam midsole provides responsive cushioning, while the durable rubber outsole ensures reliable traction",
      actualPrice: 3650,
      sellingPrice: 1580,
    },
    {
      name: "Nike Air Force 1 '07 LV8",
      image:
        "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/2400bce7-8f73-45bb-a3dd-2bf16f3282c9/AIR+FORCE+1+%2707+LV8.png",
      description: "It's a modern take on the iconic Air Force 1, featuring a durable leather upper, cushioned midsole, and classic Air-Sole unit for comfort and support.",
      actualPrice: 9390,
      sellingPrice: 7999,
    },
    {
      name: "woodland men 27s leather formal shoes",
      image:
        "https://5.imimg.com/data5/SV/AP/MY-73637936/woodland-men-27s-leather-formal-shoes.jpg",
      description: "This shoes offer a blend of style and durability, crafted from high-quality leather for a sophisticated look. These shoes feature a comfortable insole, a sturdy outsole for grip, and a sleek design, making them perfect for formal occasions and office wear.",
      actualPrice: 5500,
      sellingPrice: 3450,
    },
    {
      name: "Woodland camel Formal Shoes",
      image:
        "https://content.jdmagicbox.com/quickquotes/images_main/-rkr13oio.jpg?impolicy=queryparam&im=Resize=(360,360),aspect=fit",
      description: " It features a stylish design with a premium leather upper, offering both comfort and durability. These shoes are perfect for formal occasions and office wear.",
      actualPrice: 3500,
      sellingPrice: 1800,
    },
    {
      name: "Puma Rebound JOY Sneakers For Women ",
      image:
        "https://rukminim2.flixcart.com/image/850/1000/xif0q/shoe/o/u/b/-original-imahfkjcdabmt7qe.jpeg?q=90&crop=false",
      description: "This shoes offer a stylish and comfortable design with a classic high-top silhouette. Featuring a soft leather upper, cushioned midsole, and durable rubber outsole, these sneakers provide support and comfort for everyday wear. Perfect for casual outings and sports activities",
      actualPrice: 5000,
      sellingPrice: 4000,
    },
    {
      name: "Puma conduct Pro Unisex Running Shoes",
      image:
        "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/379438/10/sv01/fnd/IND/fmt/png/Conduct-Pro-Unisex-Running-Shoes",
      description: "This shoes are designed for comfort and performance, featuring a breathable mesh upper, cushioned midsole for support, and durable rubber outsole for excellent traction. Ideal for running and casual wear, these shoes provide a sleek and sporty look.",
      actualPrice: 5800,
      sellingPrice: 4000,
    },
    {
      name: "Salomon XA Pro 3D Wide Trail Running Shoe",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR34LCTtm7n2kGVm0EZ4uifNGzkbtuvTUnBrA&s",
      description: "This model is known for its robust construction and is designed for trail running. It features a wide fit, providing ample space for the foot, and is equipped with Salomon's 3D Advanced Chassis for stability.",
      actualPrice: 7000,
      sellingPrice: 5550,
    },
    {
      name: "Reebok Classic Leather Sneakers for Women",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT038reIR4_XKKmQCIzRMTu0tXxOV50ngLR4w&s",
      description: "These shoes are known for their timeless design, featuring a soft leather upper, cushioned midsole for comfort, and durable rubber outsole for traction",
      actualPrice: 3000,
      sellingPrice: 1950,
    },
  ];

  const filteredProducts = productDetails.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      product.sellingPrice >= minPrice &&
      product.sellingPrice <= maxPrice
  );

  return (
    <>
      <div className="w-full min-h-screen bg-neutral-800 p-4">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search for products..."
            className="px-4 py-2 rounded-md w-1/3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex gap-4">
            <input
              type="number"
              placeholder="Min Price"
              className="px-4 py-2 rounded-md"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
            />
            <input
              type="number"
              placeholder="Max Price"
              className="px-4 py-2 rounded-md"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-4">
          {filteredProducts.map((product, index) => (
            <Products key={index} {...product} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
