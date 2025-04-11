import * as Yup from "yup";
import CustomTabs from "@/components/CustomTabs";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { forwardRef, useImperativeHandle, useRef } from "react";
import CustomButton from "@/components/ui/CustomButton";

// === OPTIONS ===
const yesNoOptions = ["YES", "NO"];
const paintColourOptions = ["Monument", "Gunmetal", "Matt Black", "Silver"];
const coatingOptions = ["RAPTOR COATING", "EXTREME COATING"];

const initialValues = {
  nudgeBar: "NO",
  recoveryPoints: "NO",
  skidPlates: "NO",
  bikePlate: "NO",
  wheelBrace: "NO",
  jack2000: "NO",
  paintColour: "Monument",
  coatingType: "RAPTOR COATING",
  comments: "",
};

const validationSchema = Yup.object().shape({
  // Add validations if needed
});

const Extras = forwardRef(({ handleNext, initialData }: any, ref) => {
  const formikRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    getValues: () => {
      const values = formikRef.current?.values;
      return {
        nudgeBar: values.nudgeBar === "YES",
        recoveryPoints: values.recoveryPoints === "YES",
        skidPlates: values.skidPlates === "YES",
        bikePlate: values.bikePlate === "YES",
        wheelBrace: values.wheelBrace === "YES",
        jack2000: values.jack2000 === "YES",
        paintColour: values.paintColour,
        coatingType: values.coatingType,
        comments: values.comments,
      };
    },
  }));

  const getInitialValues = () => {
    if (!initialData) return initialValues;
    
    return {
      nudgeBar: initialData.nudgeBar ? "YES" : "NO",
      recoveryPoints: initialData.recoveryPoints ? "YES" : "NO",
      skidPlates: initialData.skidPlates ? "YES" : "NO",
      bikePlate: initialData.bikePlate ? "YES" : "NO",
      wheelBrace: initialData.wheelBrace ? "YES" : "NO",
      jack2000: initialData.jack2000 ? "YES" : "NO",
      paintColour: initialData.paintColour || "Monument",
      coatingType: initialData.coatingType || "RAPTOR COATING",
      comments: initialData.comments || "",
    };
  };

  return (
    <Formik
      initialValues={getInitialValues()}
      validationSchema={validationSchema}
      innerRef={formikRef}
      onSubmit={() => {
        handleNext();
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className="space-y-8">
          <div>
            <Grid container spacing={2}>
              <Grid size={4}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Nudge Bar
                </Typography>
                <CustomTabs
                  name="nudgeBar"
                  options={yesNoOptions}
                  onChange={(val) => setFieldValue("nudgeBar", val)}
                />
              </Grid>
              <Grid size={4}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Recovery Points
                </Typography>
                <CustomTabs
                  name="recoveryPoints"
                  options={yesNoOptions}
                  onChange={(val) => setFieldValue("recoveryPoints", val)}
                />
              </Grid>
              <Grid size={4}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Skid Plates
                </Typography>
                <CustomTabs
                  name="skidPlates"
                  options={yesNoOptions}
                  onChange={(val) => setFieldValue("skidPlates", val)}
                />
              </Grid>
            </Grid>
          </div>

          <div>
            <Typography variant="h6" sx={{ mb: 1 }}></Typography>
            <Grid container spacing={2}>
              <Grid size={4}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Bike Plate
                </Typography>
                <CustomTabs
                  name="bikePlate"
                  options={yesNoOptions}
                  onChange={(val) => setFieldValue("bikePlate", val)}
                />
              </Grid>
              <Grid size={4}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Wheel Brace
                </Typography>
                <CustomTabs
                  name="wheelBrace"
                  options={yesNoOptions}
                  onChange={(val) => setFieldValue("wheelBrace", val)}
                />
              </Grid>
              <Grid size={4}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Jack 2000
                </Typography>
                <CustomTabs
                  name="jack2000"
                  options={yesNoOptions}
                  onChange={(val) => setFieldValue("jack2000", val)}
                />
              </Grid>
            </Grid>
          </div>

          <div>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Paint Colour
            </Typography>
            <CustomTabs
              name="paintColour"
              options={paintColourOptions}
              value={values.paintColour}
              onChange={(val) => setFieldValue("paintColour", val)}
            />
          </div>

          <div>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Coating Type
            </Typography>
            <CustomTabs
              name="coatingType"
              options={coatingOptions}
              value={values.coatingType}
              onChange={(val) => setFieldValue("coatingType", val)}
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
              placeholder="Enter any additional comments here..."
            />
          </div>
          <Box
            sx={{
              position: "absolute",
              right: 20,
              pt: 4,
            }}
          >
            <CustomButton type="submit">Next</CustomButton>
          </Box>
        </Form>
      )}
    </Formik>
  );
});

export default Extras;
