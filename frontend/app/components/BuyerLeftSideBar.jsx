'use client';
import Link from 'next/link';

const BuyerLeftSideBar = ({ pathname }) => {
  const isHomeActive = pathname === '/buyer/home';
  const isCategoryActive = pathname === '/buyer/category';

  return (
    <div className="flex flex-col bg-slate-100 h-screen min-w-40 text-center gap-5 rounded-r-md">
      <Link
        href="/buyer/home"
        className={`flex justify-center text-center mt-10 py-5 text-xl font-semibold cursor-pointer hover:text-white hover:bg-blue-400 rounded-r-md ${
          isHomeActive ? 'bg-blue-400' : ''
        }`}
      >
        Home
      </Link>
      <Link
        href="/buyer/category"
        className={`flex justify-center text-center py-5 text-xl font-semibold cursor-pointer hover:text-white hover:bg-blue-400 rounded-r-md ${
          isCategoryActive ? 'bg-blue-400' : ''
        }`}
      >
        Category
      </Link>
    </div>
  );
};

export default BuyerLeftSideBar;
