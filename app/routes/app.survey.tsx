import {Page, Badge, LegacyCard, Grid, FormLayout, TextField, Select, Button} from '@shopify/polaris';

import React, { useState } from 'react';
 
  
  
  
export default function Survey() {
  const [selectedNumber, setSelectedNumber] = useState("1"); 
  const [Response, setResponse] = useState<Array<{ type: string; responses: string[] }>>([]);
  //const [Answer, setAnswer] = useState<Array<{ NumQST: any;  responses: string[] }>>([]);
  const [selectedType, setSelectedType] = useState("Radio");
  const [NumQST, setNumQST] = useState(1); // Initialisez à "1" au lieu de "0"
  const numbers = Array.from({ length: parseInt(selectedNumber, 10) }, (_, index) => index + 1);
  const [addedQuestions, setAddedQuestions] = useState<number[]>([]);
  const isButtonDisabled = (NumQST: any) => addedQuestions.includes(NumQST);
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
    setResponse([...Response, { type: selectedType, responses: Array(4).fill('') }]);
    setNumQST(num + 1); // Mettez à jour le numéro de la question ajoutée
    setAddedQuestions([...addedQuestions, num]);
  };
  const handleAnswerValidation = (questionIndex: number) => {
    const updatedResponse = [...Response];
    updatedResponse[questionIndex] = { ...updatedResponse[questionIndex], responses: Response[questionIndex].responses };
    setResponse(updatedResponse);
    console.log(Response);
    console.log(addQuestion);
  };
  const types=['Radio','checkbox','text'];
    const options = Array.from({ length: 10 }, (_, index) => ({
      label: (index + 1).toString(),
      value: (index + 1).toString(),
    }));
  return (
    <Page
      backAction={{content: 'Products', url: '#'}}
      title="Add a survey"
      titleMetadata={<Badge tone="attention">Verified</Badge>}
      primaryAction={{content: 'Save', disabled: true}}
      secondaryActions={[
        {content: 'Duplicate'},
        {content: 'View on your store'},
      ]}
      pagination={{
        hasPrevious: true,
        hasNext: true,
      }}
    >
      <Page fullWidth>
      <Grid>
        <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
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
{
  selectedType === 'Radio' || selectedType === 'checkbox' ? (
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
            <><TextField
              key={number}
              label={`Question number ${number}`}
              type="text"
              placeholder={`Input ${number}`}
              autoComplete="off" />
              <Button onClick={()=>addQuestion(number)}
              disabled={isButtonDisabled(number)} 
              
              >Add Question</Button></>
          ))}
           
      </div>
    </div>
  ) : null
}

      </LegacyCard>
    </FormLayout>
          </LegacyCard>
        </Grid.Cell>
        <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
       {selectedType === 'Radio' || selectedType === 'checkbox' ? (
  <div>
    {Response.map((response, questionIndex) => (
      <LegacyCard key={questionIndex} title={`Answer${NumQST - 1}`} sectioned>
        {Array.from({ length: 4 }, (_, innerResponseIndex) => (
          <TextField
            key={innerResponseIndex}
            label={`Answer ${innerResponseIndex + 1}`}
            type="text"
            placeholder={`Input Answer ${innerResponseIndex + 1}`}
            autoComplete="off"
            value={response.responses[innerResponseIndex]}
            onChange={(value) => handleResponseChange(questionIndex, innerResponseIndex, value)}
          />
        ))}
        <Button onClick={() => handleAnswerValidation(questionIndex)}>Valid the Answer</Button>
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

