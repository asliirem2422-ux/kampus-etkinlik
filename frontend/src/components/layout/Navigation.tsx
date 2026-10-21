import type { PageName } from "../../types/page";

interface NavigationProps {
  current: PageName;
  onNavigate: (page: PageName) => void;
}

interface NavItem {
  name: PageName;
  label: string;
}

const navItems: NavItem[] = [
  { name: "home", label: "Ana Sayfa" },
  { name: "events", label: "Etkinlikler" },
  { name: "add", label: "Ekle" }
];

function Navigation({ current, onNavigate }: NavigationProps) {
  return (
    <nav className="menu">
      {navItems.map((item) => (
        <a
          key={item.name}
          href={`#${item.name}`}
          className={current === item.name ? "active" : ""}
          onClick={(e) => {
            e.preventDefault();
            onNavigate(item.name);
          }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

export default Navigation;