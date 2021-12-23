window.addEventListener("load", initSite);

function initSite() {
  viewHoroscope();
}


let readDate = document.getElementById("input");
const findBtn = document.getElementById("findBtn");
findBtn.addEventListener("click", findHoroscope);
const deleteBtn = document.getElementById("deleteBtn");
deleteBtn.addEventListener("click", deleteHoroscope);
const updateBtn = document.getElementById("updateBtn");
updateBtn.addEventListener("click", updateHoroscope);




async function viewHoroscope() {
  let url = "./API/viewHoroscope.php";
  let method = "GET";
  let result = await makeRequest(url, method, undefined);
  console.log(result);

  let text = document.getElementById("text");
  text.innerHTML = result;

  if (result === false) {
    let text = document.getElementById("text");
    text.innerHTML = "Select a date...";
  }
}



async function findHoroscope() {
  let dateObject = new Date(readDate.value);

  let date = {
    month: dateObject.getMonth(readDate) + 1,
    day: dateObject.getDate(readDate),
  };

  let stringDate = JSON.stringify(date);
  console.log(stringDate);

  let body = new FormData();
  body.set("date", JSON.stringify(date));
  let result = await makeRequest("./API/addHoroscope.php", "POST", body);
  console.log(result);

  let text = document.getElementById("text");
  text.innerHTML = result;
  if (result === undefined) {
    let text = document.getElementById("text");
    text.innerHTML = "";
    location.reload()
  }
}



async function deleteHoroscope() {
  let result = await makeRequest("./API/deleteHoroscope.php", "DELETE");

  console.log(result);
  if (result === true) {
    document.getElementById("text").innerText = "Zodiac was deleted!";
    window.setTimeout(function () {
      location.reload();
    }, 3000);
  }
}



async function updateHoroscope() {
  let dateObject = new Date(readDate.value);

  let date = {
    month: dateObject.getMonth(readDate) + 1,
    day: dateObject.getDate(readDate),
  };

  let body = new FormData();
  body.set("date", JSON.stringify(date));

  let result = await makeRequest("./API/updateHoroscope.php", "POST", body);
  document.getElementById("text").innerText = result;
  
  console.log(result);

  let stringDate = JSON.stringify(date);

  console.log(stringDate);

  await viewHoroscope();

  return result;
}

function errrorMsg(){

}

async function makeRequest(url, method, formData) {
  try {
    let response = await fetch(url, {
      method: method,
      body: formData,
    });
    console.log(response);
    let result = await response.json();
    return result;
  } catch {
    (err) => {
      console.log("Error : ", err);
    };
  }
}
