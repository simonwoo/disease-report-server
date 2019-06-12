'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const moment = require('moment');

class ReportController extends Controller {
  async index() {
    const { ctx } = this;
    
    // 启动pupeteer，加载页面
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
      width: 1920,
      height: 1080
    });
    
    // 打开页面
    await page.goto('http://localhost:8080', {
      waitUntil: 'networkidle0'
    });

    // 生成pdf
    let pdfFileName = `体检报告_${moment(new Date()).format('YYYYMMDDHHmm') + '.pdf'}`
    let pdfFilePath = path.join(__dirname, '../../temp/', pdfFileName);
    await page.pdf({
      path: pdfFilePath,
      format: 'A4',
      scale: 1,
      printBackground: true,
      landscape: false,
      displayHeaderFooter: false
    });

    browser.close();

    // 返回文件路径
    ctx.status = 200
    ctx.body = {
      url: `${ctx.request.protocol}://${ctx.request.host}/resource/${pdfFileName}`
    }
  }
}

module.exports = ReportController;
