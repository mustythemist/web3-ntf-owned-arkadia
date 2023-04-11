import { ConnectWallet, useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import axios from 'axios';


import myABI from '../abi.json'


export default function Home() {

  const [revealImg, setRevealImg] = useState(null);
  const [filteredData, setFilteredData] = useState();
  const [nfts, setNfts] = useState();
  const [revealedItems, setrevealedItems] = useState([]);

  //Arkadians
  //0x3c178321f5BC73494046a46b5A065F9211b7C65E


  //hax rabito
  //0x830A0C890A1F969586612b1FD98480e9406941f4


  //vico
  //0xa3083DeD9E6EC804117C24E7e2089FEd7173305a


  // const address = useAddress();
  const address = '0xa3083DeD9E6EC804117C24E7e2089FEd7173305a'
  // const { contract } = useContract('0x3c178321f5BC73494046a46b5A065F9211b7C65E');

  const { contract, isLoadingContacr, errorContract } = useContract("0x3c178321f5BC73494046a46b5A065F9211b7C65E", myABI);



  const { data, isLoading, error } = useOwnedNFTs(
    contract,
    // '0xdA81E27D31928e541b6E1ab6DfbB9866fF44634e',
    address,
  );

  useEffect(() => {
    if (!isLoading) {
      setNfts(data)
    }
  }, [isLoading]);

  console.log(isLoading, data)

  const handleReveal = (id) => {
    setRevealImg(id)
    console.log(id);
    const result = nfts.filter((item) => item.metadata.edition !== id)
    setNfts(result)
    console.log(result);

    revealedItems.push(id)
    console.log('revealedItems', revealedItems);

    // const options = {
    //   url: 'https://planet.oneplanetnft.cloud/nft/update-metadata',
    //   method: 'POST',
    //   headers: {
    //     'PLANET-API-KEY': 'zLKZdA6MQUWXfDwE',
    //   },
    //   data: {
    //     contractAddress: '0x3c178321f5BC73494046a46b5A065F9211b7C65E',
    //     tokenId: `${id}`
    //   }
    // };

    try {
      axios(options)
        .then(response => {
          console.log('axios respose', response);
        });
    }
    catch (e) {
      console.log('catch error', e);
    }

  }



  // const message = "Sign this message...";
  // const handleSign = async () => {
  //   console.log('s');
  //   const signature = await sdk.wallet.sign(message);
  //   console.log(signature);

  // }






  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a>ARKADIA</a>!
        </h1>

        <br />

        <div className={styles.connect}>
          <ConnectWallet />
          <h2>Address - {address}</h2>

          <h3>{!isLoading ? data.length : 'Loading'} NFTS</h3>

          <div style={{ 'display': 'flex', 'gap': '10px', 'alignItems': 'baseline' }}>
            {
              nfts && nfts.map((item, i) => (
                <div key={i}>
                  <img style={{ 'width': '100px' }} src={item.metadata.image} alt="" />

                  <p htmlFor="">{item.metadata.edition}</p>
                  <button onClick={() => handleReveal(item.metadata.edition)}>Reveal</button>
                  {/* {
                    revealImg ? <img src={revealImg} alt="" /> : null
                  } */}
                </div>
              ))
            }
            {
              revealedItems && revealedItems.map((item, i) => (
                <div key={i}>
                  <img src={`images/${item}.png`} alt="" />
                </div>
              ))
            }
          </div>




        </div>

        <div>
          <br />
          <br />
          <br />
          {/* <button onClick={() => handleSign()}>Test</button> */}

        </div>


      </main>
    </div>
  );
}
