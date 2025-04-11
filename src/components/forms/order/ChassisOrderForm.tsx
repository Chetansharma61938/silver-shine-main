"use client";
import CustomButton from "@/components/ui/CustomButton";
import BumpersAndExterior from "./BumpersAndExterior";
import ChassisConfiguration from "./ChassisConfiguration";
import ChassisDimensions from "./ChassisDimensions";
import ChassisFrame from "./ChassisFrame";
import CustomiseSuspension from "./CustomiseSuspension";
import ModelType from "./ModelType";
import OrderInformations from "./OrderInformations";
import StepLocations from "./StepLocations";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Suspension from "./Suspension";
import WheelsAndTyres from "./WheelsAndTyres";
import toLowerCaseValues from "@/components/toLowerCaseValues";
import DownloadIcon from "@mui/icons-material/Download";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import Silvershinelogo from "../../../../public/assets/Silvershine.webp";
import fetchAllChassisData from "@/utils/fetchAllChassisData";
import ChassisOrderFormPdf from "@/components/ChassisOrderForm";
import PersonalInfo from "./PersonalInfo";
import Extras from "./Extras";
import WaterTankandGasholders from "./WaterTankandGasholders";

// Logo component
const Logo = () => (
  <Box className="w-[100px] h-[100px] bg-white rounded-md flex items-center justify-center">
    <img
      src={Silvershinelogo}
      alt="Silver Shine Chassis"
      className="w-[80px] h-[80px]"
    />
  </Box>
);

// Step data
const steps = [
  "Order Informations",
  "Model Type",
  "Chassis Dimensions",
  "Step Locations",
  "Chassis Frame and a-frame",
  "Chassis Configuration",
  "Suspension",
  "Customise Suspension",
  "Wheels and Tyres",
  "Bumpers and exterior",
  "Water Tank and Gas holders",
  "Extras",
  "Personal Info",
];

