import Head from "next/head";

import { useEffect, useState } from "react";
import { client, urlFor } from "../../lib/client";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { Product } from "../../components";
import { useStateContext } from "../../context/StateContext";

function ProductDetails({ product, products }) {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);
  // Pobieram z /context/
  const { qty, decQty, incQty, onAdd, setShowCart } = useStateContext();

  function handleBuyNow() {
    onAdd(product, qty);
    setShowCart(true);
  }

  const titleMessage = `${product?.name} | Bob's Store`;

  return (
    <div>
      <Head>
        <title>{titleMessage}</title>
      </Head>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image && image[index]?.asset?._ref)}
              alt={name}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item.asset._ref)}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews flex">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details:</h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(product, qty)}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
// poprzez destrukturyzacje slug w paramsach mam dostep do danyh w sanity konkretnego sluga(produktu)
export async function getStaticProps({ params: { slug } }) {
  // To zapytanie pobiera pierwszy produkt ktory zgadza sie ze slugiem
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  // Zwraca wszystkie produkty
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { product, products },
  };
}

export async function getStaticPaths() {
  // Zwraca mi sam slug, bo nie potrzebuje danych o produkcie poza tym
  const query = `*[_type == "product"]{
    slug{
      current
    }
  }`;
  const products = await client.fetch(query);
  return {
    paths: products.map((product) => ({
      params: { slug: product.slug.current },
    })),
    fallback: "blocking",
  };
}

export default ProductDetails;
