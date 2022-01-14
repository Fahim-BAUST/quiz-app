
import { Box, Button, Checkbox, Chip, Divider, FormControl, FormControlLabel, Paper, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const Question: React.FC = () => {

    const { language } = useParams<{ language: string }>()
    let questions: { id: number, question: string, types: string, choice: string[], ans: string[] }[] = [];

    language === "english" ? questions = [
        {
            id: 1,
            question: 'What is the correct command to create a new React project?',
            types: `multipleChoice`,
            choice: ["create react app", "npx create react app", "npx create-react-app my-app", "npx create react app my-app"],
            ans: ["npx create-react-app my-app"]
        },
        {
            id: 2,
            question: 'React is based on components. True Or False?',
            types: `multipleChoice`,
            choice: ["True", "False"],
            ans: ["true"]
        },
        {
            id: 3,
            question: ' React is mainly used for building ___?',
            types: `blanks`,
            choice: [""],
            ans: ["user interface"]
        },
        {
            id: 4,
            question: 'Props Are _______ into other Components?',
            types: `multiSelect`,
            choice: ["injected", "Methods", "Both A and B", "All of these"],
            ans: ["injected", "Methods"]
        }
        ,
        {
            id: 5,
            question: 'Match the following?',
            types: `multipleChoice`,
            choice: ["React -> Facebook & Angular-> Google & Vue-> GitLab",
                "React -> Google & Angular-> Facebook & Vue-> GitLab",
                "React -> GitLab & Angular-> Facebook & Vue-> Google",
                "React -> GitLab & Angular-> Google & Vue-> Facebook"],
            ans: ["React -> Facebook & Angular-> Google & Vue-> GitLab"]
        }
    ] :

        questions = [
            {
                id: 1,
                question: 'একটি নতুন REACT প্রকল্প তৈরি করার সঠিক কমান্ড কি?',
                types: `multipleChoice`,
                choice: ["create react app", "npx create react app", "npx create-react-app my-app", "npx create react app my-app"],
                ans: ["npx create-react-app my-app"]
            },
            {
                id: 2,
                question: 'REACT উপাদানগুলির উপর ভিত্তি করে। সত্য অথবা মিথ্যা?',
                types: `multipleChoice`,
                choice: ["সত্য", "মিথ্যা"],
                ans: ["সত্য"]
            },
            {
                id: 3,
                question: ' REACT প্রধানত নির্মাণের জন্য ব্যবহৃত হয় ___?',
                types: `blanks`,
                choice: [""],
                ans: ["ব্যবহারকারী ইন্টারফেস"]
            },
            {
                id: 4,
                question: 'প্রপগুলি অন্যান্য উপাদানগুলির মধ্যে _______ হয়?',
                types: `multiSelect`,
                choice: ["ইনজেকশন", "পদ্ধতি", "A এবং B উভয়", "এই সবগুলু"],
                ans: ["ইনজেকশন", "পদ্ধতি"]
            }
            ,
            {
                id: 5,
                question: 'JSX-এর একটি h1 উপাদান থেকে একটি ফাংশন fetch() অ্যাক্সেস করার সঠিক উপায় যা?',
                types: `multipleChoice`,
                choice: ["React -> Facebook & Angular-> Google & Vue-> GitLab",
                    "React -> Google & Angular-> Facebook & Vue-> GitLab",
                    "React -> GitLab & Angular-> Facebook & Vue-> Google",
                    "React -> GitLab & Angular-> Google & Vue-> Facebook"],
                ans: ["React -> Facebook & Angular-> Google & Vue-> GitLab"]
            }
        ];

    const [activeStep, setActiveStep] = React.useState<number>(0);

    const questionChange = (questionId: number) => {
        setActiveStep(questionId)
    }

    const isQuestionAnswered = (id: number) => {

        if (id <= userAns.length) {
            return true
        }
        else {
            return false;
        }

    }

    const [value, setValue] = React.useState<string>('');

    const [userAns, setUserAns] = useState<string[]>([])
    const userAnswer: string[] = userAns

    const [multiSelAns, setMultiSelAns] = useState<string[]>(['not answered'])
    const multiSel: string[] = multiSelAns

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);

    };


    const handleChecked = (op: string, checked: boolean, i: number) => {
        if (checked) {
            multiSel[i] = op
            setMultiSelAns(multiSel)
        }
        if (checked === false) {
            multiSel[i] = ''
            setMultiSelAns(multiSel)
        }

    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>, type: string) => {
        event.preventDefault();

        if (type === "multipleChoice" || type === "blanks") {

            if (userAnswer[activeStep - 1] === value || value.length === 0) {
                userAnswer[activeStep] = 'not answered';
            }
            else {
                userAnswer[activeStep] = value;
            }
            setUserAns(userAnswer)
            setActiveStep(activeStep + 1);
        }
        if (type === "multiSelect") {
            const joinAns = multiSelAns.join();
            userAnswer[activeStep] = joinAns;
            setUserAns(userAnswer)
            setActiveStep(activeStep + 1);

        }
    };


    const [loadCharts, setLoadCharts] = React.useState<boolean>(false);
    const [finalScore, setFinalScore] = useState<number>(0)
    const [writeAns, setWriteAns] = useState<number>(0)
    const [wrongAns, setWrongAns] = useState<number>(0)


    const showCharts = () => {
        let score: number = 0;

        for (let i = 0; i < userAns.length; i++) {

            if (questions[i].types === 'multiSelect') {
                const ansConcat = questions[i].ans.join();

                if (userAns[i].toLowerCase() === ansConcat.toLowerCase()) {
                    score = score + 1;
                }
            }
            else {
                if (userAns[i].toLowerCase() === questions[i].ans[0].toLowerCase()) {
                    score = score + 1;
                }
            }
        }

        setFinalScore(score);
        setWriteAns(score)
        setWrongAns(5 - score);
        setLoadCharts(true);

    }

    const deg = (a: number, b: number) => {
        return (360 * a) / (a + b);
    }


    return (
        <Box
            data-testid="ques"
            sx={{
                mt: 10,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
            <Box sx={{ maxWidth: 400, flexGrow: 1, display: `${userAns.length === 5 && 'none'}` }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',

                    mb: 3
                }}>
                    {
                        questions.map((q, i) => (
                            <Chip
                                color={isQuestionAnswered(i + 1) ? "error" : "default"}
                                onClick={() => questionChange(i)}
                                sx={{ marginRight: "10px", cursor: "pointer" }}
                                key={q.id}
                                label={i + 1}
                            />
                        ))
                    }
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
                    <Typography>{questions[activeStep]?.question}</Typography>
                </Paper>

                <Box sx={{ height: 255, maxWidth: 400, width: '100%', p: 2 }}>

                    {/* for  multiple choice */}
                    {questions[activeStep]?.types === "multipleChoice"
                        &&
                        <form onSubmit={(e) => handleSubmit(e, questions[activeStep]?.types)}>
                            <FormControl
                                sx={{ m: 3 }}
                                component="fieldset"

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

                                <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
                                    select
                                </Button>
                            </FormControl>
                        </form>
                    }
                    {/* for  Fill In the multiSelect */}
                    {questions[activeStep]?.types === "multiSelect" &&
                        <form onSubmit={(e) => handleSubmit(e, questions[activeStep]?.types)}>
                            <FormControl
                                sx={{ m: 3 }}
                                component="fieldset"

                                variant="standard"
                            >

                                {
                                    questions[activeStep]?.choice.map((op, i) => (
                                        <FormControlLabel
                                            key={op}
                                            control={<Checkbox
                                                // checked={isAns(op)}
                                                onChange={(e) => handleChecked(op, e.target.checked, i)}
                                            />}
                                            label={op}
                                        />
                                    ))
                                }


                                <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
                                    select
                                </Button>
                            </FormControl>
                        </form>

                    }


                    {questions[activeStep]?.types === "blanks" &&
                        <form onSubmit={(e) => handleSubmit(e, questions[activeStep]?.types)}>
                            <FormControl
                                sx={{ m: 3 }}
                                component="fieldset"

                                variant="standard"
                            >
                                <TextField onChange={handleRadioChange} id="input-with-sx" label="Write here" variant="standard" />

                                <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
                                    select
                                </Button>
                            </FormControl>
                        </form>

                    }

                </Box>

                <Divider />


            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3, mt: 2 }}>
                <Button onClick={showCharts} variant="contained" size="small" disabled={userAns.length === 5 ? false : true}>
                    See Results
                </Button>
            </Box >

            {
                loadCharts && <Box>
                    <Typography align='center' variant='h4'>Your Score:- {finalScore}/{questions.length}</Typography>
                    <Typography align='center' variant='h5'>Your Answers:-</Typography>
                    <ol>
                        {userAns?.map(ans => <li>{ans}</li>)}
                    </ol>
                    <Typography align='center' variant='h5'>Write Answers:-</Typography>
                    <ol>
                        {questions?.map(ans => <li>{ans.ans.join()}</li>)}
                    </ol>
                </Box>
            }


            {
                loadCharts &&
                <Box>
                    <Typography align='center' variant='h4'> <span style={{ color: "green" }}>Write={writeAns}</span> <span style={{ color: "red" }}>Wrong={wrongAns}</span></Typography>
                    <div
                        style={{
                            width: "400px",
                            height: "400px",
                            backgroundImage: `conic-gradient(green 0deg ${deg(writeAns, wrongAns)}deg
                            , red ${deg(writeAns, wrongAns)}deg 360deg)`,
                            borderRadius: "50%",
                            margin: "auto"
                        }}
                    />
                </Box>
            }


        </Box>

    );
}
export default Question;