const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });

async function main() {
  const invoiceManagerContract = await ethers.getContractFactory(
    "invoiceManager"
  );

  const deployedInvoiceMContract = await invoiceManagerContract.deploy();

  await deployedInvoiceMContract.deployed();

  console.log(
    "deployedInvoiceManager Contract Address:",
    deployedInvoiceMContract.address
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
