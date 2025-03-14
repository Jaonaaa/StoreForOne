import { Variants } from "motion/react";

export const variantsProductDetails: Variants = {
  hidden: {
    y: "10%",
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      ease: [0.49, 0.27, 0.33, 0.79],
      delayChildren: 0.5,
    },
  },
  exist: {
    opacity: 0,
    y: "50%",
  },
};

export const variantsTextDetails: Variants = {
  hidden: {
    y: "95%",
  },
  show: (index) => ({
    y: 0,
    transition: {
      ease: "easeOut",
      duration: 0.2,
      delay: index,
    },
  }),
  exist: {
    y: -100,
  },
};

export const variantsTextHideDetails: Variants = {
  hidden: {
    opacity: 0,
  },
  show: (index) => ({
    opacity: 1,
    transition: {
      ease: [0.49, 0.27, 0.33, 0.79],
      duration: 0.4,
      delay: index,
    },
  }),
  exist: {
    opacity: 0,
  },
};

export const variantsBlurImage: Variants = {
  hidden: {
    filter: "blur(10px)",
  },
  show: (index) => ({
    filter: "blur(0)",
    transition: {
      delay: index,
    },
  }),
  exist: {
    opacity: 0,
  },
};
