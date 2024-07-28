import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate and useLocation
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const FormControl = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(1),
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
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const contact = location.state?.contact; // Retrieve contact from state
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
      });
      setIsEditMode(true); // Set edit mode if contact data is present
    }
  }, [location.state?.contact]);

  const updateFormField = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString() : ''
    };

    try {
      if (isEditMode) {
        // Update existing contact
        const contactId = location.state?.contact._id; // Get the contact ID from state
        await axios.put(`http://localhost:4000/contacts/${contactId}`, formattedData);
      } else {
        // Create new contact
        await axios.post('http://localhost:4000/contacts', formattedData);
      }
      navigate('/'); // Redirect to the home page after successful operation
    } catch (error) {
      console.error('Error handling contact:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl>
              <TextField
                onChange={updateFormField}
                value={formData.firstName}
                fullWidth
                label="First Name"
                name="firstName"
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl>
              <TextField
                onChange={updateFormField}
                value={formData.lastName}
                fullWidth
                label="Last Name"
                name="lastName"
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl>
              <TextField
                onChange={updateFormField}
                value={formData.phoneNumber}
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl>
              <TextField
                onChange={updateFormField}
                value={formData.email}
                fullWidth
                label="Email"
                name="email"
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl>
              <TextField
                onChange={updateFormField}
                value={formData.address}
                fullWidth
                label="Street Address"
                name="address"
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl>
              <TextField
                onChange={updateFormField}
                value={formData.city}
                fullWidth
                label="City/Village"
                name="city"
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl>
              <TextField
                onChange={updateFormField}
                value={formData.state}
                fullWidth
                label="State"
                name="state"
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl>
              <TextField
                onChange={updateFormField}
                value={formData.zipCode}
                fullWidth
                label="ZIP Code"
                name="zipCode"
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl>
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
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl>
              <TextField
                onChange={updateFormField}
                value={formData.company}
                fullWidth
                label="Company"
                name="company"
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl>
              <TextField
                onChange={updateFormField}
                value={formData.website}
                fullWidth
                label="Website"
                name="website"
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl>
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
            </FormControl>
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