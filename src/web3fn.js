import { ethers } from "ethers";

const experiencesContractAddr = "0xBf4d7C4D0B6F66310A911DE778d9AE535862201c";
const featuredWorksContractAddr = "0x749350fcC91e46ceB9C716F2B72A2AB50c32Fdd6";

async function connectedAccounts() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    try {
        const accounts = await provider.send("eth_requestAccounts", []);
        return accounts;
    } catch(e) {
        return [];
    }
}

async function exists(addr) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const bytecode = await provider.getCode(addr);
    return bytecode.length > 2;
}

async function loadExperiencesFromContract() {
    if(!(await exists(experiencesContractAddr))) {
        return undefined;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let contractABI = require("./data/experiencesContractABI.json");

    let contract = new ethers.Contract(experiencesContractAddr, contractABI, signer);
    let experiences = await contract.getExperiences();
    experiences = [...experiences];
    experiences.reverse();
    return experiences;
}

async function loadFeaturedWorkFromContract() {
    if(!(await exists(featuredWorksContractAddr))) return undefined;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let contractABI = require("./data/featuredWorksContractABI.json");

    let contract = new ethers.Contract(featuredWorksContractAddr, contractABI, signer);
    let featuredWorks = await contract.getFeaturedWorks();
    featuredWorks = [...featuredWorks];
    featuredWorks.reverse();
    return featuredWorks;
}

export {
    loadExperiencesFromContract,
    loadFeaturedWorkFromContract,
    connectedAccounts
}