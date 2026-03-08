// fucntion show label in card by looping array
const showLebels = (arr) => {
    const newArr = arr.map(item => `<p class="badge badge-soft bg-yellow-200 font-[400] text-[11px]">${item.toUpperCase()}</p>`);
    return newArr.join("");
}
// open and close array
let statusOpenArr = [];
let statusCloseArr = [];

// fetch all issue
const loadAllCard = async () => {

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();

    displayAllCard(data.data);

    const openIssues = data.data.filter(issue => issue.status === "open");
    statusOpenArr = openIssues;

    const closeIssues = data.data.filter(issue => issue.status === "closed");
    statusCloseArr = closeIssues;

  document.getElementById("loadingSpinner").classList.add("hidden")
};

// display all issue by this function
const displayAllCard = (cardArray) => {
    // update total issue
    const totalIssue = document.getElementById("totalIssue");
    totalIssue.textContent = cardArray.length;


    const cardContainer = document.getElementById("allCard-Container");
    cardContainer.innerHTML = "";
    const newDate = new Date("2024-01-25T08:30:00Z");

    cardArray.forEach(card => {

        // badge color
        let badge;
        if (card.priority === "high") {
            badge = "badge-error"
        } else if (card.priority === "medium") {
            badge = "badge-warning"
        }

        // border color update



        const newDiv = document.createElement("div");
        newDiv.className = "bg-white space-y-2 p-3 rounded-xl border-t-4  shadow hover:scale-[0.98] transition duration-200 cursor-pointer";
        newDiv.setAttribute("onclick", `showMyModal(${card.id})`)
        // border color update korbo and icon
        let icon;
        if (card.status === "open") {
            newDiv.classList.add("border-[#00a96e]")
            icon = "./assets/Open-Status.png";
        } else if (card.status === "closed") {
            newDiv.classList.add("border-[#a855f7]")
            icon = "./assets/Closed- Status .png";
        }

        newDiv.innerHTML = `
           <div class="p-2">
                        <div class="flex justify-between items-center">
                          <img src="${icon}" alt="">
                          <p class="badge badge-soft ${badge}  text-sm">${card.priority.toUpperCase()}</p>
                        </div>
                  </div>

                    <div>
                      <h1 class="font-bold min-h-[50px]">${card.title} </h1>
                      <p class="text-sm line-clamp-2">${card.description}</p>
                    </div>

                    <div class="flex gap-3 py-3">
                      ${showLebels(card.labels)}
                    </div>

                    <div class="h-px bg-gray-300 my-3"></div>

                    <div>
                      <p class="opacity-85"># ${card.author}</p>
                      <p class="opacity-85">${newDate.toLocaleDateString()}</p>
                    </div>
    `;
        cardContainer.appendChild(newDiv)

       document.getElementById("cardSectionContainer").classList.remove("hidden")
    });
}
loadAllCard();

// showing modal functionality
const showMyModal = async (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayModal(data.data)
}
const displayModal = (obj) => {

    let badge;
    if (obj.priority === "high") {
        badge = "badge-error"
    } else if (obj.priority === "medium") {
        badge = "badge-warning"
    } else {
        badge = "bg-gray-300"
    }

    const modalContainer = document.getElementById("my_modal_1");
    const newDate = new Date();

    modalContainer.innerHTML = `
        <div class="modal-box">
              <h3 class="text-xl font-bold py-2">${obj.title}</h3>
                  <div class="flex gap-2 max-sm:flex-col">
                      <p  class="text-white badge ${obj.status === "open"? "badge-success":"status-closed"}">${obj.status}</p>
                      <p> ✿ Opened by <span class="font-semibold">${obj.assignee === ""? obj.author:obj.assignee}</span> <span> ✿ ${newDate.toLocaleDateString()}</span></p>
                  </div>
                    <div class="flex gap-3 py-3">
                        ${showLebels(obj.labels)}
                        </div>
    
                        <div>
                          <p class="opacity-90  py-2">${obj.description}</p>
                        </div>
    
                        <div class="flex justify-between bg-base-200 p-5 rounded-xl">
                            <div class="text-start w-[50%]">
                            <p class="opacity-90">Assignee:</p>
                            <p class="font-semibold">${obj.assignee === ""? obj.author:obj.assignee}</p>
                            </div>
                            <div class="text-start w-[50%]">
                             <P class="opacity-90">Priority:</P>
                             <p class="badge  ${badge}">${obj.priority.toUpperCase()}</p>
                            </div>
                        </div>
    
              <div class="modal-action">
                <form method="dialog">
                  <!-- if there is a button in form, it will close the modal -->
                  <button class="btn btn-primary outline-none">Close</button>
                </form>
              </div>
            </div>
        `
    my_modal_1.showModal()
}




// button toggling 

const allBtn = document.getElementById("allBtn");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");

const switchBtn = (btn)=>{
    allBtn.classList.remove("btn-primary")
    openBtn.classList.remove("btn-primary")
    closeBtn.classList.remove("btn-primary")
   
    const clicked = document.getElementById(btn);
    clicked.classList.add("btn-primary")
}

allBtn.addEventListener("click", () => {
  loadAllCard();
});

openBtn.addEventListener("click", () => {
  displayAllCard(statusOpenArr);
});

closeBtn.addEventListener("click", () => {
  displayAllCard(statusCloseArr);
});

// search button 
document.getElementById("searchButton").addEventListener("click", ()=>{
  const inputValue = document.getElementById("searchInput").value.trim();
  if(inputValue.length === 0){
    alert("Please enter something to search");
    return;
  }
   fetchSearch(`${inputValue}`);
})
const fetchSearch = async(input)=>{

  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${input}`;
  const res = await fetch(url);
  const data = await res.json();
  const totalResult = data.data;

  displayAllCard(totalResult)
};