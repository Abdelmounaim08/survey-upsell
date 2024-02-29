import {  BlockStack, Box, Card, InlineGrid,Button ,TextField, Page, Select,Text, ChoiceList } from '@shopify/polaris';
import {useState, useCallback} from 'react';
import {PlusIcon,DuplicateIcon,ArchiveIcon,DeleteIcon} from '@shopify/polaris-icons';
import type { Type } from '@shopify/polaris/build/ts/src/components/TextField';
 type InputT =  {
  id :number,
  type:Type | undefined,
  label:string, 
  Required:boolean
 };
 type SurveyType = {
  title: string;
  type: string;
  subtitle:string;
  inputes: InputT[]; // Array of InputType
};

export default function ResourceDetailsLayout() {

  
  const [survey,setsurvey] = useState<SurveyType>({title:"Survey Form",subtitle:"SubTitle Survey Form",type:"form",inputes:[{id :1,type:"text",label:"Title Field ", Required:false}]});
  const TypesOfinputes = [
    {label: 'Short Answer', value: "text"},
    {label: 'Date', value: "date"},
    {label: 'Email', value: "email"},
    // {label: 'Dropdown', value: 'dropdown'},
    // {label: 'Checkbox', value: 'checkbox'},

  ];
  const handleChange = useCallback(
   (newValue: string) => setsurvey(prevState =>({
          ...prevState,title:newValue
        })), [],
    );
  const handleChangeField = 
      (newValue: string,idField: number) => {
        const UpdatedInputes = survey.inputes.map(input => {
          if (input.id ==idField) {
            return {...input , label:newValue};
          }
          return input;
        })  

        setsurvey(prevState =>({
               ...prevState,inputes:UpdatedInputes
             }))}

  const handleSelectChangeType =
   (TypeField: Type,idField:number) => {
        const UpdatedInputType = survey.inputes.map(input => {
          if (input.id == idField) {
            return {...input ,type:TypeField};
          }
          return input;
        });

        setsurvey(PrevState => (
          {
            ...PrevState,inputes:UpdatedInputType
          }
        ))

  }
  const AddNewField = () => {
    const InputeID = (survey.inputes.length) + 1 ;
    const newField:InputT = {id :(InputeID),type:"text",label:`input ${InputeID}`, Required:false};

    setsurvey(prev => ({
      ...prev,inputes:[...prev.inputes,newField]
    }))
    console.log(survey.inputes);
    
  }
function SelectFormType() {
  const [selected, setSelected] = useState('Form');
  const handleSelectChange = useCallback(
    (newValue: string) => setSelected(newValue), [],
       );

  const options = [
    {label: 'DropDown', value: 'DropDown'},
    {label: 'Form', value: 'Form'},
  ];

  return (
    <Select
      label="Select Format"
      options={options}
      onChange={handleSelectChange}
      value={selected}
    />
  );
}

  return (
    <Page
        backAction={{ content: "Products", url: "" }}
              title="Create new Survey "
              secondaryActions={[
                {
                  content: "Duplicate",
                  icon: DuplicateIcon,
                  accessibilityLabel: "Secondary action label",
                  onAction: () => alert("Duplicate action"),
                },
                {
                  content: "Archive",
                  icon: ArchiveIcon,
                  accessibilityLabel: "Secondary action label",
                  onAction: () => alert("Archive action"),
                },
                {
                  content: "Delete",
                  icon: DeleteIcon,
                  destructive: true,
                  accessibilityLabel: "Secondary action label",
                  onAction: () => alert("Delete action"),
                },
              ]}
              pagination={{
                hasPrevious: true,
                hasNext: true,
              }}
    >
      <InlineGrid columns={{ xs: 2, md: "2fr 2fr" }} gap="400">
        <BlockStack gap="400"> 
          <Card roundedAbove="sm">
            <BlockStack gap="400">
                <Text variant="headingLg" as="h5">
                        {"Survey Format "}
                </Text>
                <SelectFormType/>
                <Box borderRadius="300" minHeight="1rem" />
            </BlockStack>

             <BlockStack gap="400">
                    <Text variant="headingLg" as="h5">
                        {"Survey Content "}
                    </Text>  
                    <TextField
                    label="Form Title"
                    onChange={handleChange}
                    value={survey.title}
                    autoComplete="off"
                    />
                    <TextField
                    label="SubTitle"
                    onChange={handleChange}
                    autoComplete="off"
                    value={survey.subtitle}

                    />
                    <Box  borderRadius="300" minHeight="1rem" />
              </BlockStack> 

          {/* TODO: SURVEY FORM CREATE */}
              <BlockStack gap="400">
                    <Text variant="headingLg" as="h5">
                        {"Fields Content "}
                    </Text>  
                    {
                      survey.inputes.map((Input,i)=>{
                        return(

                         <BlockStack gap="400" key={i}>
                            <div style={{
                                borderBottom: '1px solid #000',
                                textAlign: 'center',
                                padding: '4px',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems:"center", // Aligns items to the start and end of the container
                            }}>
                                <div style={{
                                padding: '0px',
                                color:"green"

                                }}>
                                    Field {Input.id}
                                </div>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                }}>
                                    <Button icon={DeleteIcon}></Button>
                                </div>
                            </div>

                              {/* <Box borderRadius="200" minHeight="1rem" /> */}

                              <Select
                                label="Select type field "
                                options={TypesOfinputes}
                                onChange={(e:Type) =>{handleSelectChangeType(e,Input.id)}}
                                value={Input.type}
                              />  
                              <TextField
                              label="Field Title"
                              onChange={(e)=>{handleChangeField(e,Input.id)}}
                              value={survey.inputes[i].label}
                              autoComplete="off"
                              />
                                  <ChoiceList
                                    title="PRIORITY"
                                    choices={[
                                      {label: 'Optional', value: 'optional'},
                                      {label: 'Required', value: 'required'},
                                    ]}
                                    selected={['Optional']}
                                    // onChange={handleChange}
                                  />
                         </BlockStack>                       
                        )
                      })
                    }
                    <Button onClick={()=>{AddNewField()}}  variant="primary" tone="success" icon={PlusIcon}>Add Field In </Button>
              </BlockStack> 
          </Card>
              </BlockStack>
          {/* TODO: SURVEY TEST */}
                <BlockStack gap={{ xs: "400", md: "200" }}>
                  <Card roundedAbove="sm">
                    <BlockStack gap="500">
                      <div
                      style={{
                              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                              borderBottom: '1px solid #000',
                              border: "1px solid #ccc",
                              padding: '20px',
                            }}>
                              <BlockStack gap="500">
                          <Text variant="headingLg" as="h5">
                                  {survey.title}
                                   
                          </Text> 
                          <Text variant="bodyMd" as="span">
                                  {survey.subtitle} 
                          </Text> 
                              
                      { survey.type == "form" &&  
                      survey.inputes.map((field,i)=>{
                          return(
                            <div key={i}>                         
                          <Text variant="headingXs" as="h6">
                                  {field.label } 
                          </Text> 
                              <TextField
                                label=""
                                type={field.type}
                                autoComplete="off"
                                disabled
                                />
                            </div>
                          )
                        })
                      }
                      <Button fullWidth={false} disabled>Submit</Button>
                    </BlockStack>
                       </div>
                    </BlockStack>
                  </Card>
                </BlockStack>
              </InlineGrid>
            </Page>
          )
        }