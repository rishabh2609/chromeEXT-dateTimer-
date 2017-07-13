var dateEnter = document.getElementById('date_enter');
var dateDisp = document.getElementById('date_disp');

var day = document.getElementById('set_day');
var month = document.getElementById('set_month');
var year = document.getElementById('set_year');

document.getElementById("btn-set").addEventListener('click', set_timer);
document.getElementById("btn-clear").addEventListener('click', reset_timer);
window.addEventListener('load', function() {
    chrome.storage.local.get('day', function (result) {
        if(result.day == undefined) {
          return;
        }
        else {
          calc_diff();
        }
    });
});

function reset_timer() {
  day.value = '';
  month.value = '';
  year.value = '';
  chrome.storage.local.clear();
  dateEnter.className = '';
  dateDisp.className = 'hidden';
}

function set_timer() {
  if(day.value == '' || day.value < 1 || day.value > 31) {
    day.style.borderBottom = '1px solid red';
    return;
  }
  else if(month.value == '' || month.value < 1 || month.value > 12) {
    month.style.borderBottom = '1px solid red';
    return;
  }
  else if(year.value == '') {
    year.style.borderBottom = '1px solid red';
    return;
  }

  if(month.value == 4 || month.value == 6 || month.value == 9 || month.value == 11) {
    if(day.value > 30) {
      day.style.borderBottom = '1px solid red';
      return;
    }
  }
  else if(month.value == 2) {
    if(day.value > 29) {
      day.style.borderBottom = '1px solid red';
      return;
    }
  }

  chrome.storage.local.set({'day': day.value});
  chrome.storage.local.set({'month': month.value});
  chrome.storage.local.set({'year': year.value});

  dateEnter.className = 'hidden';
  dateDisp.className = '';
  calc_diff();
}

function calc_diff() {
  dateEnter.className = 'hidden';
  dateDisp.className = '';
  var d = new Date();
  var d_date = d.getDate() * 1;
  var d_month = d.getMonth() * 1 + 1;
  var d_year = d.getFullYear() * 1;
  chrome.storage.local.get('day', function (result) {
    document.getElementById('day').innerHTML = result.day - d_date;
  });
  chrome.storage.local.get('year', function (result) {
    document.getElementById('year').innerHTML = result.year - d_year;
  });
  chrome.storage.local.get('month', function (result) {
    document.getElementById('month').innerHTML = result.month - d_month;
  });

   
   
}