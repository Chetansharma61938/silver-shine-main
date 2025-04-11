import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import { Formik, Form, FormikProps } from "formik";
import {
  MenuItem,
  Select,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import CustomTabs from "@/components/ui/CustomTabs";
import * as Yup from "yup";

interface WheelsAndTyresProps {
  handleNext: () => void;
  initialData?: any;
  isLoading?: boolean;
}

const tyreOptions = ["Tyre A", "Tyre B", "Tyre C"];
const wheelTypeMapping: Record<string, string[]> = {
  "Tyre A": ["Wheel Type A1", "Wheel Type A2"],
  "Tyre B": ["Wheel Type B1", "Wheel Type B2"],
  "Tyre C": ["Wheel Type C1", "Wheel Type C2"],
};
const wheelSizeOptions = ["15 inch", "16 inch", "17 inch"];
const spareWheelOptions = ["YES", "NO"];
const spareWheelPositionOptions = ["UNDERSLUNG", "ON AFRAME", "ON BUMPER BAR"];
const noOfSpareWheelOptions = ["1", "2"];

const WheelsAndTyres = forwardRef(({ handleNext, initialData, isLoading = false }: WheelsAndTyresProps, ref) => {
  const formikRef = useRef<FormikProps<any>>(null);

  useImperativeHandle(ref, () => ({
    getValues: () => {
      if (formikRef.current) {
        return {
          tyre: selectedTyre,
          wheeltype: selectedWheelType,
          wheelsize: formikRef.current.values.wheelsize,
          sparewheel: selectedSpareWheel,
          noofsparewheel: selectedNoOfSpareWheel,
          sparewheelposition: selectedSpareWheelPosition,
          comments: formikRef.current.values.comments,
        };
      }
      return null;
    },
    validateForm: () => formikRef.current?.validateForm(),
    submitForm: () => formikRef.current?.submitForm(),
  }));

  const [wheelTypeOptions, setWheelTypeOptions] = useState<string[]>([]);
  const [selectedTyre, setSelectedTyre] = useState<string>(
    initialData?.tyre || ""
  );
  const [selectedWheelType, setSelectedWheelType] = useState<string>(
    initialData?.wheeltype || ""
  );
  const [selectedSpareWheel, setSelectedSpareWheel] = useState<string>(
    initialData?.sparewheel?.toUpperCase() || ""
  );
  const [selectedNoOfSpareWheel, setSelectedNoOfSpareWheel] = useState<string>(
    initialData?.noofsparewheel || ""
  );
  const [selectedSpareWheelPosition, setSelectedSpareWheelPosition] = useState<string>(
    initialData?.sparewheelposition?.toUpperCase() || ""
  );

  // Update states when initialData changes
  useEffect(() => {
    if (initialData) {
      const tyre = initialData.tyre || "";
      setSelectedTyre(tyre);
      setWheelTypeOptions(wheelTypeMapping[tyre] || []);
      setSelectedWheelType(initialData.wheeltype || "");
      setSelectedSpareWheel(initialData.sparewheel?.toUpperCase() || "");
      setSelectedNoOfSpareWheel(initialData.noofsparewheel || "");
      setSelectedSpareWheelPosition(initialData.sparewheelposition?.toUpperCase() || "");
    }
  }, [initialData]);

  // Update wheel type options when tyre changes
  useEffect(() => {
    if (selectedTyre) {
      setWheelTypeOptions(wheelTypeMapping[selectedTyre] || []);
    }
  }, [selectedTyre]);

  const validationSchema = Yup.object().shape({
    tyre: Yup.string()
      .required("Tyre selection is required"),
    wheeltype: Yup.string()
      .when('tyre', {
        is: (val: string) => !!val,
        then: () => Yup.string().required("Wheel Type is required"),
      }),
    wheelsize: Yup.string()
      .when('wheeltype', {
        is: (val: string) => !!val,
        then: () => Yup.string().required("Wheel Size is required"),
      }),
    sparewheel: Yup.string()
      .required("Spare Wheel selection is required")
      .oneOf(spareWheelOptions, "Invalid option selected"),
    noofsparewheel: Yup.string()
      .when('sparewheel', {
        is: "YES",
        then: () => Yup.string()
          .required("Number of Spare Wheels is required")
          .oneOf(noOfSpareWheelOptions, "Invalid option selected"),
      }),
    sparewheelposition: Yup.string()
      .when('sparewheel', {
        is: "YES",
        then: () => Yup.string()
          .required("Spare Wheel Position is required")
          .oneOf(spareWheelPositionOptions, "Invalid option selected"),
      }),
    comments: Yup.string(),
  });

  return (
    <Formik
      initialValues={{
        tyre: selectedTyre,
        wheeltype: selectedWheelType,
        wheelsize: initialData?.wheelsize || "",
        sparewheel: selectedSpareWheel,
        noofsparewheel: selectedNoOfSpareWheel,
        sparewheelposition: selectedSpareWheelPosition,
        comments: initialData?.comments || "",
      }}
      enableReinitialize={true}
      validationSchema={validationSchema}
      innerRef={formikRef}
      onSubmit={() => handleNext()}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Form className="space-y-6">
          {isLoading ? (
            <Typography>Loading saved data...</Typography>
          ) : (
            <>
              {/* === Tyres Section === */}
              <div>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Tyres
                </Typography>
                <Select
                  fullWidth
                  size="small"
                  value={selectedTyre}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedTyre(value);
                    setFieldValue("tyre", value);
                    setSelectedWheelType("");
                    setFieldValue("wheeltype", "");
                    setFieldValue("wheelsize", "");
                  }}
                >
                  <MenuItem value="">None</MenuItem>
                  {tyreOptions.map((tyre) => (
                    <MenuItem key={tyre} value={tyre}>
                      {tyre}
                    </MenuItem>
                  ))}
                </Select>
                {touched.tyre && errors.tyre && (
                  <Typography color="error" variant="caption">
                    {String(errors.tyre)}
                  </Typography>
                )}
              </div>

              {/* === Wheel Type Section === */}
              {selectedTyre && (
                <div>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Wheel Type
                  </Typography>
                  <Select
                    fullWidth
                    size="small"
                    value={selectedWheelType}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSelectedWheelType(value);
                      setFieldValue("wheeltype", value);
                      setFieldValue("wheelsize", "");
                    }}
                  >
                    <MenuItem value="">None</MenuItem>
                    {wheelTypeOptions.map((wheel) => (
                      <MenuItem key={wheel} value={wheel}>
                        {wheel}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.wheeltype && errors.wheeltype && (
                    <Typography color="error" variant="caption">
                      {String(errors.wheeltype)}
                    </Typography>
                  )}
                </div>
              )}

              {/* === Wheel Size Section === */}
              {selectedWheelType && (
                <div>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Wheel Size
                  </Typography>
                  <Select
                    fullWidth
                    size="small"
                    value={values.wheelsize}
                    onChange={(e) => setFieldValue("wheelsize", e.target.value)}
                  >
                    <MenuItem value="">None</MenuItem>
                    {wheelSizeOptions.map((size) => (
                      <MenuItem key={size} value={size}>
                        {size}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.wheelsize && errors.wheelsize && (
                    <Typography color="error" variant="caption">
                      {String(errors.wheelsize)}
                    </Typography>
                  )}
                </div>
              )}

              {/* === Spare Wheel Section === */}
              <div>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Spare Wheel
                </Typography>
                <CustomTabs
                  options={spareWheelOptions}
                  selected={selectedSpareWheel}
                  onChange={(value: string) => {
                    setSelectedSpareWheel(value);
                    setFieldValue("sparewheel", value);
                    if (value !== "YES") {
                      setSelectedNoOfSpareWheel("");
                      setSelectedSpareWheelPosition("");
                      setFieldValue("noofsparewheel", "");
                      setFieldValue("sparewheelposition", "");
                    }
                  }}
                  value={values.sparewheel}
                />
              </div>

              {/* === Number of Spare Wheels Section === */}
              {selectedSpareWheel === "YES" && (
                <div>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Number of Spare Wheels
                  </Typography>
                  <CustomTabs
                    options={noOfSpareWheelOptions}
                    selected={selectedNoOfSpareWheel}
                    onChange={(value: string) => {
                      setSelectedNoOfSpareWheel(value);
                      setFieldValue("noofsparewheel", value);
                    }}
                    value={values.noofsparewheel}
                  />
                </div>
              )}

              {/* === Spare Wheel Position Section === */}
              {selectedSpareWheel === "YES" && (
                <div>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Spare Wheel Position
                  </Typography>
                  <CustomTabs
                    options={spareWheelPositionOptions}
                    selected={selectedSpareWheelPosition}
                    onChange={(value: string) => {
                      setSelectedSpareWheelPosition(value);
                      setFieldValue("sparewheelposition", value);
                    }}
                    value={values.sparewheelposition}
                  />
                </div>
              )}

              {/* === Comments Section === */}
              <div>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Comments
                </Typography>
                <TextField
                  name="comments"
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                  placeholder="Enter any additional comments here..."
                  value={values.comments}
                  onChange={(e) => setFieldValue("comments", e.target.value)}
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

WheelsAndTyres.displayName = "WheelsAndTyres";

export default WheelsAndTyres;
