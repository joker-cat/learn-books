// 取得路由變化
const changeRoute = (newRoute) => {
  let path = window.location.pathname;
  let pathSegments = path.split('/');
  let lastSegment = pathSegments[pathSegments.length - 1];
  newRoute = lastSegment;

  updateBannerTitle(newRoute);
};

// 根據路由更新banner標題
const updateBannerTitle = (route) => {
  let title = document.getElementById('title');
  let subTitle = document.getElementById('subTitle');

  switch (route) {
    case '/index.html':
      title.innerText = 'Learn-Connect';
      subTitle.innerText = '個性化學習體驗';
      break;
    case '/bookClub.html' || '/bookClubGroup.html' || '/member.html':
      title.innerText = 'BOOK CLUB';
      subTitle.innerText = '揪團讀書會';
      break;
    case '/Tutoring.html':
      title.innerText = 'TUTORING PLATFORM';
      subTitle.innerText = '家教社群';
      break;
    default:
      title.innerText = 'Learn-Connect';
      subTitle.innerText = '個性化學習體驗';
  }
};

// 在頁面加載時初始化banner標題
window.onload = () => {
  changeRoute();
};