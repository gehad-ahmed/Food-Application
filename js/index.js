if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
  
  window.open('index.html',"_self")
}


// LOADING

$(document).ready(function(){
  $("#loading").fadeOut(1000);
  $("body").css({overflow:"auto"})
})


// FETCH HOME DATA

let arrData = [];

async function dataFunc() {
  try {
    let data = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?s="
    );
    let reponse = await data.json();
    
      arrData = reponse.meals;
      displayData();
    
  } catch (error) {
    //   document.getElementById("demo").innerHTML = `
    //       <div class="myError">
    //              <div class="error text-center">
    //                  <div class="alert alert-danger">
    //                      <h1>${error}</h1>
    //                  </div>
    //              </div>
    //          </div>
    //       `;
  }
}

dataFunc();

function displayData() {
  let empty = "";

  for (let i = 0; i < arrData.length; i++) {
    empty += `
   <div class="col-md-3">
                           <div class="content rounded-3 position-relative" onclick=displayDetailsFunc(${i},'index') >                  
                               <img src="${arrData[i].strMealThumb}" class="w-100 rounded-3" alt="">


                               <div class="layer  rounded-3  d-flex justify-content-center align-items-center">
                                    <h5>${arrData[i].strMeal}</h5>
                               </div>
                           </div>
                            
                 </div>
                 
 
    `;
  }
  document.querySelector(".home .row").innerHTML = empty;
}



// CLOSE AND OPEN NAVBAR
document.documentElement.style.setProperty("--animate-duration", "2s");

$(".close-icon").click(function () {
  let navWidth = $(".navbar-section .nav").outerWidth();
  let navSection = $(".navbar-section").offset().left;

  if (navSection == 0) {
    $(".navbar-section").css({ left: `-${navWidth}px`, transition: "left 1s" });
    $("#xmarkIcon").css({ display: "none" });
    $("#barsIcon").css({ display: "block" });
    $(".navbar-section .nav ul li a").slideUp(500);
  } else {
    $(".navbar-section").css({ left: `0px`, transition: "left 1s" });
    $("#xmarkIcon").css({ display: "block" });
    $("#barsIcon").css({ display: "none" });
    $(".navbar-section .nav ul li a").slideDown(1000);
  }
});

// ASYNC FUNCTION FOR FETCH CATEGORY DATA
let catArr = [];
async function categoryFunc() {
  try {
    let catData = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    let response = await catData.json();

    catArr = response.categories;
    displayCat();
  } catch (error) {
    // document.getElementById("demo").innerHTML = `
    //     <div class="myError">
    //            <div class="error text-center">
    //                <div class="alert alert-danger">
    //                    <h1>${error}</h1>
    //                </div>
    //            </div>
    //        </div>
    //     `;
  }
}
categoryFunc();

function displayCat() {
  let empty = "";
  for (let i = 0; i < catArr.length; i++) {
    empty += `
                <div class="col-md-4 col-lg-3">
                       <div class="content rounded-3 position-relative" onclick=displayCatFunc(${i})>    
                           <img src="${catArr[i].strCategoryThumb}" class="w-100 " alt="">

                           <div class="layer rounded-3 text-center pt-3">
                         
                              <h5>${catArr[i].strCategory}</h5>
                              <p class="lh-lg">${catArr[i].strCategoryDescription}</p>
                            
                           </div>
                      </div>
                            
                 </div>
    `;
  }
  document.querySelector(".cat .row").innerHTML = empty;
}

let catClass = document.querySelector(".navbar-section .nav .cat");

if (catClass) {
  catClass.addEventListener("click", function () {
    location.href = "../category.html";
    displayCat();
  });
}

// ASYNC FUNCTION FOR FETCH AREA DATA

let areaArr = [];
async function areaFunc() {
  try {
    let data = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
    );
    let response = await data.json();

    areaArr = response.meals;
    displayArea();
  } catch (error) {
    // document.getElementById("demo").innerHTML = `
    //     <div class="myError">
    //            <div class="error text-center">
    //                <div class="alert alert-danger">
    //                    <h1>${error}</h1>
    //                </div>
    //            </div>
    //        </div>
    //     `;
  }
}

areaFunc();

