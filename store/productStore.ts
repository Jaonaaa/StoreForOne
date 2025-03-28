import { ProductType } from "@/services/types";
import { create } from "zustand";

type ProductStore = {
  products: ProductType[];
  categories: string[];
  setProducts: (products: ProductType[]) => void;
  setCategories: (categories: string[]) => void;
  addProduct: (product: ProductType) => void;
  updateProduct: (id: number, updatedProduct: ProductType) => void;
  deleteProduct: (id: number) => void;
};

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  categories: [],

  setProducts: (products: ProductType[]) => set({ products: products }),
  setCategories: (categories: string[]) => set({ categories: categories }),
  addProduct: (product: ProductType) => {
    set((state) => ({ products: [product, ...state.products] }));
  },
  updateProduct: (id: number, newProduct: ProductType) =>
    set((state) => ({
      products: state.products.map((product) => (product.id === id ? newProduct : product)),
    })),
  deleteProduct: (id: number) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    })),
}));
