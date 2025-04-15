import DeliveryForm from "@/components/CheckoutComponents/DeliveryForm";
import OrderSummary from "@/components/CheckoutComponents/OrderSummary";
  
 

export default function checkout() {
  return (
    <main className="min-h-screen   p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <DeliveryForm/>
        </div>
        <div>
          <OrderSummary />
        </div>
      </div>
    </main>
  );
}
