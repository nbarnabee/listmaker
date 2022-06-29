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

/* For each key:value group in the masterList, this creates a "list" element.  This code is a mess, but the final structure looks like:
<div>
  <h2>
  <ul>
    <li>....
  </ul>
  <div>
    <label>
      <input>
    </label>
    <button>
  </div>
  <button>
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
    let itemInputDiv = document.createElement("div");
    itemInputDiv.classList.add("item-input-div");
    listDiv.appendChild(itemInputDiv);
    let itemInputLabel = document.createElement("label");
    itemInputLabel.textContent = "Add to list";
    itemInputDiv.appendChild(itemInputLabel);
    let itemInput = document.createElement("input");
    itemInput.classList.add("new-item");
    itemInput.setAttribute("type", "text");
    itemInputLabel.appendChild(itemInput);
    let addBtn = document.createElement("button");
    addBtn.setAttribute("type", "button");
    addBtn.value = key;
    addBtn.textContent = "Add item";
    addBtn.addEventListener("click", addListItem);
    itemInputDiv.appendChild(addBtn);
    let deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("type", "button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.value = key;
    deleteBtn.textContent = "Delete List";
    deleteBtn.addEventListener("click", deleteList);
    listDiv.appendChild(deleteBtn);
    masterList[key].forEach((a) => {
      /* It seems I am having to go about this in a wonky way, all for the sake of these damnable buttons. */
      let listItem = document.createElement("li");
      listUL.appendChild(listItem);
      let listItemName = document.createElement("span");
      listItemName.textContent = a;
      listItem.appendChild(listItemName);
      let deleteListItem = document.createElement("button");
      deleteListItem.setAttribute("type", "button");
      deleteListItem.name = [key];
      deleteListItem.value = a;
      deleteListItem.innerText = "X";
      deleteListItem.addEventListener("click", deleteItem);
      listItemName.appendChild(deleteListItem);
    });
  }
}

function addList() {
  let listName = document.getElementById("new-list").value;
  console.log(listName);
  masterList[listName] = [];
  console.log(`List ${listName} added`);
  displayLists();
  saveList();
}

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
  masterList[list] = masterList[list].filter((a) => a !== item);
  displayLists();
  saveList();
}
