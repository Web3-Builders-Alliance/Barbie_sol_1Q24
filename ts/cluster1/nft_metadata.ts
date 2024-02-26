import wallet from "./wallet/wba-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');
//const bundlrUploader = createBundlrUploader(umi);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

        
        const metadata = {
         name: "generug",
         symbol: "GR",
             description: "gene rug",
           image: "https://arweave.net/sB10FD4kgn1NW9-X4B0YDPli0kqU2-3iKWSXPXMHI-o",
            attributes: [
               {trait_type: 'random', value: '2'}
           ],
            properties: {
                 files: [
                    {
                       type: "image/png",
                     uri: "https://arweave.net/sB10FD4kgn1NW9-X4B0YDPli0kqU2-3iKWSXPXMHI-o"
                    },
                 ]
            },
             creators: []
        };
         const myUri = await umi.uploader.uploadJson([metadata]); 
         console.log("Your metadata URI: ", myUri);
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();