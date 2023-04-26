import React, { useState, useEffect } from 'react';
import "./Form.css";
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import TextField from '@mui/material/TextField';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
import { FormHelperText, Grid, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
// import FormHelperText from '@mui/material/FormHelperText';
// import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material';
import Poster from "../assets/images/latestposter.jpeg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import csilogo from "../assets/images/csi-logo.png";
import ClockLoader from "react-spinners/ClockLoader";
import { useRef } from 'react';
// import { useNavigate } from 'react-router-dom';

const Form = () => {

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 1026,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  })

  let errors = {}

  // let code = [10, 153, 154, 12, 164, 13, 11, 169, 21, 31, 00, 40];
  // let branch_code = [CSE, CSE(AI & ML), CSE(DS), CS, AI & ML, IT, CS, CSIT, IT, ECE, EN, CSE(HINDI), ME, CE]
  const branch_code = [{
    branch: "CSE",

    code: "10"
  }, {
    branch:
      "CSE(AI&ML)",

    code: "153"
  }, {
    branch:
      "CSE(DS)",

    code: "154"
  }, {
    branch:
      "CS",

    code: "12"
  }, {
    branch:
      "AI&ML",

    code: "164"
  }, {
    branch:
      "IT",

    code: "13"
  }, {
    branch:

      "CSIT",

    code: "11"
  }, {
    branch:
      "CSE(HINDI)",
    code: "169"
  }, {
    branch:
      "EN",
    code: "21"
  }, {
    branch: "ECE",
    code: "31"
  }, {
    branch:
      "CE",
    code: "00"
  }, {
    branch:
      "ME",
    code: "40"
  },]

  const initialvalues = {
    full_name: "",
    roll_no: "",
    student_no: "",
    mobile_number: "",
    email: "",
    branch: "",
    year: "",
    gender: "",
    residence: "",
    contest: "",
    Ideadescription: ""
  }

  // const navigate = useNavigate();
  const [formvalues, setformvalues] = useState(initialvalues);
  const [formerror, setformerror] = useState({});
  const [noerror, setnoerror] = useState(false);
  const [submitcall, setSubmitcall] = useState(false);
  const [captcha_value, setcaptcha_value] = useState("");
  const [wordcount, setWordcount] = useState(0);
  const [popup, setpopup] = useState(false);
  let [loading, setLoading] = useState(false);
  const captcharef=useRef();
  // const [word, setWord] = useState("")



  const inputHandler = (e) => {
    if (e.target.name === "Ideadescription") {
      const { name, value } = e.target;
      setformvalues({ ...formvalues, [name]: value.slice(0, 300) });
      
    }
    else {
      const { name, value } = e.target;
      setformvalues({ ...formvalues, [name]: value });
      
    }

  }
  const error = () => {
    errors = {}
    setnoerror(true);

    //REGEX CONDITIONS

    const regex_name = /^[a-zA-Z]{2,15}(\s[a-zA-Z.]{1,10})?(\s[a-zA-Z]{2,10})?(\s[a-zA-Z]{2,10})?$/;
    const regex_contact = /^[6-9]([0-9]){9}$/;
    const regex_roll = /^[2][12][0][0][2][7][01]([0-9]){6}$/;
    const regex_student = /^[2][12](([x]{3})|[0-9]{2,3})([0-9]){3}(-d)?$/;
    const regex_email = /^([a-zA-Z]){2,15}[2][12](([x]{3})|[0-9]{2,3})([0-9]){3}(-d)?@akgec.ac.in$/;

    //VALIDATING NAME

    if (regex_name.test(formvalues.full_name.trim())) {
      formvalues.full_name = formvalues.full_name.trim();
      errors.full_name = "";
    }
    else {
      setnoerror(false);
      errors.full_name = "Please Enter Full Name";
      captcharef.current?.reset();
      return errors;
    }
    //VALIDATING STUDENTNO

    if (regex_student.test(formvalues.student_no.trim())) {
      errors.student_no = "";
      formvalues.student_no = formvalues.student_no.trim();
      // for(let i=0;i<code.length;i++)
      // {
      //   if(formvalues.student_no.substring[2,formvalues.student_no.length-3]===code[i].code)
      //   formvalues.branch=branch_code[i];
      // }\



    }
    else {
      setnoerror(false);
      errors.student_no = "Invalid Student No";
      captcharef.current?.reset();
      return errors;
    }

    //VALIDATING ROLLNO

    if (regex_roll.test(formvalues.roll_no.trim())) {
      errors.roll_no = "";
      formvalues.roll_no = formvalues.roll_no.trim();
    }
    else {
      setnoerror(false);
      errors.roll_no = "Invalid Roll no";
      captcharef.current?.reset();
      return errors;
    }

    //VALIDATING CONTACT

    if (regex_contact.test(formvalues.mobile_number.trim())) {
      errors.mobile_number = "";
      formvalues.mobile_number = formvalues.mobile_number.trim();
    }
    else {
      setnoerror(false)
      errors.mobile_number = "Invalid Mobile Number";
      captcharef.current?.reset();
      return errors;
    }

    //VALIDATING EMAIL

    if (
      regex_email.test(formvalues.email.trim()) &&
      formvalues.email.includes(formvalues.student_no)
    ) {
      errors.email = "";
      formvalues.email = formvalues.email.trim();
    }
    else {
      setnoerror(false);
      errors.email = "Enter Correct College Email Id";
      captcharef.current?.reset();
      return errors;
    }

    //VALIDATING BRANCH

    if (formvalues.branch === "") {
      setnoerror(false);
      errors.branch = "Please Select Branch";
      captcharef.current?.reset();
      return errors;
    }
    else {
      errors.branch = "";
    }

    //VALIDATING YEAR

    if (formvalues.year === "") {
      setnoerror(false);
      errors.year = "Please Select Year";
      captcharef.current?.reset();
      return errors;
    }
    else {
      errors.year = "";
    }

    //VALIDATING GENDER

    if (formvalues.gender === "") {
      setnoerror(false);
      errors.gender = "Please Select Gender";
      captcharef.current?.reset();
      return errors;
    }
    else {
      errors.gender = "";
    }

    //VALIDATING CONTEST

    if (formvalues.contest === "") {
      setnoerror(false);
      errors.contest = "Please Select Contest";
      captcharef.current?.reset();
      return errors;
    }
    else {
      errors.contest = "";
    }

    //VALIDATING RESIDENCE

    if (formvalues.residence === "") {
      setnoerror(false);
      errors.residence = "This field can't be empty";
      captcharef.current?.reset();
      return errors;
    }
    else {
      errors.residence = "";
    }

    if (formvalues.contest === "Ideathon" && formvalues.Ideadescription === "") {
      errors.Ideadescription = "This field can't be empty";
      setnoerror(false);
      captcharef.current?.reset();
      return errors;
    }
    else
      errors.Ideadescription = "";

    return errors;
  }

  const validateform = (e) => {
    e.preventDefault();
    setformerror(error());
    if (submitcall === false) {
      setSubmitcall(true);
    }
    else {
      setSubmitcall(false);
    }
  }

  const validateInput = (e, regex, err) => {
    if (e.target.name === "student_no") {

      branch_code.map((item) => {
        // console.log(item);
        if (item.code === formvalues.student_no.substring(2, formvalues.student_no.length - 3)) 
        setformvalues({ ...formvalues, branch: item.branch })
        
        return 0;
      });
     
    }
    if (e.target.name === "roll_no") {
        if(formvalues.roll_no.substring(1,2)==="1")
        setformvalues({ ...formvalues, year: "II" })
        else if(formvalues.roll_no.substring(1,2)==="2")
        setformvalues({ ...formvalues, year: "I" })
    }
  
    if (regex.test(e.target.value.trim())) {
      e.target.value = e.target.value.trim();
      errors[e.target.name] = "";
      // console.log("yy")
    }
    else {
      // console.log("nn");
      errors[e.target.name] = err;
    }
    setformerror(errors)
    // console.log(e.target.value)
    // console.log(regex)
  }

  const valdiatecheckbox = (e, err) => {
    if (e.target.value === "")
      errors[e.target.name] = err;
    else
      errors[e.target.name] = "";
    setformerror(errors)
  }

  useEffect(() => {
    // console.log(noerror);
    if (noerror === true) {
      if (captcha_value === "" || captcha_value === null) {
        // alert("Captcha not validated!")
        toast.error("Captcha not valiadted!")
      }
      else {
        setLoading(true);
        axios.post(`${process.env.REACT_APP_URL}/auth/register`, {
          name: formvalues.full_name,
          studentNo: formvalues.student_no,
          rollNo: formvalues.roll_no,
          mobileNo: formvalues.mobile_number,
          email: formvalues.email,
          branch: formvalues.branch,
          year: formvalues.year,
          gender: formvalues.gender,
          contest: formvalues.contest,
          humanKey: captcha_value,
          isHosteler: formvalues.residence,
          desc: formvalues.Ideadescription,
        }).then((resp) => {
          // console.log(resp)
          setLoading(false)
          setpopup(true)
          setcaptcha_value(null);
        }).catch((err) => {
          captcharef.current?.reset();
          if (err.response.data === "false")
            toast.error("Captcha not validated!")
          else if (err.response.data === "Not Registered") {
            toast.error("Already registered. Check email for verification!")
          }
          else if (err.response.data === "Too many requests, please try again later.") {
            toast.error("Please try again later!")
          }
          setLoading(false)
          // console.log(err)
        })
      }
    }
    // eslint-disable-next-line
  }, [submitcall])


  function validate_captcha(value) {
    // console.log(value);
    setcaptcha_value(value);
  }

  useEffect(() => {
    setWordcount(formvalues.Ideadescription.trim().length)
  }, [formvalues.Ideadescription])

  const verify = () => {
    setpopup(false);
    setformvalues(initialvalues);
    // setcaptcha_value(null);
    // window.location.reload();
    captcharef.current?.reset();
    // localStorage.setItem("user","pending");
    // console.log("kbfhjklsjcbh ")
  }


  return (
    <>
      <ThemeProvider theme={theme}>
        <div className={loading ? "loading" : "hide"}>
          <ClockLoader
            color={'#4054B2'}
            loading={loading}
            size={50}
          />
        </div>
        <div className={loading ? "hide" : "formCont"}>
          <div className='formdiv'>
            <form className='form' onSubmit={validateform}>
              {/* <h1>BRAINSTORM</h1> */}
              <h2>Hey! Get Yourself Registered</h2>
              <Grid container>
                <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center" }}>
                  <TextField
                    error={Boolean(formerror.full_name)}
                    // required = {true}
                    id="outlined-error-helper-text"
                    label="Full Name"
                    helperText={formerror.full_name}
                    name="full_name"
                    value={formvalues.full_name}
                    onChange={inputHandler}
                    size='small'
                    style={{ width: "90%", margin: "0.5rem" }}
                    onBlur={e => { validateInput(e, /^[a-zA-Z]{2,15}(\s[a-zA-Z.]{1,10})?(\s[a-zA-Z]{2,10})?(\s[a-zA-Z]{2,10})?$/, "Please Enter Full Name") }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center" }}>
                  <TextField
                    error={Boolean(formerror.student_no)}
                    id="outlined-error-helper-text"
                    // required = {true}
                    label="Student No"
                    helperText={formerror.student_no}
                    name="student_no"
                    value={formvalues.student_no}
                    onChange={inputHandler}
                    size='small'
                    style={{ width: "90%", margin: "0.5rem" }}
                    // autoComplete='off'
                    onBlur={e => { validateInput(e, /^[2][12](([x]{3})|[0-9]{2,3})([0-9]){3}(-d)?$/, "Invalid Student No") }}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center" }}>
                  <TextField
                    error={Boolean(formerror.roll_no)}
                    id="outlined-error-helper-text"
                    label="Roll No"
                    // required = {true}
                    helperText={formerror.roll_no}
                    name="roll_no"
                    value={formvalues.roll_no}
                    onChange={inputHandler}
                    size='small'
                    style={{ width: "90%", margin: "0.5rem" }}
                    // autoComplete='off'
                    onBlur={e => { validateInput(e, /^[2][12][0][0][2][7][01]([0-9]){6}$/, "Invalid Roll No") }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center" }}>
                  <TextField
                    error={Boolean(formerror.mobile_number)}
                    id="outlined-error-helper-text"
                    label="Phone Number"
                    // required = {true}
                    helperText={formerror.mobile_number}
                    name="mobile_number"
                    value={formvalues.mobile_number}
                    onChange={inputHandler}
                    size='small'
                    style={{ width: "90%", margin: "0.5rem" }}
                    // autoComplete='off'
                    onBlur={e => { validateInput(e, /^[6-9]([0-9]){9}$/, "Invalid Mobile Number") }}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center" }}>
                  <TextField
                    error={Boolean(formerror.email)}
                    id="outlined-error-helper-text"
                    label="College Email"
                    helperText={formerror.email}
                    name="email"
                    // required = {true}
                    value={formvalues.email}
                    onChange={inputHandler}
                    size='small'
                    style={{ width: "90%", margin: "0.5rem" }}
                    // autoComplete='off'
                    onBlur={e => { validateInput(e, /^([a-zA-Z]){2,15}[2][12](([x]{3})|[0-9]{2,3})([0-9]){3}(-d)?@akgec.ac.in$/, "Enter Correct College Email Id") }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center" }}>
                  <FormControl sx={{ width: "90%", m: "0.5rem" }} error={Boolean(formerror.branch)} size='small'>
                    <InputLabel id="demo-simple-select-error-label">Branch</InputLabel>
                    <Select
                      labelId="demo-simple-select-error-label"
                      id="demo-simple-select-error"
                      value={formvalues.branch}
                      label="Branch"
                      name="branch"
                      onChange={inputHandler}
                      onBlur={e => { valdiatecheckbox(e, "Please Select Branch") }}
                    >
                      <MenuItem value="CSE">CSE</MenuItem>
                      <MenuItem value="CSE(AI&ML)">CSE(AI&ML)</MenuItem>
                      <MenuItem value="CSE(DS)">CSE(DS)</MenuItem>
                      <MenuItem value="CS">CS</MenuItem>
                      <MenuItem value="AI&ML">AI&ML</MenuItem>
                      <MenuItem value="CSIT">CSIT</MenuItem>
                      <MenuItem value="IT">IT</MenuItem>
                      <MenuItem value="ECE">ECE</MenuItem>
                      <MenuItem value="EN">EN</MenuItem>
                      <MenuItem value="CSE(HINDI)">CSE(HINDI)</MenuItem>
                      <MenuItem value="ME">ME</MenuItem>
                      <MenuItem value="CE">CE</MenuItem>
                    </Select>
                    <FormHelperText>{formerror.branch}</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center" }}>
                  <FormControl sx={{ width: "90%", margin: "0.5rem", }} error={Boolean(formerror.year)} size='small'>
                    <InputLabel id="demo-simple-select-error-label">Year</InputLabel>
                    <Select
                      labelId="demo-simple-select-error-label"
                      id="demo-simple-select-error"
                      value={formvalues.year}
                      label="Year"
                      name="year"
                      onChange={inputHandler}
                      onBlur={e => { valdiatecheckbox(e, "Please Select Year") }}
                    >
                      <MenuItem value="I">I</MenuItem>
                      <MenuItem value="II">II</MenuItem>
                    </Select>
                    <FormHelperText>{formerror.year}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center" }}>
                  <FormControl sx={{ width: "90%", margin: "0.5rem", }} error={Boolean(formerror.gender)} size='small'>
                    <InputLabel id="demo-simple-select-error-label">Gender</InputLabel>
                    <Select
                      labelId="demo-simple-select-error-label"
                      id="demo-simple-select-error"
                      value={formvalues.gender}
                      label="Gender"
                      name="gender"
                      onChange={inputHandler}
                      onBlur={e => { valdiatecheckbox(e, "Please Select Gender") }}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Others">Others</MenuItem>
                      {/* <MenuItem value="Rather Not To Say">Rather Not To Say</MenuItem> */}
                    </Select>
                    <FormHelperText>{formerror.gender}</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center" }}>
                  <FormControl sx={{ width: "90%", margin: "0.5rem", }} error={Boolean(formerror.contest)} size='small'>
                    <InputLabel id="demo-simple-select-error-label">Contest</InputLabel>
                    <Select
                      labelId="demo-simple-select-error-label"
                      id="demo-simple-select-error"
                      value={formvalues.contest}
                      label="Contest"
                      name="contest"
                      onChange={inputHandler}
                      onBlur={e => { valdiatecheckbox(e, "Select your Contest") }}
                    >
                      <MenuItem value="Ideathon">Ideathon</MenuItem>
                      <MenuItem value="Blind Coding">Blind Coding</MenuItem>
                    </Select>
                    <FormHelperText>{formerror.contest}</FormHelperText>
                  </FormControl>
                </Grid>
                {/* <Grid item xs={12} sm={6} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <FormControl sx={{ width: "90%", margin: "0.5rem 0" }} error={Boolean(formerror.residence)}>
                  <label>Is Hosteler?</label>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name='residence'
                    value={formvalues.residence}
                    onChange={inputHandler}
                    style={{ display: "flex" }}
                    className='label'
                  >
                    <FormControlLabel value="true" control={<Radio />} label={<Typography className='label'>True</Typography>} />
                    <FormControlLabel value="false" control={<Radio />} label={<Typography className='label'>False</Typography>} />
                  </RadioGroup>
                  <FormHelperText>{formerror.residence}</FormHelperText>
                </FormControl>
              </Grid> */}
                <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center" }}>
                  <FormControl sx={{ width: "90%", margin: "0.5rem", }} error={Boolean(formerror.residence)} size='small'>
                    <InputLabel id="demo-simple-select-error-label">Hosteler</InputLabel>
                    <Select
                      labelId="demo-simple-select-error-label"
                      id="demo-simple-select-error"
                      value={formvalues.residence}
                      label="Hosteler"
                      name="residence"
                      onChange={inputHandler}
                      onBlur={e => { valdiatecheckbox(e, "This field can't be empty") }}
                    >
                      <MenuItem value="true">Yes</MenuItem>
                      <MenuItem value="false">No</MenuItem>
                    </Select>
                    <FormHelperText>{formerror.residence}</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container className={formvalues.contest === "Ideathon" ? "" : "hide"}>
                <Grid item xs={12} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <TextField
                    error={Boolean(formerror.Ideadescription)}
                    id="outlined-textarea"
                    label="Describe Your Idea"
                    placeholder="Present your idea in minimum 300 characters"
                    rows={4}
                    helperText={formerror.Ideadescription}
                    value={formvalues.Ideadescription}
                    multiline
                    sx={{ width: "90%", margin: "0 0.5rem" }}
                    onChange={inputHandler}
                    name='Ideadescription'
                  />
                  <Typography sx={{ width: "90%", display: "flex", alignSelf: "flex-start", margin: "auto", color: "grey" }}>Characters : {wordcount
                  }/300</Typography>
                </Grid>
              </Grid>
              <div className="checkbox">
                <div className='captcha recaptcha'>
                  <ReCAPTCHA
                    ref={captcharef}
                    sitekey={`${process.env.REACT_APP_SITE_KEY}`}
                    onChange={validate_captcha}
                  />
                </div>
              </div>
              <Button style={{ backgroundColor: "#353374", padding: "0.5rem", borderRadius: "20px" }} type='submit' variant="contained">Register</Button>
            </form>
            <div className='posterImg'><img src={Poster} className='poster' alt="poster" /></div>
            {/* <img src={Poster} className='poster2' alt="poster" /> */}
            <img src={csilogo} className='csiLogo' alt="logo" />
          </div>
        </div>
        <div className={popup ? 'pop-up-display' : 'hide'}>
          <div className='pop-up-box'>
            <p>Click on the verification link sent to your registered email.</p>
            <Button variant='contained' sx={{ width: "2rem", marginTop: "1rem" }} onClick={verify}>OK</Button>
          </div>
        </div>
      </ThemeProvider>
      <ToastContainer
      />
    </>

  )
}

export default Form