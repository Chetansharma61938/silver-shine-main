import React, { forwardRef, useImperativeHandle, useRef, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Formik, Form } from "formik";
import CustomTabs from "@/components/CustomTabs";
import CustomButton from "@/components/ui/CustomButton";

const waterTankQtyLabels = {
  front: "Front 95L",
  between: "Between 95L",
  rear: "Rear 95L",
  grey: "Grey 95L",
};

const gasHolderQtyLabels = {
  kg45: "45KG",
  kg9: "9KG",
  loose: "Loose",
};

type WaterTankKey = keyof typeof waterTankQtyLabels;
type GasHolderKey = keyof typeof gasHolderQtyLabels;

const yesNoOptions = ["YES", "NO"];

const WaterTankandGasholders = forwardRef(({ handleNext, initialData }: any, ref) => {
  const formikRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    getValues: () => {
      const values = formikRef.current?.values;
      return {
        water_tanks: {
          front: {
            qty: values.waterTankQty.front || 0,
            size: "95L"
          },
          between: {
            qty: values.waterTankQty.between || 0,
            size: "95L"
          },
          rear: {
            qty: values.waterTankQty.rear || 0,
            size: "95L"
          },
          grey: {
            qty: values.waterTankQty.grey || 0,
            size: "95L"
          },
          covers: values.waterTankCover === "YES"
        },
        gas_holders: {
          kg45: values.gasHolderQty.kg45 || 0,
          kg9: values.gasHolderQty.kg9 || 0,
          loose: values.gasHolderQty.loose || 0
        },
        comments: values.comments
      };
    },
  }));

  const initialValues = {
    waterTankOptions: {
      front: initialData?.water_tanks?.front?.qty > 0 || false,
      between: initialData?.water_tanks?.between?.qty > 0 || false,
      rear: initialData?.water_tanks?.rear?.qty > 0 || false,
      grey: initialData?.water_tanks?.grey?.qty > 0 || false,
    },
    waterTankQty: {
      front: initialData?.water_tanks?.front?.qty || "",
      between: initialData?.water_tanks?.between?.qty || "",
      rear: initialData?.water_tanks?.rear?.qty || "",
      grey: initialData?.water_tanks?.grey?.qty || "",
    },
    waterTankCover: initialData?.water_tanks?.covers ? "YES" : "NO",
    gasHolderOptions: {
      kg45: initialData?.gas_holders?.kg45 > 0 || false,
      kg9: initialData?.gas_holders?.kg9 > 0 || false,
      loose: initialData?.gas_holders?.loose > 0 || false,
    },
    gasHolderQty: {
      kg45: initialData?.gas_holders?.kg45 || "",
      kg9: initialData?.gas_holders?.kg9 || "",
      loose: initialData?.gas_holders?.loose || "",
    },
    comments: initialData?.comments || "",
  };

  return (
    <Formik
      initialValues={initialValues}
      innerRef={formikRef}
      onSubmit={() => handleNext()}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <Box>
            <Typography variant="body1">Water Tank Configuration</Typography>
            <Grid container spacing={2}>
              {Object.entries(values.waterTankOptions).map(([key, checked]) => {
                const typedKey = key as WaterTankKey;
                return (
                  <Grid size={3} key={typedKey}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checked}
                          onChange={(e) => {
                            setFieldValue(
                              `waterTankOptions.${typedKey}`,
                              e.target.checked
                            );
                            if (!e.target.checked) {
                              setFieldValue(`waterTankQty.${typedKey}`, "");
                            }
                          }}
                        />
                      }
                      label={waterTankQtyLabels[typedKey]}
                    />
                  </Grid>
                );
              })}
            </Grid>

            <Grid container spacing={2} mt={2}>
              {Object.entries(values.waterTankOptions).map(([key, checked]) => {
                const typedKey = key as WaterTankKey;
                return (
                  checked && (
                    <Grid size={6} key={typedKey}>
                      <TextField
                        fullWidth
                        size="small"
                        label={`${waterTankQtyLabels[typedKey]} Qty`}
                        value={values.waterTankQty[typedKey]}
                        onChange={(e) =>
                          setFieldValue(
                            `waterTankQty.${typedKey}`,
                            e.target.value
                          )
                        }
                        type="number"
                      />
                    </Grid>
                  )
                );
              })}
            </Grid>
          </Box>

          <Box sx={{ pt: 2, pb: 2 }}>
            <Typography variant="body1">Water tank covers</Typography>
            <CustomTabs
              name="waterTankCover"
              options={yesNoOptions}
              onChange={(val) => setFieldValue("waterTankCover", val)}
              value={values.waterTankCover}
            />
          </Box>

          <Box>
            <Typography variant="body1">Gas Holder</Typography>
            <Grid container spacing={2}>
              {Object.entries(values.gasHolderOptions).map(([key, checked]) => {
                const typedKey = key as GasHolderKey;
                return (
                  <Grid size={3} key={typedKey}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checked}
                          onChange={(e) => {
                            setFieldValue(
                              `gasHolderOptions.${typedKey}`,
                              e.target.checked
                            );
                            if (!e.target.checked) {
                              setFieldValue(`gasHolderQty.${typedKey}`, "");
                            }
                          }}
                        />
                      }
                      label={gasHolderQtyLabels[typedKey]}
                    />
                  </Grid>
                );
              })}
            </Grid>

            <Grid container spacing={2} mt={2}>
              {Object.entries(values.gasHolderOptions).map(([key, checked]) => {
                const typedKey = key as GasHolderKey;
                return (
                  checked && (
                    <Grid size={6} key={typedKey}>
                      <TextField
                        fullWidth
                        size="small"
                        label={`${gasHolderQtyLabels[typedKey]} Qty`}
                        value={values.gasHolderQty[typedKey]}
                        onChange={(e) =>
                          setFieldValue(
                            `gasHolderQty.${typedKey}`,
                            e.target.value
                          )
                        }
                        type="number"
                      />
                    </Grid>
                  )
                );
              })}
            </Grid>
          </Box>

          <Box sx={{ mt: 3 }}>
            <TextField
              label="Comments"
              fullWidth
              multiline
              minRows={3}
              size="small"
              name="comments"
              value={values.comments}
              onChange={(e) => setFieldValue("comments", e.target.value)}
            />
          </Box>

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

export default WaterTankandGasholders;
