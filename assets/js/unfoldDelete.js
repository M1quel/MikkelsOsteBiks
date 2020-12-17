import navigationContent from "./navigationContent.js";

function unfoldDelete () {
    var baseURL = "https://osteapi-miquel.herokuapp.com/api/v1/cheeses"; 
    let cheeseID = document.querySelector("#cheeseSelector").value
    let deleteBtn = document.querySelector(".deleteBTN");

    document.querySelector(".returnToStart").addEventListener("click", () => {
        let html = `
            <h1 class="navigationContentHeading">Update, Add or Delete Cheese</h1>
    
            <button class="updateBtn">Update</button>
            <button class="addBtn">Add</button>
            <button class="deleteBtn">Delete</button>
            `;
        document.querySelector(".navigationContentWrapper").innerHTML = html;
        navigationContent();
    })
    deleteBtn.addEventListener("click", () => {
        fetch(baseURL + `/${cheeseID}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': "Bearer " + "HEJMEDDIG"
            }
        })
        .then(res => {
            console.log(res)
            if(res.status == 204) {
                alert("Cheese has been deleted")
                return;
            } else {
                alert("Cheese did not get deleted")
                return;
            }
        })
    })
}

export default unfoldDelete;