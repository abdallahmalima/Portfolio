const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('#menu');
const closebtn = document.querySelector('.close-btn');
const porfoliodiv = document.querySelector('#portfolio');
const menuitems = document.querySelectorAll('.menu-item');
const popcontainer = document.querySelector('.pop-container');
const contactForm = document.querySelector('#contact_form');
const emailErrorMsg = document.querySelector('#email_error_msg');

const formInputs = document.querySelectorAll('.input');

hamburger.addEventListener('click', () => {
  menu.style.display = 'flex';
});

closebtn.addEventListener('click', () => {
  menu.style.display = 'none';
});

[...menuitems].forEach((menuitem) => {
  menuitem.addEventListener('click', () => {
    menu.style.display = 'none';
  });
});

const getImageUrl = (() => {
  const map = new Map();
  map.set(568749922, '82ee6b7e-f1df-4300-a60d-a5ed8810c2ca');
  map.set(556697007, '1ed771c6-c65f-4fe4-9219-968c6ac9ce2a');
  map.set(566617294, '258ff4f8-f01b-4026-82c3-51b5e35cde6b');
  map.set(552833444, 'deda3c00-7fa2-4be2-9a8e-17f49e89e067');
  map.set(580058983, '3d9ba8cc-7805-4c6f-b426-b084ae2aebf2');
  map.set(576255809, '78643528-3313-4dac-87ee-07a977661d39');
  map.set(585463230, 'ea1827f0-2b13-428d-abc0-45d8e77225c6');
  map.set(571481400, '39bd58ef-8829-4034-af82-31d0909a8e5d');
  map.set(560948540, 'ee3858ee-4879-4632-932d-dc434cd92d88');
  map.set(539943036, 'c8579cc7-059d-454a-9449-a787e78ec9d6');

  return (id) => {
    const photoID = map.get(id);
    if (photoID === undefined) {
      return null;
    }
    return `https://repository-images.githubusercontent.com/${id}/${photoID}`;
  };
})();

// list of projects in object
const getProjectsFromGithub = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};

const filterStaredRepos = (projects) => projects.filter((project) => project.stargazers_count > 0);

const destructureDesiredData = (projects) => {
  const mProjects = projects.filter((project) => getImageUrl(project.id) !== null);
  return mProjects.map(({
    id, name, description, html_url: htmlUrl, homepage, topics,
  }) => ({
    name,
    description,
    featured_image: getImageUrl(id),
    link_to_live: homepage,
    link_to_source: htmlUrl,
    technologies: [],
    languages: topics,
  }));
};

