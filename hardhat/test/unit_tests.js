const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("invoiceManager", function () {
  let invoiceManagerFactory;
  let invoicemanager;

  beforeEach(async function () {
    invoiceManagerFactory = await ethers.getContractFactory("invoiceManager");
    invoicemanager = await invoiceManagerFactory.deploy();
  });

  it("should have zero entries in invoice initially", async function () {
    const initial_invoice = invoicemanager.allInvoices("abcd");
    const expectedValue = "[object Promise]";

    assert.equal(initial_invoice.toString(), expectedValue);
  });

  it("should be able to add inovice", async function () {
    const transactionResponse = await invoicemanager.addInvoice(
      "abcd",
      "bcd",
      2400
    );
    await transactionResponse.wait(1);

    const addedInvoice = invoicemanager.allInvoices("abcd");
    const expected_Invoice = "[object Promise]";

    assert.equal(addedInvoice.toString(), expected_Invoice);
  });
});
