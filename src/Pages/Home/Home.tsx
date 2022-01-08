import { Box, Button, Container, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [language, setLanguage] = useState<string>('');


    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log((event.target as HTMLInputElement).value);
        setLanguage((event.target as HTMLInputElement).value);

    };

    return (
        <Container sx={{ width: "50%", mx: "auto", my: 15 }}>

            <Box>
                <Typography variant='h4'> Please provide this information:- </Typography>


                <TextField sx={{ mt: 4 }} id="standard-basic" label="Your Name" variant="standard" /> <br />
                <TextField sx={{ mt: 1 }} id="standard-basic" label="Your Gender" variant="standard" /> <br />
                <RadioGroup
                    aria-label="quiz"
                    name="quiz"
                    value={language}
                    onChange={handleRadioChange}
                >

                    <FormControlLabel value="bangla" control={<Radio />} label="Bangla" />
                    <FormControlLabel value="english" control={<Radio />} label="english" />

                </RadioGroup>
                <Button onClick={() => navigate(`/quiz/${language}`)} sx={{ mt: 2 }} variant="contained" >Details</Button>

            </Box>

        </Container>
    );
};

export default Home;