getProjectsFromGithub('https://api.github.com/users/abdallahmalima/repos').then((projects) => {
  const staredProjects = filterStaredRepos(projects);
  const desiredProjects = destructureDesiredData(staredProjects);
  const cards = desiredProjects.map((project, index) => {
    // build HTML string for technologies
    const technologies = project.technologies.map((technology) => (
      `<li>${technology}</li>`
    )).join('');

    // build HTML string for languages
    const languages = project.languages.slice(0, 5).map((language) => (
      `<li>${language}</li>`
    )).join('');

    // build and return HTML string for the whole project card
    return `
      <div class="card ${(index + 1) % 2 === 0 ? 'rv' : ''}">
      <img src="${project.featured_image}" alt="portfolio project" width="295"
       height="220">
       <div class="card-text">
       <h1 class="header-title">${project.name}</h1>
       <ul class="tonic-items">
          ${technologies}
       </ul>
       <p class="sub-title">${project.description.substring(0, 193)}...</p>
       <ul class="social-links languages">
          ${languages}
       </ul>
       <button id="${index}"  class="p-btn view-details-btn"><span>See Project</span></button>
      </div>
      </div>
      `;
  }).join('');

  porfoliodiv.innerHTML = cards;

  const cardLg = (project) => {
    const technologies = project.technologies.map((technology) => (
      `<li>${technology}</li>`
    )).join('');

    // build HTML string for languages
    const languages = project.languages.map((language) => (
      `<li>${language}</li>`
    )).join('');

    return `
      <div class="card-popup popup card-lg">
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
                  <button link="${project.link_to_live}"  class="p-btn open-page">
                      <span>See live</span>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M5 12C5 8.13401 8.13401 5 12 5C12.5523 5 13 4.55228 13 4C13 3.44772 12.5523 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 11.4477 20.5523 11 20 11C19.4477 11 19 11.4477 19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12ZM16 3C15.4477 3 15 3.44772 15 4C15 4.55228 15.4477 5 16 5H17.5858L11.2929 11.2929C10.9024 11.6834 10.9024 12.3166 11.2929 12.7071C11.6834 13.0976 12.3166 13.0976 12.7071 12.7071L19 6.41421V8C19 8.55228 19.4477 9 20 9C20.5523 9 21 8.55228 21 8V4C21 3.44772 20.5523 3 20 3H16Z" fill="#6070FF"/>
                      </svg>
                          
                  </button>
                  <button link="${project.link_to_source}"    class="p-btn open-page">
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
  };
  const cardSm = (project) => {
    const technologies = project.technologies.map((technology) => (
      `<li>${technology}</li>`
    )).join('');

    // build HTML string for languages
    const languages = project.languages.slice(0, 3).map((language) => (
      `<li>${language}</li>`
    )).join('');

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
                  <button  link="${project.link_to_live}" class="p-btn open-page">
                      <span>See live</span>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M5 12C5 8.13401 8.13401 5 12 5C12.5523 5 13 4.55228 13 4C13 3.44772 12.5523 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 11.4477 20.5523 11 20 11C19.4477 11 19 11.4477 19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12ZM16 3C15.4477 3 15 3.44772 15 4C15 4.55228 15.4477 5 16 5H17.5858L11.2929 11.2929C10.9024 11.6834 10.9024 12.3166 11.2929 12.7071C11.6834 13.0976 12.3166 13.0976 12.7071 12.7071L19 6.41421V8C19 8.55228 19.4477 9 20 9C20.5523 9 21 8.55228 21 8V4C21 3.44772 20.5523 3 20 3H16Z" fill="#6070FF"/>
                      </svg>
                          
                  </button>
                  <button link="${project.link_to_source}"   class="p-btn open-page">
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
  };

  const popCard = (project) => {
    if (window.matchMedia('(min-width: 768px)').matches) {
      return cardLg(project);
    }
    return cardSm(project);
  };

  function addEventListenersToOpenPageBtn() {
    const openPageButtons = document.querySelectorAll('.open-page');
    [...openPageButtons].forEach((openPageButton) => {
      openPageButton.addEventListener('click', () => {
        popcontainer.style.display = 'none';
        window.location = openPageButton.getAttribute('link');
      });
    });
  }

  function addEventListenersToCancelPopUp() {
    document.querySelector('.popup-cancel').addEventListener('click', () => {
      popcontainer.style.display = 'none';
    });
  }

  function showPopMenu(index, projects) {
    const project = projects[index];
    popcontainer.innerHTML = popCard(project);
    popcontainer.style.display = 'flex';

    window.onresize = () => {
      popcontainer.innerHTML = popCard(project);
      addEventListenersToOpenPageBtn();
      addEventListenersToCancelPopUp();
    };

    addEventListenersToCancelPopUp();
    addEventListenersToOpenPageBtn();
  }

  const viewDetailsButtons = document.querySelectorAll('.view-details-btn');
  [...viewDetailsButtons].forEach((viewDetailsButton) => {
    viewDetailsButton.addEventListener('click', () => {
      const index = viewDetailsButton.getAttribute('id');
      showPopMenu(index, desiredProjects);
    });
  });
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = contactForm.elements.email.value;
  if (email === email.toLowerCase()) {
    contactForm.submit();
  } else {
    emailErrorMsg.textContent = 'Email must be lowercase,Put email in lowercase and submit again !';
  }
});

let user = {
  name: '',
  email: '',
  message: '',
};

[...formInputs].forEach((formInput) => {
  formInput.addEventListener('change', () => {
    const key = formInput.getAttribute('name');
    user[key] = formInput.value;
    localStorage.setItem('user', JSON.stringify(user));
    user = JSON.parse(localStorage.getItem('user'));
    formInput.value = user[key];
  });
});

window.onload = () => {
  user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    contactForm.elements.name.value = user.name;
    contactForm.elements.email.value = user.email;
    contactForm.elements.message.value = user.message;
  } else {
    user = {
      name: '',
      email: '',
      message: '',
    };
  }
};
