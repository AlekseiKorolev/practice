/*** For php server ***/

export const getData = (id, exist, noExist) => { //Получаем информацию о зарегистрированном пользователе
  const url = 'https://fizkulturniki.site/checkUser.php/?id=' + id;

  let xmlHttpRequest = function() {
    return new Promise(function(resolve, reject) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      //xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      xhr.onreadystatechange = function() {
        if (this.readyState === 4) {
          if (this.status >= 200 && this.status < 400) {
            resolve(this.response);
          } else {
            reject(new Error('Error')); // Обработка ошибки
        }
       }
      };
      xhr.send();
    });
  };
  xmlHttpRequest()
    .then(function(text){
      if(text === 'not found'){
        noExist(id)
      } else {
        exist(text)
      }
    }).catch(function(err){
      console.error(err);
    });
}

export const addUser = (userData, callback) => { //Добавляем информацию о новом пользователе
  const xhr = new XMLHttpRequest();
  const host = "https://fizkulturniki.site/";
  xhr.open('GET', host + 'addUser.php/?id=' + userData.id + '&first_name=' +
    userData.first_name + '&last_name=' + userData.last_name +
    '&city_title=' + userData.city.title+'&city_id=' + userData.city.id);
  xhr.send();
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && xhr.status === 200){
      callback(xhr.response)
    }
  };
}

export const addData = (id, tableName, typeOfData, data, callback) => {//ДОбавляем данные
  const xhr = new XMLHttpRequest();
  const host = "https://fizkulturniki.site/";
  xhr.open('GET', host + 'addData.php/?id=' + id+'&tableName='+tableName+'&data='+typeOfData+'&value='+data);
  xhr.send();
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && xhr.status === 200){
      callback(xhr.response);
    }
  };
}

export const deleteData = (id, tableName, callback) => {//удаляем данные
  const xhr = new XMLHttpRequest();
  const host = "https://fizkulturniki.site/";
  xhr.open('GET', host + 'deleteData.php/?id=' + id+'&tableName='+tableName);
  xhr.send();
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && xhr.status === 200){
      callback(xhr.response);
    }
  };
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
