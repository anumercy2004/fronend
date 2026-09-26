// LearnSphere Local Storage Utility Functions

export function saveData(key, value) {
  try {
    localStorage.setItem(`learnsphere_${key}`, JSON.stringify(value));
    console.log("Data saved:", key);
  } catch (error) {
    console.error("Error saving data to localStorage:", error);
  }
}

export function getData(key, fallback = null) {
  try {
    const data = localStorage.getItem(`learnsphere_${key}`);
    console.log("Data loaded:", key);
    return data ? JSON.parse(data) : fallback;
  } catch (error) {
    console.error("Error reading data from localStorage:", error);
    return fallback;
  }
}

export function removeData(key) {
  try {
    localStorage.removeItem(`learnsphere_${key}`);
    console.log("Data removed:", key);
  } catch (error) {
    console.error("Error removing data from localStorage:", error);
  }
}

export function clearAllData() {
  try {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('learnsphere_')) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(k => localStorage.removeItem(k));
    console.log("All LearnSphere demo data cleared from localStorage");
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
}
