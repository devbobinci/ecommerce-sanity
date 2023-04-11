import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "apylaeqb",
  dataset: "production",
  apiVersion: "2023-04-09",
  useCdn: "",
  token: process.env.SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

// Pozwala uzywac fotek
export const urlFor = (source) => builder.image(source);
