/* =========================================================
   SPORTS JOURNAL
   ========================================================= */


/* =========================================================
   STORAGE
   ========================================================= */

const STORAGE_KEY = "sportsJournalArticles";

const BACKUPS_KEY = "sportsJournalAutomaticBackups";

const MAX_AUTOMATIC_BACKUPS = 16;


/*
  Older possible storage names.

  We keep these only so future code changes have a better
  chance of recovering older data.
*/
const LEGACY_STORAGE_KEYS = [
  "sportsArticles",
  "sports-journal-articles",
  "sports-platform-articles",
  "articles"
];


/* =========================================================
   STATE
   ========================================================= */

let articles = loadArticles();

let activeSport = "all";

let searchTerm = "";

let currentReaderArticleId = null;

let pendingDeleteArticleId = null;

let pendingRestore = null;

let toastTimeout = null;


/* =========================================================
   DOM
   ========================================================= */

const editionDate =
  document.getElementById("editionDate");

const menuButton =
  document.getElementById("menuButton");

const sideMenu =
  document.getElementById("sideMenu");

const frontPageMenuButton =
  document.getElementById("frontPageMenuButton");

const menuWriteStoryButton =
  document.getElementById("menuWriteStoryButton");

const exportBackupButton =
  document.getElementById("exportBackupButton");

const restoreBackupButton =
  document.getElementById("restoreBackupButton");

const backupFileInput =
  document.getElementById("backupFileInput");

const internalBackupStatus =
  document.getElementById("internalBackupStatus");

const sportFilters =
  document.querySelectorAll(".sport-filter");

const searchInput =
  document.getElementById("searchInput");

const storyCount =
  document.getElementById("storyCount");

const leadStories =
  document.getElementById("leadStories");

const latestStories =
  document.getElementById("latestStories");

const emptyStateTemplate =
  document.getElementById("emptyStateTemplate");

const openEditorButton =
  document.getElementById("openEditorButton");

const brandButton =
  document.getElementById("brandButton");

const editorModal =
  document.getElementById("editorModal");

const editorHeading =
  document.getElementById("editorHeading");

const articleForm =
  document.getElementById("articleForm");

const articleIdInput =
  document.getElementById("articleId");

const sportInput =
  document.getElementById("sportInput");

const authorInput =
  document.getElementById("authorInput");

const titleInput =
  document.getElementById("titleInput");

const summaryInput =
  document.getElementById("summaryInput");

const contentInput =
  document.getElementById("contentInput");

const imageUrlInput =
  document.getElementById("imageUrlInput");

const imageModeInput =
  document.getElementById("imageMode");

const imageModeButtons =
  document.querySelectorAll("[data-image-mode]");

const imagePreview =
  document.getElementById("imagePreview");

const imagePreviewElement =
  document.getElementById("imagePreviewElement");

const focusXInput =
  document.getElementById("focusXInput");

const focusYInput =
  document.getElementById("focusYInput");

const imageZoomInput =
  document.getElementById("imageZoomInput");

const focusXOutput =
  document.getElementById("focusXOutput");

const focusYOutput =
  document.getElementById("focusYOutput");

const zoomOutput =
  document.getElementById("zoomOutput");

const cropControls =
  document.getElementById("cropControls");

const fullImageInfo =
  document.getElementById("fullImageInfo");

const resetImageButton =
  document.getElementById("resetImageButton");

const publishButtonText =
  document.getElementById("publishButtonText");

const readerModal =
  document.getElementById("readerModal");

const readerSport =
  document.getElementById("readerSport");

const readerDate =
  document.getElementById("readerDate");

const readerTitle =
  document.getElementById("readerTitle");

const readerSummary =
  document.getElementById("readerSummary");

const readerAuthor =
  document.getElementById("readerAuthor");

const readerImageContainer =
  document.getElementById("readerImageContainer");

const readerImage =
  document.getElementById("readerImage");

const readerBody =
  document.getElementById("readerBody");

const readerEditButton =
  document.getElementById("readerEditButton");

const readerDeleteButton =
  document.getElementById("readerDeleteButton");

const confirmModal =
  document.getElementById("confirmModal");

const confirmDeleteButton =
  document.getElementById("confirmDeleteButton");

const restoreModal =
  document.getElementById("restoreModal");

const restoreFileName =
  document.getElementById("restoreFileName");

const restoreStoryCount =
  document.getElementById("restoreStoryCount");

const currentStoryCount =
  document.getElementById("currentStoryCount");

const mergeBackupButton =
  document.getElementById("mergeBackupButton");

const replaceBackupButton =
  document.getElementById("replaceBackupButton");

const toast =
  document.getElementById("toast");


/* =========================================================
   INITIALIZE
   ========================================================= */

initialize();


function initialize() {
  normalizeExistingArticles();

  renderEditionDate();

  renderFrontPage();

  updateBackupStatus();

  bindEvents();
}


/* =========================================================
   STORAGE
   ========================================================= */

function loadArticles() {
  const primaryData =
    readJsonFromStorage(STORAGE_KEY);


  if (Array.isArray(primaryData)) {
    return primaryData;
  }


  /*
    Try legacy keys.
  */
  for (const key of LEGACY_STORAGE_KEYS) {
    const legacyData =
      readJsonFromStorage(key);


    if (Array.isArray(legacyData)) {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(legacyData)
        );
      } catch (error) {
        console.error(
          "Could not migrate old storage:",
          error
        );
      }


      return legacyData;
    }
  }


  /*
    If the main storage is unreadable but automatic
    backups still exist, recover the newest snapshot.
  */
  const backups =
    loadInternalBackups();


  if (backups.length > 0) {
    const newestBackup = backups[0];


    if (Array.isArray(newestBackup.articles)) {
      return newestBackup.articles;
    }
  }


  return [];
}


