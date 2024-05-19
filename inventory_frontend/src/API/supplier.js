
const baseURL = 'http://localhost:5000';


const getSuppliers = async () => {
  const response = await fetch(`${baseURL}/suppliers`);

  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
}

const createSupplier = async (supplier) => {
  const response = await fetch(`${baseURL}/supplier`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(supplier),
  });

  if (response.status === 201) {
    const data = await response.json();
    return data;
  }
}

const updateSupplier = async (supplier) => {
  const response = await fetch(`${baseURL}/supplier/${supplier.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(supplier),
  });

  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
}



const deleteSupplier = async (id) => {
  const response = await fetch(`${baseURL}/supplier/${id}`, {
    method: 'DELETE',
  });

  if (response.status === 200) {
    return true;
  }
}


const getProductsBySupplierId = async (id) => {
  const response = await fetch(`${baseURL}/supplier/${id}/products`);

  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
}



export { getSuppliers, createSupplier, updateSupplier, deleteSupplier, getProductsBySupplierId };