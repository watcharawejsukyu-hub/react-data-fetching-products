import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [products, setProduct] = useState([]);

  const [status, setStatus] = useState("loading");

  useEffect(() => {
    getProduct();
  }, [])

  const getProduct = async () => {
    setStatus("loading");
    try
    {
      const result = await axios.get(
        "http://localhost:4001/products"
      );
      setProduct(result.data.data);
      setStatus("complete");
    }
    catch (error)
    {
      console.error(Error);
      setStatus("failed");
    }
  };

  if (status === "loading") {
    return <h1>Loading...</h1>;
  }

  if (status === "failed") {
    return <h1>Fetching Error...</h1>;
  }

  const delProduct = async (productId) => {
    const deleteProductID = await axios.delete(
      `http://localhost:4001/products/${productId}`
    );
    console.log(deleteProductID);
    setProduct((afterDelete) =>
      afterDelete.filter((product) => product.id !== productId)
    );
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {products.map((product) => (
          <div className="product" key={product.id}>
            <div className="product-preview">
              <img
                src={product.image}
                alt={product.name}
                width="350"
                height="350"
              />
            </div>
            <div className="product-detail">
              <h1>Product name: {product.name}</h1>
              <h2>Product price: {product.price} Baht</h2>
              <p>Product description: {product.description}</p>
            </div>

            <button className="delete-button" onClick={() => delProduct(product.id)}>
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
