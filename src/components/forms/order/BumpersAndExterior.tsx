import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Button, TextField, Grid, Typography, Box } from "@mui/material";
import { useFormik } from "formik";
import CustomButton from "@/components/ui/CustomButton";

const BumpersAndExterior = forwardRef(({ handleNext, initialData }: any, ref) => {
  const formikRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    getValues: () => {
      const values = formikRef.current?.values;
      // Convert string values back to appropriate types for database
      return {
        bumper_bars: {
          type: values.bumpBars,
          arms: parseInt(values.bumperBarArms) || 1
        },
        drop_legs: values.dropLegs === 'YES',
        mud_flaps: values.mudFlaps === 'YES',
        jerry_can_holders: {
          quantity: values.jerryCanHolder === 'YES' ? 1 : 0
        },
        electric_jockey_wheel: {
          type: values.jockeyWheel,
          size: '8"'
        },
        mesh: values.mesh === 'YES',
        aircon_frame: values.airconFrame === 'YES',
        comments: values.comments,
        special_bumper_bars: values.specialBumperBars
      };
    },
  }));

  const [selectedTabs, setSelectedTabs] = useState<Record<string, number | null>>({});

  const sections = [
    { name: "Drop Legs", options: ["YES", "NO"], field: "dropLegs" },
    { name: "Mud Flaps", options: ["YES", "NO"], field: "mudFlaps" },
    {
      name: "Jerry Can Holder",
      options: ["YES", "NO"],
      field: "jerryCanHolder",
    },
    {
      name: 'Jockey Wheel 8"',
      options: ["SIDE WINDER", "STANDARD"],
      field: "jockeyWheel",
    },
    { name: "Mesh", options: ["YES", "NO"], field: "mesh" },
    { name: "Aircon Frame", options: ["YES", "NO"], field: "airconFrame" },
  ];

  const bumpBarsOptions = ["STD", "90 Degree", "Specials", "Flat"];
  const bumperBarArmsOptions = ["1", "2", "3", "4"];

  // Initialize selectedTabs based on initialData
  useEffect(() => {
    if (initialData) {
      const newSelectedTabs: Record<string, number | null> = {};
      
      // Initialize bumpBars
      if (initialData.bumper_bars?.type) {
        const bumpBarsIndex = bumpBarsOptions.findIndex(
          opt => opt.toLowerCase() === initialData.bumper_bars.type.toLowerCase()
        );
        if (bumpBarsIndex !== -1) {
          newSelectedTabs.bumpBars = bumpBarsIndex;
        }
      }

      // Initialize bumperBarArms
      if (initialData.bumper_bars?.arms) {
        const armsIndex = bumperBarArmsOptions.findIndex(
          opt => opt === initialData.bumper_bars.arms.toString()
        );
        if (armsIndex !== -1) {
          newSelectedTabs.bumperBarArms = armsIndex;
        }
      }

      // Initialize other sections
      sections.forEach(section => {
        let value;
        
        switch(section.field) {
          case 'dropLegs':
            value = initialData.drop_legs ? 'YES' : 'NO';
            break;
          case 'mudFlaps':
            value = initialData.mud_flaps ? 'YES' : 'NO';
            break;
          case 'jerryCanHolder':
            value = initialData.jerry_can_holders?.quantity > 0 ? 'YES' : 'NO';
            break;
          case 'jockeyWheel':
            value = initialData.electric_jockey_wheel?.type || '';
            break;
          case 'mesh':
            value = initialData.mesh ? 'YES' : 'NO';
            break;
          case 'airconFrame':
            value = initialData.aircon_frame ? 'YES' : 'NO';
            break;
        }

        if (value) {
          const optionIndex = section.options.findIndex(
            opt => opt.toLowerCase() === value.toLowerCase()
          );
          if (optionIndex !== -1) {
            newSelectedTabs[section.field] = optionIndex;
          }
        }
      });

      setSelectedTabs(newSelectedTabs);
    }
  }, [initialData]);

  const formik = useFormik({
    initialValues: {
      bumpBars: initialData?.bumper_bars?.type || "",
      bumperBarArms: initialData?.bumper_bars?.arms?.toString() || "1",
      dropLegs: initialData?.drop_legs ? 'YES' : 'NO',
      mudFlaps: initialData?.mud_flaps ? 'YES' : 'NO',
      jerryCanHolder: initialData?.jerry_can_holders?.quantity > 0 ? 'YES' : 'NO',
      jockeyWheel: initialData?.electric_jockey_wheel?.type || "",
      mesh: initialData?.mesh ? 'YES' : 'NO',
      airconFrame: initialData?.aircon_frame ? 'YES' : 'NO',
      comments: initialData?.comments || "",
      specialBumperBars: initialData?.special_bumper_bars || "",
    },
    onSubmit: () => {
      handleNext();
    },
  });

  const handleTabClick = (field: string, index: number, label: string) => {
    setSelectedTabs(prev => ({
      ...prev,
      [field]: index
    }));
    formik.setFieldValue(field, label);
  };

  // Assign formik instance to ref
  useEffect(() => {
    formikRef.current = formik;
  }, [formik]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        {/* First Section: Bump Bars */}
        <Grid size={12}>
          <Typography variant="body1" color="#000" sx={{ mb: 1 }}>
            Bump Bars
          </Typography>

          <Grid display="flex" gap={2}>
            {bumpBarsOptions.map((label, index) => (
              <Button
                key={index}
                variant="contained"
                sx={{
                  backgroundColor:
                    selectedTabs["bumpBars"] === index ? "#cc2e2b" : "#f3f3f3",
                  color: selectedTabs["bumpBars"] === index ? "white" : "#000",
                }}
                onClick={() => handleTabClick("bumpBars", index, label)}
              >
                {label}
              </Button>
            ))}
          </Grid>
        </Grid>

        {/* Show Special Bumper Bars TextField Only When "Specials" is Selected */}
        {formik.values.bumpBars === "Specials" && (
          <Grid size={6}>
            <TextField
              fullWidth
              label="Special Bumper Bars"
              variant="outlined"
              size="small"
              name="specialBumperBars"
              value={formik.values.specialBumperBars}
              onChange={formik.handleChange}
            />
          </Grid>
        )}

        {/* Second Section: Bumper Bars Arms No. */}
        <Grid size={12} mt={2}>
          <Typography variant="body1" color="#000" sx={{ mb: 1 }}>
            Bumper Bars Arms No.
          </Typography>

          <Grid display="flex" gap={2}>
            {bumperBarArmsOptions.map((label, index) => (
              <Button
                key={index}
                variant="contained"
                sx={{
                  backgroundColor:
                    selectedTabs["bumperBarArms"] === index
                      ? "#cc2e2b"
                      : "#f3f3f3",
                  color:
                    selectedTabs["bumperBarArms"] === index ? "white" : "#000",
                }}
                onClick={() => handleTabClick("bumperBarArms", index, label)}
              >
                {label}
              </Button>
            ))}
          </Grid>
        </Grid>

        {/* Third Section: Drop Legs & Mud Flaps */}
        {sections.slice(0, 2).map((section, idx) => (
          <Grid key={idx} size={6}>
            <Typography variant="body1" color="#000" mb={1}>
              {section.name}
            </Typography>
            <Grid display="flex" gap={2}>
              {section.options.map((label, optionIndex) => (
                <Button
                  key={optionIndex}
                  variant="contained"
                  sx={{
                    backgroundColor:
                      selectedTabs[section.field] === optionIndex
                        ? "#cc2e2b"
                        : "#f3f3f3",
                    color:
                      selectedTabs[section.field] === optionIndex
                        ? "white"
                        : "#000",
                  }}
                  onClick={() =>
                    handleTabClick(section.field, optionIndex, label)
                  }
                >
                  {label}
                </Button>
              ))}
            </Grid>
          </Grid>
        ))}

        {/* Fourth Section: Jerry Can Holder & Jockey Wheel */}
        {sections.slice(2, 4).map((section, idx) => (
          <Grid key={idx} size={6}>
            <Typography variant="body1" color="#000" mb={1}>
              {section.name}
            </Typography>
            <Grid display="flex" gap={2}>
              {section.options.map((label, optionIndex) => (
                <Button
                  key={optionIndex}
                  variant="contained"
                  sx={{
                    backgroundColor:
                      selectedTabs[section.field] === optionIndex
                        ? "#cc2e2b"
                        : "#f3f3f3",
                    color:
                      selectedTabs[section.field] === optionIndex
                        ? "white"
                        : "#000",
                  }}
                  onClick={() =>
                    handleTabClick(section.field, optionIndex, label)
                  }
                >
                  {label}
                </Button>
              ))}
            </Grid>
          </Grid>
        ))}

        {/* Fifth Section: Mesh & Aircon Frame */}
        {sections.slice(4, 6).map((section, idx) => (
          <Grid key={idx} size={6}>
            <Typography variant="body1" color="#000" mb={1}>
              {section.name}
            </Typography>
            <Grid display="flex" gap={2}>
              {section.options.map((label, optionIndex) => (
                <Button
                  key={optionIndex}
                  variant="contained"
                  sx={{
                    backgroundColor:
                      selectedTabs[section.field] === optionIndex
                        ? "#cc2e2b"
                        : "#f3f3f3",
                    color:
                      selectedTabs[section.field] === optionIndex
                        ? "white"
                        : "#000",
                  }}
                  onClick={() =>
                    handleTabClick(section.field, optionIndex, label)
                  }
                >
                  {label}
                </Button>
              ))}
            </Grid>
          </Grid>
        ))}

        {/* Sixth Section: Comments */}
        <Grid size={12} mt={3}>
          <Typography variant="h5" color="#000" sx={{ mb: 1 }}>
            Comments
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Comments"
            variant="outlined"
            {...formik.getFieldProps("comments")}
          />
        </Grid>
      </Grid>
      <Box
        sx={{
          position: "absolute",
          right: 20,
          pt: 4,
        }}
      >
        <CustomButton type="submit">Next</CustomButton>
      </Box>
    </form>
  );
});

export default BumpersAndExterior;
