import { useState } from "react";
import { useCart } from "../../context/CartContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

export default function PaymentSection() {
  const { cartItems, total, totalItems , clearCart} = useCart();
  const [orderType, setOrderType] = useState("dine-in");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const handleCheckout = () => {
    MySwal.fire({
      icon: "success",
      title: "تم تأكيد الطلب ",
      text: "تم تسجيل الطلب بنجاح",
      confirmButtonText: "تمام",
    }).then(() => {
      clearCart();
      setOrderType("dine-in");
      setPaymentMethod("cash");
    });
  };

  return (
    <div className="h-full p-4 flex flex-col gap-4 bg-slate-50 rounded-xl border">
  
      <div className="bg-white p-3 rounded-lg border">
        <h2 className="mb-2 font-bold text-slate-700">نوع الطلب</h2>

        <div className="flex gap-2">
          <button
            onClick={() => setOrderType("dine-in")}
            className={`flex-1 p-2 rounded-md transition cursor-pointer ${
              orderType === "dine-in"
                ? "bg-blue-500 text-white"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            صالة
          </button>

          <button
            onClick={() => setOrderType("takeaway")}
            className={`flex-1 p-2 rounded-md transition cursor-pointer ${
              orderType === "takeaway"
                ? "bg-blue-500 text-white"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            تيك أواي
          </button>
        </div>
      </div>


      <div className="bg-white p-3 rounded-lg border">
        <h2 className="mb-2 font-bold text-slate-700">طريقة الدفع</h2>

        <div className="flex gap-2">
          <button
            onClick={() => setPaymentMethod("cash")}
            className={`flex-1 p-2 rounded-md transition cursor-pointer ${
              paymentMethod === "cash"
                ? "bg-green-500 text-white"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            كاش
          </button>

          <button
            onClick={() => setPaymentMethod("visa")}
            className={`flex-1 p-2 rounded-md transition cursor-pointer ${
              paymentMethod === "visa"
                ? "bg-indigo-500 text-white"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            فيزا
          </button>
        </div>
      </div>

 
      <div className="text-sm space-y-3 text-slate-700">
        <div className="flex justify-between border-b pb-2">
          <span>عدد الأصناف</span>
          <span>{totalItems}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span>الإجمالي</span>
          <span className="text-green-600 font-semibold">{total} جنيه</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span>نوع الطلب</span>
          <span>{orderType === "dine-in" ? "صالة" : "تيك أواي"}</span>
        </div>

        <div className="flex justify-between">
          <span>الدفع</span>
          <span>{paymentMethod === "cash" ? "كاش" : "فيزا"}</span>
        </div>
      </div>



      <button
        onClick={handleCheckout}
        disabled={cartItems.length === 0}
        className={`p-3 rounded-lg font-bold transition cursor-pointer ${
          cartItems.length === 0
            ? "bg-gray-300 text-gray-500"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        تأكيد الدفع وطباعة الفاتورة
      </button>
    </div>
  );
}
