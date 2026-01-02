import DashboardNavItem from './DashboardNavItem';
import DashboardLogoutItem from './DashboardLogoutItem';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  isLogout?: boolean;
}

interface DashboardNavListProps {
  navItems: NavItem[];
  activeTab: string;
  onTabClick: (href: string, isLogout?: boolean) => void;
}

const DashboardNavList: React.FC<DashboardNavListProps> = ({ navItems, activeTab, onTabClick }) => (
  <ul className="text-white">
    {navItems.map((item, index: number) =>
      item.isLogout ? (
        <DashboardLogoutItem
          key={index}
          icon={item.icon}
          label={item.label}
          onClick={() => onTabClick(item.href, item.isLogout)}
        />
      ) : (
        <DashboardNavItem
          key={index}
          icon={item.icon}
          label={item.label}
          href={item.href}
          active={activeTab === item.href}
          onClick={() => onTabClick(item.href)}
        />
      )
    )}
  </ul>
);

export default DashboardNavList;