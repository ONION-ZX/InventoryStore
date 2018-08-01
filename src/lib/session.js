import api from './api';

export default {
  exist (unique, password) {
    return api('user/read', {
      where : {
        or : [
          [ 'username', '=', unique ],
          [ 'phone', '=', unique ],
          [ 'email', '=', unique ],
        ],
      },
    }).then(r => {
      let row;

      if ((row = r.data[ 0 ]) && row.password === password)
        return row;

      return false;
    });
  },

  uinfo () {
    return JSON.parse(localStorage.getItem('uinfo'));
  },

  login (row) {
    this.replace_uinfo(row);
  },

  replace_uinfo (row) {
    delete row.password;
    localStorage.setItem('uinfo', JSON.stringify(row));
  },

  logout (url) {
    localStorage.removeItem('uinfo');
    location.href = url || '/';
  },

  is_admin () {
    let info = this.uinfo();
    return info && this.uinfo().is_admin;
  },

  logged_in () {
    return !!this.his_id();
  },

  his_id () {
    let info = this.uinfo();
    return info && this.uinfo().id;
  },
};
