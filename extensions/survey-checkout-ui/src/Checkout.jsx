/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-key */
import {
  reactExtension,
  BlockStack,
  View,
  Heading,
  Text,
  ChoiceList,
  Choice,
  Button,
  useStorage,
  useApi,
} from '@shopify/ui-extensions-react/checkout';
import { TextField } from '@shopify/ui-extensions/checkout';
import {useCallback, useEffect, useState} from 'react';
// Allow the attribution survey to display on the thank you page.
const thankYouBlock = reactExtension("purchase.thank-you.block.render", () => <Attribution />);
export { thankYouBlock };

const orderDetailsBlock = reactExtension("customer-account.order-status.block.render", () => <ProductReview />);
export { orderDetailsBlock };
const APP_URL="https://techniques-apartments-ins-pipeline.trycloudflare.com";
// eslint-disable-next-line no-unused-vars


function Attribution() {
  const [attribution, setAttribution] = useState('');
  const [loading, setLoading] = useState(false);
  const {sessionToken}=useApi();
  const [SurveyData, setSurveyData] = useState({});
  
  // Store into local storage if the attribution survey was completed by the customer.
  const [attributionSubmitted, setAttributionSubmitted] = useStorageState('attribution-submitted');
  console.log('Survey//* :', SurveyData);
  useEffect(()=>{
  
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
        throw new Error('Erreur lors de  la récupération des sondages');
      }
  
      const surveyData = await response.json();
      setSurveyData(surveyData.surveys);
      console.log('SurveyApi/* :', surveyData);
      
     
  
      return surveyData;
    } catch (error) {
      console.error('Erreur lors de la récupération des sondages :', error);
      // Gérer l'erreur ici ou la propager vers le haut
    }
  
}
FetchfromApisSurvey()

// eslint-disable-next-line react-hooks/exhaustive-deps
},[sessionToken])

  async function handleSubmit() {
    // Simulate a server request
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
      // Send the review to the server
      console.log('Submitted:', attribution);
      setLoading(false);
      setAttributionSubmitted(true)
      resolve();
    }, 750)});
  }

  // Hides the survey if the attribution has already been submitted
  if (attributionSubmitted.loading || attributionSubmitted.data === true) {
    return null;
  }

  return (
    <>
    
    <Survey title="How did you hear about us ?" surveyData={SurveyData} onSubmit={handleSubmit} loading={loading}>
      <ChoiceList
        name="sale-attribution"
        value={attribution}
        onChange={setAttribution}
      >
        <BlockStack>
          <Choice id="tv">TV</Choice>
          <Choice id="podcast">Podcast</Choice>
          <Choice id="family">From a friend or family member</Choice>
          <Choice id="tiktok">Tiktok</Choice>
        </BlockStack>
      </ChoiceList>
    </Survey></>
  );
}

