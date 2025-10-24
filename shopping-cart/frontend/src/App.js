import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, updateQuantity, clearCart } from "./cartSlice";

function App() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
// your backend URL
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setProducts(data);       // save products in state
        setLoading(false);       // finished loading
      } catch (err) {
        setError("Failed to load products"); // show error message
        setLoading(false);
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  const handleAdd = (product) => dispatch(addItem(product));
  const handleRemove = (id) => dispatch(removeItem(id));
  const handleQty = (id, qty) => dispatch(updateQuantity({ id, quantity: Number(qty) }));

  const total = items.reduce((s, it) => s + it.price * it.quantity, 0);

  if (loading) return <div style={{ padding: 20 }}>Loading products...</div>;
  if (error) return <div style={{ padding: 20, color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>Products</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
        <div>
          {products.map((p) => (
            <div key={p.id} style={{ border: "1px solid #ddd", padding: 10, marginBottom: 10 }}>
              <b>{p.name}</b>
              <div>₹{p.price}</div>
              <button onClick={() => handleAdd(p)} style={{ marginTop: 8 }}>Add to cart</button>
            </div>
          ))}
        </div>

        <div style={{ border: "1px solid #ddd", padding: 10 }}>
          <h3>Shopping Cart</h3>
          {items.length === 0 ? <p>Cart is empty</p> : (
            <>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {items.map((it) => (
                  <li key={it.id} style={{ marginBottom: 10 }}>
                    <div><b>{it.name}</b></div>
                    <div>₹{it.price} ×
                      <input type="number" value={it.quantity} min="1"
                             onChange={(e) => handleQty(it.id, e.target.value)}
                             style={{ width: 60, marginLeft: 8 }} />
                    </div>
                    <button onClick={() => handleRemove(it.id)} style={{ marginTop: 6 }}>Remove</button>
                  </li>
                ))}
              </ul>
              <hr/>
              <div><b>Total: ₹{total}</b></div>
              <button onClick={() => dispatch(clearCart())} style={{ marginTop: 8 }}>Clear Cart</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
