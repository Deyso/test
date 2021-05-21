let keys = document.querySelector(".keys");

const publicVapidKey =
  "BH64DqelDX9QUGQKB_cUAVIn5lIT5_tS0J3_hgzUD4n0IfMhOVBg3TIesiijU-Y7COJAKpPdeaQQ4wCv-RKRJ48";

let btn = document.querySelector(".click-btn");
let date = new Date();
btn.innerHTML = `Click on me`;
btn.addEventListener("click", () => {
  if ("serviceWorker" in navigator) {
    send().catch((err) => console.log(err));
  }
  console.log("hello world");
});

// setTimeout(send, 4000);

async function send() {
  console.log("Registering service worker...");
  const register = await navigator.serviceWorker.register("./worker.js");

  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  });
  keys.innerHTML = JSON.stringify(subscription);
  console.log(JSON.stringify(subscription));
  let f = { hello: "valami", ki: 444 };
  f = JSON.stringify(f);

  await fetch("http://192.168.1.79:5000/subscribe", {
    mode: "no-cors",
    method: "POST",
    body: JSON.stringify(f),
    headers: {
      "content-type": "application/json",
    },
  });
}
fetch("https://raw.githubusercontent.com/Deyso/test/master/try.json")
  .then((res) => res.json())
  .then((text) => {
    console.log(text);
  });

// this.loading = false;
console.log(this.plates);

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
