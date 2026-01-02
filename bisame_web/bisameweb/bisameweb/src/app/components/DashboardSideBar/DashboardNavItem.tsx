"use client"
import Link from 'next/link';

interface DashboardNavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active: boolean;
  onClick: () => void;
}


const DashboardNavItem: React.FC<DashboardNavItemProps> = ({ icon, label, href, active, onClick }) => (
  <li
    className={`flex items-center py-3 md:px-4 cursor-pointer ${
      active
        ? 'bg-orange-500 border-l-4 border-blue-600 text-white hover:bg-orange-600'
        : 'hover:bg-blue-800'
    }`}
    aria-current={active ? 'page' : undefined}
  >
    <Link href={href} onClick={onClick} className="flex items-center justify-center md:justify-start w-full">
      <span className="md:mr-2">{icon}</span>
      <span className='hidden md:block'>{label}</span>
    </Link>
  </li>
);

export default DashboardNavItem;