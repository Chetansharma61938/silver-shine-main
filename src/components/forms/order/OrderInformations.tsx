import {
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  Box,
  Button,
  Grid as MuiGrid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { RefreshOutlined } from "@mui/icons-material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { supabase } from "@/lib/supabase";
import SignatureCanvasComponent from "@/components/SignatureCanvas";
import CustomButton from "@/components/ui/CustomButton";

interface OrderInformationProps {
  onCustomerIdChange: (id: string) => void;
  handleNext: () => void;
  initialData: any;
  isLoading: boolean;
}

interface FormValues {
  customer: string;
  ssChassisNo: string;
  chassisNo: string;
  orderBy: string;
  modelName: string;
  deliveryDate: Date | null;
  // signature: string;
}

const validationSchema = Yup.object({
  customer: Yup.string().required("Customer is required"),
  ssChassisNo: Yup.string().required("SS Chassis No. is required"),
  chassisNo: Yup.string().required("Chassis No. is required"),
  orderBy: Yup.string().required("Order by is required"),
  modelName: Yup.string().required("Model Name is required"),
  deliveryDate: Yup.date().nullable().required("Delivery Date is required"),
});

const OrderInformation = forwardRef((
  { onCustomerIdChange, handleNext, initialData, isLoading }: OrderInformationProps,
  ref: ForwardedRef<any>
) => {
  const formikRef = useRef<any>(null);
  const [allCustomers, setAllCustomers] = useState<any[]>([]);
  const [custumerId, selectedCustomerId] = useState<any>();
  const signatureRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    getValues: () => ({
      ...formikRef.current?.values,
      customer_id: custumerId,
    }),
    validateForm: () => formikRef.current?.validateForm(),
    submitForm: () => formikRef.current?.submitForm(),
  }));

  useEffect(() => {
    if (custumerId) {
      onCustomerIdChange?.(custumerId);
    }
  }, [custumerId]);

  // Set customer ID when initialData changes
  useEffect(() => {
    if (initialData?.customer_id && !custumerId) {
      selectedCustomerId(initialData.customer_id);
    }
  }, [initialData]);

  const fetchAllCustomers = async () => {
    try {
      console.log('Fetching customers...');
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        console.error("Session error or no session");
        return;
      }

      const { data, error } = await supabase
        .from("customers")
        .select("*")
        .order('name');

      if (error) {
        console.error("Error fetching customers:", error.message);
        return;
      }

      setAllCustomers(data || []);

      // If we have initialData and customer_id, select the correct customer
      if (initialData?.customer_id) {
        const customer = data?.find(c => c.id === initialData.customer_id);
        if (customer) {
          selectedCustomerId(customer.id);
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  useEffect(() => {
    fetchAllCustomers();
  }, []);

  return (
    <Formik<FormValues>
      initialValues={{
        customer: initialData?.customer || "",
        ssChassisNo: initialData?.sschassisno || "",
        chassisNo: initialData?.chassisno || "",
        orderBy: initialData?.orderby || "",
        modelName: initialData?.modelname || "",
        deliveryDate: initialData?.deliverydate ? new Date(initialData.deliverydate) : null,
      }}
      enableReinitialize={true}
      innerRef={formikRef}
      validationSchema={validationSchema}
      onSubmit={() => {
        handleNext();
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
      }) => (
        <Form>
          <MuiGrid container spacing={2}>
            {isLoading ? (
              <MuiGrid item xs={12}>
                <Typography>Loading saved data...</Typography>
              </MuiGrid>
            ) : (
              <>
                {[
                  { name: "customer", label: "Customer" },
                  { name: "ssChassisNo", label: "SS Chassis No." },
                  { name: "chassisNo", label: "Chassis No." },
                  { name: "orderBy", label: "Order By" },
                  { name: "modelName", label: "Model Name" },
                ].map(({ name, label }) => (
                  <MuiGrid item xs={6} key={name} sx={{ mb: 2 }}>
                    {name === "customer" ? (
                      <TextField
                        select
                        label={label}
                        name={name}
                        fullWidth
                        variant="outlined"
                        value={values[name as keyof FormValues]}
                        onChange={(e) => {
                          const selectedName = e.target.value;
                          const selectedCustomer = allCustomers.find(
                            (customer) => customer.name === selectedName
                          );
                          if (selectedCustomer) {
                            selectedCustomerId(selectedCustomer.id);
                          }
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        error={
                          touched[name as keyof FormValues] &&
                          Boolean(errors[name as keyof FormValues])
                        }
                        helperText={
                          touched[name as keyof FormValues] &&
                          errors[name as keyof FormValues]
                        }
                        size="small"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {allCustomers?.map((customer) => (
                          <MenuItem key={customer.id} value={customer.name}>
                            {customer.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    ) : (
                      <TextField
                        label={label}
                        name={name}
                        fullWidth
                        variant="outlined"
                        value={values[name as keyof FormValues]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          touched[name as keyof FormValues] &&
                          Boolean(errors[name as keyof FormValues])
                        }
                        helperText={
                          touched[name as keyof FormValues] &&
                          errors[name as keyof FormValues]
                        }
                        size="small"
                      />
                    )}
                  </MuiGrid>
                ))}
                <MuiGrid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Delivery Date"
                      value={values.deliveryDate}
                      onChange={(date) => setFieldValue("deliveryDate", date)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          variant: "outlined",
                          error:
                            touched.deliveryDate && Boolean(errors.deliveryDate),
                          helperText: touched.deliveryDate && errors.deliveryDate,
                          size: "small",
                        },
                      }}
                    />
                  </LocalizationProvider>
                </MuiGrid>
                <MuiGrid item xs={12}>
                  <Typography variant="subtitle1">Signature</Typography>
                  <SignatureCanvasComponent ref={signatureRef} />
                  <Box display="flex" justifyContent="flex-end" mt={1}>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => {
                        signatureRef.current?.clear();
                      }}
                      startIcon={<RefreshOutlined />}
                    >
                      Clear Signature
                    </Button>
                  </Box>
                </MuiGrid>
              </>
            )}
          </MuiGrid>
          <Box
            sx={{
              position: "absolute",
              right: 20,
              pt: 5,
            }}
          >
            <CustomButton type="submit" disabled={isLoading}>Next</CustomButton>
          </Box>
        </Form>
      )}
    </Formik>
  );
});

export default OrderInformation;
