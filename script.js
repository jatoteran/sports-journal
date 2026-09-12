/* =========================================================
   SPORTS JOURNAL
========================================================= */


/* =========================================================
   STORAGE
========================================================= */

const STORAGE_KEY =
  "sportsJournalArticles";

const BACKUPS_KEY =
  "sportsJournalAutomaticBackups";

const MAX_AUTOMATIC_BACKUPS =
  16;

const LEGACY_STORAGE_KEYS = [
  "sportsArticles",
  "sports-journal-articles",
  "sports-platform-articles",
  "articles"
];


const SPORT_LABELS = {
  football: "FÚTBOL",
  tennis: "TENIS",
  baseball: "BÉISBOL",
  basketball: "BALONCESTO"
};


const SPORT_DESCRIPTIONS = {
  football:
    "Partidos, ligas, mercado, selecciones y las historias que marcan el mundo del fútbol.",

  tennis:
    "Grand Slams, circuitos, rankings y protagonistas del tenis internacional.",

  baseball:
    "Grandes Ligas, protagonistas, temporadas y las historias alrededor del diamante.",

  basketball:
    "NBA, baloncesto internacional, estrellas, equipos y todo lo que sucede dentro y fuera de la cancha."
};


/* =========================================================
   STATE
========================================================= */

let articles =
  loadArticles();

let activeSport =
  "all";

let searchTerm =
  "";

let currentReaderArticleId =
  null;

let pendingDeleteArticleId =
  null;

let pendingRestore =
  null;

let toastTimeout =
  null;

let editorInitialState =
  "";

let editorHasUnsavedChanges =
  false;


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
  document.getElementById(
    "frontPageMenuButton"
  );

const menuWriteStoryButton =
  document.getElementById(
    "menuWriteStoryButton"
  );

const draftsMenuButton =
  document.getElementById(
    "draftsMenuButton"
  );

const publishedMenuButton =
  document.getElementById(
    "publishedMenuButton"
  );

const draftCount =
  document.getElementById("draftCount");

const publishedCount =
  document.getElementById(
    "publishedCount"
  );

const draftsModal =
  document.getElementById("draftsModal");

const draftsList =
  document.getElementById("draftsList");

const exportBackupButton =
  document.getElementById(
    "exportBackupButton"
  );

const restoreBackupButton =
  document.getElementById(
    "restoreBackupButton"
  );

const backupFileInput =
  document.getElementById(
    "backupFileInput"
  );

const internalBackupStatus =
  document.getElementById(
    "internalBackupStatus"
  );

const sportFilters =
  document.querySelectorAll(
    ".sport-filter"
  );

const searchInput =
  document.getElementById("searchInput");

const storyCount =
  document.getElementById("storyCount");

const searchContextBar =
  document.getElementById(
    "searchContextBar"
  );

const searchContextText =
  document.getElementById(
    "searchContextText"
  );

const clearSearchButton =
  document.getElementById(
    "clearSearchButton"
  );

const homeView =
  document.getElementById("homeView");

const sportPage =
  document.getElementById("sportPage");

const leadStories =
  document.getElementById("leadStories");

const latestStories =
  document.getElementById(
    "latestStories"
  );

const sportPageEyebrow =
  document.getElementById(
    "sportPageEyebrow"
  );

const sportPageTitle =
  document.getElementById(
    "sportPageTitle"
  );

const sportPageDescription =
  document.getElementById(
    "sportPageDescription"
  );

const sportFeaturedHeading =
  document.getElementById(
    "sportFeaturedHeading"
  );

const sportFeatured =
  document.getElementById(
    "sportFeatured"
  );

const sportSecondarySection =
  document.getElementById(
    "sportSecondarySection"
  );

const sportSecondary =
  document.getElementById(
    "sportSecondary"
  );

const sportMoreSection =
  document.getElementById(
    "sportMoreSection"
  );

const sportMoreHeading =
  document.getElementById(
    "sportMoreHeading"
  );

const sportMoreList =
  document.getElementById(
    "sportMoreList"
  );

const emptyStateTemplate =
  document.getElementById(
    "emptyStateTemplate"
  );

const openEditorButton =
  document.getElementById(
    "openEditorButton"
  );

const brandButton =
  document.getElementById(
    "brandButton"
  );


/* =========================================================
   EDITOR DOM
========================================================= */

const editorModal =
  document.getElementById("editorModal");

const editorHeading =
  document.getElementById(
    "editorHeading"
  );

const editorStatusValue =
  document.getElementById(
    "editorStatusValue"
  );

const editorSaveState =
  document.getElementById(
    "editorSaveState"
  );

const editorDateInfo =
  document.getElementById(
    "editorDateInfo"
  );

const articleForm =
  document.getElementById(
    "articleForm"
  );

const articleIdInput =
  document.getElementById(
    "articleId"
  );

const sportInput =
  document.getElementById(
    "sportInput"
  );

const authorInput =
  document.getElementById(
    "authorInput"
  );

const titleInput =
  document.getElementById(
    "titleInput"
  );

const summaryInput =
  document.getElementById(
    "summaryInput"
  );

const contentInput =
  document.getElementById(
    "contentInput"
  );

const titleCharacterCount =
  document.getElementById(
    "titleCharacterCount"
  );

const summaryCharacterCount =
  document.getElementById(
    "summaryCharacterCount"
  );

const saveDraftButton =
  document.getElementById(
    "saveDraftButton"
  );

const saveDraftButtonText =
  document.getElementById(
    "saveDraftButtonText"
  );

const publishButtonText =
  document.getElementById(
    "publishButtonText"
  );


/* =========================================================
   IMAGE DOM
========================================================= */

const imageUrlInput =
  document.getElementById(
    "imageUrlInput"
  );

const imageModeInput =
  document.getElementById(
    "imageMode"
  );

const imageModeButtons =
  document.querySelectorAll(
    "[data-image-mode]"
  );

const imagePreview =
  document.getElementById(
    "imagePreview"
  );

const imagePreviewElement =
  document.getElementById(
    "imagePreviewElement"
  );

const focusXInput =
  document.getElementById(
    "focusXInput"
  );

const focusYInput =
  document.getElementById(
    "focusYInput"
  );

const imageZoomInput =
  document.getElementById(
    "imageZoomInput"
  );

const focusXOutput =
  document.getElementById(
    "focusXOutput"
  );

const focusYOutput =
  document.getElementById(
    "focusYOutput"
  );

const zoomOutput =
  document.getElementById(
    "zoomOutput"
  );

const cropControls =
  document.getElementById(
    "cropControls"
  );

const fullImageInfo =
  document.getElementById(
    "fullImageInfo"
  );

const resetImageButton =
  document.getElementById(
    "resetImageButton"
  );


/* =========================================================
   UNSAVED / DRAFT DOM
========================================================= */

const unsavedModal =
  document.getElementById(
    "unsavedModal"
  );

const keepEditingButton =
  document.getElementById(
    "keepEditingButton"
  );

const discardChangesButton =
  document.getElementById(
    "discardChangesButton"
  );

const moveDraftModal =
  document.getElementById(
    "moveDraftModal"
  );

const keepPublishedButton =
  document.getElementById(
    "keepPublishedButton"
  );

const confirmMoveDraftButton =
  document.getElementById(
    "confirmMoveDraftButton"
  );


/* =========================================================
   READER DOM
========================================================= */

const readerModal =
  document.getElementById(
    "readerModal"
  );

const readerPanel =
  readerModal.querySelector(
    ".reader-panel"
  );

const readerSport =
  document.getElementById(
    "readerSport"
  );

const readerPublishedDate =
  document.getElementById(
    "readerPublishedDate"
  );

const readerTitle =
  document.getElementById(
    "readerTitle"
  );

const readerSummary =
  document.getElementById(
    "readerSummary"
  );

const readerAuthor =
  document.getElementById(
    "readerAuthor"
  );

const readerReadTime =
  document.getElementById(
    "readerReadTime"
  );

const readerUpdatedBlock =
  document.getElementById(
    "readerUpdatedBlock"
  );

const readerUpdatedDate =
  document.getElementById(
    "readerUpdatedDate"
  );

