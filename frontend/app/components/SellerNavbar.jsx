import Image from 'next/image';

const SellerNavbar = () => {
  return (
    <div className="relative flex justify-between min-h-10 items-center border">
      <Image
        src="/logo.png"
        alt="logo"
        width={150}
        height={150}
        className="m-3 p-2"
      />
    </div>
  );
};

export default SellerNavbar;
