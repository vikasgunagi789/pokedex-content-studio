import {
  LayoutDashboard,
  BookOpen,
  CalendarDays,
  ChartNoAxesCombined,
  Video,
} from "lucide-react";

const navigationItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "pokedex",
    label: "Pokédex",
    icon: BookOpen,
  },
  {
    id: "videos",
    label: "Videos",
    icon: Video,
  },
  {
    id: "schedule",
    label: "Schedule",
    icon: CalendarDays,
  },
  {
    id: "progress",
    label: "Progress",
    icon: ChartNoAxesCombined,
  },
];

function BottomNavigation({ activePage, setActivePage }) {
  return (
    <nav
      className="bottom-navigation"
      aria-label="Main navigation"
    >
      <div className="bottom-navigation-inner">
        <div className="bottom-nav-items">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = activePage === item.id;

            return (
              <button
                key={item.id}
                type="button"
                className={`bottom-nav-item ${
                  active ? "active" : ""
                }`}
                onClick={() => setActivePage(item.id)}
                aria-current={active ? "page" : undefined}
              >
                <span className="bottom-nav-icon-box">
                  <Icon
                    size={21}
                    strokeWidth={active ? 2.5 : 2}
                  />
                </span>

                <span className="bottom-nav-label">
                  {item.label}
                </span>

                {active && (
                  <span className="bottom-nav-active-line" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default BottomNavigation;
