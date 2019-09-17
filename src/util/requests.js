/*** For php server ***/
export const getData = (id, exist, noExist) => {
  const xhr = new XMLHttpRequest();
  const host = "https://fizkulturniki.site/";
  xhr.open('GET', host + 'checkUser.php/?id=' + id);
  xhr.send();
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && xhr.status === 200){
      if(xhr.response){
        exist(xhr.response)
      }else{
        noExist(id, xhr.response)
      }
    }
  };
  //xhr.open('GET',host + 'getuserID.php?q=' + userID, true);
}

export const addUser = (userData, callback) => {
  const xhr = new XMLHttpRequest();
  const host = "https://fizkulturniki.site/";
  xhr.open('GET', host + 'addUser.php/?id=' + userData.id + '&first_name=' +
    userData.first_name + '&last_name=' + userData.last_name +
    '&city=' + userData.city.title);
  xhr.send();
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && xhr.status === 200){
      callback(xhr.response)
    }
  };
  //xhr.open('GET',host + 'getuserID.php?q=' + userID, true);
}

export const addData = (id, typeOfData, data, callback) => {
  const xhr = new XMLHttpRequest();
  const host = "https://fizkulturniki.site/";
  xhr.open('GET', host + 'addData.php/?id=' + id+'&data='+typeOfData+'&value='+data);
  xhr.send();
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && xhr.status === 200){
      callback(xhr.response);
    }
  };
  //xhr.open('GET',host + 'getuserID.php?q=' + userID, true);
}

export const searchData = (data, callback) => {
  const xhr = new XMLHttpRequest();
  const host = "https://fizkulturniki.site/";
  xhr.open('GET', host + 'searchData.php/?side=' + data.side + '&role='+ data.role + '&format=' + data.format + '&skill=' + data.skill);
  xhr.send();
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && xhr.status === 200){
      callback(xhr.response);
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
