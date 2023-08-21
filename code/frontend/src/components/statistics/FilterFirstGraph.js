import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers";
import Button from "@mui/material/Button";
import { Box, Grid } from "@mui/material";

function FilterFirstGraph({ handleDatePicker, handleOffersGraph }) {
  return (
    <>
      <div style={{ marginLeft: "6.4rem", marginTop: "3.2rem" }}>
        <Grid container spacing={4}>
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["DatePicker", "DatePicker", "DatePicker"]}
              >
                <DatePicker
                  onChange={handleDatePicker}
                  label={"Month & Year"}
                  views={["month", "year"]}
                  sx={{ width: "40vh" }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item>
            <Box sx={{ marginTop: "1.2rem" }}>
              <Button
                size="small"
                onClick={handleOffersGraph}
                variant="contained"
              >
                Show Graph
              </Button>
            </Box>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default FilterFirstGraph;
