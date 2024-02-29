import { Page, Badge, LegacyCard, Grid, FormLayout, TextField, Select, Button } from '@shopify/polaris';
import { Console } from 'console';
import React, { useState } from 'react';

export default function Survey() {
  const [selectedNumber, setSelectedNumber] = useState("1");
  const [Response, setResponse] = useState<Array<{
    question: string;
    type: string;
    responses: string[];
    isQuestionOpen: boolean;
    isValidated: boolean;
  }>>([]);
  const [questionTextValues, setQuestionTextValues] = useState<string[]>(Array(10).fill(''));
  const [isFormOpen, setIsFormOpen] = useState(true);
const [isQuestionValidated, setIsQuestionValidated] = useState<boolean[]>(Array(Response.length).fill(false));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const [isQuestionFormOpen, setIsQuestionFormOpen] = useState<boolean[]>(Array(Response.length).fill(true));
const [selectedType, setSelectedType] = useState("Radio");
  const [NumQST, setNumQST] = useState(1);
  const numbers = Array.from({ length: parseInt(selectedNumber, 10) }, (_, index) => index + 1);
  const [addedQuestions, setAddedQuestions] = useState<number[]>([]);

  const handleNumberChange = (selected: string) => {
    setSelectedNumber(selected);
  };

  const handleTypeChange = (selected: string) => {
    setSelectedType(selected);
  };

  const handleResponseChange = (questionIndex: number, responseIndex: number, value: string) => {
    const updatedResponse = [...Response];
    updatedResponse[questionIndex].responses[responseIndex] = value;
    setResponse(updatedResponse);
  };

  const addQuestion = (num: any) => {
    setResponse([
      ...Response,
      {
        question: questionTextValues[num - 1],
        type: selectedType,
        responses: Array(4).fill(''),
        isQuestionOpen: true,
        isValidated: false,
      },
    ]);
    setIsQuestionValidated([...isQuestionValidated, false]);
    setNumQST(num + 1);
    setAddedQuestions([...addedQuestions, num]);
    console.log(Response);
  };
  const handleAnswerValidation = (questionIndex: number) => {
    setIsQuestionValidated((prevState) => {
      const newState = [...prevState];
      newState[questionIndex] = true;
      return newState;
      console.log(newState);
    });
    setIsQuestionFormOpen((prevState) => {
      const newState = [...prevState];
      newState[questionIndex] = false;
      return newState;
    });
    console.log("Validation réussie pour la question", questionIndex + 1);
  };
  

  const handleNextQuestion = () => {
    setIsFormOpen(true);
    setNumQST(NumQST + 1);
  };

  const types = ['Radio', 'checkbox', 'text'];
  const options = Array.from({ length: 10 }, (_, index) => ({
    label: (index + 1).toString(),
    value: (index + 1).toString(),
  }));

  return (
    <Page
      title="Add a survey"
      titleMetadata={<Badge tone="attention">Verified</Badge>}
    >
      <Page fullWidth>
        <Grid>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
            <LegacyCard title="Survey" sectioned>
              <FormLayout>
                <TextField label="Title" onChange={() => {}} autoComplete="off" />
                <LegacyCard title="Question" sectioned>
                  <Select
                    label="Sélectionnez un type:"
                    options={types}
                    onChange={(selected) => handleTypeChange(selected)}
                    value={selectedType}
                  />
                  (
                    <div>
                      <Select
                        label="Sélectionnez un nombre:"
                        options={options}
                        onChange={(selected) => handleNumberChange(selected)}
                        value={selectedNumber}
                      />
                      <div>
                        {parseInt(selectedNumber, 10) > 0 &&
                          numbers.map((number) => (
                            <div key={number}>
                              <TextField
                                label={`Question number ${number}`}
                                type="text"
                                placeholder={`Input ${number}`}
                                value={questionTextValues[number - 1]}
                                onChange={(value) => {
                                  const updatedValues = [...questionTextValues];
                                  updatedValues[number - 1] = value;
                                  setQuestionTextValues(updatedValues);
                                }}
                                autoComplete="off"
                              />
                              <Button
                                onClick={() => addQuestion(number)}
                                disabled={addedQuestions.includes(number)}
                              >
                                Add Question
                              </Button>
                            </div>
                          ))}
                      </div>
                    </div>
                  
                </LegacyCard>
              </FormLayout>
            </LegacyCard>
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
  {isFormOpen && (selectedType === 'Radio' || selectedType === 'checkbox') ? (
    <div>
      {Response.map((question, questionIndex) => (
        <LegacyCard key={questionIndex} title={`Answer${NumQST - 1}`} sectioned>
          {isQuestionValidated[questionIndex] ? (
            <div>
              <p>{`Question: ${question.question}`}</p>
              {Array.from({ length: 4 }, (_, innerResponseIndex) => (
                <div key={innerResponseIndex}>
                  <TextField
                    label={`Answer ${innerResponseIndex + 1}`}
                    type="text"
                    placeholder={`Input Answer ${innerResponseIndex + 1}`}
                    autoComplete="off"
                    value={question.responses[innerResponseIndex]}
                    onChange={(value) => handleResponseChange(questionIndex, innerResponseIndex, value)}
                  />
                </div>
              ))}
              <Button onClick={() => alert('Validation réussie pour la question')}>
                Afficher une alerte
              </Button>
            </div>
          ) : (
            <div>
              <p>{`Question: ${question.question}`}</p>
              {Array.from({ length: 4 }, (_, innerResponseIndex) => (
                <div key={innerResponseIndex}>
                  <TextField
                    label={`Answer ${innerResponseIndex + 1}`}
                    type="text"
                    placeholder={`Input Answer ${innerResponseIndex + 1}`}
                    autoComplete="off"
                    value={question.responses[innerResponseIndex]}
                    onChange={(value) => handleResponseChange(questionIndex, innerResponseIndex, value)}
                  />
                </div>
              ))}
              <Button
                onClick={() => {
                  handleAnswerValidation(questionIndex);
                }}
                disabled={isQuestionValidated[questionIndex]}
              >
                Valider la réponse
              </Button>
            </div>
          )}
          <Button
            onClick={() => {
              setIsFormOpen(false);
              setIsQuestionValidated((prevState) => {
                const newState = [...prevState];
                newState[questionIndex] = true;
                return newState;
              });
              handleNextQuestion();
            }}
            disabled={!isQuestionValidated[questionIndex]}
          >
            Question suivante
          </Button>
        </LegacyCard>
      ))}
    </div>
  ) : null}
</Grid.Cell>

        </Grid>
      </Page>
    </Page>
  );
}
