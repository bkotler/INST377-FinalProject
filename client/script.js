function returnLastWord(quote) {
  var n = quote.split(" ");
  return n[n.length - 1];

}

function injectHTML(list) {
    console.log('fired injectHTML')
    const target = document.querySelector('#quote');
    target.innerHTML='';
    list.forEach((item) => {
        console.log(item)
        lastWord = returnLastWord(item);
        var lastIndex = item.lastIndexOf(" ");
        item = item.substring(0, lastIndex);
        const str = `<li>${item}</li>`;
        target.innerHTML += str;
        return lastWord;
    })
  }

async function mainEvent(){
    const loadDataButton = document.querySelector("#data_load");
    const mainForm = document.querySelector('.main_form'); 
    const submitButton = document.querySelector('#submit');
    const storedData = localStorage.getItem('storedData');
    const parsedData = JSON.parse(storedData);
    let currentList = [];
    loadDataButton.addEventListener('click', async (event) => { 
      console.log('Loading data');
      event.preventDefault(); 
      const results = await fetch('https://ron-swanson-quotes.herokuapp.com/v2/quotes');

      currentList = await results.json();
      console.table(currentList);
      injectHTML(currentList);
      console.log("The last word is " + lastWord);
    });

    submitButton.addEventListener('click', async (event) => {
      console.log("form submission");
      const formData = new FormData(mainForm);
      const formProps = Object.fromEntries(formData);
      target = document.querySelector('#check');
      console.log(formProps.textbox);
      if (lastWord == formProps.textbox){
        console.log('true');
        target.innerHTML = '';
        target.innerHTML += 'Correct!';
      }
      else {
        console.log('false');
        target = document.querySelector('#check');
        target.innerHTML = '';
        target.innerHTML += 'Incorrect!';
      }
    })
}


document.addEventListener('DOMContentLoaded', async () => mainEvent());