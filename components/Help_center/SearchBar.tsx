// components/HelpCenter/SearchBar.tsx
export default function SearchBar() {
  return (
    <div className="py-10 bg-[#6366F10F] px-4">
      <div className="">
        <h1 className="text-[32px] sm:text-xl font-[500] text-center text-[#6366F1]">
          Hello, how can we help?
        </h1>
      </div>
      <div className="relative max-w-2xl mx-auto  py-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300   leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-full"
          placeholder="Q Search"
        />
      </div>
      <p className="  text-center font-[400] text-[#2F2B3DB2] text-[20px]">
        Common troubleshooting topics: eCommerce , payment ect....
      </p>
    </div>
  );
}
