const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('#menu');
const close_btn = document.querySelector('.close-btn');
const menu_items = document.querySelectorAll('.menu-item');


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