// Main component
export default function () {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<any[]>([]);
  const [customerid, setCustomerId] = useState("");
  const [chassisData, setChassisData] = useState<any>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(
    new Array(steps.length).fill(false)
  );
  const [openPreview, setOpenPreview] = useState<boolean>(false);
  const navigate = useNavigate();

  // Load saved data when customer ID changes
  useEffect(() => {
    const loadSavedData = async () => {
      if (!customerid) return;
      
      setIsLoading(true);
      try {
        const tables = [
          "order_informations",
          "model_type_details",
          "chassisdetails",
          "steplocation",
          "chassiframe",
          "chassiconfiguration",
          "suspension",
          "customsuspension",
          "wheelsandtyres",
          "bumpersandexterior",
          "tankdetails",
          "extrasdetails",
          "contactdetails"
        ];

        const newFormData: Record<string, any> = {};

        for (const table of tables) {
          const { data, error } = await supabase
            .from(table)
            .select("*")
            .eq("customer_id", customerid)
            .order("created_at", { ascending: false })
            .limit(1);

          if (data && data.length > 0) {
            // Special handling for customsuspension table
            if (table === 'customsuspension') {
              const customsuspensionData = data[0];
              // Ensure all fields are properly mapped
              if (customsuspensionData.airbags !== undefined) {
                customsuspensionData.airbags = customsuspensionData.airbags.toUpperCase();
              }
              if (customsuspensionData.coilspring !== undefined) {
                customsuspensionData.coilspring = customsuspensionData.coilspring.toUpperCase();
              }
              if (customsuspensionData.braketype !== undefined) {
                customsuspensionData.braketype = customsuspensionData.braketype.toUpperCase();
              }
              if (customsuspensionData.airbagstage !== undefined) {
                customsuspensionData.airbagstage = customsuspensionData.airbagstage;
              }
              if (customsuspensionData.comments !== undefined) {
                customsuspensionData.comments = customsuspensionData.comments;
              }
              newFormData[table] = customsuspensionData;
            } else {
              newFormData[table] = data[0];
            }
            
            // Mark step as completed if we have data
            const stepIndex = getStepIndexForTable(table);
            if (stepIndex !== -1) {
              setCompletedSteps(prev => {
                const newCompleted = [...prev];
                newCompleted[stepIndex] = true;
                return newCompleted;
              });
            }
          }
        }

        setFormData(newFormData);
      } catch (error) {
        console.error("Error loading saved data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedData();
  }, [customerid]);

  // Helper function to get step index for a table
  const getStepIndexForTable = (table: string): number => {
    const tableToStepMap: Record<string, number> = {
      "order_informations": 0,
      "model_type_details": 1,
      "chassisdetails": 2,
      "steplocation": 3,
      "chassiframe": 4,
      "chassiconfiguration": 5,
      "suspension": 6,
      "customsuspension": 7,
      "wheelsandtyres": 8,
      "bumpersandexterior": 9,
      "tankdetails": 10,
      "extrasdetails": 11,
      "contactdetails": 12
    };
    return tableToStepMap[table] ?? -1;
  };

  const handleSubmit = async (table: string) => {
    const currentForm = stepRefs.current[activeStep];
    
    if (currentForm && currentForm.getValues) {
      const values = currentForm.getValues();
      
      // Special handling for wheelsandtyres table
      if (table === 'wheelsandtyres') {
        const payload = {
          tyre: values.tyre,
          wheeltype: values.wheeltype,
          wheelsize: values.wheelsize,
          sparewheel: values.sparewheel?.toUpperCase(),
          noofsparewheel: values.noofsparewheel,
          sparewheelposition: values.sparewheelposition?.toUpperCase(),
          comments: values.comments,
          customer_id: customerid,
        };

        // Update form data state immediately for better UX
        setFormData(prev => ({
          ...prev,
          [table]: payload
        }));

        // Mark step as completed
        setCompletedSteps(prev => {
          const newCompleted = [...prev];
          newCompleted[activeStep] = true;
          return newCompleted;
        });

        // Insert data and return the order_id
        const { data, error } = await supabase
          .from(table)
          .upsert(payload)
          .select();

        if (error) {
          console.error(`Error saving ${table}:`, error);
          return;
        }

        if (data && data.length > 0) {
          return data[0].order_id;
        }
        return;
      }

      // Transform field names before lowercasing
      if (table === 'chassisdetails' && values.chassisFloorJoint !== undefined) {
        values.floor_joint = values.chassisFloorJoint;
        delete values.chassisFloorJoint;
      }

      // Special handling for customsuspension table
      if (table === 'customsuspension') {
        // Ensure all fields are properly handled
        if (values.airbags !== undefined) {
          values.airbags = values.airbags.toUpperCase();
        }
        if (values.coilSpring !== undefined) {
          values.coilspring = values.coilSpring.toUpperCase();
        }
        if (values.brakeType !== undefined) {
          values.braketype = values.brakeType.toUpperCase();
        }
        if (values.airbagStage !== undefined) {
          values.airbagstage = values.airbagStage;
        }
        if (values.comments !== undefined) {
          values.comments = values.comments;
        }
        
        // Create the payload with the correct field names
        const payload = {
          airbags: values.airbags,
          coilspring: values.coilspring,
          braketype: values.braketype,
          airbagstage: values.airbagstage,
          comments: values.comments,
          customer_id: customerid,
        };

        // Update form data state immediately for better UX
        setFormData(prev => ({
          ...prev,
          [table]: payload
        }));

        // Mark step as completed
        setCompletedSteps(prev => {
          const newCompleted = [...prev];
          newCompleted[activeStep] = true;
          return newCompleted;
        });

        // Insert data and return the order_id
        const { data, error } = await supabase
          .from(table)
          .upsert(payload)
          .select();

        if (error) {
          console.error(`Error saving ${table}:`, error);
          return;
        }

        if (data && data.length > 0) {
          return data[0].order_id;
        }
      }
      
      const lowerCasedValues = toLowerCaseValues(values);

      const payload = {
        ...lowerCasedValues,
        customer_id: customerid,
      };

      // Update form data state immediately for better UX
      setFormData(prev => ({
        ...prev,
        [table]: payload
      }));

      // Mark step as completed
      setCompletedSteps(prev => {
        const newCompleted = [...prev];
        newCompleted[activeStep] = true;
        return newCompleted;
      });

      // Insert data and return the order_id
      const { data, error } = await supabase
        .from(table)
        .upsert(payload)
        .select();

      if (error) {
        console.error(`Error saving ${table}:`, error);
        return;
      }

      if (data && data.length > 0) {
        return data[0].order_id;
      }
    }
  };

  const handleNext = async () => {
    switch (steps[activeStep]) {
      case "Order Informations":
        await handleSubmit("order_informations");
        break;
      case "Model Type":
        await handleSubmit("model_type_details");
        break;
      case "Chassis Dimensions":
        await handleSubmit("chassisdetails");
        break;
      case "Step Locations":
        await handleSubmit("steplocation");
        break;
      case "Chassis Frame and a-frame":
        await handleSubmit("chassiframe");
        break;
      case "Chassis Configuration":
        await handleSubmit("chassiconfiguration");
        break;
      case "Suspension":
        await handleSubmit("suspension");
        break;
      case "Customise Suspension":
        await handleSubmit("customsuspension");
        break;
      case "Wheels and Tyres":
        await handleSubmit("wheelsandtyres");
        break;
      case "Bumpers and exterior":
        await handleSubmit("bumpersandexterior");
        break;
      case "Water Tank and Gas holders":
        await handleSubmit("tankdetails");
        break;
      case "Extras":
        await handleSubmit("extrasdetails");
        break;
      case "Personal Info":
        await handleSubmit("contactdetails");
        setActiveStep(0);
        navigate("/orders"); // 👈 Redirect to home page
        return;
      default:
        break;
    }
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepClick = (step: number) => {
    // setActiveStep(step);
    // Prevent navigation to the next step if the form is not completed
    if (!completedSteps[step] && step !== activeStep) {
      // alert("Please complete the current step before moving to the next one.");
      return;
    }
    setActiveStep(step);
  };

  // Render the current step content
  const getStepContent = (step: number) => {
    const tableName = getTableName(step);
    const props = {
      ref: (el: any) => (stepRefs.current[step] = el),
      errors: stepRefs.current[step]?.formik?.errors,
      touched: stepRefs.current[step]?.formik?.touched,
      handleSubmit,
      handleNext,
      initialData: formData[tableName] || {},
      isLoading,
      onCustomerIdChange: setCustomerId,
    };

    switch (steps[step]) {
      case "Order Informations":
        return <OrderInformations {...props} />;
      case "Model Type":
        return <ModelType {...props} />;
      case "Chassis Dimensions":
        return <ChassisDimensions {...props} />;
      case "Step Locations":
        return <StepLocations {...props} />;
      case "Chassis Frame and a-frame":
        return <ChassisFrame {...props} />;
      case "Chassis Configuration":
        return <ChassisConfiguration {...props} />;
      case "Suspension":
        return <Suspension {...props} />;
      case "Customise Suspension":
        return <CustomiseSuspension {...props} />;
      case "Wheels and Tyres":
        return <WheelsAndTyres {...props} />;
      case "Bumpers and exterior":
        return <BumpersAndExterior {...props} />;
      case "Water Tank and Gas holders":
        return <WaterTankandGasholders {...props} />;
      case "Extras":
        return <Extras {...props} />;
      case "Personal Info":
        return <PersonalInfo {...props} />;
      default:
        return null;
    }
  };

  // Helper function to get table name for current step
  const getTableName = (step: number): string => {
    switch (step) {
      case 0: return "order_informations";
      case 1: return "model_type_details";
      case 2: return "chassisdetails";
      case 3: return "steplocation";
      case 4: return "chassiframe";
      case 5: return "chassiconfiguration";
      case 6: return "suspension";
      case 7: return "customsuspension";
      case 8: return "wheelsandtyres";
      case 9: return "bumpersandexterior";
      case 10: return "tankdetails";
      case 11: return "extrasdetails";
      case 12: return "contactdetails";
      default: return "";
    }
  };

  const handlePreview = async () => {
    const allData = await fetchAllChassisData(customerid);

    if (allData) {
      setChassisData(allData);
    }
    setOpenPreview(true);
  };

  const componentRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    const element = componentRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.getWidth(); // 210mm
    const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm
    const margin = 10; // mm

    const availableWidth = pageWidth - margin * 2;
    const availableHeight = pageHeight - margin * 2;

    // Convert px to mm (1px = 0.264583 mm)
    const imgWidth = canvas.width * 0.264583;
    const imgHeight = canvas.height * 0.264583;

    // Scale image to fit within A4 margins
    let scaledWidth = availableWidth;
    let scaledHeight = (imgHeight / imgWidth) * scaledWidth;

    if (scaledHeight > availableHeight) {
      scaledHeight = availableHeight;
      scaledWidth = (imgWidth / imgHeight) * scaledHeight;
    }

    const x = (pageWidth - scaledWidth) / 2;
    const y = (pageHeight - scaledHeight) / 2;

    pdf.addImage(imgData, "PNG", x, y, scaledWidth, scaledHeight);
    pdf.save("Chassis_Order_Form.pdf");
  };

  return (
    <>
      <Box className="min-h-screen bg-gray-100 flex flex-col">
        <Container maxWidth={false} className="flex-1 py-6 px-8 flex flex-col">
          <Box className="flex justify-between items-center mb-3">
            <Logo />
            <Typography
              variant="h4"
              className="text-gray-800 font-medium text-right flex-1 ml-5"
            >
              Silver Shine Chassis Order Form
            </Typography>
          </Box>

          <Box className="flex flex-1 gap-8">
            {/* Left sidebar */}
            <Box className="w-[240px] flex-shrink-0">
              {steps.map((label, index) => (
                <Box
                  key={label}
                  onClick={() => handleStepClick(index)}
                  className={`cursor-pointer py-3 border-b border-gray-400/30 ${
                    activeStep === index
                      ? "border-gray-700"
                      : "border-gray-400/30"
                  }`}
                >
                  <Typography
                    className={`${
                      activeStep === index
                        ? "text-gray-900 font-medium"
                        : "text-gray-600 font-normal"
                    }`}
                  >
                    {label}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Paper className="flex-1 p-6 rounded-lg relative shadow-lg bg-white flex flex-col">
              {getStepContent(activeStep)}

              <Box display="flex" mt={4}>
                <CustomButton
                  // customColor="#0d47a1"
                  // customBgColor="#e3f2fd"
                  // customHoverColor="#bbdefb"
                  // textTransform="uppercase"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  Prev
                </CustomButton>
                <Box
                  display="flex"
                  gap={2}
                  sx={{ marginLeft: "auto", marginRight: 13 }}
                >
                  {activeStep === 12 && (
                    <CustomButton
                      variant="outlined"
                      color="primary"
                      onClick={handlePreview}
                    >
                      Preview
                    </CustomButton>
                  )}
                </Box>
              </Box>
            </Paper>
          </Box>
        </Container>
      </Box>
      <Dialog
        open={openPreview}
        onClose={() => setOpenPreview(false)}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            Chassis Order Form Preview
            <Tooltip title="Download Order PDF" arrow>
              <IconButton onClick={() => handleDownload?.()} size="small">
                <DownloadIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {chassisData ? (
            <ChassisOrderFormPdf ref={componentRef} chassisData={chassisData} />
          ) : (
            <Typography>Loading preview...</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <CustomButton onClick={() => setOpenPreview(false)}>
            Close
          </CustomButton>
        </DialogActions>
      </Dialog>
    </>
  );
}


// comment 