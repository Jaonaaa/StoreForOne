const BASE_URL = "https://fakestoreapi.com/";

type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
};

const fetchProducts = async (): Promise<Product[]> => {
  return await fetch(BASE_URL + "products").then((response) => response.json());
};

export { fetchProducts };
