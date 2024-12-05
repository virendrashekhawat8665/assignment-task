import React from "react";
import Layout from "../component/Layout";
import CardDetails from "../component/Product/CardDetails";
import axios from "axios";
import { IProducts } from "./home";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();

  const [products, setProducts] = React.useState<IProducts>({
    category: "",
    description: "",
    id: 0,
    image: "",
    price: 0,
    rating: { rate: 0, count: 0 },
    title: "",
  });

  React.useEffect(() => {
    if (params?.id) {
      fetchProducts(params?.id).then(setProducts);
    }
  }, [params?.id]);

  return (
    <div>
      <Layout>
        <div className="container mx-auto">
          <CardDetails item={products as IProducts} />
        </div>
      </Layout>
    </div>
  );
};

export default ProductDetails;

const fetchProducts = async (id: string) => {
  const data = axios
    .get(`https://fakestoreapi.com/products/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {});
  return data;
};
