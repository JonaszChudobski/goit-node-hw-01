import path from "node:path";
import fs from "node:fs/promises";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

export function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => console.log(JSON.parse(data)))
    .catch((error) => console.log(error.message));
}

export function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const parsedData = JSON.parse(data);
      const contact = parsedData.find((contact) => contact.id === contactId);
      console.log(contact);
    })
    .catch((error) => console.log(error.message));
}

export function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const parsedData = JSON.parse(data);
      const index = parsedData.findIndex((contact) => contact.id === contactId);
      parsedData.splice(index, 1);
      return parsedData;
    })
    .then((parsedData) => JSON.stringify(parsedData, null, 2))
    .then((parsedData) => fs.writeFile(contactsPath, parsedData))
    .catch((error) => console.log(error.message));
}

export function addContact(name, email, phone) {
  const contact = { id: nanoid(), name, email, phone };
  fs.readFile(contactsPath)
    .then((data) => {
      const parsedData = JSON.parse(data);
      parsedData.push(contact);
      return parsedData;
    })
    .then((parsedData) => JSON.stringify(parsedData, null, 2))
    .then((parsedData) => fs.writeFile(contactsPath, parsedData))
    .catch((error) => console.log(error.message));
}
