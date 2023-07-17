// Declaring the serial number to keep track of the names entered and getting my id from HTML
let serialNumber = 1;

let Btn = document.getElementById("Btn");
let nameInput = document.getElementById("nameInput");
let table = document.getElementById("attendanceTable");
let error = document.getElementById('error')

// This button submits the name into the sheet when clicked
Btn.addEventListener("click", function () {
  submitAttendance();
});

// Here is the function to the button
function submitAttendance() {
  const name = nameInput.value; //getting the value of the name input.

  // A conditional statement to check if the input field is not empty. submit the name and get the current time and display an error message if it is empty.
  if (name !== "") {
    const time = getCurrentTime();
    const date = new Date().toDateString()

    const row = table.insertRow(-1);
    const serialNumberCell = row.insertCell(0);
    const nameCell = row.insertCell(1);
    const dateCell = row.insertCell(2)
    const timeCell = row.insertCell(3);
    const timeOutCell = row.insertCell(4);
    const actionCell = row.insertCell(5);

    serialNumberCell.innerHTML = serialNumber;
    nameCell.innerHTML = name;
    dateCell.innerHTML = date;
    timeCell.innerHTML = time;
    timeOutCell.innerHTML = "-"; //makes it empty not to have the same value as the time signed in.
    actionCell.innerHTML = `<button onclick="signOut(${serialNumber})">Sign Out</button>`; //a button to get the time signed out when clicked

    nameInput.value = "";
    serialNumber++;

    error.textContent = "" //Does not display the error yet
  } else {
    error.textContent = 'Please enter your FULL_NAME' // Error to be displayed if input is empty
  }
}

function signOut(serialNumber) {
  const time = getCurrentTime();
  const timeOutCell = table.rows[serialNumber].cells[4];
  const actionCell = table.rows[serialNumber].cells[5];

  timeOutCell.innerHTML = time;
  actionCell.innerHTML = 'Signed-Out'; // Confirms signing out
}

function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  return hours + ":" + minutes + ":" + seconds; //get the current time and return it as hours, minutes and seconds
}
