import moment from "moment";

interface NewsCardProps {
  title: string;
  content: string;
  image: string;
  author: string | null;
  publishedAt: string;
  sourceUrl: string;
}

const NewsCard = ({
  title,
  image,
  author,
  publishedAt,
  sourceUrl,
}: NewsCardProps) => {
  const handleClick = () => {
    window.open(sourceUrl, "_blank");
  };

  const formattedDate = moment(publishedAt).format("MMMM Do, YYYY");

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-60 object-cover object-top"
        />
        <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2 w-full">
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className="flex items-center text-xs mt-1">
            {author && (
              <>
                <span className="">{author}</span>
                <span className="mx-2">&bull;</span>
              </>
            )}
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
