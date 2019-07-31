/*** For php server ***/
export const getData = (callback) => {
  const xhr = new XMLHttpRequest();
  const host = "http://fizkulturniki.site/";
  xhr.open('GET', host + 'getuserID.php');
  xhr.send();
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && xhr.status === 200){
      callback(xhr.response)
    }
  };
  //xhr.open('GET',host + 'getuserID.php?q=' + userID, true);
}
/*** For Node.js ****/
//const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//const xhr = new XMLHttpRequest;
//const url = 'http://127.0.0.1:8080';
//const url = 'http://localhost:3000';

/*export const getData = (callback) => {
  const xhr = new XMLHttpRequest();
  //const url = 'http://192.168.1.34:8080';
  const url = 'http://localhost:3000';
  xhr.responseType = 'json';
  xhr.onreadystatechange = () => {
    if(xhr.readyState === XMLHttpRequest.DONE){
      callback(xhr.response)
    }
  };
  xhr.open('GET',url);
  xhr.send();
}*/

/*export const postData = () => {
  const xhr = new XMLHttpRequest();
  const url = 'http://localhost:3000';
  const data = '?id_vk=666666666';
  xhr.responseType = 'json';
  xhr.onreadystatechange = () => {
    if(xhr.readyState === XMLHttpRequest.DONE){
      return xhr.response;
    }
  };
  console.log(data);
  xhr.open('POST',url+'?'+data);
  xhr.send();
}*/
