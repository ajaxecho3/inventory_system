

const baseURL = 'http://localhost:5000';

const getproducts = async () => {
  const response = await fetch(`${baseURL}/products`);

  if (response.status === 200) {
    const data = await response.json();
    return data;
  }


}


const createProduct = async (product) => {
  const response = await fetch(`${baseURL}/product`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });

  if (response.status === 201) {
    const data = await response.json();
    return data;
  }
}

const updateProduct = async (product) => {
  const response = await fetch(`${baseURL}/product/${product.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });

  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
}


const deleteProduct = async (id) => {
  const response = await fetch(`${baseURL}/product/${id}`, {
    method: 'DELETE',
  });

  if (response.status === 200) {
    return true;
  }
}


const getSuppliersList = async () => {
  const response = await fetch(`${baseURL}/supplierlist`);

  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
}





export { getproducts, createProduct, updateProduct, deleteProduct, getSuppliersList };