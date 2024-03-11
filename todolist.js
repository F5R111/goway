/*2 */import { initializeApp } from "https:///www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
/*4*/ import { getDatabase, onValue, push, ref, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
/*1*/const appsetting={
    databaseURL:"https://realtimd-d1062-default-rtdb.europe-west1.firebasedatabase.app/"
}
/*3*/const app=initializeApp(appsetting)
/*5*/const database=getDatabase(app)
/*6*/const shoppingListInDB=ref(database,"shoppinglist")

/**************************************************/

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    push(shoppingListInDB, inputValue) 
   
    clearInputFieldEl()
   
})
/********************************************** */
onValue(shoppingListInDB,function(snapshot){
    if(snapshot.exists()){
        let itemsArray=Object.entries(snapshot.val())
   clearShoppingListEl()
    for(let i=0;i<itemsArray.length;i++){
        let currentitem=itemsArray[i]
        let currentItemID=currentitem[0]
        let currentItemValue =currentitem[1]
        appendItemToShoppingListEl(currentitem)

    }
    }else{shoppingListEl.innerHTML="no itemhere..."}

})

/************************************************** */


function clearShoppingListEl(){
shoppingListEl.innerHTML=""
}
function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item) {
    let itemId=item[0]
    let itemValue=item[1]

    //shoppingListEl.innerHTML += `<li>${item}</li>`
    let newEl=document.createElement("li")
    newEl.textContent=itemValue
    newEl.addEventListener("click",function(){
        let exactLocationOfItemInDB=ref(database,`shoppinglist/${itemId}`)
        remove(exactLocationOfItemInDB)
    })
    shoppingListEl.append(newEl)
}



