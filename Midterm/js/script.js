let collections = document.getElementById('collections');
let main = document.getElementById('home');
let resultsBody = document.querySelector('.results-searched');
let resultscon = document.getElementById('results-container');
let homeBody = document.getElementById('homepage-container');

let objects = new XMLHttpRequest();
let department = new XMLHttpRequest();
department.open('GET', 'https://collectionapi.metmuseum.org/public/collection/v1/departments', true);
department.onload = function() {
  let data = JSON.parse(this.response);
  if (department.status >= 200 && department.status < 400) {
    data.departments.forEach(departments => {
      const list = document.createElement('a');
      list.innerHTML = `<p class="list" onclick="myfunction(this);event.stopPropagation()">${departments.displayName}</p>`;
      collections.appendChild(list);
    });
  }
}
department.send();

function myfunction(ctrl) {
  homeBody.style.display = "none";
  document.body.style.backgroundImage = "none";
  home.style.overflow = "visible";
  resultscon.style.display = "flex";
  resultsBody.style.display = "flex";
  let title = ctrl.innerHTML;

  const resultsTitle = document.querySelector('.results-title');
  const reTitle = document.createElement('h1');
  reTitle.innerHTML = title;
  resultsTitle.appendChild(reTitle);

  department.open('GET', 'https://collectionapi.metmuseum.org/public/collection/v1/departments', true);
  department.onload = function () {
    // Begin accessing JSON data here
    let data = JSON.parse(this.response);
    if (department.status >= 200 && department.status < 400) {
      let sect = data.departments.find(o => o.displayName === title);

      objects.open('GET', `https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${sect.departmentId}`, true);
      objects.onload = function() {
        let data2 = JSON.parse(this.response);
        if (objects.status >= 200 && objects.status < 400) {
          let first10 = data2.objectIDs.slice(0, 40);
          first10.forEach(objs => {

            let object  = new XMLHttpRequest(); 
            object.open('GET', `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objs}`, true);
            object.onload = function() {
              let data3 = JSON.parse(this.response);
              if (object.status >= 200 && object.status < 400) {
                  const card = document.createElement('button');
                  card.setAttribute('class', 'card open-button');
                  const images = document.createElement('div');
                  images.setAttribute('class', 'results-img');
                  images.innerHTML = `<img src="${data3['primaryImageSmall']}">`;

                  const resultsInfo = document.createElement('div');
                  resultsInfo.setAttribute('class', 'results-info');
                  const h1 = document.createElement('h1');
                  h1.textContent = data3['title'];
                  resultsInfo.appendChild(h1);

                  const p = document.createElement('p');
                  p.textContent = data3['artistDisplayName'];
                  resultsInfo.appendChild(p);

                  resultsBody.appendChild(card);
                  card.appendChild(images);
                  card.appendChild(resultsInfo);

                  card.addEventListener('click', function() {
                    moreInfo(data3['objectID']);
                  })
              }
            }
            object.send();
          });
        }
      }
      objects.send();
    }
  }
  department.send();
}

