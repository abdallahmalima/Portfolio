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

for (let i = 0; i < menu_items.length; i++ ){
    menu_items[i].addEventListener('click',()=>{
        menu.style.display='none';
    });
}

