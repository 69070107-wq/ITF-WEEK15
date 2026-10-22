


const STORAGE_KEY = "lab14-todo-list";


const DEFAULT_TODOS = [
  "ทำใบงาน HTML และ CSS",
  "ทบทวนบทเรียนประจำสัปดาห์",
  "ฝึกเขียนโปรแกรม Python",
  "จัดเตรียมไฟล์ส่งงาน"
];


let todos = [];


let idCounter = 0;



const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list"); 
const statusMsg = document.getElementById("status-msg");
const emptyMsg = document.getElementById("empty-msg");


function loadTodos() {
  const rawData = localStorage.getItem(STORAGE_KEY);

  if (rawData === null) {
    todos = DEFAULT_TODOS.map(function (text) {
      return { id: createId(), text: text };
    });
    saveTodos();
    return;
  }

  try {
    const parsedData = JSON.parse(rawData);

    if (Array.isArray(parsedData)) {
      todos = parsedData;
    } else {

    }
  } catch (error) {

    todos = [];
  }
}

function saveTodos() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.warn("บันทึกข้อมูลลง Local Storage ไม่สำเร็จ:", error);
  }
}


function createId() {
  idCounter = idCounter + 1;
  return "todo-" + Date.now() + "-" + idCounter;
}


function renderTodos() {
  list.innerHTML = "";

  todos.forEach(function (todo) {
    // สร้าง <li>
    const li = document.createElement("li");


    const text = document.createElement("span");
    text.textContent = todo.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.type = "button";
    deleteBtn.textContent = "ลบ";

    deleteBtn.addEventListener("click", function () {
      deleteTodo(todo.id);
    });

    li.appendChild(text);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });

  emptyMsg.hidden = todos.length > 0;
}


function addTodo() {
  const text = input.value.trim(); // trim() ตัดช่องว่างหัวท้ายออก

  if (text === "") {
    showStatus("กรุณาพิมพ์ข้อความก่อนกดเพิ่ม", true);
    input.focus();
    return;
  }


  const hasDuplicate = todos.some(function (todo) {
    return todo.text.toLowerCase() === text.toLowerCase();
  });

  if (hasDuplicate) {
    showStatus('มีรายการ "' + text + '" อยู่แล้ว', true);
    input.focus();
    return;
  }


  todos.push({ id: createId(), text: text });


  saveTodos();
  renderTodos();

  input.value = "";
  input.focus();

  showStatus('เพิ่มรายการ "' + text + '" แล้ว');
}


function deleteTodo(id) {

  const index = todos.findIndex(function (todo) {
    return todo.id === id;
  });

  if (index === -1) {
    return;
  }

  const removed = todos.splice(index, 1)[0]; // ลบออกจาก Array

  saveTodos();
  renderTodos();

  showStatus('ลบรายการ "' + removed.text + '" แล้ว');
}


let statusTimer = null;

function showStatus(message, isError) {
  statusMsg.textContent = message;
  statusMsg.classList.toggle("error", Boolean(isError));

  if (statusTimer !== null) {
    clearTimeout(statusTimer);
  }

  statusTimer = setTimeout(function () {
    statusMsg.textContent = "";
    statusMsg.classList.remove("error");
  }, 3000);
}

addBtn.addEventListener("click", addTodo);


input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTodo();
  }
});


loadTodos();
renderTodos();
