    function addTask() {
      const input = document.getElementById("taskInput");
      const taskText = input.value.trim();
      if (taskText === "") return;

      const li = document.createElement("li");

      const textSpan = document.createElement("span");
      textSpan.textContent = taskText;
      textSpan.onclick = () => makeEditable(textSpan);

      const delBtn = document.createElement("button");
      delBtn.innerHTML = "🗑️";
      delBtn.className = "delete";
      delBtn.onclick = () => li.remove();

      li.appendChild(textSpan);
      li.appendChild(delBtn);
      document.getElementById("taskList").appendChild(li);

      input.value = "";
    }

    function makeEditable(span) {
      const currentText = span.textContent;
      const input = document.createElement("input");
      input.type = "text";
      input.value = currentText;
      input.className = "edit-input";

      
      span.replaceWith(input);
      input.focus();

      input.onblur = () => saveEdit(input, span);
      input.onkeydown = (e) => {
        if (e.key === "Enter") {
          saveEdit(input, span);
        }
      };
    }

    function saveEdit(input, spanTemplate) {
      const newSpan = document.createElement("span");
      newSpan.textContent = input.value.trim() || "Untitled";
      newSpan.onclick = () => makeEditable(newSpan);
      input.replaceWith(newSpan);
    }

    // Add task with Enter key
    document.getElementById("taskInput").addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        addTask();
      }
    });
  