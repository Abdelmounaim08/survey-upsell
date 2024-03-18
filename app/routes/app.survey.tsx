import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import {  Form, useLoaderData, useSubmit } from "@remix-run/react";
import { Button, InlineGrid, LegacyCard, Page } from "@shopify/polaris";
import { useState, type ReactNode } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { JSX } from "react/jsx-runtime";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ListSurvey ,reponseSurve ,deleteSurv} from "~/model/survey.server";
import { authenticate } from "~/shopify.server";
import db from "../db.server"


export type LoaderDataprops = {
  render:boolean
  IDsurvey:Number
  IDsurveyDel:Number
  Delete:boolean
  updated:boolean
}
export const action:ActionFunction = async ({request}) =>{

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { session } = await authenticate.admin(request);    
  
  const data = {
        ...Object.fromEntries(await request.formData()),
      };
  const render  = data.render == "true" ;
  //const Delete  = data.Delete == "true" ;
 // const updated  = data.updated == "true" ;
  const IDsurvey = Number(data.IDsurvey);
  //const IDsurveyDel = Number(data.IDsurveyDel);

  const updatedSurvey = await db.survey.update({
                              where: { survey_id: IDsurvey },
                              data: { 
                                render: render,
                               
                               },
                            });
       console.log(updatedSurvey)
       if (render) {
        const updatedOtherSurveys = await db.survey.updateMany({
          where: { survey_id: { not: IDsurvey } },
          data: {
            render: false,
          },
        });
        console.log(updatedOtherSurveys)
    return null
}}



export let loader: LoaderFunction = async ({ request }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { session } = await authenticate.admin(request);
    const AllSurvey :any = await ListSurvey();
 
    return AllSurvey;
  };
  
  
 

export default function Survey() {
    const survey:any = useLoaderData();
    const [render,setRender]=useState(false);
   
    const [IDsurvey,setIDsurvey]=useState<number | undefined>();
    const [IDsurveyDel,setIDsurveyDel]=useState<number | undefined>();
    const [disable,setdisable]=useState(true);
    const [Delete,setdelete]=useState(false);
    const submit = useSubmit();
    
    function RenderSurvey(id:Number) {
      setRender(true);
      setIDsurvey(id);
      setdisable(false);
  
      console.log('disable :',disable,'/IDsurvey',IDsurvey,"render",render)
    }
    function deleteSu(id:Number) {
    
      setIDsurveyDel(id);
      setdelete(true);
      setdisable(false);
    }
    
    
    function handleSave() {
      const data = {
        render:  Boolean(render),
        IDsurvey:Number(IDsurvey),
        IDsurveyDel:Number(IDsurveyDel),
        delete:  Boolean(Delete),
      };
      
      submit(data, { method: "post" });
    }
    const SpacingBackground = ({
      children,
      width = '100%',
      height = '700px', // Ajout d'une prop de hauteur
    }: {
      children: React.ReactNode;
      width?: string;
      height?: string;
    }) => {
      return (
        <div
          style={{
            width: 'auto',
            height: 'auto',
            display:"flow-root",
            
            flex:'700px' // Utilisation de la hauteur fournie
          }}
        >
          {children}
        </div>
      );
    };
    return (
      <>
        <Page
          title="List of  surveys"
          primaryAction={{ content: 'Save', disabled: disable, onAction: handleSave }} 
          secondaryActions={{ content: 'delete', disabled: true, onAction: deleteSu }}
        > 
        <div>
          
          
<SpacingBackground>
  <InlineGrid gap="400" columns={2}>
    {survey.map((surveyItem: {
      survey_id: number;
      render: any;
      title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined;
      questions: any[];
    }) => {
      console.log(surveyItem.render);
      return (
        <div key={surveyItem.survey_id}>
          <LegacyCard title={surveyItem.title} sectioned>
            <div>
              <Form method="post">
                <Button textAlign="end" variant="primary" tone="success" onClick={() => RenderSurvey(surveyItem.survey_id)}>
                  Rendre Survey
                </Button>
                <Button textAlign="end" variant="primary" tone="critical" onClick={() => deleteSu(surveyItem.survey_id)}>
                  delete Survey
                </Button>
              </Form>
            </div>
            <p>Render: {surveyItem.render ? 'true' : 'false'}</p>
            <p>Total Questions: {surveyItem.questions.length}</p>
            <p>Questions:</p>
            <div style={{height:'220px'}}>
            {surveyItem.questions.map((question) => (
              <div key={question.question_id}> 
                <LegacyCard subdued >
                  
                <LegacyCard.Section>  
                   <p>Content: {question.content}</p>
                   
                     <p>Question Type: {question.question_type}</p>
                     </LegacyCard.Section> 
                </LegacyCard>
              </div>
            ))}</div>
          </LegacyCard>
        </div>
      );
    })}
  </InlineGrid>
</SpacingBackground>


           
        </div>
        </Page>
      </>
    );
  }


  