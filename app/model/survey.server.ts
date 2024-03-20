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
    const { customer, orderId, qst_rep } = dataCustomer;
    const getSurveyid = await db.survey.findMany({
      where: {
        render: true,
      },
      select: {
        survey_id: true,
      },
    });

    const dataClient = await prisma.dataClient.create({
      data: {
        email: customer.email,
        id_order: orderId,
        survey: {
          create: {
            survey_id: getSurveyid[0].survey_id, // Assuming you want to use the first survey_id from the result
          },
        },
        question_rep: {
          createMany: {
            data: qst_rep.map((response: any) => ({
              question_id: response.question_id,
              question: response.question,
              response: response.response,
            })),
          },
        },
      },
      include: {
        survey: true,
        question_rep: true,
      },
    });

    console.log('New DataClient created:', dataClient);

    // Retournez une réponse appropriée ici si nécessaire
  } catch (error) {
    console.error('Error creating DataClient:', error);
    throw error;
  }
}