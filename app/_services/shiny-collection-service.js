import { db } from "../_utils/firebase";
import {
  collection,
  getDocs,
  addDoc,
  query,
  deleteDoc,
  where,
} from "firebase/firestore";

export async function getPokemon(userId) {
  try {
    const pokemonReference = collection(db, "users", userId, "pokemon");
    const pokemonSnapshot = await getDocs(pokemonReference);

    let pokemon = [];
    pokemonSnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      if (data && data.id) {
        pokemon.push(parseInt(data.id, 10)); 
      }
    });
    return pokemon;
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    throw error;
  }
}

export async function addPokemon(userId, pokemonId) {
  try {
    const pokemonCollectionRef = collection(db, "users", userId, "pokemon");

    const q = query(pokemonCollectionRef, where("id", "==", pokemonId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      console.log(`Pokémon with ID ${pokemonId} is already selected.`);
      return;
    }

    await addDoc(pokemonCollectionRef, { id: pokemonId });
    console.log(`Pokémon with ID ${pokemonId} added successfully.`);
  } catch (error) {
    console.error("Error adding Pokémon:", error);
    throw error;
  }
}

export async function removePokemon(userId, pokemonId) {
  try {
    const pokemonCollectionRef = collection(db, "users", userId, "pokemon");

    const q = query(pokemonCollectionRef, where("id", "==", pokemonId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log(`No selected Pokémon found with ID ${pokemonId}.`);
      return;
    }

    const deletePromises = [];
    querySnapshot.forEach((docSnap) => {
      deletePromises.push(deleteDoc(docSnap.ref));
    });

    await Promise.all(deletePromises);
    console.log(`Pokémon with ID ${pokemonId} removed successfully.`);
  } catch (error) {
    console.error("Error removing Pokémon:", error);
    throw error;
  }
}
