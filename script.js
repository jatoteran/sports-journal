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
  IMPORTANTE:

  Los valores internos de los deportes permanecen
  en inglés para no romper artículos, filtros ni backups.

  Solo traducimos su representación visual.
*/
const SPORT_LABELS = {
  football: "FÚTBOL",
  tennis: "TENIS",
  baseball: "BÉISBOL",
  basketball: "BALONCESTO"
};


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
   INICIALIZACIÓN
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
          "No se pudo migrar el almacenamiento anterior:",
          error
        );
      }


      return legacyData;
    }
  }


  const backups =
    loadInternalBackups();


  if (backups.length > 0) {
    const newestBackup =
      backups[0];


    if (
      Array.isArray(
        newestBackup.articles
      )
    ) {
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
      "No se pudieron guardar las noticias:",
      error
    );


    showToast(
      "NO SE PUDO GUARDAR. EXPORTA UN RESPALDO ANTES DE CONTINUAR."
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
      `No se pudo leer ${key}:`,
      error
    );

    return null;
  }
}


/* =========================================================
   RESPALDOS INTERNOS
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
      "No se pudo crear la copia automática:",
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
      "SIN COPIAS TODAVÍA";

    return;
  }


  const latest =
    backups[0];


  const date =
    new Date(latest.createdAt);


  if (Number.isNaN(date.getTime())) {
    internalBackupStatus.textContent =
      `${backups.length} COPIAS LOCALES`;

    return;
  }


  internalBackupStatus.textContent =
    `${backups.length} COPIAS · ${formatBackupTime(date)}`;
}


/* =========================================================
   NORMALIZACIÓN
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
      safeArticle.title || "NOTICIA SIN TÍTULO"
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
   EVENTOS
   ========================================================= */

