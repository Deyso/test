self.addEventListener("push", (e) => {
    const data = e.data.json();
    self.registration.showNotification(data.title, {
      body: "Some notifaction what we can display on the screen",
      icon: "https://pbs.twimg.com/profile_images/1392386133032587264/R_8kcRAL_400x400.png",
    });
  });
  