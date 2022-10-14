const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('#menu');
const close_btn = document.querySelector('.close-btn');
const porfolio_div = document.querySelector('#porfolio');
const menu_items = document.querySelectorAll('.menu-item');
const pop_container = document.querySelector('.pop-container');
const contact_form = document.querySelector('#contact_form');
const email_error_msg = document.querySelector('#email_error_msg');


const name_el = document.querySelector('#name_el');
const email_el = document.querySelector('#email_el');
const message_el = document.querySelector('#message_el');



hamburger.addEventListener('click',()=>{
menu.style.display='flex';
});

close_btn.addEventListener('click',()=>{
    menu.style.display='none';
});

for(let menu_item of menu_items){
    menu_item.addEventListener('click',()=>{
        menu.style.display='none';
    });
}

const getBtnId=(index)=>'btn-'+index;

//list of projects in object
const projects=[
    {
    name:"Facebook 360",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    featured_image:"images/snapshort_project1.png",
    link_to_live:"https://abdallahmalima.github.io/portfolio_mobile_first/",
    link_to_source:"https://github.com/abdallahmalima/portfolio_mobile_first",
    technologies:["CANOPY","Back","2015"],
    languages:["html","css","javascript","github","ruby","bootstrap"],
   },
   {
    name:"Uber Navigation",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    featured_image:"images/snapshort_project2.png",
    link_to_live:"https://abdallahmalima.github.io/portfolio_mobile_first/",
    link_to_source:"https://github.com/abdallahmalima/portfolio_mobile_first",
    technologies:["CANOPY","Back","2015"],
    languages:["html","css","javascript","github","ruby","bootstrap"],
   },
   {
    name:"Multi-Post Stories",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    featured_image:"images/snapshort_project4.png",
    link_to_live:"https://abdallahmalima.github.io/portfolio_mobile_first/",
    link_to_source:"https://github.com/abdallahmalima/portfolio_mobile_first",
    technologies:["CANOPY","Back","2015"],
    languages:["html","css","javascript","github","ruby","bootstrap"],
   },
   {
    name:"Tonic",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    featured_image:"images/snapshort_project5.png",
    link_to_live:"https://abdallahmalima.github.io/portfolio_mobile_first/",
    link_to_source:"https://github.com/abdallahmalima/portfolio_mobile_first",
    technologies:["CANOPY","Back","2015"],
    languages:["html","css","javascript","github","ruby","bootstrap"],
   }

]

const cards = projects.map((project,index) => {
 //build HTML string for technologies   
 const technologies= project.technologies.map((technology)=>(
`<li>${technology}</li>`
 )).join("");  

 //build HTML string for languages 
 const languages= project.languages.slice(0, 3).map((language,index)=>(
    `<li>${language}</li>`
     )).join(""); 

     //build and return HTML string for the whole project card 
 return `
    <div class="card ${(index+1)%2==0?'rv':''}">
    <img src="${project.featured_image}" alt="portfolio project" width="295"
     height="220">
     <div class="card-text">
     <h1 class="header-title">${project.name}</h1>
     <ul class="tonic-items">
        ${technologies}
     </ul>
     <p class="sub-title">${project.description.substring(0,83)}</p>
     <ul class="social-links languages">
        ${languages}
     </ul>
     <button id="${getBtnId(index)}" onclick="showPopMenu(${index})" class="p-btn"><span>See Project</span></button>
    </div>
    </div>
    `
}).join("");

