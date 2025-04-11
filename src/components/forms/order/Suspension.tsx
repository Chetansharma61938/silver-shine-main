import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import logo1 from "../../../../public/assets/logo-1-gtMnTXqJ.jpg";
import logo2 from "../../../../public/assets/logo-2-B_Y7VMks.jpg";
import logo3 from "../../../../public/assets/logo-3-DtfmQg6p.jpg";
import logo4 from "../../../../public/assets/logo-4-7KT6Jd4s.jpg";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import CustomButton from "@/components/ui/CustomButton";
import * as Yup from "yup";

interface SuspensionProps {
  handleNext: () => void;
  initialData?: any;
  isLoading?: boolean;
}

const validationSchema = Yup.object().shape({
  suspensionType: Yup.string().required("Suspension Type is required"),
  offRoadLogo: Yup.string().when('suspensionType', {
    is: "OFF ROAD",
    then: () => Yup.string().required("Logo selection is required"),
  }),
  atmOption: Yup.string().when('suspensionType', {
    is: "OFF ROAD",
    then: () => Yup.string().required("ATM option is required"),
  }),
  customATM: Yup.string().when('atmOption', {
    is: "Custom ATM",
    then: () => Yup.string().required("Custom ATM value is required"),
  }),
  onRoadType: Yup.string().when('suspensionType', {
    is: "ON ROAD",
    then: () => Yup.string().required("On Road Type is required"),
  }),
  axleType: Yup.string().when('suspensionType', {
    is: "ON ROAD",
    then: () => Yup.string().required("Axle Type is required"),
  }),
  customAxle: Yup.string().when('axleType', {
    is: "Custom",
    then: () => Yup.string().required("Custom Axle value is required"),
  }),
  comment: Yup.string(),
});

