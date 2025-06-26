import { useState, useEffect } from "react";
import TwitterCard from "./assets/TwitterCard";
import "./App.css";
import { BookmarkIcon } from "@heroicons/react/24/solid";
import { api_fav, api_key, api_url } from "./APIS";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

function App() {
  const [view, setView] = useState(0);
  const [cat, setCat] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favoritos, setFavoritos] = useState(() => {
    const recFav = window.localStorage.getItem("fav");
    return recFav ? JSON.parse(recFav) : [];
  });

 
  const fetchData = async () => {
    try {
      const res = await fetch(api_url);
      const data = await res.json();
      setCat(data[0]);
    } catch (error) {
      console.error("error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    console.log("cat", cat);
  }, []);

  // agregar a favoritos mediante POST
  const addFavorites = async (id) => {
    if (favoritos.some((f) => f.id === cat.id)) {
      return alert("Este michi ya está en favoritos");
    }

    try {
      const res = await fetch(api_fav, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": api_key,
        },
        body: JSON.stringify({ image_id: id }),
      });
      const data = await res.json();
      const favId = data.id;
      const nuevosFavoritos = [...favoritos, { ...cat, favId }];
      setFavoritos(nuevosFavoritos);
      window.localStorage.setItem("fav", JSON.stringify(nuevosFavoritos));
      console.log("Favorito guardado:", data);
    } catch (error) {
      console.error("Error al guardar favorito:", error);
    }
  };
  //eliminar favoritos
  const deleteFav = async (favId) => {
    try {
      await fetch(`${api_fav}/${favId}`, {
        method: "DELETE",
        headers: {
          "x-api-key": api_key,
        },
      });
    } catch (error) {
      console.error(error);
    }
    const newList = favoritos.filter((fav) => fav.favId !== favId);
    setFavoritos(newList);
  };
  //Retornamos y renderizamos
  return (
    <>
      <section className="flex w-full h-screen bg-gray-950 p-6 gap-5 ">
        <main className="flex flex-col items-center gap-8 flex-grow">
          {isLoading && <p>cargando michis...</p>}
          <h1 className="font-bold text-4xl text-white">MICHIS</h1>
          <div className="flex flex-col flex-center items-center">
            <img
              className="w-100 h-100 rounded-lg"
              src={cat.url}
              alt="gatito"
            />
            <div className="flex justify-between w-100">
              <button
                className="flex justify-center p-3 bg-blue-500  h-auto hover:bg-blue-900 rounded-lg text-white"
                onClick={() => {
                  if (view >= 10) {
                    return alert("ya no podes ver más michis");
                  } else {
                    {
                      fetchData();
                      setView(view + 1);
                    }
                  }
                }}
              >
                <ArrowPathIcon className="w-10 h-10" />
              </button>
              <p className="bg-blue-200 p-3 rounded-lg flex-grow flex justify-center items-center font-bold">
                michis vistos: {view}
              </p>
              <button
                className="items-center flex justify-center p-3 bg-blue-500  h-auto hover:bg-blue-900 rounded-lg text-white"
                onClick={() => addFavorites(cat.id)}
              >
                <BookmarkIcon className="w-10 h-10" />
              </button>
            </div>
          </div>
        </main>

        <div className="flex flex-col gap-5  p-6  h-100% bg-gray-950  border border-gray-800 w-90 rounded-2xl overflow-y-scroll ">
          <div className="flex justify-center">
            <h1 className="text-white font-bold">Favorites</h1>
          </div>

          {favoritos.map((fav, id) => {
            return (
              <TwitterCard
                key={id}
                user={`michi ${fav.id}`}
                url={fav.url}
                deleteFav={deleteFav}
                favId={fav.favId}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}

export default App;
