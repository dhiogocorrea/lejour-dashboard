import React, { useEffect } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';


const RadioFilters = params => {
  const [radioButtons, setRaddioButtons] = React.useState();

  useEffect(() => {
    let radios = [];
    if (params.filters !== undefined) {
      (params.filters).forEach(filter => {
        radios.push(
          <FormControlLabel
            key={filter.value}
            value={filter.value}
            control={
              <Radio checked={params.selectedFilter === filter.value}
                     inputProps={{'data-label': filter.title}}
                     color="primary"
              />
            }
            label={filter.label}
            onChange={params.handleFilterChange}
            
          />
        )  
      });

      setRaddioButtons(radios)
    }
  },[params])

  return (
    <FormControl component="fieldset">
      <RadioGroup row aria-label="position" name="position" defaultValue="end">
        {radioButtons}
      </RadioGroup>
    </FormControl>
  );
}


export default RadioFilters;