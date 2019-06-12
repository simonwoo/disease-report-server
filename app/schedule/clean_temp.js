const Subscription = require('egg').Subscription;
const fs = require('fs');
const path = require('path');

function deleteall(path) {
	var files = [];
	if(fs.existsSync(path)) {
		files = fs.readdirSync(path);
		files.forEach(function(file, index) {
			var curPath = path + "/" + file;
			if(fs.statSync(curPath).isDirectory()) { // recurse
				deleteall(curPath);
			} else { // delete file
				fs.unlinkSync(curPath);
			}
		});

		// fs.rmdirSync(path);
	}
}

// 每天清除temp目录下的文件
class CleanTemp extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      cron: '59 59 23 * * ?', 
      type: 'worker',
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    deleteall(path.join(__dirname, '../../temp')); // 删除临时目录
  }
}

module.exports = CleanTemp;