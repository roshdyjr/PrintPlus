// pages/index.js

 
 
export default function Custom_Merchandise() {
  return (
    <div className="min-h-screen  ">
 

      <div className="flex flex-col sm:flex-row max-w-7xl mx-auto mt-6 px-4 gap-6">
    

        <main className="flex-1 bg-white rounded-lg  p-6 text-sm">
          <h2 className="text-xl font-semibold mb-4">Custom Merchandise</h2>

          <section className="mb-6">
            <h3 className="font-medium mb-2">Available Products</h3>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>T-Shirts & Apparel</strong> – Design custom t-shirts, hoodies, and polo shirts with your logo or artwork.</li>
              <li><strong>Mugs & Drinkware</strong> – Create personalized coffee mugs, tumblers, and water bottles.</li>
              <li><strong>Bags & Totes</strong> – Print your designs on eco-friendly tote bags and backpacks.</li>
              <li><strong>Phone Cases</strong> – Customize phone cases for various smartphone models.</li>
              <li><strong>Office Supplies</strong> – Add your branding to notebooks, pens, and mousepads.</li>
              <li><strong>Home & Lifestyle</strong> – Personalize pillows, coasters, and wall art.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h3 className="font-medium mb-2">Design Guidelines</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Use high-resolution images (300 DPI or higher) for crisp and clear printing.</li>
              <li>Submit files in PNG, JPEG, or PDF format with a transparent background if necessary.</li>
              <li>Check the product dimensions and safe print area before finalizing your design.</li>
            </ul>
          </section>

          <section>
            <h3 className="font-medium mb-2">How to Order</h3>
            <ol className="list-decimal list-inside space-y-1">
              <li>Select your desired product.</li>
              <li>Upload your design or create it using our editor.</li>
              <li>Preview, confirm, and place your order.</li>
            </ol>
          </section>
        </main>
      </div>
    </div>
  )
}
