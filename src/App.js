import { useState, Fragment } from 'react';
import './country/CountryData';
import {nanoid} from "nanoid";
import './App.css';
import { CountryData } from './country/CountryData';
import ReadOnlyRow from './component/ReadOnly';
import EditableRow from './component/EditTable';

function App() {

  const storageCountries = JSON.parse(localStorage.getItem('country'));


  const [countrys, setCountrys] = useState(storageCountries ?? CountryData);
  const [addFormData, setAddFormData] = useState({
    name: "",
    code: "",
    description: "",
  });

  const [editFormData, setEditFormData] = useState({
    name: "",
    code: "",
    description: "",
  })

  const [editCountryId, setEditCountryId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newCountry = {
      id: nanoid(),
      name: addFormData.name,
      code: addFormData.code,
      description: addFormData.description,
    };

    const newCountrys = [...countrys, newCountry];
    // Save to localStorage
    const jsonCountry = JSON.stringify(newCountrys);
    localStorage.setItem('country', jsonCountry);
    setCountrys(newCountrys);
  }

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedCountrys = {
      id: editCountryId,
      name: editFormData.name,
      code: editFormData.code,
      description: editFormData.description,
    };

    const newCountrys = [...countrys];

    const index = countrys.findIndex((country) => country.id === editCountryId);

    newCountrys[index] = editedCountrys;

    setCountrys(newCountrys);
    setEditCountryId(null);
  };

  const handleEditClick = (event, country) => {
    event.preventDefault();
    setEditCountryId(country.id);

    const formValues = {
      name: country.name,
      code: country.code,
      description: country.description,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditCountryId(null);
  };

  const handleDeleteClick = (countryId) => {
    const newCountrys = [...countrys];

    const index = countrys.findIndex((country) => country.id === countryId);

    newCountrys.splice(index, 1);

    setCountrys(newCountrys);
  };
    return (
      <div className = "app-container">
        <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Code</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {countrys.map((country) => (
              <Fragment key={country.id}>
                {editCountryId === country.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    country={country}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
        </form>
        
        <h2>Add a Country</h2>
        <form onSubmit={handleAddFormSubmit}>
          <input
            type="text"
            name="name"
            required="required"
            placeholder="Enter a name..."
            onChange={handleAddFormChange}
          />
          <input
            type="text"
            name="code"
            required="required"
            placeholder="Enter an code..."
            onChange={handleAddFormChange}
          />
          <input
            type="text"
            name="description"
            required="required"
            placeholder="Enter description..."
            onChange={handleAddFormChange}
          />
          <button type="submit">Add</button>
        </form>
      </div>
    );
}

export default App;
