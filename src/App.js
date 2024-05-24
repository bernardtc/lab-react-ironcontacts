// src/App.js
import "./App.css";
import React, {useState} from "react";
import contacts from "./contacts.json";

function App() {
  // criando o State e selecionando os contatos da lista
  const [contactsList, setContactsList] = useState(contacts.slice(12, 17));

  // Função para adicionar um contato aleatório
  const addRandomContact = () => {

    // Filtrar os contatos que ainda não estão na lista
    const remainingContacts = contacts.filter(contact => !contactsList.includes(contact));
    
    if (remainingContacts.length > 0) {
      // Selecionar um contato aleatório dos contatos restantes
      const randomContact = remainingContacts[Math.floor(Math.random() * remainingContacts.length)];
      
      // Atualizar a lista de contatos
      setContactsList(prevContacts => [...prevContacts, randomContact]);
    }
  };

    // Função para ordenar contatos pelo nome
  const sortByName = () => {
    const sortedContacts = [...contactsList].sort((a, b) => a.name.localeCompare(b.name));
    setContactsList(sortedContacts);
  };

  // Função para ordenar contatos pela popularidade
  const sortByPopularity = () => {
    const sortedContacts = [...contactsList].sort((a, b) => b.popularity - a.popularity);
    setContactsList(sortedContacts);
  };

  // Função para remover um contato
  const removeContact = (id) => {
    const updatedContacts = contactsList.filter(contact => contact.id !== id);
    setContactsList(updatedContacts);
  };

  return (
    <div className="App">
      <h1>Contacts</h1>
      <button onClick={addRandomContact}>Add Random Contact</button>
      <button onClick={sortByName}>Sort by Name</button>
      <button onClick={sortByPopularity}>Sort by Popularity</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contactsList.map(contact => (
            <tr key={contact.id}>
              <td>
                <img src={contact.pictureUrl} alt={contact.name} width="50" />
              </td>
              <td>{contact.name}</td>
              <td>{contact.popularity.toFixed(2)}</td>
              <td>{contact.wonOscar ? '🏆' : ''}</td>
              <td>{contact.wonEmmy ? '🏆' : ''}</td>
              <td>
                <button onClick={() => removeContact(contact.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default App;