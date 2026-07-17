/*
 * @Author: Mr · Lei
 * @Date: 2025-03-02 16:47:54
 * @LastEditors: OBKoro1
 * @LastEditTime: 2025-03-02 16:47:55
 * @FilePath: \岐黄手法\a.js
 * @Description: 
 * 
 * Copyright (c) 2025 by 四川开局红科技有限公司, All Rights Reserved. 
 */
const fs = require('fs');

// 读取 package-lock.json 文件
const packageLock = JSON.parse(fs.readFileSync('package-lock.json', 'utf8'));

// 初始化 package.json 的基本结构
const packageJson = {
  name: packageLock.name || 'your-project-name',
  version: packageLock.version || '1.0.0',
  dependencies: {},
  devDependencies: {}
};

// 从 package-lock.json 中提取 dependencies 和 devDependencies
for (const [key, value] of Object.entries(packageLock.dependencies)) {
  if (value.dev) {
    packageJson.devDependencies[key] = value.version;
  } else {
    packageJson.dependencies[key] = value.version;
  }
}

// 将生成的 package.json 写入文件
fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

console.log('package.json 已成功生成');