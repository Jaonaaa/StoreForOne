import { Variants } from "motion/react";

export const variantsProductList: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
  exist: {
    opacity: 1,
  },
};

export const variantsProductCard: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: [0.49, 0.27, 0.33, 0.79],
      duration: 0.5,
    },
  },
  exist: {
    opacity: 0,
    y: 80,
  },
};
