function load() {
    document.getElementById("list").addEventListener("click", function (e) { clickTask(e); }, false);
    getSavedTasks();
    console.log("load");
}

function clearAll() {
    document.getElementById('list').innerHTML = "";
    localStorage.clear();
}

function make_div(text, done = "false") {
    let div = document.createElement("div");
    div.className = "task";
    div.id = 'task';
    let p = document.createElement('p');
    p.innerHTML = text;
    p.className = 'content';
    if (done === "true") { p.classList.add("done"); }
    div.appendChild(p);
    let del = document.createElement("span");
    del.innerHTML = "&#x2718";
    del.className = "del";
    div.appendChild(del);

    return div;
}


function addTask() {
    const inputBox = document.getElementById("newTask").value.trim();
    if (inputBox === "") {
        alert("wrtie something!");
    }
    else if (saveTask(inputBox)) {
        let div = make_div(inputBox);
        document.getElementById("list").appendChild(div);
        document.getElementById("newTask").value = "";
    }
}

function clickTask(e) {
    if (e.target.id !== 'list') {
        parent = e.target;
        if (parent.id !== 'task') parent = parent.parentElement;
        child = parent.getElementsByTagName('p')[0];

        if (e.target.className === 'del') {

            localStorage.removeItem(child.innerHTML);
            parent.remove();
            console.log("task's deleted!");
        }
        else {
            child.classList.toggle("done");
            done = localStorage.getItem(child.innerHTML);

            if (done === 'false') localStorage[child.innerHTML] = 'true';
            else localStorage[child.innerHTML] = 'false';
        }
    }
}


function saveTask(task) {
    if (localStorage.getItem(task) === null) {
        localStorage.setItem(task, "false");
        return true;
    }

    alert('This task is already listed!');
    return false;
}

function getSavedTasks() {
    for (let i = 0; i < localStorage.length; i++) {
        task = localStorage.key(i);
        done = localStorage.getItem(task);
        document.getElementById("list").appendChild(make_div(task, done));
    }
}

function color(id) {
    sp = id.getElementsByTagName('span')[0];

    c1 = id.className;
    id.className = sp.className;
    sp.className = c1;

}
