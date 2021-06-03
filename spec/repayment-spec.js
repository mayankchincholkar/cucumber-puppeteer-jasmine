import {puppeteerHelper} from "../helper/puppeteer-helper";
import {repaymentPage} from "../pages/repayment-page";
import jasmine from "jasmine";

describe("Repayment Calculator", () => {
    const URL = 'https://www.anz.com.au/personal/home-loans/calculators-tools/calculate-repayments/';

    beforeEach(async () => {
        await puppeteerHelper.openUrl(URL);
        await repaymentPage.verifyTitle();
    }, 90000);

    afterEach(async () => {
    });

    it("should display correct repayment value when loan amount is entered", async () => {
        await repaymentPage.enterLoanAmount("800000");
        await repaymentPage.verifyLoanRepayment("$3,456");
    });

    it("should reset repayment value when start over is click", async () => {
        await repaymentPage.clickStartOver();
        await repaymentPage.verifyLoanRepayment("$2,160");
    });
});
