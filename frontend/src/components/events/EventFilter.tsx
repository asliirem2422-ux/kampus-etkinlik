import type { Category } from "../../types/campus-event";

interface EventFilterProps {
  searchText: string;
  selectedCategory: Category | "";
  categories: Category[];
  onSearchChange: (text: string) => void;
  onCategoryChange: (category: Category | "") => void;
}

function EventFilter({
  searchText,
  selectedCategory,
  categories,
  onSearchChange,
  onCategoryChange
}: EventFilterProps) {
  return (
    <form className="filtre-kutusu" onSubmit={(e) => e.preventDefault()}>
      <div>
        <label htmlFor="search-input">Etkinlik ara</label>
        <input
          id="search-input"
          type="search"
          placeholder="Örn: atölye, kariyer..."
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="category-select">Kategori</label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) =>
            onCategoryChange(e.target.value as Category | "")
          }
        >
          <option value="">Tümü</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}

export default EventFilter;