import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  TextInput,
} from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';

const Header = () => {
  const path = useLocation().pathname;
  return (
    <Navbar className='border-b-2 border-b-gray-200 shadow-md'>
      {/* Logo */}
      <NavbarBrand
        as={Link}
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-cyan-400 to-cyan-800 rounded-lg text-white">
          Sanya's
        </span>
        Blog
      </NavbarBrand>

      {/* Search field / desktop*/}
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          color="info"
          className="hidden md:inline"
        />
      </form>

      {/* Search field / mobile*/}
      <Button color="light" className="md:hidden" pill>
        <AiOutlineSearch />
      </Button>

      <div className="flex gap-2 md:order-2">
        {/* change theme */}
        <Button color="light" className="hidden sm:inline" pill>
          <FaMoon />
        </Button>
        <Link
          to="sign-in"
          className="w-20 py-1 rounded-md flex justify-center items-center bg-gradient-to-l from-teal-600 to-lime-200 text-gray-900 shadow-md shadow-teal-800 hover:scale-[1.03] active:translate-y-1 transition-all duration-300 will-change-transform"
        >
          Sign In
        </Link>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink as={Link} to="/" active={path === '/'}>
          Home
        </NavbarLink>
        <NavbarLink as={Link} to="/about" active={path === '/about'}>
          About
        </NavbarLink>
        <NavbarLink as={Link} to="/projects" active={path === '/projects'}>
          Projects
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
};
export default Header;
