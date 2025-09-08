import { createContext, useContext, useEffect, useReducer } from "react";

const BASE_URL = "http://localhost:8000";

// 1) CREATE CONTEXT
const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
}

// 2) CREATE PROVIDER COMPONENT
function CitiesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cities, isLoading, currentCity, error } = state;

  useEffect(function () {
    const controller = new AbortController();

    async function fetchCities() {
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/cities`, {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error("Failed to fetch cities");
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        if (err.name !== "AbortError") {
          dispatch({
            type: "rejected",
            payload: "There was an error loading cities...",
          });
        }
      }
    }

    fetchCities();

    return function () {
      controller.abort();
    };
  }, []);

  async function getCity(id) {
    if (Number(id) === currentCity.id) return;

    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);

      if (!res.ok) throw new Error("Failed to fetch city");
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch (err) {
      if (err.name !== "AbortError") {
        dispatch({
          type: "rejected",
          payload: "There was an error loading city...",
        });
      }
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      dispatch({ type: "city/created", payload: data });
      return data;
    } catch (err) {
      if (err.name !== "AbortError") {
        dispatch({
          type: "rejected",
          payload: "There was an error creating city...",
        });
      }
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleted", payload: id });
    } catch (err) {
      if (err.name !== "AbortError") {
        dispatch({
          type: "rejected",
          payload: "There was an error deleting city...",
        });
      }
    }
  }

  return (
    //2) PROVIDE VALUE OR CONTEXT TO THE CHILD COMPONENTS
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        getCity,
        currentCity,
        createCity,
        deleteCity,
        error,
      }}
    >
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
