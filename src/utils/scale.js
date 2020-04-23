export function scale(domain, range, value){
  return range[0] + (range[1] - range[0]) * Math.abs(value - domain[0]) / Math.max(...domain) - Math.min(...domain);
}