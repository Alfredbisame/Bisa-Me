interface DashboardLogoutItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}


const DashboardLogoutItem: React.FC<DashboardLogoutItemProps> = ({ icon, label, onClick }) => (
  <li className="list-none">
    <button
      type="button"
      onClick={onClick}
      className="flex items-center w-full py-3 px-4 cursor-pointer hover:bg-blue-700 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
      aria-label={label}
    >
      <span className="mr-2">{icon}</span>
      <span className="hidden md:block">{label}</span>
    </button>
  </li>
);

export default DashboardLogoutItem;