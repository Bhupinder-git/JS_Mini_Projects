// Selecting elements
const userTodoTemplate = document.querySelector("[data-user-todo-template]");
const userTodosContainer = document.querySelector("[data-user-todos-container]");
const searchInput = document.querySelector("[data-todo-search-input]");
const addWorkButtons = document.querySelectorAll("[data-work-container-add-btn]");
const addUserBtn = document.querySelector("[data-user-add-btn]");
const overlay = document.querySelector("[data-overlay]");
const newUserForm = document.querySelector("[data-new-user-add-form]");
const userNameInput = document.querySelector("[data-user-name-input]");
const userEmailInput = document.querySelector("[data-user-email-input]");
const userFromSubmitBtn = document.querySelector("[data-user-details-submit-btn]");
const imgDeleteBtns = document.querySelectorAll("[data-todo-delete]"); 


// Function to add the work in the work list
// Updated function to handle both hardcoded and dynamic cards
function makeTheAddButtonWork(addButton) {
  // Find the parent todo card
  const todoCard = addButton.closest("[data-user-todo]");

  // Get the input and work list from this specific card
  const workInput = todoCard.querySelector("[data-work-container-input]");
  const workList = todoCard.querySelector("[data-work-list-container]");

  // checking if the input is non-empty and doesn't filled with spaces
  if (workInput.value.trim() !== "") {
    // creating a paragraph element and inserting the work to-do
    const paraEl = document.createElement("p");
    paraEl.textContent = workInput.value;

    // creating an img element and setting it's class
    let imgEl = document.createElement("img");
    imgEl.src = "delete.png";
    imgEl.setAttribute("class", "deleteBtn");

    // Add event listener to the delete button when creating it
    imgEl.addEventListener("click", (evt) => {
      // Remove the parent paragraph element
      evt.target.parentElement.remove();
    });

    // appending img element in paragraph
    paraEl.append(imgEl);

    // appending paragraph to the workList
    workList.append(paraEl);

    // Clear the input field after adding the item
    workInput.value = "";
  }
}

// Function to display the new user form when clicked on add user button
addUserBtn.addEventListener("click", () => {
//   console.log("clicked");
  overlay.classList.add("overlay-active");
  newUserForm.classList.add("form-active");
});

// Function to hide the user display form
overlay.addEventListener("click", () => {
  overlay.classList.remove("overlay-active");
  newUserForm.classList.remove("form-active");
});

// Update the event listener for the each hardcoded card
addWorkButtons.forEach(button => {
  button.addEventListener("click", () => {
    makeTheAddButtonWork(button);
  });
});

imgDeleteBtns.forEach((imgDeleteBtn)=>{
  imgDeleteBtn.addEventListener('click',(evt)=>{
  evt.target.parentElement.remove();})
});

// Update the event listener for dynamic cards in the submit function
userFromSubmitBtn.addEventListener("click", (evt) => {
  // preventing the default action of the submit button in the form
  evt.preventDefault();

  // fetching the values entered in the inputs of the form
  const userName = userNameInput.value.trim();
  const userEmail = userEmailInput.value.trim();

  // checking if the input value is not empty  
  if (userName !== "" && userEmail !== "") {
    // cloning a todo card from todo template
    const todoEl = userTodoTemplate.content.cloneNode(true).children[0];

    // selecting the header and email container inside the cloned todo card 
    const header = todoEl.querySelector("[data-user-todo-header]");
    const emailEl = todoEl.querySelector("[data-user-todo-email]");

    // inserting the values in the header and email
    header.textContent = userName;
    emailEl.textContent = userEmail;

    // appending the todo card to actual main container
    userTodosContainer.append(todoEl);

    // making the new user form disappear after new user todo added
    overlay.classList.remove("overlay-active");
    newUserForm.classList.remove("form-active");

    // selecting add work button of the current todo element
    const addWorkBtnDynamic = todoEl.querySelector("[data-work-container-add-btn]");

    // Updated event listener for dynamic cards
    addWorkBtnDynamic.addEventListener("click", () => {
      makeTheAddButtonWork(addWorkBtnDynamic);
    });

    // Clear the form inputs
    userNameInput.value = "";
    userEmailInput.value = "";
  }
});


