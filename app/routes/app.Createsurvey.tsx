import { Page, Badge, LegacyCard, Grid, FormLayout, TextField, Select, Button } from '@shopify/polaris';
import React, { useCallback, useState } from 'react';
import {ExternalIcon} from '@shopify/polaris-icons';
import db from "../db.server"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { json} from '@remix-run/node';
import type { ActionFunction,  LoaderFunction } from '@remix-run/node';
import { Form, useSubmit } from '@remix-run/react';
//import { PrismaClient } from "@prisma/client";
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get('title');

  const questions = [];
  let questionIndex = 0;

  while (formData.has(`questions[${questionIndex}][content]`)) {
    const content = formData.get(`questions[${questionIndex}][content]`);
    const questionType = formData.get(`questions[${questionIndex}][question_type]`);

    const responses = [];
    let responseIndex = 0;

    while (formData.has(`questions[${questionIndex}][responses][${responseIndex}][content]`)) {
      const responseContent = formData.get(`questions[${questionIndex}][responses][${responseIndex}][content]`);
      responses.push({ content: responseContent });
      responseIndex++;
    }

    questions.push({ content, question_type: questionType, responses });
    questionIndex++;
  }

  // Maintenant, vous avez un objet avec les données du formulaire que vous pouvez utiliser pour créer le sondage.
  //console.log(questions);
 /*
  questions.forEach((question, index) => {
    console.log(`Question ${index + 1}:`);
    console.log(`Content: ${question.content}`);
    console.log(`Type: ${question.question_type}`);
    
    console.log("Responses:");
    question.responses.forEach((response, responseIndex) => {
      console.log(`  Response ${responseIndex + 1}: ${response.content}`);
      
    });
  });*/
  
  try {
    // Créer le sondage
    const survey = await db.survey.create({
      data: {
        title,
      },
    });

    // Créer les questions et les réponses
    for (const questionData of questions) {
      const question = await prisma.question.create({
        data: {
          content: questionData.content,
          question_type: questionData.question_type,
          survey: {
            connect: { survey_id: survey.survey_id },
          },
           // Remplacez par le type de question approprié
        },
      });

      // Créer les réponses pour chaque question
      for (const responseContent of questionData.responses) {
        await db.response.create({
          data: {
            content: responseContent.content,
            question: {
              connect: { question_id: question.question_id },
            },
            survey: {
              connect: { survey_id: survey.survey_id },
            },
          },
        });
      }
    }

  

  
    
    console.log("New survey created:",  survey , 
                '/question',questions );
  
  
    // Retournez une réponse appropriée ici si nécessaire
  } catch (error) {
    console.error("Error creating survey:", error);
    throw error;
  }
   

  
  // Retournez une réponse appropriée ici si nécessaire
  return null
}



 /* const newSurvey=await db.survey.create({
    data: {
      title: surveyData.title,
      questions: {
        create: surveyData.questions.map((question: { content: any; question_type: any; responses: any[]; }) => ({
          content: question.content,
          question_type: question.question_type,
          responses: {
            create: question.responses.map((response, index) => ({
              content: response.content,
              // Assurez-vous que le nom du champ correspond à votre modèle Prisma
            })),
          },
        })),
      },}
  })}
   console.log("New survey created:", newSurvey);*/
  


export let loader: LoaderFunction = async ({ request }) => {
  // Assuming you receive survey data in the request
  // Disconnect Prisma client after use
  return null
};

