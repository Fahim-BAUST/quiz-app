import { Box, Button, Container, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setTokenSourceMapRange } from 'typescript';

const Home = () => {
    const navigate = useNavigate();
    const [language, setLanguage] = useState<string>('');
    const [name, setName] = useState<string>('')
    const [gender, setGender] = useState<string>('')



    return (
        <Container sx={{ width: "50%", mx: "auto", my: 15 }}>

            <Box>
                <Typography variant='h4'> Please provide this information:- </Typography>

                <TextField onChange={(e) => setName(e.target.value)} sx={{ mt: 4 }} id="standard-basic" label="Your Name" variant="standard" /> <br />
                <TextField onChange={(e) => setGender(e.target.value)} sx={{ mt: 1 }} id="standard-basic" label="Your Gender" variant="standard" /> <br />
                <RadioGroup
                    aria-label="quiz"
                    name="quiz"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                >

                    <FormControlLabel value="bangla" control={<Radio />} label="Bangla" />
                    <FormControlLabel value="english" control={<Radio />} label="english" />

                </RadioGroup>
                <Button onClick={() => navigate(`/quiz/${language}`)} sx={{ mt: 2 }} variant="contained" disabled={(language && name && gender) ? false : true}>Start Quiz</Button>

            </Box>

        </Container>
    );
};

export default Home;