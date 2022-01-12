import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history'

import Question from '../Pages/Question/Question';

test('renders learn react link', () => {
    const history = createMemoryHistory();
    const language: string = "language";
    history.push(`/quiz/${language}`)


    render(<Question />);
    const linkElement = screen.getByTestId("ques");
    expect(linkElement).toBeInTheDocument();
});
