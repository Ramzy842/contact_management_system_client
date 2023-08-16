import React, { useEffect, useState } from "react";

const SearchBox = ({ initialContacts, setContacts }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (searchTerm.length > 0) {
      const newList = initialContacts.filter(
        (contact) =>
          contact.firstName.startsWith(searchTerm) ||
          contact.lastName.startsWith(searchTerm)
      );
      setContacts(newList);
    } else {
      setContacts(initialContacts);
    }
  }, [initialContacts, searchTerm, setContacts]);
  return (
    <div className="search_box_container">
      <input
        type="text"
        placeholder="Search contact"
        value={searchTerm}
        className="search_box"
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBox;
