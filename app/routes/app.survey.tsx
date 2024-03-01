import {
  BlockStack,
  Box,
  Card,
  InlineGrid,
  Button,
  TextField,
  Page,
  Select,
  Text,
  ChoiceList,
  // Checkbox,
} from "@shopify/polaris";
import { useState, useCallback } from "react";
import type { HTMLInputTypeAttribute } from "react";
import {
  PlusIcon,
  DuplicateIcon,
  ArchiveIcon,
  DeleteIcon,
} from "@shopify/polaris-icons";
import type { Type } from "@shopify/polaris/build/ts/src/components/TextField";
import type { Choice } from "@shopify/polaris/build/ts/src/components/ChoiceList";
type optionfieldType = {
  id: number;
  OptionType: HTMLInputTypeAttribute | undefined;
  label: string;
  Required: boolean;
  Ansewers: Choice[];
};
type fieldType = {
  id: number;
  type: Type | undefined;
  label: string;
  Required: boolean;
};

type InputT = {
  fields: fieldType[] | null;
  Optionsfilds: optionfieldType[] | null;
};
type SurveyType = {
  title: string;
  type: string;
  subtitle: string;
  inputes: InputT;
};
type SurveyParams = {
  survey: SurveyType;
};
type SurveyParamsVoid = {
  survey: SurveyType;
  handleChangeField: (newValue: string, idField: number) => void;
  handleSelectChangeType: (TypeField: Type, idField: number) => void;
  AddNewField: () => void;
  DeleteField: (id: number) => void;
  HandelTheTileOption: (NewAnswerTitle: string, idFieldoption: number,AnswerId:string | undefined) => void;
};
type choisesType = {
  label: string | number;
  value: string | number;
};
type OptionFormType = {
  label: string;
  Type: HTMLInputTypeAttribute;
  choices: choisesType[];
};

