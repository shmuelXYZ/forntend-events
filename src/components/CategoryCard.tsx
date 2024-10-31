import React from "react";
import { useNavigate } from "react-router-dom";

// move to types
interface CategoryCardProps {
  name: string;
  background: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, background }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/events/${name}`);
  };

  return (
    <li
      onClick={() => handleClick()}
      value={name}
      className="bg-teal-400 bg-cover bg-center rounded-2xl flex justify-center items-center mx-2 my-2 h-48 w-48 cursor-pointer hover:scale-105"
    >
      <button
        value={name}
        type="button"
        className="bg-slate-500 rounded border-solid "
      >
        {name}
      </button>
    </li>
  );
};
export default CategoryCard;