function ProductReview() {
  const [productReview, setProductReview] = useState('');
  const [loading, setLoading] = useState(false);
  // Store into local storage if the product was reviewed by the customer.
  const [productReviewed, setProductReviewed] = useStorageState('product-reviewed')

  async function handleSubmit() {
    // Simulate a server request
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
      // Send the review to the server
      console.log('Submitted:', productReview);
      setLoading(false);
      setProductReviewed(true);
      resolve();
    }, 750)});
  }

  // Hides the survey if the product has already been reviewed
  if (productReviewed.loading || productReviewed.data) {
    return null;
  }

  return (
    <Survey
      title="How do you like your purchase?"
      description="We would like to learn if you are enjoying your purchase."
      onSubmit={handleSubmit}
      loading={loading}
    >
      <ChoiceList
        name="product-review"
        value={productReview}
        onChange={setProductReview}
      >
        <BlockStack>
          <Choice id="5">Amazing! Very happy with it.</Choice>
          <Choice id="4">It's okay, I expected more.</Choice>
          <Choice id="3">Eh. There are better options out there.</Choice>
          <Choice id="2">I regret the purchase.</Choice>
        </BlockStack>
      </ChoiceList>
    </Survey>
  );
}
function Survey({
  title,
  description,
  onSubmit,
  children,
  loading,
  surveyData,
}) {
  const [submitted, setSubmitted] = useState(false);
  const [responses, setResponses] = useState({});
  
  async function handleSubmit() {
    await onSubmit();
    setSubmitted(true);
  }

  const handleResponseChange = (questionId, value) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: value,
    }));
  };

  const renderResponses = (question) => {
    const questionId = question.question_id;
   //const filterRes=surveyData.response.filter((res)=>res.
   // eslint-disable-next-line array-callback-return
   
    if (question.question_type === 'text') {
      return (
        <TextField
          value={responses[questionId]?.content || ''}
          onChange={(e) => handleResponseChange(questionId, { content: e.target.value })}
        />
      );
    }
  
    // Checkbox or radio
    return (
      <ChoiceList
        name={`question-${questionId}`}
        selected={responses[questionId]?.content || []}
        onChange={(value) => handleResponseChange(questionId, { content: value })}
      >
        <BlockStack>
          {surveyData.responses.map((response) => (
            //console.log(response.res);
            response.res.map((res)=>{
              <Choice key={res.content} id={res.content}>
              {res.content}
            </Choice>
            })
            
          ))}
        </BlockStack>
      </ChoiceList>
    );
  };
  

  if (submitted) {
    return (
      <View border="base" padding="base" borderRadius="base">
        <BlockStack>
          <Heading>Thanks for your feedback!</Heading>
          <Text>Your response has been submitted</Text>
        </BlockStack>
      </View>
    );
  }

  return (
    <>
      {surveyData.length > 0 ? (
        surveyData.map((surveyItem, index) => (
          <View key={index} border="base" padding="base" borderRadius="base">
            <BlockStack>
              <Heading>{surveyItem.title}</Heading>
              <Text>{title}</Text>
              <Text>{description}</Text>
              {children}
            
              {surveyItem.questions.map((question) => (
                
              <View key={question.question_id} padding="base">
                <Heading>{question.content}</Heading>
                {renderResponses(question)}
              </View>
            ))}
              <Button kind="secondary" onPress={handleSubmit} loading={loading}>
                Submit feedback
              </Button>
            </BlockStack>

            {/* Afficher les réponses de chaque question */}
            
          </View>
        ))
      ) : (
        <View border="base" padding="base" borderRadius="base">
          <BlockStack>
            <Heading>{title}</Heading>
            <Text>{description}</Text>
            {children}
            <Button kind="secondary" onPress={handleSubmit} loading={loading}>
              Submit feedback
            </Button>
          </BlockStack>
        </View>
      )}
    </>
  );
}

/*function Survey({
  title,
  description,
  onSubmit,
  children,
  loading,
  surveyData,
}) {
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit() {
    await onSubmit();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <View border="base" padding="base" borderRadius="base">
        <BlockStack>
          <Heading>Thanks for your feedback!</Heading>
          <Text>Your response has been submitted</Text>
        </BlockStack>
      </View>
    );
  }

  return (
    <>
    
    {surveyData.length > 0 ? (
        surveyData.map((surveyItem, index) => (
          <View key={index} border="base" padding="base" borderRadius="base">
            <BlockStack>
              <Heading >{surveyItem.title}</Heading >
              <Text>{surveyItem.questions[0].content}</Text>
              <Text>{description}</Text>
              {children}
              <Button kind="secondary" onPress={handleSubmit} loading={loading}>
                Submit feedback
              </Button>
            </BlockStack>
          </View>
        ))
      ) : (
        <View border="base" padding="base" borderRadius="base">
          <BlockStack>
            <Heading>{title}</Heading>
            <Text>{description}</Text>
            {children}
            <Button kind="secondary" onPress={handleSubmit} loading={loading}>
              Submit feedback
            </Button>
          </BlockStack>
        </View>
      )}
   
  </>
  );
}*/

/**
 * Returns a piece of state that is persisted in local storage, and a function to update it.
 * The state returned contains a `data` property with the value, and a `loading` property that is true while the value is being fetched from storage.
 */
function useStorageState(key) {
  const storage = useStorage();
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function queryStorage() {
      const value = await storage.read(key)
      setData(value);
      setLoading(false)
    }

    queryStorage();
  }, [setData, setLoading, storage, key])

  const setStorage = useCallback((value) => {
    storage.write(key, value)
  }, [storage, key])

  return [{data, loading}, setStorage]
}
