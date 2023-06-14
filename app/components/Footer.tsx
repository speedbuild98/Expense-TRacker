import Link from "next/link";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";


const Footer: React.FC = () => {
  return (
    <footer className="flex fixed w-full bottom-0 items-center justify-center h-12 bg-accent text-white">
      <div className="flex space-x-4">
        <Link href="https://www.linkedin.com/in/lautagallardogg/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="text-3xl" />
        </Link>
        <Link href="https://github.com/speedbuild98" target="_blank" rel="noopener noreferrer">
          <FaGithub className="text-3xl" />
        </Link>
        <Link href="https://gallardolautaro.tech/" target="_blank" rel="noopener noreferrer">
          <HiOutlineExternalLink className="text-3xl" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
