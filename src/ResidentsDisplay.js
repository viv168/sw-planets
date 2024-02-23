import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ResidentsDisplay = ({ residentUrls }) => {
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    const fetchResidents = async () => {
      const residentPromises = residentUrls.map(url => axios.get(url));
      try {
        const residentResponses = await Promise.all(residentPromises);
        const residentData = residentResponses.map(response => response.data);
        setResidents(residentData);
      } catch (error) {
        console.error('Error fetching residents:', error);
      }
    };

    fetchResidents();
  }, [residentUrls]);

  return (
    <div className='text-white'>
      <h4 className="mb-2">Residents:</h4>
      <ul className="list-disc pl-6">
        {residents.map(resident => (
          <li key={resident.name} className="mb-4">
            <p className="font-semibold">Name: {resident.name}</p>
            <p>Height: {resident.height}</p>
            <p>Mass: {resident.mass}</p>
            <p>Gender: {resident.gender}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResidentsDisplay;
