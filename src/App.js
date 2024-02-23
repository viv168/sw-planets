import './App.css';
import sw_bg from "./starwars-bg.jpg"
import { useEffect, useState } from 'react';
import axios from 'axios';
import ResidentsDisplay from "./ResidentsDisplay"

function App() {

  const [planets, setPlanets] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  const fetchData = async (url) => {
    try {
      const response = await axios.get(url);
      setPlanets(response.data.results);
      console.log("response.data.results::", response.data.results)
      setNextPage(response.data.next);
      console.log("response.data.next::", response.data.next)
      setPrevPage(response.data.previous);
      console.log("response.data.previous::", response.data.previous)
    } catch (error) {
      console.error('Error fetching planets:', error);
    }
  };

  useEffect(() => {
    fetchData('https://swapi.dev/api/planets/?format=json');
  }, []);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    if (nextPage) {
      fetchData(nextPage);
    }
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
    if (prevPage) {
      fetchData(prevPage);
    }
  };

  const handleKnowMore = (planet) => {
    setSelectedPlanet(planet);
  };

  const handleBack = () => {
    setSelectedPlanet(null);
  };

  return (
    <div className="h-screen w-screen flex flex-row justify-center items-center bg-black">
      <div className='relative w-[30%] h-full'>
        <img src={sw_bg} alt="StarWars Background" className='h-full w-full object-cover' />
        <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-start items-center p-5 z-40 backdrop-blur-sm'>
          <div className="bg-black w-full bg-opacity-50 text-white font-bold text-2xl py-2 px-4">
            Welcome to Planets Directory:<br/>Powered by SWAPI
          </div>
          <button className="bg-black w-full mt-5 bg-opacity-50 hover:bg-opacity-75 text-white font-semibold py-2 px-4 border border-white rounded" onClick={() => setSelectedPlanet(null)}>
            Planets
          </button>
        </div>
      </div>
      <div className='flex-1 h-full overflow-y-scroll flex flex-wrap items-center justify-start p-5'>
      {selectedPlanet ? (
            <div className="planet-details w-[30%]">
              <button onClick={handleBack}>Back</button>
              <h2>{selectedPlanet.name}</h2>
              <p>Climate: {selectedPlanet.climate}</p>
              <p>Population: {selectedPlanet.population}</p>
              <p className='truncate'>Terrain: {selectedPlanet.terrain}</p>
              <p>Residents:</p>
              {/* <ul>
                {selectedPlanet.residents.map((resident, index) => (
                  <li key={index}>{resident}</li>
                ))}
              </ul> */}
              <ResidentsDisplay residentUrls={selectedPlanet.residents} />
            </div>
          ) : (
            planets.map((planet, index) => (
              <div key={index} className="w-[30%] bg-yellow-700 shadow-2xl m-2 p-2 rounded-lg shadow-yellow-800 text-white">
                <h3>{planet.name}</h3>
                <p>Climate: {planet.climate}</p>
                <p>Population: {planet.population}</p>
                <p>Terrain: {planet.terrain}</p>
                <button onClick={() => handleKnowMore(planet)} className="bg-red-600 hover:bg-red-300 text-white font-bold py-2 px-4 rounded">
                   Know More
                </button>

              </div>
            ))
          )}
      {!selectedPlanet && (
        <div className="pagination">
          {currentPage !== 1 && <button onClick={handlePrevPage}>Previous Page</button>}
          {nextPage && <button onClick={handleNextPage}>Next Page</button>}
        </div>
      )}
      </div>
    </div>
  );
}

export default App;
