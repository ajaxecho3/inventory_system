

const baseURL = 'http://localhost:5000';

const getproducts = async () => {
  const response = await fetch(`${baseURL}/products`);

  if (response.status === 200) {
    const data = await response.json();
    return data;
  }


}


const createProduct = async (product) => {
  const response = await fetch(`${baseURL}/products`, {
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





export { getproducts, createProduct };