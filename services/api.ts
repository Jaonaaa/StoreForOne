const BASE_URL = "https://fakestoreapi.com/";

export type ProductType = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

const fetchProducts = async (): Promise<ProductType[]> => {
  return await fetch(BASE_URL + "products").then((response) => response.json());
};

export { fetchProducts };
