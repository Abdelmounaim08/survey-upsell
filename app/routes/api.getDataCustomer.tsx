import { json } from "@remix-run/node";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { dataCustomer } from "~/model/survey.server";

export const loader: LoaderFunction = async ({ request }) => { await authenticate.public.checkout(request);
};

export const action: ActionFunction = async ({ request }) => { 
    const { cors }: any = await authenticate.public.checkout(request); 
    // Récupérer le corps de la demande 
    const requestBody = await request.json(); 
    dataCustomer(requestBody)
    console.log('request est passer bien!')
    // Répondre avec le corps de la demande 
    return cors(json(requestBody));
};