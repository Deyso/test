const publicVapidKey =
  "BH64DqelDX9QUGQKB_cUAVIn5lIT5_tS0J3_hgzUD4n0IfMhOVBg3TIesiijU-Y7COJAKpPdeaQQ4wCv-RKRJ48";

let btn = document.querySelector(".click-btn");
btn.addEventListener("click", () => {
  if ("serviceWorker" in navigator) {
    send().catch((err) => console.log(err));
  }
  console.log("hello world");
});

// setTimeout(send, 4000);

async function send() {
  console.log("Registering service worker...");
  const register = await navigator.serviceWorker.register("/worker.js");

  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  });

  await fetch("/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json",
    },
  });
}

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