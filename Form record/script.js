function getRecord() {
  const records = localStorage.getItem("records");
  return records ? JSON.parse(records) : [];
}

function displayRecord() {
  const recordList = document.getElementById("recordList");
  recordList.innerHTML = ""; 

  const records = getRecord(); 

  records.forEach((record, index) => {
    const row = `
      <tr>
        <td>${record.name}</td>
        <td>${record.details}</td>
        <td>
          <button onclick="loadRecord(${index})">Edit</button>
          <button onclick="deleteRecord(${index})">Delete</button>
        </td>
      </tr>
    `;
    recordList.innerHTML += row;
  });
}
function addRecord() {
  const nameInput = document.getElementById("name").value.trim();
  const detailsInput = document.getElementById("details").value.trim();

  if (nameInput === "" || detailsInput === "") {
    alert("Please enter both name and details");
    return;
  }

  const newRecord = {
    name: nameInput,
    details: detailsInput,
  };

  const records = getRecord();
  records.push(newRecord); 
  localStorage.setItem("records", JSON.stringify(records)); 

  clearForm(); 
  displayRecord(); 
}

function loadRecord(index) {
  const records = getRecord();
  const record = records[index];

  document.getElementById("name").value = record.name;
  document.getElementById("details").value = record.details;

  document.getElementById("add-button").style.display = "none";
  document.getElementById("update-button").style.display = "inline";

  window.currentIndex = index; 
}

function updateRecord() {
  const records = getRecord();

  records[window.currentIndex].name = document.getElementById("name").value.trim();
  records[window.currentIndex].details = document.getElementById("details").value.trim();

  localStorage.setItem("records", JSON.stringify(records)); 

  clearForm(); 
  displayRecord(); 

  document.getElementById("add-button").style.display = "inline";
  document.getElementById("update-button").style.display = "none";
}

function deleteRecord(index) {
  const records = getRecord();
  records.splice(index, 1);

  localStorage.setItem("records", JSON.stringify(records)); 
  displayRecord(); 
}

function searchByName() {
  const query = document.getElementById("search").value.toLowerCase();
  const records = getRecord();
  const filteredRecords = records.filter(record => record.name.toLowerCase().includes(query));

  const recordList = document.getElementById("recordList");
  recordList.innerHTML = "";

  filteredRecords.forEach((record, index) => {
    recordList.innerHTML += `
      <tr>
        <td>${record.name}</td>
        <td>${record.details}</td>
        <td>
          <button onclick="loadRecord(${index})">Edit</button>
          <button onclick="deleteRecord(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
}

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("details").value = "";
}

document.addEventListener("DOMContentLoaded", displayRecord);