export default function CreateSurvey() {
  const [selectedNumber, setSelectedNumber] = useState("1");
  const [TitleSurvey, setTitleSurvey] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [Action, setAction] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [surveyData, setSurveyData] = useState({});
  
  const [Question, setResponse] = useState<Array<{
    question: string;
    type: string;
    responses: string[];
    isQuestionOpen: boolean;
    isValidated: boolean;
  }>>([]);
  const [questionTextValues, setQuestionTextValues] = useState<string[]>(Array(10).fill(''));
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    const updatedResponse = [...Question];
    updatedResponse[questionIndex].responses[responseIndex] = value;
    setResponse(updatedResponse);
  };
  const submit = useSubmit();


  const addQuestion = (num: any) => {
    setResponse([
      ...Question,
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
  };
  const handleAnswerValidation = (questionIndex: number) => {
    setIsQuestionValidated((prevState: any) => {
      const newState = [...prevState];
      newState[questionIndex] = true;
      return newState;
    });
    setIsQuestionFormOpen((prevState: any) => {
      const newState = [...prevState];
      newState[questionIndex] = false;
      return newState;
    });
    
    console.log("Validation réussie pour la question", questionIndex + 1);
  };
  


  const types = ['Radio', 'checkbox', 'text'];
  const options = Array.from({ length: 10 }, (_, index) => ({
    label: (index + 1).toString(),
    value: (index + 1).toString(),
  }));
  const handleChange =useCallback (
    (newValue: string) => setTitleSurvey(newValue),
    [],
  ) 
   
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  //console.log(surveyData)
  const Save = async () => {
    const formData = new FormData();
    formData.append('title', TitleSurvey);
  
    // Ajoutez chaque question et ses réponses au formulaire
    Question.forEach((questionItem: { question: string | Blob; type: string | Blob; responses: any[]; }, questionIndex: any) => {
      formData.append(`questions[${questionIndex}][content]`, questionItem.question);
      formData.append(`questions[${questionIndex}][question_type]`, questionItem.type);
  
      questionItem.responses.forEach((response, responseIndex) => {
        formData.append(`questions[${questionIndex}][responses][${responseIndex}][content]`, response);
      });
    });
  
    // Utilisez le formulaire pour envoyer les données
    submit(formData, { method: "post" });
  
    // Effectuez d'autres opérations après l'enregistrement réussi
  };
  
    
  
  return (
   
    <><Page
      title="Add a survey"
      titleMetadata={<Badge tone="attention">Verified</Badge>}
      primaryAction={{ content: 'Save', disabled: Action, onAction: Save }} 
      secondaryActions={[
        {
          content: 'list the survey',
          external: true,
          icon: ExternalIcon,
          url: 'https://www.facebook.com/business/learn/facebook-page-build-audience',
        },
      ]}
    > 
      <Page fullWidth>
        <Grid>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
            <LegacyCard title="Survey" sectioned>
              <FormLayout>
                <TextField label="Title" onChange={handleChange} value={TitleSurvey} autoComplete="off" />
                <LegacyCard title="Question" sectioned>



                  <Select
                    label="Select the number of questions:"
                    options={options}
                    onChange={(selected: string) => handleNumberChange(selected)}
                    value={selectedNumber} />
                  <div>
                    {parseInt(selectedNumber, 10) > 0 &&
                      numbers.map((number) => (
                        // eslint-disable-next-line react/jsx-key
                        <LegacyCard title={`Question number ${number}`} key={number} sectioned>


                          <Select
                            label="Select the type of questions:"
                            options={types}
                            onChange={(selected: string) => handleTypeChange(selected)}
                            value={selectedType} />
                          <TextField
                            label='write your question'
                            type="text"
                            placeholder={`Input ${number}`}
                            value={questionTextValues[number - 1]}
                            onChange={(value: any) => {
                              const updatedValues = [...questionTextValues];
                              updatedValues[number - 1] = value;
                              setQuestionTextValues(updatedValues);
                            } }
                            autoComplete="off" />
                          <Button
                            onClick={() => addQuestion(number)}
                            disabled={addedQuestions.includes(number)}
                          >
                            Add Question
                          </Button>
                        </LegacyCard>
                      ))}

                  </div>

                </LegacyCard>
              </FormLayout>
            </LegacyCard>
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
            {isFormOpen && (selectedType === 'Radio' || selectedType === 'checkbox') ? (
              <div>
                {Question.map((question: { question: any; responses: any[]; }, questionIndex: number) => (
                  <LegacyCard key={questionIndex} title={`Answer${NumQST - 1}`} sectioned>
                    {isQuestionValidated[questionIndex] ? (
                      <div>
                        <p>{`Question: ${question.question}`}</p>
                        {Array.from({ length: 4 }, (_, innerResponseIndex: any) => (
                          <div key={innerResponseIndex}>
                            <TextField
                              label={`Answer ${innerResponseIndex + 1}`}
                              type="text"
                              placeholder={`Input Answer ${innerResponseIndex + 1}`}
                              autoComplete="off"
                              value={question.responses[innerResponseIndex]}
                              onChange={(value: string) => handleResponseChange(questionIndex, innerResponseIndex, value)} />
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
                              onChange={(value) => handleResponseChange(questionIndex, innerResponseIndex, value)} />
                          </div>
                        ))}
                        <Button
                          onClick={() => {
                            handleAnswerValidation(questionIndex);
                          } }
                          disabled={isQuestionValidated[questionIndex]}
                        >
                          Valider la réponse
                        </Button>
                      </div>
                    )}

                  </LegacyCard>
                ))}
              </div>
            ) : null}
          </Grid.Cell>
          <Form method="post">
    <Button onClick={()=> setAction(false)} >save all</Button>
  </Form>
        </Grid>
      </Page>
    </Page>
    </>
  
  );
}



