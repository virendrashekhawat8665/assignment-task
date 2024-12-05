import React from "react";
import Layout from "../component/Layout";
import Card from "../component/Product/Card";
import axios from "axios";

export interface IProducts {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  title: string;
}

const Home: React.FC = () => {
  const [products, setProducts] = React.useState<IProducts[]>([]);
  const [categories, setCategories] = React.useState<any>([]);
  const [selectedCategories, setSelectedCategories] = React.useState([]);
  const [sortOption, setSortOption] = React.useState("");
  const [filteredProducts, setFilteredProducts] = React.useState<IProducts[]>(
    []
  );

  React.useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);
  React.useEffect(() => {
    const uniqueCategories = [
      ...new Set(products.map((item) => item.category)),
    ];
    setCategories(uniqueCategories);
  }, [products]);
  React.useEffect(() => {
    console.log(categories, "categories");
  }, []);

  React.useEffect(() => {
    let updatedProducts = products;
    if (selectedCategories?.length > 0) {
      updatedProducts = updatedProducts.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }
    if (sortOption === "price_asc") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price_desc") {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updatedProducts);
  }, [products, selectedCategories, sortOption]);

  const handleCategoryChange = (category: any) => {
    //@ts-ignore
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev?.filter((c) => c !== category)
        : [...prev, category]
    );
  };
  return (
    <>
      <Layout>
        <div className="container mx-auto">
          <div className="mb-6 flex flex-col lg:flex-row items-center justify-between">
            {/* Categories */}
            <div className="mb-4 lg:mb-0">
              <h2 className="text-lg font-medium mb-2">Filter by Category:</h2>
              <div className="flex flex-wrap gap-2">
                {categories?.map((category: string, index: number) => (
                  <button
                    key={index}
                    className={`px-4 py-2 border rounded ${
                      selectedCategories?.includes(category)
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-800"
                    } hover:bg-blue-500 hover:text-white`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Sorting */}
            <div>
              <h2 className="text-lg font-medium mb-2">Sort by:</h2>
              <select
                className="px-4 py-2 border rounded bg-white"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="">Select</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts?.map((ele) => {
              return <Card key={ele.id} item={ele} />;
            })}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;

const fetchProducts = async () => {
  const data = axios
    .get(`https://fakestoreapi.com/products`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {});
  return data;
};
