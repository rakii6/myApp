import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL: "https://marketplace-42069-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const messageInDb = ref(database, "messageItems")
const buttonEl = document.getElementById("button-el")
const inputMessage = document.getElementById("message-el")
const fromEl = document.getElementById("sender-el")
const toEl = document.getElementById("receiver-el")
const cardsEl = document.getElementById("cards")


onValue(messageInDb, function(snapshot){

    let flag = snapshot.exists()
    if (flag){

      let data = Object.values(snapshot.val()).reverse()
      clearListData()//remember this shit
      for(let i =0; i<data.length; i++){
        let currentObj = data[i]
            appendInfoToMessageCards(currentObj)
        }}
    else{
      cardsEl.innerHTML =""
    }}) 


buttonEl.addEventListener("click", function(){
  let senderText = inputMessage.value
  let senderName = fromEl.value
  let receiverName= toEl.value

   if(senderText && senderName && receiverName){
    let messageObject = {
      message : senderText,
      sender : senderName,
      reciever : receiverName
  }

  push(messageInDb, messageObject)
  clearInput()
   }

   else{
    console.log("Hi")
   }})

function clearListData(){
  cardsEl.innerHTML=""
}
function clearInput(){
    inputMessage.value = ""
    fromEl.value = ""
    toEl.value = ""
}

function createCard(senderInfo, receiverInfo, messageData){
  const cardContainer = document.createElement("li")
  cardContainer.id = "card-count"

  const cardBody = document.createElement("ul")
  cardBody.classList.add("card-body")
  
  const receiverTitle = document.createElement("li")
  receiverTitle.classList.add("card-title1")
  receiverTitle.textContent = `To ${receiverInfo}`
  cardBody.appendChild(receiverTitle)

  const messageContent= document.createElement("li")
  messageContent.classList.add("card-info")
  messageContent.textContent=`${messageData}`
  cardBody.appendChild(messageContent)

  const senderTitle = document.createElement("li")
  senderTitle.classList.add("card-title2","like")
  senderTitle.textContent = `From ${senderInfo}`
  cardBody.appendChild(senderTitle)

  const likeButton = document.createElement("button")
  likeButton.id = "like-button";
  likeButton.addEventListener("click",
  function(){
    increaseLikeCount(cardContainer)
  })
  
  const likeButtonImage = document.createElement("img")
  likeButtonImage.src ="asset/like.png"
  likeButton.appendChild(likeButtonImage)
  
  const likeCount = document.createElement("span")
  likeCount.id = "like-count"
  likeCount.textContent = "0"

  senderTitle.appendChild(likeButton)
  senderTitle.appendChild(likeCount)
  cardBody.appendChild(senderTitle)
  cardContainer.appendChild(cardBody)
  return cardContainer
}

function increaseLikeCount(cardContainer){
  const likeCountEl = cardContainer.querySelector("#like-count")
  if(likeCountEl){
    let currentCount = parseInt(likeCountEl.textContent, 10)
    likeCountEl.textContent = (currentCount+1).toString()}}

function appendInfoToMessageCards(dataFrmOnVal){
    let senderInfo, receiverInfo, messageInfo
    senderInfo = dataFrmOnVal.sender
    receiverInfo = dataFrmOnVal.reciever
    messageInfo = dataFrmOnVal.message
    const myCard = createCard(senderInfo, receiverInfo, messageInfo)
    cardsEl.appendChild(myCard)
 }


