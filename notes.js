//console.log("hello")
//if user adds a note, add it to the local storage
showNotes();

/*function to add notes to local storage in the form of key value pair
 JSON.stringify()-this converts any oject to string. here array ([["notes1","notes2","nots3"]]) is an object
it wii make it "["notes1","notes2","nots3"]".
JSON.parse()-this again converts the stringified object to a normal js object.
localStorage.setItems(key,value)-stores item in the form of key value pair*/

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {


  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes")
  if (notes == null) {
    notesObj = [];
  }
  else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push(addTxt.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));

  //  console.log(localStorage);
  addTxt.value = "";
  showNotes();
})

/*function to show notes after reading from local storage*/

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  }
  else {
    notesObj = JSON.parse(notes);
  }

  let html = "";
  notesObj.forEach(function (element, index) {

    html += `
  <div class="my-2 mx-2 card noteCard" style="width: 18rem;">
      
      <div class="card-body">
        <h5 class="card-title">Note ${index + 1}</h5>
        <p  class="card-text">${element}</p>
        <button id="${index}" onClick="deleteNote(this.id)" class="btn btn-primary">Delete Node</button>
      </div>
    </div>`

  });
  let notesElem = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElem.innerHTML = html;
  }
  else {
    notesElem.innerHTML = "Nothing to show";
  }
}

/*function to delete notes*/

function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  }
  else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

/*function to search notes*/

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    }
    else {
      element.style.display = "none";
    }


  })

})
