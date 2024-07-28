import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, IconButton, Typography, TextField, InputAdornment } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

const ContactListComponent = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    filterContacts();
  }, [contacts, searchTerm]);

  const fetchContacts = async () => {
    try {
      const res = await axios.get('http://localhost:4000/contacts');
      setContacts(res.data.contacts);
    } catch (error) {
      console.error('Error fetching contacts:', error.response ? error.response.data : error.message);
    }
  };

  const filterContacts = useCallback(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = contacts.filter(contact => {
      const addressString = Array.isArray(contact.address) ? contact.address.join(' ') : '';
      return (
        (contact.firstName && contact.firstName.toLowerCase().includes(lowercasedSearchTerm)) ||
        (contact.lastName && contact.lastName.toLowerCase().includes(lowercasedSearchTerm)) ||
        (contact.email && contact.email.toLowerCase().includes(lowercasedSearchTerm)) ||
        (contact.phoneNumber && contact.phoneNumber.toString().toLowerCase().includes(lowercasedSearchTerm)) ||
        (addressString.toLowerCase().includes(lowercasedSearchTerm)) ||
        (contact.city && contact.city.toLowerCase().includes(lowercasedSearchTerm)) ||
        (contact.state && contact.state.toLowerCase().includes(lowercasedSearchTerm)) ||
        (contact.zipCode && contact.zipCode.toLowerCase().includes(lowercasedSearchTerm)) ||
        (contact.dateOfBirth && new Date(contact.dateOfBirth).toLocaleDateString().toLowerCase().includes(lowercasedSearchTerm))
      );
    });
    setFilteredContacts(filtered);
  }, [contacts, searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/contacts/${id}`);
      setContacts(contacts.filter(contact => contact._id !== id));
    } catch (error) {
      console.error('Error deleting contact:', error.response ? error.response.data : error.message);
    }
  };

  const updateContact = (id) => {
    navigate(`/update-contact/${id}`);
  };

  const createContact = () => {
    navigate('/create-contact');
  };

  return (
    <div>
      <TextField
        value={searchTerm}
        onChange={handleSearchChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        fullWidth
        placeholder="Search contacts"
        variant="outlined"
        sx={{ mb: 2 }}
      />
      
      <Button
        variant="contained"
        color="primary"
        onClick={createContact}
        sx={{ mb: 2 }}
      >
        Create Contact
      </Button>

      <Grid container spacing={2}>
        {filteredContacts.map(contact => (
          <Grid item key={contact._id} xs={12} sm={6} md={4}>
            <div style={{ padding: 20, border: '1px solid #ccc', borderRadius: 10 }}>
              <Typography variant="h6">{contact.firstName} {contact.lastName}</Typography>
              <Typography>{contact.email}</Typography>
              <Typography>{contact.phoneNumber}</Typography>
              <div>
                <IconButton onClick={() => updateContact(contact._id)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => deleteContact(contact._id)} color="secondary">
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ContactListComponent;
