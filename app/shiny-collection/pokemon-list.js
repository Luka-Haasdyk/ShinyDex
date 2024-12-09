import React, { useEffect, useState } from "react";
import axios from "axios";
import Pokemon from "./pokemon";
import { useUserAuth } from "../_utils/auth-context";
import {
  getPokemon,
  addPokemon,
  removePokemon,
  getAchievements,
  addAchievement,
  removeAchievement,
} from "../_services/shiny-collection-service";

export default function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useUserAuth();
  const [pokemonFilter, setPokemonFilter] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [shinyCounter, setShinyCounter] = useState(0);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [viewSelected, setViewSelected] = useState(false);
  const [achievementsUnlocked, setAchievementsUnlocked] = useState([]);
  const [showAchievements, setShowAchievements] = useState(false);
  const [achievementPopup, setAchievementPopup] = useState(null);

  const pokemonGoShinyIds = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
    60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78,
    79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97,
    98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112,
    113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127,
    128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142,
    143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157,
    158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172,
    173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187,
    188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202,
    203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217,
    218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232,
    233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247,
    248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262,
    263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277,
    278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292,
    293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307,
    308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322,
    323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337,
    338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352,
    353, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366, 367,
    368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382,
    383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397,
    398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412,
    413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427,
    428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442,
    443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457,
    458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472,
    473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487,
    488, 491, 492, 495, 496, 497, 498, 499, 500, 501, 502, 503, 504, 505, 506,
    507, 508, 509, 510, 511, 512, 513, 514, 515, 516, 517, 518, 519, 520, 521,
    522, 523, 524, 525, 526, 527, 528, 529, 530, 531, 532, 533, 534, 535, 536,
    537, 538, 539, 540, 541, 542, 543, 544, 545, 546, 547, 548, 549, 551, 552,
    553, 554, 555, 557, 558, 559, 560, 562, 563, 564, 565, 566, 567, 568, 569,
    570, 571, 572, 573, 574, 575, 576, 577, 578, 579, 580, 581, 582, 583, 584,
    587, 588, 589, 590, 591, 592, 593, 594, 595, 596, 597, 598, 599, 600, 601,
    602, 603, 604, 605, 606, 607, 608, 609, 610, 611, 612, 613, 614, 615, 616,
    617, 618, 619, 620, 621, 622, 623, 624, 625, 627, 628, 629, 630, 631, 632,
    633, 634, 635, 636, 637, 638, 639, 640, 641, 642, 643, 644, 645, 646, 649,
    650, 651, 652, 653, 654, 655, 656, 657, 658, 659, 660, 661, 662, 663, 667,
    668, 669, 670, 671, 672, 673, 674, 675, 676, 677, 678, 682, 683, 684, 685,
    686, 687, 688, 689, 690, 691, 692, 693, 694, 695, 696, 697, 698, 699, 700,
    702, 704, 705, 706, 708, 709, 710, 711, 712, 713, 714, 715, 716, 717, 722,
    723, 724, 725, 726, 727, 728, 729, 730, 734, 735, 736, 737, 738, 739, 740,
    741, 742, 743, 744, 745, 747, 748, 751, 752, 753, 754, 755, 756, 759, 760,
    761, 762, 763, 765, 766, 767, 768, 775, 776, 777, 780, 782, 783, 784, 785,
    786, 787, 788, 793, 794, 795, 796, 797, 798, 799, 800, 808, 809, 819, 820,
    831, 832, 848, 849, 862, 863, 865, 866, 867, 870, 888, 889, 899, 900, 901,
    903, 904, 915, 916, 928, 929, 930, 962, 979, 980,
  ];

  const pokemonGenerations = {
    Kanto: { start: 1, end: 151 },
    Johto: { start: 152, end: 251 },
    Hoenn: { start: 252, end: 385 },
    Sinnoh: { start: 387, end: 492 },
    Unova: { start: 494, end: 649 },
    Kalos: { start: 650, end: 720 },
    Alola: { start: 722, end: 806 },
    Galar: { start: 810, end: 895 },
    Hisui: { start: 899, end: 905 },
    Paldea: { start: 906, end: 980 },
    Unknown: { start: 808, end: 809 },
  };

  const achievements = [
    {
      id: 1,
      name: "Beginner Shiny Collector",
      description: "Collect 10 Shiny Pokémon",
      criteria: (shinyCounter) => shinyCounter >= 10,
      progress: (shinyCounter) => (shinyCounter / 10) * 100,
    },
    {
      id: 2,
      name: "Bronze I Shiny Collector",
      description: "Collect 25 Shiny Pokémon",
      criteria: (shinyCounter) => shinyCounter >= 25,
      progress: (shinyCounter) => (shinyCounter / 25) * 100,
    },
    {
      id: 3,
      name: "Bronze II Shiny Collector",
      description: "Collect 50 Shiny Pokémon",
      criteria: (shinyCounter) => shinyCounter >= 50,
      progress: (shinyCounter) => (shinyCounter / 50) * 100,
    },
    {
      id: 4,
      name: "Bronze III Shiny Collector",
      description: "Collect 75 Shiny Pokémon",
      criteria: (shinyCounter) => shinyCounter >= 75,
      progress: (shinyCounter) => (shinyCounter / 75) * 100,
    },
    {
      id: 5,
      name: "I've a Feeling We're Not In Pallet Town Anymore...",
      description: "Collect 100 Shiny Pokémon",
      criteria: (shinyCounter) => shinyCounter >= 100,
      progress: (shinyCounter) => (shinyCounter / 100) * 100,
    },
    {
      id: 6,
      name: "Silver I Shiny Collector",
      description: "Collect 150 Shiny Pokémon",
      criteria: (shinyCounter) => shinyCounter >= 150,
      progress: (shinyCounter) => (shinyCounter / 150) * 100,
    },
    {
      id: 7,
      name: "Silver II Shiny Collector",
      description: "Collect 200 Shiny Pokémon",
      criteria: (shinyCounter) => shinyCounter >= 200,
      progress: (shinyCounter) => (shinyCounter / 200) * 100,
    },
    {
      id: 8,
      name: "Silver III Shiny Collector",
      description: "Collect 250 Shiny Pokémon",
      criteria: (shinyCounter) => shinyCounter >= 250,
      progress: (shinyCounter) => (shinyCounter / 250) * 100,
    },
    {
      id: 9,
      name: "Shiny Enthusiast",
      description: "Collect 300 Shiny Pokémon",
      criteria: (shinyCounter) => shinyCounter >= 300,
      progress: (shinyCounter) => (shinyCounter / 300) * 100,
    },
    {
      id: 10,
      name: "Gold I Shiny Collector",
      description: "Collect 350 Shiny Pokémon",
      criteria: (shinyCounter) => shinyCounter >= 350,
      progress: (shinyCounter) => (shinyCounter / 350) * 100,
    },
    {
      id: 11,
      name: "Gold II Shiny Collector",
      description: "Collect 400 Shiny Pokémon",
      criteria: (shinyCounter) => shinyCounter >= 400,
      progress: (shinyCounter) => (shinyCounter / 400) * 100,
    },
    {
      id: 12,
      name: "Gold III Shiny Collector",
      description: "Collect 450 Shiny Pokémon",
      criteria: (shinyCounter) => shinyCounter >= 450,
      progress: (shinyCounter) => (shinyCounter / 450) * 100,
    },
    {
      id: 13,
      name: "Shiny Master",
      description: "Collect 500 Shiny Pokémon",
      criteria: (shinyCounter) => shinyCounter >= 500,
      progress: (shinyCounter) => (shinyCounter / 500) * 100,
    },
    {
      id: 14,
      name: "Emerald I Shiny Collector",
      description: "Collect 575 Shiny Pokémon",
      criteria: (shinyCounter) => shinyCounter >= 575,
      progress: (shinyCounter) => (shinyCounter / 575) * 100,
    },
    {
      id: 15,
      name: "Emerald II Shiny Collector",
      description: "Collect 650 Shiny Pokémon",
      criteria: (shinyCounter) => shinyCounter >= 650,
      progress: (shinyCounter) => (shinyCounter / 650) * 100,
    },
    {
      id: 16,
      name: "Emerald III Shiny Collector",
      description: "Collect 725 Shiny Pokémon",
      criteria: (shinyCounter) => shinyCounter >= 725,
      progress: (shinyCounter) => (shinyCounter / 725) * 100,
    },
    {
      id: 17,
      name: "Gotta Catch 'Em All!",
      description: "Collect All Shiny Pokémon",
      criteria: (shinyCounter) => shinyCounter >= 782,
      progress: (shinyCounter) => (shinyCounter / 782) * 100,
    },
  ];

  Object.keys(pokemonGenerations).forEach((gen, index) => {
    const { start, end } = pokemonGenerations[gen];
    const genIds = Array.from({ length: end - start + 1 }, (_, i) => start + i);

    achievements.push({
      id: 18 + index,
      name: `${gen} Mastery`,
      description: `Collect All Shiny Pokémon From The ${gen} Region.`,
      criteria: () => genIds.every((id) => selectedPokemon.includes(id)),
      progress: () => {
        const collected = genIds.filter((id) =>
          selectedPokemon.includes(id)
        ).length;
        return (collected / genIds.length) * 100;
      },
    });
  });

  async function fetchPokemonData() {
    try {
      const requests = pokemonGoShinyIds.map((id) =>
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      );

      const responses = await Promise.all(requests);
      const fetchedPokemon = responses.map((response) => response.data);
      setPokemon(fetchedPokemon);
      setError(null);
    } catch (error) {
      console.error("Error fetching the Pokémon data:", error);
      setError("Error fetching the Pokémon data. Please try again later.");
    }
  }

  const handleFilter = (filter) => {
    setPokemonFilter(filter);
    setDropdownVisible(false);
  };

  const filteredPokemon = pokemonFilter
    ? pokemon.filter((p) => {
        if (pokemonGenerations[pokemonFilter]) {
          const { start, end } = pokemonGenerations[pokemonFilter];
          return p.id >= start && p.id <= end;
        }
      })
    : pokemon;

  const handleSelectPokemon = async (id) => {
    if (!user) return;

    if (selectedPokemon.includes(id)) {
      setSelectedPokemon((prevSelected) =>
        prevSelected.filter((pokeId) => pokeId !== id)
      );
      if (pokemonGoShinyIds.includes(id)) {
        setShinyCounter((prev) => prev - 1);
      }
      try {
        await removePokemon(user.uid, id);
      } catch (error) {
        console.error("Error removing Pokémon:", error);
      }
    } else {
      setSelectedPokemon((prevSelected) => [...prevSelected, id]);
      if (pokemonGoShinyIds.includes(id)) {
        setShinyCounter((prev) => prev + 1);
      }
      try {
        await addPokemon(user.uid, id);
      } catch (error) {
        console.error("Error adding Pokémon:", error);
      }
    }
  };

  const ProgressBar = ({ progress }) => {
    return (
      <div className="w-full rounded-full h-4 bg-gray-700 dark:bg-gray-700">
        <div
          className="bg-green-500 h-4 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    );
  };

  const AchievementPopup = ({ achievement }) => {
    return (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white p-10 rounded-lg shadow-lg z-50 text-center">
        <h3 className="font-bold text-4xl">Achievement Unlocked!</h3>
        <p>{achievement.name}</p>
      </div>
    );
  };

  const showAchievementPopup = (achievement) => {
    setAchievementPopup(achievement);
    setTimeout(() => {
      setAchievementPopup(null);
    }, 4000);
  };

  const renderPokemon = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5">
        {filteredPokemon.map((pokemon) => {
          let shinySprite = `https://db.pokemongohub.net/images/ingame/normal/pm${pokemon.id}.s.icon.png`;
          const isSelected = selectedPokemon.includes(pokemon.id);

          return (
            <div
              key={pokemon.id}
              onClick={() => handleSelectPokemon(pokemon.id)}
              className={`cursor-pointer ${
                isSelected ? "bg-orange-400" : "bg-slate-600"
              } rounded-lg p-4 hover:shadow-lg transition-shadow`}
            >
              <Pokemon
                key={pokemon.id}
                name={pokemon.name}
                id={pokemon.id}
                shinySprite={shinySprite}
              />
            </div>
          );
        })}
      </div>
    );
  };

  const renderSelectedPokemon = () => {
    const sortedSelectedPokemon = [...selectedPokemon].sort((a, b) => a - b);

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5">
        {sortedSelectedPokemon.map((id) => {
          const pokemon = filteredPokemon.find((p) => p.id === id);

          if (!pokemon) {
            return null;
          }

          let shinySprite = `https://db.pokemongohub.net/images/ingame/normal/pm${pokemon.id}.s.icon.png`;
          const isSelected = selectedPokemon.includes(pokemon.id);

          return (
            <div
              key={pokemon.id}
              onClick={() => handleSelectPokemon(pokemon.id)}
              className={`cursor-pointer ${
                isSelected ? "bg-orange-400" : "bg-slate-600"
              } rounded-lg p-4 hover:shadow-lg transition-shadow`}
            >
              <Pokemon
                name={pokemon.name}
                id={pokemon.id}
                shinySprite={shinySprite}
              />
            </div>
          );
        })}
      </div>
    );
  };

  const renderAchievements = () => {
    return (
      <div className="bg-forestGreenMedium dark:bg-forestGreenMedium p-4 rounded-lg shadow-md mt-5">
        <h2 className="text-2xl font-bold mb-4 text-orange-300 text-center">
          Achievements
        </h2>
        <ul>
          {achievements.map((achievement) => {
            const isUnlocked = achievementsUnlocked.includes(achievement.id);
            const progress = achievement.progress(
              shinyCounter,
              selectedPokemon
            );
            const progressPercentage = Math.min(progress, 100).toFixed(2); // Ensure the percentage does not exceed 100

            return (
              <li
                key={achievement.id}
                className={`mb-2 p-2 rounded ${
                  isUnlocked ? "bg-green-500 text-white dark:text-white" : "bg-gray-600 text-white dark:text-white"
                }`}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-xl">{achievement.name}</h3>
                  <span className="font-semibold">{progressPercentage}%</span>
                </div>
                <p>{achievement.description}</p>
                {!isUnlocked && <ProgressBar progress={progress} />}
                {isUnlocked && <p className="font-bold">Complete!</p>}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  useEffect(() => {
    fetchPokemonData();
  }, []);

  useEffect(() => {
    const fetchSelectedPokemon = async () => {
      if (user) {
        try {
          const selected = await getPokemon(user.uid);
          setSelectedPokemon(selected);
          const shinyCount = selected.length;
          setShinyCounter(shinyCount);
        } catch {
          console.error("Error fetching selected Pokémon");
        }
      } else {
        setSelectedPokemon([]);
        setShinyCounter(0);
      }
    };
    fetchSelectedPokemon();
  }, [user]);

  useEffect(() => {
    const fetchUnlockedAchievements = async () => {
      if (user) {
        try {
          const userAchievements = await getAchievements(user.uid);
          setAchievementsUnlocked(userAchievements);
        } catch {
          console.error("Error fetching user achievements");
        }
      }
    };
    fetchUnlockedAchievements();
  }, [user]);

  useEffect(() => {
    const checkAchievements = async () => {
      if (user) {
        const unlocked = achievements.filter((achievement) =>
          achievement.criteria(shinyCounter, selectedPokemon)
        );
        const newlyUnlocked = unlocked.filter(
          (achievement) => !achievementsUnlocked.includes(achievement.id)
        );
        const noLongerUnlocked = achievementsUnlocked.filter(
          (id) => !unlocked.some((achievement) => achievement.id === id)
        );

        if (newlyUnlocked.length > 0) {
          newlyUnlocked.forEach((achievement) => {
            showAchievementPopup(achievement);
            addAchievement(user.uid, achievement.id);
          });
        }

        if (noLongerUnlocked.length > 0) {
          for (const achievementId of noLongerUnlocked) {
            await removeAchievement(user.uid, achievementId);
          }
        }

        setAchievementsUnlocked((prev) => [
          ...prev.filter((id) => !noLongerUnlocked.includes(id)),
          ...newlyUnlocked.map((a) => a.id),
        ]);
      }
    };

    checkAchievements();
  }, [shinyCounter, selectedPokemon]);

  return (
    <div className="container mx-auto p-4 mt-20">
      {user ? (
        <>
          <div className="bg-forestGreenMedium text-orange-300 p-5 mb-5 flex flex-col md:flex-row items-start md:items-center justify-between rounded">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold text-left">
                {user.displayName}&apos;s ShinyDex
              </h1>
              <button
                className="text-orange-300 hover:underline mt-2 font-semibold"
                onClick={() => setShowAchievements(!showAchievements)}
              >
                {showAchievements ? "Hide Achievements" : "View Achievements"}
              </button>
            </div>
            <div className="flex flex-col items-center justify-center ml-12">
              <p className="font-semibold">
                Collected: {shinyCounter} / {pokemonGoShinyIds.length}
              </p>
              <button
                className="text-orange-300 hover:underline mt-2 font-semibold"
                onClick={() => {
                  setViewSelected(!viewSelected);
                  setDropdownVisible(false);
                  setPokemonFilter("");
                }}
              >
                {viewSelected ? "View All Pokémon" : "View Selected Pokémon"}
              </button>
            </div>
            <div className="relative mt-4 md:mt-0 flex items-center gap-2">
              <button
                className={`px-4 py-2 rounded text-white dark:text-white ${
                  pokemonFilter
                    ? "bg-green-500 dark:bg-green-500"
                    : "bg-gray-500 dark:bg-gray-500"
                }`}
                onClick={() => setDropdownVisible(!dropdownVisible)}
              >
                Filter Pokemon
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded dark:bg-gray-500 dark:text-white"
                onClick={() => handleFilter("")}
              >
                Clear Filters
              </button>
              {dropdownVisible && (
                <div className="absolute top-full mt-2 bg-white rounded-lg shadow-lg z-10 overflow-hidden">
                  {Object.keys(pokemonGenerations).map((gen) => (
                    <button
                      key={gen}
                      className={`block w-full text-center px-9 py-2 ${
                        pokemonFilter === gen
                          ? "bg-green-500 text-white dark:bg-green-500 dark:text-white border border-black"
                          : "bg-orange-400 text-white dark:bg-orange-400 dark:text-white border border-black"
                      }`}
                      onClick={() => handleFilter(gen)}
                    >
                      {gen}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          {showAchievements ? (
            renderAchievements()
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : viewSelected ? (
            renderSelectedPokemon()
          ) : (
            renderPokemon()
          )}
          {achievementPopup && (
            <AchievementPopup achievement={achievementPopup} />
          )}
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-center mt-5 mb-5 text-black">
            ShinyDex
          </h1>
          <p className="text-center text-black">
            Please sign in to view your ShinyDex
          </p>
        </>
      )}
    </div>
  );
}
