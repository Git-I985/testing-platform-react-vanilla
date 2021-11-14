import SimpleCrypto from "simple-crypto-js"
const {secretKey, encodedData} = JSON.parse(window.opener.data);
const crypter = new SimpleCrypto(secretKey)
const decodedData = crypter.decrypt(encodedData)
document.body.innerHTML = `<pre>${JSON.stringify(decodedData)}</pre>`;
