import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { styled } from '@mui/material/styles';

const FormControlWrapper = styled(FormControl)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  width: '100%',
}));

const FormComponent = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    dateOfBirth: '',
    company: '',
    website: '',
    message: '',
    gender: '',
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [errors, setErrors] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const contact = location.state?.contact;
    if (contact) {
      setFormData({
        firstName: contact.firstName || '',
        lastName: contact.lastName || '',
        email: contact.email || '',
        phoneNumber: contact.phoneNumber || '',
        address: contact.address || '',
        city: contact.city || '',
        state: contact.state || '',
        zipCode: contact.zipCode || '',
        dateOfBirth: contact.dateOfBirth ? new Date(contact.dateOfBirth).toISOString().split('T')[0] : '',
        company: contact.company || '',
        website: contact.website || '',
        message: contact.message || '',
        gender: contact.gender || '',
      });
      setIsEditMode(true);
    }
  }, [location.state?.contact]);

  const updateFormField = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formattedData = {
      ...formData,
      dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString() : '',
    };

    try {
      if (isEditMode) {
        const contactId = location.state?.contact._id;
        await axios.put(`http://localhost:4000/contacts/${contactId}`, formattedData);
      } else {
        await axios.post('http://localhost:4000/contacts', formattedData);
      }
      navigate('/');
    } catch (error) {
      console.error('Error handling contact:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControlWrapper>
              <TextField
                onChange={updateFormField}
                value={formData.firstName}
                fullWidth
                label="First Name"
                name="firstName"
                variant="outlined"
                required
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
            </FormControlWrapper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlWrapper>
              <TextField
                onChange={updateFormField}
                value={formData.lastName}
                fullWidth
                label="Last Name"
                name="lastName"
                variant="outlined"
                required
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </FormControlWrapper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlWrapper>
              <TextField
                onChange={updateFormField}
                value={formData.phoneNumber}
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                variant="outlined"
                required
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
              />
            </FormControlWrapper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlWrapper>
              <TextField
                onChange={updateFormField}
                value={formData.email}
                fullWidth
                label="Email"
                name="email"
                variant="outlined"
              />
            </FormControlWrapper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlWrapper>
              <TextField
                onChange={updateFormField}
                value={formData.address}
                fullWidth
                label="Street Address"
                name="address"
                variant="outlined"
              />
            </FormControlWrapper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlWrapper>
              <TextField
                onChange={updateFormField}
                value={formData.city}
                fullWidth
                label="City/Village"
                name="city"
                variant="outlined"
              />
            </FormControlWrapper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlWrapper>
              <TextField
                onChange={updateFormField}
                value={formData.state}
                fullWidth
                label="State"
                name="state"
                variant="outlined"
              />
            </FormControlWrapper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlWrapper>
              <TextField
                onChange={updateFormField}
                value={formData.zipCode}
                fullWidth
                label="ZIP Code"
                name="zipCode"
                variant="outlined"
              />
            </FormControlWrapper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlWrapper>
              <TextField
                onChange={updateFormField}
                value={formData.dateOfBirth}
                fullWidth
                label="Date of Birth"
                variant="outlined"
                name="dateOfBirth"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                required
                error={!!errors.dateOfBirth}
                helperText={errors.dateOfBirth}
              />
            </FormControlWrapper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlWrapper>
              <InputLabel>Gender</InputLabel>
              <Select
                value={formData.gender}
                onChange={updateFormField}
                              name="gender"
                              label="gender"
                              fullWidth
                variant="outlined"
                required
                              error={!!errors.gender}
                              helperText={errors.gender}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
              {!!errors.gender && <FormHelperText error>{errors.gender}</FormHelperText>}
            </FormControlWrapper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlWrapper>
              <TextField
                onChange={updateFormField}
                value={formData.company}
                fullWidth
                label="Company"
                name="company"
                variant="outlined"
              />
            </FormControlWrapper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlWrapper>
              <TextField
                onChange={updateFormField}
                value={formData.website}
                fullWidth
                label="Website"
                name="website"
                variant="outlined"
              />
            </FormControlWrapper>
          </Grid>
          <Grid item xs={12}>
            <FormControlWrapper>
              <TextField
                onChange={updateFormField}
                value={formData.message}
                fullWidth
                label="Special Note"
                name="message"
                variant="outlined"
                multiline
                rows={4}
              />
            </FormControlWrapper>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              {isEditMode ? 'Update Contact' : 'Create Contact'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default FormComponent;
