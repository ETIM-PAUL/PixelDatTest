import logo from "../logo.jpeg"
import { Link } from "react-router-dom"

function TopNav() {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/another" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-12" alt="BushPortal Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">BUSDPortal</span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Link to="/another">
            <button className="text-white font-medium rounded-lg text-sm px-4 py-3 text-center">
              another page
            </button>
          </Link>
          <Link to="/contact">
            <button className="text-white font-medium rounded-lg text-sm px-4 py-3 text-center">
              Contact us
            </button>
          </Link>
          <button type="button" className="text-white font-medium rounded-lg text-sm px-4 py-3 text-center">
            <w3m-button size='md' />
          </button>
          <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default TopNav;
