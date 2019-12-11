import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import { Form, Field } from 'react-final-form';
import { TextField, Select, Input } from 'final-form-material-ui';
import { Paper, Grid, Button, CssBaseline, MenuItem } from '@material-ui/core';
import StepContent from '@material-ui/core/StepContent';
import StepLabel from '@material-ui/core/StepLabel';
import Step from '@material-ui/core/Step';
import Stepper from '@material-ui/core/Stepper';
import Typography from '@material-ui/core/Typography';
import InputMask from 'react-input-mask';


const onSubmit = async values => {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};
const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  }
  if (!values.lastName) {
    errors.lastName = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  }
  return errors;
};
function getSteps() {
  return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}

function GetStepContent(step) {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [education, setEducation] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleChangeName = input => e => {
    setFirstname({ [input]: e.target.value})
  };  
  const handleChangeLastname = input => e => {
    setLastname({ [input]: e.target.value})
  };  
  const handleChangeEducation = input => e => {
    setEducation({ [input]: e.target.value})
  };  
  const handleChangePhone = input => e => {
    setPhone({ [input]: e.target.value})
  };  
  const handleChangeEmail = input => e => {
    setEmail({ [input]: e.target.value})
  };  
  
  const {firstName} = firstname
  const {lastName} = lastname
  const {Education} = education
  const {Phone} = phone
  const {Email} = email
  const values = {firstName, lastName, Education, Phone, Email}

 
  switch (step) {
    case 0:
      return (<Form
        onSubmit={onSubmit}
        initialValues=''
        validate={validate}
        render={({ handleSubmit}) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper style={{ padding: 16 }}>
            
              <Grid container alignItems="flex-start" spacing={2}>
                
              <Grid item xs={6}>
           
                  <Field
                  fullWidth
                  required
                  name="firstName"
                  component={Input}
                  type="text"
                  label="First Name"
                  onChange={handleChangeName('firstName')}
                  defaultValue={values.firstName}
                  />
                
                </Grid>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    required
                    name="lastName"
                    component={Input}
                    type="input"
                    label="Last Name"
                    onChange={handleChangeLastname('lastName')}
                    defaultValue={values.lastName}
                  />   
                
                </Grid>

                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="education"
                    component={Select}
                    label="Select education"
                    formControlProps={{ fullWidth: true }}
                    onChange={handleChangeEducation('Education')}
                    defaultValue={values.Education}
                    >
                    <MenuItem value="Podstawowe">Podstawowe</MenuItem>
                    <MenuItem value="Średnie">Średnie</MenuItem>
                    <MenuItem value="Wyższe">
                      Wyższe
                    </MenuItem>
                  </Field>
                </Grid>

     
                <Grid item style={{ marginTop: 16 }}>
                
               
                </Grid>
              </Grid>
            </Paper>
          </form>
        )}
      />);
    case 1:
        return (<Form
          onSubmit={onSubmit}
          initialValues=''
          validate={validate}
          render={({ handleSubmit}) => (
            <form onSubmit={handleSubmit} noValidate>
              <Paper style={{ padding: 16 }}>
                <Grid container alignItems="flex-start" spacing={2}>
                
                  <Grid item xs={12}>
                    <Field
                      name="email"
                      validators={['required', 'isEmail']}
                      fullWidth
                      required
                      component={TextField}
                      type="email"
                      label="Email"
                      onChange={handleChangeEmail('Email')}
                      defaultValue={values.Email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                    name="phone"
                    fullWidth
                    required
                    component={TextField}
                    label="Phone"
                    onChange={handleChangePhone('Phone')}   

                    >
                    <InputMask  defaultValue={values.Phone}   mask="999 999 999" maskChar=" " />
                    </Field>
                  
                  </Grid>
 
                  <Grid item style={{ marginTop: 16 }}>                  
                 
                  </Grid>
                </Grid>
              </Paper>
            </form>
          )}
        />);
    case 2:
        return (<Form
          onSubmit={onSubmit}
          initialValues=''
          validate={validate}
          render={({ handleSubmit}) => (
            <form onSubmit={handleSubmit} noValidate>
              <Paper style={{ padding: 16 }}>
                <Grid container alignItems="flex-start" spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      name="notes"
                      component={TextField}
                      multiline
                      label="Notes"
                    />
                  </Grid>
                  <Grid item style={{ marginTop: 16 }}>
                  
                 
                  </Grid>
                </Grid>
              </Paper>
            </form>
          )}
        />);
    default:
      return 'Unknown step';
  }
}

function App() {

  const handleNext = () => {
   
      setActiveStep(prevActiveStep => prevActiveStep+1);
    
    };
  
  const handleBack = () => {
  
      setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      <CssBaseline />
      <Stepper activeStep={activeStep} orientation="vertical">
      {steps.map((label, index) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
          <StepContent>
          <Typography component={'span'}>{GetStepContent(index)}</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick = {handleBack}               
              >
                Back
              </Button>
              <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    // disabled={submitting}                   
                    onClick = {handleNext}               
              >
                    Next
              </Button>
   
              
      </StepContent>
      </Step>
      )
      
      )}
      </Stepper>
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector('#root'))


export default App
