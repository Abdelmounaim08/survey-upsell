// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { json } from "@remix-run/node";
import db from "../db.server"
export async function Survey() {
    const getSurvey = await db.survey.findMany({
              where:{render:true},
              
              select:{
                survey_id:true,
                title:true,
                questions :true,
                 render:true,
                 responses:true,
              }
            });
    if(!getSurvey){
              return null
    }
    return getSurvey

}
export async function reponseSurve(id: any) {
    const getResSurvey = await db.response.findMany({
              
              where:{survey_id:id },
              select:{
                content:true,
                question_id:true
            
              }
            });
    if(!getResSurvey){
              return null
    }
    return getResSurvey

}
export async function ListSurvey() {
  const getSurvey = await db.survey.findMany({
            
            
            select:{
              survey_id:true,
              title:true,
              questions :true,
               render:true,
               responses:true,
            }
          });
  if(!getSurvey){
            return null
  }
  return getSurvey

}
export async function deleteSurv(id: number) {
  const delSurvey = await db.survey.delete({where:{survey_id:id}}
            
          
  )
  if(!delSurvey){
    return null
}
return delSurvey
}
export async function dataCustomer(dataCustomer: any) {
  try {
    //const { customer, orderId, qst_rep } = dataCustomer;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const getSurveyid = await db.survey.findMany({
      where: {
        render: true,
      },
      select: {
        survey_id: true,
      },
    });

    //const surveyId = 1;
     // ID du survey existant

const dataClient = await prisma.dataClient.create({
  data: {
    email: "", // Valeur de l'email
    id_order: 1, // Valeur de l'id_order
    survey: {
      connect: {
        survey_id: getSurveyid[0].survey_id // Connectez le DataClient à un survey existant avec l'ID de survey
      }
    },
    user_response: "" // Valeur de user_response
  }
});

console.log("DataClient created:", dataClient);
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const questionReponses = [
      {
        question_id: 1, // ID de la question
        question: {
          connect: {
            question_id: 1 // Connectez la question existante avec l'ID de question
          }
        },
        reponse: "good" // Valeur de la réponse
      },
      {
        question_id: 2, // ID de la question
        question: {
          connect: {
            question_id: 2 // Connectez la question existante avec l'ID de question
          }
        },
        reponse: 'good' // Valeur de la réponse sous forme de chaîne JSON
      },{
        question_id: 3, // ID de la question
        question: {
          connect: {
            question_id: 3// Connectez la question existante avec l'ID de question
          }
        },
        reponse: 'devloper' // Valeur de la réponse sous forme de chaîne JSON
      }
    ];
    
    const createdQuestionReponses = [];
    
  
      const createdQuestionReponse = await prisma.questionReponse.create({
        data: {
          question_id: 1,
          dataClient: {
            connect: {
              dataClientId: 4
            }
          },
          reponse: "no",
          question: {
            connect: {
              question_id:  1 // ID de la question existante
            }
          }
        }
        
      });
      createdQuestionReponses.push(createdQuestionReponse);
    
    
    console.log("DataClient created:", dataClient);
    console.log("QuestionReponses created:", createdQuestionReponses);
    // Retournez une réponse appropriée ici si nécessaire
  } catch (error) {
    console.error('Error creating DataClient:', error);
    
  }
}