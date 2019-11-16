/*** For php server ***/
export const getData = (id, exist, noExist, data) => { //Получаем информацию о зарегистрированном пользователе
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
        noExist(data)
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
}

export const createTeam = (id, data, callback) => {
  const xhr = new XMLHttpRequest();
  const host = "https://fizkulturniki.site/";
  xhr.open('GET', host + 'createTeam.php/?name=' + data.teamName + '&type='+ data.teamType + '&id=' + id);
  xhr.send();
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && xhr.status === 200){
      callback(xhr.response);
    }
  };
}

export const searchTeam = (data, callback) => {
  const xhr = new XMLHttpRequest();
  const host = "https://fizkulturniki.site/";
  xhr.open('GET', host + 'searchTeam.php/?name=' + data.teamName + '&type='+ data.teamType);
  xhr.send();
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && xhr.status === 200){
      callback(xhr.response);
    }
  };
}
