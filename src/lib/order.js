export function generate_oid (product_id) {
    if(!product_id)
      return (new Date).getTime() + Math.round(Math.random() * 10);
    return (new Date).getTime() + product_id + Math.round(Math.random() * 10);
  }
  