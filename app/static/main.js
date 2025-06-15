const API_URL = "http://127.0.0.1:8000";
const userForm = document.getElementById("userForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const userIdInput = document.getElementById("userId");
const usersList = document.getElementById("users");
const resetBtn = document.getElementById("resetBtn");

async function fetchUsers() {
  const res = await fetch(`${API_URL}/users/`);
  const users = await res.json();
  renderUsers(users);
}

function renderUsers(users) {
  usersList.innerHTML = "";  // Clear previous list

  users.forEach(user => {
    const tr = document.createElement("tr");
    tr.className = "border-b";

    tr.innerHTML = `
      <td class="py-2 px-4">${user.name}</td>
      <td class="py-2 px-4">${user.email}</td>
      <td class="py-2 px-4 space-x-2">
        <button onclick="editUser(${user.id}, '${user.name}', '${user.email}')" class="bg-yellow-400 text-white px-3 py-1 rounded">Edit</button>
        <button onclick="deleteUser(${user.id})" class="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
      </td>
    `;
    usersList.appendChild(tr);
  });
}


userForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userId = userIdInput.value;
  const userData = {
    name: nameInput.value,
    email: emailInput.value,
  };

  if (userId) {
    // Update
    await fetch(`${API_URL}/User/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
  } else {
    // Create
    await fetch(`${API_URL}/User/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
      
    });
  }

  userForm.reset();
  userIdInput.value = "";
  fetchUsers();
});


//edit functions
function editUser(id, name, email) {
  userIdInput.value = id;
  nameInput.value = name;
  emailInput.value = email;
}

async function deleteUser(id) {
  await fetch(`${API_URL}/User/${id}`, {
    method: "DELETE",
  });
  fetchUsers();
}

resetBtn.addEventListener("click", () => {
  userForm.reset();
  userIdInput.value = "";
});



//search function
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase();
  // const allUsers = document.querySelectorAll("#users li");
  const allUsers = document.querySelectorAll("#users tr");



  allUsers.forEach(user => {
    const name = user.querySelector("td").innerText.toLowerCase();
    if (name.includes(searchValue)) {
      user.style.display = "table-row";
    } else {
      user.style.display = "none";
    }
  });


//toast function in js
function showToast(message, color = "green") {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.className = `fixed bottom-5 right-5 bg-${color}-500 px-4 py-2 rounded text-white font-semibold z-50`;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}







});







fetchUsers();
