import { MdDelete } from "react-icons/md";
import { useCart } from "../../context/CartContext";

function SelectedProducts() {
  const { cartItems, updateQty, removeItem } = useCart();

 return (
  <div>
    {cartItems.length === 0 ? (
      <div className="h-full flex justify-center items-center">
        <p className="text-2xl text-slate-400">
          لم يتم اختيار منتجات
        </p>
      </div>
    ) : (
      <>
        {cartItems.map((product) => (
          <div
            key={product._id}
            className="bg-white p-3 mb-2 rounded-lg border"
          >
            <div className="flex justify-between mb-3">
              <p>{product.name}</p>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQty(product._id, "inc")}
                  className="w-9 h-9 bg-slate-200 hover:bg-slate-300 rounded-full cursor-pointer"
                >
                  +
                </button>

                <button
                  onClick={() => updateQty(product._id, "dec")}
                  className="w-9 h-9 bg-slate-200 hover:bg-slate-300 rounded-full cursor-pointer"
                >
                  -
                </button>

                <span className="text-xl font-bold">
                  {product.qty}
                </span>

                <button
                  onClick={() => removeItem(product._id)}
                  className="text-red-500 hover:text-red-600 text-2xl cursor-pointer"
                >
                  <MdDelete />
                </button>
              </div>
            </div>

            <p className="text-green-600 text-end font-semibold">
              {product.price * product.qty} جنيه
            </p>
          </div>
        ))}

        <div className="mt-4 p-3 bg-blue-600 text-white rounded-lg flex justify-between">
          <span className="text-lg font-bold">الإجمالي</span>
          <span className="text-lg font-bold">
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