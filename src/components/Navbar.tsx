import React, { useState, useEffect, useRef } from "react";
import { FiSun, FiMoon, FiSearch, FiX } from "react-icons/fi";
import useTheme from "../contexts/theme";
import toast, { Toaster } from "react-hot-toast";

const Navbar: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();
  const [loading, setLoading] = useState(true);
  // const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;

  const totalPages = Math.ceil(searchResults.length / resultsPerPage); // Calculate total number of pages

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber); // Set the current page to the clicked page number
  };

  // Generate an array of page numbers based on the total number of pages
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  // const handleNextPage = () => {
  //   if (currentPage < totalPages) {
  //     setCurrentPage(currentPage + 1); // Move to the next page
  //   }
  // };

  // const handlePreviousPage = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1); // Move to the previous page
  //   }
  // };
  // const [displayedResultsStart, setDisplayedResultsStart] = useState(0); // State to track the number of displayed results
  // const [displayedResultsEnd, setDisplayedResultsEnd] = useState(10); // State to track the number of displayed results

  const dropdownRef = useRef<HTMLDivElement>(null); // Reference to the dropdown element

  interface Article {
    title: string;
    url: string;
    urlToImage: string;
  }

  useEffect(() => {
    const getSearchResults = async () => {
      try {
        setLoading(true); // Start loading
        const url = `https://newsapi.org/v2/everything?language=en&q=${encodeURIComponent(
          searchQuery
        )}&apiKey=${import.meta.env.VITE_APP_NEWS_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        setSearchResults(data.articles);
        setLoading(false); // Stop loading
      } catch (error) {
        console.error("Error fetching search results:", error);
        setLoading(false); // Stop loading
      }
    };

    if (searchQuery) {
      getSearchResults();
    }
  }, [searchQuery]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // if (searchResults.length === 0) {
    //   toast.error("No results found.", {
    //     position: "top-center",
    //     duration: 3000,
    //     className: "text-black bg-white",
    //   });
    // }
  };

  const handleSearchSubmit = () => {
    if (searchQuery) {
      setShowDropdown(true);
      // console.log(searchResults);
    } else {
      toast.error("Please enter a search query.", {
        position: "top-center",
        duration: 3000,
        className: "text-black bg-white",
      });
    }

    if (searchResults.length === 0) {
      toast.error("No results found.", {
        position: "top-center",
        duration: 3000,
        className: "text-black bg-white",
      });
    } else {
      return;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close the dropdown if clicked outside of it
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    // Attach the event listener when the dropdown is visible
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      // Remove the event listener when the dropdown is hidden
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <>
      <Toaster />
      <nav className={`bg-black p-4 font-inter`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center my-2">
          <div className="flex items-center">
            <a href="/">
              <h1 className="text-white text-xl font-bold">
                <i className="fa-solid fa-newspaper"></i>
                <span className="ml-3">Daily Digest</span>
              </h1>
            </a>
          </div>

          {/* dropdown for search results */}
          <div className="flex space-x-4 relative" ref={dropdownRef}>
            {showDropdown && (
              <div className="absolute z-10 mt-14 ml-[1.5rem] py-3 w-full bg-white shadow-lg rounded-lg">
                {loading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <div
                      key={index}
                      className="animate-pulse rounded-lg shadow-md"
                    >
                      <div className="h-20 w-full bg-gray-300"></div>
                      <div className="p-4">
                        <div className="h-6 w-3/4 bg-gray-300 mb-2"></div>
                        <div className="h-4 w-1/2 bg-gray-300"></div>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    {searchResults.length > 0 &&
                      searchResults
                        .slice(
                          (currentPage - 1) * resultsPerPage,
                          currentPage * resultsPerPage
                        )
                        .map((result: Article, index: number) => (
                          <a
                            key={index}
                            href={result.url}
                            className="block px-4 py-2 text-sm dark:hover:bg-black dark:hover:text-white overflow-hidden whitespace-nowrap overflow-ellipsis"
                            target="_blank"
                            style={{ maxWidth: "calc(100% -.51rem)" }}
                          >
                            {result.title}
                          </a>
                        ))}
                    {/* pagination */}
                    <div className="flex justify-center mt-2">
                      {pageNumbers.map((pageNumber) => (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`mr-2 px-2 py-1 text-xs font-semibold border-black rounded-full ${
                            pageNumber === currentPage
                              ? "bg-black text-white"
                              : "text-black"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Search input field */}
            <div className="flex justify-end space-x-4">
              <input
                type="text"
                placeholder="Search articles..."
                className="relative p-2 rounded-full border border-gray-300 dark:border-gray-600 dark:bg-white dark:placeholder-neutral-400 focus:outline-none focus:placeholder-transparent transition-all duration-200 ease-in-out"
                value={searchQuery}
                onChange={handleSearchInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearchSubmit();
                  } else {
                    return;
                  }
                }}
              />

              {/* clear button */}

              {searchQuery.length > 0 && (
                <button
                  className="absolute z-50 left-[11.5rem] top-0 mt-2 text-neutral-800 focus:outline-none outline-none transition-all duration-200 ease-in-out"
                  onClick={() => {
                    setSearchQuery("");
                    setShowDropdown(false);
                  }}
                >
                  <FiX size={24} className="text-black"></FiX>
                </button>
              )}

              {/* search button */}

              <button
                className="rounded-full text-white"
                onClick={handleSearchSubmit}
              >
                <FiSearch size={24} className=""></FiSearch>
              </button>
            </div>

            {/* theme toggle */}

            <button
              onClick={toggleDarkMode}
              className="text-white hover:text-gray-300 focus:outline-none outline-none transition-all duration-200 ease-in-out"
            >
              {darkMode ? (
                <FiSun size={24} className="hover:animate-spin-slow" />
              ) : (
                <FiMoon size={24} className="hover:animate-wiggle" />
              )}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
