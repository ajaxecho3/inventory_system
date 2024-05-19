/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'

import { createProduct, deleteProduct, getSuppliersList, getproducts, updateProduct } from './API/products'
import Modal from './components/Modal';


const ProductModal = ({
  defaultValue,
  onProductChange,
  productId,
}) => {
  const [currentProduct, setCurrentProduct] = useState({
    name: '',
    price: '',
    quantity: '',
    category: '',
    description: '',
    brand: '',

  });


  useEffect(() => {
    setCurrentProduct({
      name: defaultValue.name,
      price: defaultValue.price,
      quantity: defaultValue.quantity,
      category: defaultValue.category,
      description: defaultValue.description,
      brand: defaultValue.brand,

    });
  }, [defaultValue])




  const handleUpdatedProduct = (currentProduct, id) => {

    const updatedProduct = {
      id: id,
      ...currentProduct
    }

    updateProduct(updatedProduct)
    onProductChange()

  }

  return (
    <Modal
      buttonClassName={"py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"}
      buttonTitle={"Edit Product"}
      modelTitle={"Edit Product"}
      modalActionTitle={"Edit product"}
      modelAction={() => handleUpdatedProduct(currentProduct, productId)}
      modelCancel={() => setCurrentProduct({
        name: '',
        price: '',
        quantity: '',
        category: '',
        description: '',
        brand: '',
      })} >

      <div className="flex flex-col gap-y-4">
        <input
          value={currentProduct.name}
          onChange={(e) => setCurrentProduct((prev) => {
            return {
              ...prev,
              name: e.target.value
            }
          })}
          type="text" placeholder="Product Name" className="w-full px-4 py-2 border rounded-lg shadow-sm" />
        <input
          defaultValue={currentProduct.price}
          onChange={(e) => setCurrentProduct((prev) => {
            return {
              ...prev,
              price: e.target.value
            }
          })}
          type="text" placeholder="Price" className="w-full px-4 py-2 border rounded-lg shadow-sm" />
        <input
          defaultValue={currentProduct.quantity}
          onChange={(e) => setCurrentProduct((prev) => {
            return {
              ...prev,
              quantity: e.target.value
            }
          })}
          type="text" placeholder="Quantity" className="w-full px-4 py-2 border rounded-lg shadow-sm" />
        <input
          defaultValue={currentProduct.category}
          onChange={(e) => setCurrentProduct((prev) => {
            return {
              ...prev,
              category: e.target.value
            }
          })}
          type="text" placeholder="Category" className="w-full px-4 py-2 border rounded-lg shadow-sm" />
        <input
          defaultValue={currentProduct.description}
          onChange={(e) => setCurrentProduct((prev) => {
            return {
              ...prev,
              description: e.target.value
            }
          })}
          type="text" placeholder="Description" className="w-full px-4 py-2 border rounded-lg shadow-sm" />
        <input
          defaultValue={currentProduct.brand}
          onChange={(e) => setCurrentProduct((prev) => {
            return {
              ...prev,
              brand: e.target.value
            }
          })}
          type="text" placeholder="Brand" className="w-full px-4 py-2 border rounded-lg shadow-sm" />

      </div>
    </Modal>
  )
}



