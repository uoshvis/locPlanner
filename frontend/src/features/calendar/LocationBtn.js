import * as React from 'react'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

function LocationBtn({ location, setLocation }) {
    const handleLocationChange = (event, newLocation) => {
        if (newLocation !== null) {
            setLocation(newLocation)
        }
    }

    return (
        <ToggleButtonGroup
            color="primary"
            sx={{ padding: '1em' }}
            value={location}
            exclusive
            onChange={handleLocationChange}
        >
            <ToggleButton value="all">All locations</ToggleButton>
            <ToggleButton value="loc1">Location 1</ToggleButton>
            <ToggleButton value="loc2">Location 2</ToggleButton>
        </ToggleButtonGroup>
    )
}

export default LocationBtn
