var form = document.querySelectorAll('form');
for (var i = 0, l = form.length; i < l; i ++) {
  form[i].addEventListener('submit', submit);
}

function submit (e) {
  e.preventDefault();

  var el = e.target;
  var val = el.children[1].value;

  if (!val) {
    alert('please type user name');
  }

  var req = new XMLHttpRequest();

  switch (el.id) {
    case 'user-name':
      req.open('POST', '/config/user', true);
      req.setRequestHeader('user-name', val);
      break;

    case 'list-name':
      req.open('POST', '/config/list', true);
      req.setRequestHeader('list-name', val);
      break;

    default:
      console.log('invalid post');
  }

  req.send();
}