function App() {

  const [productdata, setProductdata] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({
    name: '',
    price: '',
    quantity: '',
    category: '',
    description: '',
    brand: '',
    supplier_id: ''

  });

  const [suppliierList, setSupplierList] = useState([]);

  const [search, setSearch] = useState('');

  const getproductsdata = () => {
    const products = getproducts();
    if (products) {
      products.then((data) => {
        setProductdata(data);
      });
    }

    const suppliers = getSuppliersList();

    if (suppliers) {
      suppliers.then((data) => {
        setSupplierList(data);
      });
    }
  }

  useEffect(() => {
    getproductsdata();
  }, []);


  console.log(suppliierList)
  const handleCreateProduct = (currentProduct) => {
    createProduct(currentProduct).then(() => {
      const products = getproducts();
      products.then((data) => {
        setProductdata(data);
      });
    })

    setCurrentProduct({
      name: '',
      price: '',
      quantity: '',
      category: '',
      description: '',
      brand: '',
    })
  }

  const handleDeleteProduct = (id) => {
    deleteProduct(id).then(() => {
      const products = getproducts();
      products.then((data) => {
        setProductdata(data);
      });
    })
  }


  const handleSearchProduct = (e) => {
    const search = e

    const filteredProducts = productdata.filter((product) => {
      return product.name.toLowerCase().includes(search.toLowerCase());
    }
    )

    return filteredProducts;
  }




  return (
    <div className=' max-w-screen-xl mx-auto px-4 md:px-8 '>
      <div className="items-start justify-between md:flex mt-10">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Product List
          </h3>
          <p className="text-gray-600 mt-2">
            List of products in the inventory
          </p>
        </div>
        <div className="mt-3 md:mt-0">

          <Modal
            buttonTitle={"Add Product"}
            buttonClassName={"inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"}
            modelTitle={"Add New Product"}
            modalActionTitle={"Add product"}
            modelAction={() => handleCreateProduct(currentProduct)}
            modelCancel={() => setCurrentProduct({
              name: '',
              price: '',
              quantity: '',
              category: '',
              description: '',
              brand: '',
              supplier_id: ''
            })}>

            <div className="flex flex-col gap-y-4">
              <input
                onChange={(e) => setCurrentProduct((prev) => {
                  return {
                    ...prev,
                    name: e.target.value
                  }
                })}
                type="text" placeholder="Product Name" className="w-full px-4 py-2 border rounded-lg shadow-sm" />
              <input
                onChange={(e) => setCurrentProduct((prev) => {
                  return {
                    ...prev,
                    price: e.target.value
                  }
                })}
                type="text" placeholder="Price" className="w-full px-4 py-2 border rounded-lg shadow-sm" />
              <input
                onChange={(e) => setCurrentProduct((prev) => {
                  return {
                    ...prev,
                    quantity: e.target.value
                  }
                })}
                type="text" placeholder="Quantity" className="w-full px-4 py-2 border rounded-lg shadow-sm" />
              <input
                onChange={(e) => setCurrentProduct((prev) => {
                  return {
                    ...prev,
                    category: e.target.value
                  }
                })}
                type="text" placeholder="Category" className="w-full px-4 py-2 border rounded-lg shadow-sm" />
              <input
                onChange={(e) => setCurrentProduct((prev) => {
                  return {
                    ...prev,
                    description: e.target.value
                  }
                })}
                type="text" placeholder="Description" className="w-full px-4 py-2 border rounded-lg shadow-sm" />

              <input
                onChange={(e) => setCurrentProduct((prev) => {
                  return {
                    ...prev,
                    brand: e.target.value
                  }
                })}
                type="text" placeholder="Brand" className="w-full px-4 py-2 border rounded-lg shadow-sm" />
              <select onChange={(e) => setCurrentProduct((prev) => {
                return {
                  ...prev,
                  supplier_id: parseInt(e.target.value)
                }
              })} className="w-full px-4 py-2 border rounded-lg shadow-sm" >

                {suppliierList.map((supplier) => {
                  return (
                    <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                  )
                }
                )}
              </select>

            </div>
          </Modal>
        </div>
      </div>

      <div className=' flex justify-end my-2 '>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search for products"
          className=" w-96 px-4 py-2 border rounded-lg shadow-sm "
        />
      </div>
      <div className=' shadow-sm border rounded-lg overflow-x-auto'>

        <table className='w-full table-auto text-sm text-left'>
          <thead className='text-gray-600 font-medium border-b'>
            <tr>
              <th className='py-3 px-6 flex items-center gap-x-4'>Product Name</th>
              <th className='py-3 px-6'>Price</th>
              <th className='py-3 px-6'>Quantity</th>
              <th className='py-3 px-6'>Category</th>
              <th className='py-3 px-6'>Description</th>
              <th className='py-3 px-6'>Brand</th>
              <th className='py-3 px-6'>Actions</th>
            </tr>
          </thead>
          <tbody className='text-gray-600 divide-y'>
            {
              handleSearchProduct(search).map((product) => (
                <tr key={product.id} className='odd:bg-gray-50 even:bg-white'>
                  <td className="px-6 py-4 whitespace-nowrap flex items-center gap-x-4">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.brand}</td>
                  <td className="text-right px-6 whitespace-nowrap">

                    <ProductModal
                      defaultValue={product}
                      productId={product.id}
                      onProductChange={() => getproductsdata()}
                    />
                    <button onClick={() => handleDeleteProduct(product.id)} className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App

