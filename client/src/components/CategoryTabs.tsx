import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductCategory } from "@shared/schema";

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  const categories = [
    { id: "all", name: "All" },
    { id: ProductCategory.SWEETS, name: "Sweets" },
    { id: ProductCategory.NAMKEENS, name: "Namkeens" },
    { id: ProductCategory.PICKLES, name: "Pickles" },
    { id: ProductCategory.SPECIALS, name: "Specials" }
  ];

  return (
    <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={activeCategory === category.id ? "default" : "outline"}
          className={
            activeCategory === category.id
              ? "bg-primary text-primary-foreground"
              : "bg-card text-foreground border border-primary/30 hover:border-primary/50"
          }
          onClick={() => onCategoryChange(category.id)}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}
