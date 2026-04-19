import { useState } from "react";
import Swal from "sweetalert2";
import { useCategories } from "../../context/useCategories";
function Categories() {
  const { categories, addCategory, editCategory, removeCategory } =useCategories();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "" });
  const [editingId, setEditingId] = useState(null);

  // ================== OPEN ADD ==================
  const openAddModal = () => {
    setFormData({ name: "" });
    setEditingId(null);
    setShowModal(true);
  };

  // ================== OPEN EDIT ==================
  const openEditModal = (cat) => {
    setFormData({ name: cat.name });
    setEditingId(cat._id);
    setShowModal(true);
  };

  // ================== HANDLE CHANGE ==================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ================== SUBMIT ==================
  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      return Swal.fire("Error", "Name is required", "error");
    }

    try {
      if (editingId) {
        await editCategory(editingId, formData);
        Swal.fire("Updated!", "Category updated successfully", "success");
      } else {
        await addCategory(formData);
        Swal.fire("Added!", "Category created successfully", "success");
      }

      setShowModal(false);
    } catch (error) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  // ================== DELETE ==================
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await removeCategory(id);
        Swal.fire("Deleted!", "Category deleted", "success");
      } catch (error) {
        Swal.fire("Error", "Delete failed", "error");
      }
    }
  };

  return (
    <>
      {/* ================== ADD BUTTON ================== */}
      <div>
        <button
          onClick={openAddModal}
          className="bg-blue-700 text-white mb-4 p-2 rounded cursor-pointer"
        >
          Add Category
        </button>
      </div>

      {/* ================== LIST ================== */}
      {categories.map((cat) => (
        <div
          key={cat._id}
          className="flex justify-between p-3 items-center border-2 mb-3 rounded"
        >
          <h1 className="text-lg font-bold">{cat.name}</h1>

          <div className="flex gap-2">
            <button
              onClick={() => handleDelete(cat._id)}
              className="bg-red-600 text-white p-2 rounded cursor-pointer"
            >
              Delete
            </button>

            <button
              onClick={() => openEditModal(cat)}
              className="bg-amber-500 text-white p-2 rounded cursor-pointer"
            >
              Update
            </button>
          </div>
        </div>
      ))}

      {/* ================== MODAL ================== */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded w-80">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? "Update Category" : "Add Category"}
            </h2>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Category Name"
              className="w-full border p-2 mb-4 rounded"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                {editingId ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Categories;