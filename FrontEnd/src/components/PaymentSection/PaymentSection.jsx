import { useState } from "react";
import { useCart } from "../../context/CartContext";

export default function PaymentSection() {
  const { cartItems, total, totalItems } = useCart();

  const [orderType, setOrderType] = useState("dine-in");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const handleCheckout = () => {
    console.log({
      cartItems,
      total,
      totalItems,
      orderType,
      paymentMethod,
    });

    alert("تم تأكيد الطلب بنجاح ✅");
  };

  return (
    <div className="h-full p-3 flex flex-col gap-4">
      {/* نوع الطلب */}
      <div className="bg-white p-3 rounded shadow">
        <h2 className="mb-2 font-bold">نوع الطلب</h2>

        <div className="flex gap-2">
          <button
            onClick={() => setOrderType("dine-in")}
            className={`flex-1 p-2 rounded ${
              orderType === "dine-in"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            صالة
          </button>

          <button
            onClick={() => setOrderType("takeaway")}
            className={`flex-1 p-2 rounded ${
              orderType === "takeaway"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            تيك أواي
          </button>
        </div>
      </div>

      {/* الدفع */}
      <div className="bg-white p-3 rounded shadow">
        <h2 className="mb-2 font-bold">طريقة الدفع</h2>

        <div className="flex gap-2">
          <button
            onClick={() => setPaymentMethod("cash")}
            className={`flex-1 p-2 rounded ${
              paymentMethod === "cash"
                ? "bg-green-500 text-white"
                : "bg-gray-200"
            }`}
          >
            كاش
          </button>

          <button
            onClick={() => setPaymentMethod("visa")}
            className={`flex-1 p-2 rounded ${
              paymentMethod === "visa"
                ? "bg-purple-500 text-white"
                : "bg-gray-200"
            }`}
          >
            فيزا
          </button>
        </div>
      </div>

      {/* ملخص */}
      <div className="text-sm space-y-3 text-gray-700">
        <div className="flex justify-between border-b pb-2">
          <span>عدد الأصناف</span>
          <span>{totalItems}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span>الإجمالي</span>
          <span>{total} جنيه</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span>نوع الطلب</span>
          <span>
            {orderType === "dine-in" ? "صالة" : "تيك أواي"}
          </span>
        </div>

        <div className="flex justify-between">
          <span>الدفع</span>
          <span>
            {paymentMethod === "cash" ? "كاش" : "فيزا"}
          </span>
        </div>
      </div>

      {/* زر */}
      <button
        onClick={handleCheckout}
        disabled={cartItems.length === 0}
        className={`p-3 rounded text-white font-bold ${
          cartItems.length === 0
            ? "bg-gray-400"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        تأكيد الدفع وطباعة الفاتورة
      </button>
    </div>
  );
}