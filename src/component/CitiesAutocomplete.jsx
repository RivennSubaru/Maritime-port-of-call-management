import React, { useState, useEffect, useMemo } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import debounce from 'lodash.debounce';

// Importez les données JSON
import statesCities from '../../liste des villes dans le monde/states+cities.json';

export default function CitiesAutocomplete() {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);

  // Utiliser debounce pour réduire la fréquence de mise à jour
  const debouncedSearch = useMemo(
    () => debounce((query) => {
      const filteredOptions = statesCities.reduce((acc, state) => {
        const matchingCities = state.cities.filter((city) =>
          city.name.toLowerCase().includes(query.toLowerCase())
        ).map(city => ({ ...city, type: 'city', state: state.name }));

        const matchingState = state.name.toLowerCase().includes(query.toLowerCase())
          ? [{ name: state.name, type: 'state' }]
          : [];

        return [...acc, ...matchingCities, ...matchingState];
      }, []);

      setOptions(filteredOptions);
    }, 300),
    []
  );

  useEffect(() => {
    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return;
    }

    debouncedSearch(inputValue);
  }, [inputValue, value, debouncedSearch]);

  return (
    <Autocomplete
      id="location-autocomplete"
      sx={{ width: 300 }}
      getOptionLabel={(option) => option.name}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText="No locations"
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Add a location" fullWidth />
      )}
      renderOption={(props, option, { index }) => {
        const { key, ...rest } = props;
        return (
          <li key={`${option.name}-${index}`} {...rest}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: 'flex', width: 44 }}>
                <LocationOnIcon sx={{ color: 'text.secondary' }} />
              </Grid>
              <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                <Box
                  component="span"
                  sx={{ fontWeight: option.type === 'state' ? 'bold' : 'regular' }}
                >
                  {option.name}
                </Box>
                {option.type === 'city' && (
                  <Typography variant="body2" color="text.secondary">
                    {option.state}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}
