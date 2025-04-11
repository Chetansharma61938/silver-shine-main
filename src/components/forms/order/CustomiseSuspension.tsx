import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect } from "react";
import { Formik, Form, Field, FormikProps } from "formik";
import { Typography, Button, TextField } from "@mui/material";
import * as Yup from "yup";
import CustomTabs from "@/components/ui/CustomTabs";

// === OPTIONS ===
const coilSpringOptions = ["YES", "NO"];
const airbagsOptions = ["YES", "NO"];
const airbagStageOptions = ["Stage 1", "Stage 2", "Stage 3", "Stage 4"];
const brakeTypeOptions = ["DISK", "DRUM"];

interface CustomiseSuspensionProps {
  handleNext: () => void;
  initialData?: any;
  isLoading?: boolean;
}

const CustomiseSuspension = forwardRef(({ handleNext, initialData, isLoading = false }: CustomiseSuspensionProps, ref) => {
  const formikRef = useRef<FormikProps<any>>(null);

  useImperativeHandle(ref, () => ({
    getValues: () => {
      const values = formikRef.current?.values;
      return values;
    },
    validateForm: () => formikRef.current?.validateForm(),
    submitForm: () => formikRef.current?.submitForm(),
  }));

  const [selectedCoilSpring, setSelectedCoilSpring] = useState<string>(
    initialData?.coilspring?.toUpperCase() || ""
  );
  const [selectedAirbags, setSelectedAirbags] = useState<string>(
    initialData?.airbags?.toUpperCase() || ""
  );
  const [selectedAirbagStage, setSelectedAirbagStage] = useState<string>(
    initialData?.airbagstage || ""
  );
  const [selectedBrakeType, setSelectedBrakeType] = useState<string>(
    initialData?.braketype?.toUpperCase() || ""
  );

  // Update states when initialData changes
  useEffect(() => {
    if (initialData) {
      setSelectedCoilSpring(initialData.coilspring?.toUpperCase() || "");
      setSelectedAirbags(initialData.airbags?.toUpperCase() || "");
      setSelectedAirbagStage(initialData.airbagstage || "");
      setSelectedBrakeType(initialData.braketype?.toUpperCase() || "");
    }
  }, [initialData]);

  const validationSchema = Yup.object().shape({
    coilspring: Yup.string()
      .required("Coil Spring is required")
      .oneOf(coilSpringOptions, "Invalid coil spring selected"),
    airbags: Yup.string()
      .required("Airbags is required")
      .oneOf(airbagsOptions, "Invalid airbags selected"),
    airbagstage: Yup.string()
      .when('airbags', {
        is: 'YES',
        then: () => Yup.string().required("Airbag Stage is required").oneOf(airbagStageOptions, "Invalid airbag stage selected"),
      }),
    braketype: Yup.string()
      .required("Brake Type is required")
      .oneOf(brakeTypeOptions, "Invalid brake type selected"),
    comments: Yup.string(),
  });

  return (
    <Formik
      initialValues={{
        coilspring: initialData?.coilspring?.toUpperCase() || "",
        airbags: initialData?.airbags?.toUpperCase() || "",
        airbagstage: initialData?.airbagstage || "",
        braketype: initialData?.braketype?.toUpperCase() || "",
        comments: initialData?.comments || "",
      }}
      enableReinitialize={true}
      validationSchema={validationSchema}
      innerRef={formikRef}
      onSubmit={() => handleNext()}
    >
      {({ values, setFieldValue }) => (
        <Form className="space-y-6">
          {isLoading ? (
            <Typography>Loading saved data...</Typography>
          ) : (
            <>
              {/* === Coil Spring Section === */}
              <div>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Coil Spring
                </Typography>
                <CustomTabs
                  options={coilSpringOptions}
                  selected={selectedCoilSpring}
                  onChange={(value: string) => {
                    setSelectedCoilSpring(value);
                    setFieldValue("coilspring", value);
                  }}
                  value={values.coilspring}
                />
              </div>

              {/* === Airbags Section === */}
              <div>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Airbags
                </Typography>
                <CustomTabs
                  options={airbagsOptions}
                  selected={selectedAirbags}
                  onChange={(value: string) => {
                    setSelectedAirbags(value);
                    setFieldValue("airbags", value);
                    if (value !== "YES") {
                      setSelectedAirbagStage("");
                      setFieldValue("airbagstage", "");
                    }
                  }}
                  value={values.airbags}
                />
              </div>

              {/* === Airbag Stage Section === */}
              {selectedAirbags === "YES" && (
                <div>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Select Airbag Stage
                  </Typography>
                  <CustomTabs
                    options={airbagStageOptions}
                    selected={selectedAirbagStage}
                    onChange={(value: string) => {
                      setSelectedAirbagStage(value);
                      setFieldValue("airbagstage", value);
                    }}
                    value={values.airbagstage}
                  />
                </div>
              )}

              {/* === Brake Type Section === */}
              <div>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Brake Type
                </Typography>
                <CustomTabs
                  options={brakeTypeOptions}
                  selected={selectedBrakeType}
                  onChange={(value: string) => {
                    setSelectedBrakeType(value);
                    setFieldValue("braketype", value);
                  }}
                  value={values.braketype}
                />
              </div>

              {/* === Comments Section === */}
              <div>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Comments
                </Typography>
                <Field
                  as={TextField}
                  name="comments"
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                  placeholder="Enter any additional comments here..."
                />
              </div>

              {/* === Submit Button === */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Next"}
                </Button>
              </div>
            </>
          )}
        </Form>
      )}
    </Formik>
  );
});

CustomiseSuspension.displayName = "CustomiseSuspension";

export default CustomiseSuspension;