const readerImageContainer =
  document.getElementById(
    "readerImageContainer"
  );

const readerImage =
  document.getElementById(
    "readerImage"
  );

const readerBody =
  document.getElementById(
    "readerBody"
  );

const readerRelatedSection =
  document.getElementById(
    "readerRelatedSection"
  );

const readerRelatedTitle =
  document.getElementById(
    "readerRelatedTitle"
  );

const readerRelatedStories =
  document.getElementById(
    "readerRelatedStories"
  );

const readerPreviousButton =
  document.getElementById(
    "readerPreviousButton"
  );

const readerPreviousTitle =
  document.getElementById(
    "readerPreviousTitle"
  );

const readerNextButton =
  document.getElementById(
    "readerNextButton"
  );

const readerNextTitle =
  document.getElementById(
    "readerNextTitle"
  );

const readerEditButton =
  document.getElementById(
    "readerEditButton"
  );

const readerDeleteButton =
  document.getElementById(
    "readerDeleteButton"
  );

const readerProgressBar =
  document.getElementById(
    "readerProgressBar"
  );

const readerBackToTopButton =
  document.getElementById(
    "readerBackToTopButton"
  );


/* =========================================================
   DELETE / RESTORE DOM
========================================================= */

const confirmModal =
  document.getElementById(
    "confirmModal"
  );

const confirmDeleteButton =
  document.getElementById(
    "confirmDeleteButton"
  );

const restoreModal =
  document.getElementById(
    "restoreModal"
  );

const restoreFileName =
  document.getElementById(
    "restoreFileName"
  );

const restoreStoryCount =
  document.getElementById(
    "restoreStoryCount"
  );

const currentStoryCount =
  document.getElementById(
    "currentStoryCount"
  );

const mergeBackupButton =
  document.getElementById(
    "mergeBackupButton"
  );

const replaceBackupButton =
  document.getElementById(
    "replaceBackupButton"
  );

const toast =
  document.getElementById("toast");


/* =========================================================
   INITIALIZE
========================================================= */

initialize();


function initialize() {

  normalizeExistingArticles();

  renderEditionDate();

  renderCurrentView();

  updateManagementCounts();

  updateBackupStatus();

  bindEvents();

}


/* =========================================================
   STORAGE
========================================================= */

function loadArticles() {

  const primaryData =
    readJsonFromStorage(
      STORAGE_KEY
    );


  if (
    Array.isArray(primaryData)
  ) {

    return primaryData;

  }


  for (
    const key
    of LEGACY_STORAGE_KEYS
  ) {

    const legacyData =
      readJsonFromStorage(key);


    if (
      Array.isArray(legacyData)
    ) {

      try {

        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(
            legacyData
          )
        );

      } catch (error) {

        console.error(error);

      }


      return legacyData;

    }

  }


  const backups =
    loadInternalBackups();


  if (
    backups.length > 0 &&
    Array.isArray(
      backups[0].articles
    )
  ) {

    return backups[0].articles;

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

    console.error(error);


    showToast(
      "NO SE PUDO GUARDAR. EXPORTA UN RESPALDO."
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

    console.error(error);

    return null;

  }

}


/* =========================================================
   BACKUPS
========================================================= */

function loadInternalBackups() {

  const saved =
    readJsonFromStorage(
      BACKUPS_KEY
    );


  if (!Array.isArray(saved)) {

    return [];

  }


  return saved
    .filter(
      (backup) =>
        backup &&
        Array.isArray(
          backup.articles
        )
    )
    .sort(
      (a, b) =>
        new Date(
          b.createdAt
        ).getTime() -
        new Date(
          a.createdAt
        ).getTime()
    );

}


function createInternalBackup(
  reason,
  sourceArticles = articles
) {

  const backup = {

    id:
      createArticleId(),

    createdAt:
      new Date().toISOString(),

    reason,

    articles:
      cloneArticles(
        sourceArticles
      )

  };


  const backups =
    loadInternalBackups();


  backups.unshift(backup);


  try {

    localStorage.setItem(
      BACKUPS_KEY,
      JSON.stringify(
        backups.slice(
          0,
          MAX_AUTOMATIC_BACKUPS
        )
      )
    );


    updateBackupStatus();


    return true;

  } catch (error) {

    console.error(error);

    return false;

  }

}


function cloneArticles(source) {

  return JSON.parse(
    JSON.stringify(source)
  );

}


function updateBackupStatus() {

  const backups =
    loadInternalBackups();


  if (
    backups.length === 0
  ) {

    internalBackupStatus.textContent =
      "SIN COPIAS TODAVÍA";


    return;

  }


  const latest =
    new Date(
      backups[0].createdAt
    );


  internalBackupStatus.textContent =
    `${backups.length} COPIAS · ${formatBackupTime(latest)}`;

}


/* =========================================================
   NORMALIZE
========================================================= */

function normalizeExistingArticles() {

  let changed =
    false;


  articles =
    articles.map(
      (article) => {

        const normalized =
          normalizeArticle(
            article
          );


        if (
          JSON.stringify(normalized) !==
          JSON.stringify(article)
        ) {

          changed =
            true;

        }


        return normalized;

      }
    );


  if (changed) {

    persistArticles();

  }

}


function normalizeArticle(article) {

  const safe =
    article &&
    typeof article === "object"
      ? { ...article }
      : {};


  if (!safe.id) {

    safe.id =
      createArticleId();

  }


  const validSports = [
    "football",
    "tennis",
    "baseball",
    "basketball"
  ];


  if (
    !validSports.includes(
      safe.sport
    )
  ) {

    safe.sport =
      "football";

  }


  if (
    safe.status !== "draft" &&
    safe.status !== "published"
  ) {

    safe.status =
      "published";

  }


  safe.title =
    String(
      safe.title ?? ""
    );

  safe.author =
    String(
      safe.author ?? ""
    );

  safe.summary =
    String(
      safe.summary ?? ""
    );

  safe.content =
    String(
      safe.content ?? ""
    );

  safe.imageUrl =
    String(
      safe.imageUrl ?? ""
    );


  if (
    safe.status === "published"
  ) {

    if (
      !safe.title.trim()
    ) {

      safe.title =
        "NOTICIA SIN TÍTULO";

    }


    if (
      !safe.author.trim()
    ) {

      safe.author =
        "SPORTS JOURNAL";

    }

  }


  safe.imageMode =
    safe.imageMode === "full"
      ? "full"
      : "crop";


  safe.imagePosition =
    safe.imagePosition ||
    "50% 50%";


  safe.imageZoom =
    normalizeZoom(
      safe.imageZoom
    );


  safe.createdAt =
    safe.createdAt ||
    new Date().toISOString();


  if (
    safe.status === "published" &&
    !safe.publishedAt
  ) {

    safe.publishedAt =
      safe.createdAt;

  }


  return safe;

}


/* =========================================================
   EVENTS
========================================================= */

