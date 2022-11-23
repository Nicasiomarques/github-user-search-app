const $ = document.querySelector.bind(document)

const setValue = (value, key) =>
  $(`[data-id='${key}']`).innerText = value;

const populateGithubUser = user => 
  Object.keys.forEach(key => setValue(user[key], key));  
