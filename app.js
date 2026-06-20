// app.js - 数学工具箱应用全局逻辑
import router from '@system.router';
import prompt from '@system.prompt';

export default {
  // 全局数据定义
  data: {
    appName: '数学工具箱',
    version: '1.0.0'
  },

  // 应用创建时的生命周期回调
  onCreate() {
    console.info('数学工具箱应用已创建');
    prompt.showToast({
      message: '欢迎使用数学工具箱',
      duration: 2000
    });
  },

  // 应用显示到前台时的生命周期回调
  onShow() {
    console.info('数学工具箱应用显示到前台');
  },

  // 应用隐藏到后台时的生命周期回调
  onHide() {
    console.info('数学工具箱应用隐藏到后台');
  },

  // 应用销毁时的生命周期回调
  onDestroy() {
    console.info('数学工具箱应用已销毁');
  },

  // 全局导航方法
  navigateTo(path, params = {}) {
    router.push({
      uri: path,
      params: params
    });
  },

  // 返回上一页
  navigateBack() {
    router.back();
  },

  // 显示提示信息
  showMessage(message, duration = 3000) {
    prompt.showToast({
      message: message,
      duration: duration
    });
  },

  // 显示确认对话框
  showConfirm(title, message, confirmText = '确定', cancelText = '取消') {
    return new Promise((resolve) => {
      prompt.showDialog({
        title: title,
        message: message,
        buttons: [
          {
            text: cancelText,
            color: '#666666'
          },
          {
            text: confirmText,
            color: '#007AFF'
          }
        ],
        success: (data) => {
          resolve(data.index);
        },
        cancel: () => {
          resolve(0); // 取消操作
        }
      });
    });
  },

  // 全局工具函数 - 格式化数字
  formatNumber(num, decimals = 2) {
    if (num === null || num === undefined) return '0';
    return parseFloat(num).toFixed(decimals);
  },

  // 全局工具函数 - 验证数学表达式
  isValidExpression(expr) {
    if (!expr || typeof expr !== 'string') return false;
    
    // 基础验证：不能包含危险字符
    const dangerousChars = /[;{}()<>\\]/;
    if (dangerousChars.test(expr)) return false;
    
    // 简单的数学表达式验证
    const mathRegex = /^[0-9+\-*/().^x√sincostanlogπe]+$/;
    return mathRegex.test(expr.replace(/\s/g, ''));
  },

  // 全局错误处理
  handleError(error, context = '') {
    console.error(`错误发生在: ${context}`, error);
    this.showMessage(`计算错误: ${error.message || '未知错误'}`);
  }
}