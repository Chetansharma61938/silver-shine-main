import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  Button,
  Grid,
  Box,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomTabs from "@/components/CustomTabs";
import CustomButton from "@/components/ui/CustomButton";

// === OPTION CONSTANTS ===
const ChassisFrameMainRailOptions = [
  "6' x 2\" (150mm x 50mm)",
  "4' x 2\" (100mm x 50mm)",
];

const AFrameOptions = [
  "6' x 2\" (150mm x 50mm)",
  "4' x 2\" (100mm x 50mm)",
];

const AFrameSizeOptions = ["Standard(1550mm)", "Extended"];

const ExtendedOptions = [
  "1550mm", "1600mm", "1650mm", "1700mm", "1750mm",
  "1800mm", "1850mm", "1900mm", "1950mm", "2000mm",
  "2050", "2100mm", "2200mm", "2250mm", "2300mm",
];

interface ChassisFrameProps {
  handleNext: () => void;
  initialData?: any;
  isLoading?: boolean;
}

const validationSchema = Yup.object().shape({
  chassisFrameMainRail: Yup.string()
    .required("Chassis Frame Main Rail is required")
    .oneOf(ChassisFrameMainRailOptions, "Invalid option selected"),
  aFrame: Yup.string()
    .required("A-Frame is required")
    .oneOf(AFrameOptions, "Invalid option selected"),
  aFrameSize: Yup.string()
    .required("A-Frame Size is required")
    .oneOf(AFrameSizeOptions, "Invalid option selected"),
  extendedSize: Yup.string()
    .when('aFrameSize', {
      is: "Extended",
      then: () => Yup.string().required("Extended size is required").oneOf(ExtendedOptions, "Invalid option selected"),
    }),
  frontQty: Yup.string().when('batteryFront', {
    is: true,
    then: () => Yup.string().required("Front quantity is required"),
  }),
  rearQty: Yup.string().when('batteryRear', {
    is: true,
    then: () => Yup.string().required("Rear quantity is required"),
  }),
  frameComments: Yup.string(),
});

const ChassisFrame = forwardRef(({ handleNext, initialData, isLoading }: ChassisFrameProps, ref) => {
  const formikRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    getValues: () => formikRef.current?.values,
    validateForm: () => formikRef.current?.validateForm(),
    submitForm: () => formikRef.current?.submitForm(),
  }));

  const [showExtended, setShowExtended] = useState(initialData?.aframesize === "Extended");

  return (
    <Formik
      initialValues={{
        chassisFrameMainRail: ChassisFrameMainRailOptions.find(opt => opt.toLowerCase() === initialData?.chassisframemainrail?.toLowerCase()) || "",
        aFrame: AFrameOptions.find(opt => opt.toLowerCase() === initialData?.aframe?.toLowerCase()) || "",
        aFrameSize: AFrameSizeOptions.find(opt => opt.toLowerCase() === initialData?.aframesize?.toLowerCase()) || "",
        extendedSize: ExtendedOptions.find(opt => opt.toLowerCase() === initialData?.extendedsize?.toLowerCase()) || "",
        batteryFront: initialData?.batteryfront || false,
        batteryRear: initialData?.batteryrear || false,
        frontQty: initialData?.frontqty || "",
        rearQty: initialData?.rearqty || "",
        frameComments: initialData?.framecomments || "",
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
              <div>
                <Typography variant="body1">Chassis Frame Main Rail</Typography>
                <CustomTabs
                  name="chassisFrameMainRail"
                  options={ChassisFrameMainRailOptions}
                  value={values.chassisFrameMainRail}
                  onChange={(val) => setFieldValue("chassisFrameMainRail", val)}
                />
              </div>

              <div>
                <Typography variant="body1">A-Frame</Typography>
                <CustomTabs 
                  name="aFrame" 
                  options={AFrameOptions}
                  value={values.aFrame}
                  onChange={(val) => setFieldValue("aFrame", val)}
                />
              </div>

              <div>
                <Typography variant="body1">A-Frame Size</Typography>
                <CustomTabs
                  name="aFrameSize"
                  options={AFrameSizeOptions}
                  value={values.aFrameSize}
                  onChange={(val) => {
                    setFieldValue("aFrameSize", val);
                    setShowExtended(val === "Extended");
                    if (val !== "Extended") {
                      setFieldValue("extendedSize", "");
                    }
                  }}
                />
              </div>

              {showExtended && (
                <div>
                  <Typography variant="body1" className="mt-4">
                    Extended A-Frame Options
                  </Typography>
                  <CustomTabs 
                    name="extendedSize" 
                    options={ExtendedOptions}
                    value={values.extendedSize}
                    onChange={(val) => setFieldValue("extendedSize", val)}
                  />
                </div>
              )}

              <div>
                <Typography variant="body1" className="mt-6">
                  Battery Box
                </Typography>
                <div className="flex gap-6">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.batteryFront || false}
                        onChange={(e) =>
                          setFieldValue("batteryFront", e.target.checked)
                        }
                      />
                    }
                    label="Front"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.batteryRear || false}
                        onChange={(e) =>
                          setFieldValue("batteryRear", e.target.checked)
                        }
                      />
                    }
                    label="Rear"
                  />
                </div>

                <Grid container spacing={2} className="mt-2">
                  {values.batteryFront && (
                    <Grid item xs={6}>
                      <TextField
                        size="small"
                        fullWidth
                        label="Front Qty"
                        name="frontQty"
                        value={values.frontQty}
                        onChange={(e) => setFieldValue("frontQty", e.target.value)}
                      />
                    </Grid>
                  )}

                  {values.batteryRear && (
                    <Grid item xs={6}>
                      <TextField
                        size="small"
                        fullWidth
                        label="Rear Qty"
                        name="rearQty"
                        value={values.rearQty}
                        onChange={(e) => setFieldValue("rearQty", e.target.value)}
                      />
                    </Grid>
                  )}
                </Grid>
              </div>

              <div>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  className="mt-6"
                  label="Comments"
                  name="frameComments"
                  value={values.frameComments}
                  onChange={(e) => setFieldValue("frameComments", e.target.value)}
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

export default ChassisFrame;
