/* ========================================
   1. 기본 유틸리티
======================================== */

function getElement(id) {
  return document.getElementById(id);
}

function createElement(tag, className = "") {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  return element;
}


/* ========================================
   2. 메인 화면
======================================== */

const heroDescription = getElement("heroDescription");

if (heroDescription && profileData.hero) {
  heroDescription.textContent = profileData.hero.description;
}


/* ========================================
   3. 통계 카드
======================================== */

const statsGrid = getElement("statsGrid");

if (statsGrid && Array.isArray(profileData.stats)) {
  statsGrid.innerHTML = "";

  profileData.stats.forEach((stat) => {
    const card = createElement("div", "stat-card");

    card.innerHTML = `
      <strong>${stat.number}</strong>
      <span>${stat.label}</span>
    `;

    statsGrid.appendChild(card);
  });
}


/* ========================================
   4. 강사 소개
======================================== */

const aboutText = getElement("aboutText");

if (aboutText) {
  aboutText.textContent = profileData.about || "";
}


function renderSimpleList(targetId, items = []) {
  const target = getElement(targetId);

  if (!target) {
    return;
  }

  target.innerHTML = "";

  items.forEach((item) => {
    const p = createElement("p", "simple-item");
    p.textContent = "• " + item;
    target.appendChild(p);
  });
}


renderSimpleList(
  "educationList",
  profileData.education
);

renderSimpleList(
  "positionList",
  profileData.positions
);

renderSimpleList(
  "targetList",
  profileData.targets
);


/* 연락처 요약 */

const contactSummary = getElement("contactSummary");

if (contactSummary && profileData.contact) {
  contactSummary.innerHTML = `
    <p>📞 ${profileData.contact.phone}</p>
    <p>💌 ${profileData.contact.email}</p>
    <p>📍 ${profileData.contact.location}</p>
  `;
}


/* ========================================
   5. 전문 분야
======================================== */

const expertiseGroups = getElement("expertiseGroups");

if (
  expertiseGroups &&
  Array.isArray(profileData.expertise)
) {
  expertiseGroups.innerHTML = "";

  profileData.expertise.forEach((group) => {
    const wrapper = createElement(
      "div",
      "expertise-group"
    );

    const title = createElement("h3");
    title.textContent = group.title;

    const tags = createElement(
      "div",
      "tag-container"
    );

    group.items.forEach((item, index) => {
  const tag = createElement("span", "tag");

  tag.textContent = item;

  if (
    group.title === "생성형 AI · 업무 효율화" &&
    index === 0
  ) {
    tag.classList.add("active");
  }

  tag.addEventListener("click", () => {

    document
      .querySelectorAll(".expertise-group .tag")
      .forEach((otherTag) => {
        otherTag.classList.remove("active");
      });

    tag.classList.add("active");

  });

  tags.appendChild(tag);
});

    wrapper.appendChild(title);
    wrapper.appendChild(tags);

    expertiseGroups.appendChild(wrapper);
  });
}


/* ========================================
   6. 주요 경력
======================================== */

const careerTimeline = getElement("careerTimeline");

if (
  careerTimeline &&
  Array.isArray(profileData.career)
) {
  careerTimeline.innerHTML = "";

  profileData.career.forEach((item) => {
    const timelineItem = createElement(
      "div",
      "timeline-item"
    );

    timelineItem.innerHTML = `
      <span class="timeline-dot"></span>

      <div>
        <strong class="timeline-date">
          ${item.date}
        </strong>

        <p>${item.title}</p>
      </div>
    `;

    careerTimeline.appendChild(timelineItem);
  });
}


/* ========================================
   7. 자격 및 전문성
======================================== */

const certificateTags =
  getElement("certificateTags");

if (
  certificateTags &&
  Array.isArray(profileData.certificates)
) {
  certificateTags.innerHTML = "";

  const highlightedCertificates = [
    "Google 공인 교육전문가 Level 1",
    "Google 공인 교육전문가 Level 2",
    "Google TSA (Trainer Skills Assessment)",
    "Gemini 공인 교육전문가",
    "Claude101 1급",
    "뤼튼AI교육컨설턴트",
    "캔바 디지털콘텐츠강사 2급"
  ];

  profileData.certificates.forEach((item) => {

    const tag = createElement(
      "span",
      "certificate-tag"
    );

    tag.textContent = item;

    if (highlightedCertificates.includes(item)) {
      tag.classList.add("certificate-highlight");
    }

    certificateTags.appendChild(tag);
  });
}  

/* ========================================
   8. 저서 및 연구 활동
======================================== */

const bookList = getElement("bookList");

if (
  bookList &&
  Array.isArray(profileData.books)
) {
  bookList.innerHTML = "";

  profileData.books.forEach((book) => {
    const card = createElement(
      "div",
      "book-card"
    );

    card.innerHTML = `
      <strong>${book.year}</strong>
      <span>${book.title}</span>
    `;

    bookList.appendChild(card);
  });
}


/* ========================================
   9. 수상 및 공공기관 참여 활동
======================================== */