let cardLg=(project)=>{
    
    
    const technologies= project.technologies.map((technology)=>(
        `<li>${technology}</li>`
         )).join("");  
        
         //build HTML string for languages 
         const languages= project.languages.map((language,index)=>(
            `<li>${language}</li>`
             )).join(""); 

    return `
    <div class="card-popup popup">
            <div class="card-text">
                <div class="header-title-popup-div">
                    <h3 class="header-title-popup">${project.name}</h3>
                    <svg class="popup-cancel" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.2929 13.2929C13.6834 12.9024 14.3166 12.9024 14.7071 13.2929L20 18.5858L25.2929 13.2929C25.6834 12.9024 26.3166 12.9024 26.7071 13.2929C27.0976 13.6834 27.0976 14.3166 26.7071 14.7071L21.4142 20L26.7071 25.2929C27.0976 25.6834 27.0976 26.3166 26.7071 26.7071C26.3166 27.0976 25.6834 27.0976 25.2929 26.7071L20 21.4142L14.7071 26.7071C14.3166 27.0976 13.6834 27.0976 13.2929 26.7071C12.9024 26.3166 12.9024 25.6834 13.2929 25.2929L18.5858 20L13.2929 14.7071C12.9024 14.3166 12.9024 13.6834 13.2929 13.2929Z" fill="#67798E"/>
                    </svg>                        
                </div>
               
                <ul class="tonic-items">
                ${technologies}
                </ul>
                <img class="img-popup" src="${project.featured_image}" alt="portfolio project" width="1108"
                height="586">
            <div class="project-details">
             <p class="sub-title-popup">${project.description}</p>
             <div class="project-details-tech">
             <ul class="social-links languages">
             ${languages}
             </ul>
            <div class="btn-group">
                <button  onclick="openPage('${project.link_to_live}')" class="p-btn">
                    <span>See live</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5 12C5 8.13401 8.13401 5 12 5C12.5523 5 13 4.55228 13 4C13 3.44772 12.5523 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 11.4477 20.5523 11 20 11C19.4477 11 19 11.4477 19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12ZM16 3C15.4477 3 15 3.44772 15 4C15 4.55228 15.4477 5 16 5H17.5858L11.2929 11.2929C10.9024 11.6834 10.9024 12.3166 11.2929 12.7071C11.6834 13.0976 12.3166 13.0976 12.7071 12.7071L19 6.41421V8C19 8.55228 19.4477 9 20 9C20.5523 9 21 8.55228 21 8V4C21 3.44772 20.5523 3 20 3H16Z" fill="#6070FF"/>
                    </svg>
                        
                </button>
                <button  onclick="openPage('${project.link_to_source}')"  class="p-btn">
                    <span>See Source</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_39_522)">
                        <g clip-path="url(#clip1_39_522)">
                        <path d="M20.9989 9.46114C20.9989 8.32124 20.6329 7.25043 19.9342 6.31779C20.2004 5.41969 20.2669 4.27979 20.2004 2.96718C20.1671 2.41451 19.7345 2 19.2022 2C18.9028 2 16.3741 2.03454 14.9101 3.38169C13.6458 3.1399 12.315 3.1399 11.0174 3.38169C9.58667 2.03454 7.05802 2 6.7253 2C6.19296 2 5.76042 2.41451 5.72715 2.96718C5.62734 4.27979 5.72715 5.41969 5.99333 6.31779C5.29462 7.28497 4.92863 8.35579 4.92863 9.46114C4.92863 11.8791 6.7253 14.0553 9.45358 15.0915C9.35377 15.2988 9.28723 15.5406 9.22068 15.7824C6.32604 15.4715 4.9619 12.7427 4.89536 12.639C4.66246 12.1209 4.06357 11.9136 3.56449 12.19C3.06541 12.4318 2.86578 13.0535 3.13196 13.5717C3.1985 13.7444 5.02845 17.4404 9.05432 17.8549V20.9637C9.05432 21.5509 9.48686 22 10.0525 22H15.875C16.4406 22 16.8732 21.5509 16.8732 20.9637V16.8532C16.8732 16.2314 16.7401 15.6442 16.5072 15.1261C19.2022 14.0553 20.9989 11.9136 20.9989 9.46114Z" fill="#6070FF"/>
                        </g>
                        </g>
                        <defs>
                        <clipPath id="clip0_39_522">
                        <rect width="18" height="20" fill="white" transform="translate(3 2)"/>
                        </clipPath>
                        <clipPath id="clip1_39_522">
                        <rect width="18" height="20" fill="white" transform="translate(3 2)"/>
                        </clipPath>
                        </defs>
                        </svg>
                        
                </button>
            </div>
            </div>
            </div>
            </div>
          </div>
    `;
}
let cardSm=(project)=>{
    
    
    const technologies= project.technologies.map((technology)=>(
        `<li>${technology}</li>`
         )).join("");  
        
         //build HTML string for languages 
         const languages= project.languages.slice(0, 3).map((language,index)=>(
            `<li>${language}</li>`
             )).join("");

    return `
    <div class="card-popup-sm popup">
            <div class="card-text">
                <div class="header-title-popup-div">
                    <h3 class="header-title-popup">${project.name}</h3>
                    <svg class="popup-cancel" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.2929 13.2929C13.6834 12.9024 14.3166 12.9024 14.7071 13.2929L20 18.5858L25.2929 13.2929C25.6834 12.9024 26.3166 12.9024 26.7071 13.2929C27.0976 13.6834 27.0976 14.3166 26.7071 14.7071L21.4142 20L26.7071 25.2929C27.0976 25.6834 27.0976 26.3166 26.7071 26.7071C26.3166 27.0976 25.6834 27.0976 25.2929 26.7071L20 21.4142L14.7071 26.7071C14.3166 27.0976 13.6834 27.0976 13.2929 26.7071C12.9024 26.3166 12.9024 25.6834 13.2929 25.2929L18.5858 20L13.2929 14.7071C12.9024 14.3166 12.9024 13.6834 13.2929 13.2929Z" fill="#67798E"/>
                    </svg>                        
                </div>
               
                <ul class="tonic-items  tonic-items-sm">
                ${technologies}
                </ul>
                <img class="img-popup" src="${project.featured_image}" alt="portfolio project" width="295"
                height="220">
             <p class="sub-title-popup-sm">${project.description}</p>
             <ul class="social-links languages">
             ${languages}
             </ul>
            <div class="btn-group">
                <button  onclick="openPage('${project.link_to_live}')" class="p-btn">
                    <span>See live</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5 12C5 8.13401 8.13401 5 12 5C12.5523 5 13 4.55228 13 4C13 3.44772 12.5523 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 11.4477 20.5523 11 20 11C19.4477 11 19 11.4477 19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12ZM16 3C15.4477 3 15 3.44772 15 4C15 4.55228 15.4477 5 16 5H17.5858L11.2929 11.2929C10.9024 11.6834 10.9024 12.3166 11.2929 12.7071C11.6834 13.0976 12.3166 13.0976 12.7071 12.7071L19 6.41421V8C19 8.55228 19.4477 9 20 9C20.5523 9 21 8.55228 21 8V4C21 3.44772 20.5523 3 20 3H16Z" fill="#6070FF"/>
                    </svg>
                        
                </button>
                <button  onclick="openPage('${project.link_to_source}')"  class="p-btn">
                    <span>See Source</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_39_522)">
                        <g clip-path="url(#clip1_39_522)">
                        <path d="M20.9989 9.46114C20.9989 8.32124 20.6329 7.25043 19.9342 6.31779C20.2004 5.41969 20.2669 4.27979 20.2004 2.96718C20.1671 2.41451 19.7345 2 19.2022 2C18.9028 2 16.3741 2.03454 14.9101 3.38169C13.6458 3.1399 12.315 3.1399 11.0174 3.38169C9.58667 2.03454 7.05802 2 6.7253 2C6.19296 2 5.76042 2.41451 5.72715 2.96718C5.62734 4.27979 5.72715 5.41969 5.99333 6.31779C5.29462 7.28497 4.92863 8.35579 4.92863 9.46114C4.92863 11.8791 6.7253 14.0553 9.45358 15.0915C9.35377 15.2988 9.28723 15.5406 9.22068 15.7824C6.32604 15.4715 4.9619 12.7427 4.89536 12.639C4.66246 12.1209 4.06357 11.9136 3.56449 12.19C3.06541 12.4318 2.86578 13.0535 3.13196 13.5717C3.1985 13.7444 5.02845 17.4404 9.05432 17.8549V20.9637C9.05432 21.5509 9.48686 22 10.0525 22H15.875C16.4406 22 16.8732 21.5509 16.8732 20.9637V16.8532C16.8732 16.2314 16.7401 15.6442 16.5072 15.1261C19.2022 14.0553 20.9989 11.9136 20.9989 9.46114Z" fill="#6070FF"/>
                        </g>
                        </g>
                        <defs>
                        <clipPath id="clip0_39_522">
                        <rect width="18" height="20" fill="white" transform="translate(3 2)"/>
                        </clipPath>
                        <clipPath id="clip1_39_522">
                        <rect width="18" height="20" fill="white" transform="translate(3 2)"/>
                        </clipPath>
                        </defs>
                        </svg>
                        
                </button>
            </div>
            
            </div>
          </div>
    `;
}

