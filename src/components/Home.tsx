import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface CategoryItemProps {
  emoji: string;
  name: string;
  index: number;
  onSelect: (category: string) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  emoji,
  name,
  index,
  onSelect,
}) => {
  const isEven = index % 2 === 0;

  const containerVariants = {
    hidden: {
      opacity: 0,
      x: isEven ? -100 : 100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        type: "spring",
        stiffness: 50,
        damping: 15,
      },
    },
  };

  const emojiVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.5,
      },
    },
    tap: {
      scale: 0.98,
    },
    float: {
      y: [-10, 10],
      transition: {
        y: {
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        },
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen w-full flex items-center justify-center snap-start"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.button
        onClick={() => onSelect(name)}
        className="flex flex-col items-center justify-center p-8"
        whileHover="hover"
        whileTap="tap"
      >
        <motion.div
          variants={emojiVariants}
          animate="float"
          className="flex flex-col items-center"
        >
          <span className="text-8xl sm:text-9xl md:text-[10rem] lg:text-[12rem] xl:text-[14rem] select-none">
            {emoji}
          </span>
          <span className="mt-8 text-lg sm:text-xl md:text-2xl text-blue-500">
            {name}
          </span>
        </motion.div>
      </motion.button>
    </motion.div>
  );
};

const CategoryList = () => {
  const navigate = useNavigate();
  const handleCategorySelect = (category: string) => {
    console.log(`Selected category: ${category}`);
    navigate(`/events?category=${category}`);
  };

  const categories = [
    { name: "Sports", emoji: "🏀" },
    { name: "Music", emoji: "🎸" },
    { name: "Comedy", emoji: "😂" },
    { name: "Art", emoji: "🎨" },
    { name: "Concert", emoji: "🎵" },
  ];

  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory bg-slate-200">
      {categories.map((category, index) => (
        <CategoryItem
          key={index}
          emoji={category.emoji}
          name={category.name}
          index={index}
          onSelect={handleCategorySelect}
        />
      ))}
    </div>
  );
};

export default CategoryList;
