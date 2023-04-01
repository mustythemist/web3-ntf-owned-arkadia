import { ConnectWallet, useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";

export default function Home() {

  //Arkadians
  //0x3c178321f5BC73494046a46b5A065F9211b7C65E


  //hax rabito
  //0x830A0C890A1F969586612b1FD98480e9406941f4
  const address = useAddress();
  const { contract } = useContract('0x3c178321f5BC73494046a46b5A065F9211b7C65E');


  const { data, isLoading, error } = useOwnedNFTs(
    contract,
    // '0xdA81E27D31928e541b6E1ab6DfbB9866fF44634e',
    address,
  );

  console.log(isLoading, data)

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a>thirdweb</a>!
        </h1>

        <br />

        <div className={styles.connect}>
          <ConnectWallet />
          <h2>Address - {address}</h2>

          <h3>{!isLoading ? data.length : 'Loading'} NFTS</h3>
        </div>


      </main>
    </div>
  );
}
