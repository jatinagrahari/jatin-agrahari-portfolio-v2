import { ArrowRight, ArrowUpRight } from "lucide-react";

const Button = ({
  children,
  onClick,
  type = "primary",
  className = "",
  arrow = "plain",
}) => {
  const classes = {
    primary:
      " cursor-pointer  bg-accent text-black font-mono text-[13px] font-medium px-3 md:px-6 py-3 rounded-full hover:bg-white/80 transition-colors flex items-center gap-2",
    secondary:
      "  cursor-pointer  bg-transparent border border-gray-600 text-white/80 font-mono text-[13px] px-3 md:px-6 py-3 rounded-full hover:border-gray-400 transition-colors flex items-center gap-2",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`  ${classes[type]} ${className} `}
    >
      <span className="relative z-10">{children}</span>

      <span>
        {" "}
        {arrow === "plain" ? (
          <ArrowRight className="w-4 h-4" />
        ) : (
          <ArrowUpRight className="w-4 h-4" />
        )}
      </span>
    </button>
  );
};

export default Button;
