module.exports = function roundArray(array, precision){
  const out = [];
  for (let i = 0, l = array.length; i < l; i++){
    const point = [];
    for (let j = 0; j < 2; j++){
      point[j] = +array[i][j].toFixed(precision);
    }
    out[i] = point;
  }
  return out;
}