function displayArea() {
  let empty = "";
  
  for (let i = 0; i < areaArr.length; i++) {
    empty += `
     <div class="col-md-4 col-lg-3">
                       <div class="content text-center text-white" onclick=displayAreaFunc(${i})>    
                          <i class="fa-solid fa-house-laptop mb-3"></i>
                              <h5>${areaArr[i].strArea}</h5>
              
                      </div>
                            
                 </div>
    `;
  }
  document.querySelector(".area .row").innerHTML = empty;
}

let areaClass = document.querySelector(".navbar-section .nav .area");

if (areaClass) {
  areaClass.addEventListener("click", function () {
    location.href = "../area.html";
    displayArea();
  });
}

// ASYNC FUNCTION FOR FETCH INGREDIENTS DATA

let ingredientsArr = [];
async function ingredientsFunc() {
  try {
    let data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    );
    let response = await data.json();

    ingredientsArr = response.meals;
    displayingredients();
  } catch (error) {
    // document.getElementById("demo").innerHTML = `
    //     <div class="myError">
    //            <div class="error text-center">
    //                <div class="alert alert-danger">
    //                    <h1>${error}</h1>
    //                </div>
    //            </div>
    //        </div>
    //     `;
  }
}

ingredientsFunc();

function displayingredients() {
  ingredientsArr = ingredientsArr.filter((li) => li.strDescription);
  let empty = "";
  for (let i = 0; i < ingredientsArr.length; i++) {
    empty += `
        <div onclick="displayIngredFunc(${i})" class="col-md-4 col-lg-3">
                    <div class="content text-center text-white" >    
                      <i class="fa-solid fa-drumstick-bite mb-3"></i>
                          <h5>${ingredientsArr[i].strIngredient}</h5>
                          <p id="myText">${ingredientsArr[i].strDescription.slice(0, 150)}</p>
        </div>
                        
      </div>
      `;

    document.querySelector(".ingredients .row").innerHTML = empty;
  }
}

let ingredientsClass = document.querySelector(
  ".navbar-section .nav .ingredients"
);

if (ingredientsClass) {
  ingredientsClass.addEventListener("click", function () {
    location.href = "../ingredients.html";
    displayingredients();
  });
}

// FILTER DATA BY MAIN INGREDIENT

let filterArrIngred = [];
async function filterIngredFunc() {
  try {
    const queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);  //get data after ?
    let ingredientStr = urlParams.get("ingredient");
    let data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientStr}`
    );
    let response = await data.json();
    filterArrIngred = response.meals;
    if (filterArrIngred.length >20) {
      
      filterArrIngred.length = 20
    }
    let htmlContent = ""
    for (let i = 0; i < filterArrIngred.length; i++) {

      htmlContent += `
      <div class="col-md-4 col-lg-3">
      <div class="content rounded-3 position-relative" onclick=displayDetailsFunc(${i},'ingredients')>
        <img class="w-100 " src="${filterArrIngred[i].strMealThumb}">
          <div class="layer rounded-3 text-center pt-3">
            <h5>${filterArrIngred[i].strMeal}</h5>
        </div>
        </div>
        </div>

      `;
    }
   document.querySelector(".filterIngred .row").innerHTML=htmlContent
  
  } catch (error) {
    // document.getElementById("demo").innerHTML = `
    //     <div class="myError">
    //            <div class="error text-center">
    //                <div class="alert alert-danger">
    //                    <h1>${error}</h1>
    //                </div>
    //            </div>
    //        </div>
    //     `;
  }
}

filterIngredFunc();

 function displayIngredFunc(identifier) {
 
  const ingredient = ingredientsArr[identifier];
  
  window.open(`filter-by-Ingredients.html?ingredient=${ingredient.strIngredient}`,"_self");

}

// FILTER DATA BY CATEGORY

