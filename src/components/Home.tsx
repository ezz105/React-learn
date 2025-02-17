import { SearchInput } from "./SearchInput";

export const Home = () => {

  return (
    <div className="bg-white p-4">
      <SearchInput />
      <div className="flex flex-col items-center justify-center p-4">
        <h2 className="text-3xl font-bold">Welcome to my e-commerce store</h2>
        <p className="text-lg">The best place to find the best products</p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-indigo-500 p-4 rounded-lg">
          <p className="text-white text-lg">New Arrivals</p>
        </div>
        <div className="bg-orange-500 p-4 rounded-lg">
          <p className="text-white text-lg">Best Sellers</p>
        </div>
        <div className="bg-green-500 p-4 rounded-lg">
          <p className="text-white text-lg">Deals of the Day</p>
        </div>
      </div>

    </div>
    
  );
};
