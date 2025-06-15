const API_URL = "http://127.0.0.1:8000";

const userForm = document.getElementById("userForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const userIdInput = document.getElementById("userId");
const usersList = document.getElementById("users");
const resetBtn = document.getElementById("resetBtn");
const searchInput = document.getElementById("searchInput");

// ============== 1. Fetch Users ==============
async function fetchUsers() {
  const res = await fetch(`${API_URL}/users/`);
  const users = await res.json();
  renderUsers(users);
}

// ============== 2. Render Users to Table ==============
function renderUsers(users) {
  usersList.innerHTML = "";

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

// ============== 3. Create User ==============
async function createUser(userData) {
  try {
    const res = await fetch(`${API_URL}/User/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (res.ok) {
      showToast("User created successfully!", "green");
      fetchUsers();
    } else {
      const err = await res.json();
      showToast("Create failed: " + err.detail, "red");
    }
  } catch (error) {
    console.error(error);
    showToast("Error creating user", "red");
  }
}

// ============== 4. Update User ==============
async function updateUser(userId, userData) {
  try {
    const res = await fetch(`${API_URL}/User/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (res.ok) {
      showToast("User updated successfully!", "blue");
      fetchUsers();
    } else {
      const err = await res.json();
      showToast("Update failed: " + err.detail, "red");
    }
  } catch (error) {
    console.error(error);
    showToast("Error updating user", "red");
  }
}

// ============== 5. Form Submit Handler ==============
function handleUserFormSubmit(e) {
  e.preventDefault();
  const userId = userIdInput.value;
  const userData = {
    name: nameInput.value,
    email: emailInput.value,
  };

  if (userId) {
    updateUser(userId, userData);
  } else {
    createUser(userData);
  }

  userForm.reset();
  userIdInput.value = "";
}

// ============== 6. Edit Handler ==============
function editUser(id, name, email) {
  userIdInput.value = id;
  nameInput.value = name;
  emailInput.value = email;
}

// ============== 7. Delete User ==============
async function deleteUser(id) {
  try {
    const res = await fetch(`${API_URL}/User/${id}`, {
      method: "DELETE",
    });

    if (res.status === 200 || res.status === 204) {
      showToast("User deleted successfully!", "red");
    } else {
      const err = await res.json();
      showToast("Delete failed: " + err.detail, "red");
    }
    fetchUsers();
  } catch (error) {
    showToast("Something went wrong while deleting!", "red");
    console.error(error);
  }
}

// ============== 8. Reset Form ==============
function resetForm() {
  userForm.reset();
  userIdInput.value = "";
}

// ============== 9. Search Users ==============
function filterUsers() {
  const searchValue = searchInput.value.toLowerCase();
  const allUsers = document.querySelectorAll("#users tr");

  allUsers.forEach(user => {
    const name = user.querySelector("td").innerText.toLowerCase();
    user.style.display = name.includes(searchValue) ? "table-row" : "none";
  });
}

// ============== 10. Toast Message ==============
function showToast(message, color = "green") {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.className = `fixed bottom-5 right-5 bg-${color}-500 px-4 py-2 rounded text-white font-semibold z-50`;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}

// ============== 11. Event Listeners ==============
userForm.addEventListener("submit", handleUserFormSubmit);
resetBtn.addEventListener("click", resetForm);
searchInput.addEventListener("input", filterUsers);

// ============== 12. Initialize ==============
fetchUsers();
