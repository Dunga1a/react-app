import React from "react";

const ReadOnlyRow = ({ country, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{country.name}</td>
      <td>{country.code}</td>
      <td>{country.description}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, country)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(country.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;