function bindEvents() {

  menuButton.addEventListener(
    "click",
    openSideMenu
  );


  document
    .querySelectorAll(
      "[data-close-menu]"
    )
    .forEach(
      (button) => {

        button.addEventListener(
          "click",
          closeSideMenu
        );

      }
    );


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


  draftsMenuButton.addEventListener(
    "click",
    () => {

      closeSideMenu();

      openDraftsManager();

    }
  );


  publishedMenuButton.addEventListener(
    "click",
    () => {

      closeSideMenu();

      goToFrontPage();


      showToast(
        `${getPublishedArticles().length} NOTICIAS PUBLICADAS.`
      );

    }
  );


  document
    .querySelectorAll(
      "[data-close-drafts]"
    )
    .forEach(
      (button) => {

        button.addEventListener(
          "click",
          closeDraftsManager
        );

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


  sportFilters.forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          activeSport =
            button.dataset.sport;


          clearSearchState(
            false
          );


          renderCurrentView();


          centerActiveSportNavigation();


          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });

        }
      );

    }
  );


  searchInput.addEventListener(
    "input",
    () => {

      searchTerm =
        searchInput.value
          .trim()
          .toLowerCase();


      renderCurrentView();

    }
  );


  clearSearchButton.addEventListener(
    "click",
    () => {

      clearSearchState(
        true
      );

    }
  );


  document
    .querySelectorAll(
      "[data-close-editor]"
    )
    .forEach(
      (button) => {

        button.addEventListener(
          "click",
          requestCloseEditor
        );

      }
    );


  articleForm.addEventListener(
    "input",
    () => {

      updateEditorDirtyState();

      updateCharacterCounters();

    }
  );


  articleForm.addEventListener(
    "change",
    () => {

      updateEditorDirtyState();

      updateCharacterCounters();

    }
  );


  document
    .querySelectorAll(
      "[data-close-reader]"
    )
    .forEach(
      (button) => {

        button.addEventListener(
          "click",
          closeReader
        );

      }
    );


  document
    .querySelectorAll(
      "[data-close-confirm]"
    )
    .forEach(
      (button) => {

        button.addEventListener(
          "click",
          closeConfirmModal
        );

      }
    );


  document
    .querySelectorAll(
      "[data-close-restore]"
    )
    .forEach(
      (button) => {

        button.addEventListener(
          "click",
          closeRestoreModal
        );

      }
    );


  document
    .querySelectorAll(
      "[data-keep-editing]"
    )
    .forEach(
      (button) => {

        button.addEventListener(
          "click",
          closeUnsavedModal
        );

      }
    );


  document
    .querySelectorAll(
      "[data-close-move-draft]"
    )
    .forEach(
      (button) => {

        button.addEventListener(
          "click",
          closeMoveDraftModal
        );

      }
    );


  keepEditingButton.addEventListener(
    "click",
    closeUnsavedModal
  );


  discardChangesButton.addEventListener(
    "click",
    discardEditorChanges
  );


  keepPublishedButton.addEventListener(
    "click",
    closeMoveDraftModal
  );


  confirmMoveDraftButton.addEventListener(
    "click",
    () => {

      saveArticle(
        "draft"
      );

    }
  );


  imageUrlInput.addEventListener(
    "input",
    updateImagePreview
  );


  imageModeButtons.forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          setImageMode(
            button.dataset.imageMode
          );


          updateEditorDirtyState();

        }
      );

    }
  );


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

      focusXInput.value =
        50;

      focusYInput.value =
        50;

      imageZoomInput.value =
        100;


      updateImagePreview();

      updateEditorDirtyState();

    }
  );


  articleForm.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();


      saveArticle(
        "published"
      );

    }
  );


  saveDraftButton.addEventListener(
    "click",
    requestDraftSave
  );


  readerEditButton.addEventListener(
    "click",
    () => {

      if (
        !currentReaderArticleId
      ) {

        return;

      }


      const id =
        currentReaderArticleId;


      closeReader();

      openEditor(id);

    }
  );


  readerDeleteButton.addEventListener(
    "click",
    () => {

      if (
        currentReaderArticleId
      ) {

        openDeleteConfirmation(
          currentReaderArticleId
        );

      }

    }
  );


  readerPreviousButton.addEventListener(
    "click",
    () => {

      const id =
        readerPreviousButton
          .dataset
          .articleId;


      if (id) {

        openReader(id);

      }

    }
  );


  readerNextButton.addEventListener(
    "click",
    () => {

      const id =
        readerNextButton
          .dataset
          .articleId;


      if (id) {

        openReader(id);

      }

    }
  );


  readerBackToTopButton.addEventListener(
    "click",
    () => {

      readerPanel.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  );


  readerPanel.addEventListener(
    "scroll",
    updateReaderScrollUI,
    {
      passive: true
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


  window.addEventListener(
    "resize",
    () => {

      if (
        window.innerWidth <= 650
      ) {

        centerActiveSportNavigation();

      }

    }
  );


  window.addEventListener(
    "beforeunload",
    (event) => {

      if (
        editorModal.classList.contains(
          "open"
        ) &&
        editorHasUnsavedChanges
      ) {

        event.preventDefault();

        event.returnValue =
          "";

      }

    }
  );


  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key !== "Escape"
      ) {

        return;

      }


      if (
        moveDraftModal.classList.contains(
          "open"
        )
      ) {

        closeMoveDraftModal();

        return;

      }


      if (
        unsavedModal.classList.contains(
          "open"
        )
      ) {

        closeUnsavedModal();

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

        requestCloseEditor();

        return;

      }


      if (
        draftsModal.classList.contains(
          "open"
        )
      ) {

        closeDraftsManager();

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
   VIEW ENGINE
========================================================= */

function renderCurrentView() {

  updateActiveSportButton();

  updateSearchPlaceholder();


  if (
    activeSport === "all"
  ) {

    renderFrontPage();

  } else {

    renderSportPage();

  }


  renderSearchContext();

}


function goToFrontPage() {

  activeSport =
    "all";


  clearSearchState(
    false
  );


  renderCurrentView();


  centerActiveSportNavigation();


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =========================================================
   SEARCH EXPERIENCE
========================================================= */

function clearSearchState(
  focusInput = false
) {

  searchTerm =
    "";


  searchInput.value =
    "";


  if (focusInput) {

    renderCurrentView();


    searchInput.focus();

  }

}


function updateSearchPlaceholder() {

  if (
    activeSport === "all"
  ) {

    searchInput.placeholder =
      "JUGADOR, EQUIPO, NOTICIA...";


    return;

  }


  searchInput.placeholder =
    `BUSCAR EN ${getSportLabel(activeSport)}...`;

}


function renderSearchContext() {

  if (!searchTerm) {

    searchContextBar.hidden =
      true;


    searchContextText.textContent =
      "";


    return;

  }


  searchContextBar.hidden =
    false;


  const rawSearch =
    searchInput.value.trim();


  if (
    activeSport === "all"
  ) {

    searchContextText.textContent =
      `EN TODO EL DIARIO · “${rawSearch}”`;


    clearSearchButton.textContent =
      "LIMPIAR BÚSQUEDA";


    return;

  }


  const sportLabel =
    getSportLabel(
      activeSport
    );


  searchContextText.textContent =
    `EN ${sportLabel} · “${rawSearch}”`;


  clearSearchButton.textContent =
    `VER TODO ${sportLabel}`;

}


function updateStoryCount(count) {

  const noun =
    searchTerm
      ? (
          count === 1
            ? "RESULTADO"
            : "RESULTADOS"
        )
      : (
          count === 1
            ? "NOTICIA"
            : "NOTICIAS"
        );


  const sportSuffix =
    activeSport === "all"
      ? ""
      : ` · ${getSportLabel(activeSport)}`;


  storyCount.textContent =
    `${count} ${noun}${sportSuffix}`;

}


/* =========================================================
   SPORT NAVIGATION
========================================================= */

function centerActiveSportNavigation() {

  if (
    window.innerWidth > 650
  ) {

    return;

  }


  const activeButton =
    document.querySelector(
      ".sport-filter.active"
    );


  if (!activeButton) {

    return;

  }


  window.setTimeout(
    () => {

      activeButton.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
      });

    },
    50
  );

}


/* =========================================================
   ARTICLE COLLECTIONS
========================================================= */

function getDraftArticles() {

  return articles
    .filter(
      (article) =>
        article.status === "draft"
    )
    .sort(
      (a, b) =>
        getArticleActivityTime(b) -
        getArticleActivityTime(a)
    );

}


function getPublishedArticles() {

  return articles
    .filter(
      (article) =>
        article.status ===
        "published"
    )
    .sort(
      sortArticlesNewestFirst
    );

}


function getFilteredPublishedArticles() {

  return getPublishedArticles()
    .filter(
      (article) => {

        if (
          activeSport !== "all" &&
          article.sport !==
            activeSport
        ) {

          return false;

        }


        if (!searchTerm) {

          return true;

        }


        return getArticleSearchText(
          article
        ).includes(searchTerm);

      }
    );

}


function getArticleSearchText(
  article
) {

  return [
    article.title,
    article.author,
    article.summary,
    article.content,
    getSportLabel(
      article.sport
    )
  ]
    .join(" ")
    .toLowerCase();

}


function sortArticlesNewestFirst(
  a,
  b
) {

  const aTime =
    new Date(
      a.publishedAt ||
      a.createdAt ||
      0
    ).getTime();


  const bTime =
    new Date(
      b.publishedAt ||
      b.createdAt ||
      0
    ).getTime();


  return bTime - aTime;

}


function updateManagementCounts() {

  draftCount.textContent =
    getDraftArticles().length;


  publishedCount.textContent =
    getPublishedArticles().length;

}


/* =========================================================
   HOME PAGE
========================================================= */

function renderFrontPage() {

  homeView.hidden =
    false;


  sportPage.hidden =
    true;


  const filtered =
    getFilteredPublishedArticles();


  updateStoryCount(
    filtered.length
  );


  leadStories.innerHTML =
    "";


  latestStories.innerHTML =
    "";


  if (
    filtered.length === 0
  ) {

    leadStories.appendChild(
      createCustomEmptyState(
        searchTerm
          ? "SIN RESULTADOS"
          : "NO HAY NOTICIAS",

        searchTerm
          ? `No encontramos noticias para “${searchInput.value.trim()}”.`
          : "Publica una nueva noticia para comenzar el diario."
      )
    );


    return;

  }


  renderPrimaryLead(
    filtered[0]
  );


  renderSecondaryLeads(
    filtered.slice(
      1,
      3
    )
  );


  renderLatestStories(
    filtered.slice(3)
  );

}


function renderPrimaryLead(article) {

  const wrapper =
    document.createElement(
      "div"
    );


  wrapper.className =
    "lead-primary";


  const imageFrame =
    document.createElement(
      "div"
    );


  imageFrame.className =
    `lead-image-frame ${getArticleImageMode(article)}`;


  fillArticleImageFrame(
    imageFrame,
    article
  );


  const copy =
    document.createElement(
      "div"
    );


  copy.className =
    "lead-copy";


  const number =
    document.createElement(
      "div"
    );


  number.className =
    "story-index";


  number.textContent =
    "01";


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
      "h2"
    );


  title.className =
    "lead-title";


  title.textContent =
    article.title;


  const summary =
    document.createElement(
      "p"
    );


  summary.className =
    "lead-summary";


  summary.textContent =
    article.summary;


  copy.append(
    number,
    sport,
    title,
    summary,
    createStoryMetadata(
      article
    ),
    createReadButton(
      article.id
    )
  );


  wrapper.append(
    imageFrame,
    copy
  );


  leadStories.appendChild(
    wrapper
  );

}


function renderSecondaryLeads(
  secondaryArticles
) {

  if (
    secondaryArticles.length === 0
  ) {

    return;

  }


  const wrapper =
    document.createElement(
      "div"
    );


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


      makeStoryInteractive(
        card,
        article.id
      );


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


      card.append(
        number,
        sport,
        title,
        createStoryMetadata(
          article
        )
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


function renderLatestStories(
  latestArticles
) {

  if (
    latestArticles.length === 0
  ) {

    if (searchTerm) {

      return;

    }


    const message =
      createCustomEmptyState(
        "FIN DE LA PORTADA",
        "Las nuevas noticias aparecerán aquí cuando las tres posiciones principales estén ocupadas."
      );


    latestStories.appendChild(
      message
    );


    return;

  }


  latestArticles.forEach(
    (article, index) => {

      latestStories.appendChild(
        createEditorialListRow(
          article,
          index + 4,
          true
        )
      );

    }
  );

}


/* =========================================================
   SPORT PAGE
========================================================= */

function renderSportPage() {

  homeView.hidden =
    true;


  sportPage.hidden =
    false;


  sportSecondarySection.hidden =
    true;


  sportMoreSection.hidden =
    true;


  const sportLabel =
    getSportLabel(
      activeSport
    );


  const filtered =
    getFilteredPublishedArticles();


  updateStoryCount(
    filtered.length
  );


  sportFeatured.innerHTML =
    "";


  sportSecondary.innerHTML =
    "";


  sportMoreList.innerHTML =
    "";


  sportPageTitle.textContent =
    sportLabel;


  if (searchTerm) {

    sportPageEyebrow.textContent =
      "RESULTADOS SPORTS JOURNAL";


    sportPageDescription.textContent =
      `Resultados dentro de ${sportLabel} para “${searchInput.value.trim()}”.`;


    sportFeaturedHeading.textContent =
      "RESULTADO PRINCIPAL";


    sportMoreHeading.textContent =
      "MÁS RESULTADOS";

  } else {

    sportPageEyebrow.textContent =
      "SECCIÓN SPORTS JOURNAL";


    sportPageDescription.textContent =
      SPORT_DESCRIPTIONS[
        activeSport
      ] || "";


    sportFeaturedHeading.textContent =
      "DESTACADA";


    sportMoreHeading.textContent =
      `MÁS DE ${sportLabel}`;

  }


  if (
    filtered.length === 0
  ) {

    sportFeatured.appendChild(
      createCustomEmptyState(
        searchTerm
          ? "SIN RESULTADOS"
          : `SIN NOTICIAS DE ${sportLabel}`,

        searchTerm
          ? `No encontramos resultados dentro de ${sportLabel} para “${searchInput.value.trim()}”.`
          : `Cuando publiques una noticia de ${sportLabel}, aparecerá aquí.`
      )
    );


    return;

  }


  renderSportFeatured(
    filtered[0]
  );


  const secondary =
    filtered.slice(
      1,
      3
    );


  if (
    secondary.length > 0
  ) {

    sportSecondarySection.hidden =
      false;


    renderSportSecondary(
      secondary
    );

  }


  const more =
    filtered.slice(3);


  if (
    more.length > 0
  ) {

    sportMoreSection.hidden =
      false;


    renderSportMore(
      more
    );

  }

}


function renderSportFeatured(
  article
) {

  const wrapper =
    document.createElement(
      "article"
    );


  wrapper.className =
    "sport-featured-story";


  const imageFrame =
    document.createElement(
      "div"
    );


  imageFrame.className =
    `sport-featured-image ${getArticleImageMode(article)}`;


  fillArticleImageFrame(
    imageFrame,
    article
  );


  const copy =
    document.createElement(
      "div"
    );


  copy.className =
    "sport-featured-copy";


  const number =
    document.createElement(
      "div"
    );


  number.className =
    "sport-featured-number";


  number.textContent =
    "01";


  const title =
    document.createElement(
      "h2"
    );


  title.textContent =
    article.title;


  const summary =
    document.createElement(
      "p"
    );


  summary.className =
    "sport-featured-summary";


  summary.textContent =
    article.summary;


  copy.append(
    number,
    title,
    summary,
    createStoryMetadata(
      article
    ),
    createReadButton(
      article.id
    )
  );


  wrapper.append(
    imageFrame,
    copy
  );


  sportFeatured.appendChild(
    wrapper
  );

}


function renderSportSecondary(
  secondaryArticles
) {

  secondaryArticles.forEach(
    (article, index) => {

      const card =
        document.createElement(
          "article"
        );


      card.className =
        "sport-section-card";


      makeStoryInteractive(
        card,
        article.id
      );


      const number =
        document.createElement(
          "div"
        );


      number.className =
        "sport-section-card-number";


      number.textContent =
        String(
          index + 2
        ).padStart(
          2,
          "0"
        );


      const title =
        document.createElement(
          "h3"
        );


      title.textContent =
        article.title;


      const summary =
        document.createElement(
          "p"
        );


      summary.className =
        "sport-section-card-summary";


      summary.textContent =
        article.summary;


      card.append(
        number,
        title,
        summary,
        createStoryMetadata(
          article
        )
      );


      sportSecondary.appendChild(
        card
      );

    }
  );

}


function renderSportMore(
  moreArticles
) {

  moreArticles.forEach(
    (article, index) => {

      const row =
        createEditorialListRow(
          article,
          index + 4,
          false
        );


      row.className =
        "sport-more-story";


      const title =
        row.querySelector(
          ".latest-title"
        );


      const number =
        row.querySelector(
          ".latest-index"
        );


      const info =
        row.querySelector(
          ".latest-info"
        );


      if (title) {

        title.className =
          "sport-more-title";

      }


      if (number) {

        number.className =
          "sport-more-index";

      }


      if (info) {

        info.className =
          "sport-more-info";

      }


      sportMoreList.appendChild(
        row
      );

    }
  );

}


/* =========================================================
   SHARED ARTICLE RENDERING
========================================================= */

function createEditorialListRow(
  article,
  numberValue,
  includeSport
) {

  const row =
    document.createElement(
      "article"
    );


  row.className =
    "latest-story";


  makeStoryInteractive(
    row,
    article.id
  );


  const number =
    document.createElement(
      "div"
    );


  number.className =
    "latest-index";


  number.textContent =
    String(
      numberValue
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
    includeSport
      ? getSportLabel(
          article.sport
        )
      : "";


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
      article.publishedAt ||
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


  return row;

}


function createReadButton(
  articleId
) {

  const button =
    document.createElement(
      "button"
    );


  button.className =
    "read-button";


  button.type =
    "button";


  button.textContent =
    "LEER NOTICIA →";


  button.addEventListener(
    "click",
    () => {

      openReader(
        articleId
      );

    }
  );


  return button;

}


function makeStoryInteractive(
  element,
  articleId
) {

  element.tabIndex =
    0;


  element.addEventListener(
    "click",
    () => {

      openReader(
        articleId
      );

    }
  );


  element.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Enter" ||
        event.key === " "
      ) {

        event.preventDefault();


        openReader(
          articleId
        );

      }

    }
  );

}


function fillArticleImageFrame(
  frame,
  article
) {

  if (
    !article.imageUrl
  ) {

    frame.appendChild(
      createImagePlaceholder()
    );


    return;

  }


  const image =
    document.createElement(
      "img"
    );


  image.src =
    article.imageUrl;


  image.alt =
    article.title;


  if (
    getArticleImageMode(article) ===
    "crop"
  ) {

    const position =
      parseImagePosition(
        article.imagePosition
      );


    image.style.objectPosition =
      `${position.x}% ${position.y}%`;


    image.style.transform =
      `scale(${normalizeZoom(article.imageZoom) / 100})`;

  } else {

    image.style.objectPosition =
      "center";


    image.style.transform =
      "none";

  }


  image.addEventListener(
    "error",
    () => {

      frame.innerHTML =
        "";


      frame.appendChild(
        createImagePlaceholder()
      );

    }
  );


  frame.appendChild(
    image
  );

}


function createStoryMetadata(
  article
) {

  const metadata =
    document.createElement(
      "div"
    );


  metadata.className =
    "story-meta";


  metadata.textContent =
    `POR ${article.author} / ${formatShortDate(
      article.publishedAt ||
      article.createdAt
    )}`;


  if (
    hasMeaningfulUpdate(
      article
    )
  ) {

    metadata.append(
      " / ACTUALIZADO"
    );

  }


  return metadata;

}


function createCustomEmptyState(
  title,
  message
) {

  const state =
    document.createElement(
      "div"
    );


  state.className =
    "empty-state";


  const heading =
    document.createElement(
      "span"
    );


  heading.textContent =
    title;


  const paragraph =
    document.createElement(
      "p"
    );


  paragraph.textContent =
    message;


  state.append(
    heading,
    paragraph
  );


  return state;

}


/* =========================================================
   DRAFT MANAGER
========================================================= */

function openDraftsManager() {

  renderDraftsManager();


  draftsModal.classList.add(
    "open"
  );


  draftsModal.setAttribute(
    "aria-hidden",
    "false"
  );


  syncBodyScrollState();

}


function closeDraftsManager() {

  draftsModal.classList.remove(
    "open"
  );


  draftsModal.setAttribute(
    "aria-hidden",
    "true"
  );


  syncBodyScrollState();

}


function renderDraftsManager() {

  draftsList.innerHTML =
    "";


  const drafts =
    getDraftArticles();


  if (
    drafts.length === 0
  ) {

    draftsList.appendChild(
      createCustomEmptyState(
        "SIN BORRADORES",
        "Las noticias guardadas como borrador aparecerán aquí."
      )
    );


    return;

  }


  drafts.forEach(
    (article, index) => {

      const card =
        document.createElement(
          "article"
        );


      card.className =
        "draft-card";


      const number =
        document.createElement(
          "div"
        );


      number.className =
        "draft-card-number";


      number.textContent =
        String(
          index + 1
        ).padStart(
          2,
          "0"
        );


      const copy =
        document.createElement(
          "div"
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


      title.className =
        "draft-card-title";


      title.textContent =
        article.title.trim() ||
        "BORRADOR SIN TÍTULO";


      const meta =
        document.createElement(
          "div"
        );


      meta.className =
        "draft-card-meta";


      meta.textContent =
        article.updatedAt
          ? `EDITADO ${formatShortDate(article.updatedAt)}`
          : `CREADO ${formatShortDate(article.createdAt)}`;


      copy.append(
        sport,
        title,
        meta
      );


      const actions =
        document.createElement(
          "div"
        );


      actions.className =
        "draft-card-actions";


      const editButton =
        document.createElement(
          "button"
        );


      editButton.className =
        "edit-draft-button";


      editButton.type =
        "button";


      editButton.textContent =
        "EDITAR";


      editButton.addEventListener(
        "click",
        () => {

          closeDraftsManager();


          openEditor(
            article.id
          );

        }
      );


      const deleteButton =
        document.createElement(
          "button"
        );


      deleteButton.className =
        "delete-draft-button";


      deleteButton.type =
        "button";


      deleteButton.textContent =
        "ELIMINAR";


      deleteButton.addEventListener(
        "click",
        () => {

          openDeleteConfirmation(
            article.id
          );

        }
      );


      actions.append(
        editButton,
        deleteButton
      );


      card.append(
        number,
        copy,
        actions
      );


      draftsList.appendChild(
        card
      );

    }
  );

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
      findArticle(
        articleId
      );


    if (!article) {

      return;

    }


    populateEditor(
      article
    );


    editorHeading.textContent =
      "EDITAR NOTICIA";


    updateEditorStatus(
      article.status
    );


    updateEditorDateInfo(
      article
    );


    updateEditorActionLabels(
      article
    );

  } else {

    editorHeading.textContent =
      "NUEVA NOTICIA";


    updateEditorStatus(
      "draft",
      true
    );


    updateEditorDateInfo(
      null
    );


    updateEditorActionLabels(
      null
    );

  }


  updateCharacterCounters();


  captureEditorInitialState();


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


function requestCloseEditor() {

  updateEditorDirtyState();


  if (
    editorHasUnsavedChanges
  ) {

    openUnsavedModal();

    return;

  }


  closeEditorImmediately();

}


function closeEditorImmediately() {

  editorModal.classList.remove(
    "open"
  );


  editorModal.setAttribute(
    "aria-hidden",
    "true"
  );


  editorHasUnsavedChanges =
    false;


  editorInitialState =
    "";


  updateEditorSaveStateDisplay();


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


  editorHasUnsavedChanges =
    false;


  updateEditorSaveStateDisplay();

}


function populateEditor(
  article
) {

  articleIdInput.value =
    article.id;


  sportInput.value =
    article.sport;


  authorInput.value =
    article.author;


  titleInput.value =
    article.title;


  summaryInput.value =
    article.summary;


  contentInput.value =
    article.content;


  imageUrlInput.value =
    article.imageUrl;


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
    article.imageMode
  );


  updateImagePreview();

}


function updateEditorStatus(
  status,
  isNew = false
) {

  editorStatusValue.classList.remove(
    "draft",
    "published"
  );


  if (
    status === "published"
  ) {

    editorStatusValue.classList.add(
      "published"
    );


    editorStatusValue.textContent =
      "PUBLICADA";

  } else {

    editorStatusValue.classList.add(
      "draft"
    );


    editorStatusValue.textContent =
      isNew
        ? "BORRADOR NUEVO"
        : "BORRADOR";

  }

}


function updateEditorActionLabels(
  article
) {

  if (
    article?.status ===
    "published"
  ) {

    saveDraftButtonText.textContent =
      "MOVER A BORRADOR";


    publishButtonText.textContent =
      "GUARDAR CAMBIOS";


    return;

  }


  saveDraftButtonText.textContent =
    "GUARDAR BORRADOR";


  publishButtonText.textContent =
    "PUBLICAR NOTICIA";

}


function updateCharacterCounters() {

  updateCharacterCounter(
    titleInput.value.length,
    160,
    titleCharacterCount
  );


  updateCharacterCounter(
    summaryInput.value.length,
    350,
    summaryCharacterCount
  );

}


function updateCharacterCounter(
  current,
  maximum,
  element
) {

  element.textContent =
    `${current} / ${maximum}`;


  const warningPoint =
    Math.floor(
      maximum * 0.85
    );


  element.classList.toggle(
    "warning",
    current >= warningPoint &&
    current < maximum
  );


  element.classList.toggle(
    "limit",
    current >= maximum
  );

}


function updateEditorDateInfo(
  article
) {

  if (!article) {

    editorDateInfo.textContent =
      "AÚN NO GUARDADA";


    return;

  }


  const created =
    formatEditorDateTime(
      article.createdAt
    );


  if (
    article.updatedAt
  ) {

    const updated =
      formatEditorDateTime(
        article.updatedAt
      );


    editorDateInfo.textContent =
      `CREADA ${created} · EDITADA ${updated}`;


    return;

  }


  editorDateInfo.textContent =
    `CREADA ${created}`;

}


/* =========================================================
   UNSAVED CHANGES
========================================================= */

function getEditorState() {

  return JSON.stringify({

    articleId:
      articleIdInput.value,

    sport:
      sportInput.value,

    author:
      authorInput.value,

    title:
      titleInput.value,

    summary:
      summaryInput.value,

    content:
      contentInput.value,

    imageUrl:
      imageUrlInput.value,

    imageMode:
      imageModeInput.value,

    focusX:
      focusXInput.value,

    focusY:
      focusYInput.value,

    zoom:
      imageZoomInput.value

  });

}


function captureEditorInitialState() {

  editorInitialState =
    getEditorState();


  editorHasUnsavedChanges =
    false;


  updateEditorSaveStateDisplay();

}


function updateEditorDirtyState() {

  if (!editorInitialState) {

    return;

  }


  editorHasUnsavedChanges =
    getEditorState() !==
    editorInitialState;


  updateEditorSaveStateDisplay();

}


function updateEditorSaveStateDisplay() {

  editorSaveState.classList.remove(
    "clean",
    "dirty"
  );


  if (
    editorHasUnsavedChanges
  ) {

    editorSaveState.classList.add(
      "dirty"
    );


    editorSaveState.textContent =
      "CAMBIOS SIN GUARDAR";

  } else {

    editorSaveState.classList.add(
      "clean"
    );


    editorSaveState.textContent =
      "SIN CAMBIOS";

  }

}


function openUnsavedModal() {

  unsavedModal.classList.add(
    "open"
  );


  unsavedModal.setAttribute(
    "aria-hidden",
    "false"
  );


  syncBodyScrollState();

}


function closeUnsavedModal() {

  unsavedModal.classList.remove(
    "open"
  );


  unsavedModal.setAttribute(
    "aria-hidden",
    "true"
  );


  syncBodyScrollState();

}


function discardEditorChanges() {

  editorHasUnsavedChanges =
    false;


  closeUnsavedModal();


  closeEditorImmediately();


  showToast(
    "CAMBIOS DESCARTADOS."
  );

}


/* =========================================================
   MOVE TO DRAFT
========================================================= */

function requestDraftSave() {

  const existingArticle =
    articleIdInput.value
      ? findArticle(
          articleIdInput.value
        )
      : null;


  if (
    existingArticle?.status ===
    "published"
  ) {

    openMoveDraftModal();

    return;

  }


  saveArticle(
    "draft"
  );

}


function openMoveDraftModal() {

  moveDraftModal.classList.add(
    "open"
  );


  moveDraftModal.setAttribute(
    "aria-hidden",
    "false"
  );


  syncBodyScrollState();

}


function closeMoveDraftModal() {

  moveDraftModal.classList.remove(
    "open"
  );


  moveDraftModal.setAttribute(
    "aria-hidden",
    "true"
  );


  syncBodyScrollState();

}


/* =========================================================
   SAVE ARTICLE
========================================================= */

function saveArticle(
  targetStatus
) {

  if (
    targetStatus === "published" &&
    !articleForm.reportValidity()
  ) {

    showToast(
      "COMPLETA LOS CAMPOS OBLIGATORIOS PARA PUBLICAR."
    );


    return;

  }


  const existingId =
    articleIdInput.value.trim();


  const existingArticle =
    existingId
      ? findArticle(
          existingId
        )
      : null;


  const now =
    new Date().toISOString();


  createInternalBackup(
    targetStatus === "draft"
      ? "Antes de guardar borrador"
      : "Antes de publicar noticia"
  );


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

    imageMode:
      imageModeInput.value,

    status:
      targetStatus,

    updatedAt:
      now

  };


  if (
    targetStatus === "published"
  ) {

    articleData.publishedAt =
      existingArticle?.status === "published" &&
      existingArticle?.publishedAt
        ? existingArticle.publishedAt
        : now;

  } else {

    articleData.publishedAt =
      null;

  }


  if (existingArticle) {

    const index =
      articles.findIndex(
        (article) =>
          String(article.id) ===
          String(existingId)
      );


    articles[index] = {

      ...existingArticle,

      ...articleData

    };

  } else {

    articles.unshift({

      id:
        createArticleId(),

      ...articleData,

      createdAt:
        now

    });

  }


  if (
    !persistArticles()
  ) {

    return;

  }


  createInternalBackup(
    targetStatus === "draft"
      ? "Después de guardar borrador"
      : "Después de publicar noticia"
  );


  moveDraftModal.classList.remove(
    "open"
  );


  moveDraftModal.setAttribute(
    "aria-hidden",
    "true"
  );


  editorHasUnsavedChanges =
    false;


  editorInitialState =
    "";


  closeEditorImmediately();


  renderCurrentView();


  updateManagementCounts();


  updateBackupStatus();


  if (
    targetStatus === "draft"
  ) {

    showToast(
      existingArticle?.status ===
        "published"
        ? "NOTICIA MOVIDA A BORRADORES."
        : "BORRADOR GUARDADO."
    );

  } else {

    showToast(
      existingArticle?.status ===
        "published"
        ? "NOTICIA ACTUALIZADA."
        : "NOTICIA PUBLICADA."
    );

  }

}


