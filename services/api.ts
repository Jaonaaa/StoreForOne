import { NewProductType, ProductType } from "./types";

const BASE_URL = "https://fakestoreapi.com/";

const fetchProducts = async (): Promise<ProductType[]> => {
  return await fetch(BASE_URL + "products").then((response) => response.json());
};

const fetchOneProducts = async (id: string): Promise<ProductType> => {
  return await fetch(BASE_URL + `products/${id}`).then((response) => response.json());
};

const addProducts = async (product: NewProductType): Promise<{ id: number }> => {
  return await fetch(BASE_URL + "products", {
    method: "POST",
    body: JSON.stringify(product),
  }).then((response) => response.json());
};

const updateProduct = async (id: string, product: ProductType): Promise<ProductType> => {
  return await fetch(BASE_URL + `products/${id}`, {
    method: "PUT",
    body: JSON.stringify(product),
  }).then((response) => response.json());
};

const deleteProduct = async (id: string): Promise<ProductType> => {
  return await fetch(BASE_URL + `products/${id}`, {
    method: "DELETE",
  }).then((response) => response.json());
};

const fetchCategories = async (): Promise<string[]> => {
  return await fetch(BASE_URL + "products/categories").then((response) => response.json());
};

const fetchProductsByCategories = async (category: string): Promise<ProductType[]> => {
  return await fetch(BASE_URL + `products/categories/${category}`).then((response) => response.json());
};

export { fetchProducts, fetchCategories, fetchProductsByCategories, addProducts, updateProduct, deleteProduct, fetchOneProducts };
