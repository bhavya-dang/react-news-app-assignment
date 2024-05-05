import { useState, useEffect } from "react";
import { FaEnvelope, FaTimes } from "react-icons/fa";

const NewsletterModal: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowModal(true);
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 font-inter flex justify-center items-center z-50">
          <div className="bg-white p-20 rounded-lg max-w-md relative">
            <button
              className="absolute top-3 right-3 text-black hover:text-opacity-80 transition-all duration-150 ease-in-out"
              onClick={handleCloseModal}
            >
              <FaTimes size={20} />
            </button>
            <h1 className="text-2xl text-center font-bold mb-6">
              Join Our Newsletter
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col">
              <input
                type="email"
                placeholder="Enter your email"
                className="border border-gray-300 rounded px-4 py-2 mb-4"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded flex items-center justify-center"
              >
                <FaEnvelope className="mr-2" />
                Subscribe
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsletterModal;
