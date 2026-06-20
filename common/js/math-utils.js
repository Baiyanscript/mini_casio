// 数学工具函数库

// 基本运算
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }
export function multiply(a, b) { return a * b; }
export function divide(a, b) { return b === 0 ? NaN : a / b; }

// 高级数学函数
export function sin(x) { return Math.sin(x); }
export function cos(x) { return Math.cos(x); }
export function tan(x) { return Math.tan(x); }
export function asin(x) { return Math.asin(x); }
export function acos(x) { return Math.acos(x); }
export function atan(x) { return Math.atan(x); }
export function log(x) { return Math.log(x); }
export function log10(x) { return Math.log10(x); }
export function sqrt(x) { return Math.sqrt(x); }
export function pow(x, y) { return Math.pow(x, y); }

// 分数转换
export function toFraction(decimal, tolerance = 1.0E-6) {
  if (decimal === 0) return '0/1';
  if (Math.abs(decimal - Math.round(decimal)) < tolerance) {
    return `${Math.round(decimal)}/1`;
  }
  
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
  if (parts.length !== 2) return parseFloat(fraction);
  return parseFloat(parts[0]) / parseFloat(parts[1]);
}

// 方程求解
export function solveLinear(a, b) {
  if (a === 0) throw new Error('不是一元一次方程');
  return -b / a;
}

export function solveQuadratic(a, b, c) {
  const discriminant = b * b - 4 * a * c;
  if (discriminant < 0) return ['无实数解'];
  if (discriminant === 0) return [-b / (2 * a)];
  
  const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
  const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
  return [x1, x2];
}

export function solveCubic(a, b, c, d) {
  // 简化实现，使用数值方法
  return solveIterative(x => a*x**3 + b*x**2 + c*x + d, 0);
}

// 不等式求解
export function solveLinearInequality(a, b, operator) {
  const solution = -b / a;
  let inequality;
  
  switch (operator) {
    case '>': inequality = a > 0 ? `x > ${solution}` : `x < ${solution}`; break;
    case '>=': inequality = a > 0 ? `x >= ${solution}` : `x <= ${solution}`; break;
    case '<': inequality = a > 0 ? `x < ${solution}` : `x > ${solution}`; break;
    case '<=': inequality = a > 0 ? `x <= ${solution}` : `x >= ${solution}`; break;
    default: throw new Error('不支持的不等式运算符');
  }
  
  return inequality;
}

export function solveQuadraticInequality(a, b, c, operator) {
  const roots = solveQuadratic(a, b, c);
  if (roots[0] === '无实数解') {
    return a > 0 ? '全体实数' : '无解';
  }
  
  roots.sort((x, y) => x - y);
  let solution;
  
  if (operator === '>' || operator === '>=') {
    solution = a > 0 ? `x < ${roots[0]} 或 x > ${roots[1]}` : `${roots[0]} < x < ${roots[1]}`;
  } else {
    solution = a > 0 ? `${roots[0]} < x < ${roots[1]}` : `x < ${roots[0]} 或 x > ${roots[1]}`;
  }
  
  return solution;
}

// 迭代法求解
export function solveIterative(func, initialGuess, tolerance = 0.0001, maxIterations = 100) {
  let x = initialGuess;
  for (let i = 0; i < maxIterations; i++) {
    const fx = func(x);
    if (Math.abs(fx) < tolerance) return x;
    x = x - fx * 0.1; // 简单迭代
  }
  return x;
}

// 表达式求值（安全版本）
export function safeEvaluate(expression) {
  // 移除危险字符
  const safeExpr = expression.replace(/[^0-9+\-*/().^x√sincostanlogπe]/g, '');
  
  try {
    // 创建安全的求值函数
    const func = new Function('x', `return ${safeExpr}`);
    return func;
  } catch (error) {
    throw new Error('表达式格式错误');
  }
}