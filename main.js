function save() {
    const noteBox = document.getElementById("noteBox");
    const dateBox = document.getElementById("dateBox");
    const timeBox = document.getElementById("timeBox");
    const note = noteBox.value;
    const date = dateBox.value;
    const time = timeBox.value;

    const OneNote = {
        note: note,
        date: date,
        time: time
    };

    const currentJsonArray = localStorage.getItem("allNotes");
    let arr = JSON.parse(currentJsonArray);
    if (arr === null) {
        arr = [];
    }

    if (note === "") {
        const x = document.getElementById("snackNote");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    }
    else {
        if (date === "") {
            const x = document.getElementById("snackDate");
            x.className = "show";
            setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
        }
        else {
            arr.push(OneNote);

            const newJsonArray = JSON.stringify(arr);
            localStorage.setItem("allNotes", newJsonArray);
            let notesContainer = document.getElementById("notesContainer");
            let div = document.createElement("div");
            let button = document.createElement("button");
            button.className = "deleteBtn glyphicon glyphicon-remove";
            button.onclick = removeNote;
            div.className = "note";
            div.innerHTML = "<div class='note_text'>" + note + "</div>" + "<div class='date_text'>" + date + "</div>" + "<div class='time_text'>" + time + "</div>";
            notesContainer.appendChild(div);
            div.append(button);
        }
    }
}

function loadNotes() {
    const currentJsonArray = localStorage.getItem("allNotes");
    if (currentJsonArray !== null) {
        let notesArr = JSON.parse(currentJsonArray);
        pushNotesFromStorage(notesArr);
    }
}

function pushNotesFromStorage(notesArr) {
    if (notesArr.length > 0) {
        for (let i = 0; i < notesArr.length; i++) {
            const notesContainer = document.getElementById("notesContainer");
            const div = document.createElement("div");
            div.className = "note";
            const button = document.createElement("button");
            button.className = "deleteBtn glyphicon glyphicon-remove";
            button.onclick = removeNote;
            div.innerHTML = "<div class='note_text'>" + notesArr[i].note + "</div>" + "<div class='date_text'>" + notesArr[i].date + "</div>" + "<div class='time_text'>" + notesArr[i].time + "</div>";
            notesContainer.appendChild(div)
            div.append(button);
        }
    }
}

function clearNote() {
    const noteBox = document.getElementById("noteBox");
    const dateBox = document.getElementById("dateBox");
    const timeBox = document.getElementById("timeBox");
    const note = noteBox.value = "";
    const date = dateBox.value = "";
    const time = timeBox.value = "";   
}

function removeNote() {
    this.parentElement.parentElement.removeChild(this.parentElement);
    let notesArr = localStorage.getItem("allNotes");
    notesArr = JSON.parse(notesArr);
    var noteValue = this.parentElement.children[0].innerHTML;
 
    for (let i = 0; i < notesArr.length; i++) {
        if (notesArr[i].note === noteValue) {
            notesArr.splice(i, 1);
        }
    }
    localStorage.setItem("allNotes", JSON.stringify(notesArr));
}