const awardTags = getElement("awardTags");

if (
  awardTags &&
  Array.isArray(profileData.awards)
) {
  awardTags.innerHTML = "";

  profileData.awards.forEach((item) => {
    const tag = createElement(
      "span",
      "tag award-tag"
    );

    tag.textContent = item;

    awardTags.appendChild(tag);
  });
}


/* ========================================
   10. 출강 이력 렌더링
======================================== */

function renderLectureGroups(
  targetId,
  groups = []
) {
  const target = getElement(targetId);

  if (!target) {
    return;
  }

  target.innerHTML = "";

  groups.forEach((group) => {
    const groupBox = createElement(
      "div",
      "lecture-group"
    );

    const categoryTitle = createElement(
      "h3",
      "lecture-category"
    );

    categoryTitle.textContent =
      `${group.icon} ${group.category}`;

    groupBox.appendChild(categoryTitle);


    group.items.forEach((item) => {
      const card = createElement(
        "div",
        "lecture-card"
      );

     card.innerHTML = `
       <strong>${item.organization}</strong>
       <span class="lecture-divider">—</span>
       <span class="lecture-title">${item.title}</span>
    `;

      groupBox.appendChild(card);
    });

    target.appendChild(groupBox);
  });
}


/* 직접 강의 */

renderLectureGroups(
  "lectureGroups",
  profileData.lectures
);


/* 교육지원 */

renderLectureGroups(
  "supportGroups",
  profileData.supportLectures
);


/* ========================================
   11. 강의 문의 연락처 카드
======================================== */

const contactCards = getElement("contactCards");

if (
  contactCards &&
  profileData.contact
) {
  contactCards.innerHTML = "";

  const contactData = [
    {
      label: "EMAIL",
      value: profileData.contact.email
    },
    {
      label: "PHONE",
      value: profileData.contact.phone
    },
    {
      label: "LOCATION",
      value: profileData.contact.location
    },
    {
      label: "소속",
      value: profileData.contact.affiliation
    }
  ];


  contactData.forEach((item) => {
    const card = createElement(
      "div",
      "contact-card"
    );

    card.innerHTML = `
      <strong>${item.label}</strong>
      <p>${item.value}</p>
    `;

    contactCards.appendChild(card);
  });
}


/* ========================================
   12. 방명록
   현재 브라우저에 저장되는 방식
======================================== */

const guestSubmit = getElement("guestSubmit");
const guestbookList = getElement("guestbookList");


function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}


const GUESTBOOK_URL =
  "https://script.google.com/macros/s/AKfycbyWTYT4ZgbOCeUFsjwlqwaEygXSrwztBIz1393N9j0th3qOrRjuFjPlNwbtHOhXMC1_AA/exec";

function loadGuestbook() {
  if (!guestbookList) {
    return;
  }

  guestbookList.innerHTML = `
    <p class="guest-empty">
      방명록을 불러오는 중입니다...
    </p>
  `;

  const callbackName =
    "handleGuestbookData";

  window[callbackName] = function(messages) {

    guestbookList.innerHTML = "";

    if (
      !Array.isArray(messages) ||
      messages.length === 0
    ) {
      guestbookList.innerHTML = `
        <p class="guest-empty">
          아직 방명록이 없습니다.<br>
          첫 번째로 메시지를 남겨보세요! 🙌
        </p>
      `;

      return;
    }

    messages
      .slice()
      .reverse()
      .forEach((item) => {

        const card = createElement(
          "div",
          "guest-card"
        );

        let displayDate = "";

        if (item.date) {
          const date =
            new Date(item.date);

          displayDate =
            date.toLocaleDateString(
              "ko-KR",
              {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
              }
            );
        }

        const myMessages =
  JSON.parse(
    localStorage.getItem(
      "kimInokGuestbookOwnerKeys"
    ) || "{}"
  );

const isMine =
  item.id &&
  myMessages[item.id];

card.innerHTML = `
  <strong>
    ${escapeHtml(item.name)}
  </strong>

  <p>
    ${escapeHtml(item.message)}
  </p>

  <div class="guest-card-bottom">
    <span>
      ${escapeHtml(displayDate)}
    </span>

    ${
      isMine
        ? `<button
             class="guest-delete-btn"
             type="button"
           >
             삭제
           </button>`
        : ""
    }
  </div>
`;

if (isMine) {
  const deleteButton =
    card.querySelector(
      ".guest-delete-btn"
    );

  deleteButton.addEventListener(
    "click",
    async () => {

      const confirmed =
        confirm(
          "이 방명록을 삭제하시겠습니까?"
        );

      if (!confirmed) {
        return;
      }

      deleteButton.disabled = true;
      deleteButton.textContent =
        "삭제 중...";

      try {
        await fetch(
          GUESTBOOK_URL,
          {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type":
                "text/plain;charset=utf-8"
            },
            body: JSON.stringify({
              action: "delete",
              id: item.id,
              deleteKey:
                myMessages[item.id]
            })
          }
        );

        delete myMessages[item.id];

        localStorage.setItem(
          "kimInokGuestbookOwnerKeys",
          JSON.stringify(myMessages)
        );

        setTimeout(() => {
          loadGuestbook();
        }, 800);

      } catch (error) {
        console.error(
          "방명록 삭제 오류:",
          error
        );

        alert(
          "방명록 삭제 중 오류가 발생했습니다."
        );

        deleteButton.disabled = false;
        deleteButton.textContent =
          "삭제";
      }
    }
  );
}
        guestbookList.appendChild(card);
      });
  };

  const script =
    document.createElement("script");

  script.src =
    GUESTBOOK_URL +
    "?callback=" +
    callbackName +
    "&t=" +
    Date.now();

  script.onerror = function() {
    guestbookList.innerHTML = `
      <p class="guest-empty">
        방명록을 불러오지 못했습니다.
      </p>
    `;
  };

  document.body.appendChild(script);
}


