self.addEventListener("push", (e) => {
  const data = e.data.json();
  self.registration.showNotification(data.title, {
    body: "Content what we can show",
    icon: "https://scontent-vie1-1.xx.fbcdn.net/v/t1.6435-9/117242560_1192269644458788_2099530831760913120_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=SdQ1xPehQHkAX9J-wsD&_nc_ht=scontent-vie1-1.xx&oh=296d3845792ea3d501b4630a0e64ef6b&oe=60CBF14B",
  });
});
