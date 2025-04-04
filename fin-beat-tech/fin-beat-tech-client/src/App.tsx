import { Accordion, AccordionDetails, AccordionSummary, Container, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DataForm from "./components/Forms/PostDataForm"
import DataList from "./components/Forms/GetDataForm"

const App = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom mt={3}><b>FinBeat Tech ClientApp</b></Typography>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Отправка данных (POST)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DataForm />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Получение данных (GET)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DataList />
        </AccordionDetails>
      </Accordion>

    </Container>
  )
}

export default App