let popCard=(project)=>{
     if (window.matchMedia("(min-width: 768px)").matches) {
       return cardLg(project);
      } 
       return cardSm(project);
}



porfolio_div.innerHTML=cards;

function showPopMenu(index){
    let project=projects[index];
    pop_container.innerHTML=popCard(project);
    pop_container.style.display='flex'
     
    window.onresize = function(){
       pop_container.innerHTML=popCard(project);
    }

    document.querySelector('.popup-cancel').addEventListener("click",()=>{
        pop_container.style.display='none'
    });
}

function openPage(link){
    pop_container.style.display='none'
    window.location=link;
}

contact_form.addEventListener('submit',(event)=>{
    event.preventDefault();
    let email=contact_form.elements['email'].value;
    if(email === email.toLowerCase()){
        contact_form.submit();
    }else{
        email_error_msg.textContent="Email must be lowercase,Put email in lowercase and submit again !"
    }
    
});

let user={
    name:'',
    email:'',
    message:'',
}

name_el.addEventListener('change',()=>{
 user.name=name_el.value;
 localStorage.setItem('user',JSON.stringify(user));
 user=JSON.parse(localStorage.getItem('user'));
 name_el.value=user.name;
});

 email_el.addEventListener('change',()=>{
    user.email=email_el.value;
    localStorage.setItem('user',JSON.stringify(user));
    user=JSON.parse(localStorage.getItem('user'));
    email_el.value=user.email;
  });

  message_el.addEventListener('change',()=>{
    user.message=message_el.value;
    localStorage.setItem('user',JSON.stringify(user));
    user=JSON.parse(localStorage.getItem('user'));
    message_el.value=user.message;
});


window.onload = function(){
    user=JSON.parse(localStorage.getItem('user'));
    if(user){
        name_el.value=user.name;
        email_el.value=user.email;
        message_el.value=user.message;
    }else{
        user={
        name:'',
        email:'',
        message:'',
       }
    }
    
 }






