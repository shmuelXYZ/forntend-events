import React from "react";
import CategoryCard from "./CategoryCard";

export default function CategoryList() {
  const categories = ["sport", "music", "movies", "comedy", "art"];
  return (
    <ul className="list-none grid grid-cols-3 gap-12 mx-auto items-center">
      {categories.map((category) => (
        <CategoryCard background={category} name={category} />
      ))}
    </ul>
  );
}