let filterArrArea = [];
async function filterAreaFunc() {
  try {
    const queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);  //get data after ?
    let ingredientStr = urlParams.get("area");
    let data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${ingredientStr}`
    );
    let response = await data.json();
    filterArrArea = response.meals;
    if (filterArrArea.length >20) {
      
      filterArrArea.length = 20
    }
    let empty = "";
  for (let i = 0; i < filterArrArea.length; i++) {
    empty += `
     <div class="col-md-4 col-lg-3">
                        <div class="content rounded-3 position-relative" onclick=displayDetailsFunc(${i},'area')>    
                           <img src="${filterArrArea[i].strMealThumb}" class="w-100 " alt="">

                           <div class="layer rounded-3 text-center pt-3">
                         
                              <h5>${filterArrArea[i].strMeal}</h5>
                             
                            
                           </div>
                      </div>
                            
                 </div>
    `;
  }
  document.querySelector(".filterArea .row").innerHTML = empty;
  } catch (error) {
    // document.getElementById("demo").innerHTML = `
    //     <div class="myError">
    //            <div class="error text-center">
    //                <div class="alert alert-danger">
    //                    <h1>${error}</h1>
    //                </div>
    //            </div>
    //        </div>
    //     `;
  }
}

filterAreaFunc();

function displayAreaFunc(identifier) {
  
  const area=areaArr[identifier] ;

  
  window.open(`filter-by-area.html?area=${area.strArea}`,"_self");
}

// FILTER DATA BY AREA

let filterArrCat = [];
async function filterCatFunc() {
  try {
    const queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);  //get data after ?
    let ingredientStr = urlParams.get("category");
    let data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${ingredientStr}`
    );
    let response = await data.json();

    filterArrCat = response.meals;
    if (filterArrCat.length >20) {
      
      filterArrCat.length = 20
    }
    let empty = "";
  for (let i = 0; i < filterArrCat.length; i++) {
    empty += `
     <div class="col-md-4 col-lg-3">
                        <div class="content rounded-3 position-relative" onclick=displayDetailsFunc(${i},"category")>    
                           <img src="${filterArrCat[i].strMealThumb}" class="w-100 " alt="">

                           <div class="layer rounded-3 text-center pt-3">
                         
                              <h5>${filterArrCat[i].strMeal}</h5>
                             
                            
                           </div>
                      </div>
                            
                 </div>
    `;
  }
  document.querySelector(".filterCat .row").innerHTML = empty;
  } catch (error) {
    // document.getElementById("demo").innerHTML = `
    //     <div class="myError">
    //            <div class="error text-center">
    //                <div class="alert alert-danger">
    //                    <h1>${error}</h1>
    //                </div>
    //            </div>
    //        </div>
    //     `;
  }
}

filterCatFunc();

function displayCatFunc(identifier) {
  let cat=catArr[identifier];
  console.log(cat);
  window.open(`filter-by-category.html?category=${cat.strCategory}`,"_self");

}


let contactClass = document.querySelector(
  ".navbar-section .nav .contact"
);

  contactClass.addEventListener("click", function () {
    location.href = "../contact-us.html";
   
  });



let searchClass = document.querySelector(
  ".navbar-section .nav .search"
);


  searchClass.addEventListener("click", function () {
    location.href = "../search.html";
  
  });





// CONTACT US REJEX

let nameInput=document.getElementById("nameInput");
let emailInput=document.getElementById("emailInput");
let phoneInput=document.getElementById("phoneInput");
let ageInput=document.getElementById("ageInput");
let passwordInput=document.getElementById("passwordInput");
let rePasswordInput=document.getElementById("rePasswordInput");
let nameMsg=document.getElementById("nameMsg")
let emailMsg= document.getElementById("emailMsg")
let passMsg=document.getElementById("passMsg")
let PhoneMsg=document.getElementById("PhoneMsg")
let repassMsg=document.getElementById("repassMsg")
let submitBtn=document.getElementById("submitBtn")
let nameStatus = false
let emailStatus = false
let passStatus = false
let repassStatus = false
let phoneStatus = false




// NAME REGEX

if(nameInput){
  let nameFunc= nameInput.addEventListener("input",function(){
  
    let  regexName=/^[a-z]{3,}[0-9_]{0,3}$/i;
    if(regexName.test(nameInput.value)==false){
      nameMsg.classList.remove("d-none")
      nameMsg.classList.add("d-block")
      
      nameStatus = false
     }
     else{
      nameMsg.classList.remove("d-block")
      nameMsg.classList.add("d-none")
   
      nameStatus = true
     }
     validation()
     
  })  
}



