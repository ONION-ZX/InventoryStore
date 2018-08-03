import Vue from 'vue';
import api from '../lib/api';
import session from '../lib/session';


init();

const hub = {
  cart : {},
};

function all () {
  return hub;
}

function add (user_id, product_id, count) {
  api('cart/create', { user_id,product_id, count })
    .then(() => {
        read(user_id);
        alert('已添加!');
    });
}

function read (id) {
  api('cart/read', { key_by : 'id', with : 'has_one:product', limit : 50, where:{id}})
    .then(r => {
      Vue.set(hub, 'cart', r.data);
    });
}

function remove (id) {
  if(!confirm('确认要删除吗?'))
    return;
  api('cart/delete', { id })
    .then(() => {
      read();
      alert('已删除');
    });
}

function update (user_id, product_id, row) {
  row.id = product_id;
  api('cart/update', row)
    .then(r => read(user_id));
}

function count () {
  return Object.keys(hub.cart).length;
}

function find_by_product_id (product_id) {
  for (let id in hub.cart) {
    let it = hub.cart[ id ];
    if (it.product_id == product_id)
      return it;
  }
}

function product_exist (product_id) {
  return !!find_by_product_id(product_id);
}

function each (fn) {
  for (let id in hub.cart) {
    let it = hub.cart[ id ];
    fn(it, id);
  }
}


function init () {
  read();
}

export {hub, all, add, read, remove, update, count, find_by_product_id, product_exist, each}
