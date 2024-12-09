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
    const pokemonCollectionReference = collection(
      db,
      "users",
      userId,
      "pokemon"
    );
    const pokemonCollectionSnapshot = await getDocs(pokemonCollectionReference);

    let pokemon = [];
    pokemonCollectionSnapshot.forEach((docSnap) => {
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
    const pokemonCollectionReference = collection(
      db,
      "users",
      userId,
      "pokemon"
    );

    const q = query(pokemonCollectionReference, where("id", "==", pokemonId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      console.log(`Pokémon with ID ${pokemonId} is already selected.`);
      return;
    }

    await addDoc(pokemonCollectionReference, { id: pokemonId });
    console.log(`Pokémon with ID ${pokemonId} added successfully.`);
  } catch (error) {
    console.error("Error adding Pokémon:", error);
    throw error;
  }
}

export async function removePokemon(userId, pokemonId) {
  try {
    const pokemonCollectionReference = collection(
      db,
      "users",
      userId,
      "pokemon"
    );

    const q = query(pokemonCollectionReference, where("id", "==", pokemonId));
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

export async function getAchievements(userId) {
  try {
    const achievements = [];
    const achievementCollectionReference = collection(
      db,
      "users",
      userId,
      "achievements"
    );
    const querySnapshot = await getDocs(achievementCollectionReference);
    querySnapshot.forEach((doc) => {
      achievements.push(doc.data().id);
    });
    return achievements;
  } catch (error) {
    console.error("Error retrieving achievements:", error);
    throw error;
  }
}

export async function addAchievement(userId, achievementId) {
  try {
    const achievementCollectionReference = collection(
      db,
      "users",
      userId,
      "achievements"
    );

    const q = query(achievementCollectionReference, where("id", "==", achievementId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      console.log(`Achievement with ID ${achievementId} is already unlocked.`);
      return;
    }

    await addDoc(achievementCollectionReference, { id: achievementId });
    console.log(`Achievement with ID ${achievementId} unlocked successfully.`);
  } catch (error) {
    console.error("Error unlocking achievement:", error);
    throw error;
  }
}

export async function removeAchievement(userId, achievementId) {
  try {
    const achievementCollectionReference = collection(
      db,
      "users",
      userId,
      "achievements"
    );

    const q = query(achievementCollectionReference, where("id", "==", achievementId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log(`No unlocked achievement found with ID ${achievementId}.`);
      return;
    }

    const deletePromises = [];
    querySnapshot.forEach((docSnap) => {
      deletePromises.push(deleteDoc(docSnap.ref));
    });

    await Promise.all(deletePromises);
    console.log(`Achievement with ID ${achievementId} removed successfully.`);
  } catch (error) {
    console.error("Error removing achievement:", error);
    throw error;
  }
}
