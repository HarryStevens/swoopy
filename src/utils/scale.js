// A linear scale
export function scale([d0, d1], [r0, r1], value){
  const dx = d1 - d0;
  const rx = r1 - r0;
  return rx * ((value - d0) / dx) + r0
}