import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Formik, Form } from "formik";
import { Grid, Typography, TextField, Box } from "@mui/material";
import CustomTabs from "@/components/CustomTabs";
import CustomButton from "@/components/ui/CustomButton";
import * as Yup from "yup";

const chassisRaiserOptions = ["2''-50mm", "3''-75mm", "4mm", "6''-150mm"];
const couplingTypeOptions = ["STD", "DO35", "DO45", "Custom"];
const zSectionOptions = ["22", "44", "L", "Other"];
const couplingPositionOptions = ["Top", "Middle", "Bottom"];

interface ChassisConfigurationProps {
  handleNext: () => void;
  initialData?: any;
  isLoading?: boolean;
}

const validationSchema = Yup.object().shape({
  chassisRaiser: Yup.string()
    .required("Chassis Raiser is required")
    .oneOf(chassisRaiserOptions, "Invalid option selected"),
  couplingType: Yup.string()
    .required("Coupling Type is required")
    .oneOf(couplingTypeOptions, "Invalid option selected"),
  customCouplingType: Yup.string()
    .when('couplingType', {
      is: "Custom",
      then: () => Yup.string().required("Custom Coupling Type is required"),
    }),
  zSection: Yup.string()
    .required("Z-Section is required")
    .oneOf(zSectionOptions, "Invalid option selected"),
  otherZSection: Yup.string()
    .when('zSection', {
      is: "Other",
      then: () => Yup.string().required("Other Z-Section is required"),
    }),
  couplingPosition: Yup.string()
    .required("Coupling Position is required")
    .oneOf(couplingPositionOptions, "Invalid option selected"),
  comment: Yup.string(),
});

const ChassisConfiguration = forwardRef(({ handleNext, initialData, isLoading }: ChassisConfigurationProps, ref) => {
  const formikRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    getValues: () => formikRef.current?.values,
    validateForm: () => formikRef.current?.validateForm(),
    submitForm: () => formikRef.current?.submitForm(),
  }));

  return (
    <Formik
      initialValues={{
        chassisRaiser: chassisRaiserOptions.find(opt => opt.toLowerCase() === initialData?.chassisraiser?.toLowerCase()) || "",
        couplingType: couplingTypeOptions.find(opt => opt.toLowerCase() === initialData?.couplingtype?.toLowerCase()) || "",
        customCouplingType: initialData?.customcouplingtype || "",
        zSection: zSectionOptions.find(opt => opt.toLowerCase() === initialData?.zsection?.toLowerCase()) || "",
        otherZSection: initialData?.otherzsection || "",
        couplingPosition: couplingPositionOptions.find(opt => opt.toLowerCase() === initialData?.couplingposition?.toLowerCase()) || "",
        comment: initialData?.comment || "",
      }}
      enableReinitialize={true}
      validationSchema={validationSchema}
      innerRef={formikRef}
      onSubmit={(values, { setSubmitting }) => {
        // Only proceed if all required fields are filled
        if (values.chassisRaiser && values.couplingType && values.zSection && values.couplingPosition) {
          // If couplingType is Custom, require customCouplingType
          if (values.couplingType === "Custom" && !values.customCouplingType) {
            setSubmitting(false);
            return;
          }
          // If zSection is Other, require otherZSection
          if (values.zSection === "Other" && !values.otherZSection) {
            setSubmitting(false);
            return;
          }
          handleNext();
        }
        setSubmitting(false);
      }}
    >
      {({ values, setFieldValue, isSubmitting, errors, touched }) => (
        <Form>
          {isLoading ? (
            <Typography>Loading saved data...</Typography>
          ) : (
            <Grid container spacing={2}>
              {/* Chassis Raiser */}
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Chassis Raiser
                </Typography>
                <CustomTabs
                  name="chassisRaiser"
                  options={chassisRaiserOptions}
                  value={values.chassisRaiser}
                  onChange={(val) => setFieldValue("chassisRaiser", val)}
                />
                {touched.chassisRaiser && errors.chassisRaiser && (
                  <Typography color="error" variant="caption">
                    {errors.chassisRaiser}
                  </Typography>
                )}
              </Grid>

              {/* Coupling Type */}
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Coupling Type
                </Typography>
                <CustomTabs
                  name="couplingType"
                  options={couplingTypeOptions}
                  value={values.couplingType}
                  onChange={(val) => setFieldValue("couplingType", val)}
                />
                {touched.couplingType && errors.couplingType && (
                  <Typography color="error" variant="caption">
                    {errors.couplingType}
                  </Typography>
                )}
                {values.couplingType === "Custom" && (
                  <TextField
                    label="Custom Coupling Type"
                    fullWidth
                    size="small"
                    sx={{ mt: 2 }}
                    value={values.customCouplingType}
                    onChange={(e) =>
                      setFieldValue("customCouplingType", e.target.value)
                    }
                    error={touched.customCouplingType && !!errors.customCouplingType}
                    helperText={touched.customCouplingType && errors.customCouplingType}
                  />
                )}
              </Grid>

              {/* Z-Section */}
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Z-Section
                </Typography>
                <CustomTabs
                  name="zSection"
                  options={zSectionOptions}
                  value={values.zSection}
                  onChange={(val) => setFieldValue("zSection", val)}
                />
                {touched.zSection && errors.zSection && (
                  <Typography color="error" variant="caption">
                    {errors.zSection}
                  </Typography>
                )}
                {values.zSection === "Other" && (
                  <TextField
                    label="Other Z-Section"
                    fullWidth
                    size="small"
                    sx={{ mt: 2 }}
                    value={values.otherZSection}
                    onChange={(e) =>
                      setFieldValue("otherZSection", e.target.value)
                    }
                    error={touched.otherZSection && !!errors.otherZSection}
                    helperText={touched.otherZSection && errors.otherZSection}
                  />
                )}
              </Grid>

              {/* Coupling Position */}
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Coupling Position
                </Typography>
                <CustomTabs
                  name="couplingPosition"
                  options={couplingPositionOptions}
                  value={values.couplingPosition}
                  onChange={(val) => setFieldValue("couplingPosition", val)}
                />
                {touched.couplingPosition && errors.couplingPosition && (
                  <Typography color="error" variant="caption">
                    {errors.couplingPosition}
                  </Typography>
                )}
              </Grid>

              {/* Comment */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Comment
                </Typography>
                <TextField
                  label="Comment"
                  fullWidth
                  multiline
                  rows={3}
                  size="small"
                  value={values.comment}
                  onChange={(e) => setFieldValue("comment", e.target.value)}
                />
              </Grid>
            </Grid>
          )}
          <Box
            sx={{
              position: "absolute",
              right: 20,
              pt: 4,
            }}
          >
            <CustomButton type="submit" disabled={isLoading || isSubmitting}>Next</CustomButton>
          </Box>
        </Form>
      )}
    </Formik>
  );
});

export default ChassisConfiguration;