function persistArticles() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(articles)
    );

    return true;
  } catch (error) {
    console.error(
      "Could not save articles:",
      error
    );

    showToast(
      "COULD NOT SAVE. EXPORT A BACKUP BEFORE CONTINUING."
    );

    return false;
  }
}


function readJsonFromStorage(key) {
  const raw =
    localStorage.getItem(key);


  if (!raw) {
    return null;
  }


  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error(
      `Could not parse ${key}:`,
      error
    );

    return null;
  }
}


/* =========================================================
   AUTOMATIC INTERNAL BACKUPS
   ========================================================= */

function loadInternalBackups() {
  const saved =
    readJsonFromStorage(BACKUPS_KEY);


  if (!Array.isArray(saved)) {
    return [];
  }


  return saved
    .filter((backup) => {
      return (
        backup &&
        Array.isArray(backup.articles)
      );
    })
    .sort((a, b) => {
      return (
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
      );
    });
}


function createInternalBackup(
  reason,
  sourceArticles = articles
) {
  const backup = {
    id: createArticleId(),
    createdAt: new Date().toISOString(),
    reason,
    articles: cloneArticles(sourceArticles)
  };


  const backups =
    loadInternalBackups();


  backups.unshift(backup);


  const trimmedBackups =
    backups.slice(
      0,
      MAX_AUTOMATIC_BACKUPS
    );


  try {
    localStorage.setItem(
      BACKUPS_KEY,
      JSON.stringify(trimmedBackups)
    );

    updateBackupStatus();

    return true;
  } catch (error) {
    console.error(
      "Could not create automatic backup:",
      error
    );

    return false;
  }
}


function cloneArticles(sourceArticles) {
  return JSON.parse(
    JSON.stringify(sourceArticles)
  );
}


function updateBackupStatus() {
  const backups =
    loadInternalBackups();


  if (backups.length === 0) {
    internalBackupStatus.textContent =
      "NO BACKUP YET";

    return;
  }


  const latest =
    backups[0];


  const date =
    new Date(latest.createdAt);


  if (Number.isNaN(date.getTime())) {
    internalBackupStatus.textContent =
      `${backups.length} LOCAL SNAPSHOTS`;

    return;
  }


  internalBackupStatus.textContent =
    `${backups.length} SNAPSHOTS · ${formatBackupTime(date)}`;
}


/* =========================================================
   NORMALIZE ARTICLES
   ========================================================= */

function normalizeExistingArticles() {
  let changed = false;


  articles = articles.map((article) => {
    const normalized =
      normalizeArticle(article);


    if (
      JSON.stringify(normalized) !==
      JSON.stringify(article)
    ) {
      changed = true;
    }


    return normalized;
  });


  if (changed) {
    persistArticles();
  }
}


function normalizeArticle(article) {
  const safeArticle =
    article &&
    typeof article === "object"
      ? { ...article }
      : {};


  const validSports = [
    "football",
    "tennis",
    "baseball",
    "basketball"
  ];


  if (!safeArticle.id) {
    safeArticle.id =
      createArticleId();
  }


  if (
    !validSports.includes(
      safeArticle.sport
    )
  ) {
    safeArticle.sport =
      "football";
  }


  safeArticle.title =
    String(
      safeArticle.title || "UNTITLED STORY"
    );


  safeArticle.author =
    String(
      safeArticle.author || "SPORTS JOURNAL"
    );


  safeArticle.summary =
    String(
      safeArticle.summary || ""
    );


  safeArticle.content =
    String(
      safeArticle.content || ""
    );


  safeArticle.imageUrl =
    String(
      safeArticle.imageUrl || ""
    );


  if (!safeArticle.imageMode) {
    safeArticle.imageMode =
      "crop";
  }


  safeArticle.imageMode =
    safeArticle.imageMode === "full"
      ? "full"
      : "crop";


  if (!safeArticle.imagePosition) {
    safeArticle.imagePosition =
      "50% 50%";
  }


  safeArticle.imageZoom =
    normalizeZoom(
      safeArticle.imageZoom
    );


  if (!safeArticle.createdAt) {
    safeArticle.createdAt =
      new Date().toISOString();
  }


  return safeArticle;
}


/* =========================================================
   EVENTS
   ========================================================= */