function bindEvents() {

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


  document
    .querySelectorAll("[data-close-editor]")
    .forEach((button) => {
      button.addEventListener(
        "click",
        closeEditor
      );
    });


  document
    .querySelectorAll("[data-close-reader]")
    .forEach((button) => {
      button.addEventListener(
        "click",
        closeReader
      );
    });


  document
    .querySelectorAll("[data-close-confirm]")
    .forEach((button) => {
      button.addEventListener(
        "click",
        closeConfirmModal
      );
    });


  document
    .querySelectorAll("[data-close-restore]")
    .forEach((button) => {
      button.addEventListener(
        "click",
        closeRestoreModal
      );
    });


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


  articleForm.addEventListener(
    "submit",
    handleArticleSubmit
  );


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


  mergeBackupButton.addEventListener(
    "click",
    mergePendingBackup
  );


  replaceBackupButton.addEventListener(
    "click",
    replaceWithPendingBackup
  );


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
   PORTADA
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
   MENÚ
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
   FILTRADO
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
        getSportLabel(article.sport),
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
   RENDER PORTADA
   ========================================================= */

function renderFrontPage() {
  const filteredArticles =
    getFilteredArticles();


  storyCount.textContent =
    `${filteredArticles.length} ` +
    `${filteredArticles.length === 1
      ? "NOTICIA"
      : "NOTICIAS"}`;


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
   NOTICIA #01
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
    getSportLabel(
      article.sport
    );


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
    "LEER NOTICIA →";


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
   NOTICIAS #02 Y #03
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
        getSportLabel(
          article.sport
        );


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
   ÚLTIMAS
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
      <span>FIN DE LA PORTADA</span>

      <p>
        Las nuevas noticias aparecerán aquí
        cuando las tres posiciones principales
        estén ocupadas.
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
        getSportLabel(
          article.sport
        );


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
   PLACEHOLDER DE IMAGEN
   ========================================================= */

function createImagePlaceholder() {
  const placeholder =
    document.createElement("div");


  placeholder.className =
    "lead-image-placeholder";


  const label =
    document.createElement("span");


  label.textContent =
    "SIN IMAGEN DE PORTADA";


  placeholder.appendChild(
    label
  );


  return placeholder;
}


/* =========================================================
   METADATOS
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
    `POR ${article.author}`;


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
      "ACTUALIZADO";


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
      "EDITAR NOTICIA";


    publishButtonText.textContent =
      "GUARDAR CAMBIOS";
  } else {
    editorHeading.textContent =
      "NUEVA NOTICIA";


    publishButtonText.textContent =
      "PUBLICAR NOTICIA";
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
   MODO DE IMAGEN
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
   VISTA PREVIA
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
   CREAR / EDITAR NOTICIA
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


  createInternalBackup(
    existingId
      ? "Antes de editar noticia"
      : "Antes de publicar noticia"
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
        "NO SE PUDO ENCONTRAR LA NOTICIA."
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
      "Después de editar noticia"
    );


    showToast(
      "NOTICIA ACTUALIZADA + RESPALDO CREADO."
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
      "Después de publicar noticia"
    );


    showToast(
      "NOTICIA PUBLICADA + RESPALDO CREADO."
    );
  }


  closeEditor();

  renderFrontPage();

  updateBackupStatus();
}


/* =========================================================
   LECTOR
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
    getSportLabel(
      article.sport
    );


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
   ELIMINAR
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


  createInternalBackup(
    "Antes de eliminar noticia"
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
    "Después de eliminar noticia"
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
    "NOTICIA ELIMINADA. RESPALDO DE SEGURIDAD CREADO."
  );
}


/* =========================================================
   EXPORTAR RESPALDO
   ========================================================= */

function exportJournalBackup() {
  createInternalBackup(
    "Exportación manual JSON"
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
    `sports-journal-respaldo-${getBackupFileDate()}.json`;


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
    "RESPALDO EXPORTADO. GUARDA EL ARCHIVO JSON EN UN LUGAR SEGURO."
  );
}


/* =========================================================
   IMPORTAR RESPALDO
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
        "Respaldo de Sports Journal no válido."
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
      "Error al restaurar respaldo:",
      error
    );


    pendingRestore =
      null;


    showToast(
      "NO SE PUDO LEER EL ARCHIVO DE RESPALDO."
    );
  } finally {
    backupFileInput.value =
      "";
  }
}


function extractArticlesFromBackup(
  parsed
) {
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
      ? "NOTICIA"
      : "NOTICIAS"}`;


  currentStoryCount.textContent =
    `${articles.length} ` +
    `${articles.length === 1
      ? "NOTICIA"
      : "NOTICIAS"}`;


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
   RESTAURAR: REEMPLAZAR
   ========================================================= */

function replaceWithPendingBackup() {
  if (!pendingRestore) {
    return;
  }


  createInternalBackup(
    "Antes de reemplazar el diario desde respaldo externo"
  );


  articles =
    cloneArticles(
      pendingRestore.articles
    );


  if (!persistArticles()) {
    return;
  }


  createInternalBackup(
    "Después de restaurar respaldo externo"
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
    "DIARIO RESTAURADO DESDE EL RESPALDO."
  );
}


/* =========================================================
   RESTAURAR: COMBINAR
   ========================================================= */

function mergePendingBackup() {
  if (!pendingRestore) {
    return;
  }


  createInternalBackup(
    "Antes de combinar respaldo externo"
  );


  const storyMap =
    new Map();


  articles.forEach(
    (article) => {
      storyMap.set(
        String(article.id),
        article
      );
    }
  );


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
    "Después de combinar respaldo externo"
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
    "RESPALDO COMBINADO CON EL DIARIO ACTUAL."
  );
}


/* =========================================================
   DEPORTES
   ========================================================= */

function getSportLabel(
  sport
) {
  return (
    SPORT_LABELS[sport] ||
    String(sport || "").toUpperCase()
  );
}


/* =========================================================
   IMÁGENES
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
   HELPERS
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
   NOTIFICACIONES
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
   FECHAS
   ========================================================= */

function renderEditionDate() {
  const formatter =
    new Intl.DateTimeFormat(
      "es-ES",
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
    "es-ES",
    {
      day:
        "numeric",

      month:
        "short",

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
    "es-ES",
    {
      day:
        "numeric",

      month:
        "long",

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
    "es-ES",
    {
      day:
        "numeric",

      month:
        "short",

      hour:
        "2-digit",

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