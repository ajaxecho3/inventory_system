/* eslint-disable no-unused-vars */
import React from 'react'

import { createSupplier, deleteSupplier, getProductsBySupplierId, getSuppliers } from './API/supplier';
import Modal from './components/Modal';


function Supplier() {

  const [suppliers, setSuppliers] = React.useState([]);

  const [currentSupplier, setCurrentSupplier] = React.useState({
    name: '',
    address: '',
    mobile: '',
  });

  const handlegetSuppliers = () => {

    getSuppliers().then((data) => {

      const productsBySupplier = data.map((supplier) => {
        return getProductsBySupplierId(supplier.id).then((products) => {
          //return product count



          return {
            supplierId: supplier.id,
            products: products.reduce((acc, product) => {
              return acc + 1;
            }
              , 0)
          }
        });
      });
      const temp = [];

      for (let i = 0; i < data.length; i++) {
        productsBySupplier[i].then((product) => {
          temp.push({
            ...data[i],
            products: product.products
          });
          if (i === data.length - 1) {
            setSuppliers(temp);
          }
        });
      }

      setSuppliers(data);
    });
  }

  const handleAddNewSupplier = (supplier) => {
    if (supplier.name === '' || supplier.address === '' || supplier.mobile === '') {
      alert('Please fill all fields');
      return;
    }

    createSupplier(supplier).then(() => {
      handlegetSuppliers();
      setCurrentSupplier({
        name: '',
        address: '',
        mobile: '',
      });
    });
  }

  const handleDeleteSupplier = (supplierId) => {
    deleteSupplier(supplierId).then(() => {
      handlegetSuppliers();
    });
  }


  React.useEffect(() => {
    handlegetSuppliers();
  }, []);

  return (
    <div className=' max-w-screen-xl mx-auto px-4 md:px-8 '>
      <div className='flex justify-between items-center mt-10'>
        <h1 className='text-2xl font-bold'>Suppliers</h1>
        <div className='flex space-x-1'>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handlegetSuppliers}>Refresh</button>
          <Modal
            buttonClassName={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}
            buttonTitle={"Add new supplier"}
            modalActionTitle={"Add supplier"}
            modelTitle={"Add new supplier"}
            modelAction={() => handleAddNewSupplier(currentSupplier)}
          >
            <input
              type='text'
              placeholder='Name'
              className='border border-gray-300 p-2 w-full rounded mt-2'
              value={currentSupplier.name}
              onChange={(e) => setCurrentSupplier({ ...currentSupplier, name: e.target.value })}
            />
            <input
              type='text'
              placeholder='Address'
              className='border border-gray-300 p-2 w-full rounded mt-2'
              value={currentSupplier.address}
              onChange={(e) => setCurrentSupplier({ ...currentSupplier, address: e.target.value })}
            />
            <input
              type='text'
              placeholder='Mobile'
              className='border border-gray-300 p-2 w-full rounded mt-2'
              value={currentSupplier.mobile}
              onChange={(e) => setCurrentSupplier({ ...currentSupplier, mobile: e.target.value })}
            />



          </Modal>
        </div>
      </div>
      <div className=' shadow-sm border rounded-lg overflow-x-auto mt-2'>
        <table className='w-full table-auto text-sm text-left'>
          <thead className='text-gray-600 font-medium border-b'>
            <tr>
              <th className='py-3 px-6'>ID</th>
              <th className='py-3 px-6 flex items-center gap-x-42'>Name</th>
              <th className='py-3 px-6'>Address</th>
              <th className='py-3 px-6'>Mobile</th>
              <th className='py-3 px-6'>Product Count</th>
              <th className='py-3 px-6'>Actions</th>
            </tr>
          </thead>
          <tbody className='text-gray-600 divide-y'>
            {
              suppliers.map((supplier, idx) => {
                return (
                  <tr key={idx} className='odd:bg-gray-50 even:bg-white'>
                    <td className='px-6 py-4 whitespace-nowrap'>{supplier.id}</td>
                    <td className='px-6 py-4 whitespace-nowrap flex items-center gap-x-4'>{supplier.name}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{supplier.address}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{supplier.mobile}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{supplier.products}</td>
                    <td className='text-right px-6 whitespace-nowrap'>

                      {
                        supplier.products === 0 ? (
                          <button onClick={() => handleDeleteSupplier(supplier.id)} className='py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg'>Delete</button>
                        ) : (
                          null
                        )
                      }
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Supplier