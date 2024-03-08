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