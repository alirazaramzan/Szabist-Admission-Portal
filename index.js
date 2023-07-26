document.addEventListener("DOMContentLoaded", () => {
    var selectedRow = null;
  
    // show Alerts
    function showAlert(message, className) {
      const div = document.createElement("div");
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
  
      const container = document.querySelector(".container");
      const main = document.querySelector(".main");
      container.insertBefore(div, main);
  
      setTimeout(() => div.remove(), 3000);
    }
  
    // clear all fields
    function clearFields() {
      document.querySelector("#firstName").value = "";
      document.querySelector("#lastName").value = "";
      document.querySelector("#rollno").value = "";
    }
  
    // Function to add a new student to the table
    function addStudent(firstName, lastName, rollno) {
      const list = document.querySelector(".student-list");
      const row = document.createElement("tr");
  
      row.innerHTML = `
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${rollno}</td>
        <td>
          <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
          <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
        </td>
      `;
  
      list.appendChild(row);
    }
  
    // Function to update a student in the table
    function updateStudent(firstName, lastName, rollno) {
      selectedRow.children[0].textContent = firstName;
      selectedRow.children[1].textContent = lastName;
      selectedRow.children[2].textContent = rollno;
    }
  
    // Function to delete a student from the table
    function deleteStudent() {
      selectedRow.remove();
    }
  
    // Event listener for the "Submit" button to add or update a student
    document.querySelector("#student-form").addEventListener("submit", (e) => {
      e.preventDefault();
  
      // Get form values
      const firstName = document.querySelector("#firstName").value;
      const lastName = document.querySelector("#lastName").value;
      const rollno = document.querySelector("#rollno").value;
  
      // Validate
      if (firstName == "" || lastName == "" || rollno == "") {
        showAlert("Please fill in all fields", "danger");
      } else {
        if (selectedRow == null) {
          addStudent(firstName, lastName, rollno);
          showAlert("Student Added", "success");
        } else {
          updateStudent(firstName, lastName, rollno);
          showAlert("Student Info Edited", "info");
          selectedRow = null; // Reset selectedRow after updating
        }
  
        clearFields();
      }
    });
  
    // Event delegation for "Edit" and "Delete" buttons
    document.querySelector(".student-list").addEventListener("click", (e) => {
      target = e.target;
      if (target.classList.contains("edit")) {
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#firstName").value = selectedRow.children[0].textContent;
        document.querySelector("#lastName").value = selectedRow.children[1].textContent;
        document.querySelector("#rollno").value = selectedRow.children[2].textContent;
      } else if (target.classList.contains("delete")) {
        selectedRow = target.parentElement.parentElement;
        deleteStudent();
        showAlert("Student Data Deleted", "danger");
      }
    });
  });
  