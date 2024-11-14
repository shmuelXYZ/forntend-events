import React from "react";
import { useNavigate } from "react-router-dom";

// move to types
interface CategoryCardProps {
  name: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/events?category=${name}`);
  };

  return (
    <li
      onClick={() => handleClick()}
      value={name}
      className={`bg-cover bg-center h-96 w-auto rounded-2xl mx-4 flex justify-around mb-4`}
      style={{
        backgroundImage: `url(/src/assets/${name}.webp)`,
      }}
    >
      <button
        value={name}
        type="button"
        className="bg-gradient-to-r from-red-600 via-green-500 to-purple-600 text-transparent bg-clip-text opacity-80 text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold "
      >
        {name}
      </button>
    </li>
  );
};
export default CategoryCard;
