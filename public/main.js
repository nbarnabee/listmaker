document.querySelector(".make-list").addEventListener("click", addList);

let listDisplay = document.querySelector(".list-container");
let masterList;

if (localStorage.getItem("savedListObj") !== null) {
  masterList = JSON.parse(localStorage.getItem("savedListObj"));
  console.log("List loaded");
  displayLists();
} else {
  masterList = {};
  console.log("No list data found");
}

/* This creates a "list" div for each key:value group in the masterList.  This code is a mess, but the final structure looks like:
<div>
  <h2>
  <ul>
    <li>....
  </ul>
  <edit button>
  <delete button>
</div>
*/

function displayLists() {
  listDisplay.textContent = "";
  document.getElementById("new-list").value = "";
  for (let key in masterList) {
    let listDiv = document.createElement("div");
    listDiv.classList.add("list-div");
    listDisplay.appendChild(listDiv);
    let listName = document.createElement("h2");
    listName.textContent = key;
    listDiv.appendChild(listName);
    let listUL = document.createElement("ul");
    listDiv.appendChild(listUL);
    let editBtn = document.createElement("button");
    editBtn.setAttribute("type", "button");
    editBtn.classList.add("edit-btn");
    editBtn.value = key;
    editBtn.textContent = "Edit List";
    editBtn.addEventListener("click", editList);
    listDiv.appendChild(editBtn);
    let saveBtn = document.createElement("button");
    saveBtn.setAttribute("type", "button");
    saveBtn.classList.add("save-btn");
    saveBtn.value = key;
    saveBtn.textContent = "Save changes";
    saveBtn.addEventListener("click", saveListPostEdit);
    listDiv.appendChild(saveBtn);
    let deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("type", "button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.value = key;
    deleteBtn.textContent = "Delete List";
    deleteBtn.addEventListener("click", deleteList);
    listDiv.appendChild(deleteBtn);
    masterList[key].forEach((a) => {
      let listItem = document.createElement("li");
      listUL.appendChild(listItem);
      let listItemName = document.createElement("span");
      listItemName.textContent = a;
      listItem.appendChild(listItemName);
    });
  }
}

function addList() {
  let listName = document.getElementById("new-list").value;
  masterList[listName] = [];
  console.log(`List ${listName} added`);
  displayLists();
  saveList();
}

function editList(e) {
  console.log(e.target.parentNode);
  let key = e.target.value;
  let list = e.target.parentNode.childNodes[1];
  let listItems = Array.from(list.childNodes);
  listItems.forEach((a) => {
    let deleteListItem = document.createElement("button");
    deleteListItem.setAttribute("type", "button");
    deleteListItem.name = key;
    deleteListItem.value = a.innerText;
    deleteListItem.innerText = "X";
    deleteListItem.addEventListener("click", deleteItem);
    a.appendChild(deleteListItem);
  });
}

function saveListPostEdit(e) {
  console.log("boo");
}

// add a delete button to each list item
// add a "close editor button" that removes the buttons that are added
// add an "add item" input bar to the bottom of the list, and be sure that it's tied somehow to the value of the list that it's attached to
// let itemInputDiv = document.createElement("div");
// itemInputDiv.classList.add("item-input-div");
// listDiv.appendChild(itemInputDiv);
// let itemInputLabel = document.createElement("label");
// itemInputLabel.textContent = "Add to list";
// itemInputDiv.appendChild(itemInputLabel);
// let itemInput = document.createElement("input");
// itemInput.classList.add("new-item");
// itemInput.setAttribute("type", "text");
// itemInputLabel.appendChild(itemInput);
// let addBtn = document.createElement("button");
// addBtn.setAttribute("type", "button");
// addBtn.value = key;
// addBtn.textContent = "Add item";
// addBtn.addEventListener("click", addListItem);
// itemInputDiv.appendChild(addBtn);

// // Here the delete buttons

function addListItem(e) {
  let listName = e.target.value;
  let newItem = document.querySelector(".new-item").value;
  masterList[listName].push(newItem);
  displayLists();
  saveList();
}

function saveList() {
  let savedListObj = JSON.stringify(masterList);
  localStorage.setItem("savedListObj", savedListObj);
}

function deleteList(e) {
  let key = e.target.value;
  if (confirm(`Are you sure you want to delete "${key}"?`)) {
    delete masterList[key];
    displayLists();
    saveList();
  } else return;
}

function deleteItem(e) {
  let list = e.target.name;
  let item = e.target.value;
  console.log(e.target);
  e.target.parentNode.style.textDecoration = "line-through";
  // masterList[list] = masterList[list].filter((a) => a !== item);
  // displayLists();
  // saveList();
}
