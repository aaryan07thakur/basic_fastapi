const BASE_URL="http://127.0.0.1:8000"

//load user on page load:
window.onload=()=>{
    fetchUsers();
};

// Helper functions to fetch all users
async function fetchUsers() {
    const res= await fetch('${BASE_URL}/users/');
    const user= await res.json();

    const tbody=document.querySelector('#userTable tbody');
    tbody.innerHTML="";
    
}