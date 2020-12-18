import fetcher from "./fetch.js";
import navigationContent from "./navigationContent.js";
var baseURL = "https://osteapi-miquel.herokuapp.com/api/v1/cheeses";

function unfoldUpdate (event) {
    document.querySelector(".navigationContentWrapper").querySelector("select").remove()
    document.querySelector(".returnToStart").remove(document.querySelector(".returnToStart"))
    let id = event.target.value;
    let html = `
    <form class="updateForm">
        <input placeholder="cheeseName" class="updateName" type="text">
        <div class="updateRow">
            <input placeholder="Cheese price" class="updatePrice" type="decimal">
            <input placeholder="Cheese weight" class="updateWeight" type="number">
        </div>
        <div class="updateRow">
            <input placeholder="Cheese strength" class="updateStrength" type="text">
            <input placeholder="Cheese brand" class="updateBrand" type="text">
        </div>
        <input placeholder="Cheese img url" class="updateImg" type="text">


        <button type="submit">Submit</button>
    </form>
    <button class="returnToStart">Return</button>
    `;
    document.querySelector(".navigationContentWrapper").innerHTML += html;
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
    fetcher(baseURL + `/${id}`)
    .then(data => {
        console.log(data)
        document.querySelector(".updateName").value = data.name;
        document.querySelector(".updatePrice").value = data.price.$numberDecimal;
        document.querySelector(".updateWeight").value = data.weight;
        document.querySelector(".updateStrength").value = data.strength;
        document.querySelector(".updateBrand").value = data.brand;
        document.querySelector(".updateImg").value = data.img;

        let form = document.querySelector(".updateForm");

        form.addEventListener("submit", function (e) {
            e.preventDefault();

            fetch(baseURL + `/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    name: document.querySelector(".updateName").value,
                    price: document.querySelector(".updatePrice").value,
                    weight: document.querySelector(".updateWeight").value,
                    strength: document.querySelector(".updateStrength").value,
                    brand: document.querySelector(".updateBrand").value,
                    img: document.querySelector(".updateImg").value
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Authorization': "Bearer " + "HEJMEDDIG"
                }
            })
            .then(res => {
                console.log(res)
                if(res.status == 200) {
                    alert("Cheese has been updated")
                    return;
                } else {
                    alert("Cheese did not get updated")
                    return;
                }
            })
        })
    })

}

export default unfoldUpdate;