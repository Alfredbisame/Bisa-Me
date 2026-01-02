import { ArrowLeft } from "lucide-react";

interface PostAdHeaderProps {
  onClear?: () => Promise<void> | void;
  onBack?: () => void;
  group?: string;
  styles?: string;
}

const PostAdHeader = ({
  onClear,
  onBack,
  group,
  styles,
}: PostAdHeaderProps) => {
  const titleWord =
    group === "jobseek"
      ? "Skills"
      : group
      ? group[0].toUpperCase() + group.slice(1)
      : "Ad";

  return (
    <header
      className={`bg-orange-500 backdrop-blur-sm p-2 md:p-4 flex justify-between items-center border-b border-gray-100 mx-4 mt-4 shadow-sm ${
        styles ?? ""
      }`}
    >
      {onBack ? (
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-800 transition-colors p-2 -ml-2 rounded-lg hover:bg-orange-500"
        >
          <ArrowLeft className="w-4 h-3 md:w-5 md:h-5" color="white" />
        </button>
      ) : (
        <div className="w-9" />
      )}

      <h1 className="text-white text-s md:text-lg font-semibold">
        Showcase Your {titleWord}
      </h1>

      <button
        onClick={onClear}
        className="text-white hover:text-orange-600 text-xs md:text-sm font-medium px-3 py-2 rounded-lg hover:bg-orange-50 transition-all duration-200"
      >
        Clear
      </button>
    </header>
  );
};

export default PostAdHeader;
