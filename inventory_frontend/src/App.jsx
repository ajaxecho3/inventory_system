import { useEffect, useState } from 'react'

import './App.css'
import { getproducts } from './API/products'

function App() {

  const [productdata, setProductdata] = useState([]);

  useEffect(() => {
    const products = getproducts();
    if (products) {
      products.then((data) => {
        setProductdata(data);
      });
    }
  }, []);


  return (
    <div className='container'>
      <h1>Product Inventory</h1>
      <table className='product-table'>
        <thead className='product-thead'>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Description</th>
            <th>Brand</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            productdata.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.category}</td>
                <td>{product.description}</td>
                <td>{product.brand}</td>
                <td>
                  <div>
                    edit
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default App
