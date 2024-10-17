// 1. 유저가 값을 입력한다.
// 2. + 버튼을 클릭하면, 할 일이 추가된다.
// 3. 삭제 버튼을 누르면 할 일이 삭제된다.
// 4. 완료 버튼을 누르면 할 일에 밑줄이 그어지면서 완료상태가된다.
// 5. 미완료 완료 탭을 누르면, 언더바가 이동한다.
// 6. 완료탭은 완료된 내용만, 미완료는 미완료된 내용만 표시한다.
// 7. 전체 탭을 누르면 모든 내용을 표시한다.

let taskInput = document.getElementById("task-input");
let addBtn = document.getElementById("add-Btn");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode = "all";
let filterList = [];

addBtn.addEventListener("click", addTask);

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}
console.log(tabs);

function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };

  taskList.push(task);

  console.log(taskList);
  render();
}

function render() {
  let resultHTML = ``;

  list = [];
  if (mode === "all") {
    list = taskList;
  } else {
    list = filterList;
  }

  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task">
            <div class="task-done">${list[i].taskContent}</div>
            <div>
              <button onclick="toggleComplete('${list[i].id}')">완료</button>
              <button onclick="deleteTask('${list[i].id}')">삭제</button>
            </div>
          </div>`;
    } else {
      resultHTML += `<div class="task">
        <div>${list[i].taskContent}</div>
        <div>
          <button onclick="toggleComplete('${list[i].id}')">미완료</button>
          <button onclick="deleteTask('${list[i].id}')">삭제</button>
        </div>
      </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  console.log("id:", id);
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  filter({ target: { id: mode } });
  console.log(taskList);
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  filter({ target: { id: mode } });
  console.log(taskList);
}

function filter(event) {
  mode = event.target.id;
  filterList = [];

  if (mode === "all") {
    render();
  } else if (mode === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substring(2, 9);
}