export default function ResourceDetailsLayout() {
  const [survey, setsurvey] = useState<SurveyType>({
    title: "Survey Form",
    subtitle: "SubTitle Survey Form",
    type: "Fojrm",
    inputes: {
      fields: [
        {
          id: 1,
          type: "text",
          label: "Title Field ",
          Required: false,
        },
      ],
      Optionsfilds: [
        {
          id: 1,
          OptionType: "checkbox",
          label: "Title Field ",
          Ansewers: [
            {id:"1", label: "A", value: "A" },
            {id:"2",  label: "B", value: "B" },
            {id:"3", label: "C", value: "C" },
            {id:"4",  label: "D", value: "D"},
          ],
          Required: false,
        },
      ],
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [optionForm, SetoptionForm] = useState<OptionFormType>({
    Type: "checkbox",
    label: "CheckBox Label",
    choices: [{ label: "label Test", value: "Value Test" }],
  });

  const handleChange = useCallback(
    (newValue: string) =>
      setsurvey((prevState) => ({
        ...prevState,
        title: newValue,
      })),
    [],
  );

  const handleChangeField = (newValue: string, idField: number) => {
    setsurvey((prevState) => {
      const updatedFields = prevState.inputes.fields!.map((field) => {
        if (field.id === idField) {
          return { ...field, label: newValue };
        }
        return field;
      });

      return {
        ...prevState,
        inputes: {
          ...prevState.inputes,
          fields: updatedFields,
        },
      };
    });
  };

  const handleSelectChangeType = (TypeField: Type, idField: number) => {
    setsurvey((prevState) => {
      const upadtedTypeField = prevState.inputes.fields!.map((field) => {
        if (field.id == idField) {
          return { ...field, type: TypeField };
        }
        return field;
      });
      return {
        ...prevState,
        inputes: {
          ...prevState.inputes,
          fields: upadtedTypeField,
        },
      };
    });
  };
  const AddNewField = () => {
    const InputeID = survey.inputes.fields!.length + 1;
    const newField: fieldType = {
      id: InputeID,
      type: "text",
      label: `input ${InputeID}`,
      Required: false,
    };

    setsurvey((prev) => {
      const updatedFields = [...prev.inputes.fields!];
      updatedFields.push(newField);

      return {
        ...prev,
        inputes: {
          ...prev.inputes,
          fields: updatedFields,
        },
      };
    });
    console.log(survey.inputes);
  };
  const DeleteField = (id: number) => {
    const FilteredFields = survey.inputes.fields?.filter(
      (field) => field.id !== id,
    );

    if (FilteredFields) {
      setsurvey((Prev) => ({
        ...Prev,
        inputes: { ...Prev.inputes, fields: FilteredFields },
      }));
    }
  };
const HandelTheTileOption = (newLabel: string, optionsId: number, answerId:string |undefined) => {
  setsurvey((prevState) => {
    // Clone the existing Optionsfilds array
    const updatedOptionsfilds = prevState.inputes.Optionsfilds!.map((option) => {
      if (option.id === optionsId) {
        // Clone the existing Ansewers array
        const updatedAnsewers = option.Ansewers.map((answer) => {
          if (answer.id == answerId) {
            // Update the label and value properties for the specified answer
            return { ...answer, label: newLabel, value: newLabel };
          }
          return answer;
        });

        //REVIEW Update the Ansewers array for the specified Optionsfild
        return { ...option, Ansewers: updatedAnsewers };
      }
      return option;
    });

    // Update the state with the modified Optionsfilds array
    return {
      ...prevState,
      inputes: {
        ...prevState.inputes,
        Optionsfilds: updatedOptionsfilds,
      },
    };
  });
}
  // const HandelTheTileOption = (NewAnswerTitle: string, idFieldoption: number, AnswerId:string|undefined) => {
  //   setsurvey((prevState) => {
  //     const updatedFields = prevState.inputes.Optionsfilds!.map((field) => {
  //       if (field.id === idFieldoption) {
  //         return { ...field, label: NewAnswerTitle };
  //       }
  //       return field;
  //     });

  //     return {
  //       ...prevState,
  //       inputes: {
  //         ...prevState.inputes,
  //         Optionsfilds: updatedFields,
  //       },
  //     };
  //   });
  // };
  function SelectFormType() {
    // const [selected, setSelected] = useState("Form");
    const handleSelectChange = (newValue: string) => {
      setsurvey((Prev) => ({ ...Prev, type: newValue }));
    };
    const options = [
      { label: "Checklist", value: "Checklist" },
      { label: "Form", value: "Form" },
    ];

    return (
      <Select
        tone="magic"
        label="Select survey Format"
        options={options}
        onChange={handleSelectChange}
        value={survey.type}
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
              {/* TODO: SURVEY FORM CREATE */}
              <Text variant="headingLg" as="h5">
                {"Survey Format "}
              </Text>
              <SelectFormType />
              <Box borderRadius="300" minHeight="1rem" />
            </BlockStack>

            <BlockStack gap="400">
              <Text variant="headingLg" as="h5">
                {"Survey Content"}
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
              <Box borderRadius="300" minHeight="1rem" />
            </BlockStack>
            {/* TODO: SURVEY FORM CREATE */}
            <SurveyForm
              handleChangeField={handleChangeField}
              handleSelectChangeType={handleSelectChangeType}
              AddNewField={AddNewField}
              DeleteField={DeleteField}
              HandelTheTileOption={HandelTheTileOption}
              survey={survey}
            />
          </Card>
        </BlockStack>

        {/* TODO: SURVEY TEST */}

        <PreviewSurvey survey={survey} />
      </InlineGrid>
    </Page>
  );
}

function SurveyForm({
  survey,
  handleChangeField,
  handleSelectChangeType,
  AddNewField,
  DeleteField,
  HandelTheTileOption,
}: SurveyParamsVoid) {
  const TypesOfinputes = [
    { label: "Short Answer", value: "text" },
    { label: "Date", value: "date" },
    { label: "Email", value: "email" },
    { label: "checkBox", value: "checkBox" },
  ];

  if (survey.type !== "Form") {
    return (
      <BlockStack gap="400">
            <Text variant="headingLg" as="h5">
              {"Answer Options"}
            </Text>
          {
                survey.inputes.Optionsfilds?.map((option, i) => {
                  return (
                    <div key={i}>
                      <BlockStack gap="400">
                        {option.Ansewers.map((Answer, i) => {
                          return (
                            <div key={i}>
                              <Text variant="headingXs" as="h6">
                                Options {Answer.id}
                              </Text>
                              <TextField
                                onChange={(e) => {
                                  HandelTheTileOption(e, option.id, Answer.id);
                                }}
                                label=""
                                value={Answer.value}
                                type={"text"}
                                autoComplete="off"
                              />
                            </div>
                          );
                        })}
                                                <Button
                          // onClick={() => {
                          //   AddNewField();
                          // }}
                          variant="plain"
                          tone="critical"
                          icon={PlusIcon}
                        >
                          More Options{" "}
                        </Button>
                        <Button
                          // onClick={() => {
                          //   AddNewField();
                          // }}
                          variant="primary"
                          tone="success"
                          icon={PlusIcon}
                        >
                          Add Field In{" "}
                        </Button>
                      </BlockStack>
                    </div>
                  );
                })
              }        
        </BlockStack>
    )}    


  return (
    <BlockStack gap="400">
      <Text variant="headingLg" as="h5">
        {"Fields Content "}
      </Text>
      {survey.inputes.fields?.map((Input, i) => {
        return (
          <BlockStack gap="400" key={i}>
            <div
              style={{
                borderBottom: "1px solid #000",
                textAlign: "center",
                padding: "4px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  padding: "0px",
                  color: "#7F27FF",
                  fontFamily: "sans-serif",
                }}
              >
                Field {Input.id}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Button
                  onClick={() => {
                    DeleteField(Input.id);
                  }}
                  icon={DeleteIcon}
                ></Button>
              </div>
            </div>
            <Select
              label="Select type field "
              options={TypesOfinputes}
              onChange={(e: Type) => {
                handleSelectChangeType(e, Input.id);
              }}
              value={Input.type}
            />
            <TextField
              label="Field Title"
              type="text"
              onChange={(e) => {
                handleChangeField(e, Input.id);
              }}
              value={
                survey.inputes.fields && survey.inputes.fields[i]
                  ? survey.inputes.fields[i].label
                  : undefined
              }
              autoComplete="off"
            />
            <ChoiceList
              title="PRIORITY"
              choices={[
                { label: "Optional", value: "optional" },
                { label: "Required", value: "required" },
              ]}
              selected={["Optional"]}
            />
          </BlockStack>
        );
      })}
      <Button
        onClick={() => {
          AddNewField();
        }}
        variant="primary"
        tone="success"
        icon={PlusIcon}
      >
        Add Field In{" "}
      </Button>
    </BlockStack>
  );
}

function PreviewSurvey({ survey }: SurveyParams) {
  return (
    <BlockStack gap={{ xs: "400", md: "200" }}>
      <Card roundedAbove="sm">
        <BlockStack gap="500">
          <div
            style={{
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              borderBottom: "1px solid #000",
              border: "1px solid #ccc",
              padding: "20px",
            }}
          >
            <BlockStack gap="400">
              <Text variant="headingLg" as="h5">
                {survey.title}
              </Text>
              <Text variant="bodyMd" as="span">
                {survey.subtitle}
              </Text>

              {survey.type !== "Form" &&
                survey.inputes.Optionsfilds!.map((field, i) => {
                  return (
                    <div key={i}>
                      <ChoiceList
                        title=""
                        choices={field.Ansewers}
                        selected={[""]}
                      />
                    </div>
                  );
                })}
              {/* REVIEW: Render the form if Statehook is in from state  */}
              {survey.type == "Form" &&
                survey.inputes.fields?.map((field, i) => {
                  return (
                    <div key={i}>
                      <Text variant="headingXs" as="h6">
                        {field.label}
                      </Text>
                      <TextField
                        label=""
                        type={field.type}
                        autoComplete="off"
                        disabled
                      />
                      <Box borderRadius="300" minHeight="1.5rem" />
                    </div>
                  );
                })}
              <Button>Submit</Button>
            </BlockStack>
          </div>
        </BlockStack>
      </Card>
    </BlockStack>
  );
}
   