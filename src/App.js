import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import { Form, Field } from 'react-final-form';
import TextField from '@material-ui/core/TextField'
import { Paper, Grid, Button, CssBaseline, MenuItem } from '@material-ui/core';
import StepContent from '@material-ui/core/StepContent';
import StepLabel from '@material-ui/core/StepLabel';
import Step from '@material-ui/core/Step';
import Stepper from '@material-ui/core/Stepper';
import Typography from '@material-ui/core/Typography';
import InputMask from 'react-input-mask';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import Popover from '@material-ui/core/Popover';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';


//Styles 

const useStyles = makeStyles(theme => ({
  
  formControl: {
  margin: theme.spacing(1),
  minWidth: 120,
},
selectEmpty: {
  marginTop: theme.spacing(2),
},
}));


const onSubmit = async values => {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  await sleep(300);
};

//Validation 

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

//States and handleChanges

function GetStepContent(step) {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [education, setEducation] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

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
  const handleChangeMessage = input => e => {
    setMessage({ [input]: e.target.value})
  };  

  const classes = useStyles();
  const {firstName} = firstname
  const {lastName} = lastname
  const {Education} = education
  const {Phone} = phone
  const {Email} = email
  const {Message} = message
  const values = {firstName, lastName, Education, Phone, Email, Message}


  //Popover

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  
  //

  
  
  switch (step) {
    case 0:
      return (<Form
        onSubmit={onSubmit}
        initialValues=''
        validate={validate}
        render={({ handleSubmit, submitting}) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper style={{ padding: 16 }}>
            
              <Grid container alignItems="flex-start" spacing={2}>
                
                <Grid item xs={6}>
           
                  <TextField
                  placeholder="Enter Your Name"
                  label="Name"
                  onChange={handleChangeName('firstName')}
                  defaultValue={values.firstName}
                  margin="normal"
                  // fullWidth="true"
                  />
                
                </Grid>
                <Grid item xs={6}>
                  <TextField
                  placeholder="Enter Your Lastname"
                  label="Lastame"
                  onChange={handleChangeLastname('lastName')}
                  defaultValue={values.lastName}
                  margin="normal"
                  // fullWidth="true"
                  required
                  />
                
                </Grid>

                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-controlled-open-select-label">Education</InputLabel>
                      <Select
                      label="Select education"
                        value={Education}
                        onChange={handleChangeEducation('Education')}
                      >
                      <MenuItem value={'B'}>Basic</MenuItem>
                      <MenuItem value={'M'}>Medium</MenuItem>
                      <MenuItem value={'H'}>High</MenuItem>
                    </Select>
                  </FormControl>  
                </Grid>

     
                <Grid item style={{ marginTop: 16 }}>
                
               
                </Grid>
              </Grid>

            </Paper>
          </form>
        )}
      />);
    case 1:
        return (
          <Form
          onSubmit={onSubmit}
          initialValues=''
          validate={validate}
          render={({ handleSubmit}) => (
            <form onSubmit={handleSubmit} noValidate>
              <Paper style={{ padding: 16 }}>
                <Grid container alignItems="flex-start" spacing={2}>
                
                  <Grid item xs={12}>
                    <TextField
                    label="Email"
                    required
                    type="email"
                    validators={['required', 'isEmail']}
                    onChange={handleChangeEmail('Email')}
                    defaultValue={values.Email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                    label="Phone"
                    type="text"
                    onChange={handleChangePhone('Phone')}
                    defaultValue={values.Phone} 
                    >
                    <InputMask  defaultValue={values.Phone}   mask="999 999 999" maskChar=" " />
                    </TextField>
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
                    <TextField
                      multiline
                      label="Notes"
                      type="text"
                      onChange={handleChangeMessage('Message')}
                      defaultValue={values.Message}
                    />
                  </Grid>
                  <Grid item style={{ marginTop: 16 }}>
                  
                 
                  </Grid>
                </Grid>
              </Paper>
              <div>


              <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
                Open Popover
              </Button>
              <MuiThemeProvider>
              <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <Typography className={classes.typography}>
              <List>
              <ListItem 
              defaultValue = {values.firstName}
              primaryText = "First Name"
              secondaryText= {firstName}
              />
              </List>     
              <ListItem 
              defaultValue = {values.lastName}
              primaryText = "Last Name"
              secondaryText={ lastName }
              />
              <ListItem 
              defaultValue = {values.Email}
              primaryText = "Email"
              secondaryText={ email }
              />
              <ListItem 
              defaultValue = {values.Education}
              primaryText = "education"
              secondaryText={ education }
              />
              <ListItem 
              defaultValue = {values.Phone}
              primaryText = "Phone Number"
              secondaryText={ phone }
              />
              <ListItem 
              defaultValue = {values.Message}
              primaryText = "Message"
              secondaryText={ message }
              />       
              </Typography>
            </Popover>
              </MuiThemeProvider>
    
            </div>
            </form>
          )}
        />
        
        );
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
      
      )
    }
      </Stepper>
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector('#root'))


export default App
