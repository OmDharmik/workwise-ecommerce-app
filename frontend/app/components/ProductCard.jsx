const ProductCard = ({ product }) => {
  console.log(product);
  return (
    <div className="flex flex-col">
      <div className="bg-gray-300 rounded-md h-40 w-40"></div>
      <div className="flex flex-col gap-2">
        <div className="text-lg font-semibold">{product.name}</div>
        <div className="text-xl font-semibold">Rs {product.price}</div>
        <div>
          <button className="bg-blue-500 text-white rounded-md p-2">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
