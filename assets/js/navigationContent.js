import unfoldUpdate from "./unfoldUpdate.js"
import unfoldDelete from "./unfoldDelete.js"

function navigationContent () {
    var baseURL = "https://osteapi-miquel.herokuapp.com/api/v1/cheeses";
    var optionTemplate = document.querySelector("#optionTemplate")
    var updateBtn = document.querySelector(".updateBtn");
    var deleteBtn = document.querySelector(".deleteBtn");
    var addBtn = document.querySelector(".addBtn");

    updateBtn.addEventListener("click", updateCheese)
    deleteBtn.addEventListener("click", deleteCheese)
    addBtn.addEventListener("click", addCheese)




    function updateCheese() {
        let html = `
        <h1 class="navigationContentHeading">Update Cheese</h1>
                    
        <label for="cheeseSelector">Select Cheese for update</label>
        <select name="cheeseSelector" id="cheeseSelector">
        <option value=""></option>
        </select>
        <button class="returnToStart">Return</button>
        
        `
        let cheeses = document.querySelectorAll(".cheese")
        document.querySelector(".navigationContentWrapper").innerHTML = html;
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
        let select = document.querySelector("#cheeseSelector")
        
        cheeses.forEach(cheese => {
            let clone = optionTemplate.content.cloneNode(true);
            
            clone.querySelector("option").value = cheese.dataset.id;
            clone.querySelector("option").innerText = cheese.querySelector(".cheeseHeading").innerText
            
            select.appendChild(clone)
        });
        
        select.addEventListener("change", unfoldUpdate)
    }

    function deleteCheese() {
        let html = `
        <h1 class="navigationContentHeading">Delete Cheese</h1>
                    
        <label for="cheeseSelector">Select Cheese to delete</label>
        <select name="cheeseSelector" id="cheeseSelector">
        <option value=""></option>
        </select>

        <button class="deleteBTN">Delete Cheese</button>
        <button class="returnToStart">Return</button>

        
        `
        let cheeses = document.querySelectorAll(".cheese")
        document.querySelector(".navigationContentWrapper").innerHTML = html;
        let select = document.querySelector("#cheeseSelector")
        document.querySelectorAll(".returnToStart")[0].addEventListener("click", () => {
            let html = `
                <h1 class="navigationContentHeading">Update, Add or Delete Cheese</h1>
        
                <button class="updateBtn">Update</button>
                <button class="addBtn">Add</button>
                <button class="deleteBtn">Delete</button>
                `;
            document.querySelector(".navigationContentWrapper").innerHTML = html;
            navigationContent();
        })
        
        cheeses.forEach(cheese => {
            let clone = optionTemplate.content.cloneNode(true);
            
            clone.querySelector("option").value = cheese.dataset.id;
            clone.querySelector("option").innerText = cheese.querySelector(".cheeseHeading").innerText
            
            select.appendChild(clone)
        });
        
        select.addEventListener("change", unfoldDelete)
    }



    function addCheese() {
        let html = `
        <form class="addForm">
            <input name="name" class="addName" type="text">
            <div class="addRow">
                <input name="price" class="addPrice" type="decimal">
                <input name="weight" class="addWeight" type="number">
            </div>
            <div class="addRow">
                <input name="strength" class="addStrength" type="text">
                <input name="brand" class="addBrand" type="text">
            </div>
            <input name="img" class="addImg" type="text">


            <button type="submit">Add cheese</button>
            <button class="returnToStart">Return</button>
        </form>
        `
        document.querySelector(".navigationContentWrapper").innerHTML = html;
        let form = document.querySelector(".addForm"); 
        
        
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
        
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            fetch(baseURL, {
                body: JSON.stringify({
                    name: e.target.name.value,
                    price: e.target.price.value,
                    weight: e.target.weight.value,
                    strength: e.target.strength.value,
                    brand: e.target.brand.value,
                    img: e.target.img.value
                }),
                method: "POST",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Authorization': "Bearer " + "HEJMEDDIG"
                }
            })
            .then(res => {
                if(res.status = 201) {
                    alert("Cheese has been added succesfully")
                    return;
                } else {
                    alert("Something went wrong");
                    return;
                }
            })
        })


    }
}

export default navigationContent;