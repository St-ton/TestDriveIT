const prices = {
    'land-app': {
        idea: 700,
        web: 600,
        app: 1200,
        doc: 500
    },

    'mult-app': {
        idea: 1200,
        web: 900,
        app: 2500,
        doc: 800,
    },

    'web-app': {
        idea: 2000,
        web:1100,
        app:3000,
        doc: 1000,
    },

    'mob-app': {
        idea: 3000,
        web: 1500,
        app: 4000,
        doc: 1300,
    }
};

function getFormValues() {
    const websiteTypeElement = document.querySelector('#project-type');
    
    const ideaEl = document.querySelector('#testidea');
    const webEl = document.querySelector('#testweb');
    const appEl = document.querySelector('#testapp');
    const docEl = document.querySelector('#testdoc');
       
    return {
        websiteType: websiteTypeElement.value,
        idea: ideaEl.checked,
        web: webEl.checked,
        app: appEl.checked,
        doc: docEl.checked,

    }
}

function calculateWork() {
    const values = getFormValues();
    
    let totalPrice = 0;
    const workTypes = prices[values.websiteType];
    if (values.idea)
    {
        totalPrice = workTypes.idea;
    }
    if (values.web)
    {
        totalPrice = totalPrice + workTypes.web;
    }
    if (values.app)
    {
        totalPrice = totalPrice + workTypes.app;
    }
    if (values.doc)
    {
        totalPrice = totalPrice + workTypes.doc;
    }
    const totalPriceEl = document.querySelector('#total-price');
    totalPriceEl.textContent = totalPrice;
        
    console.log(totalPrice);
}

    
// getFormValues();
const formEl = document.querySelector('#project-price-form');
const emailModal = document.querySelector('#modal-email');
const successModal = document.querySelector('#modal-success');

// Первый рассчет калькулятора
calculateWork();
formEl.addEventListener('change', calculateWork);

formEl.addEventListener('submit', function (event){
    event.preventDefault();
    emailModal.classList.add('modal-active');
        
});

const closeButtons = document.querySelectorAll('.modal-close-button');

closeButtons.forEach(function (closeBtn){
        closeBtn.addEventListener('click', function (){
 
            const inputContainer = document.querySelector('#email-input-container');
    inputContainer.classList.remove('email-input-container-error')

        emailModal.classList.remove('modal-active');
        successModal.classList.remove('modal-active');
    });
});

const modalEmailContainer = document.querySelector('#modal-email-container');

modalEmailContainer.addEventListener('submit', function (event){
    event.preventDefault();

    const userEmailInput = document.querySelector('#user-email');
    if (userEmailInput.value)
    {
// netlify 
        const formData = new FormData(formEl);
        formData.append('Email', userEmailInput.value);
        
        fetch('/', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString()
        })
      
            .then(function (){
             emailModal.classList.remove('modal-active');
             successModal.classList.add('modal-active');
              })
            .catch((error) => alert("Не удалось отправить форму"))
// netlify 
        return;
    }
       
    const inputContainer = document.querySelector('#email-input-container');
    inputContainer.classList.add('email-input-container-error')
});