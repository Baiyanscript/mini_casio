// 分数转换
export function toFraction(decimal) {
  // 实现分数转换逻辑
  const tolerance = 1.0E-6;
  let h1 = 1, h2 = 0;
  let k1 = 0, k2 = 1;
  let b = decimal;
  
  do {
    const a = Math.floor(b);
    let aux = h1;
    h1 = a * h1 + h2;
    h2 = aux;
    aux = k1;
    k1 = a * k1 + k2;
    k2 = aux;
    b = 1 / (b - a);
  } while (Math.abs(decimal - h1 / k1) > decimal * tolerance);
  
  return `${h1}/${k1}`;
}

export function toDecimal(fraction) {
  const parts = fraction.split('/');
  return parseFloat(parts[0]) / parseFloat(parts[1]);
}

// 方程求解
export function solveLinear([a, b]) {
  if (a === 0) throw new Error('不是一元一次方程');
  return -b / a;
}

export function solveQuadratic([a, b, c]) {
  const discriminant = b * b - 4 * a * c;
  if (discriminant < 0) return '无实数解';
  if (discriminant === 0) return `x = ${-b / (2 * a)}`;
  
  const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
  const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
  return `x1 = ${x1}, x2 = ${x2}`;
}

export function solveCubic([a, b, c, d]) {
  // 简化实现，实际需要完整的三次方程求根公式
  // 这里使用数值方法近似求解
  return solveIterative(x => a*x**3 + b*x**2 + c*x + d, 0, 0.0001);
}

// 迭代法求解
export function solveIterative(func, initialGuess, tolerance, maxIterations = 100) {
  let x = initialGuess;
  for (let i = 0; i < maxIterations; i++) {
    const fx = func(x);
    if (Math.abs(fx) < tolerance) return x;
    
    // 简单迭代：x = x - fx * 0.1
    x = x - fx * 0.1;
  }
  return x;
}