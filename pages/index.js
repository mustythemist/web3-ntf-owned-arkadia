import { ConnectWallet, useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";

export default function Home() {




  const address = useAddress();
  const { contract } = useContract('0x830A0C890A1F969586612b1FD98480e9406941f4');


  const { data, isLoading, error } = useOwnedNFTs(
    contract,
    // '0xdA81E27D31928e541b6E1ab6DfbB9866fF44634e',
    address,
  );

  console.log(data)

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://thirdweb.com/">thirdweb</a>!
        </h1>

        <p className={styles.description}>
          Get started by configuring your desired network in{" "}
          <code className={styles.code}>pages/_app.js</code>, then modify the{" "}
          <code className={styles.code}>pages/index.js</code> file!
        </p>

        <div className={styles.connect}>
          <ConnectWallet />
          <h2>Address - {address}</h2>
        </div>


      </main>
    </div>
  );
}
