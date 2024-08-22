import Link from 'next/link';
const SellerLeftSideBar = ({ pathname }) => {
  console.log(pathname);
  return (
    <div className="flex flex-col bg-slate-100 h-screen min-w-40 text-center gap-5 rounded-r-md">
      <Link
        href="/seller/home"
        className={`flex justify-center text-center mt-10 py-5 text-xl font-semibold cursor-pointer hover:text-white hover:bg-blue-400 rounded-r-md ${
          pathname === '/seller/home' ? 'bg-blue-400' : ''
        }`}
      >
        Home
      </Link>
      <Link
        href="/seller/products"
        className={`flex justify-center text-center py-5 text-xl font-semibold cursor-pointer hover:text-white hover:bg-blue-400 rounded-r-md ${
          pathname === '/seller/products' ? 'bg-blue-400' : ''
        }`}
      >
        Products
      </Link>
    </div>
  );
};

export default SellerLeftSideBar;
