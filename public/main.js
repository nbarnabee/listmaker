document.querySelector(".show-lists").addEventListener("click", displayLists);
document.querySelector(".make-list").addEventListener("click", addList);
document.querySelector(".add-item").addEventListener("click", addItem);
document.querySelector(".save-list").addEventListener("click", saveList);

let listDisplay = document.querySelector(".list-container");
let masterList = {};

window.onLoad = function () {
  if (localStorage.getItem("savedListObj") !== null) {
    masterList = JSON.parse(localStorage.getItem("savedListObj"));
    console.log(`List loaded: ${masterList}`);
  } else console.log("No list data found");
};

function displayLists() {
  listDisplay.innerHTML = "";
  for (let key in masterList) {
    let listName = document.createElement("ul");
    listName.textContent = key;
    listDisplay.appendChild(listName);
    masterList[key].forEach((a) => {
      let listItem = document.createElement("li");
      listItem.textContent = a;
      listName.appendChild(listItem);
    });
  }
}

function addList() {
  let listName = document.querySelector(".new-list").value;
  console.log(listName);
  masterList[listName] = [];
  console.log(`List ${listName} added`);
  document.querySelector(".new-list").value = "";
}

function addItem() {
  let listName = document.querySelector(".select-list").value;
  let newItem = document.querySelector(".new-item").value;
  if (masterList.hasOwnProperty(listName)) masterList[listName].push(newItem);
  else alert("Error: no such list");
}

function saveList() {
  let savedListObj = JSON.stringify(masterList);
  localStorage.setItem("savedListObj", savedListObj);
}
