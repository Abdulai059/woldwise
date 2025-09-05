import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:8000";

// 1) CREATE CONTEXT
const CitiesContext = createContext();

// 2) CREATE PROVIDER COMPONENT
function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState();

  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    const controller = new AbortController();

    async function fetchCities() {
      try {
        setIsLoading(true);

        const res = await fetch(`${BASE_URL}/cities`, {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error("Failed to fetch cities");
        const data = await res.json();
        setCities(data);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Fetch aborted  🚫");
        } else {
          console.error("Fetch error:", err);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();

    return function () {
      controller.abort();
    };
  }, []);

  async function getCity(id) {
    const controller = new AbortController();

    try {
      setIsLoading(true);

      const res = await fetch(`${BASE_URL}/${id}`, {
        signal: controller.signal,
      });

      if (!res.ok) throw new Error("Failed to fetch cities");
      const data = await res.json();
      setCurrentCity(data);
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("Fetch aborted  🚫");
      } else {
        console.error("Fetch error:", err);
      }
    } finally {
      setIsLoading(false);
    }

    return function () {
      controller.abort();
    };
  }

  return (
    //2) PROVIDE VALUE OR CONTEXT TO THE CHILD COMPONENTS
    <CitiesContext.Provider value={{ cities, isLoading, getCity, currentCity }}>
      {children}
    </CitiesContext.Provider>
  ); 
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("useCity must be used within a CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
