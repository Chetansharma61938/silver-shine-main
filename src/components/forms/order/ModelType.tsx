import { Typography, Divider, TextField, Box } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomTabs from "@/components/CustomTabs";
import { forwardRef, useImperativeHandle, useRef } from "react";
import CustomButton from "@/components/ui/CustomButton";

// === OPTIONS ===
const modelOptions = ["SUPAGAL", "GALVANIZED"];
const modelTypeOptions = [
  "HOLLOW CHANNEL",
  "KICK-UP",
  "TRUSS Chassis",
  "FLAT FlOOR",
];

const validationSchema = Yup.object().shape({
  model: Yup.string()
    .required("Model is required")
    .oneOf(modelOptions, "Invalid model selected"),
  modelType: Yup.string()
    .required("Model Type is required")
    .oneOf(modelTypeOptions, "Invalid model type selected"),
  comments: Yup.string(),
});

interface ModelTypeProps {
  handleNext: () => void;
  initialData?: any;
  isLoading?: boolean;
}

const ModelType = forwardRef(({ handleNext, initialData, isLoading }: ModelTypeProps, ref) => {
  const formikRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    getValues: () => formikRef.current?.values,
    validateForm: () => formikRef.current?.validateForm(),
    submitForm: () => formikRef.current?.submitForm(),
  }));

  return (
    <Formik
      initialValues={{
        model: modelOptions.find(opt => opt.toLowerCase() === initialData?.model?.toLowerCase()) || "",
        modelType: modelTypeOptions.find(opt => opt.toLowerCase() === initialData?.modeltype?.toLowerCase()) || "",
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
              {/* === Model Section === */}
              <div>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Model:
                </Typography>
                <Divider className="my-2" />
                <CustomTabs
                  name="model"
                  options={modelOptions}
                  value={values.model}
                  onChange={(val) => setFieldValue("model", val)}
                />
              </div>

              {/* === Model Type Section === */}
              <div>
                <Typography variant="body1" sx={{ mb: 1 }} className="mt-4">
                  Model Type:
                </Typography>
                <CustomTabs
                  name="modelType"
                  options={modelTypeOptions}
                  value={values.modelType}
                  onChange={(val) => setFieldValue("modelType", val)}
                />
              </div>

              <div>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  className="mt-6"
                  label="Comments"
                  name="comments"
                  value={values.comments}
                  onChange={(e) => setFieldValue("comments", e.target.value)}
                />
              </div>

              <Box
                sx={{
                  position: "absolute",
                  right: 20,
                  pt: 1,
                }}
              >
                <CustomButton type="submit" disabled={isLoading}>Next</CustomButton>
              </Box>
            </>
          )}
        </Form>
      )}
    </Formik>
  );
});

export default ModelType;
