import Head from "next/head";
import Image from "next/image";
import "animate.css";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";
import Web3Modal from "web3modal";
import { Contract, providers } from "ethers";
import { abi, invoiceManagerContract } from "../constants";

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const web3ModalRef = useRef();
  const [createTab, setCreateTab] = useState(false);
  const [_sPAN, setSPAN] = useState("");
  const [_bPAN, setBPAN] = useState("");
  const [_Amount, setAmount] = useState(0);
  const [_searchPAN, setSearchPAN] = useState("");
  const [paymentTab, setPaymentTab] = useState(false);
  const [_Index, setIndex] = useState(0);
  const [_Status, setStatus] = useState(0);
  const [searchTab, setSearchTab] = useState(false);
  const [first_state, setState] = useState("");
  const [Seller, setSeller] = useState("");
  const [Time, setTime] = useState("");
  const [Amount, setAmounti] = useState("");
  const [paymentStatus, setpaymentStatus] = useState("");

  const addInvoiceData = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const invoiceContract = new Contract(invoiceManagerContract, abi, signer);
      const tx = await invoiceContract.addInvoice(_bPAN, _sPAN, _Amount);
      setLoading(true);
      await tx.wait();
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const showSearchedPANs = async () => {
    try {
      const provider = await getProviderOrSigner();
      const invoiceContract = new Contract(
        invoiceManagerContract,
        abi,
        provider
      );
      const tx = invoiceContract.allInvoices(_searchPAN);

      tx.then((value) => {
        console.log(value[0][0]); // 👉️ "hello"
        setState(value[0][0]);
        setSeller(value[0][1]);
        let x = value[0][3]._hex;
        let y = value[0][2]._hex;
        const hextodecimal = (hex) => parseInt(hex, 16);
        const dec1 = hextodecimal(x);
        const dec2 = hextodecimal(y);
        // let decimalValue = parseInt(x, 16);

        let date = new Date(dec1 * 1000).toLocaleDateString();
        let time = new Date(dec1 * 1000).toLocaleTimeString();

        setTime(time);
        setAmounti(dec2);
      }).catch((err) => {
        console.log(err);
      });
      // _searchPAN = (data) =>{
      //     console.log(data[0][3]);
      // }

      // let items = await Promise.all(
      //   tx.map(async () => {
      //     const buyerPAN = await invoiceContract.buyerPAN;
      //     const sellerPAN = await invoiceContract.sellerPAN;
      //     const Amount = await invoiceContract.invoiceAmount;
      //     const dateandtime = await invoiceContract.invoiceDateAndTime;
      //     const paymentStatus = await invoiceContract.paymentStatus;
      //     let item = {
      //       buyerPAN: buyerPAN,
      //       sellerPAN: sellerPAN,
      //       Amount: Amount,
      //       dateandtime: dateandtime,
      //       paymentStatus: paymentStatus,
      //     };
      //     return item;
      //   })
      // );
      // console.log(items);
      // console.log(result.buyerPAN);
      // console.log(result.invoiceAmount);
      // setLoading(true);
      // await tx.wait();
      // console.log(tx);
      // setLoading(false);
      // const result = await invoiceContract.getStruct().call();
    } catch (error) {
      console.error(error);
    }
  };

  const setPaymentStatus = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const invoiceContract = new Contract(invoiceManagerContract, abi, signer);
      const tx = await invoiceContract.updatePaymentStatus(
        _bPAN,
        _Index,
        _Status
      );
      setLoading(true);
      await tx.wait();
      setLoading(false);
      setpaymentStatus(`Payment status set to ${_Status}`);
    } catch (error) {
      console.error(error);
    }
  };

  const returnPaymentStatus = async () => {
    try {
      const provider = await getProviderOrSigner();
      const invoiceContract = new Contract(
        invoiceManagerContract,
        abi,
        provider
      );
      const tx = await invoiceContract.returnPaymentStatus(_bPAN, _Index);
      setLoading(true);
      const a = await tx.wait();
      setLoading(false);
      return a;
      console.log(a);
    } catch (error) {
      console.error(error);
    }
  };

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 80001) {
      window.alert("Change the network to Mumbai");
      throw new Error("Change network to Mumbai");
    }
    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };

  const renderButton = () => {
    if (!walletConnected) {
      return (
        <button onClick={connectWallet} className={styles.button}>
          Connect Your Wallet
        </button>
      );
    }

    if (loading) {
      return <button className={styles.button}>Loading..</button>;
    }

    if (createTab) {
      return (
        <div>
          <input
            type="string"
            placeholder="Your(Buyer) PAN"
            onChange={(e) => setBPAN(e.target.value)}
            className={styles.input}
          />
          <input
            type="string"
            placeholder="Seller PAN"
            onChange={(e) => setSPAN(e.target.value)}
            className={styles.input}
          />
          <input
            type="number"
            placeholder="Amount"
            onChange={(e) => setAmount(e.target.value)}
            className={styles.input}
          />

          <button className={styles.button2} onClick={addInvoiceData}>
            Create
          </button>
        </div>
      );
    } else if (searchTab) {
      return (
        <div>
          <div>
            Enter Your PAN:
            <input
              className={styles.input}
              placeholder="case-sensitive PAN"
              onChange={(e) => setSearchPAN(e.target.value)}
            />
            <button className={styles.button1} onClick={showSearchedPANs}>
              Search
            </button>
          </div>
          <div className={styles.containercolor}>
            <p> Buyer : {first_state}</p>
            <p>Seller : {Seller}</p>
            <p>
              Time : {Date} {Time}
            </p>
            <p>Amount : {Amount}</p>
          </div>
        </div>
      );
    } else if (paymentTab) {
      return (
        <div>
          <input
            type="string"
            placeholder="Your(Buyer) PAN"
            onChange={(e) => setBPAN(e.target.value)}
            className={styles.input}
          />

          <input
            type="number"
            placeholder="Index of Invoice"
            onChange={(e) => setIndex(e.target.value)}
            className={styles.input}
          />

          <input
            type="PaymentStatus"
            placeholder="Payment Status"
            onChange={(e) => setStatus(e.target.value)}
            className={styles.input}
          />

          <button className={styles.button1} onClick={setPaymentStatus}>
            Change Status
          </button>
          <br></br>
          <p>{paymentStatus}</p>
        </div>
      );
    }

    // if (walletConnected) {
    //   if (joinedWhitelist) {
    //     return (
    //       <div className={styles.description}>
    //         Thanks For joining the Whitelist!
    //       </div>
    //     );
    //   } else if (loading) {
    //     return <button className={styles.button}>loading..</button>;
    //   } else {
    //     return (
    //       <button onClick={addAddressToWhitelist} className={styles.button}>
    //         Join the Whitelist!
    //       </button>
    //     );
    //   }
    // } else {
    //   return (
    //     <button onClick={connectWallet} className={styles.button}>
    //       Connect Your wallet!
    //     </button>
    //   );
    // }
  };

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "mumbai",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }
  }, [walletConnected]);

  return (
    <div className="animate__animated animate__fadeIn">
      <Head>
        <title>Invoice manager</title>
        <meta name="description" content="Invoice-manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <div>
          <h1 className={styles.title}>Invoice Manager</h1>
          <div className={styles.description}>
            Your one-stop Invoice Manager
          </div>
          <div>
            <button
              className={styles.button}
              onClick={() => {
                setCreateTab(true);
                setSearchTab(false);
                setPaymentTab(false);
              }}
            >
              Create Invoice
            </button>
            <button
              className={styles.button}
              onClick={() => {
                setCreateTab(false);
                setSearchTab(true);
                setPaymentTab(false);
              }}
            >
              Invoices
            </button>
            <div>
              <button
                className={styles.button}
                onClick={() => {
                  setCreateTab(false);
                  setSearchTab(false);
                  setPaymentTab(true);
                }}
              >
                Payment Status
              </button>
            </div>
            {renderButton()}
          </div>
        </div>

        <div>
          {/* <img className={styles.image} src="./crypto-devs.svg" /> */}
        </div>
      </div>

      <footer className={styles.footer}>
        Made with &#10084; by Dixit Tilaji
      </footer>
    </div>
  );
}
