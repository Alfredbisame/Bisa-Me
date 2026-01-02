import { useState } from "react";

interface Tag {
  id: string;
  name: string;
  isSelected?: boolean;
}

const TAGS: Tag[] = [
  { id: "game", name: "Game" },
  { id: "iphone", name: "iPhone" },
  { id: "tv", name: "TV" },
  { id: "asus-laptops", name: "Asus Laptops" },
  { id: "macbook", name: "Macbook" },
  { id: "ssd", name: "SSD" },
  { id: "graphics-card", name: "Graphics Card", isSelected: true },
  { id: "power-bank", name: "Power Bank" },
  { id: "smart-tv", name: "Smart TV" },
  { id: "speaker", name: "Speaker" },
  { id: "tablet", name: "Tablet" },
  { id: "microwave", name: "Microwave" },
  { id: "samsung", name: "Samsung" },
];

const PopularTags: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<Set<string>>(
    new Set(TAGS.filter((tag) => tag.isSelected).map((tag) => tag.id))
  );

  const handleTagClick = (tagId: string) => {
    const newSelectedTags = new Set(selectedTags);
    if (newSelectedTags.has(tagId)) {
      newSelectedTags.delete(tagId);
    } else {
      newSelectedTags.add(tagId);
    }
    setSelectedTags(newSelectedTags);
  };

  return (
    <div className="p-2">
      <h2 className="md:text-xl font-bold mb-6 text-gray-800">POPULAR TAGS</h2>
      <div className="flex flex-wrap gap-3 text-sm">
        {TAGS.map((tag) => (
          <button
            key={tag.id}
            onClick={() => handleTagClick(tag.id)}
            className={`
              px-3 py-2 rounded-md border transition-all duration-200
              ${
                selectedTags.has(tag.id)
                  ? "border-orange-500 text-orange-500 bg-orange-50 hover:bg-orange-100"
                  : "border-gray-300 text-gray-600 hover:border-orange-500 hover:text-orange-500"
              }
            `}
          >
            {tag.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PopularTags;
