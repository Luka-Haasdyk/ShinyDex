"use client";

import { useState } from "react";

export default function Pokemon({ name, id, shinySprite, onSelect }) {
  const [currentSprite, setCurrentSprite] = useState(shinySprite);
  const [fallbackIndex, setFallbackIndex] = useState(0);

  const fallbackSprites = [
    `https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_${id}_11_shiny.png`,
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${id}.png`,
  ];

  const handleError = () => {
    console.log(`Current Fallback Index: ${fallbackIndex}`);

    if (fallbackIndex < fallbackSprites.length) {
      setCurrentSprite(fallbackSprites[fallbackIndex]);
      setFallbackIndex((prevIndex) => prevIndex + 1);
    } else {
      setCurrentSprite(null);
    }
  };

  return (
    <div
      className="pokemon-card bg-slate-700 dark:bg-slate-700 shadow-md rounded-lg p-4 flex flex-col items-center"
      onSelect={onSelect}
    >
      <h2 className="text-xl font-bold capitalize text-white dark:text-white">
        {name}
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-500">
        #{String(id).padStart(4, "0")}
      </p>
      <img
        src={currentSprite}
        alt={`${name} shiny`}
        className="w-24 h-24 mt-2"
        onError={handleError}
        loading="lazy"
      />
    </div>
  );
}
