import React from 'react';
import { Segment, Select, Checkbox, Form, Grid, Header, Popup, Icon, Button } from 'semantic-ui-react';

export default class App extends React.Component {
  constructor(props){
    super(props);

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    this.months = [];
    this.days = [];
    this.years = [];
    for(let i=1; i<= 31; i++) {
      this.days.push({ key: i, text: i, value: i});
      if(i <= 12) {
        this.months.push({ key: i, text: months[i-1], value: i});
      }
    }
    for(let i=1900; i<= 2018; i++) {
      this.years.push({ key: i, text: i, value: i});
    }

    this.state = {
      firstName: {
        validation: "textValidation",
        error: false,
        value: ""
      },
      lastName: {
        validation: "textValidation",
        error: false,
        value: ""
      },
      email: {
        validation: "textValidation",
        error: false,
        value: ""
      },
      password: {
        validation: "textValidation",
        error: false,
        value: ""
      },
      confirmPassword: {
        validation: "confirmPasswordValidation",
        error: false,
        value: ""
      },
      birthDay: {
        validation: "notEmptyValidation",
        error: false,
        value: ""
      },
      birthMonth: {
        validation: "notEmptyValidation",
        error: false,
        value: ""
      },
      birthYear: {
        validation: "notEmptyValidation",
        error: false,
        value: ""
      },
      phone: {
        value: ""
      },
      country: {
        validation: "notEmptyValidation",
        error: false,
        value: ""
      },
      postalCode: {
        validation: "postalCodeValidation",
        error: false,
        value: ""
      },
      terms: {
        value: false,
        error: false
      },
      showErrors: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleChange(e, { name, value }) {
    let field = this.state[name];
    field.value = value;
    field.error = this[field.validation] ? this[field.validation](value) : false;
    this.setState({ [name]: field});
  }

  handleCheckboxChange(e, { name, checked }) {
    let field = {
      value: checked,
      error: !checked
    }
    this.setState({ [name]: field});
  }

  handleSubmit(e) {
    let fieldKeys = Object.keys(this.state); //Typically this will be an inner field like this.state.fields and the all input fields
    let isValid = true;
    fieldKeys.map((key) => {
      let field = this.state[key];
      if(field.validation) {
          let error = this[field.validation] ? this[field.validation](field.value) : false;
          if(error) {
            isValid = false;
            let updatedfield = Object.assign({}, field, {error});
            this.setState({ [key]: updatedfield });
            return updatedfield;
          }
      }
      return field;
    });

    const { terms } = this.state;
    let updatedTerms = {
      value: terms.value,
      error: !terms.value
    };
    this.setState({ terms: updatedTerms });

    if(isValid && terms.value) {
      this.setState({showErrors: false});
      alert("Success! Form submitted");
    } else {
      this.setState({showErrors: true});
      return false;
    }
  }

  textValidation(text) {
    return (text && text.length > 3) ? false : true;
  }

  confirmPasswordValidation(text) {
    return (text &&  text.length > 3 && text === this.state.password.value) ? false : true;
  }

  postalCodeValidation(postalCode) {
    return (postalCode && postalCode.length === 5) ? false : true;
  }

  notEmptyValidation(value) {
    const val = ""+value;
    return (val && val.length > 0) ? false : true;
  }

  render() {
    const { firstName, lastName, email, password,
            confirmPassword, birthDay, birthMonth,
            birthYear, phone, country, postalCode,
            errors, terms, showErrors } = this.state;
    return (
      <div>
        <header>
          <div className="logo"></div>
          <h1 className="header"><span className="header-text">Register</span></h1>
        </header>
        <div className="registration-form">
          <p className="registration-form__details">Enter your information below for exclusive offers, promotions and savings.</p>
          <Form onSubmit={(e, data) => this.handleSubmit(e, data)} noValidate>
            <Segment secondary>
              <label className="custom-reqired">Fields Required</label>
                <Form.Input label="First Name" error={firstName.error} required placeholder='First Name' name='firstName' value={firstName.value} onChange={this.handleChange} />
                <Form.Input label="Last Name" error={lastName.error} required placeholder='Last Name' name='lastName' value={lastName.value} onChange={this.handleChange} />
                <Form.Input label="Email Address" error={email.error} required placeholder='Email Address' name='email' value={email.value} onChange={this.handleChange} />
                <Form.Input label="Choose Password" error={password.error} type="password" required placeholder='Choose Password' name='password' value={password.value} onChange={this.handleChange} />
                <Form.Input label="Confirm Password" error={confirmPassword.error} type="password" required placeholder='Confirm Password' name='confirmPassword' value={confirmPassword.value} onChange={this.handleChange} />
                <Form.Field required error={birthDay.error || birthMonth.error || birthYear.error}>
                  <label>
                    <span>Birthday</span>
                    <span className="info-icon">
                      <Popup
                          trigger={<Icon color="blue" name="info circle"/>}
                          content={"We'll use this to send you birthday bonus points."}
                          on="click"
                          position="top center"
                        />
                    </span>
                  </label>
                  <Grid className="birthday-fields">
                    <Grid.Row columns={3}>
                      <Grid.Column>
                        <Select className="custom-select" error={birthMonth.error} placeholder="Month" name="birthMonth" value={birthMonth.value} options={this.months} onChange={this.handleChange}/>
                      </Grid.Column>
                      <Grid.Column>
                        <Select className="custom-select" error={birthDay.error} placeholder="Day" name="birthDay" value={birthDay.value} options={this.days} onChange={this.handleChange}/>
                      </Grid.Column>
                      <Grid.Column>
                        <Select className="custom-select" error={birthYear.error} placeholder="Year" name="birthYear" value={birthYear.value} options={this.years} onChange={this.handleChange}/>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Form.Field>
                <Form.Input label="Phone Number" placeholder="(XXX) XXX-XXX" name="phone" value={phone.value} onChange={this.handleChange}/>
                <Form.Field required error={country.error}>
                  <label>Country</label>
                  <Form.Group className="radio-options">
                    <Form.Field className="flex align-center">
                      <Form.Input type="radio" id="us" name="country" value="us" checked={country.value === "us"} onChange={this.handleChange}/>
                      <label className="country-us" htmlFor="us"></label>
                    </Form.Field>
                    <Form.Field className="flex align-center">
                      <Form.Input type="radio" id="canada" name="country" value="canada" checked={country.value === "canada"} onChange={this.handleChange}/>
                      <label className="country-canada" htmlFor="canada"></label>
                    </Form.Field>
                  </Form.Group>
                </Form.Field>
                <Form.Input label="Zip/Postal Code" error={postalCode.error} type="number" required placeholder="Postal Code" name='postalCode' value={postalCode.value} onChange={this.handleChange} />
              </Segment>
              <div className="terms-conditions">
                <Form.Field error={terms.error}>
                  <Checkbox label="Yes, I aceept the Terms & Conditions and Privacy Policy" name="terms" checked={terms.value} onChange={this.handleCheckboxChange}/>
                </Form.Field>
                <Form.Field>
                  <Checkbox label="Yes, I'd like to receive news and special offers"/>
                </Form.Field>
              </div>
              <div className="register-btn"><Form.Button className="flex" content="Register" primary/></div>
          </Form>
        </div>
        { showErrors && (
          <div className="errors-container">
            <div className="errors-content">
              <p>The following errors have occured</p>
              <ul>
              {firstName.error && (<li>Invalid first name</li>)}
              {lastName.error && (<li>Invalid last name</li>)}
              {password.error && (<li>Invalid password</li>)}
              {confirmPassword.error && (<li>Passwords don't match</li>)}
              {email.error && (<li>Invalid email address</li>)}
              {country.error && (<li>Please choose a country</li>)}
              {(birthDay.error || birthMonth.error || birthMonth.error) && (<li>Invalid birthdate</li>)}
              {postalCode.error && (<li>Invalid zip code</li>)}
              {terms.error && (<li>You must accept the terms and conditions and privacy policy</li>)}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  }
}
