import { FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full bg-dark py-8 px-6 border-t border-border">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6 text-[14px] text-muted font-mono">
        <div>&copy; {new Date().getFullYear()} Jatin Agrahari.</div>

        <div className="flex items-center gap-6">
          <a
            href="https://linkedin.com/in/jatinagrahari"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-text transition-colors text-[18px]"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://github.com/Jatinagrahari"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-text transition-colors text-[18px]"
          >
            <FaGithub />
          </a>

          <a
            href="https://x.com/Jatin_Agrahari"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-text transition-colors text-[18px]"
          >
            <FaXTwitter />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
