document.querySelector(".make-list").addEventListener("click", addList);
document.querySelector(".add-item").addEventListener("click", addItem);

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

/* For each key:value pair in the masterList, this creates a "list" element (a div containing a title and a ul) 
Then it adds the */

function displayLists() {
  listDisplay.innerHTML = "";
  for (let key in masterList) {
    let listDiv = document.createElement("div");
    listDiv.classList.add("list-div");
    listDisplay.appendChild(listDiv);
    let listName = document.createElement("h2");
    listName.textContent = key;
    listDiv.appendChild(listName);
    let listUL = document.createElement("ul");
    listDiv.appendChild(listUL);
    let deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("type", "button");
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
  let listName = document.querySelector(".new-list").value;
  console.log(listName);
  masterList[listName] = [];
  console.log(`List ${listName} added`);
  document.querySelector(".new-list").value = "";
  displayLists();
  saveList();
}

function addItem() {
  let listName = document.querySelector(".select-list").value;
  let newItem = document.querySelector(".new-item").value;
  if (masterList.hasOwnProperty(listName)) {
    masterList[listName].push(newItem);
    displayLists();
    saveList();
    document.querySelector(".new-item").value = "";
  } else alert("Error: no such list");
}

function saveList() {
  let savedListObj = JSON.stringify(masterList);
  localStorage.setItem("savedListObj", savedListObj);
}

function deleteList(e) {
  let key = e.target.value;
  delete masterList[key];
  displayLists();
  saveList();
}

function deleteItem(e) {
  let list = e.target.name;
  let item = e.target.value;
  masterList[list] = masterList[list].filter((a) => a !== item);
  displayLists();
  saveList();
}
