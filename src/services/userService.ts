import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { UserData } from '../types';

export async function getUserProfile(userId: string): Promise<UserData | null> {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      // recalculate cleanDays dynamically based on quitDate
      let cleanDays = data.cleanDays;
      if (data.quitDate) {
        const diffMs = Date.now() - data.quitDate;
        cleanDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        // ensure it doesn't go below what was initially set
        if (cleanDays < data.cleanDays) cleanDays = data.cleanDays;
      }
      return {
        substance: data.substance,
        stage: data.stage,
        symptoms: data.symptoms || [],
        dailyCost: data.dailyCost || 0,
        cleanDays,
        quitDate: data.quitDate
      };
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
  return null;
}

export async function saveUserProfile(userId: string, data: UserData) {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    
    // calculate quitDate if not present
    let quitDate = data.quitDate;
    if (!quitDate && data.cleanDays !== null) {
      quitDate = Date.now() - (data.cleanDays * 24 * 60 * 60 * 1000);
    }

    const payload = {
      substance: data.substance,
      stage: data.stage,
      symptoms: data.symptoms,
      dailyCost: data.dailyCost,
      cleanDays: data.cleanDays,
      quitDate,
      updatedAt: serverTimestamp()
    };

    if (docSnap.exists()) {
      await updateDoc(docRef, payload);
    } else {
      await setDoc(docRef, {
        ...payload,
        createdAt: serverTimestamp()
      });
    }
  } catch (error) {
    console.error("Error saving user profile:", error);
    throw error;
  }
}
