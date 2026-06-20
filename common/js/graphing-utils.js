// 绘图工具函数
export function plotFunction(expression, xMin, xMax, step) {
  try {
    // 生成数据点
    const data = [];
    for (let x = xMin; x <= xMax; x += step) {
      try {
        const y = evaluateExpression(expression, x);
        if (!isNaN(y) && isFinite(y)) {
          data.push({ x: x, y: y });
        }
      } catch (e) {
        // 跳过无效点
      }
    }
    
    return {
      type: 'line',
      data: data,
      options: {
        scales: {
          x: { title: { text: 'x' } },
          y: { title: { text: 'y' } }
        }
      }
    };
  } catch (error) {
    throw new Error('生成图表数据失败: ' + error.message);
  }
}

function evaluateExpression(expr, x) {
  // 替换数学常数
  const replacedExpr = expr
    .replace(/π/g, Math.PI)
    .replace(/e/g, Math.E)
    .replace(/√/g, 'sqrt')
    .replace(/\^/g, '**');
  
  // 安全求值
  try {
    return Function('x', `
      const sin = Math.sin;
      const cos = Math.cos;
      const tan = Math.tan;
      const log = Math.log;
      const sqrt = Math.sqrt;
      const pow = Math.pow;
      return ${replacedExpr};
    `)(x);
  } catch (error) {
    return NaN;
  }
}