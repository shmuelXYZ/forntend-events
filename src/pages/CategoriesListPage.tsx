import React from "react";
import CategoryCard from "../components/CategoryCard";

export default function CategoryList() {
  const categories = ["Music", "Sports", "Concert", "Comedy", "Art"];
  return (
    <ul className="list-none grid grid-cols-1 gap-12 mx-auto items-center">
      {categories.map((category, index) => (
        <CategoryCard key={index} name={category} />
      ))}
    </ul>
  );
}
