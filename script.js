let provider;
let signer;
let contract;

const contractAddress = "0x95aE137B6e8560F53d46dc518ac3dCFbacE5aBE4"; // Replace with your deployed contract address

const abi = [
  "function register(string,bytes32)",
  "function login(string,bytes32) view returns (bool)"
];

document.getElementById("connect").onclick = async () => {
  provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = provider.getSigner();
  contract = new ethers.Contract(contractAddress, abi, signer);

  document.getElementById("status").innerText = "MetaMask Connected";
};

document.getElementById("register").onclick = async () => {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  const hash = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(pass)
  );

  const tx = await contract.register(user, hash);
  await tx.wait();

  document.getElementById("status").innerText = "Registered Successfully";
};

document.getElementById("login").onclick = async () => {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  const hash = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(pass)
  );

  const result = await contract.login(user, hash);

  document.getElementById("status").innerText =
    result ? "Login Successful" : "Login Failed";
};