/* =========================================================
   IMAGE EDITOR
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


function updateImagePreview() {

  const url =
    imageUrlInput.value.trim();


  const x =
    Number(
      focusXInput.value
    );


  const y =
    Number(
      focusYInput.value
    );


  const zoom =
    Number(
      imageZoomInput.value
    );


  focusXOutput.value =
    `${x}%`;


  focusYOutput.value =
    `${y}%`;


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


  if (
    imageModeInput.value ===
    "crop"
  ) {

    imagePreviewElement.style.objectPosition =
      `${x}% ${y}%`;


    imagePreviewElement.style.transform =
      `scale(${zoom / 100})`;

  } else {

    imagePreviewElement.style.objectPosition =
      "center";


    imagePreviewElement.style.transform =
      "none";

  }


  imagePreviewElement.onload =
    () => {

      imagePreview.classList.add(
        "has-image"
      );

    };


  imagePreviewElement.onerror =
    () => {

      imagePreview.classList.remove(
        "has-image"
      );

    };

}


/* =========================================================
   READER
========================================================= */

function openReader(
  articleId
) {

  const article =
    findArticle(
      articleId
    );


  if (
    !article ||
    article.status !==
      "published"
  ) {

    return;

  }


  currentReaderArticleId =
    article.id;


  readerSport.textContent =
    getSportLabel(
      article.sport
    );


  readerPublishedDate.textContent =
    formatFullDate(
      article.publishedAt ||
      article.createdAt
    );


  readerTitle.textContent =
    article.title;


  readerSummary.textContent =
    article.summary;


  readerAuthor.textContent =
    article.author;


  readerReadTime.textContent =
    calculateReadingTime(
      article
    );


  renderReaderUpdatedDate(
    article
  );


  renderReaderImage(
    article
  );


  renderReaderContent(
    article.content
  );


  renderReaderRelatedStories(
    article
  );


  renderReaderNavigation(
    article
  );


  readerModal.classList.add(
    "open"
  );


  readerModal.setAttribute(
    "aria-hidden",
    "false"
  );


  readerPanel.scrollTop =
    0;


  updateReaderScrollUI();


  syncBodyScrollState();

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


  readerProgressBar.style.transform =
    "scaleX(0)";


  readerBackToTopButton.classList.remove(
    "visible"
  );


  syncBodyScrollState();

}


