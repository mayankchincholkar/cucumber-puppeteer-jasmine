import puppeteer from 'puppeteer';
import {SpecReporter} from "jasmine-spec-reporter";
class PuppeteerHelper {

    constructor() {
        this.page =null;
        this.browser =null;
        jasmine.DEFAULT_TIMEOUT_INTERVAL=90000;
        jasmine.getEnv().clearReporters() // remove default reporter logs
        jasmine.getEnv().addReporter(
            new SpecReporter({
                spec: {
                    displayPending: true,
                },
            })
        )
    }

     async openUrl (url) {
        this.browser = await puppeteer.launch({headless:true});
        this.page = await this.browser.newPage();
        await this.page.setDefaultTimeout(90000);
        await this.page.goto(url);
    }

    async getElementText(element){
        const elem = await this.page.$(element);
        const text = await this.page.evaluate(elem => elem.textContent, elem);
        return text;
    }

    async waitForElementToBePresent(element){
        await this.page.waitForSelector(element);
    }

    async enterText(element,text){
        await this.waitForElementToBePresent(element);
        await this.page.type(element,text);
    }

    async clearInput(element){
        await this.page.evaluate((element) => document.querySelector(element).value = "",element)
    }

    async click(element,options){
        await this.page.click(element,options);
    }

    async waitForTextToBe(element,text){
        await this.waitForElementToBePresent(element);
         await this.page.waitForFunction((element,text)=>
             document.querySelector(element).textContent===text
             ,{timeout:10000},element,text);
    }

}
export const puppeteerHelper = new PuppeteerHelper();
