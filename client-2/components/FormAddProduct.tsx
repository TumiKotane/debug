import React, { useState, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddProduct: React.FC = () => { // React.FC is a generic type for functional components
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const navigate = useNavigate();

  const saveProduct = async (e: FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    try {
      await axios.post("http://192.168.100.6:5000/products", { //change to "localhost"
        name: name,
        price: price,
      });
      navigate("/products");
    } catch (error: any) { // 'error' could be of any type, so use 'any' for simplicity
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Products</h1>
      <h2 className="subtitle">Add New Product</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveProduct}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Product Name"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Price</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddProduct;