const Suspension = forwardRef(({ handleNext, initialData, isLoading }: SuspensionProps, ref) => {
  const formikRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    getValues: () => formikRef.current?.values,
    validateForm: () => formikRef.current?.validateForm(),
    submitForm: () => formikRef.current?.submitForm(),
  }));

  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const [selectedLogo, setSelectedLogo] = useState<string | null>(null);
  const [selectedATM, setSelectedATM] = useState<string | null>(null);
  const [selectedOnRoadType, setSelectedOnRoadType] = useState<string | null>(null);
  const [selectedAxleType, setSelectedAxleType] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      // Convert all values to uppercase for comparison
      const suspensionType = initialData.suspensiontype?.toUpperCase() || null;
      const offRoadLogo = initialData.offroadlogo?.toUpperCase() || null;
      const atmOption = initialData.atmoption?.toUpperCase() || null;
      const onRoadType = initialData.onroadtype?.toUpperCase() || null;
      const axleType = initialData.axletype?.toUpperCase() || null;

      setSelectedTab(suspensionType);
      setSelectedLogo(offRoadLogo);
      setSelectedATM(atmOption);
      setSelectedOnRoadType(onRoadType);
      setSelectedAxleType(axleType);
    }
  }, [initialData]);

  const offRoadLogos = [
    {
      name: "Logo1",
      src: logo1,
      atms: ["2750kg ATM", "3000kg ATM", "3300kg ATM", "3500-4500kg ATM", "Custom ATM"],
    },
    {
      name: "Logo2",
      src: logo2,
      atms: ["2800kg ATM", "3000kg ATM", "3300kg ATM", "3500-4500kg ATM", "Custom ATM"],
    },
    {
      name: "Logo3",
      src: logo3,
      atms: ["CROSS COUNTRY", "ENDURO X", "ENDURO2.7", "3300kg ATM", "3500-4500kg ATM", "Custom ATM"],
    },
    {
      name: "Logo4",
      src: logo4,
      atms: ["None", "2750kg ATM", "3000kg ATM", "3300kg ATM", "3500kg ATM", "3500-4500kg ATM", "Custom ATM"],
    },
  ];

  const torflexOptions = ["2000kg", "2200kg", "2500kg", "Custom"];
  const rollerRockerOptions = [
    "1450kg",
    "1600kg",
    "2000kg",
    "2200kg",
    "2500kg",
    "3200kg",
    "3500kg",
    "Custom",
  ];
  const axleOptions = ["Single", "Tandem", "Custom"];

  return (
    <Formik
      initialValues={{
        suspensionType: initialData?.suspensiontype?.toUpperCase() || "",
        offRoadLogo: initialData?.offroadlogo?.toUpperCase() || "",
        atmOption: initialData?.atmoption?.toUpperCase() || "",
        onRoadType: initialData?.onroadtype?.toUpperCase() || "",
        axleType: initialData?.axletype?.toUpperCase() || "",
        comment: initialData?.comment || "",
        customATM: initialData?.customatm || "",
        customAxle: initialData?.customaxle || "",
      }}
      enableReinitialize={true}
      validationSchema={validationSchema}
      innerRef={formikRef}
      onSubmit={(values, { setSubmitting }) => {
        // Only proceed if all required fields are filled
        if (values.suspensionType) {
          if (values.suspensionType === "OFF ROAD") {
            if (!values.offRoadLogo || !values.atmOption) {
              setSubmitting(false);
              return;
            }
            if (values.atmOption === "Custom ATM" && !values.customATM) {
              setSubmitting(false);
              return;
            }
          } else if (values.suspensionType === "ON ROAD") {
            if (!values.onRoadType || !values.axleType) {
              setSubmitting(false);
              return;
            }
            if (values.axleType === "Custom" && !values.customAxle) {
              setSubmitting(false);
              return;
            }
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
            <div className="space-y-6">
              {/* Suspension Type Selection */}
              <div>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Suspension Type
                </Typography>
                <div className="flex gap-3">
                  {["OFF ROAD", "ON ROAD"].map((label) => (
                    <Button
                      key={label}
                      variant="contained"
                      sx={{
                        backgroundColor:
                          values.suspensionType === label ? "#cc2e2b" : "#f3f3f3",
                        color: values.suspensionType === label ? "#fff" : "black",
                      }}
                      onClick={() => {
                        setFieldValue("suspensionType", values.suspensionType === label ? "" : label);
                        setSelectedTab(values.suspensionType === label ? null : label);
                        if (values.suspensionType === label) {
                          setSelectedLogo(null);
                          setSelectedATM(null);
                          setSelectedOnRoadType(null);
                          setSelectedAxleType(null);
                          setFieldValue("offRoadLogo", "");
                          setFieldValue("atmOption", "");
                          setFieldValue("onRoadType", "");
                          setFieldValue("axleType", "");
                          setFieldValue("customATM", "");
                          setFieldValue("customAxle", "");
                        }
                      }}
                    >
                      {label}
                    </Button>
                  ))}
                </div>
                {touched.suspensionType && errors.suspensionType && (
                  <Typography color="error" variant="caption">
                    {String(errors.suspensionType)}
                  </Typography>
                )}
              </div>

              {/* OFF ROAD Section */}
              {selectedTab === "OFF ROAD" && (
                <>
                  <div>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      Select Logo
                    </Typography>
                    <div className="flex flex-wrap gap-3">
                      {offRoadLogos.map((logo) => (
                        <Button
                          key={logo.name}
                          onClick={() => {
                            const newLogo = selectedLogo === logo.name.toUpperCase() ? null : logo.name.toUpperCase();
                            setSelectedLogo(newLogo);
                            setFieldValue("offRoadLogo", newLogo || "");
                            setFieldValue("atmOption", "");
                            setSelectedATM(null);
                          }}
                          sx={{
                            border: "1px solid #ccc",
                            padding: 1,
                            minWidth: "80px",
                            backgroundColor:
                              selectedLogo === logo.name.toUpperCase() ? "#cc2e2b" : "transparent",
                          }}
                        >
                          <img
                            src={logo.src}
                            alt={logo.name}
                            style={{
                              width: "180px",
                              height: "90px",
                              objectFit: "cover",
                              borderRadius: "8px",
                            }}
                          />
                        </Button>
                      ))}
                    </div>
                    {touched.offRoadLogo && errors.offRoadLogo && (
                      <Typography color="error" variant="caption">
                        {String(errors.offRoadLogo)}
                      </Typography>
                    )}
                  </div>

                  {/* ATM Options based on Selected Logo */}
                  {selectedLogo && (
                    <div>
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        Select ATM Option
                      </Typography>
                      <div className="flex flex-wrap gap-3">
                        {offRoadLogos
                          .find((logo) => logo.name.toUpperCase() === selectedLogo)
                          ?.atms.map((atm) => (
                            <Button
                              key={atm}
                              variant="contained"
                              sx={{
                                backgroundColor:
                                  selectedATM === atm.toUpperCase() ? "#cc2e2b" : "#f3f3f3",
                                color: selectedATM === atm.toUpperCase() ? "#fff" : "black",
                              }}
                              onClick={() => {
                                setSelectedATM(selectedATM === atm.toUpperCase() ? null : atm.toUpperCase());
                                setFieldValue("atmOption", selectedATM === atm.toUpperCase() ? "" : atm.toUpperCase());
                                if (selectedATM === atm.toUpperCase()) {
                                  setFieldValue("customATM", "");
                                }
                              }}
                            >
                              {atm}
                            </Button>
                          ))}
                      </div>
                      {touched.atmOption && errors.atmOption && (
                        <Typography color="error" variant="caption">
                          {String(errors.atmOption)}
                        </Typography>
                      )}
                    </div>
                  )}

                  {/* Custom ATM Input */}
                  {selectedATM === "CUSTOM ATM" && (
                    <div>
                      <TextField
                        label="Custom ATM Value"
                        fullWidth
                        size="small"
                        value={values.customATM}
                        onChange={(e) => setFieldValue("customATM", e.target.value)}
                        error={touched.customATM && !!errors.customATM}
                        helperText={touched.customATM && String(errors.customATM)}
                      />
                    </div>
                  )}
                </>
              )}

              {/* ON ROAD Section */}
              {selectedTab === "ON ROAD" && (
                <>
                  <div>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      Select Type
                    </Typography>
                    <div className="flex flex-wrap gap-3">
                      {["Torflex", "Roller Rocker"].map((type) => (
                        <Button
                          key={type}
                          variant="contained"
                          sx={{
                            backgroundColor:
                              selectedOnRoadType === type.toUpperCase() ? "#cc2e2b" : "#f3f3f3",
                            color: selectedOnRoadType === type.toUpperCase() ? "#fff" : "black",
                          }}
                          onClick={() => {
                            setSelectedOnRoadType(selectedOnRoadType === type.toUpperCase() ? null : type.toUpperCase());
                            setFieldValue("onRoadType", selectedOnRoadType === type.toUpperCase() ? "" : type.toUpperCase());
                            setFieldValue("axleType", "");
                            setSelectedAxleType(null);
                          }}
                        >
                          {type}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Axle Type Selection */}
                  {selectedOnRoadType && (
                    <div>
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        Select Axle Type
                      </Typography>
                      <div className="flex flex-wrap gap-3">
                        {axleOptions.map((axle) => (
                          <Button
                            key={axle}
                            variant="contained"
                            sx={{
                              backgroundColor:
                                selectedAxleType === axle.toUpperCase() ? "#cc2e2b" : "#f3f3f3",
                              color: selectedAxleType === axle.toUpperCase() ? "#fff" : "black",
                            }}
                            onClick={() => {
                              setSelectedAxleType(selectedAxleType === axle.toUpperCase() ? null : axle.toUpperCase());
                              setFieldValue("axleType", selectedAxleType === axle.toUpperCase() ? "" : axle.toUpperCase());
                              if (selectedAxleType === axle.toUpperCase()) {
                                setFieldValue("customAxle", "");
                              }
                            }}
                          >
                            {axle}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Custom Axle Input */}
                  {selectedAxleType === "CUSTOM" && (
                    <div>
                      <TextField
                        label="Custom Axle Value"
                        fullWidth
                        size="small"
                        value={values.customAxle}
                        onChange={(e) => setFieldValue("customAxle", e.target.value)}
                        error={touched.customAxle && !!errors.customAxle}
                        helperText={touched.customAxle && String(errors.customAxle)}
                      />
                    </div>
                  )}
                </>
              )}

              {/* Comment */}
              <div>
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
              </div>
            </div>
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

export default Suspension;
