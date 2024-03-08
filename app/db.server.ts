import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient;
}

const prisma: PrismaClient = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
}

export default prisma;
/*useEffect(() => {
    async function FetchfromApisSurvey() {
      const token = await sessionToken.get();
      try {
        const response = await fetch(`${APP_URL}/api/survey`,
          {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
  
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des sondages');
        }
  
        const surveyData = await response.json();
        console.log('Survey//', surveyData);
  
        // Mettez à jour l'état avec le tableau de sondages
        setSurvey(surveyData.surveys);
        console.log('Survey1/', Survey); // Accédez à surveyData.surveys au lieu de Survey ici
  
        return surveyData;
      } catch (error) {
        console.error('Erreur lors de la récupération des sondages :', error);
        // Gérer l'erreur ici ou la propager vers le haut
      }
    }
  
    FetchfromApisSurvey();
    console.log(Survey);
  }, [Survey, sessionToken])
  */