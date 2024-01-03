let myLeads = []
//const means we cannot reassign these variables later on
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("save-btn")
//Lets the links bookmarks stay when page is refreshed
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function () {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            myLeads.push(tabs[0].url)
            localStorage.setItem("myLeads", JSON.stringify(myLeads))
            render(myLeads)
        })
    })

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        //listItems += "<li><a target='_blank' href='" + myLeads[i] + "'>" + myLeads[i] + "</a>"
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                 ${leads[i]}
                </a>
            </li>
        `
        ulEl.innerHTML = listItems
    }
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = [""]
    render(myLeads)
})


//addEventListener used instead of using onclick() in html
inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = "" //Clears the input value
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})