function bindEvents() {

  /* MENU */

  menuButton.addEventListener(
    "click",
    openSideMenu
  );


  document
    .querySelectorAll("[data-close-menu]")
    .forEach((button) => {
      button.addEventListener(
        "click",
        closeSideMenu
      );
    });


  frontPageMenuButton.addEventListener(
    "click",
    () => {
      closeSideMenu();

      goToFrontPage();
    }
  );


  menuWriteStoryButton.addEventListener(
    "click",
    () => {
      closeSideMenu();

      openEditor();
    }
  );


  exportBackupButton.addEventListener(
    "click",
    exportJournalBackup
  );


  restoreBackupButton.addEventListener(
    "click",
    () => {
      closeSideMenu();

      backupFileInput.click();
    }
  );


  backupFileInput.addEventListener(
    "change",
    handleBackupFileSelection
  );


  /* MAIN HEADER */

  openEditorButton.addEventListener(
    "click",
    () => {
      openEditor();
    }
  );


  brandButton.addEventListener(
    "click",
    (event) => {
      event.preventDefault();

      goToFrontPage();
    }
  );


  /* FILTERS */

  sportFilters.forEach((button) => {
    button.addEventListener(
      "click",
      () => {
        activeSport =
          button.dataset.sport;

        updateActiveSportButton();

        renderFrontPage();
      }
    );
  });


  searchInput.addEventListener(
    "input",
    () => {
      searchTerm =
        searchInput.value
          .trim()
          .toLowerCase();

      renderFrontPage();
    }
  );


  /* EDITOR CLOSE */

  document
    .querySelectorAll("[data-close-editor]")
    .forEach((button) => {
      button.addEventListener(
        "click",
        closeEditor
      );
    });


  /* READER CLOSE */

  document
    .querySelectorAll("[data-close-reader]")
    .forEach((button) => {
      button.addEventListener(
        "click",
        closeReader
      );
    });


  /* DELETE CLOSE */

  document
    .querySelectorAll("[data-close-confirm]")
    .forEach((button) => {
      button.addEventListener(
        "click",
        closeConfirmModal
      );
    });


  /* RESTORE CLOSE */

  document
    .querySelectorAll("[data-close-restore]")
    .forEach((button) => {
      button.addEventListener(
        "click",
        closeRestoreModal
      );
    });


  /* IMAGE */

  imageUrlInput.addEventListener(
    "input",
    updateImagePreview
  );


  imageModeButtons.forEach((button) => {
    button.addEventListener(
      "click",
      () => {
        setImageMode(
          button.dataset.imageMode
        );
      }
    );
  });


  focusXInput.addEventListener(
    "input",
    updateImagePreview
  );


  focusYInput.addEventListener(
    "input",
    updateImagePreview
  );


  imageZoomInput.addEventListener(
    "input",
    updateImagePreview
  );


  resetImageButton.addEventListener(
    "click",
    () => {
      focusXInput.value = 50;

      focusYInput.value = 50;

      imageZoomInput.value = 100;

      updateImagePreview();
    }
  );


  /* STORY SUBMIT */

  articleForm.addEventListener(
    "submit",
    handleArticleSubmit
  );


  /* READER ACTIONS */

  readerEditButton.addEventListener(
    "click",
    () => {
      if (!currentReaderArticleId) {
        return;
      }


      const articleId =
        currentReaderArticleId;


      closeReader();

      openEditor(articleId);
    }
  );


  readerDeleteButton.addEventListener(
    "click",
    () => {
      if (!currentReaderArticleId) {
        return;
      }


      openDeleteConfirmation(
        currentReaderArticleId
      );
    }
  );


  confirmDeleteButton.addEventListener(
    "click",
    permanentlyDeleteArticle
  );


  /* RESTORE ACTIONS */

  mergeBackupButton.addEventListener(
    "click",
    mergePendingBackup
  );


  replaceBackupButton.addEventListener(
    "click",
    replaceWithPendingBackup
  );


  /* ESC */

  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key !== "Escape") {
        return;
      }


      if (
        restoreModal.classList.contains(
          "open"
        )
      ) {
        closeRestoreModal();

        return;
      }


      if (
        confirmModal.classList.contains(
          "open"
        )
      ) {
        closeConfirmModal();

        return;
      }


      if (
        editorModal.classList.contains(
          "open"
        )
      ) {
        closeEditor();

        return;
      }


      if (
        readerModal.classList.contains(
          "open"
        )
      ) {
        closeReader();

        return;
      }


      if (
        sideMenu.classList.contains(
          "open"
        )
      ) {
        closeSideMenu();
      }
    }
  );
}


/* =========================================================
   FRONT PAGE NAVIGATION
   ========================================================= */

