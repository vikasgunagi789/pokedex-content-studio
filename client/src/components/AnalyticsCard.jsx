
import {
  LayoutDashboard,
  Grid2X2,
  CalendarDays,
  ChartNoAxesCombined,
  Video
} from "lucide-react";

const navigationItems = [
  {
    id: "dashboard",
    label: "Home",
    icon: LayoutDashboard
  },
  {
    id: "pokedex",
    label: "Pokédex",
    icon: Grid2X2
  },
  {
    id: "schedule",
    label: "Schedule",
    icon: CalendarDays
  },
  {
    id: "progress",
    label: "Progress",
    icon: ChartNoAxesCombined
  },
  {
    id: "videos",
    label: "Videos",
    icon: Video
  }
];

function BottomNavigation({
  activePage,
  setActivePage
}) {
  return (
    <nav
      className="bottom-navigation"
      aria-label="Main navigation"
    >
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = activePage === item.id;

        return (
          <button
            key={item.id}
            type="button"
            className={`bottom-nav-item ${
              isActive ? "active" : ""
            }`}
            onClick={() => setActivePage(item.id)}
            aria-current={isActive ? "page" : undefined}
            aria-label={item.label}
          >
            <span className="bottom-nav-icon">
              <Icon size={21} strokeWidth={isActive ? 2.4 : 1.8} />
            </span>

            <span className="bottom-nav-label">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

export default BottomNavigation;
