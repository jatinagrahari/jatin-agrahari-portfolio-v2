import { navLinks } from "../../data/index";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav className="pt-8 pb-4 flex justify-center w-full relative z-20">
        <div className="flex gap-6 font-mono text-[13px] border border-gray-800 rounded-full px-8 py-3 bg-dark/80 backdrop-blur-md shadow-lg">
          {navLinks.map((item) =>
            item.isExternal ? (
              <a
                key={item.label}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                to={item.path}
                className="hover:text-accent transition-colors"
              >
                {item.label}
              </Link>
            ),
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
