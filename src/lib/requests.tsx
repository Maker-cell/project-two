"use client";
import { useState, useEffect } from "react";

export const useFetch = <T = unknown,>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network failure");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error as Error);
      }
    };

    fetchData();
  }, [url]);

  return { data, error };
};
export const usePost = <T = unknown, B = unknown>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const postData = async (body: B) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/JSON" },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error("Failed to save user data");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error as Error);
    }
  };

  return { data, error, postData };
};
