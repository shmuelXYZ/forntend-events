import React from "react";
import CategoryCard from "../components/CategoryCard";

export default function CategoryList() {
  const categories = ["music", "sport", "concert", "comedy", "art"];
  return (
    <ul className="list-none grid grid-cols-1 gap-12 mx-auto items-center">
      {categories.map((category, index) => (
        <CategoryCard key={index} background={category} name={category} />
      ))}
    </ul>
  );
}
