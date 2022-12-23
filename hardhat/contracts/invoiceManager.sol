//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract invoiceManager {
    enum PaymentStatus {
        Unpaid,
        Paid,
        PartiallyPaid
    }

    struct InvoiceData {
        string buyerPAN;
        string sellerPAN;
        uint256 invoiceAmount;
        uint256 invoiceDateAndTime;
        PaymentStatus paymentStatus;
    }

    uint256 indexOfInvoice = 0;

    mapping(string => mapping(uint256 => InvoiceData)) public buyerInvoices;
    mapping(string => uint256) public nOfInvoices;

    constructor() {}

    function addInvoice(
        string memory _buyerPAN,
        string memory _sellerPAN,
        uint256 _invoiceAmount
    ) public {
        uint256 a = nOfInvoices[_buyerPAN];
        uint256 _invoiceDateAndTime = block.timestamp;
        buyerInvoices[_buyerPAN][a] = InvoiceData(
            _buyerPAN,
            _sellerPAN,
            _invoiceAmount,
            _invoiceDateAndTime,
            PaymentStatus.Unpaid
        );
        nOfInvoices[_buyerPAN]++;
    }

    function allInvoices(
        string memory _buyerPAN
    ) public view returns (InvoiceData[] memory) {
        uint256 a = nOfInvoices[_buyerPAN];
        InvoiceData[] memory result = new InvoiceData[](a);

        for (uint256 i = 0; i < a; i++) {
            result[i] = buyerInvoices[_buyerPAN][i];
        }
        return result;
    }

    function updatePaymentStatus(
        string memory _buyerPAN,
        uint256 _index,
        PaymentStatus _paymentStatus
    ) public {
        buyerInvoices[_buyerPAN][_index].paymentStatus = _paymentStatus;
    }

    function returnPaymentStatus(
        string memory _buyerPAN,
        uint256 _index
    ) public view returns (PaymentStatus _paymentStatus) {
        return buyerInvoices[_buyerPAN][_index].paymentStatus;
    }
}