if (guestSubmit) {
  guestSubmit.addEventListener(
    "click",
    async () => {

      const nameInput =
        getElement("guestName");

      const messageInput =
        getElement("guestMessage");

      const name =
        nameInput.value.trim();

      const message =
        messageInput.value.trim();

      if (!name) {
        alert("이름을 입력해주세요.");
        nameInput.focus();
        return;
      }

      if (!message) {
        alert("메시지를 입력해주세요.");
        messageInput.focus();
        return;
      }

      const id =
        crypto.randomUUID();

      const deleteKey =
        crypto.randomUUID();

      guestSubmit.disabled = true;
      guestSubmit.textContent = "등록 중...";

      try {
        await fetch(
          GUESTBOOK_URL,
          {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type":
                "text/plain;charset=utf-8"
            },
            body: JSON.stringify({
              action: "add",
              name: name,
              message: message,
              id: id,
              deleteKey: deleteKey
            })
          }
        );

        /*
          이 브라우저가 작성한 글의
          ID와 삭제키를 저장
        */
        const myMessages =
          JSON.parse(
            localStorage.getItem(
              "kimInokGuestbookOwnerKeys"
            ) || "{}"
          );

        myMessages[id] =
          deleteKey;

        localStorage.setItem(
          "kimInokGuestbookOwnerKeys",
          JSON.stringify(myMessages)
        );

        nameInput.value = "";
        messageInput.value = "";

        alert("방명록이 등록되었습니다.");

        setTimeout(() => {
          loadGuestbook();
        }, 800);

      } catch (error) {
        console.error(
          "방명록 등록 오류:",
          error
        );

        alert(
          "방명록 등록 중 오류가 발생했습니다."
        );

      } finally {
        guestSubmit.disabled = false;
        guestSubmit.textContent = "등록";
      }
    }
  );
}

loadGuestbook();





/* ========================================
   13. 테마 전환
   다크 ↔ 라이트
======================================== */

/*
  index.html에 themeToggle 버튼이 있으면
  자동으로 동작합니다.

  아직 버튼이 없더라도 오류가 나지 않습니다.
*/

const themeToggle =
  getElement("themeToggle");


const THEME_KEY =
  "kimInokHomepageTheme";


function applyTheme(theme) {
  const root =
    document.documentElement;

  if (theme === "light") {
    root.setAttribute(
      "data-theme",
      "light"
    );

    if (themeToggle) {
      themeToggle.textContent = "☀️";
      themeToggle.setAttribute(
        "aria-label",
        "다크 테마로 전환"
      );

      themeToggle.setAttribute(
        "title",
        "테마 전환"
      );
    }
  } else {
    root.setAttribute(
      "data-theme",
      "dark"
    );

    if (themeToggle) {
      themeToggle.textContent = "🌙";

      themeToggle.setAttribute(
        "aria-label",
        "라이트 테마로 전환"
      );

      themeToggle.setAttribute(
        "title",
        "테마 전환"
      );
    }
  }
}


/* 이전에 선택한 테마 확인 */

let savedTheme =
  localStorage.getItem(THEME_KEY);


/*
  처음 방문했을 때 저장된 값이 없다면
  기본값은 다크 모드
*/

if (
  savedTheme !== "light" &&
  savedTheme !== "dark"
) {
  savedTheme = "dark";
}


applyTheme(savedTheme);


/* 테마 버튼 클릭 */

if (themeToggle) {
  themeToggle.addEventListener(
    "click",
    () => {
      const currentTheme =
        document.documentElement
          .getAttribute("data-theme");


      const nextTheme =
        currentTheme === "light"
          ? "dark"
          : "light";


      localStorage.setItem(
        THEME_KEY,
        nextTheme
      );


      applyTheme(nextTheme);
    }
  );
}


/* ========================================
   14. 메뉴 클릭 시 부드러운 이동
======================================== */

document
  .querySelectorAll(
    'a[href^="#"]'
  )
  .forEach((link) => {
    link.addEventListener(
      "click",
      (event) => {
        const href =
          link.getAttribute("href");

        if (
          !href ||
          href === "#"
        ) {
          return;
        }

        const target =
          document.querySelector(href);

        if (!target) {
          return;
        }

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    );
  });