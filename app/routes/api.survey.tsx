import { json } from "@remix-run/node";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { Survey, reponseSurve } from "~/model/survey.server";

export const loader: LoaderFunction = async ({ request }) => {
  await authenticate.public.checkout(request);
  const { cors }: any = await authenticate.public.checkout(request);
  const surveys: any = await Survey();

  // Récupérez les réponses pour chaque question dans chaque sondage
  const surveysWithResponses = await Promise.all(
    surveys.map(async (survey: { questions: any[]; survey_id: number }) => {
      const responses = await Promise.all(
        survey.questions.map(async (question) => {
          const filteredResponses = (await reponseSurve(survey.survey_id))?.filter(
            (response: { question_id: number }) => response.question_id === question.question_id
          ) || [];
          

          return {
             filteredResponses,
          };
        })
      );
      return {
        ...survey,
        responses,
      };
    })
  );

  return cors(json({ surveys: surveysWithResponses }));
};

