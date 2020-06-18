export default ( aMap => {
  const obj = {};
  aMap.forEach ((v,k) => {
    if (typeof(v) === 'object') {
      obj[k] = mapToObject2(v);
    } else {
      obj[k] = v
    }
  });
  return obj;
});

const mapToObject2 = ( aMap => {
  const obj = {};
  aMap.forEach ((v,k) => {
    if (typeof(v) === 'object') {
      obj[k] = mapToObject3(v);
    } else {
      obj[k] = v
    }
  });
  return obj;
});

const mapToObject3 = ( aMap => {
  const obj = {};
  aMap.forEach ((v,k) => {
      obj[k] = v
  });
  return obj;
});