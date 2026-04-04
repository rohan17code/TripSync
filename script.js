/*************************************************
 GLOBAL STORAGE (save group members)
*************************************************/
let members = JSON.parse(localStorage.getItem("groupMembers")) || [];


/*************************************************
 LOGIN PAGE
*************************************************/
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function(e) {

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:3000/login", {

      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        email: email,
        password: password
      })

    })
    .then(res => res.json())
    .then(data => {

      if (data.status === "success") {

        alert("Login Successful");
        window.location.href = "creategroup.html";

      } else {

        alert("Invalid Login");

      }

    });

  });
}


/*************************************************
 SIGNUP PAGE
*************************************************/
const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", function(e) {

    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:3000/signup",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name:name,
        email:email,
        password:password
      })
    })
    .then(res=>res.text())
    .then(data=>{
      alert(data);   // show backend response
      window.location.href="login.html";
    })
    .catch(err=>{
      console.log(err);
      alert("Signup failed");
    });

  });
}


/*************************************************
 CREATE GROUP PAGE
*************************************************/
const createGroupForm = document.getElementById("createGroupForm");

if (createGroupForm) {
  createGroupForm.addEventListener("submit", function(e) {

    e.preventDefault();

    const groupName = document.getElementById("groupName").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const maxBudget = document.getElementById("maxBudget").value;

    fetch("http://localhost:3000/create-group",{

      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify({
        groupName,
        startDate,
        endDate,
        maxBudget
      })

    })
    .then(res=>res.json())
    .then(data=>{

      localStorage.setItem("groupId",data.groupId);

      alert("Group Created Successfully");

      window.location.href="addmembers.html";

    });

  });
}




/*************************************************
 ADD MEMBER PAGE
*************************************************/
const memberForm = document.getElementById("memberForm");

if(memberForm){

memberForm.addEventListener("submit",function(e){

e.preventDefault();

const name=document.getElementById("name").value;
const city=document.getElementById("city").value;
const budget=document.getElementById("budget").value;

const groupId=localStorage.getItem("groupId");

fetch("http://localhost:3000/add-member",{

method:"POST",
headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
groupId,
name,
city,
budget
})

})
.then(res=>res.text())
.then(data=>{
alert("Member Added");
});

});
}

/*************************************************
 RENDER MEMBERS
*************************************************/
function renderMembers() {
  membersList.innerHTML = "";

  members.forEach(member => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${member.name} — ${member.city} — ₹${member.budget}
      <button onclick="removeMember(${member.id})" class="remove-btn">
        Remove
      </button>
    `;

    membersList.appendChild(li);
  });
}


/*************************************************
 REMOVE MEMBER
*************************************************/
function removeMember(id) {
  members = members.filter(member => member.id !== id);
  saveMembers();
  renderMembers();
}


/*************************************************
 SAVE TO LOCAL STORAGE
*************************************************/
function saveMembers() {
  localStorage.setItem("groupMembers", JSON.stringify(members));
}


/*************************************************
 FIND BEST DESTINATION (BASIC LOGIC)
*************************************************/
const findBtn = document.getElementById("findDestination");

if (findBtn) {
  findBtn.addEventListener("click", function() {

    if (members.length === 0) {
      alert("Add at least one member");
      return;
    }

    // demo logic (you can upgrade later)
    const avgBudget =
      members.reduce((sum, m) => sum + Number(m.budget), 0) / members.length;

    localStorage.setItem("tripResult", JSON.stringify({
    avgBudget
    }));

    window.location.href = "results.html";

  });
}












