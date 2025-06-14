const BASE_URL="http://127.0.0.1:8000"

//load user on page load:
window.onload=()=>{
    fetchUsers();   //fetch all user from api on page load
};

// Helper functions to fetch all users
async function fetchUsers() {
    const res= await fetch('${BASE_URL}/users/');
    const user= await res.json();

    const tbody=document.querySelector('#userTable tbody');
    tbody.innerHTML="";

    user.forEach((user) => {
        const tr=document.createElement("tr");

        tr.innerHTML= `
        <td class="border px-4 py-2">${user.id}</td>
        <td class="border px-4 py-2">${user.name}</td>
        <td class=border px-4 py-2 >${user.emai}</td>
        <td class=border px-4 py-2 flex gap-2 justify-center>
        <button onclick='editUser(${user.id})' class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">Edit</button>
        <button onclick='deleteUser(${user.id})' class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Delete</button>
        </td>
         `;
         tbody.appendChild(tr);
  });
}

// Handle form submission for creating user
document.getElementById("createUserForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  await fetch(`${BASE_URL}/User/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  });

  document.getElementById("createUserForm").reset();
  fetchUsers();
});

// Delete user by ID
async function deleteUser(id) {
  await fetch(`${BASE_URL}/User/${id}`, {
    method: "DELETE",
  });
  fetchUsers();
}

// Edit user dialog
async function editUser(id) {
  const res = await fetch(`${BASE_URL}/User/${id}`);
  const user = await res.json();

  const newName = prompt("Enter new name:", user.name);
  const newEmail = prompt("Enter new email:", user.email);

  if (!newName || !newEmail) return;

  await fetch(`${BASE_URL}/User/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: newName, email: newEmail }),
  });

  fetchUsers();
}