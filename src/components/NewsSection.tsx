import { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import toast, { Toaster } from "react-hot-toast";

const NewsSection: React.FC = () => {
  const [TopHeadlines, setTopHeadlines] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTopHeadlines = async () => {
      try {
        setLoading(true);

        const url = `https://newsapi.org/v2/top-headlines?country=in&pageSize=100&category=${selectedCategory}&apiKey=${
          import.meta.env.VITE_APP_NEWS_API_KEY
        }`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "error") {
          console.error("Error fetching data:", data.message);
          toast.error("API Error", {
            position: "top-center",
            duration: 3000,
            className: "text-black bg-white",
          });
        } else {
          setTopHeadlines(data.articles);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    getTopHeadlines();
  }, [selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  // interface NewsItem {
  //   title: string;
  //   urlToImage: string;
  //   sourceUrl: string;
  //   publishedAt: string;
  //   author: string;
  // }

  // Separate the first news item and the rest of the news items
  const [firstNews, ...restNews] = TopHeadlines;

  const categories = [
    "General",
    "Business",
    "Entertainment",
    "Health",
    "Science",
    "Sports",
    "Technology",
  ];

  return (
    <>
      <Toaster />
      <h1 className="title mt-9 ml-16 text-4xl font-bold dark:text-white">
        Top Headlines
      </h1>
      <div className="flex justify-left space-x-4 mt-9 font-inter font-semibold ml-16">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`hover:text-opacity-95 transition-opacity ease-out duration-150 ${
              selectedCategory === category
                ? "bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-full"
                : "text-black dark:text-white"
            }`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-6 px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-8">
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="animate-pulse rounded-lg shadow-md">
              <div className="h-40 w-full bg-gray-300"></div>
              <div className="p-4">
                <div className="h-6 w-3/4 bg-gray-300 mb-2"></div>
                <div className="h-4 w-1/2 bg-gray-300"></div>
              </div>
            </div>
          ))
        ) : (
          <>
            <div className="md:col-span-2 lg:col-span-2">
              <NewsCard
                title={firstNews?.title}
                image={
                  firstNews?.urlToImage ??
                  "https://www.ostwal.in/wp-content/uploads/2021/03/news-featured-img.png"
                }
                author={firstNews?.author}
                publishedAt={firstNews?.publishedAt}
                sourceUrl={firstNews?.url}
              />
            </div>

            {/* {restNews.slice(0, 3).map((newsItem, index) => (
              <div key={index} className="lg:col-span-1">
                <NewsCard
                  title={newsItem.title}
                  image={
                    newsItem.urlToImage ??
                    "https://www.ostwal.in/wp-content/uploads/2021/03/news-featured-img.png"
                  }
                  author={newsItem.author}
                  publishedAt={newsItem.publishedAt}
                  sourceUrl={newsItem.url}
                />
              </div>
            ))} */}

            {restNews.slice(0, restNews.length).map((newsItem, index) => (
              <NewsCard
                key={index}
                title={newsItem.title}
                image={
                  newsItem.urlToImage ??
                  "https://www.ostwal.in/wp-content/uploads/2021/03/news-featured-img.png"
                }
                author={newsItem.author}
                publishedAt={newsItem.publishedAt}
                sourceUrl={newsItem.url}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default NewsSection;
