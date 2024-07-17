

const CardCashIn = () => {
    const handelPayment =(e)=>{

        e.preventDefault()
    }
  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-center text-xl font-semibold mb-4">Payment Details</h2>
      <div className="flex justify-center mb-4">
        <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" className="w-12 h-12 mx-2" />
        <img src="https://img.icons8.com/color/48/000000/amex.png" alt="American Express" className="w-12 h-12 mx-2" />
        <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="MasterCard" className="w-12 h-12 mx-2" />
        <img src="https://img.icons8.com/color/48/000000/paypal.png" alt="PayPal" className="w-12 h-12 mx-2" />
      </div>
      <form onSubmit={handelPayment}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">CARD NUMBER</label>
          <input
            type="text"
            placeholder="Valid Card Number"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="flex mb-4">
          <div className="w-1/2 pr-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">EXPIRATION DATE</label>
            <input
              type="text"
              placeholder="MM / YY"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="w-1/2 pl-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">CV CODE</label>
            <input
              type="text"
              placeholder="CVC"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">CARD OWNER</label>
          <input
            type="text"
            placeholder="Card Owner Names"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-600"
        >
          Process payment
        </button>
      </form>
    </div>
  );
};

export default CardCashIn;
