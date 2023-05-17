// A linear scale
export function scale(domain, range, value){
  const [ d0, d1 ] = domain;
  const dx = d1 - d0;
  const [ r0, r1 ] = range;
  const rx = r1 - r0;
  return rx * ((value - d0) / dx) + r0
}