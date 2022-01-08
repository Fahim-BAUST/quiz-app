
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Box, Button, Divider, FormControl, FormControlLabel, FormHelperText, MobileStepper, Pagination, Paper, Radio, RadioGroup, TextField, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Pie, PieChart, Tooltip } from 'recharts';

const Question = () => {

    const { language } = useParams<{ language: string }>()
    let questions: { question: string, types: string, choice: string[], ans: string }[] = [];

    language === "english" ? questions = [
        {
            question: 'What is the correct command to create a new React project?',
            types: `multipleChoice`,
            choice: ["create react app", "npx create react app", "npx create-react-app my-app", "npx create react app my-app"],
            ans: "npx create-react-app my-app"
        },
        {
            question: 'React is based on components. True Or False?',
            types: `multipleChoice`,
            choice: ["True", "False"],
            ans: "true"
        },
        {
            question: ' React is mainly used for building ___?',
            types: `blanks`,
            choice: [""],
            ans: "user interface"
        },
        {
            question: 'Props Are _______ into other Components?',
            types: `multipleChoice`,
            choice: ["injected", "Methods", "Both A and B", "All of these"],
            ans: "methods"
        }
        ,
        {
            question: 'Which is the right way of accessing a function fetch() from an h1 element in JSX?',
            types: `multipleChoice`,
            choice: ["<h1>{fetch()}</h1>", "<h1>${fetch()}</h1>", "<h1>{fetch}</h1>", "<h1>${fetch}</h1>"],
            ans: "<h1>{fetch}</h1>"
        }
    ] :

        questions = [
            {
                question: 'একটি নতুন REACT প্রকল্প তৈরি করার সঠিক কমান্ড কি?',
                types: `multipleChoice`,
                choice: ["create react app", "npx create react app", "npx create-react-app my-app", "npx create react app my-app"],
                ans: "npx create-react-app my-app"
            },
            {
                question: 'REACT উপাদানগুলির উপর ভিত্তি করে। সত্য অথবা মিথ্যা?',
                types: `multipleChoice`,
                choice: ["সত্য", "মিথ্যা"],
                ans: "সত্য"
            },
            {
                question: ' REACT প্রধানত নির্মাণের জন্য ব্যবহৃত হয় ___?',
                types: `blanks`,
                choice: [""],
                ans: "ব্যবহারকারী ইন্টারফেস"
            },
            {
                question: 'প্রপগুলি অন্যান্য উপাদানগুলির মধ্যে _______ হয়?',
                types: `multipleChoice`,
                choice: ["ইনজেকশন", "পদ্ধতি", "A এবং B উভয়", "এই সবগুলু"],
                ans: "পদ্ধতি"
            }
            ,
            {
                question: 'JSX-এর একটি h1 উপাদান থেকে একটি ফাংশন fetch() অ্যাক্সেস করার সঠিক উপায় যা?',
                types: `multipleChoice`,
                choice: ["<h1>{fetch()}</h1>", "<h1>${fetch()}</h1>", "<h1>{fetch}</h1>", "<h1>${fetch}</h1>"],
                ans: "<h1>{fetch}</h1>"
            }
        ];



    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState<number>(0);
    const maxSteps: number = questions.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setActiveStep(value - 1)

    }

    const [value, setValue] = React.useState<string>('');
    const [error, setError] = React.useState<boolean>(false);
    const [helperText, setHelperText] = React.useState<string>('Choose wisely');


    const [userAns, setUserAns] = useState<string[]>([])
    const userAnswer: string[] = userAns

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
        setHelperText('');
        setError(false);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        userAnswer[activeStep] = value;
        setUserAns(userAnswer)

        if (value.toLowerCase() === questions[activeStep].ans) {
            setHelperText('You got it!');
            setError(false);
        } else {
            setHelperText('Wrong answer or select any option.');
            setError(true);
        }
    };


    const [chartsdata, setChartsData] = useState<{ name: string, value: number }[]>([])
    const [loadCharts, setLoadCharts] = React.useState<boolean>(false);
    const [finalScore, setFinalScore] = useState<number>(0)

    const showCharts = () => {
        let score: number = 0;

        for (let i = 0; i < userAns.length; i++) {
            if (userAns[i] === questions[i].ans) {
                score = score + 1;
            }

        }

        setFinalScore(score);

        const writeAnswerPercentage = (score * 100) / userAns.length
        const wrongAnswerPercentage = 100 - writeAnswerPercentage;
        setChartsData([{ name: 'Write Answer(%)', value: writeAnswerPercentage },
        { name: 'Wrong Answer(%)', value: wrongAnswerPercentage }])
        setLoadCharts(true);

    }
    console.log(chartsdata);

    return (
        <Box sx={{
            mt: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',

                    mb: 3
                }}>
                    <Pagination onChange={handleChange} count={questions.length} color="secondary" />
                </Box>
                <Paper
                    square
                    elevation={0}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        height: 50,
                        pl: 2,
                        backgroundColor: 'cyan',
                    }}
                >
                    <Typography>{questions[activeStep].question}</Typography>
                </Paper>

                <Box sx={{ height: 255, maxWidth: 400, width: '100%', p: 2 }}>

                    {/* for  multiple choice */}
                    {questions[activeStep].types === "multipleChoice"
                        &&
                        <form onSubmit={handleSubmit}>
                            <FormControl
                                sx={{ m: 3 }}
                                component="fieldset"
                                error={error}
                                variant="standard"
                            >
                                <RadioGroup
                                    aria-label="quiz"
                                    name="quiz"
                                    value={value}
                                    onChange={handleRadioChange}
                                >

                                    <FormControlLabel value={questions[activeStep]?.choice[0]} control={<Radio />} label={questions[activeStep]?.choice[0]} />
                                    <FormControlLabel value={questions[activeStep]?.choice[1]} control={<Radio />} label={questions[activeStep]?.choice[1]} />
                                    {questions[activeStep]?.choice[2] && <FormControlLabel value={questions[activeStep]?.choice[2]} control={<Radio />} label={questions[activeStep]?.choice[2]} />}
                                    {questions[activeStep]?.choice[3] && <FormControlLabel value={questions[activeStep]?.choice[3]} control={<Radio />} label={questions[activeStep]?.choice[3]} />}

                                </RadioGroup>
                                <FormHelperText>{helperText}</FormHelperText>
                                <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
                                    select
                                </Button>
                            </FormControl>
                        </form>
                    }
                    {/* for  Fill In the blanks */}
                    {questions[activeStep].types === "blanks" &&
                        <form onSubmit={handleSubmit}>
                            <FormControl
                                sx={{ m: 3 }}
                                component="fieldset"
                                error={error}
                                variant="standard"
                            >
                                <TextField onChange={handleRadioChange} id="input-with-sx" label="Write here" variant="standard" />
                                <FormHelperText>{helperText}</FormHelperText>
                                <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
                                    select
                                </Button>
                            </FormControl>
                        </form>

                    }

                </Box>
                <MobileStepper
                    variant="text"
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                        <Button
                            size="small"
                            onClick={handleNext}
                            disabled={activeStep === maxSteps - 1}
                        >
                            Next
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowLeft />
                            ) : (
                                <KeyboardArrowRight />
                            )}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowRight />
                            ) : (
                                <KeyboardArrowLeft />
                            )}
                            Back
                        </Button>
                    }
                />

                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3, mt: 2 }}>
                    <Button onClick={showCharts} variant="contained" size="small" disabled={userAns.length === 5 ? false : true}>
                        submit
                    </Button>

                </Box >

            </Box>

            {
                loadCharts && <Box>
                    <Typography align='center' variant='h4'>Your Score:- {finalScore}/{questions.length}</Typography>
                    <Typography align='center' variant='h5'>Your Answers:-</Typography>
                    <ol>
                        {userAns?.map(ans => <li>{ans}</li>)}
                    </ol>
                    <Typography align='center' variant='h5'>Write Answers:-</Typography>
                    <ol>
                        {questions?.map(ans => <li>{ans.ans}</li>)}
                    </ol>
                </Box>
            }

            {loadCharts && <Box>
                <Typography align='center' variant='h3'> Charts</Typography>
                <PieChart width={400} height={250}>
                    <Pie
                        dataKey="value"
                        isAnimationActive={false}
                        data={chartsdata}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                    />

                    <Tooltip />
                </PieChart>
            </Box>}
        </Box>

    );
}
export default Question;