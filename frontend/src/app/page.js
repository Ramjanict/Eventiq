import Card from "@/components/Card";
import Category from "@/components/Category";
import MobileMenu from "@/components/MobileMenu";

const Books = () => {
  const array = Array(15).fill(null);
  return (
    <div className="flex flex-col lg:flex-row gap-6 xl:pl-[124px] w-full  xl:w-[calc(100vw-36px)] pt-3 lg:pt-[130px] xl:pt-[100px]  px-6 xl:px-0">
      <div className="hidden rounded-xl lg:block">
        <Category />
      </div>
      <div className="lg:hidden md:pt-4">
        <MobileMenu />
      </div>

      <div className="flex flex-col gap-6 h-screen overflow-scroll lg:ml-[350px]">
        {array.map((item, i) => {
          return <Card key={i} />;
        })}
      </div>
    </div>
  );
};

export default Books;
