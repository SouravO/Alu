import React from "react";

const Products = () => {
  // Product categories data
  const categories = [
    {
      id: "aluminum-foils",
      title: "Aluminum Foils",
      products: [
        {
          id: 1,
          name: "Standard Aluminum Foil",
          description: "Everyday kitchen foil for cooking and storage",
          image:
            "https://res.cloudinary.com/daqcima3z/image/upload/v1716493795/aluminum-foil-stack_hvlcnp.jpg",
        },
        {
          id: 2,
          name: "Heavy-Duty Aluminum Foil",
          description:
            "Extra-thick foil for grilling and high-heat applications",
          image:
            "https://res.cloudinary.com/daqcima3z/image/upload/v1716493795/aluminum-foil-roll_svicnp.jpg",
        },
        {
          id: 3,
          name: "Pre-Cut Foil Sheets",
          description: "Convenient pre-cut sheets for easy use",
          image:
            "https://res.cloudinary.com/daqcima3z/image/upload/v1716493795/aluminum-foil-sheets_gzdk3c.jpg",
        },
      ],
    },
    {
      id: "food-containers",
      title: "Food Containers",
      products: [
        {
          id: 4,
          name: "Round Food Containers",
          description: "Versatile round containers for various food types",
          image:
            "https://res.cloudinary.com/daqcima3z/image/upload/v1716493795/round-containers_xm77an.jpg",
        },
        {
          id: 5,
          name: "Rectangular Food Containers",
          description: "Durable rectangular containers for meals and leftovers",
          image:
            "https://res.cloudinary.com/daqcima3z/image/upload/v1716493795/rectangular-container_uti1fj.jpg",
        },
        {
          id: 6,
          name: "Compartment Containers",
          description:
            "Containers with multiple compartments for organized meals",
          image:
            "https://res.cloudinary.com/daqcima3z/image/upload/v1716493795/compartment-containers_c4ve08.jpg",
        },
      ],
    },
  ];

  return (
    <div className="bg-[#091235] py-16 px-6 md:px-10">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1
          className="text-5xl font-bold text-white mb-4"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Our Products
        </h1>
        <p className="text-[#88A9C3] text-lg">
          Explore our comprehensive range of aluminum foil and food packaging
          solutions, designed for quality, performance, and sustainability.
        </p>
      </div>

      {/* Product Categories */}
      <div className="max-w-6xl mx-auto">
        {categories.map((category) => (
          <div key={category.id} className="mb-24">
            {/* Category Title with Underline */}
            <div className="relative mb-10">
              <h2
                className="text-2xl font-bold text-white mb-2"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {category.title}
              </h2>
              <div className="h-1 w-32 bg-[#4737FF] rounded"></div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.products.map((product) => (
                <div key={product.id} className="group cursor-pointer">
                  {/* Product Image */}
                  <div className="h-72 mb-4 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Product Name */}
                  <h3 className="text-lg font-semibold text-white">
                    {product.name}
                  </h3>

                  {/* Product Description */}
                  <p className="text-sm text-[#88A9C3]">
                    {product.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action Section */}
     
    </div>
  );
};

export default Products;
