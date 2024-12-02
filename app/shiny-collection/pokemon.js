"use client";

import { useState } from "react";

export default function Pokemon({ name, id, shinySprite, onSelect, }) {
  const [currentSrc, setCurrentSrc] = useState(shinySprite);
  const [fallbackIndex, setFallbackIndex] = useState(0);

  const fallbackSprites = [
    `https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_${id}_11_shiny.png`,
    //`https://images.gameinfo.io/pokemon/256/p${id}f603s1.png`,
    //`https://images.gameinfo.io/pokemon/256/p${id}f608s1.png`,
    //`https://images.gameinfo.io/pokemon/256/p${id}f613s1.png`,
    //`https://images.gameinfo.io/pokemon/256/p${id}f535s1.png`,
    //`https://images.gameinfo.io/pokemon/256/p${id}f613s1.png`,
    //`https://images.gameinfo.io/pokemon/256/p${id}f82s1.webp`,
    //`https://db.pokemongohub.net/images/ingame/normal/pm${id}.fEAST_SEA.s.icon.png`,
    //`https://db.pokemongohub.net/images/ingame/normal/pm${id}.fALTERED.s.icon.png`,
  ];

  const handleError = () => {
      console.log(`Current Fallback Index: ${fallbackIndex}`);
    if (fallbackIndex < fallbackSprites.length) {
      setCurrentSrc(fallbackSprites[fallbackIndex]);
      setFallbackIndex(fallbackIndex + 1);
    } else {
      setCurrentSrc(null);
    }
  };

  return (
    <div className="pokemon-card bg-slate-700 shadow-md rounded-lg p-4 flex flex-col items-center">
      <h2 className="text-xl font-bold capitalize">{name}</h2>
      <p className="text-sm text-gray-500">#{String(id).padStart(4, "0")}</p>
      <img
        src={currentSrc}
        alt={`${name} shiny`}
        className="w-24 h-24 mt-2"
        onError={handleError}
        loading = "lazy"
      />
    </div>
  );
}
