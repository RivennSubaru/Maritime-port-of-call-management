import React, { useState, useEffect, useMemo } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import cities from '../../liste des villes dans le monde/states+cities.json'; // Importer le fichier JSON

const CityAutocomplete = ({ name, label, value, onChange }) => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Charger toutes les villes depuis le fichier JSON
    setOptions(cities);
  }, []);

  const filteredOptions = useMemo(() => {
    // Filtrer les options en fonction de la saisie de l'utilisateur
    return options.filter((city) =>
      city.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [options, inputValue]);

  return (
    <Autocomplete
      freeSolo // Permet à l'utilisateur d'entrer des valeurs qui ne sont pas dans la liste des options
      options={filteredOptions}
      getOptionLabel={(option) => option.name}
      value={options.find(option => option.name === value) || null} // Assurez-vous que la valeur est bien synchronisée
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
        onChange(newInputValue); // Met à jour la valeur avec la saisie de l'utilisateur
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          name={name}
          label={label}
          onChange={(event) => setInputValue(event.target.value)}
        />
      )}
    />
  );
};

export default CityAutocomplete;
