import * as Yup from "yup";
import CustomTabs from "@/components/CustomTabs";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { forwardRef, useImperativeHandle, useRef } from "react";
import CustomButton from "@/components/ui/CustomButton";

// === OPTIONS ===
const stepLocationOptions = ["Step Bracket Only", "Front", "Rear"];
const stepSizeOptions = ["625X185", "Custom"];
const yesNoOptions = ["YES", "NO"];

interface StepLocationsProps {
  handleNext: () => void;
  initialData?: any;
  isLoading?: boolean;
}

const validationSchema = Yup.object().shape({
  stepLocation: Yup.string()
    .required("Step Location is required")
    .oneOf(stepLocationOptions, "Invalid step location selected"),
  stepSize: Yup.string()
    .when('stepLocation', {
      is: (val: string) => val === 'Front' || val === 'Rear',
      then: () => Yup.string().required("Step Size is required").oneOf(stepSizeOptions, "Invalid step size selected"),
    }),
  roundedCorners: Yup.string()
    .when('stepLocation', {
      is: (val: string) => val === 'Front' || val === 'Rear',
      then: () => Yup.string().required("Rounded Corners selection is required").oneOf(yesNoOptions, "Invalid option selected"),
    }),
  brackets: Yup.string()
    .when('stepLocation', {
      is: (val: string) => val === 'Front' || val === 'Rear',
      then: () => Yup.string().required("Brackets selection is required").oneOf(yesNoOptions, "Invalid option selected"),
    }),
  locationComments: Yup.string(),
});

const StepLocations = forwardRef(({ handleNext, initialData, isLoading }: StepLocationsProps, ref) => {
  const formikRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    getValues: () => formikRef.current?.values,
    validateForm: () => formikRef.current?.validateForm(),
    submitForm: () => formikRef.current?.submitForm(),
  }));

  return (
    <Formik
      initialValues={{
        stepLocation: stepLocationOptions.find(opt => opt.toLowerCase() === initialData?.steplocation?.toLowerCase()) || "",
        stepSize: stepSizeOptions.find(opt => opt.toLowerCase() === initialData?.stepsize?.toLowerCase()) || "",
        roundedCorners: yesNoOptions.find(opt => opt.toLowerCase() === initialData?.roundedcorners?.toLowerCase()) || "",
        brackets: yesNoOptions.find(opt => opt.toLowerCase() === initialData?.brackets?.toLowerCase()) || "",
        locationComments: initialData?.locationcomments || "",
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
              {/* === Step Location === */}
              <div>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Step Location
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <CustomTabs
                  name="stepLocation"
                  options={stepLocationOptions}
                  value={values.stepLocation}
                  onChange={(val) => setFieldValue("stepLocation", val)}
                />
              </div>

              {/* === Conditional Section === */}
              {(values.stepLocation === "Front" ||
                values.stepLocation === "Rear") && (
                <>
                  {/* Step Size */}
                  <div>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      Step Size:
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <CustomTabs
                      name="stepSize"
                      options={stepSizeOptions}
                      value={values.stepSize}
                      onChange={(val) => setFieldValue("stepSize", val)}
                    />
                  </div>

                  {/* Rounded Corners */}
                  <div>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      Rounded Corners:
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <CustomTabs
                      name="roundedCorners"
                      options={yesNoOptions}
                      value={values.roundedCorners}
                      onChange={(val) => setFieldValue("roundedCorners", val)}
                    />
                  </div>

                  {/* Brackets */}
                  <div>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      Brackets:
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <CustomTabs
                      name="brackets"
                      options={yesNoOptions}
                      value={values.brackets}
                      onChange={(val) => setFieldValue("brackets", val)}
                    />
                  </div>
                </>
              )}

              {/* === Comments Section === */}
              <div>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  className="mt-6"
                  label="Comments"
                  name="locationComments"
                  value={values.locationComments}
                  onChange={(e) =>
                    setFieldValue("locationComments", e.target.value)
                  }
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

export default StepLocations;
