import Web3 from 'web3';
import { renderer_abi, rebels_abi } from "./contract-abis.js";

const RENDERER_CONTRACT_ADDRESS = "0x3537514292865cE2F4E3865cD17bf488b3D8d24C";
const REBELS_CONTRACT_ADDRESS = "0x7DEDa0aFE6DF3da6a85a87b371F8b464c30C6803";

document.addEventListener("DOMContentLoaded", () => {
    let web3;

    async function initializeWeb3() {
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
            console.log("Web3 initialized");
        } else {
            alert("Please install MetaMask to interact with this page.");
        }
    }

    initializeWeb3();

    let rebels_contract = new web3.eth.Contract(rebels_abi, REBELS_CONTRACT_ADDRESS);
    let renderer_contract = new web3.eth.Contract(renderer_abi, RENDERER_CONTRACT_ADDRESS);

    const submitButton = document.getElementById("submit-id");
    const dayButton = document.getElementById("day-btn");
    const nightButton = document.getElementById("night-btn");
    const ultraButton = document.getElementById("ultra-btn");
    const nftImage = document.getElementById("nft-image");
    const nftIDInput = document.getElementById("nft-id");

    let currentNFTID = "";

    // Hide the image and buttons initially
    nftImage.style.display = "none";
    dayButton.style.display = "none";
    nightButton.style.display = "none";
    ultraButton.style.display = "none";

    submitButton.addEventListener("click", async () => {
        currentNFTID = nftIDInput.value;
        const accounts = await web3.eth.getAccounts();
        if (currentNFTID) {
	    let owner;
	    try {
		    owner = await rebels_contract.methods.ownerOf(currentNFTID).call();
            } 
	    catch (err) {
		    alert("Submitted Rebel ID doesn't exist. Please provide a valid ID.");
		    return;
	    }
	    if (accounts[0] === owner) {
		    const httpURL = `http://arweave.net/zujL5TbeTOE7v-pEQSfholCKuae0U9f7IAN0CmwC2Yg/${currentNFTID}.webp`;
		    nftImage.src = httpURL;

		    // Show the image and buttons after a valid ID is submitted
		    nftImage.style.display = "block";
		    dayButton.style.display = "inline-block";
		    nightButton.style.display = "inline-block";
		    ultraButton.style.display = "inline-block";
		} else {
		    alert("You are not the owner of this NFT.");
		}
	}
    });

	dayButton.addEventListener("click", async () => {
	    if (currentNFTID) {
		const accounts = await web3.eth.getAccounts();
		await web3.eth.sendTransaction({
		    to: RENDERER_CONTRACT_ADDRESS,
		    from: accounts[0],
		    data: renderer_contract.methods.unsetNightMode(currentNFTID).encodeABI()
		});

		crossDissolve(nftImage, () => {
		    const httpURL = `http://arweave.net/zujL5TbeTOE7v-pEQSfholCKuae0U9f7IAN0CmwC2Yg/${currentNFTID}.webp`;
		    nftImage.src = httpURL;
		});
	    }
	});

	nightButton.addEventListener("click", async () => {
	    if (currentNFTID) {
		const accounts = await web3.eth.getAccounts();
		await web3.eth.sendTransaction({
		    to: RENDERER_CONTRACT_ADDRESS,
		    from: accounts[0],
		    data: renderer_contract.methods.setNightMode(currentNFTID).encodeABI()
		});

		crossDissolve(nftImage, () => {
		    const httpURL = `http://arweave.net/zujL5TbeTOE7v-pEQSfholCKuae0U9f7IAN0CmwC2Yg/${currentNFTID}-night.webp`;
		    nftImage.src = httpURL;
		});
	    }
	});

	ultraButton.addEventListener("click", async () => {
	    if (currentNFTID) {
		const accounts = await web3.eth.getAccounts();
		await web3.eth.sendTransaction({
		    to: RENDERER_CONTRACT_ADDRESS,
		    from: accounts[0],
		    data: renderer_contract.methods.setUltraMode(currentNFTID).encodeABI()
		});

		crossDissolve(nftImage, () => {
		    const httpURL = `http://arweave.net/zujL5TbeTOE7v-pEQSfholCKuae0U9f7IAN0CmwC2Yg/${currentNFTID}-ultra.webp`;
		    nftImage.src = httpURL;
		});
	    }
	});

    function crossDissolve(element, callback) {
        const temp = document.createElement("img");
        temp.src = element.src;
        temp.style.width = element.clientWidth + "px"; // Set the width of temp to be the same as the element
        temp.style.height = element.clientHeight + "px"; // Set the height of temp to be the same as the element
        temp.style.opacity = 0;
        temp.style.position = "absolute";
        element.parentNode.insertBefore(temp, element);

        let opacity = 1;
        const interval = setInterval(() => {
            opacity -= 0.2;
            element.style.opacity = opacity;
            temp.style.opacity = 1 - opacity;
            if (opacity <= 0) {
                clearInterval(interval);
                element.src = temp.src;
                temp.parentNode.removeChild(temp);
                element.style.opacity = 1;

                if (callback) {
                    callback();
                }
            }
        }, 50);
    }
});