function renderReaderImage(
  article
) {

  readerImage.onerror =
    null;


  if (
    !article.imageUrl
  ) {

    readerImageContainer.classList.add(
      "hidden"
    );


    readerImage.removeAttribute(
      "src"
    );


    return;

  }


  readerImageContainer.classList.remove(
    "hidden"
  );


  readerImage.src =
    article.imageUrl;


  readerImage.alt =
    article.title;


  readerImage.onerror =
    () => {

      readerImageContainer.classList.add(
        "hidden"
      );

    };

}


/* =========================================================
   ARTICLE BODY FORMATTER
========================================================= */

function renderReaderContent(
  content
) {

  readerBody.innerHTML =
    "";


  const lines =
    String(
      content || ""
    )
      .replace(
        /\r\n?/g,
        "\n"
      )
      .split("\n");


  let paragraphBuffer =
    [];

  let listBuffer =
    [];


  function flushParagraph() {

    if (
      paragraphBuffer.length === 0
    ) {

      return;

    }


    const paragraph =
      document.createElement(
        "p"
      );


    paragraph.textContent =
      paragraphBuffer.join(
        " "
      );


    readerBody.appendChild(
      paragraph
    );


    paragraphBuffer =
      [];

  }


  function flushList() {

    if (
      listBuffer.length === 0
    ) {

      return;

    }


    const list =
      document.createElement(
        "ul"
      );


    listBuffer.forEach(
      (itemText) => {

        const item =
          document.createElement(
            "li"
          );


        item.textContent =
          itemText;


        list.appendChild(
          item
        );

      }
    );


    readerBody.appendChild(
      list
    );


    listBuffer =
      [];

  }


  lines.forEach(
    (rawLine) => {

      const line =
        rawLine.trim();


      if (!line) {

        flushParagraph();

        flushList();

        return;

      }


      if (
        /^###\s+/.test(
          line
        )
      ) {

        flushParagraph();

        flushList();


        const heading =
          document.createElement(
            "h3"
          );


        heading.textContent =
          line.replace(
            /^###\s+/,
            ""
          );


        readerBody.appendChild(
          heading
        );


        return;

      }


      if (
        /^##\s+/.test(
          line
        )
      ) {

        flushParagraph();

        flushList();


        const heading =
          document.createElement(
            "h2"
          );


        heading.textContent =
          line.replace(
            /^##\s+/,
            ""
          );


        readerBody.appendChild(
          heading
        );


        return;

      }


      if (
        /^>\s?/.test(
          line
        )
      ) {

        flushParagraph();

        flushList();


        const quote =
          document.createElement(
            "blockquote"
          );


        quote.textContent =
          line.replace(
            /^>\s?/,
            ""
          );


        readerBody.appendChild(
          quote
        );


        return;

      }


      if (
        /^-{3,}$/.test(
          line
        )
      ) {

        flushParagraph();

        flushList();


        readerBody.appendChild(
          document.createElement(
            "hr"
          )
        );


        return;

      }


      if (
        /^-\s+/.test(
          line
        )
      ) {

        flushParagraph();


        listBuffer.push(
          line.replace(
            /^-\s+/,
            ""
          )
        );


        return;

      }


      flushList();


      paragraphBuffer.push(
        line
      );

    }
  );


  flushParagraph();

  flushList();

}


