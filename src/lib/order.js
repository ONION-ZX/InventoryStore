export function generate_oid (product_id) {
    return (new Date).getTime() + product_id + Math.round(Math.random() * 10);
  }
  