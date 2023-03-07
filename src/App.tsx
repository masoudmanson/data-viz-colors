import Heatmap from "./components/Heatmap";
import Colors from "./components/Colors";
import ColorGeneratorForm from "./components/ColorGeneratorForm";
import { Container, Main, Sidebar } from "./style";
import { Grid } from "@mui/material";
import Chart from "./components/Chart";

function App() {
  return (
    <Container>
      <Sidebar>
        <ColorGeneratorForm />
      </Sidebar>
      <Main>
        <Colors />
        <Heatmap />

        <h3>HSL Charts</h3>
        <Grid container spacing={2}>
          <Grid item xs={6} md={4}>
            <Chart title="Lightness" mode={0} />
          </Grid>
          <Grid item xs={6} md={4}>
            <Chart title="Saturation" mode={1} />
          </Grid>
          <Grid item xs={6} md={4}>
            <Chart title="Hue" mode={2} />
          </Grid>
        </Grid>
      </Main>
    </Container>
  );
}

export default App;