/* =========================================================
   READING TIME
========================================================= */

function calculateReadingTime(
  article
) {

  const text =
    `${article.summary || ""} ${article.content || ""}`
      .replace(
        /[#>-]/g,
        " "
      )
      .trim();


  if (!text) {

    return "1 MIN";

  }


  const words =
    text
      .split(/\s+/)
      .filter(Boolean)
      .length;


  const minutes =
    Math.max(
      1,
      Math.ceil(
        words / 220
      )
    );


  return `${minutes} MIN`;

}


function hasMeaningfulUpdate(
  article
) {

  if (
    !article.updatedAt
  ) {

    return false;

  }


  const updatedTime =
    new Date(
      article.updatedAt
    ).getTime();


  const publicationTime =
    new Date(
      article.publishedAt ||
      article.createdAt
    ).getTime();


  if (
    !Number.isFinite(
      updatedTime
    ) ||
    !Number.isFinite(
      publicationTime
    )
  ) {

    return false;

  }


  return Math.abs(
    updatedTime -
    publicationTime
  ) > 60000;

}


function renderReaderUpdatedDate(
  article
) {

  const showUpdated =
    hasMeaningfulUpdate(
      article
    );


  readerUpdatedBlock.hidden =
    !showUpdated;


  readerUpdatedDate.textContent =
    showUpdated
      ? formatEditorDateTime(
          article.updatedAt
        )
      : "";

}


/* =========================================================
   RELATED STORIES
========================================================= */

function renderReaderRelatedStories(
  currentArticle
) {

  readerRelatedStories.innerHTML =
    "";


  const related =
    getPublishedArticles()
      .filter(
        (article) =>
          article.sport ===
            currentArticle.sport &&
          String(article.id) !==
            String(currentArticle.id)
      )
      .slice(
        0,
        3
      );


  readerRelatedSection.hidden =
    related.length === 0;


  if (
    related.length === 0
  ) {

    return;

  }


  readerRelatedTitle.textContent =
    `MÁS DE ${getSportLabel(
      currentArticle.sport
    )}`;


  related.forEach(
    (article, index) => {

      const card =
        document.createElement(
          "article"
        );


      card.className =
        "reader-related-card";


      makeStoryInteractive(
        card,
        article.id
      );


      const number =
        document.createElement(
          "div"
        );


      number.className =
        "reader-related-index";


      number.textContent =
        String(
          index + 1
        ).padStart(
          2,
          "0"
        );


      const title =
        document.createElement(
          "h3"
        );


      title.textContent =
        article.title;


      const meta =
        document.createElement(
          "div"
        );


      meta.className =
        "reader-related-meta";


      meta.textContent =
        `${article.author} · ${formatShortDate(
          article.publishedAt ||
          article.createdAt
        )}`;


      card.append(
        number,
        title,
        meta
      );


      readerRelatedStories.appendChild(
        card
      );

    }
  );

}


/* =========================================================
   READER NAVIGATION
========================================================= */

function renderReaderNavigation(
  currentArticle
) {

  const published =
    getPublishedArticles();


  const currentIndex =
    published.findIndex(
      (article) =>
        String(article.id) ===
        String(currentArticle.id)
    );


  const newer =
    currentIndex > 0
      ? published[
          currentIndex - 1
        ]
      : null;


  const older =
    currentIndex >= 0 &&
    currentIndex <
      published.length - 1
      ? published[
          currentIndex + 1
        ]
      : null;


  configureReaderNavigationButton(
    readerPreviousButton,
    readerPreviousTitle,
    older
  );


  configureReaderNavigationButton(
    readerNextButton,
    readerNextTitle,
    newer
  );

}


function configureReaderNavigationButton(
  button,
  titleElement,
  article
) {

  if (!article) {

    button.hidden =
      true;


    button.dataset.articleId =
      "";


    titleElement.textContent =
      "";


    return;

  }


  button.hidden =
    false;


  button.dataset.articleId =
    article.id;


  titleElement.textContent =
    article.title;

}


/* =========================================================
   READER SCROLL UI
========================================================= */

function updateReaderScrollUI() {

  const scrollable =
    readerPanel.scrollHeight -
    readerPanel.clientHeight;


  const progress =
    scrollable > 0
      ? readerPanel.scrollTop /
        scrollable
      : 0;


  readerProgressBar.style.transform =
    `scaleX(${clampNumber(
      progress,
      0,
      1,
      0
    )})`;


  readerBackToTopButton.classList.toggle(
    "visible",
    readerPanel.scrollTop > 550
  );

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

  if (
    !pendingDeleteArticleId
  ) {

    return;

  }


  const draftManagerWasOpen =
    draftsModal.classList.contains(
      "open"
    );


  createInternalBackup(
    "Antes de eliminar noticia"
  );


  articles =
    articles.filter(
      (article) =>
        String(article.id) !==
        String(
          pendingDeleteArticleId
        )
    );


  if (
    !persistArticles()
  ) {

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


  renderCurrentView();


  updateManagementCounts();


  updateBackupStatus();


  if (
    draftManagerWasOpen
  ) {

    renderDraftsManager();

  }


  syncBodyScrollState();


  showToast(
    "NOTICIA ELIMINADA."
  );

}


/* =========================================================
   SIDE MENU
========================================================= */

function openSideMenu() {

  updateManagementCounts();


  updateBackupStatus();


  sideMenu.classList.add(
    "open"
  );


  sideMenu.setAttribute(
    "aria-hidden",
    "false"
  );


  syncBodyScrollState();

}


function closeSideMenu() {

  sideMenu.classList.remove(
    "open"
  );


  sideMenu.setAttribute(
    "aria-hidden",
    "true"
  );


  syncBodyScrollState();

}


/* =========================================================
   EXPORT BACKUP
========================================================= */

function exportJournalBackup() {

  createInternalBackup(
    "Exportación manual JSON"
  );


  const payload = {

    app:
      "Sports Journal",

    version:
      2,

    exportedAt:
      new Date().toISOString(),

    articleCount:
      articles.length,

    publishedCount:
      getPublishedArticles().length,

    draftCount:
      getDraftArticles().length,

    articles:
      cloneArticles(
        articles
      )

  };


  const blob =
    new Blob(
      [
        JSON.stringify(
          payload,
          null,
          2
        )
      ],
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


  showToast(
    "RESPALDO EXPORTADO."
  );

}


/* =========================================================
   RESTORE BACKUP
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

    const parsed =
      JSON.parse(
        await file.text()
      );


    const imported =
      Array.isArray(parsed)
        ? parsed
        : parsed.articles;


    if (
      !Array.isArray(imported)
    ) {

      throw new Error(
        "Formato inválido."
      );

    }


    pendingRestore = {

      fileName:
        file.name,

      articles:
        imported
          .filter(
            (article) =>
              article &&
              typeof article ===
                "object"
          )
          .map(
            normalizeArticle
          )

    };


    restoreFileName.textContent =
      file.name;


    restoreStoryCount.textContent =
      `${pendingRestore.articles.length} ${
        pendingRestore.articles.length === 1
          ? "NOTICIA"
          : "NOTICIAS"
      }`;


    currentStoryCount.textContent =
      `${articles.length} ${
        articles.length === 1
          ? "NOTICIA"
          : "NOTICIAS"
      }`;


    restoreModal.classList.add(
      "open"
    );


    restoreModal.setAttribute(
      "aria-hidden",
      "false"
    );


    syncBodyScrollState();

  } catch (error) {

    console.error(error);


    showToast(
      "NO SE PUDO LEER EL RESPALDO."
    );

  }


  backupFileInput.value =
    "";

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


function replaceWithPendingBackup() {

  if (
    !pendingRestore
  ) {

    return;

  }


  createInternalBackup(
    "Antes de reemplazar respaldo"
  );


  articles =
    cloneArticles(
      pendingRestore.articles
    );


  if (
    !persistArticles()
  ) {

    return;

  }


  createInternalBackup(
    "Después de restaurar respaldo"
  );


  finishRestore(
    "DIARIO RESTAURADO."
  );

}


function mergePendingBackup() {

  if (
    !pendingRestore
  ) {

    return;

  }


  createInternalBackup(
    "Antes de combinar respaldo"
  );


  const map =
    new Map();


  articles.forEach(
    (article) => {

      map.set(
        String(article.id),
        article
      );

    }
  );


  pendingRestore.articles.forEach(
    (article) => {

      map.set(
        String(article.id),
        article
      );

    }
  );


  articles =
    Array.from(
      map.values()
    );


  if (
    !persistArticles()
  ) {

    return;

  }


  createInternalBackup(
    "Después de combinar respaldo"
  );


  finishRestore(
    "RESPALDO COMBINADO."
  );

}


function finishRestore(
  message
) {

  restoreModal.classList.remove(
    "open"
  );


  restoreModal.setAttribute(
    "aria-hidden",
    "true"
  );


  pendingRestore =
    null;


  normalizeExistingArticles();


  renderCurrentView();


  updateManagementCounts();


  updateBackupStatus();


  syncBodyScrollState();


  showToast(
    message
  );

}


/* =========================================================
   HELPERS
========================================================= */

function createImagePlaceholder() {

  const placeholder =
    document.createElement(
      "div"
    );


  placeholder.className =
    "lead-image-placeholder";


  const label =
    document.createElement(
      "span"
    );


  label.textContent =
    "SIN IMAGEN DE PORTADA";


  placeholder.appendChild(
    label
  );


  return placeholder;

}


function getSportLabel(
  sport
) {

  return (
    SPORT_LABELS[sport] ||
    String(
      sport || ""
    ).toUpperCase()
  );

}


function findArticle(id) {

  return articles.find(
    (article) =>
      String(article.id) ===
      String(id)
  );

}


function getArticleActivityTime(
  article
) {

  return new Date(
    article.updatedAt ||
    article.createdAt ||
    0
  ).getTime();

}


function getArticleImageMode(
  article
) {

  return article.imageMode ===
    "full"
    ? "full"
    : "crop";

}


function parseImagePosition(
  position
) {

  if (
    typeof position ===
    "string"
  ) {

    const values =
      position
        .replaceAll(
          "%",
          ""
        )
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
    value,
    100,
    180,
    100
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


function createArticleId() {

  if (
    typeof crypto !==
      "undefined" &&
    typeof crypto.randomUUID ===
      "function"
  ) {

    return crypto.randomUUID();

  }


  return (
    `${Date.now()}-` +
    Math.random()
      .toString(16)
      .slice(2)
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

  const open =
    sideMenu.classList.contains(
      "open"
    ) ||
    draftsModal.classList.contains(
      "open"
    ) ||
    editorModal.classList.contains(
      "open"
    ) ||
    unsavedModal.classList.contains(
      "open"
    ) ||
    moveDraftModal.classList.contains(
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
    );


  document.body.classList.toggle(
    "modal-open",
    open
  );

}


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
      3000
    );

}


/* =========================================================
   DATES
========================================================= */

function renderEditionDate() {

  editionDate.textContent =
    new Intl.DateTimeFormat(
      "es-ES",
      {
        weekday:
          "long",

        day:
          "numeric",

        month:
          "long",

        year:
          "numeric"
      }
    )
      .format(
        new Date()
      )
      .toUpperCase();

}


function formatShortDate(
  dateString
) {

  return formatDate(
    dateString,
    {
      day:
        "numeric",

      month:
        "short",

      year:
        "numeric"
    }
  );

}


function formatFullDate(
  dateString
) {

  return formatDate(
    dateString,
    {
      day:
        "numeric",

      month:
        "long",

      year:
        "numeric"
    }
  );

}


function formatEditorDateTime(
  dateString
) {

  return formatDate(
    dateString,
    {
      day:
        "numeric",

      month:
        "short",

      year:
        "numeric",

      hour:
        "2-digit",

      minute:
        "2-digit"
    }
  );

}


function formatDate(
  dateString,
  options
) {

  if (
    !dateString
  ) {

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
    options
  )
    .format(date)
    .toUpperCase();

}


function formatBackupTime(
  date
) {

  if (
    !date ||
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


  return [

    date.getFullYear(),

    String(
      date.getMonth() + 1
    ).padStart(
      2,
      "0"
    ),

    String(
      date.getDate()
    ).padStart(
      2,
      "0"
    )

  ].join("-");

}