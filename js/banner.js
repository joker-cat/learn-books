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
  let smallTag = document.querySelectorAll('.textGroup > small');
  console.log(route);
  switch (route) {
    case '/index.html':
      title.innerText = 'Learn-Connect';
      subTitle.innerText = '個性化學習體驗';
      break;


    case 'bookClub.html':
      title.innerText = 'BOOK CLUB';
      subTitle.innerText = '揪團讀書會';
      rendering([...smallTag], title.textContent);

      break;
    case 'Tutoring.html':
      title.innerText = 'TUTORING PLATFORM';
      subTitle.innerText = '家教社群';
      rendering([...smallTag], title.textContent);
      break;

    case 'member.html':
      title.innerText = 'PORTFOLIO';
      subTitle.innerText = '個人檔案';
      rendering([...smallTag], title.textContent);
      break;
    case 'memberBook.html' || 'memberTeacher.html':
      title.innerText = 'MEMBER';
      subTitle.innerText = '會員中心';
      rendering([...smallTag], title.textContent);
      break;
    case 'memberTeacher.html':
      title.innerText = 'MEMBER';
      subTitle.innerText = '會員中心';
      rendering([...smallTag], title.textContent);
      break;
    default:
      title.innerText = '預設';
      subTitle.innerText = 'NONE';
      rendering([...smallTag], title.textContent);
  }
};

function rendering(arr, str) {
  arr.map(e => e.textContent = str);
}

// 在頁面加載時初始化banner標題
window.onload = () => {
  changeRoute();
};