function moreInfo(ID) {
  const modal = document.createElement('dialog');
  modal.setAttribute('class', 'modal');
  modal.setAttribute('id', 'modal');
  resultscon.appendChild(modal);
  const closeModal = document.createElement('button');
  closeModal.setAttribute('class', 'close-button');
  closeModal.innerHTML = 'close';
  modal.appendChild(closeModal);

  closeModal.addEventListener('click', function() {
    modal.close();
    modal.parentNode.removeChild(modal)
  })

  let request  = new XMLHttpRequest(); 
  request.open('GET', `https://collectionapi.metmuseum.org/public/collection/v1/objects/${ID}`, true);
  request.onload = function() {
    let data4 = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
      const modalCon = document.createElement('div');
      modalCon.setAttribute('class', 'modal-container');
      const imagesInfo = document.createElement('div');
      imagesInfo.setAttribute('class', 'gallery-imgs');
      const modalInfo = document.createElement('div');
      modalInfo.setAttribute('class', 'modal-info');
      const modalDetails = document.createElement('div');
      modalDetails.setAttribute('class', 'modal-detailcon');

      const prev = document.createElement('button');
      prev.setAttribute('class', 'prev');
      prev.classList.add('is-hidden');
      prev.innerHTML = '&#8678;';
      imagesInfo.appendChild(prev);

      const next = document.createElement('button');
      next.setAttribute('class', 'next');
      next.innerHTML = '&#8680;';
      imagesInfo.appendChild(next);

      const ul = document.createElement('ul');
      ul.setAttribute('class', 'tracks');
      const li = document.createElement('li');
      li.setAttribute('class', 'currentSlide');

      

      li.innerHTML = `<img src="${data4['primaryImage']}">`;
      ul.appendChild(li);
      data4['additionalImages'].forEach(imgs => {
        const li = document.createElement('li');
        li.innerHTML = `<img src="${imgs}">`;
        ul.appendChild(li);
      });
      imagesInfo.appendChild(ul);
      modalCon.appendChild(imagesInfo);


      const modalTitle = document.createElement('h1');
      modalTitle.setAttribute('class', 'modal-title');
      modalTitle.innerHTML = data4['title'];
      modalInfo.appendChild(modalTitle);

      const modalArtist = document.createElement('h3');
      modalArtist.setAttribute('class', 'modal-artist');
      modalArtist.innerHTML = `${data4['artistDisplayName']} (${data4['artistDisplayBio']})`;
      modalInfo.appendChild(modalArtist);
      
      modalCon.appendChild(modalInfo);
      modal.appendChild(modalCon);

      const modalPeriod = document.createElement('p');
      modalPeriod.setAttribute('class', 'modal-details');
      modalPeriod.innerHTML = `<strong>Period:</strong> ${data4['period']}`;
      modalDetails.appendChild(modalPeriod);
      
      const modalDate = document.createElement('p');
      modalDate.setAttribute('class', 'modal-details');
      modalDate.innerHTML = `<strong>Date:</strong> ${data4['objectDate']}`;
      modalDetails.appendChild(modalDate);
      
      const modalMed = document.createElement('p');
      modalMed.setAttribute('class', 'modal-details');
      modalMed.innerHTML = `<strong>Medium:</strong> ${data4['medium']}`;
      modalDetails.appendChild(modalMed);
      
      const modalDem = document.createElement('p');
      modalDem.setAttribute('class', 'modal-details');
      modalDem.innerHTML = `<strong>Dimensions:</strong> ${data4['dimensions']}`;
      modalDetails.appendChild(modalDem);
      
      const modalCulture = document.createElement('p');
      modalCulture.setAttribute('class', 'modal-details');
      modalCulture.innerHTML = `<strong>Culture:</strong> ${data4['culture']}`;
      modalDetails.appendChild(modalCulture);
      
      
      const modalClass = document.createElement('p');
      modalClass.setAttribute('class', 'modal-details');
      modalClass.innerHTML = `<strong>Classification:</strong> ${data4['classification']}`;
      modalDetails.appendChild(modalClass);
      
      modal.appendChild(modalDetails);
      modal.showModal();

      const track = document.querySelector('.tracks');
      const slides = Array.from(track.children);
      const slideWidth = slides[0].clientWidth;
      const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
      };
      slides.forEach(setSlidePosition);

      const hideShowArrows= (slides, prev, next, targetIndex) => {
        if (targetIndex === 0) {
          prev.classList.add('is-hidden');
          next.classList.remove('is-hidden');
        } else if (targetIndex === slides.length - 1) {
          prev.classList.remove('is-hidden');
          next.classList.add('is-hidden');
        } else {
          prev.classList.remove('is-hidden');
          next.classList.remove('is-hidden');
        }
      };
      prev.addEventListener('click', e => {
        const currentSlide = track.querySelector('.currentSlide');
        const prevSlide = currentSlide.previousElementSibling;
        const amountToMove = prevSlide.style.left;
        track.style.transform = `translateX(-${amountToMove})`;
        currentSlide.classList.remove('currentSlide');
        prevSlide.classList.add('currentSlide');
        const prevIndex = slides.findIndex(slide => slide === prevSlide);
        hideShowArrows(slides, prev, next, prevIndex);
      });

      next.addEventListener('click', e => {
        const currentSlide = track.querySelector('.currentSlide');
        const nextSlide = currentSlide.nextElementSibling;
        const amountToMove = nextSlide.style.left;
        track.style.transform = `translateX(-${amountToMove})`;
        currentSlide.classList.remove('currentSlide');
        nextSlide.classList.add('currentSlide');
        const nextIndex = slides.findIndex(slide => slide === nextSlide);
        hideShowArrows(slides, prev, next, nextIndex);
      });
    }
  }
  request.send();
}