// PHONE REGEX
if(phoneInput){
  let phoneFunc= phoneInput.addEventListener("input",function(){
 
    let regexPhone=/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/
    if(regexPhone.test(phoneInput.value)==false){
      PhoneMsg.classList.remove("d-none")
      PhoneMsg.classList.add("d-block")
      
      phoneStatus = false
     }
     else{
      PhoneMsg.classList.remove("d-block")
      PhoneMsg.classList.add("d-none")
      
      phoneStatus = true
     }
     validation()
     
  })  
}


// EMAIL REGEX
if(emailInput){
  let emailFunc= emailInput.addEventListener("input",function(){
  
    let regexEmail=/^[a-z]{3,}[!@#\$%\^\&*\)\(+=._-]{1,5}[a-z]{3,}(@gmail)(\.com|\.org)$/i;
    if(regexEmail.test(emailInput.value)==false){
      emailMsg.classList.remove("d-none")
      emailMsg.classList.add("d-block")
      
      emailStatus = false
     }
     else{
      emailMsg.classList.remove("d-block")
      emailMsg.classList.add("d-none")
      
      emailStatus = true
     }
     validation()
     
  })  
  
}


// PASSWORD REGEX 
if(passwordInput){
  let passFunc= passwordInput.addEventListener("input",function(){
  
    let  regexPass=/^[a-zA-Z0-9!@#$%^&*]{6,16}$/ ;
     
    if(regexPass.test(passwordInput.value)==false){
      passMsg.classList.remove("d-none")
      passMsg.classList.add("d-block")
       
       passStatus = false
     }
    
     else{
      passMsg.classList.remove("d-block")
      passMsg.classList.add("d-none")
      
      passStatus = true
     }
     validation()
    
  })  
}


if(rePasswordInput){
  let repassFunc= rePasswordInput.addEventListener("input",function(){
 
    if(rePasswordInput.value!==passwordInput.value){
      repassMsg.classList.replace("d-none","d-block")
      
      repassStatus = false
    }
    else {
      repassMsg.classList.replace("d-block","d-none")
  repassStatus = true
    }
    validation()
   
  })
}




function validation(){
  
  console.log(nameStatus)

  if(nameStatus==true && emailStatus==true && passStatus==true && repassStatus==true && phoneStatus==true){
      submitBtn.classList.replace("disabled","enabled")
  }
  else{
    submitBtn.classList.replace("enabled","disabled")
  }
}






if(nameInput && nameInput.value==""){

  nameMsg.classList.add("d-none");
  nameMsg.classList.remove("d-block");
 }
 if(passwordInput && passwordInput.value==""){

  passMsg.classList.add("d-none");
  passMsg.classList.remove("d-block");
 }
  if(phoneInput && phoneInput.value==""){

  PhoneMsg.classList.add("d-none");
  PhoneMsg.classList.remove("d-block");
 }
 if(emailInput && emailInput.value==""){

  emailMsg.classList.add("d-none");
  emailMsg.classList.remove("d-block");
 }



//  SEARCH SECTION 

let searchArr = [];
let searchName=document.getElementById("searchName")
if (searchName) {
  
  searchName.addEventListener("input",function(){
    if (this.value.length == 0) {
      
      searchArr = []
      displaySearch();
    }
    else{
      searchFunc()
  
    }
  })
}
async function searchFunc() {
  try {
    let data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchName.value}`
    );
    let response = await data.json();
    searchArr = response.meals;

    displaySearch();
  } catch (error) {
    // document.getElementById("demo").innerHTML = `
    //     <div class="myError">
    //            <div class="error text-center">
    //                <div class="alert alert-danger">
    //                    <h1>${error}</h1>
    //                </div>
    //            </div>
    //        </div>
    //     `;
  }
}
// searchFunc();



let searchByLetter=document.getElementById("searchByLetter")

if (document.getElementById('searchByLetter')) {
  
  document.getElementById('searchByLetter').addEventListener('keypress', function(event) {
    if (this.value.length >= 1 && event.key !== 'Backspace' && event.key !== 'Delete') {
        event.preventDefault(); // يمنع الافتراضي من الحدوث
        searchFuncByLetter()
      }

      

});
searchByLetter.addEventListener("input" , function (event) {

  if (this.value == "") {
    searchArr = []
    displaySearch();
  }
})
}



async function searchFuncByLetter() {
  try {
    let data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchByLetter.value.slice(0,1)}`
    );
    let response = await data.json();
    searchArr = response.meals;

    displaySearch();
  } catch (error) {
    // document.getElementById("demo").innerHTML = `
    //     <div class="myError">
    //            <div class="error text-center">
    //                <div class="alert alert-danger">
    //                    <h1>${error}</h1>
    //                </div>
    //            </div>
    //        </div>
    //     `;
  }
}
// searchFuncByLetter();





