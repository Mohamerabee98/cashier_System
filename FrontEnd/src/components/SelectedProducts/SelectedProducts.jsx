import { MdDelete } from "react-icons/md";
import { useCart } from "../../context/CartContext";

function SelectedProducts() {
  const { cartItems, updateQty, removeItem } = useCart();

  return (
    <div>
      {cartItems.length === 0 ? (
        <div className="h-full flex justify-center items-center">
          <p className="text-2xl">لم يتم اختيار منتجات</p>
        </div>
      ) : (
        <>
          {cartItems.map((product) => (
            <div
              key={product._id}
              className="bg-white p-2 mb-2 rounded shadow"
            >
              <div className="flex justify-between mb-3">
                <p>{product.name}</p>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQty(product._id, "inc")}
                    className="w-10 h-10 bg-gray-400 rounded-full text-white text-2xl"
                  >
                    +
                  </button>

                  <button
                    onClick={() => updateQty(product._id, "dec")}
                    className="w-10 h-10 bg-gray-400 rounded-full text-white text-2xl"
                  >
                    -
                  </button>

                  <span className="text-2xl font-bold">
                    {product.qty}
                  </span>

                  <button
                    onClick={() => removeItem(product._id)}
                    className="text-red-600 text-2xl"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>

              <p className="text-green-600 text-end">
                {product.price * product.qty} جنيه
              </p>
            </div>
          ))}

          <div className="mt-4 p-3 bg-indigo-700 text-white rounded shadow flex justify-between">
            <span className="text-xl font-bold">الإجمالي</span>
            <span className="text-xl font-bold">
              جنيه{" "}
              {cartItems.reduce(
                (t, p) => t + p.price * p.qty,
                0
              )}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export default SelectedProducts;