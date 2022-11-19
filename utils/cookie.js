function setCookie(name, value, days) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }

  document.cookie = `${name}=${value || ''}${expires}; path=/`;
}

function getCookie(name, cookieStr = null) {
  try {
    let cookie = '';

    if (setCookie !== null) {
      cookie = cookieStr;
    } else {
      cookie = document.cookie;
    }

    const nameEQ = `${name}=`;
    const ca = cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

function eraseCookie(name) {
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

export { setCookie, getCookie, eraseCookie };
