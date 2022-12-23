export const abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_buyerPAN",
        type: "string",
      },
      {
        internalType: "string",
        name: "_sellerPAN",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_invoiceAmount",
        type: "uint256",
      },
    ],
    name: "addInvoice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_buyerPAN",
        type: "string",
      },
    ],
    name: "allInvoices",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "buyerPAN",
            type: "string",
          },
          {
            internalType: "string",
            name: "sellerPAN",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "invoiceAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "invoiceDateAndTime",
            type: "uint256",
          },
          {
            internalType: "enum invoiceManager.PaymentStatus",
            name: "paymentStatus",
            type: "uint8",
          },
        ],
        internalType: "struct invoiceManager.InvoiceData[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "buyerInvoices",
    outputs: [
      {
        internalType: "string",
        name: "buyerPAN",
        type: "string",
      },
      {
        internalType: "string",
        name: "sellerPAN",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "invoiceAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "invoiceDateAndTime",
        type: "uint256",
      },
      {
        internalType: "enum invoiceManager.PaymentStatus",
        name: "paymentStatus",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "nOfInvoices",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_buyerPAN",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
    ],
    name: "returnPaymentStatus",
    outputs: [
      {
        internalType: "enum invoiceManager.PaymentStatus",
        name: "_paymentStatus",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_buyerPAN",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
      {
        internalType: "enum invoiceManager.PaymentStatus",
        name: "_paymentStatus",
        type: "uint8",
      },
    ],
    name: "updatePaymentStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
export const invoiceManagerContract =
  "0x1e9734beE4532c8287e35749270c8C76eA3f24db";
module.exports = { abi, invoiceManagerContract };
