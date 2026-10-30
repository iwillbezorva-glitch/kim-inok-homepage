
/* 홈페이지 경력 및 강의 이력 추가 */

profileData.career.unshift({
  date: "2026.10 ~ 현재",
  title: "영진사이버대학교 노인돌봄 생활지도사 양성과정 교수"
});

function addLecture(groups, category, entries) {
  const group = groups.find(item => item.category === category);
  if (group) {
    entries.slice().reverse().forEach(entry => {
      if (!group.items.some(item =>
        item.organization === entry.organization &&
        item.title === entry.title
      )) {
        group.items.unshift(entry);
      }
    });
  }
}

addLecture(profileData.lectures, "인문학·역사·문학", [
  {
    organization: "성남성일고등학교",
    title: "클래스리부트_에밀 졸라 「나는 고발한다」"
  }
]);

addLecture(profileData.lectures, "AI·디지털 · 대학·학교", [
  {
    organization: "오포중학교",
    title: "찾아가는 특수학급 디지털활용 프로그램 (2회)"
  },
  {
    organization: "감일고등학교",
    title: "생성형 AI 활용 나만의 브랜드 만들기 (2회)"
  },
  {
    organization: "경기도교육청 가정형 Wee센터(고양_남)",
    title: "생성형 AI 활용 콘텐츠 제작 (4회)"
  }
]);

addLecture(profileData.lectures, "AI·디지털 · 복지·시니어", [
  {
    organization: "고양시장애인종합복지관 아람장애인자립생활센터",
    title: "기초부터 천천히! AI 디지털기초 및 활용 (5회)"
  }
]);

addLecture(profileData.supportLectures, "교육청 · 대학 · 학교", [
  {
    organization: "경기도교육청남부연수원",
    title: "숙련기 중등 교장 대상 생성형 AI 활용 연수"
  },
  {
    organization: "경기도교육청남부연수원",
    title: "성숙기 중등 교감 대상 생성형 AI 활용 연수 (2회)"
  }
]);

addLecture(profileData.supportLectures, "중앙부처 · 공공기관", [
  {
    organization: "경기도소방학교",
    title: "생성형 AI 활용 심화과정"
  }
]);

addLecture(profileData.supportLectures, "농업기관", [
  {
    organization: "경기도농업기술원",
    title: "생성형 AI를 활용한 도시농업 콘텐츠 기획 및 제작"
  }
]);
