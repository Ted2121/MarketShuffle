import { Box } from '@mui/material'
import React from 'react'
import Guild from './Guild';

function AllGuildsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [guildList, setGuildList] = useState([]);
    const [timeoutId, setTimeoutId] = useState(null);

    const onSearchChange = (event) => {
        const { value } = event.target;
        setSearchQuery(value);

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(async () => {
            const guilds = await getGuildBySearch(value);
            setGuildList(guilds || []);
        }, 1000);

        setTimeoutId(newTimeoutId);
    };

    const guilds = (
        guildList.map(guild => (
          <Guild key={guild?.id} guild={guild}/>
        ))
      );

    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            overflow: 'auto',
        }}>
            <TextField
                label="Search"
                variant="outlined"
                value={searchQuery}
                onChange={onSearchChange}
                sx={{
                    mb: 1,
                    width: '100%'
                }}
            />
            {guilds}
        </Box>

    )
}

export default AllGuildsPage