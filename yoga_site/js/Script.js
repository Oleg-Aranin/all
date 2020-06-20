window.addEventListener('DOMContentLoaded', function() {

'use strict';

let tab = document.querySelectorAll('.info-header-tab'),
    info = document.querySelector('.info-header'),
    tabContent = document.querySelectorAll('.info-tabcontent');

     function hideTabContent(a) {

       for (let i = a; i < tabContent.length; i++) {
         tabContent[i].classList.remove('show');
         tabContent[i].classList.add('hide');
       }
     }
     hideTabContent(1);

     function showTabContent(b) {
       if (tabContent[b].classList.contains('hide')) {
         tabContent[b].classList.remove('hide');
         tabContent[b].classList.add('show');
       }

     }
     info.addEventListener('click', function(e) {
       if (e.target && e.target.classList.contains('info-header-tab')) {
         for (let i = 0; i < tab.length; i++) {
              if (e.target == tab[i]) {
                hideTabContent(0);
                showTabContent(i);
                break;
              }
           }
       }
     });

// слайдер     ххххххххххххххххххххххххххххххххххххххххххххххххххххххххххххххх

       let wrap = document.querySelector('.wrap'); //обертка
       let sliderItem = document.querySelectorAll('.slider-item');
       let prev = document.querySelector('.prev');
       let next = document.querySelector('.next');
       let dot = document.querySelector('.slider-dots');
       let dot2 = document.querySelectorAll('.dot')

       function hideSliderItem(a) {

         for (let i = a; i < sliderItem.length; i++) {
           sliderItem[i].style.display = 'none';
           dot2[i].classList.remove('dot-active');
         }
       }
       hideSliderItem(1);
       dot.addEventListener('click', function(e) {

         if (e.target && e.target.classList.contains('dot')) {
           for (let i = 0; i < dot2.length; i++) {

             if (e.target == dot2[i]) {
           hideSliderItem(0);
           sliderItem[i].style.display = 'block';
           dot2[i].classList.add('dot-active');
           break;
         }
             }
         }
       });

         function nextPrev(x) {

           for (let i = 0; i < sliderItem.length; i++) {

               if (sliderItem[i].style.display != 'none') {

               let v = i + x;
               if (v > sliderItem.length - 1) {
                   v = 0;
}
                  if (v < 0) {
                    v = sliderItem.length - 1;
                  }

                sliderItem[i].style.display = 'none';
                sliderItem[v].style.display = 'block';
                dot2[i].classList.remove('dot-active');
                dot2[v].classList.add('dot-active');
                break;
              }
             }


}
next.onclick = function() {
 nextPrev(1);
}
prev.onclick = function() {
 nextPrev(-1);
}


// таймер
let deadLine = '2019-07-05';


function getTimeRemaining(endtime) {
     let t = Date.parse(endtime) - Date.parse(new Date()),
         seconds = Math.floor((t / 1000) % 60),
         minutes = Math.floor((t / 1000 / 60) % 60),
         hours = Math.floor(t / 1000 / 60 / 60);

         if (seconds < 10) {
           seconds = '0' + seconds;
         }
         if (minutes < 10) {
           minutes = '0' + minutes;
         }
         if (hours < 10) {
           hours = '0' + hours;
         }

         if (t < 0) {
           seconds = '00';
           minutes = '00';
           hours = '00';
         }

         return {
           'total' : t,
           'hours' : hours,
           'minutes' : minutes,
           'seconds' : seconds
         }



}



        function setClock(id, endtime) {
          let timer = document.getElementById(id),
              hours = timer.querySelector('.hours'),
              minutes = timer.querySelector('.minutes'),
              seconds = timer.querySelector('.seconds'),
              timeInterval = setInterval(updateClock, 1000);


              function updateClock() {
                let t = getTimeRemaining(endtime);
                hours.textContent =  t.hours;
                minutes.textContent =  t.minutes;
                seconds.textContent =  t.seconds;



                if (t.total <= 0) {
                  clearInterval(timeInterval);
                }
              }

        }
setClock('timer', deadLine);

let more = document.querySelector('.more'),
    closeP = document.querySelector('.popup-close'),
    overlay = document.querySelector('.overlay');

more.addEventListener('click', function() {
  overlay.style.display = 'block';
  this.classList.add('more-splash');
  document.body.style.overflow = 'hidden';
});

closeP.addEventListener('click', function() {
  overlay.style.display = 'none';
  more.classList.remove('more-splash');
  document.body.style.overflow = '';
});

let infoTabcontent = document.querySelector('.info');

    infoTabcontent.addEventListener('click', function(e) {
      if (e.target.classList == 'description-btn') {
        overlay.style.display = 'block';
        more.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
      }
    });

// form

     let nessage = {
       loading: 'Загрузка...',
       success: 'Спасибо! Скоро мы с вами свяжемся',
       failure: 'Что-то поло не так...'
     };

     let form = document.querySelector('.main-form'),
         formInput = form.getElementsByTagName('input'),
         status = document.createElement('div');
         status.classList.add('status');

    form.addEventListener('submit', function(e) {
         e.preventDefault();
         form.appendChild(status);

         let request = new XMLHttpRequest();
         request.open('POST', 'ccc.json');
         request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

         let formData = new FormData(form);

         let obj = {};
         formData.forEach(function(value, key) {
             obj[key] = value;
         });
         let json = JSON.stringify(obj);

         request.send(json);

         request.addEventListener('readystatechange', function() {
                if (request.readyState <4) {
                  status.innerHTML = nessage.loading;
                } else if (request.readyState === 4 && request.status == 200) {
                  status.innerHTML = nessage.success;

                } else {
                  status.innerHTML = nessage.failure;

                }
         });
         for (let i = 0; i < formInput.length; i++) {
           formInput[i].value = '';

           }

    });


// калькулятор

     let person = document.querySelectorAll('.counter-block-input')[0],
         days = document.querySelectorAll('.counter-block-input')[1],
         place = document.getElementById('select'),
         totalValue = document.getElementById('total'),
         personSum = 0,
         daysSum = 0,
         total =0;

         totalValue.innerHTML = 0;

         person.addEventListener('change', function() {
           personSum = +this.value;
           total = (personSum + daysSum) * 4000;

           if (days.value == "" || person.value == "" || days.value == 0 || person.value == 0) {
             totalValue.innerHTML = 0;
           } else {
             totalValue.innerHTML = total;
           }
         });
         days.addEventListener('change', function() {
           daysSum = +this.value;
           total = (personSum + daysSum) * 4000;

           if (days.value == "" || person.value == "" || days.value == 0 || person.value == 0) {
             totalValue.innerHTML = 0;
           } else {
             totalValue.innerHTML = total;
           }
         });

         place.addEventListener('change', function() {
            if (days.value == "" || person.value == "" || days.value == 0 || person.value == 0) {
              totalValue.innerHTML = 0;
            } else {
              let a = total;
              totalValue.innerHTML = a * this.options[this.selectedIndex].value;
            }
         });

});










//
