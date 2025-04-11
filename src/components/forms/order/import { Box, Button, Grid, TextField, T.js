import { Box, Button, Grid, TextField, Typography, Checkbox, FormControlLabel, Tabs, Tab } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { RefreshOutlined } from "@mui/icons-material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FC, useState } from "react";

interface FormValues {
    customer: string;
    ssChassisNo: string;
    chassisNo: string;
    orderBy: string;
    modelName: string;
    deliveryDate: Date | null;
    chassisWidth: string;
    chassisFront: number;
    chassisWheelArch: number;
    chassisRear: number;
    chassisOverhang: number;
    chassisTotalLength: number;
    chassisFloorJoint: number;
    comments: string;
    batteryBoxFront: boolean;
    batteryBoxBack: boolean;
}

const validationSchema = Yup.object().shape({
    customer: Yup.string().required("Customer is required"),
    ssChassisNo: Yup.string().required("SS Chassis No. is required"),
    chassisNo: Yup.string().required("Chassis No. is required"),
    orderBy: Yup.string().required("Order by is required"),
    modelName: Yup.string().required("Model Name is required"),
    deliveryDate: Yup.date().nullable().required("Delivery Date is required"),
});

const OrderInformations: FC = () => {
    const [tab, setTab] = useState(0);
    return (
        <Formik<FormValues>
            initialValues={{
                customer: "",
                ssChassisNo: "",
                chassisNo: "",
                orderBy: "",
                modelName: "",
                deliveryDate: null,
                chassisWidth: "",
                chassisFront: 0,
                chassisWheelArch: 0,
                chassisRear: 0,
                chassisOverhang: 0,
                chassisTotalLength: 0,
                chassisFloorJoint: 0,
                comments: "",
                batteryBoxFront: false,
                batteryBoxBack: false,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => console.log(values)}
        >
            {({ values, handleChange, setFieldValue }) => (
                <Form>
                    <Grid container spacing={2}>
                        {/* Existing Fields */}
                        {/* New Chassis Fields */}
                        {["chassisWidth", "chassisFront", "chassisWheelArch", "chassisRear", "chassisOverhang", "chassisTotalLength", "chassisFloorJoint"].map((field) => (
                            <Grid size={6}>
                                <Typography>{field.replace(/([A-Z])/g, " $1").trim()}</Typography>
                                <TextField
                                    name={field}
                                    fullWidth
                                    variant="outlined"
                                    value={values[field as keyof FormValues]}
                                    onChange={handleChange}
                                />
                            </Grid>
                        ))}
                        <Grid size={12}>
                            <Typography>Comments</Typography>
                            <TextField name="comments" fullWidth multiline rows={3} variant="outlined" value={values.comments} onChange={handleChange} />
                        </Grid>
                        {/* Battery Box Checkboxes */}
                        <Grid item xs={6}>
                            <FormControlLabel
                                control={<Checkbox checked={values.batteryBoxFront} onChange={(e) => setFieldValue("batteryBoxFront", e.target.checked)} />}
                                label="Battery Box Front"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControlLabel
                                control={<Checkbox checked={values.batteryBoxBack} onChange={(e) => setFieldValue("batteryBoxBack", e.target.checked)} />}
                                label="Battery Box Back"
                            />
                        </Grid>
                        {/* Tabs */}
                        <Grid item xs={12}>
                            <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)}>
                                <Tab label="6’ x 2” - (150mm x 50mm)" />
                                <Tab label="4’ x 2” - (100mm x 50mm)" />
                            </Tabs>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
};

export default OrderInformations;
