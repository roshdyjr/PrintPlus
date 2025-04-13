"use client";
 import { FaCheckCircle } from "react-icons/fa";

interface OrderDetails {
  email: string;
  orderNumber: string;
  address: string;
}

const OrderConfirmation = ({ orderDetails }: { orderDetails: OrderDetails }) => {
  return (
    <div className="p-6">
      <div>
        <div className="flex items-center gap-3">
          <FaCheckCircle className="text-[#2DD4BF] text-3xl mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Thank you for your order!
          </h2>
        </div>

        <p className="text-gray-600 mb-6">
          An order confirmation has been sent to{" "}
          <span className="text-[16px] font-[600] text-[#0F172A]">
            {orderDetails.email}
          </span>
        </p>

        <div>
          <p className="text-gray-600 mb-6">
            Your order number is{" "}
            <span className="text-[16px] font-[600] text-[#0F172A]">
              {orderDetails.orderNumber}
            </span>
          </p>
          <p className="text-gray-600 mb-6">Keep track of your order</p>
          <div className="pt-4">
            <h1 className="text-[16px] font-[600] text-[#0F172A]">Delivery</h1>
            <p className="text-gray-600">{orderDetails.address}</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default OrderConfirmation;