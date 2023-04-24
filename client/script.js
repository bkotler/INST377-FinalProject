function injectHTML(list) {
    console.log('fired injectHTML')
    const target = document.querySelector('#quote');
    target.innerHTML='';
    list.forEach((item) => {
        console.log(item)
        const str = `<li>${item}</li>`;
        target.innerHTML += str;
    })
  }

async function mainEvent(){
    const mainForm = document.querySelector('.main_form'); 
    const loadDataButton = document.querySelector("#data_load");
    let currentList = [];
    loadDataButton.addEventListener('click', async (submitEvent) => { 
      console.log('Loading data');
      submitEvent.preventDefault(); 
      const results = await fetch('https://ron-swanson-quotes.herokuapp.com/v2/quotes');

      currentList = await results.json();
      console.table(currentList);
      injectHTML(currentList);
    });
}


document.addEventListener('DOMContentLoaded', async () => mainEvent());