function goToFrontPage() {
  activeSport = "all";

  searchTerm = "";

  searchInput.value = "";

  updateActiveSportButton();

  renderFrontPage();


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =========================================================
   SIDE MENU
   ========================================================= */

function openSideMenu() {
  sideMenu.classList.add("open");

  sideMenu.setAttribute(
    "aria-hidden",
    "false"
  );

  updateBackupStatus();

  syncBodyScrollState();
}


function closeSideMenu() {
  sideMenu.classList.remove("open");

  sideMenu.setAttribute(
    "aria-hidden",
    "true"
  );

  syncBodyScrollState();
}


/* =========================================================
   FILTERING
   ========================================================= */

function getFilteredArticles() {
  return [...articles]
    .filter((article) => {

      if (
        activeSport !== "all" &&
        article.sport !== activeSport
      ) {
        return false;
      }


      if (!searchTerm) {
        return true;
      }


      const searchableText = [
        article.title,
        article.sport,
        article.author,
        article.summary,
        article.content
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();


      return searchableText.includes(
        searchTerm
      );
    })
    .sort(sortArticlesNewestFirst);
}


function sortArticlesNewestFirst(
  a,
  b
) {
  const aDate =
    new Date(
      a.createdAt ||
      a.updatedAt ||
      0
    ).getTime();


  const bDate =
    new Date(
      b.createdAt ||
      b.updatedAt ||
      0
    ).getTime();


  return bDate - aDate;
}


/* =========================================================
   FRONT PAGE RENDER
   ========================================================= */

function renderFrontPage() {
  const filteredArticles =
    getFilteredArticles();


  storyCount.textContent =
    `${filteredArticles.length} ` +
    `${filteredArticles.length === 1
      ? "STORY"
      : "STORIES"}`;


  leadStories.innerHTML = "";

  latestStories.innerHTML = "";


  if (
    filteredArticles.length === 0
  ) {
    leadStories.appendChild(
      emptyStateTemplate
        .content
        .cloneNode(true)
    );

    return;
  }


  const leadArticle =
    filteredArticles[0];


  const secondaryArticles =
    filteredArticles.slice(
      1,
      3
    );


  const latestArticles =
    filteredArticles.slice(3);


  renderPrimaryLead(
    leadArticle
  );


  renderSecondaryLeads(
    secondaryArticles
  );


  renderLatestStories(
    latestArticles
  );
}


/* =========================================================
   PRIMARY LEAD
   ========================================================= */

function renderPrimaryLead(article) {
  const wrapper =
    document.createElement("div");


  wrapper.className =
    "lead-primary";


  const imageFrame =
    document.createElement("div");


  const imageMode =
    getArticleImageMode(article);


  imageFrame.className =
    `lead-image-frame ${imageMode}`;


  if (article.imageUrl) {
    const image =
      document.createElement("img");


    image.src =
      article.imageUrl;


    image.alt =
      article.title;


    if (
      imageMode === "crop"
    ) {
      const position =
        parseImagePosition(
          article.imagePosition
        );


      const zoom =
        normalizeZoom(
          article.imageZoom
        );


      image.style.objectPosition =
        `${position.x}% ${position.y}%`;


      image.style.transform =
        `scale(${zoom / 100})`;
    } else {
      image.style.objectPosition =
        "center";


      image.style.transform =
        "none";
    }


    image.addEventListener(
      "error",
      () => {
        imageFrame.innerHTML = "";

        imageFrame.appendChild(
          createImagePlaceholder()
        );
      }
    );


    imageFrame.appendChild(
      image
    );
  } else {
    imageFrame.appendChild(
      createImagePlaceholder()
    );
  }


  const copy =
    document.createElement("div");


  copy.className =
    "lead-copy";


  const storyIndex =
    document.createElement("div");


  storyIndex.className =
    "story-index";


  storyIndex.textContent =
    "01";


  const sport =
    document.createElement("div");


  sport.className =
    "story-sport";


  sport.textContent =
    article.sport;


  const title =
    document.createElement("h2");


  title.className =
    "lead-title";


  title.textContent =
    article.title;


  const summary =
    document.createElement("p");


  summary.className =
    "lead-summary";


  summary.textContent =
    article.summary;


  const metadata =
    createStoryMetadata(
      article
    );


  const readButton =
    document.createElement("button");


  readButton.className =
    "read-button";


  readButton.type =
    "button";


  readButton.textContent =
    "READ STORY →";


  readButton.addEventListener(
    "click",
    () => {
      openReader(
        article.id
      );
    }
  );


  copy.append(
    storyIndex,
    sport,
    title,
    summary,
    metadata,
    readButton
  );


  wrapper.append(
    imageFrame,
    copy
  );


  leadStories.appendChild(
    wrapper
  );
}


/* =========================================================
   SECONDARY LEADS
   ========================================================= */

function renderSecondaryLeads(
  secondaryArticles
) {
  if (
    secondaryArticles.length === 0
  ) {
    return;
  }


  const wrapper =
    document.createElement("div");


  wrapper.className =
    "secondary-leads";


  secondaryArticles.forEach(
    (article, index) => {

      const card =
        document.createElement(
          "article"
        );


      card.className =
        "secondary-story";


      card.tabIndex = 0;


      const number =
        document.createElement(
          "div"
        );


      number.className =
        "secondary-number";


      number.textContent =
        String(
          index + 2
        ).padStart(
          2,
          "0"
        );


      const sport =
        document.createElement(
          "div"
        );


      sport.className =
        "story-sport";


      sport.textContent =
        article.sport;


      const title =
        document.createElement(
          "h3"
        );


      title.textContent =
        article.title;


      const metadata =
        createStoryMetadata(
          article
        );


      card.append(
        number,
        sport,
        title,
        metadata
      );


      card.addEventListener(
        "click",
        () => {
          openReader(
            article.id
          );
        }
      );


      card.addEventListener(
        "keydown",
        (event) => {
          if (
            event.key === "Enter" ||
            event.key === " "
          ) {
            event.preventDefault();

            openReader(
              article.id
            );
          }
        }
      );


      wrapper.appendChild(
        card
      );
    }
  );


  leadStories.appendChild(
    wrapper
  );
}


/* =========================================================
   LATEST
   ========================================================= */

function renderLatestStories(
  latestArticles
) {
  if (
    latestArticles.length === 0
  ) {
    const message =
      document.createElement(
        "div"
      );


    message.className =
      "empty-state";


    message.innerHTML = `
      <span>END OF DESK</span>

      <p>
        New stories will appear here after
        the three front-page lead positions
        are filled.
      </p>
    `;


    latestStories.appendChild(
      message
    );


    return;
  }


  latestArticles.forEach(
    (article, index) => {

      const row =
        document.createElement(
          "article"
        );


      row.className =
        "latest-story";


      row.tabIndex = 0;


      const number =
        document.createElement(
          "div"
        );


      number.className =
        "latest-index";


      number.textContent =
        String(
          index + 4
        ).padStart(
          2,
          "0"
        );


      const sport =
        document.createElement(
          "div"
        );


      sport.className =
        "latest-sport";


      sport.textContent =
        article.sport;


      const title =
        document.createElement(
          "h3"
        );


      title.className =
        "latest-title";


      title.textContent =
        article.title;


      const info =
        document.createElement(
          "div"
        );


      info.className =
        "latest-info";


      const author =
        document.createElement(
          "div"
        );


      author.textContent =
        article.author;


      const date =
        document.createElement(
          "div"
        );


      date.textContent =
        formatShortDate(
          article.createdAt
        );


      info.append(
        author,
        date
      );


      row.append(
        number,
        sport,
        title,
        info
      );


      row.addEventListener(
        "click",
        () => {
          openReader(
            article.id
          );
        }
      );


      row.addEventListener(
        "keydown",
        (event) => {
          if (
            event.key === "Enter" ||
            event.key === " "
          ) {
            event.preventDefault();

            openReader(
              article.id
            );
          }
        }
      );


      latestStories.appendChild(
        row
      );
    }
  );
}


/* =========================================================
   IMAGE PLACEHOLDER
   ========================================================= */

function createImagePlaceholder() {
  const placeholder =
    document.createElement("div");


  placeholder.className =
    "lead-image-placeholder";


  const label =
    document.createElement("span");


  label.textContent =
    "NO COVER IMAGE";


  placeholder.appendChild(
    label
  );


  return placeholder;
}


/* =========================================================
   STORY METADATA
   ========================================================= */

function createStoryMetadata(
  article
) {
  const metadata =
    document.createElement(
      "div"
    );


  metadata.className =
    "story-meta";


  const author =
    document.createElement(
      "span"
    );


  author.textContent =
    `BY ${article.author}`;


  const divider =
    document.createElement(
      "span"
    );


  divider.className =
    "meta-divider";


  divider.textContent =
    "/";


  const date =
    document.createElement(
      "span"
    );


  date.textContent =
    formatShortDate(
      article.createdAt
    );


  metadata.append(
    author,
    divider,
    date
  );


  if (article.updatedAt) {
    const updateDivider =
      document.createElement(
        "span"
      );


    updateDivider.className =
      "meta-divider";


    updateDivider.textContent =
      "/";


    const updated =
      document.createElement(
        "span"
      );


    updated.textContent =
      "UPDATED";


    metadata.append(
      updateDivider,
      updated
    );
  }


  return metadata;
}


/* =========================================================
   EDITOR
   ========================================================= */

function openEditor(
  articleId = null
) {
  resetEditor();


  if (articleId) {
    const article =
      findArticle(articleId);


    if (!article) {
      return;
    }


    populateEditor(
      article
    );


    editorHeading.textContent =
      "EDIT STORY";


    publishButtonText.textContent =
      "SAVE CHANGES";
  } else {
    editorHeading.textContent =
      "NEW STORY";


    publishButtonText.textContent =
      "PUBLISH STORY";
  }


  editorModal.classList.add(
    "open"
  );


  editorModal.setAttribute(
    "aria-hidden",
    "false"
  );


  syncBodyScrollState();


  setTimeout(
    () => {
      titleInput.focus();
    },
    50
  );
}


function closeEditor() {
  editorModal.classList.remove(
    "open"
  );


  editorModal.setAttribute(
    "aria-hidden",
    "true"
  );


  syncBodyScrollState();
}


function resetEditor() {
  articleForm.reset();


  articleIdInput.value =
    "";


  focusXInput.value =
    50;


  focusYInput.value =
    50;


  imageZoomInput.value =
    100;


  setImageMode(
    "crop"
  );


  updateImagePreview();
}


function populateEditor(
  article
) {
  articleIdInput.value =
    article.id;


  sportInput.value =
    article.sport;


  authorInput.value =
    article.author || "";


  titleInput.value =
    article.title || "";


  summaryInput.value =
    article.summary || "";


  contentInput.value =
    article.content || "";


  imageUrlInput.value =
    article.imageUrl || "";


  const position =
    parseImagePosition(
      article.imagePosition
    );


  focusXInput.value =
    position.x;


  focusYInput.value =
    position.y;


  imageZoomInput.value =
    normalizeZoom(
      article.imageZoom
    );


  setImageMode(
    getArticleImageMode(
      article
    )
  );


  updateImagePreview();
}


/* =========================================================
   IMAGE MODE
   ========================================================= */

function setImageMode(mode) {
  const safeMode =
    mode === "full"
      ? "full"
      : "crop";


  imageModeInput.value =
    safeMode;


  imageModeButtons.forEach(
    (button) => {
      button.classList.toggle(
        "active",
        button.dataset.imageMode ===
          safeMode
      );
    }
  );


  const isCrop =
    safeMode === "crop";


  cropControls.classList.toggle(
    "disabled",
    !isCrop
  );


  fullImageInfo.hidden =
    isCrop;


  imagePreview.classList.toggle(
    "crop-mode",
    isCrop
  );


  imagePreview.classList.toggle(
    "full-mode",
    !isCrop
  );


  updateImagePreview();
}


/* =========================================================
   IMAGE PREVIEW
   ========================================================= */

function updateImagePreview() {
  const url =
    imageUrlInput.value.trim();


  const mode =
    imageModeInput.value;


  const focusX =
    Number(
      focusXInput.value
    );


  const focusY =
    Number(
      focusYInput.value
    );


  const zoom =
    Number(
      imageZoomInput.value
    );


  focusXOutput.value =
    `${focusX}%`;


  focusYOutput.value =
    `${focusY}%`;


  zoomOutput.value =
    `${zoom}%`;


  if (!url) {
    imagePreview.classList.remove(
      "has-image"
    );


    imagePreviewElement.removeAttribute(
      "src"
    );


    imagePreviewElement.style.transform =
      "none";


    imagePreviewElement.style.objectPosition =
      "center";


    return;
  }


  imagePreviewElement.src =
    url;


  imagePreview.classList.add(
    "has-image"
  );


  if (mode === "crop") {
    imagePreviewElement.style.objectPosition =
      `${focusX}% ${focusY}%`;


    imagePreviewElement.style.transform =
      `scale(${zoom / 100})`;
  } else {
    imagePreviewElement.style.objectPosition =
      "center";


    imagePreviewElement.style.transform =
      "none";
  }


  imagePreviewElement.onerror =
    () => {
      imagePreview.classList.remove(
        "has-image"
      );
    };


  imagePreviewElement.onload =
    () => {
      imagePreview.classList.add(
        "has-image"
      );
    };
}


/* =========================================================
   CREATE / EDIT STORY
   ========================================================= */

function handleArticleSubmit(
  event
) {
  event.preventDefault();


  const existingId =
    articleIdInput.value.trim();


  const now =
    new Date().toISOString();


  const imageMode =
    imageModeInput.value === "full"
      ? "full"
      : "crop";


  const articleData = {
    title:
      titleInput.value.trim(),

    sport:
      sportInput.value,

    author:
      authorInput.value.trim(),

    summary:
      summaryInput.value.trim(),

    content:
      contentInput.value.trim(),

    imageUrl:
      imageUrlInput.value.trim(),

    imagePosition:
      `${focusXInput.value}% ${focusYInput.value}%`,

    imageZoom:
      Number(
        imageZoomInput.value
      ),

    imageMode
  };


  /*
    Backup BEFORE changing anything.
  */
  createInternalBackup(
    existingId
      ? "Before editing story"
      : "Before publishing story"
  );


  if (existingId) {
    const articleIndex =
      articles.findIndex(
        (article) => {
          return (
            String(article.id) ===
            String(existingId)
          );
        }
      );


    if (articleIndex === -1) {
      showToast(
        "STORY COULD NOT BE FOUND."
      );

      return;
    }


    articles[articleIndex] = {
      ...articles[articleIndex],
      ...articleData,
      updatedAt: now
    };


    if (!persistArticles()) {
      return;
    }


    createInternalBackup(
      "After editing story"
    );


    showToast(
      "STORY UPDATED + BACKUP CREATED."
    );
  } else {
    const article = {
      id:
        createArticleId(),

      ...articleData,

      createdAt: now
    };


    articles.unshift(
      article
    );


    if (!persistArticles()) {
      return;
    }


    createInternalBackup(
      "After publishing story"
    );


    showToast(
      "STORY PUBLISHED + BACKUP CREATED."
    );
  }


  closeEditor();

  renderFrontPage();

  updateBackupStatus();
}


/* =========================================================
   READER
   ========================================================= */

function openReader(
  articleId
) {
  const article =
    findArticle(articleId);


  if (!article) {
    return;
  }


  currentReaderArticleId =
    article.id;


  readerSport.textContent =
    article.sport.toUpperCase();


  readerDate.textContent =
    formatFullDate(
      article.createdAt
    );


  readerTitle.textContent =
    article.title;


  readerSummary.textContent =
    article.summary;


  readerAuthor.textContent =
    article.author;


  /*
    Reader always uses the natural image proportion.
  */
  if (article.imageUrl) {
    readerImageContainer
      .classList
      .remove("hidden");


    readerImage.src =
      article.imageUrl;


    readerImage.alt =
      article.title;


    readerImage.onerror =
      () => {
        readerImageContainer
          .classList
          .add("hidden");
      };
  } else {
    readerImageContainer
      .classList
      .add("hidden");


    readerImage.removeAttribute(
      "src"
    );
  }


  renderReaderContent(
    article.content
  );


  readerModal.classList.add(
    "open"
  );


  readerModal.setAttribute(
    "aria-hidden",
    "false"
  );


  syncBodyScrollState();

  readerPanelScrollTop();
}


function closeReader() {
  readerModal.classList.remove(
    "open"
  );


  readerModal.setAttribute(
    "aria-hidden",
    "true"
  );


  currentReaderArticleId =
    null;


  syncBodyScrollState();
}


function renderReaderContent(
  content
) {
  readerBody.innerHTML =
    "";


  const paragraphs =
    content
      .split(/\n\s*\n|\n/)
      .map((paragraph) => {
        return paragraph.trim();
      })
      .filter(Boolean);


  paragraphs.forEach(
    (text) => {
      const paragraph =
        document.createElement(
          "p"
        );


      paragraph.textContent =
        text;


      readerBody.appendChild(
        paragraph
      );
    }
  );
}


function readerPanelScrollTop() {
  const panel =
    readerModal.querySelector(
      ".reader-panel"
    );


  if (panel) {
    panel.scrollTop = 0;
  }
}


/* =========================================================
   DELETE
   ========================================================= */

function openDeleteConfirmation(
  articleId
) {
  pendingDeleteArticleId =
    articleId;


  confirmModal.classList.add(
    "open"
  );


  confirmModal.setAttribute(
    "aria-hidden",
    "false"
  );


  syncBodyScrollState();
}


function closeConfirmModal() {
  confirmModal.classList.remove(
    "open"
  );


  confirmModal.setAttribute(
    "aria-hidden",
    "true"
  );


  pendingDeleteArticleId =
    null;


  syncBodyScrollState();
}


function permanentlyDeleteArticle() {
  if (!pendingDeleteArticleId) {
    return;
  }


  /*
    Snapshot contains the article BEFORE deletion.
  */
  createInternalBackup(
    "Before deleting story"
  );


  articles =
    articles.filter(
      (article) => {
        return (
          String(article.id) !==
          String(
            pendingDeleteArticleId
          )
        );
      }
    );


  if (!persistArticles()) {
    return;
  }


  createInternalBackup(
    "After deleting story"
  );


  confirmModal.classList.remove(
    "open"
  );


  confirmModal.setAttribute(
    "aria-hidden",
    "true"
  );


  readerModal.classList.remove(
    "open"
  );


  readerModal.setAttribute(
    "aria-hidden",
    "true"
  );


  pendingDeleteArticleId =
    null;


  currentReaderArticleId =
    null;


  syncBodyScrollState();

  renderFrontPage();

  updateBackupStatus();


  showToast(
    "STORY DELETED. SAFETY BACKUP CREATED."
  );
}


/* =========================================================
   EXPORT EXTERNAL BACKUP
   ========================================================= */

function exportJournalBackup() {
  createInternalBackup(
    "Manual JSON export"
  );


  const payload = {
    app:
      "Sports Journal",

    version:
      1,

    exportedAt:
      new Date().toISOString(),

    storyCount:
      articles.length,

    articles:
      cloneArticles(articles)
  };


  const json =
    JSON.stringify(
      payload,
      null,
      2
    );


  const blob =
    new Blob(
      [json],
      {
        type:
          "application/json"
      }
    );


  const url =
    URL.createObjectURL(
      blob
    );


  const link =
    document.createElement(
      "a"
    );


  link.href =
    url;


  link.download =
    `sports-journal-backup-${getBackupFileDate()}.json`;


  document.body.appendChild(
    link
  );


  link.click();


  link.remove();


  URL.revokeObjectURL(
    url
  );


  closeSideMenu();


  updateBackupStatus();


  showToast(
    "BACKUP EXPORTED. KEEP THE JSON FILE SAFE."
  );
}


/* =========================================================
   IMPORT / RESTORE BACKUP
   ========================================================= */

async function handleBackupFileSelection(
  event
) {
  const file =
    event.target.files[0];


  if (!file) {
    return;
  }


  try {
    const text =
      await file.text();


    const parsed =
      JSON.parse(text);


    const importedArticles =
      extractArticlesFromBackup(
        parsed
      );


    if (!importedArticles) {
      throw new Error(
        "Invalid Sports Journal backup."
      );
    }


    const normalizedArticles =
      importedArticles.map(
        (article) => {
          return normalizeArticle(
            article
          );
        }
      );


    pendingRestore = {
      fileName:
        file.name,

      articles:
        normalizedArticles
    };


    openRestoreModal();
  } catch (error) {
    console.error(
      "Backup restore error:",
      error
    );


    pendingRestore =
      null;


    showToast(
      "BACKUP FILE COULD NOT BE READ."
    );
  } finally {
    /*
      Reset input so the same file can be
      selected again later.
    */
    backupFileInput.value =
      "";
  }
}


function extractArticlesFromBackup(
  parsed
) {
  /*
    Current Sports Journal JSON format.
  */
  if (
    parsed &&
    typeof parsed === "object" &&
    Array.isArray(parsed.articles)
  ) {
    return validateImportedArticles(
      parsed.articles
    )
      ? parsed.articles
      : null;
  }


  /*
    Also accept a raw array for future / old exports.
  */
  if (
    Array.isArray(parsed)
  ) {
    return validateImportedArticles(
      parsed
    )
      ? parsed
      : null;
  }


  return null;
}


function validateImportedArticles(
  importedArticles
) {
  return importedArticles.every(
    (article) => {
      return (
        article &&
        typeof article === "object" &&
        typeof article.title === "string"
      );
    }
  );
}


function openRestoreModal() {
  if (!pendingRestore) {
    return;
  }


  restoreFileName.textContent =
    pendingRestore.fileName;


  restoreStoryCount.textContent =
    `${pendingRestore.articles.length} ` +
    `${pendingRestore.articles.length === 1
      ? "STORY"
      : "STORIES"}`;


  currentStoryCount.textContent =
    `${articles.length} ` +
    `${articles.length === 1
      ? "STORY"
      : "STORIES"}`;


  restoreModal.classList.add(
    "open"
  );


  restoreModal.setAttribute(
    "aria-hidden",
    "false"
  );


  syncBodyScrollState();
}


function closeRestoreModal() {
  restoreModal.classList.remove(
    "open"
  );


  restoreModal.setAttribute(
    "aria-hidden",
    "true"
  );


  pendingRestore =
    null;


  syncBodyScrollState();
}


/* =========================================================
   RESTORE: REPLACE
   ========================================================= */

function replaceWithPendingBackup() {
  if (!pendingRestore) {
    return;
  }


  /*
    Protect current journal first.
  */
  createInternalBackup(
    "Before replacing journal from external backup"
  );


  articles =
    cloneArticles(
      pendingRestore.articles
    );


  if (!persistArticles()) {
    return;
  }


  createInternalBackup(
    "After restoring external backup"
  );


  restoreModal.classList.remove(
    "open"
  );


  restoreModal.setAttribute(
    "aria-hidden",
    "true"
  );


  pendingRestore =
    null;


  goToFrontPage();

  updateBackupStatus();

  syncBodyScrollState();


  showToast(
    "JOURNAL REPLACED FROM BACKUP."
  );
}


/* =========================================================
   RESTORE: MERGE
   ========================================================= */

function mergePendingBackup() {
  if (!pendingRestore) {
    return;
  }


  createInternalBackup(
    "Before merging external backup"
  );


  const storyMap =
    new Map();


  /*
    Current articles first.
  */
  articles.forEach(
    (article) => {
      storyMap.set(
        String(article.id),
        article
      );
    }
  );


  /*
    Imported versions replace matching IDs,
    while new IDs are added.
  */
  pendingRestore.articles.forEach(
    (article) => {
      storyMap.set(
        String(article.id),
        article
      );
    }
  );


  articles =
    Array.from(
      storyMap.values()
    ).sort(
      sortArticlesNewestFirst
    );


  if (!persistArticles()) {
    return;
  }


  createInternalBackup(
    "After merging external backup"
  );


  restoreModal.classList.remove(
    "open"
  );


  restoreModal.setAttribute(
    "aria-hidden",
    "true"
  );


  pendingRestore =
    null;


  goToFrontPage();

  updateBackupStatus();

  syncBodyScrollState();


  showToast(
    "BACKUP MERGED WITH CURRENT JOURNAL."
  );
}


/* =========================================================
   IMAGE HELPERS
   ========================================================= */

function getArticleImageMode(
  article
) {
  return (
    article.imageMode === "full"
      ? "full"
      : "crop"
  );
}


function parseImagePosition(
  position
) {
  if (
    position &&
    typeof position === "object"
  ) {
    return {
      x:
        clampNumber(
          position.x,
          0,
          100,
          50
        ),

      y:
        clampNumber(
          position.y,
          0,
          100,
          50
        )
    };
  }


  if (
    typeof position === "string"
  ) {
    const values =
      position
        .replaceAll("%", "")
        .trim()
        .split(/\s+/)
        .map(Number);


    if (
      values.length >= 2 &&
      values.every(
        Number.isFinite
      )
    ) {
      return {
        x:
          clampNumber(
            values[0],
            0,
            100,
            50
          ),

        y:
          clampNumber(
            values[1],
            0,
            100,
            50
          )
      };
    }
  }


  return {
    x: 50,
    y: 50
  };
}


function normalizeZoom(
  value
) {
  return clampNumber(
    Number(value),
    100,
    180,
    100
  );
}


/* =========================================================
   GENERAL HELPERS
   ========================================================= */

function findArticle(
  articleId
) {
  return articles.find(
    (article) => {
      return (
        String(article.id) ===
        String(articleId)
      );
    }
  );
}


function createArticleId() {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID ===
      "function"
  ) {
    return crypto.randomUUID();
  }


  return (
    `${Date.now()}-` +
    `${Math.random()
      .toString(16)
      .slice(2)}`
  );
}


function clampNumber(
  value,
  min,
  max,
  fallback
) {
  const number =
    Number(value);


  if (
    !Number.isFinite(number)
  ) {
    return fallback;
  }


  return Math.min(
    Math.max(
      number,
      min
    ),
    max
  );
}


function updateActiveSportButton() {
  sportFilters.forEach(
    (button) => {
      button.classList.toggle(
        "active",
        button.dataset.sport ===
          activeSport
      );
    }
  );
}


function syncBodyScrollState() {
  const overlayOpen =
    editorModal.classList.contains(
      "open"
    ) ||
    readerModal.classList.contains(
      "open"
    ) ||
    confirmModal.classList.contains(
      "open"
    ) ||
    restoreModal.classList.contains(
      "open"
    ) ||
    sideMenu.classList.contains(
      "open"
    );


  document.body.classList.toggle(
    "modal-open",
    overlayOpen
  );
}


/* =========================================================
   TOAST
   ========================================================= */

function showToast(message) {
  clearTimeout(
    toastTimeout
  );


  toast.textContent =
    message;


  toast.classList.add(
    "show"
  );


  toastTimeout =
    setTimeout(
      () => {
        toast.classList.remove(
          "show"
        );
      },
      3200
    );
}


/* =========================================================
   DATES
   ========================================================= */

function renderEditionDate() {
  const formatter =
    new Intl.DateTimeFormat(
      "en-US",
      {
        weekday:
          "long",

        month:
          "long",

        day:
          "numeric",

        year:
          "numeric"
      }
    );


  editionDate.textContent =
    formatter
      .format(
        new Date()
      )
      .toUpperCase();
}


function formatShortDate(
  dateString
) {
  if (!dateString) {
    return "";
  }


  const date =
    new Date(
      dateString
    );


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "";
  }


  return new Intl.DateTimeFormat(
    "en-US",
    {
      month:
        "short",

      day:
        "numeric",

      year:
        "numeric"
    }
  )
    .format(date)
    .toUpperCase();
}


function formatFullDate(
  dateString
) {
  if (!dateString) {
    return "";
  }


  const date =
    new Date(
      dateString
    );


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "";
  }


  return new Intl.DateTimeFormat(
    "en-US",
    {
      month:
        "long",

      day:
        "numeric",

      year:
        "numeric"
    }
  )
    .format(date)
    .toUpperCase();
}


function formatBackupTime(
  date
) {
  return new Intl.DateTimeFormat(
    "en-US",
    {
      month:
        "short",

      day:
        "numeric",

      hour:
        "numeric",

      minute:
        "2-digit"
    }
  )
    .format(date)
    .toUpperCase();
}


function getBackupFileDate() {
  const date =
    new Date();


  const year =
    date.getFullYear();


  const month =
    String(
      date.getMonth() + 1
    ).padStart(
      2,
      "0"
    );


  const day =
    String(
      date.getDate()
    ).padStart(
      2,
      "0"
    );


  return `${year}-${month}-${day}`;
}