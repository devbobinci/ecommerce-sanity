import { Product, FooterBanner, HeroBanner } from "../components";
import { client } from "../lib/client";
import Head from "next/head";

export default function Home({ products, bannerData }) {
  return (
    <>
      <Head>
        <title>Bob's Store</title>
      </Head>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className="products-heading">
        <h2>Best Selling products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
}

export async function getServerSideProps() {
  // To zapytanie pobiera wszystkie produkty (schema:product)
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  // To zapytanie pobiera wszystkie elementy w bannerze (schema:banner)
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
}
