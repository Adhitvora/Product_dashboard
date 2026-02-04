import { useEffect, useState } from "react";
import api from "../api/api.js";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import Navbar from "../component/Navbar";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/products");
      setProducts(data.products || []);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // OPEN ADD MODAL
  const openAddModal = () => {
    setForm({ name: "", price: "", quantity: "" });
    setEditId(null);
    setShowModal(true);
  };

  // OPEN EDIT MODAL
  const openEditModal = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    });
    setEditId(product._id);
    setShowModal(true);
  };

  // ADD / UPDATE PRODUCT
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price) {
      alert("Name and price are required");
      return;
    }

    try {
      if (editId) {
        await api.put(`/products/${editId}`, form);
      } else {
        await api.post("/products", form);
      }

      setShowModal(false);
      fetchProducts();
    } catch (error) {
      console.error("Failed to save product", error);
    }
  };

  // DELETE PRODUCT
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-5xl mx-auto border border-gray-100">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row justify-between items-center p-8 border-b border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
              Product List
            </h2>

            <button
              onClick={openAddModal}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition shadow-md"
            >
              + Add Product
            </button>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-blue-50/50">
                <tr>
                  <th className="py-4 px-6">Name</th>
                  <th className="py-4 px-6">Price</th>
                  <th className="py-4 px-6">Qty</th>
                  <th className="py-4 px-6 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {products.length > 0 ? (
                  products.map((p) => (
                    <tr key={p._id} className="hover:bg-gray-50">
                      <td className="py-4 px-6 font-medium">{p.name}</td>
                      <td className="py-4 px-6 text-blue-600 font-semibold">
                        ₹{p.price}
                      </td>
                      <td className="py-4 px-6">
                        <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                          {p.quantity}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center space-x-3">
                        <button
                          onClick={() => openEditModal(p)}
                          className="text-blue-600 hover:underline text-2xl"
                        >
                          <FiEdit />
                        </button>
                        <button
                          onClick={() => deleteProduct(p._id)}
                          className="text-red-500 hover:underline text-2xl"
                        >
                          <MdDeleteForever />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-10 text-gray-500">
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 backdrop-blur-lg bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-96 p-6 shadow-xl">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold mb-4">
                  {editId ? "Edit Product" : "Add Product"}
                </h3>
              </div>

              <div
                className="text-2xl text-red-500"
                onClick={() => setShowModal(false)}
              >
                <IoIosCloseCircleOutline />
              </div>
            </div>
            <form onSubmit={submitHandler}>
              <input
                className="w-full border p-2 mb-3 rounded"
                placeholder="Product Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                type="number"
                className="w-full border p-2 mb-3 rounded"
                placeholder="Price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />

              <input
                type="number"
                className="w-full border p-2 mb-4 rounded"
                placeholder="Quantity"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                  {editId ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