function displaySearch() {
  let empty = "";  
    for (let i = 0; i < searchArr.length; i++) {
      empty += `
                  <div class="col-md-4 col-lg-3">
                         <div class="content rounded-3 position-relative mb-3" onclick=displayDetailsFunc(${i},"search")>    
                             <img src="${searchArr[i].strMealThumb}" class="w-100 " alt="">
  
                             <div class="layer rounded-3 text-center pt-3">
                           
                                <h5>${searchArr[i].strMeal}</h5>
                              
                             </div>
                        </div>
                              
                   </div>
      `;
    }
  document.querySelector(".form .form-content .row").innerHTML = empty;
}





// FINALLY FETCH PRODUCT DETAILS DATA BY ID 

let detailsProductArr = [];
async function filterDetailsProductFunc() {
  try {
    const queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);  //get data after ?
    let ingredientStr = urlParams.get("details");
    let data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ingredientStr}`
    );
    let response = await data.json();
console.log(response)
    detailsProductArr = response.meals;
   
    let empty = "";
  for (let i = 0; i < detailsProductArr.length; i++) {
    empty += `
      <div class="col-md-4">
                    <div class="content">
                        <img src="${detailsProductArr[i].strMealThumb}" alt="" class="w-100">
                        <h2 class="text-white">${detailsProductArr[i].strMeal}</h2>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="content">
                        <div class="title text-white">
                            <h2>Instructions</h2>
                            <p>${detailsProductArr[i].strInstructions}</p>
                        </div>
                        <ul class="list-unstyled details">
                            <li class="text-white">Area : <span>${detailsProductArr[i].strArea}</span> </li>
                            <li class="text-white">Category : <span>${detailsProductArr[i].strCategory}</span> </li>
                            <li class="text-white">Recipes :
                                <ul class="list-unstyled recipes d-flex flex-wrap">
                                ${detailsProductArr[i].strMeasure1 && detailsProductArr[i].strIngredient1 ? `<li>${detailsProductArr[i].strMeasure1} ${detailsProductArr[i].strIngredient1}</li>` : ''}
                                ${detailsProductArr[i].strMeasure2 && detailsProductArr[i].strIngredient2 ? `<li>${detailsProductArr[i].strMeasure2} ${detailsProductArr[i].strIngredient2}</li>` : ''}
                                ${detailsProductArr[i].strMeasure3 && detailsProductArr[i].strIngredient3 ? `<li>${detailsProductArr[i].strMeasure3} ${detailsProductArr[i].strIngredient3}</li>` : ''}
                                ${detailsProductArr[i].strMeasure4 && detailsProductArr[i].strIngredient4 ? `<li>${detailsProductArr[i].strMeasure4} ${detailsProductArr[i].strIngredient4}</li>` : ''}
                                ${detailsProductArr[i].strMeasure5 && detailsProductArr[i].strIngredient5 ? `<li>${detailsProductArr[i].strMeasure5} ${detailsProductArr[i].strIngredient5}</li>` : ''}
                                ${detailsProductArr[i].strMeasure6 && detailsProductArr[i].strIngredient6 ? `<li>${detailsProductArr[i].strMeasure6} ${detailsProductArr[i].strIngredient6}</li>` : ''}
                                ${detailsProductArr[i].strMeasure7 && detailsProductArr[i].strIngredient7 ? `<li>${detailsProductArr[i].strMeasure7} ${detailsProductArr[i].strIngredient7}</li>` : ''}
                                ${detailsProductArr[i].strMeasure8 && detailsProductArr[i].strIngredient8 ? `<li>${detailsProductArr[i].strMeasure8} ${detailsProductArr[i].strIngredient8}</li>` : ''}
                                ${detailsProductArr[i].strMeasure9 && detailsProductArr[i].strIngredient9 ? `<li>${detailsProductArr[i].strMeasure9} ${detailsProductArr[i].strIngredient9}</li>` : ''}
                                ${detailsProductArr[i].strMeasure10 && detailsProductArr[i].strIngredient10 ? `<li>${detailsProductArr[i].strMeasure10} ${detailsProductArr[i].strIngredient10}</li>` : ''}
                                ${detailsProductArr[i].strMeasure11 && detailsProductArr[i].strIngredient11 ? `<li>${detailsProductArr[i].strMeasure11} ${detailsProductArr[i].strIngredient11}</li>` : ''}
                                ${detailsProductArr[i].strMeasure12 && detailsProductArr[i].strIngredient12 ? `<li>${detailsProductArr[i].strMeasure12} ${detailsProductArr[i].strIngredient12}</li>` : ''}
                                ${detailsProductArr[i].strMeasure13 && detailsProductArr[i].strIngredient13 ? `<li>${detailsProductArr[i].strMeasure13} ${detailsProductArr[i].strIngredient13}</li>` : ''}
                                ${detailsProductArr[i].strMeasure14 && detailsProductArr[i].strIngredient14 ? `<li>${detailsProductArr[i].strMeasure14} ${detailsProductArr[i].strIngredient14}</li>` : ''}
                                ${detailsProductArr[i].strMeasure15 && detailsProductArr[i].strIngredient15 ? `<li>${detailsProductArr[i].strMeasure15} ${detailsProductArr[i].strIngredient15}</li>` : ''}
                                ${detailsProductArr[i].strMeasure16 && detailsProductArr[i].strIngredient16 ? `<li>${detailsProductArr[i].strMeasure16} ${detailsProductArr[i].strIngredient16}</li>` : ''}
                                ${detailsProductArr[i].strMeasure17 && detailsProductArr[i].strIngredient17 ? `<li>${detailsProductArr[i].strMeasure17} ${detailsProductArr[i].strIngredient17}</li>` : ''}
                                ${detailsProductArr[i].strMeasure18 && detailsProductArr[i].strIngredient18 ? `<li>${detailsProductArr[i].strMeasure18} ${detailsProductArr[i].strIngredient18}</li>` : ''}
                                ${detailsProductArr[i].strMeasure19 && detailsProductArr[i].strIngredient19 ? `<li>${detailsProductArr[i].strMeasure19} ${detailsProductArr[i].strIngredient19}</li>` : ''}
                                ${detailsProductArr[i].strMeasure20 && detailsProductArr[i].strIngredient20 ? `<li>${detailsProductArr[i].strMeasure20} ${detailsProductArr[i].strIngredient20}</li>` : ''}
                                
                                </ul>
                                
                                
                                </li>
                                <li class="text-white tags">Tags : ${detailsProductArr[i].strTags ? `<span class="d-block">${detailsProductArr[i].strTags}</span>` : ''}

                        </ul>
                         <div class="product-form">
                             <button onclick="sourceBtn()" class="source">Source</button>
                            <button class="youtube" onclick="youtubeBtn()">Youtube</button>
                          </div>
                            
                         
                    </div>
                </div>
    `;
  }
  document.querySelector(".product-details .row").innerHTML = empty;
  } catch (error) {
    // document.getElementById("demo").innerHTML = `
    //     <div class="myError">
    //            <div class="error text-center">
    //                <div class="alert alert-danger">
    //                    <h1>${error}</h1>
    //                </div>
    //            </div>
    //        </div>
    //     `;
  }
}
function sourceBtn() {
  if (detailsProductArr[0].strSource) {
    window.open(detailsProductArr[0].strSource)
  }

}


function youtubeBtn(){
  if (detailsProductArr[0].strYoutube) {
      window.open(detailsProductArr[0].strYoutube)
  }
  else {
    window.open("index.html","_blank")

  }
}





filterDetailsProductFunc();

function displayDetailsFunc(identifier,page) {
  let details;
  if (page == 'index') {
    details=arrData[identifier];
  }
  else if(page=="category"){
    details=filterArrCat[identifier];

  }
  else if(page=="area"){
    details=filterArrArea[identifier];

  }
  else if(page=="ingredients"){
    details=filterArrIngred[identifier];

  }
  else if(page=="search"){
    details=searchArr[identifier];

  }
  window.open(`productDetails.html?details=${details.idMeal}`,"_self");

}








