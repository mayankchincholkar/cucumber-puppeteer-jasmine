import {puppeteerHelper} from "../helper/puppeteer-helper";

class RepaymentPage {

    constructor() {
        this.elements = {
            title: ".hero__main__element>div>h1>.text--white",
            loanAmount: '#loanAmount',
            estimatedRepayment: '.repay__result__text__amount',
            startOver: '.start-over>span',
            packageLoanYes: '#main-container > div:nth-child(1) > div > div > div.clearfix > div > div > div > div > div > div > div.container__main > div > div > div > div.repay--homeloan__animation-container > div.repay__row.repay__row__toggle-group.clearfix > div.row--three-items > div.sub-row__container.repay__question.repay__question--small.package-type > ul > li.selected > label'
        }
    }

    async verifyTitle() {
        await puppeteerHelper.waitForElementToBePresent(this.elements.title);
        expect(await puppeteerHelper.getElementText(this.elements.title)).toEqual("Estimate my home loan repayments")
    }

    async enterLoanAmount(amount) {
        await puppeteerHelper.clearInput(this.elements.loanAmount);
        await puppeteerHelper.enterText(this.elements.loanAmount, amount)
        await puppeteerHelper.click(this.elements.packageLoanYes, {clickCount: 2})
    }

    async verifyLoanRepayment(loanRepaymentAmount) {
        await puppeteerHelper.waitForTextToBe(this.elements.estimatedRepayment, loanRepaymentAmount);
    }

    async clickStartOver() {
        await puppeteerHelper.click(this.elements.startOver, {clickCount: 1})
    }
}

export const repaymentPage = new RepaymentPage();