// News data for homepage and news page
// Now fetches news from Firestore instead of static array

import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

// Custom hook to fetch news from Firestore
export function useNewsList() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const newsRef = collection(db, "news");
      const q = query(newsRef, orderBy("timestamp", "desc"));
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNewsList(items);
      setLoading(false);
    };
    fetchNews();
  }, []);

  return { newsList, loading };
}