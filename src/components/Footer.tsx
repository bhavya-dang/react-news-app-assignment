import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="mt-5 dark:bg-black bg-white text-neutral-500 py-4 px-8 flex justify-between items-center">
      <p>&copy; 2024 Daily Digest All Rights Reserved</p>
      <div className="font-inter flex space-x-4">
        <a href="#" className="text-white">
          <FaFacebook className="text-neutral-500 rounded-full" size={20} />
        </a>
        <a href="#" className="text-white">
          <FaTwitter className="text-neutral-500 rounded-full" size={20} />
        </a>
        <a href="#" className="text-white">
          <FaInstagram className="text-neutral-500 rounded-full" size={20} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
