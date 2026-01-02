import { FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';

interface SideBannerProps {
  title: string;
  isDark?: boolean;
  type: 'tv' | 'shop';
}

const SideBanner = ({ title, isDark = false, type }: SideBannerProps) => {
  const buttonText = type === 'tv' ? 'WATCH NOW' : 'SHOP NOW';
  const buttonLink = type === 'tv' ? '/bisame_tv' : '/trade-assurance';

  return (
    <div className={`
      ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'} 
      p-4 md:p-6 lg:p-8 rounded-md h-full
      flex flex-col justify-center
    `}>
      <h2 className="md:text-lg lg:text-2xl font-bold mb-4">{title}</h2>
      <Link href={buttonLink}>
        <button className="bg-orange-500 text-white px-3 md:px-4 lg:px-5 py-2 rounded-md transition-all duration-300 hover:bg-orange-600 flex items-center text-xs md:text-base">
          {buttonText}
          <FaArrowRight className="ml-2" />
        </button>
      </Link>
    </div>
  );
};

export default SideBanner;