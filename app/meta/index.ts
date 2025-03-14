import { Metadata } from "next";

export const description =
  "Gérez vos articles facilement : recherchez, ajoutez, modifiez et supprimez en toute fluidité grâce à une interface rapide et moderne.";
const title = "StoreForOne";

export const defaultMetaData: Metadata = {
  title: title,
  description: description,
  keywords: ["StoreForOne", "web app", "store", "management"],
  openGraph: {
    type: "website",
    url: "https://store-for-one.vercel.app/",
    title: title,
    description: description,
    siteName: title,
    images: "https://i.ibb.co/zHXRfg77/storeforone.png",
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
    images: "https://i.ibb.co/zHXRfg77/storeforone.png",
  },
  authors: { name: "Jaona Ferdinah", url: "https://www.linkedin.com/in/jaona-ferdinah/" },
};
