const STORAGE_KEY =
  "sportsJournalArticles";

const BACKUPS_KEY =
  "sportsJournalAutomaticBackups";

const MAX_AUTOMATIC_BACKUPS =
  16;

const MAX_TAGS =
  8;

const MAX_TAG_LENGTH =
  32;


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

const byId =
  (id) =>
    document.getElementById(id);


const editionDate =
  byId("editionDate");

const menuButton =
  byId("menuButton");

const sideMenu =
  byId("sideMenu");

const frontPageMenuButton =
  byId("frontPageMenuButton");

const menuWriteStoryButton =
  byId("menuWriteStoryButton");

const draftsMenuButton =
  byId("draftsMenuButton");

const publishedMenuButton =
  byId("publishedMenuButton");

const draftCount =
  byId("draftCount");

const publishedCount =
  byId("publishedCount");

const draftsModal =
  byId("draftsModal");

const draftsList =
  byId("draftsList");

const exportBackupButton =
  byId("exportBackupButton");

const restoreBackupButton =
  byId("restoreBackupButton");

const backupFileInput =
  byId("backupFileInput");

const internalBackupStatus =
  byId("internalBackupStatus");

const sportFilters =
  document.querySelectorAll(
    ".sport-filter"
  );

const searchInput =
  byId("searchInput");

const storyCount =
  byId("storyCount");

const searchContextBar =
  byId("searchContextBar");

const searchContextText =
  byId("searchContextText");

const clearSearchButton =
  byId("clearSearchButton");

const homeView =
  byId("homeView");

const sportPage =
  byId("sportPage");

const leadStories =
  byId("leadStories");

const latestStories =
  byId("latestStories");

const sportPageEyebrow =
  byId("sportPageEyebrow");

const sportPageTitle =
  byId("sportPageTitle");

const sportPageDescription =
  byId("sportPageDescription");

const sportFeaturedHeading =
  byId("sportFeaturedHeading");

const sportFeatured =
  byId("sportFeatured");

const sportSecondarySection =
  byId("sportSecondarySection");

const sportSecondary =
  byId("sportSecondary");

const sportMoreSection =
  byId("sportMoreSection");

const sportMoreHeading =
  byId("sportMoreHeading");

const sportMoreList =
  byId("sportMoreList");

const openEditorButton =
  byId("openEditorButton");

const brandButton =
  byId("brandButton");


/* EDITOR */

const editorModal =
  byId("editorModal");

const editorHeading =
  byId("editorHeading");

const editorStatusValue =
  byId("editorStatusValue");

const editorSaveState =
  byId("editorSaveState");

const editorDateInfo =
  byId("editorDateInfo");

const articleForm =
  byId("articleForm");

const articleIdInput =
  byId("articleId");

const sportInput =
  byId("sportInput");

const authorInput =
  byId("authorInput");

const titleInput =
  byId("titleInput");

const summaryInput =
  byId("summaryInput");

const tagsInput =
  byId("tagsInput");

const tagsCount =
  byId("tagsCount");

const tagsPreview =
  byId("tagsPreview");

const contentInput =
  byId("contentInput");

const titleCharacterCount =
  byId("titleCharacterCount");

const summaryCharacterCount =
  byId("summaryCharacterCount");

const saveDraftButton =
  byId("saveDraftButton");

const saveDraftButtonText =
  byId("saveDraftButtonText");

const publishButtonText =
  byId("publishButtonText");


/* IMAGE */

const imageUrlInput =
  byId("imageUrlInput");

const imageModeInput =
  byId("imageMode");

const imageModeButtons =
  document.querySelectorAll(
    "[data-image-mode]"
  );

const imagePreview =
  byId("imagePreview");

const imagePreviewElement =
  byId("imagePreviewElement");

const focusXInput =
  byId("focusXInput");

const focusYInput =
  byId("focusYInput");

const imageZoomInput =
  byId("imageZoomInput");

const focusXOutput =
  byId("focusXOutput");

const focusYOutput =
  byId("focusYOutput");

const zoomOutput =
  byId("zoomOutput");

const cropControls =
  byId("cropControls");

const fullImageInfo =
  byId("fullImageInfo");

const resetImageButton =
  byId("resetImageButton");


/* UNSAVED */

const unsavedModal =
  byId("unsavedModal");

const keepEditingButton =
  byId("keepEditingButton");

const discardChangesButton =
  byId("discardChangesButton");

const moveDraftModal =
  byId("moveDraftModal");

const keepPublishedButton =
  byId("keepPublishedButton");

const confirmMoveDraftButton =
  byId("confirmMoveDraftButton");


/* READER */

const readerModal =
  byId("readerModal");

const readerPanel =
  readerModal.querySelector(
    ".reader-panel"
  );

const readerSport =
  byId("readerSport");

const readerPublishedDate =
  byId("readerPublishedDate");

const readerTitle =
  byId("readerTitle");

const readerSummary =
  byId("readerSummary");

const readerAuthor =
  byId("readerAuthor");

const readerReadTime =
  byId("readerReadTime");

const readerUpdatedBlock =
  byId("readerUpdatedBlock");

const readerUpdatedDate =
  byId("readerUpdatedDate");

const readerTopics =
  byId("readerTopics");

const readerTopicsList =
  byId("readerTopicsList");

const readerImageContainer =
  byId("readerImageContainer");

const readerImage =
  byId("readerImage");

const readerBody =
  byId("readerBody");

const readerRelatedSection =
  byId("readerRelatedSection");

const readerRelatedTitle =
  byId("readerRelatedTitle");

const readerRelatedStories =
  byId("readerRelatedStories");

const readerPreviousButton =
  byId("readerPreviousButton");

const readerPreviousTitle =
  byId("readerPreviousTitle");

const readerNextButton =
  byId("readerNextButton");

const readerNextTitle =
  byId("readerNextTitle");

const readerEditButton =
  byId("readerEditButton");

const readerDeleteButton =
  byId("readerDeleteButton");

const readerProgressBar =
  byId("readerProgressBar");

const readerBackToTopButton =
  byId("readerBackToTopButton");


/* DELETE / RESTORE */

const confirmModal =
  byId("confirmModal");

const confirmDeleteButton =
  byId("confirmDeleteButton");

const restoreModal =
  byId("restoreModal");

const restoreFileName =
  byId("restoreFileName");

const restoreStoryCount =
  byId("restoreStoryCount");

const currentStoryCount =
  byId("currentStoryCount");

const mergeBackupButton =
  byId("mergeBackupButton");

const replaceBackupButton =
  byId("replaceBackupButton");

const toast =
  byId("toast");


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

  renderTagPreview();

  bindEvents();

}


/* =========================================================
   STORAGE
========================================================= */

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
      !Array.isArray(
        legacyData
      )
    ) {

      continue;

    }


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


  const backups =
    loadInternalBackups();


  return (
    backups.length > 0 &&
    Array.isArray(
      backups[0].articles
    )
  )
    ? backups[0].articles
    : [];

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


/* =========================================================
   BACKUPS
========================================================= */

function loadInternalBackups() {

  const saved =
    readJsonFromStorage(
      BACKUPS_KEY
    );


  if (
    !Array.isArray(saved)
  ) {

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


function cloneArticles(source) {

  return JSON.parse(
    JSON.stringify(source)
  );

}


function createInternalBackup(
  reason,
  sourceArticles = articles
) {

  const backups =
    loadInternalBackups();


  backups.unshift({

    id:
      createArticleId(),

    createdAt:
      new Date().toISOString(),

    reason,

    articles:
      cloneArticles(
        sourceArticles
      )

  });


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


  internalBackupStatus.textContent =
    `${backups.length} COPIAS · ${formatBackupTime(
      new Date(
        backups[0].createdAt
      )
    )}`;

}


/* =========================================================
   NORMALIZE ARTICLES
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
          JSON.stringify(
            normalized
          ) !==
          JSON.stringify(
            article
          )
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


  if (
    ![
      "football",
      "tennis",
      "baseball",
      "basketball"
    ].includes(
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


  /*
    NEW:
    old articles automatically receive tags: []
  */

  safe.tags =
    normalizeTags(
      safe.tags
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
    () =>
      openEditor()
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


  /*
    Search is now accent-insensitive.
  */

  searchInput.addEventListener(
    "input",
    () => {

      searchTerm =
        normalizeSearchText(
          searchInput.value.trim()
        );


      renderCurrentView();

    }
  );


  clearSearchButton.addEventListener(
    "click",
    () =>
      clearSearchState(
        true
      )
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


  /*
    NEW:
    live tag preview.
  */

  tagsInput.addEventListener(
    "input",
    () => {

      renderTagPreview();

      updateEditorDirtyState();

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
    () =>
      saveArticle(
        "draft"
      )
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
        window.innerWidth <=
        650
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

        return closeMoveDraftModal();

      }


      if (
        unsavedModal.classList.contains(
          "open"
        )
      ) {

        return closeUnsavedModal();

      }


      if (
        restoreModal.classList.contains(
          "open"
        )
      ) {

        return closeRestoreModal();

      }


      if (
        confirmModal.classList.contains(
          "open"
        )
      ) {

        return closeConfirmModal();

      }


      if (
        editorModal.classList.contains(
          "open"
        )
      ) {

        return requestCloseEditor();

      }


      if (
        draftsModal.classList.contains(
          "open"
        )
      ) {

        return closeDraftsManager();

      }


      if (
        readerModal.classList.contains(
          "open"
        )
      ) {

        return closeReader();

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


  activeSport === "all"
    ? renderFrontPage()
    : renderSportPage();


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
   SEARCH
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

  searchInput.placeholder =
    activeSport === "all"
      ? "JUGADOR, EQUIPO, NOTICIA..."
      : `BUSCAR EN ${getSportLabel(activeSport)}...`;

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

  } else {

    const sportLabel =
      getSportLabel(
        activeSport
      );


    searchContextText.textContent =
      `EN ${sportLabel} · “${rawSearch}”`;


    clearSearchButton.textContent =
      `VER TODO ${sportLabel}`;

  }

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


  const suffix =
    activeSport === "all"
      ? ""
      : ` · ${getSportLabel(activeSport)}`;


  storyCount.textContent =
    `${count} ${noun}${suffix}`;

}


/* =========================================================
   MOBILE SPORT NAV
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


  setTimeout(
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
        ).includes(
          searchTerm
        );

      }
    );

}


/*
  TAGS are included in searchable text.
*/

function getArticleSearchText(
  article
) {

  return normalizeSearchText(
    [
      article.title,
      article.author,
      article.summary,
      article.content,
      getSportLabel(
        article.sport
      ),
      ...(
        article.tags ||
        []
      )
    ].join(" ")
  );

}


/*
  Removes accents before searching.

  fútbol  -> futbol
  béisbol -> beisbol
*/

function normalizeSearchText(value) {

  return String(
    value || ""
  )
    .normalize(
      "NFD"
    )
    .replace(
      /[\u0300-\u036f]/g,
      ""
    )
    .toLowerCase();

}


function sortArticlesNewestFirst(
  a,
  b
) {

  return (
    new Date(
      b.publishedAt ||
      b.createdAt ||
      0
    ).getTime() -
    new Date(
      a.publishedAt ||
      a.createdAt ||
      0
    ).getTime()
  );

}


function updateManagementCounts() {

  draftCount.textContent =
    getDraftArticles().length;


  publishedCount.textContent =
    getPublishedArticles().length;

}


/* =========================================================
   FRONT PAGE
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


function renderSecondaryLeads(items) {

  if (
    !items.length
  ) {

    return;

  }


  const wrapper =
    document.createElement(
      "div"
    );


  wrapper.className =
    "secondary-leads";


  items.forEach(
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


function renderLatestStories(items) {

  if (
    !items.length
  ) {

    if (
      !searchTerm
    ) {

      latestStories.appendChild(
        createCustomEmptyState(
          "FIN DE LA PORTADA",
          "Las nuevas noticias aparecerán aquí cuando las tres posiciones principales estén ocupadas."
        )
      );

    }


    return;

  }


  items.forEach(
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
    !filtered.length
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
    secondary.length
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
    more.length
  ) {

    sportMoreSection.hidden =
      false;


    renderSportMore(
      more
    );

  }

}


function renderSportFeatured(article) {

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


function renderSportSecondary(items) {

  items.forEach(
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


function renderSportMore(items) {

  items.forEach(
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


      if (title) {

        title.className =
          "sport-more-title";

      }


      const number =
        row.querySelector(
          ".latest-index"
        );


      if (number) {

        number.className =
          "sport-more-index";

      }


      const info =
        row.querySelector(
          ".latest-info"
        );


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
   ARTICLE RENDER HELPERS
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
    getArticleImageMode(
      article
    ) === "crop"
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
    !drafts.length
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

  renderTagPreview();

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


  editorHasUnsavedChanges
    ? openUnsavedModal()
    : closeEditorImmediately();

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


  tagsInput.value =
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

  renderTagPreview();


  editorHasUnsavedChanges =
    false;


  updateEditorSaveStateDisplay();

}


function populateEditor(article) {

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


  tagsInput.value =
    normalizeTags(
      article.tags
    ).join(", ");


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

  renderTagPreview();

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

  } else {

    saveDraftButtonText.textContent =
      "GUARDAR BORRADOR";


    publishButtonText.textContent =
      "PUBLICAR NOTICIA";

  }

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


  updateTagCountState();

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


  editorDateInfo.textContent =
    article.updatedAt
      ? `CREADA ${created} · EDITADA ${formatEditorDateTime(article.updatedAt)}`
      : `CREADA ${created}`;

}


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

    tags:
      tagsInput.value,

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

  if (
    !editorInitialState
  ) {

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


  editorSaveState.classList.add(
    editorHasUnsavedChanges
      ? "dirty"
      : "clean"
  );


  editorSaveState.textContent =
    editorHasUnsavedChanges
      ? "CAMBIOS SIN GUARDAR"
      : "SIN CAMBIOS";

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


function requestDraftSave() {

  const existing =
    articleIdInput.value
      ? findArticle(
          articleIdInput.value
        )
      : null;


  existing?.status ===
  "published"
    ? openMoveDraftModal()
    : saveArticle(
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


  if (
    !validateTagsInput()
  ) {

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

    tags:
      parseTagsInput(
        tagsInput.value
      ),

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


  articleData.publishedAt =
    targetStatus === "published"
      ? (
          existingArticle?.status ===
            "published" &&
          existingArticle?.publishedAt

            ? existingArticle.publishedAt
            : now
        )
      : null;


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


  showToast(

    targetStatus === "draft"

      ? (
          existingArticle?.status ===
            "published"

            ? "NOTICIA MOVIDA A BORRADORES."
            : "BORRADOR GUARDADO."
        )

      : (
          existingArticle?.status ===
            "published"

            ? "NOTICIA ACTUALIZADA."
            : "NOTICIA PUBLICADA."
        )

  );

}


/* =========================================================
   TAG SYSTEM
========================================================= */

function rawTagParts(value) {

  return String(
    value || ""
  )
    .split(",")
    .map(
      (tag) =>
        tag.trim()
    )
    .filter(Boolean);

}


function parseTagsInput(value) {

  const seen =
    new Set();


  const tags =
    [];


  rawTagParts(
    value
  ).forEach(
    (tag) => {

      const clean =
        tag.replace(
          /\s+/g,
          " "
        );


      const key =
        normalizeSearchText(
          clean
        );


      if (
        !key ||
        seen.has(key)
      ) {

        return;

      }


      seen.add(key);

      tags.push(clean);

    }
  );


  return tags;

}


function normalizeTags(value) {

  const raw =
    Array.isArray(value)
      ? value.join(",")
      : String(
          value || ""
        );


  return parseTagsInput(raw)
    .filter(
      (tag) =>
        tag.length <=
        MAX_TAG_LENGTH
    )
    .slice(
      0,
      MAX_TAGS
    );

}


function validateTagsInput() {

  const uniqueTags =
    parseTagsInput(
      tagsInput.value
    );


  const tooLong =
    uniqueTags.find(
      (tag) =>
        tag.length >
        MAX_TAG_LENGTH
    );


  if (tooLong) {

    showToast(
      `EL TEMA “${tooLong}” SUPERA ${MAX_TAG_LENGTH} CARACTERES.`
    );


    tagsInput.focus();


    return false;

  }


  if (
    uniqueTags.length >
    MAX_TAGS
  ) {

    showToast(
      `USA COMO MÁXIMO ${MAX_TAGS} TEMAS POR NOTICIA.`
    );


    tagsInput.focus();


    return false;

  }


  return true;

}


function updateTagCountState() {

  const tags =
    parseTagsInput(
      tagsInput.value
    );


  tagsCount.textContent =
    `${tags.length} / ${MAX_TAGS}`;


  tagsCount.classList.toggle(
    "warning",
    tags.length >=
      MAX_TAGS - 1 &&
    tags.length <=
      MAX_TAGS
  );


  tagsCount.classList.toggle(
    "limit",
    tags.length >
      MAX_TAGS
  );

}


function renderTagPreview() {

  if (
    !tagsPreview ||
    !tagsCount
  ) {

    return;

  }


  const tags =
    parseTagsInput(
      tagsInput.value
    );


  tagsPreview.innerHTML =
    "";


  updateTagCountState();


  if (
    !tags.length
  ) {

    const empty =
      document.createElement(
        "span"
      );


    empty.className =
      "tag-preview-empty";


    empty.textContent =
      "SIN TEMAS TODAVÍA";


    tagsPreview.appendChild(
      empty
    );


    return;

  }


  tags
    .slice(
      0,
      MAX_TAGS
    )
    .forEach(
      (tag) => {

        tagsPreview.appendChild(
          createTopicChip(
            tag
          )
        );

      }
    );

}


function createTopicChip(tag) {

  const chip =
    document.createElement(
      "span"
    );


  chip.className =
    "topic-chip";


  chip.textContent =
    tag;


  return chip;

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


  renderReaderTopics(
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


/* =========================================================
   READER TAGS
========================================================= */

function renderReaderTopics(article) {

  const tags =
    normalizeTags(
      article.tags
    );


  readerTopicsList.innerHTML =
    "";


  readerTopics.hidden =
    !tags.length;


  tags.forEach(
    (tag) => {

      readerTopicsList.appendChild(
        createTopicChip(
          tag
        )
      );

    }
  );

}


/* =========================================================
   READER IMAGE
========================================================= */

function renderReaderImage(article) {

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
   ARTICLE BODY
========================================================= */

function renderReaderContent(content) {

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


  const flushParagraph =
    () => {

      if (
        !paragraphBuffer.length
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

    };


  const flushList =
    () => {

      if (
        !listBuffer.length
      ) {

        return;

      }


      const list =
        document.createElement(
          "ul"
        );


      listBuffer.forEach(
        (text) => {

          const item =
            document.createElement(
              "li"
            );


          item.textContent =
            text;


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

    };


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


  return `${
    Math.max(
      1,
      Math.ceil(
        words / 220
      )
    )
  } MIN`;

}


function hasMeaningfulUpdate(article) {

  if (
    !article.updatedAt
  ) {

    return false;

  }


  const updated =
    new Date(
      article.updatedAt
    ).getTime();


  const published =
    new Date(
      article.publishedAt ||
      article.createdAt
    ).getTime();


  return (
    Number.isFinite(updated) &&
    Number.isFinite(published) &&
    Math.abs(
      updated -
      published
    ) > 60000
  );

}


function renderReaderUpdatedDate(
  article
) {

  const show =
    hasMeaningfulUpdate(
      article
    );


  readerUpdatedBlock.hidden =
    !show;


  readerUpdatedDate.textContent =
    show
      ? formatEditorDateTime(
          article.updatedAt
        )
      : "";

}


/* =========================================================
   RELATED STORIES
========================================================= */

/*
  Shared tags now improve related story ranking.
*/

function relatedStoryScore(
  candidate,
  currentArticle
) {

  const currentTags =
    new Set(
      normalizeTags(
        currentArticle.tags
      ).map(
        normalizeSearchText
      )
    );


  const candidateTags =
    normalizeTags(
      candidate.tags
    ).map(
      normalizeSearchText
    );


  let sharedTags =
    0;


  candidateTags.forEach(
    (tag) => {

      if (
        currentTags.has(tag)
      ) {

        sharedTags +=
          1;

      }

    }
  );


  const publicationTime =
    new Date(
      candidate.publishedAt ||
      candidate.createdAt ||
      0
    ).getTime();


  return (
    sharedTags * 100 +
    (
      Number.isFinite(
        publicationTime
      )
        ? publicationTime /
          1e13
        : 0
    )
  );

}


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
      .sort(
        (a, b) =>
          relatedStoryScore(
            b,
            currentArticle
          ) -
          relatedStoryScore(
            a,
            currentArticle
          )
      )
      .slice(
        0,
        3
      );


  readerRelatedSection.hidden =
    !related.length;


  if (
    !related.length
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
    readerPanel.scrollTop >
      550
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
   MENU
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
   EXPORT
========================================================= */

function exportJournalBackup() {

  createInternalBackup(
    "Exportación manual JSON"
  );


  const payload = {

    app:
      "Sports Journal",

    version:
      3,

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
   RESTORE
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
      !Array.isArray(
        imported
      )
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


function finishRestore(message) {

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

  showToast(message);

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


function getSportLabel(sport) {

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


function normalizeZoom(value) {

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


  return Number.isFinite(
    number
  )
    ? Math.min(
        Math.max(
          number,
          min
        ),
        max
      )
    : fallback;

}


function createArticleId() {

  return (
    typeof crypto !==
      "undefined" &&
    typeof crypto.randomUUID ===
      "function"
  )
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

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


  return Number.isNaN(
    date.getTime()
  )
    ? ""
    : new Intl.DateTimeFormat(
        "es-ES",
        options
      )
        .format(date)
        .toUpperCase();

}


function formatBackupTime(date) {

  return (
    !date ||
    Number.isNaN(
      date.getTime()
    )
  )
    ? ""
    : new Intl.DateTimeFormat(
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

/* =========================================================
   PASO 8.3 — TEMAS CLICABLES Y PÁGINAS POR TEMA
========================================================= */


/*
  Un tema funciona como una sección editorial temporal.

  Ejemplo:

  activeTopic = "NBA"

  mostrará únicamente artículos cuyo array tags
  contenga exactamente NBA.
*/

let activeTopic =
  "";


/* =========================================================
   GUARDAMOS LAS FUNCIONES ORIGINALES
========================================================= */

const sportsJournalBaseRenderCurrentView =
  renderCurrentView;

const sportsJournalBaseGetFilteredPublishedArticles =
  getFilteredPublishedArticles;

const sportsJournalBaseUpdateSearchPlaceholder =
  updateSearchPlaceholder;

const sportsJournalBaseRenderSearchContext =
  renderSearchContext;

const sportsJournalBaseUpdateStoryCount =
  updateStoryCount;

const sportsJournalBaseGoToFrontPage =
  goToFrontPage;

const sportsJournalBaseRenderSportPage =
  renderSportPage;


/* =========================================================
   DETECTAR SI UNA NOTICIA PERTENECE A UN TEMA
========================================================= */

function articleHasTopic(
  article,
  topic
) {

  const normalizedTopic =
    normalizeSearchText(
      topic
    );


  return normalizeTags(
    article.tags
  ).some(
    (tag) =>
      normalizeSearchText(
        tag
      ) ===
      normalizedTopic
  );

}


/* =========================================================
   ABRIR PÁGINA DE TEMA
========================================================= */

function openTopicPage(
  topic
) {

  const cleanTopic =
    String(
      topic || ""
    ).trim();


  if (!cleanTopic) {

    return;

  }


  activeTopic =
    cleanTopic;


  /*
    Los temas son globales.

    Por ejemplo "Playoffs" podría existir
    en más de un deporte.
  */

  activeSport =
    "all";


  clearSearchState(
    false
  );


  if (
    readerModal.classList.contains(
      "open"
    )
  ) {

    closeReader();

  }


  renderCurrentView();


  centerActiveSportNavigation();


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =========================================================
   FILTRADO POR TEMA
========================================================= */

getFilteredPublishedArticles =
  function () {

    const filtered =
      sportsJournalBaseGetFilteredPublishedArticles();


    if (!activeTopic) {

      return filtered;

    }


    return filtered.filter(
      (article) =>
        articleHasTopic(
          article,
          activeTopic
        )
    );

  };


/* =========================================================
   MOTOR DE VISTAS
========================================================= */

renderCurrentView =
  function () {

    updateActiveSportButton();


    updateSearchPlaceholder();


    if (activeTopic) {

      renderTopicPage();

    } else {

      sportsJournalBaseRenderCurrentView();

    }


    renderSearchContext();

  };


/* =========================================================
   PÁGINA DE TEMA
========================================================= */

function renderTopicPage() {

  homeView.hidden =
    true;


  sportPage.hidden =
    false;


  sportPage.classList.add(
    "topic-mode"
  );


  sportSecondarySection.hidden =
    true;


  sportMoreSection.hidden =
    true;


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


  /* -------------------------------------------------------
     HEADER
  ------------------------------------------------------- */

  sportPageEyebrow.textContent =
    searchTerm
      ? "RESULTADOS POR TEMA"
      : "TEMA SPORTS JOURNAL";


  sportPageTitle.textContent =
    activeTopic.toUpperCase();


  if (searchTerm) {

    sportPageDescription.textContent =
      `Resultados dentro del tema “${activeTopic}” para “${searchInput.value.trim()}”.`;


    sportFeaturedHeading.textContent =
      "RESULTADO PRINCIPAL";


    sportMoreHeading.textContent =
      "MÁS RESULTADOS";

  } else {

    sportPageDescription.textContent =
      `Todas las noticias publicadas en Sports Journal relacionadas con “${activeTopic}”.`;


    sportFeaturedHeading.textContent =
      "DESTACADA";


    sportMoreHeading.textContent =
      `MÁS SOBRE ${activeTopic.toUpperCase()}`;

  }


  /* -------------------------------------------------------
     SIN RESULTADOS
  ------------------------------------------------------- */

  if (
    filtered.length === 0
  ) {

    sportFeatured.appendChild(
      createCustomEmptyState(

        searchTerm
          ? "SIN RESULTADOS"
          : "SIN NOTICIAS",

        searchTerm
          ? `No encontramos resultados dentro de “${activeTopic}” para “${searchInput.value.trim()}”.`
          : `Todavía no existen noticias publicadas con el tema “${activeTopic}”.`

      )
    );


    return;

  }


  /* -------------------------------------------------------
     NOTICIA #01
  ------------------------------------------------------- */

  renderTopicFeatured(
    filtered[0]
  );


  /* -------------------------------------------------------
     #02 Y #03
  ------------------------------------------------------- */

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


    renderTopicSecondary(
      secondary
    );

  }


  /* -------------------------------------------------------
     #04 EN ADELANTE
  ------------------------------------------------------- */

  const more =
    filtered.slice(3);


  if (
    more.length > 0
  ) {

    sportMoreSection.hidden =
      false;


    renderTopicMore(
      more
    );

  }

}


/* =========================================================
   FEATURED DE TEMA
========================================================= */

function renderTopicFeatured(
  article
) {

  /*
    Aprovechamos el diseño de las páginas deportivas.
  */

  renderSportFeatured(
    article
  );


  const copy =
    sportFeatured.querySelector(
      ".sport-featured-copy"
    );


  const number =
    copy?.querySelector(
      ".sport-featured-number"
    );


  if (
    copy &&
    number
  ) {

    const sportBadge =
      createTopicSportBadge(
        article.sport
      );


    number.insertAdjacentElement(
      "afterend",
      sportBadge
    );

  }

}


/* =========================================================
   #02 / #03 DE TEMA
========================================================= */

function renderTopicSecondary(
  items
) {

  items.forEach(
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


      const sport =
        createTopicSportBadge(
          article.sport
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
        sport,
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


/* =========================================================
   LISTA #04+
========================================================= */

function renderTopicMore(
  items
) {

  items.forEach(
    (article, index) => {

      /*
        true significa que mostramos el deporte
        en la segunda columna.
      */

      const row =
        createEditorialListRow(
          article,
          index + 4,
          true
        );


      row.className =
        "sport-more-story";


      const title =
        row.querySelector(
          ".latest-title"
        );


      if (title) {

        title.className =
          "sport-more-title";

      }


      const number =
        row.querySelector(
          ".latest-index"
        );


      if (number) {

        number.className =
          "sport-more-index";

      }


      const info =
        row.querySelector(
          ".latest-info"
        );


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
   BADGE DE DEPORTE
========================================================= */

function createTopicSportBadge(
  sport
) {

  const badge =
    document.createElement(
      "div"
    );


  badge.className =
    "topic-story-sport";


  badge.textContent =
    getSportLabel(
      sport
    );


  return badge;

}


/* =========================================================
   PLACEHOLDER DEL BUSCADOR
========================================================= */

updateSearchPlaceholder =
  function () {

    if (activeTopic) {

      searchInput.placeholder =
        `BUSCAR EN ${activeTopic.toUpperCase()}...`;


      return;

    }


    sportsJournalBaseUpdateSearchPlaceholder();

  };


/* =========================================================
   BARRA DE CONTEXTO DE BÚSQUEDA
========================================================= */

renderSearchContext =
  function () {

    if (!activeTopic) {

      sportsJournalBaseRenderSearchContext();


      return;

    }


    if (!searchTerm) {

      searchContextBar.hidden =
        true;


      searchContextText.textContent =
        "";


      return;

    }


    searchContextBar.hidden =
      false;


    searchContextText.textContent =
      `EN TEMA ${activeTopic.toUpperCase()} · “${searchInput.value.trim()}”`;


    clearSearchButton.textContent =
      `VER TODO ${activeTopic.toUpperCase()}`;

  };


/* =========================================================
   CONTADOR
========================================================= */

updateStoryCount =
  function (
    count
  ) {

    if (!activeTopic) {

      sportsJournalBaseUpdateStoryCount(
        count
      );


      return;

    }


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


    storyCount.textContent =
      `${count} ${noun} · ${activeTopic.toUpperCase()}`;

  };


/* =========================================================
   VOLVER A PORTADA
========================================================= */

goToFrontPage =
  function () {

    activeTopic =
      "";


    sportPage.classList.remove(
      "topic-mode"
    );


    sportsJournalBaseGoToFrontPage();

  };


/* =========================================================
   VOLVER A UNA SECCIÓN DEPORTIVA
========================================================= */

renderSportPage =
  function () {

    sportPage.classList.remove(
      "topic-mode"
    );


    sportsJournalBaseRenderSportPage();

  };


/*
  Esto se ejecuta ANTES del evento que ya tienen
  los botones deportivos.

  Así, si estamos viendo NBA y pulsamos FÚTBOL,
  abandonamos primero la página NBA.
*/

sportFilters.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        activeTopic =
          "";


        sportPage.classList.remove(
          "topic-mode"
        );

      },
      true
    );

  }
);


/* =========================================================
   CHIPS CLICABLES EN READER
========================================================= */

function createClickableTopicChip(
  tag
) {

  const button =
    document.createElement(
      "button"
    );


  button.type =
    "button";


  button.className =
    "topic-chip";


  button.textContent =
    tag;


  button.setAttribute(
    "aria-label",
    `Ver noticias sobre ${tag}`
  );


  button.addEventListener(
    "click",
    () => {

      openTopicPage(
        tag
      );

    }
  );


  return button;

}


/*
  Sustituimos únicamente la forma en que
  el Reader dibuja sus temas.

  El preview del editor continúa usando
  los chips normales.
*/

renderReaderTopics =
  function (
    article
  ) {

    const tags =
      normalizeTags(
        article.tags
      );


    readerTopicsList.innerHTML =
      "";


    readerTopics.hidden =
      tags.length === 0;


    if (
      tags.length === 0
    ) {

      return;

    }


    tags.forEach(
      (tag) => {

        readerTopicsList.appendChild(
          createClickableTopicChip(
            tag
          )
        );

      }
    );

  };

  /* =========================================================
   PASO 9 — ESTADO ARCHIVADA
========================================================= */


/*
  IMPORTANTE:

  Para no romper la compatibilidad con las noticias
  que ya tenemos, una noticia archivada conserva:

  status: "published"

  pero recibe:

  archivedAt: "fecha ISO"

  De esa forma:
  - no se elimina
  - mantiene su fecha original de publicación
  - desaparece del sitio público
  - puede republicarse después
*/


let pendingArchiveArticleId =
  null;


/* =========================================================
   CREAR INTERFAZ DE ARCHIVO
========================================================= */

function createArchiveInterface() {

  if (
    document.getElementById(
      "archivedMenuButton"
    )
  ) {

    return;

  }


  /* -------------------------------------------------------
     BOTÓN DEL MENÚ
  ------------------------------------------------------- */

  const archivedMenuButton =
    document.createElement(
      "button"
    );


  archivedMenuButton.id =
    "archivedMenuButton";


  archivedMenuButton.type =
    "button";


  archivedMenuButton.className =
    "journal-menu-button";


  archivedMenuButton.innerHTML = `
    <span>ARCHIVADAS</span>

    <span
      class="archive-menu-count"
      id="archivedCount"
    >
      0
    </span>
  `;


  publishedMenuButton.insertAdjacentElement(
    "afterend",
    archivedMenuButton
  );


  archivedMenuButton.addEventListener(
    "click",
    openArchivedManager
  );


  /* -------------------------------------------------------
     MODAL DE ARCHIVADAS
  ------------------------------------------------------- */

  const manager =
    document.createElement(
      "div"
    );


  manager.id =
    "archiveManagerModal";


  manager.className =
    "modal archive-manager-modal";


  manager.setAttribute(
    "aria-hidden",
    "true"
  );


  manager.innerHTML = `
    <div
      class="modal-backdrop"
      data-close-archive-manager
    ></div>

    <section
      class="archive-manager-panel"
      aria-label="Noticias archivadas"
    >

      <header
        class="archive-manager-header"
      >

        <div>

          <span class="eyebrow">
            GESTIÓN EDITORIAL
          </span>

          <h2>
            ARCHIVADAS
          </h2>

        </div>

        <button
          class="close-button"
          type="button"
          data-close-archive-manager
          aria-label="Cerrar archivadas"
        >
          ×
        </button>

      </header>

      <div
        class="archive-manager-list"
        id="archiveManagerList"
      ></div>

    </section>
  `;


  document.body.appendChild(
    manager
  );


  manager
    .querySelectorAll(
      "[data-close-archive-manager]"
    )
    .forEach(
      (button) => {

        button.addEventListener(
          "click",
          closeArchivedManager
        );

      }
    );


  /* -------------------------------------------------------
     CONFIRMACIÓN DE ARCHIVADO
  ------------------------------------------------------- */

  const confirmation =
    document.createElement(
      "div"
    );


  confirmation.id =
    "archiveConfirmModal";


  confirmation.className =
    "modal archive-confirm-modal";


  confirmation.setAttribute(
    "aria-hidden",
    "true"
  );


  confirmation.innerHTML = `
    <div
      class="modal-backdrop"
      data-close-archive-confirm
    ></div>

    <section
      class="archive-confirm-panel"
    >

      <span class="eyebrow">
        CAMBIO DE ESTADO
      </span>

      <h2>
        ¿ARCHIVAR NOTICIA?
      </h2>

      <p>
        La noticia dejará de aparecer en la portada,
        las secciones, los temas, la búsqueda y las
        noticias relacionadas.
      </p>

      <p>
        <strong>
          No será eliminada.
        </strong>
        Podrás recuperarla desde ARCHIVADAS cuando quieras.
      </p>

      <div
        class="archive-confirm-actions"
      >

        <button
          class="secondary-button"
          id="cancelArchiveButton"
          type="button"
        >
          CONSERVAR PUBLICADA
        </button>

        <button
          class="confirm-archive-button"
          id="confirmArchiveButton"
          type="button"
        >
          ARCHIVAR NOTICIA
        </button>

      </div>

    </section>
  `;


  document.body.appendChild(
    confirmation
  );


  confirmation
    .querySelectorAll(
      "[data-close-archive-confirm]"
    )
    .forEach(
      (button) => {

        button.addEventListener(
          "click",
          closeArchiveConfirmation
        );

      }
    );


  document
    .getElementById(
      "cancelArchiveButton"
    )
    .addEventListener(
      "click",
      closeArchiveConfirmation
    );


  document
    .getElementById(
      "confirmArchiveButton"
    )
    .addEventListener(
      "click",
      confirmArchiveArticle
    );


  /* -------------------------------------------------------
     BOTÓN ARCHIVAR EN READER
  ------------------------------------------------------- */

  const readerActions =
    document.querySelector(
      ".reader-story-actions"
    );


  const readerArchiveButton =
    document.createElement(
      "button"
    );


  readerArchiveButton.id =
    "readerArchiveButton";


  readerArchiveButton.type =
    "button";


  readerArchiveButton.className =
    "reader-archive-button";


  readerArchiveButton.textContent =
    "ARCHIVAR";


  readerArchiveButton.addEventListener(
    "click",
    () => {

      if (
        currentReaderArticleId
      ) {

        openArchiveConfirmation(
          currentReaderArticleId
        );

      }

    }
  );


  readerActions.insertBefore(
    readerArchiveButton,
    readerDeleteButton
  );


  /* -------------------------------------------------------
     BOTÓN ARCHIVAR EN EDITOR
  ------------------------------------------------------- */

  const editorActions =
    document.querySelector(
      ".editor-actions"
    );


  const archiveEditorButton =
    document.createElement(
      "button"
    );


  archiveEditorButton.id =
    "archiveEditorButton";


  archiveEditorButton.type =
    "button";


  archiveEditorButton.className =
    "archive-button";


  archiveEditorButton.textContent =
    "ARCHIVAR";


  archiveEditorButton.hidden =
    true;


  archiveEditorButton.addEventListener(
    "click",
    () => {

      const id =
        articleIdInput.value.trim();


      if (!id) {

        return;

      }


      updateEditorDirtyState();


      if (
        editorHasUnsavedChanges
      ) {

        showToast(
          "GUARDA O DESCARTA LOS CAMBIOS ANTES DE ARCHIVAR."
        );


        return;

      }


      openArchiveConfirmation(
        id
      );

    }
  );


  const publishButton =
    editorActions.querySelector(
      ".publish-button"
    );


  editorActions.insertBefore(
    archiveEditorButton,
    publishButton
  );

}


/* =========================================================
   ARCHIVED COLLECTION
========================================================= */

function getArchivedArticles() {

  return articles
    .filter(
      (article) =>
        Boolean(
          article.archivedAt
        )
    )
    .sort(
      (a, b) =>
        new Date(
          b.archivedAt ||
          0
        ).getTime() -
        new Date(
          a.archivedAt ||
          0
        ).getTime()
    );

}


/* =========================================================
   PUBLIC / DRAFT COLLECTION PATCH
========================================================= */

const step9BaseGetPublishedArticles =
  getPublishedArticles;


getPublishedArticles =
  function () {

    return step9BaseGetPublishedArticles()
      .filter(
        (article) =>
          !article.archivedAt
      );

  };


const step9BaseGetDraftArticles =
  getDraftArticles;


getDraftArticles =
  function () {

    return step9BaseGetDraftArticles()
      .filter(
        (article) =>
          !article.archivedAt
      );

  };


/* =========================================================
   MANAGEMENT COUNTS
========================================================= */

const step9BaseUpdateManagementCounts =
  updateManagementCounts;


updateManagementCounts =
  function () {

    step9BaseUpdateManagementCounts();


    const archivedCount =
      document.getElementById(
        "archivedCount"
      );


    if (
      archivedCount
    ) {

      archivedCount.textContent =
        getArchivedArticles().length;

    }

  };


/* =========================================================
   EDITOR STATUS PATCH
========================================================= */

const step9BaseUpdateEditorStatus =
  updateEditorStatus;


updateEditorStatus =
  function (
    status,
    isNew = false
  ) {

    editorStatusValue.classList.remove(
      "archived"
    );


    step9BaseUpdateEditorStatus(
      status,
      isNew
    );

  };


const step9BaseUpdateEditorActionLabels =
  updateEditorActionLabels;


updateEditorActionLabels =
  function (article) {

    step9BaseUpdateEditorActionLabels(
      article
    );


    const archiveEditorButton =
      document.getElementById(
        "archiveEditorButton"
      );


    if (
      archiveEditorButton
    ) {

      archiveEditorButton.hidden =
        !article ||
        article.status !==
          "published" ||
        Boolean(
          article.archivedAt
        );

    }


    if (
      article?.archivedAt
    ) {

      editorStatusValue.classList.remove(
        "draft",
        "published"
      );


      editorStatusValue.classList.add(
        "archived"
      );


      editorStatusValue.textContent =
        "ARCHIVADA";


      saveDraftButtonText.textContent =
        "MOVER A BORRADOR";


      publishButtonText.textContent =
        "REPUBLICAR";

    }

  };


/* =========================================================
   SAVE PATCH FOR ARCHIVED STORIES
========================================================= */

const step9BaseSaveArticle =
  saveArticle;


saveArticle =
  function (
    targetStatus
  ) {

    const id =
      articleIdInput.value.trim();


    const existing =
      id
        ? findArticle(id)
        : null;


    /*
      Una noticia archivada puede salir del archivo
      de dos formas:

      REPUBLICAR -> published
      MOVER A BORRADOR -> draft
    */

    if (
      existing?.archivedAt
    ) {

      if (
        targetStatus ===
          "published" &&
        !articleForm.reportValidity()
      ) {

        showToast(
          "COMPLETA LOS CAMPOS OBLIGATORIOS PARA REPUBLICAR."
        );


        return;

      }


      if (
        !validateTagsInput()
      ) {

        return;

      }


      existing.archivedAt =
        null;

    }


    step9BaseSaveArticle(
      targetStatus
    );

  };


/* =========================================================
   OPEN ARCHIVE CONFIRMATION
========================================================= */

function openArchiveConfirmation(
  articleId
) {

  const article =
    findArticle(
      articleId
    );


  if (
    !article ||
    article.archivedAt ||
    article.status !==
      "published"
  ) {

    return;

  }


  pendingArchiveArticleId =
    articleId;


  const modal =
    document.getElementById(
      "archiveConfirmModal"
    );


  modal.classList.add(
    "open"
  );


  modal.setAttribute(
    "aria-hidden",
    "false"
  );


  syncBodyScrollState();

}


function closeArchiveConfirmation() {

  const modal =
    document.getElementById(
      "archiveConfirmModal"
    );


  if (!modal) {

    return;

  }


  modal.classList.remove(
    "open"
  );


  modal.setAttribute(
    "aria-hidden",
    "true"
  );


  pendingArchiveArticleId =
    null;


  syncBodyScrollState();

}


/* =========================================================
   ARCHIVE ARTICLE
========================================================= */

function confirmArchiveArticle() {

  if (
    !pendingArchiveArticleId
  ) {

    return;

  }


  const article =
    findArticle(
      pendingArchiveArticleId
    );


  if (!article) {

    closeArchiveConfirmation();

    return;

  }


  createInternalBackup(
    "Antes de archivar noticia"
  );


  const now =
    new Date().toISOString();


  article.archivedAt =
    now;


  article.updatedAt =
    now;


  if (
    !persistArticles()
  ) {

    return;

  }


  createInternalBackup(
    "Después de archivar noticia"
  );


  const archivedId =
    pendingArchiveArticleId;


  closeArchiveConfirmation();


  if (
    currentReaderArticleId &&
    String(
      currentReaderArticleId
    ) ===
    String(
      archivedId
    )
  ) {

    closeReader();

  }


  if (
    editorModal.classList.contains(
      "open"
    ) &&
    String(
      articleIdInput.value
    ) ===
    String(
      archivedId
    )
  ) {

    editorHasUnsavedChanges =
      false;


    closeEditorImmediately();

  }


  renderCurrentView();

  updateManagementCounts();

  updateBackupStatus();


  showToast(
    "NOTICIA ARCHIVADA."
  );

}


/* =========================================================
   ARCHIVED MANAGER
========================================================= */

function openArchivedManager() {

  closeSideMenu();


  renderArchivedManager();


  const modal =
    document.getElementById(
      "archiveManagerModal"
    );


  modal.classList.add(
    "open"
  );


  modal.setAttribute(
    "aria-hidden",
    "false"
  );


  syncBodyScrollState();

}


function closeArchivedManager() {

  const modal =
    document.getElementById(
      "archiveManagerModal"
    );


  if (!modal) {

    return;

  }


  modal.classList.remove(
    "open"
  );


  modal.setAttribute(
    "aria-hidden",
    "true"
  );


  syncBodyScrollState();

}


function renderArchivedManager() {

  const container =
    document.getElementById(
      "archiveManagerList"
    );


  if (!container) {

    return;

  }


  container.innerHTML =
    "";


  const archived =
    getArchivedArticles();


  if (
    archived.length === 0
  ) {

    container.innerHTML = `
      <div
        class="archive-empty"
      >

        <strong>
          SIN ARCHIVADAS
        </strong>

        <p>
          Las noticias que retires del sitio
          sin eliminarlas aparecerán aquí.
        </p>

      </div>
    `;


    return;

  }


  archived.forEach(
    (article, index) => {

      const card =
        document.createElement(
          "article"
        );


      card.className =
        "archived-story-card";


      const number =
        document.createElement(
          "div"
        );


      number.className =
        "archived-story-number";


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


      copy.className =
        "archived-story-copy";


      const state =
        document.createElement(
          "div"
        );


      state.className =
        "archived-story-state";


      state.textContent =
        "ARCHIVADA";


      const sport =
        document.createElement(
          "div"
        );


      sport.className =
        "archived-story-sport";


      sport.textContent =
        getSportLabel(
          article.sport
        );


      const title =
        document.createElement(
          "h3"
        );


      title.className =
        "archived-story-title";


      title.textContent =
        article.title ||
        "NOTICIA SIN TÍTULO";


      const meta =
        document.createElement(
          "div"
        );


      meta.className =
        "archived-story-meta";


      meta.textContent =
        `PUBLICADA ${formatShortDate(
          article.publishedAt ||
          article.createdAt
        )} · ARCHIVADA ${formatShortDate(
          article.archivedAt
        )}`;


      copy.append(
        state,
        sport,
        title,
        meta
      );


      const actions =
        document.createElement(
          "div"
        );


      actions.className =
        "archived-story-actions";


      /* EDIT */

      const editButton =
        createArchiveActionButton(
          "EDITAR",
          "dark"
        );


      editButton.addEventListener(
        "click",
        () => {

          closeArchivedManager();


          openEditor(
            article.id
          );

        }
      );


      /* REPUBLISH */

      const republishButton =
        createArchiveActionButton(
          "REPUBLICAR",
          "primary"
        );


      republishButton.addEventListener(
        "click",
        () => {

          republishArchivedArticle(
            article.id
          );

        }
      );


      /* MOVE TO DRAFT */

      const draftButton =
        createArchiveActionButton(
          "A BORRADOR",
          ""
        );


      draftButton.addEventListener(
        "click",
        () => {

          moveArchivedArticleToDraft(
            article.id
          );

        }
      );


      /* DELETE */

      const deleteButton =
        createArchiveActionButton(
          "ELIMINAR",
          "danger"
        );


      deleteButton.addEventListener(
        "click",
        () => {

          closeArchivedManager();


          openDeleteConfirmation(
            article.id
          );

        }
      );


      actions.append(
        editButton,
        republishButton,
        draftButton,
        deleteButton
      );


      card.append(
        number,
        copy,
        actions
      );


      container.appendChild(
        card
      );

    }
  );

}


function createArchiveActionButton(
  text,
  modifier
) {

  const button =
    document.createElement(
      "button"
    );


  button.type =
    "button";


  button.className =
    `archive-action-button ${modifier}`.trim();


  button.textContent =
    text;


  return button;

}


/* =========================================================
   REPUBLISH
========================================================= */

function republishArchivedArticle(
  articleId
) {

  const article =
    findArticle(
      articleId
    );


  if (
    !article ||
    !article.archivedAt
  ) {

    return;

  }


  createInternalBackup(
    "Antes de republicar noticia archivada"
  );


  article.archivedAt =
    null;


  article.status =
    "published";


  article.updatedAt =
    new Date().toISOString();


  /*
    Conservamos publishedAt.

    Así republicar desde el archivo
    NO cambia artificialmente el orden
    original de publicación.
  */


  if (
    !persistArticles()
  ) {

    return;

  }


  createInternalBackup(
    "Después de republicar noticia archivada"
  );


  renderArchivedManager();

  renderCurrentView();

  updateManagementCounts();

  updateBackupStatus();


  showToast(
    "NOTICIA REPUBLICADA."
  );

}


/* =========================================================
   ARCHIVE -> DRAFT
========================================================= */

function moveArchivedArticleToDraft(
  articleId
) {

  const article =
    findArticle(
      articleId
    );


  if (
    !article ||
    !article.archivedAt
  ) {

    return;

  }


  createInternalBackup(
    "Antes de mover archivada a borrador"
  );


  article.archivedAt =
    null;


  article.status =
    "draft";


  article.publishedAt =
    null;


  article.updatedAt =
    new Date().toISOString();


  if (
    !persistArticles()
  ) {

    return;

  }


  createInternalBackup(
    "Después de mover archivada a borrador"
  );


  renderArchivedManager();

  renderCurrentView();

  updateManagementCounts();

  updateBackupStatus();


  showToast(
    "NOTICIA MOVIDA A BORRADORES."
  );

}


/* =========================================================
   BODY SCROLL PATCH
========================================================= */

const step9BaseSyncBodyScrollState =
  syncBodyScrollState;


syncBodyScrollState =
  function () {

    step9BaseSyncBodyScrollState();


    const archiveManager =
      document.getElementById(
        "archiveManagerModal"
      );


    const archiveConfirm =
      document.getElementById(
        "archiveConfirmModal"
      );


    const extraOpen =
      archiveManager?.classList.contains(
        "open"
      ) ||
      archiveConfirm?.classList.contains(
        "open"
      );


    if (
      extraOpen
    ) {

      document.body.classList.add(
        "modal-open"
      );

    }

  };


/* =========================================================
   ESCAPE
========================================================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key !== "Escape"
    ) {

      return;

    }


    const archiveConfirm =
      document.getElementById(
        "archiveConfirmModal"
      );


    if (
      archiveConfirm?.classList.contains(
        "open"
      )
    ) {

      closeArchiveConfirmation();

      return;

    }


    const archiveManager =
      document.getElementById(
        "archiveManagerModal"
      );


    if (
      archiveManager?.classList.contains(
        "open"
      )
    ) {

      closeArchivedManager();

    }

  }
);


/* =========================================================
   START STEP 9
========================================================= */

createArchiveInterface();


/*
  Es importante volver a renderizar después
  de instalar el filtro de archivadas.

  Así ninguna noticia archivada puede aparecer
  públicamente después de recargar la página.
*/

renderCurrentView();

updateManagementCounts();

/* =========================================================
   PASO 10.1 — ADMIN DASHBOARD
========================================================= */


/* =========================================================
   CREATE DASHBOARD UI
========================================================= */

function createAdminDashboardInterface() {

  if (
    document.getElementById(
      "adminDashboardModal"
    )
  ) {

    return;

  }


  /* -------------------------------------------------------
     SIDE MENU BUTTON
  ------------------------------------------------------- */

  const dashboardButton =
    document.createElement(
      "button"
    );


  dashboardButton.id =
    "adminDashboardMenuButton";


  dashboardButton.type =
    "button";


  dashboardButton.className =
    "journal-menu-button";


  dashboardButton.innerHTML = `
    <span>PANEL / ADMIN</span>
    <span>→</span>
  `;


  frontPageMenuButton.insertAdjacentElement(
    "beforebegin",
    dashboardButton
  );


  dashboardButton.addEventListener(
    "click",
    openAdminDashboard
  );


  /* -------------------------------------------------------
     DASHBOARD MODAL
  ------------------------------------------------------- */

  const dashboard =
    document.createElement(
      "div"
    );


  dashboard.id =
    "adminDashboardModal";


  dashboard.className =
    "modal admin-dashboard-modal";


  dashboard.setAttribute(
    "aria-hidden",
    "true"
  );


  dashboard.innerHTML = `
    <section
      class="admin-dashboard-panel"
      aria-label="Panel de administración"
    >

      <header
        class="admin-dashboard-header"
      >

        <div>

          <span
            class="admin-dashboard-eyebrow"
          >
            SPORTS JOURNAL · REDACCIÓN
          </span>

          <h2>
            PANEL EDITORIAL
          </h2>

        </div>

        <button
          class="close-button admin-dashboard-close"
          id="closeAdminDashboardButton"
          type="button"
          aria-label="Cerrar panel"
        >
          ×
        </button>

      </header>


      <div
        class="admin-dashboard-body"
      >

        <div
          class="admin-dashboard-intro"
        >

          <div>

            <span
              class="admin-dashboard-intro-label"
            >
              CONTROL DE REDACCIÓN
            </span>

            <h3>
              TODO EL DIARIO
              EN UN SOLO LUGAR
            </h3>

          </div>

          <div
            class="admin-dashboard-date"
            id="adminDashboardDate"
          ></div>

        </div>


        <div
          class="admin-stats-grid"
        >

          <button
            class="admin-stat-card"
            id="adminTotalCard"
            type="button"
          >

            <span
              class="admin-stat-card-label"
            >
              TOTAL
            </span>

            <strong
              id="adminTotalCount"
            >
              0
            </strong>

            <small>
              TODAS LAS NOTICIAS
            </small>

          </button>


          <button
            class="admin-stat-card"
            id="adminPublishedCard"
            type="button"
          >

            <span
              class="admin-stat-card-label"
            >
              PUBLICADAS
            </span>

            <strong
              id="adminPublishedCount"
            >
              0
            </strong>

            <small>
              VISIBLES EN EL DIARIO
            </small>

          </button>


          <button
            class="admin-stat-card"
            id="adminDraftCard"
            type="button"
          >

            <span
              class="admin-stat-card-label"
            >
              BORRADORES
            </span>

            <strong
              id="adminDraftCount"
            >
              0
            </strong>

            <small>
              EN PREPARACIÓN
            </small>

          </button>


          <button
            class="admin-stat-card"
            id="adminArchivedCard"
            type="button"
          >

            <span
              class="admin-stat-card-label"
            >
              ARCHIVADAS
            </span>

            <strong
              id="adminArchivedCount"
            >
              0
            </strong>

            <small>
              RETIRADAS DEL SITIO
            </small>

          </button>

        </div>


        <section
          class="admin-dashboard-section"
        >

          <div
            class="admin-dashboard-section-heading"
          >

            <span
              class="admin-dashboard-section-number"
            >
              01
            </span>

            <h4>
              ACCIONES RÁPIDAS
            </h4>

          </div>


          <div
            class="admin-quick-actions"
          >

            <button
              class="admin-quick-action"
              id="adminNewStoryButton"
              type="button"
            >

              <span>
                CREAR
              </span>

              <strong>
                + NUEVA NOTICIA
              </strong>

            </button>


            <button
              class="admin-quick-action"
              id="adminDraftsButton"
              type="button"
            >

              <span>
                GESTIONAR
              </span>

              <strong>
                BORRADORES
              </strong>

            </button>


            <button
              class="admin-quick-action"
              id="adminArchivesButton"
              type="button"
            >

              <span>
                GESTIONAR
              </span>

              <strong>
                ARCHIVADAS
              </strong>

            </button>


            <button
              class="admin-quick-action"
              id="adminBackupButton"
              type="button"
            >

              <span>
                SEGURIDAD
              </span>

              <strong>
                EXPORTAR RESPALDO
              </strong>

            </button>

          </div>

        </section>


        <section
          class="admin-dashboard-section"
        >

          <div
            class="admin-dashboard-section-heading"
          >

            <span
              class="admin-dashboard-section-number"
            >
              02
            </span>

            <h4>
              POR DEPORTE
            </h4>

          </div>


          <div
            class="admin-sports-grid"
            id="adminSportsGrid"
          ></div>

        </section>


        <section
          class="admin-dashboard-section"
        >

          <div
            class="admin-dashboard-section-heading"
          >

            <span
              class="admin-dashboard-section-number"
            >
              03
            </span>

            <h4>
              ACTIVIDAD RECIENTE
            </h4>

          </div>


          <div
            class="admin-recent-list"
            id="adminRecentList"
          ></div>

        </section>

      </div>

    </section>
  `;


  document.body.appendChild(
    dashboard
  );


  bindAdminDashboardEvents();

}


/* =========================================================
   DASHBOARD EVENTS
========================================================= */

function bindAdminDashboardEvents() {

  document
    .getElementById(
      "closeAdminDashboardButton"
    )
    .addEventListener(
      "click",
      closeAdminDashboard
    );


  document
    .getElementById(
      "adminNewStoryButton"
    )
    .addEventListener(
      "click",
      () => {

        closeAdminDashboard();

        openEditor();

      }
    );


  document
    .getElementById(
      "adminDraftsButton"
    )
    .addEventListener(
      "click",
      () => {

        closeAdminDashboard();

        openDraftsManager();

      }
    );


  document
    .getElementById(
      "adminArchivesButton"
    )
    .addEventListener(
      "click",
      () => {

        closeAdminDashboard();

        openArchivedManager();

      }
    );


  document
    .getElementById(
      "adminBackupButton"
    )
    .addEventListener(
      "click",
      () => {

        closeAdminDashboard();

        exportJournalBackup();

      }
    );


  document
    .getElementById(
      "adminTotalCard"
    )
    .addEventListener(
      "click",
      () => {

        closeAdminDashboard();

        goToFrontPage();

      }
    );


  document
    .getElementById(
      "adminPublishedCard"
    )
    .addEventListener(
      "click",
      () => {

        closeAdminDashboard();

        goToFrontPage();


        showToast(
          `${getPublishedArticles().length} NOTICIAS PUBLICADAS.`
        );

      }
    );


  document
    .getElementById(
      "adminDraftCard"
    )
    .addEventListener(
      "click",
      () => {

        closeAdminDashboard();

        openDraftsManager();

      }
    );


  document
    .getElementById(
      "adminArchivedCard"
    )
    .addEventListener(
      "click",
      () => {

        closeAdminDashboard();

        openArchivedManager();

      }
    );

}


/* =========================================================
   OPEN / CLOSE
========================================================= */

function openAdminDashboard() {

  closeSideMenu();


  renderAdminDashboard();


  const modal =
    document.getElementById(
      "adminDashboardModal"
    );


  modal.classList.add(
    "open"
  );


  modal.setAttribute(
    "aria-hidden",
    "false"
  );


  syncBodyScrollState();

}


function closeAdminDashboard() {

  const modal =
    document.getElementById(
      "adminDashboardModal"
    );


  if (!modal) {

    return;

  }


  modal.classList.remove(
    "open"
  );


  modal.setAttribute(
    "aria-hidden",
    "true"
  );


  syncBodyScrollState();

}


/* =========================================================
   RENDER DASHBOARD
========================================================= */

function renderAdminDashboard() {

  renderAdminDashboardDate();

  renderAdminStats();

  renderAdminSports();

  renderAdminRecentActivity();

}


/* =========================================================
   DATE
========================================================= */

function renderAdminDashboardDate() {

  const element =
    document.getElementById(
      "adminDashboardDate"
    );


  element.textContent =
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


/* =========================================================
   STATS
========================================================= */

function renderAdminStats() {

  const published =
    getPublishedArticles();


  const drafts =
    getDraftArticles();


  const archived =
    getArchivedArticles();


  document
    .getElementById(
      "adminTotalCount"
    )
    .textContent =
      articles.length;


  document
    .getElementById(
      "adminPublishedCount"
    )
    .textContent =
      published.length;


  document
    .getElementById(
      "adminDraftCount"
    )
    .textContent =
      drafts.length;


  document
    .getElementById(
      "adminArchivedCount"
    )
    .textContent =
      archived.length;

}


/* =========================================================
   SPORTS OVERVIEW
========================================================= */

function renderAdminSports() {

  const grid =
    document.getElementById(
      "adminSportsGrid"
    );


  grid.innerHTML =
    "";


  const sports = [
    "football",
    "tennis",
    "baseball",
    "basketball"
  ];


  sports.forEach(
    (sport) => {

      const allSportArticles =
        articles.filter(
          (article) =>
            article.sport ===
              sport
        );


      const published =
        getPublishedArticles()
          .filter(
            (article) =>
              article.sport ===
                sport
          );


      const drafts =
        getDraftArticles()
          .filter(
            (article) =>
              article.sport ===
                sport
          );


      const archived =
        getArchivedArticles()
          .filter(
            (article) =>
              article.sport ===
                sport
          );


      const card =
        document.createElement(
          "button"
        );


      card.type =
        "button";


      card.className =
        "admin-sport-card";


      const name =
        document.createElement(
          "div"
        );


      name.className =
        "admin-sport-card-name";


      name.textContent =
        getSportLabel(
          sport
        );


      const stats =
        document.createElement(
          "div"
        );


      stats.className =
        "admin-sport-card-stats";


      stats.innerHTML = `
        ${published.length} PUBLICADAS<br>
        ${drafts.length} BORRADORES<br>
        ${archived.length} ARCHIVADAS<br>
        ${allSportArticles.length} TOTAL
      `;


      card.append(
        name,
        stats
      );


      card.addEventListener(
        "click",
        () => {

          openSportFromDashboard(
            sport
          );

        }
      );


      grid.appendChild(
        card
      );

    }
  );

}


/* =========================================================
   OPEN SPORT
========================================================= */

function openSportFromDashboard(
  sport
) {

  closeAdminDashboard();


  /*
    Si veníamos de una página de tema,
    abandonamos ese contexto.
  */

  if (
    typeof activeTopic !==
    "undefined"
  ) {

    activeTopic =
      "";

  }


  activeSport =
    sport;


  clearSearchState(
    false
  );


  sportPage.classList.remove(
    "topic-mode"
  );


  renderCurrentView();


  centerActiveSportNavigation();


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =========================================================
   RECENT ACTIVITY
========================================================= */

function getAdminRecentArticles() {

  return [
    ...articles
  ]
    .sort(
      (a, b) =>
        getArticleActivityTime(b) -
        getArticleActivityTime(a)
    )
    .slice(
      0,
      8
    );

}


function getAdminArticleState(
  article
) {

  if (
    article.archivedAt
  ) {

    return "archived";

  }


  if (
    article.status ===
      "draft"
  ) {

    return "draft";

  }


  return "published";

}


function getAdminArticleStateLabel(
  article
) {

  const state =
    getAdminArticleState(
      article
    );


  if (
    state === "archived"
  ) {

    return "ARCHIVADA";

  }


  if (
    state === "draft"
  ) {

    return "BORRADOR";

  }


  return "PUBLICADA";

}


function renderAdminRecentActivity() {

  const container =
    document.getElementById(
      "adminRecentList"
    );


  container.innerHTML =
    "";


  const recent =
    getAdminRecentArticles();


  if (
    recent.length === 0
  ) {

    container.innerHTML = `
      <div
        class="admin-dashboard-empty"
      >
        <strong>
          TODAVÍA NO HAY NOTICIAS
        </strong>

        <p>
          Cuando empieces a trabajar en el diario,
          la actividad aparecerá aquí.
        </p>
      </div>
    `;


    return;

  }


  recent.forEach(
    (article, index) => {

      container.appendChild(
        createAdminRecentStory(
          article,
          index
        )
      );

    }
  );

}


/* =========================================================
   RECENT STORY ROW
========================================================= */

function createAdminRecentStory(
  article,
  index
) {

  const state =
    getAdminArticleState(
      article
    );


  const row =
    document.createElement(
      "article"
    );


  row.className =
    "admin-recent-story";


  /* NUMBER */

  const number =
    document.createElement(
      "div"
    );


  number.className =
    "admin-recent-number";


  number.textContent =
    String(
      index + 1
    ).padStart(
      2,
      "0"
    );


  /* STATUS */

  const status =
    document.createElement(
      "span"
    );


  status.className =
    `admin-status-badge ${state}`;


  status.textContent =
    getAdminArticleStateLabel(
      article
    );


  /* COPY */

  const copy =
    document.createElement(
      "div"
    );


  copy.className =
    "admin-recent-copy";


  const sport =
    document.createElement(
      "div"
    );


  sport.className =
    "admin-recent-sport";


  sport.textContent =
    getSportLabel(
      article.sport
    );


  const title =
    document.createElement(
      "h5"
    );


  title.className =
    "admin-recent-title";


  title.textContent =
    article.title?.trim() ||
    "NOTICIA SIN TÍTULO";


  const meta =
    document.createElement(
      "div"
    );


  meta.className =
    "admin-recent-meta";


  meta.textContent =
    getAdminRecentDateText(
      article
    );


  copy.append(
    sport,
    title,
    meta
  );


  /* ACTIONS */

  const actions =
    document.createElement(
      "div"
    );


  actions.className =
    "admin-recent-actions";


  const editButton =
    createAdminRecentButton(
      "EDITAR",
      "primary"
    );


  editButton.addEventListener(
    "click",
    () => {

      closeAdminDashboard();


      openEditor(
        article.id
      );

    }
  );


  actions.appendChild(
    editButton
  );


  if (
    state === "published"
  ) {

    const readButton =
      createAdminRecentButton(
        "LEER",
        ""
      );


    readButton.addEventListener(
      "click",
      () => {

        closeAdminDashboard();


        openReader(
          article.id
        );

      }
    );


    actions.appendChild(
      readButton
    );

  }


  if (
    state === "archived"
  ) {

    const archiveButton =
      createAdminRecentButton(
        "GESTIONAR",
        ""
      );


    archiveButton.addEventListener(
      "click",
      () => {

        closeAdminDashboard();


        openArchivedManager();

      }
    );


    actions.appendChild(
      archiveButton
    );

  }


  row.append(
    number,
    status,
    copy,
    actions
  );


  return row;

}


/* =========================================================
   ADMIN BUTTON
========================================================= */

function createAdminRecentButton(
  text,
  modifier
) {

  const button =
    document.createElement(
      "button"
    );


  button.type =
    "button";


  button.className =
    `admin-recent-action ${modifier}`.trim();


  button.textContent =
    text;


  return button;

}


/* =========================================================
   RECENT DATE
========================================================= */

function getAdminRecentDateText(
  article
) {

  if (
    article.archivedAt
  ) {

    return (
      `ARCHIVADA ${formatEditorDateTime(
        article.archivedAt
      )}`
    );

  }


  if (
    article.updatedAt
  ) {

    return (
      `ÚLTIMA ACTIVIDAD ${formatEditorDateTime(
        article.updatedAt
      )}`
    );

  }


  return (
    `CREADA ${formatEditorDateTime(
      article.createdAt
    )}`
  );

}


/* =========================================================
   MANAGEMENT COUNT PATCH
========================================================= */

const step10BaseUpdateManagementCounts =
  updateManagementCounts;


updateManagementCounts =
  function () {

    step10BaseUpdateManagementCounts();


    const dashboard =
      document.getElementById(
        "adminDashboardModal"
      );


    if (
      dashboard?.classList.contains(
        "open"
      )
    ) {

      renderAdminDashboard();

    }

  };


/* =========================================================
   BODY SCROLL PATCH
========================================================= */

const step10BaseSyncBodyScrollState =
  syncBodyScrollState;


syncBodyScrollState =
  function () {

    step10BaseSyncBodyScrollState();


    const dashboard =
      document.getElementById(
        "adminDashboardModal"
      );


    if (
      dashboard?.classList.contains(
        "open"
      )
    ) {

      document.body.classList.add(
        "modal-open"
      );

    }

  };


/* =========================================================
   ESCAPE
========================================================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key !== "Escape"
    ) {

      return;

    }


    const dashboard =
      document.getElementById(
        "adminDashboardModal"
      );


    if (
      dashboard?.classList.contains(
        "open"
      )
    ) {

      closeAdminDashboard();

    }

  }
);


/* =========================================================
   INSTALL DASHBOARD
========================================================= */

createAdminDashboardInterface();

updateManagementCounts();

/* =========================================================
   PASO 10.2 — GESTOR CENTRAL DE NOTICIAS
========================================================= */


const adminArticleManagerFilters = {
  search: "",
  status: "all",
  sport: "all",
  author: "all"
};


/* =========================================================
   CREATE MANAGER
========================================================= */

function createAdminArticleManagerInterface() {

  if (
    document.getElementById(
      "adminArticleManagerModal"
    )
  ) {

    return;

  }


  /* -------------------------------------------------------
     SIDE MENU BUTTON
  ------------------------------------------------------- */

  const sideButton =
    document.createElement(
      "button"
    );


  sideButton.id =
    "allArticlesMenuButton";


  sideButton.type =
    "button";


  sideButton.className =
    "journal-menu-button";


  sideButton.innerHTML = `
    <span>TODAS LAS NOTICIAS</span>
    <span>→</span>
  `;


  const dashboardMenuButton =
    document.getElementById(
      "adminDashboardMenuButton"
    );


  dashboardMenuButton.insertAdjacentElement(
    "afterend",
    sideButton
  );


  sideButton.addEventListener(
    "click",
    openAdminArticleManager
  );


  /* -------------------------------------------------------
     DASHBOARD LAUNCH BUTTON
  ------------------------------------------------------- */

  const statsGrid =
    document.querySelector(
      ".admin-stats-grid"
    );


  const launchButton =
    document.createElement(
      "button"
    );


  launchButton.type =
    "button";


  launchButton.className =
    "admin-manager-launch";


  launchButton.innerHTML = `
    <div
      class="admin-manager-launch-copy"
    >

      <span>
        CENTRO DE CONTROL
      </span>

      <strong>
        GESTIONAR TODAS LAS NOTICIAS
      </strong>

    </div>

    <span
      class="admin-manager-launch-arrow"
    >
      →
    </span>
  `;


  statsGrid.insertAdjacentElement(
    "afterend",
    launchButton
  );


  launchButton.addEventListener(
    "click",
    () => {

      closeAdminDashboard();

      openAdminArticleManager();

    }
  );


  /* -------------------------------------------------------
     MODAL
  ------------------------------------------------------- */

  const modal =
    document.createElement(
      "div"
    );


  modal.id =
    "adminArticleManagerModal";


  modal.className =
    "modal article-manager-modal";


  modal.setAttribute(
    "aria-hidden",
    "true"
  );


  modal.innerHTML = `
    <section
      class="article-manager-panel"
      aria-label="Gestor de noticias"
    >

      <header
        class="article-manager-header"
      >

        <div>

          <span
            class="article-manager-eyebrow"
          >
            SPORTS JOURNAL · ADMIN
          </span>

          <h2>
            TODAS LAS NOTICIAS
          </h2>

        </div>

        <button
          class="close-button article-manager-close"
          id="closeArticleManagerButton"
          type="button"
          aria-label="Cerrar gestor"
        >
          ×
        </button>

      </header>


      <div
        class="article-manager-body"
      >

        <div
          class="article-manager-intro"
        >

          <div>

            <span
              class="article-manager-intro-label"
            >
              GESTIÓN EDITORIAL
            </span>

            <h3>
              CONTROLA TODO
              EL CONTENIDO
            </h3>

          </div>

          <div
            class="article-manager-total"
            id="articleManagerTotal"
          >
            0 NOTICIAS
          </div>

        </div>


        <div
          class="article-manager-toolbar"
        >

          <div
            class="article-manager-field"
          >

            <label
              for="articleManagerSearch"
            >
              BUSCAR
            </label>

            <input
              id="articleManagerSearch"
              type="search"
              placeholder="TÍTULO, AUTOR, TAG..."
              autocomplete="off"
            />

          </div>


          <div
            class="article-manager-field"
          >

            <label
              for="articleManagerStatus"
            >
              ESTADO
            </label>

            <select
              id="articleManagerStatus"
            >

              <option value="all">
                TODOS
              </option>

              <option value="published">
                PUBLICADAS
              </option>

              <option value="draft">
                BORRADORES
              </option>

              <option value="archived">
                ARCHIVADAS
              </option>

            </select>

          </div>


          <div
            class="article-manager-field"
          >

            <label
              for="articleManagerSport"
            >
              DEPORTE
            </label>

            <select
              id="articleManagerSport"
            >

              <option value="all">
                TODOS
              </option>

              <option value="football">
                FÚTBOL
              </option>

              <option value="tennis">
                TENIS
              </option>

              <option value="baseball">
                BÉISBOL
              </option>

              <option value="basketball">
                BALONCESTO
              </option>

            </select>

          </div>


          <div
            class="article-manager-field"
          >

            <label
              for="articleManagerAuthor"
            >
              AUTOR
            </label>

            <select
              id="articleManagerAuthor"
            >

              <option value="all">
                TODOS
              </option>

            </select>

          </div>


          <button
            class="article-manager-clear"
            id="clearArticleManagerFilters"
            type="button"
          >
            LIMPIAR
          </button>

        </div>


        <div
          class="article-manager-summary"
        >

          <span>
            RESULTADOS
          </span>

          <strong
            id="articleManagerSummary"
          >
            0 NOTICIAS
          </strong>

        </div>


        <div
          class="article-manager-list"
          id="articleManagerList"
        ></div>

      </div>

    </section>
  `;


  document.body.appendChild(
    modal
  );


  bindAdminArticleManagerEvents();

}


/* =========================================================
   MANAGER EVENTS
========================================================= */

function bindAdminArticleManagerEvents() {

  document
    .getElementById(
      "closeArticleManagerButton"
    )
    .addEventListener(
      "click",
      closeAdminArticleManager
    );


  document
    .getElementById(
      "articleManagerSearch"
    )
    .addEventListener(
      "input",
      (event) => {

        adminArticleManagerFilters.search =
          normalizeSearchText(
            event.target.value
          );


        renderAdminArticleManager();

      }
    );


  document
    .getElementById(
      "articleManagerStatus"
    )
    .addEventListener(
      "change",
      (event) => {

        adminArticleManagerFilters.status =
          event.target.value;


        renderAdminArticleManager();

      }
    );


  document
    .getElementById(
      "articleManagerSport"
    )
    .addEventListener(
      "change",
      (event) => {

        adminArticleManagerFilters.sport =
          event.target.value;


        renderAdminArticleManager();

      }
    );


  document
    .getElementById(
      "articleManagerAuthor"
    )
    .addEventListener(
      "change",
      (event) => {

        adminArticleManagerFilters.author =
          event.target.value;


        renderAdminArticleManager();

      }
    );


  document
    .getElementById(
      "clearArticleManagerFilters"
    )
    .addEventListener(
      "click",
      clearAdminArticleManagerFilters
    );

}


/* =========================================================
   OPEN / CLOSE
========================================================= */

function openAdminArticleManager() {

  closeSideMenu();


  if (
    document
      .getElementById(
        "adminDashboardModal"
      )
      ?.classList.contains(
        "open"
      )
  ) {

    closeAdminDashboard();

  }


  renderAdminArticleManager();


  const modal =
    document.getElementById(
      "adminArticleManagerModal"
    );


  modal.classList.add(
    "open"
  );


  modal.setAttribute(
    "aria-hidden",
    "false"
  );


  syncBodyScrollState();

}


function closeAdminArticleManager() {

  const modal =
    document.getElementById(
      "adminArticleManagerModal"
    );


  if (!modal) {

    return;

  }


  modal.classList.remove(
    "open"
  );


  modal.setAttribute(
    "aria-hidden",
    "true"
  );


  syncBodyScrollState();

}


/* =========================================================
   CLEAR FILTERS
========================================================= */

function clearAdminArticleManagerFilters() {

  adminArticleManagerFilters.search =
    "";


  adminArticleManagerFilters.status =
    "all";


  adminArticleManagerFilters.sport =
    "all";


  adminArticleManagerFilters.author =
    "all";


  document
    .getElementById(
      "articleManagerSearch"
    )
    .value =
      "";


  document
    .getElementById(
      "articleManagerStatus"
    )
    .value =
      "all";


  document
    .getElementById(
      "articleManagerSport"
    )
    .value =
      "all";


  document
    .getElementById(
      "articleManagerAuthor"
    )
    .value =
      "all";


  renderAdminArticleManager();

}


/* =========================================================
   AUTHORS
========================================================= */

function getAdminManagerAuthors() {

  const authors =
    new Map();


  articles.forEach(
    (article) => {

      const author =
        String(
          article.author || ""
        ).trim();


      if (!author) {

        return;

      }


      const key =
        normalizeSearchText(
          author
        );


      if (
        !authors.has(key)
      ) {

        authors.set(
          key,
          author
        );

      }

    }
  );


  return Array
    .from(
      authors.entries()
    )
    .sort(
      (a, b) =>
        a[1].localeCompare(
          b[1],
          "es",
          {
            sensitivity:
              "base"
          }
        )
    );

}


function renderAdminManagerAuthorFilter() {

  const select =
    document.getElementById(
      "articleManagerAuthor"
    );


  const current =
    adminArticleManagerFilters.author;


  select.innerHTML =
    "";


  const allOption =
    document.createElement(
      "option"
    );


  allOption.value =
    "all";


  allOption.textContent =
    "TODOS";


  select.appendChild(
    allOption
  );


  getAdminManagerAuthors()
    .forEach(
      ([key, author]) => {

        const option =
          document.createElement(
            "option"
          );


        option.value =
          key;


        option.textContent =
          author.toUpperCase();


        select.appendChild(
          option
        );

      }
    );


  const availableValues =
    Array
      .from(
        select.options
      )
      .map(
        (option) =>
          option.value
      );


  if (
    availableValues.includes(
      current
    )
  ) {

    select.value =
      current;

  } else {

    adminArticleManagerFilters.author =
      "all";


    select.value =
      "all";

  }

}


/* =========================================================
   GET FILTERED ARTICLES
========================================================= */

function getAdminManagerFilteredArticles() {

  return [
    ...articles
  ]
    .sort(
      (a, b) =>
        getArticleActivityTime(
          b
        ) -
        getArticleActivityTime(
          a
        )
    )
    .filter(
      (article) => {

        const state =
          getAdminArticleState(
            article
          );


        if (
          adminArticleManagerFilters.status !==
            "all" &&
          state !==
            adminArticleManagerFilters.status
        ) {

          return false;

        }


        if (
          adminArticleManagerFilters.sport !==
            "all" &&
          article.sport !==
            adminArticleManagerFilters.sport
        ) {

          return false;

        }


        if (
          adminArticleManagerFilters.author !==
            "all" &&
          normalizeSearchText(
            article.author
          ) !==
            adminArticleManagerFilters.author
        ) {

          return false;

        }


        if (
          adminArticleManagerFilters.search
        ) {

          const searchData =
            normalizeSearchText(
              [
                article.title,
                article.author,
                article.summary,
                article.content,
                getSportLabel(
                  article.sport
                ),
                ...normalizeTags(
                  article.tags
                )
              ].join(" ")
            );


          if (
            !searchData.includes(
              adminArticleManagerFilters.search
            )
          ) {

            return false;

          }

        }


        return true;

      }
    );

}


/* =========================================================
   RENDER MANAGER
========================================================= */

function renderAdminArticleManager() {

  renderAdminManagerAuthorFilter();


  const items =
    getAdminManagerFilteredArticles();


  const list =
    document.getElementById(
      "articleManagerList"
    );


  list.innerHTML =
    "";


  const total =
    document.getElementById(
      "articleManagerTotal"
    );


  total.textContent =
    `${articles.length} ${
      articles.length === 1
        ? "NOTICIA"
        : "NOTICIAS"
    }`;


  const summary =
    document.getElementById(
      "articleManagerSummary"
    );


  summary.textContent =
    `${items.length} ${
      items.length === 1
        ? "NOTICIA"
        : "NOTICIAS"
    }`;


  if (
    items.length === 0
  ) {

    list.innerHTML = `
      <div
        class="article-manager-empty"
      >

        <strong>
          SIN RESULTADOS
        </strong>

        <p>
          No encontramos noticias con
          los filtros seleccionados.
        </p>

      </div>
    `;


    return;

  }


  items.forEach(
    (article, index) => {

      list.appendChild(
        createAdminArticleManagerRow(
          article,
          index
        )
      );

    }
  );

}


/* =========================================================
   ARTICLE ROW
========================================================= */

function createAdminArticleManagerRow(
  article,
  index
) {

  const state =
    getAdminArticleState(
      article
    );


  const row =
    document.createElement(
      "article"
    );


  row.className =
    "article-manager-row";


  /* NUMBER */

  const number =
    document.createElement(
      "div"
    );


  number.className =
    "article-manager-number";


  number.textContent =
    String(
      index + 1
    ).padStart(
      2,
      "0"
    );


  /* STATUS */

  const status =
    document.createElement(
      "div"
    );


  status.className =
    `article-manager-status ${state}`;


  status.textContent =
    getAdminArticleStateLabel(
      article
    );


  /* SPORT */

  const sport =
    document.createElement(
      "div"
    );


  sport.className =
    "article-manager-sport";


  sport.textContent =
    getSportLabel(
      article.sport
    );


  /* COPY */

  const copy =
    document.createElement(
      "div"
    );


  copy.className =
    "article-manager-copy";


  const title =
    document.createElement(
      "h3"
    );


  title.className =
    "article-manager-title";


  title.textContent =
    article.title?.trim() ||
    "NOTICIA SIN TÍTULO";


  copy.appendChild(
    title
  );


  const tags =
    normalizeTags(
      article.tags
    );


  if (
    tags.length > 0
  ) {

    const tagsContainer =
      document.createElement(
        "div"
      );


    tagsContainer.className =
      "article-manager-tags";


    tags
      .slice(
        0,
        4
      )
      .forEach(
        (tag) => {

          const chip =
            document.createElement(
              "span"
            );


          chip.className =
            "article-manager-tag";


          chip.textContent =
            tag;


          tagsContainer.appendChild(
            chip
          );

        }
      );


    copy.appendChild(
      tagsContainer
    );

  }


  const date =
    document.createElement(
      "div"
    );


  date.className =
    "article-manager-date";


  date.textContent =
    getAdminRecentDateText(
      article
    );


  copy.appendChild(
    date
  );


  /* AUTHOR */

  const author =
    document.createElement(
      "div"
    );


  author.className =
    "article-manager-author";


  author.textContent =
    article.author?.trim() ||
    "SIN AUTOR";


  /* ACTIONS */

  const actions =
    document.createElement(
      "div"
    );


  actions.className =
    "article-manager-actions";


  const editButton =
    createArticleManagerAction(
      "EDITAR",
      "primary"
    );


  editButton.addEventListener(
    "click",
    () => {

      closeAdminArticleManager();


      openEditor(
        article.id
      );

    }
  );


  actions.appendChild(
    editButton
  );


  /* PUBLISHED */

  if (
    state === "published"
  ) {

    const readButton =
      createArticleManagerAction(
        "LEER",
        ""
      );


    readButton.addEventListener(
      "click",
      () => {

        closeAdminArticleManager();


        openReader(
          article.id
        );

      }
    );


    const archiveButton =
      createArticleManagerAction(
        "ARCHIVAR",
        "archive"
      );


    archiveButton.addEventListener(
      "click",
      () => {

        openArchiveConfirmation(
          article.id
        );

      }
    );


    actions.append(
      readButton,
      archiveButton
    );

  }


  /* DRAFT */

  if (
    state === "draft"
  ) {

    const ready =
      isArticleReadyForPublication(
        article
      );


    const publishButton =
      createArticleManagerAction(
        ready
          ? "PUBLICAR"
          : "COMPLETAR",
        ready
          ? "publish"
          : ""
      );


    publishButton.addEventListener(
      "click",
      () => {

        if (ready) {

          publishDraftFromArticleManager(
            article.id
          );

        } else {

          closeAdminArticleManager();


          openEditor(
            article.id
          );


          showToast(
            "COMPLETA LA NOTICIA ANTES DE PUBLICAR."
          );

        }

      }
    );


    actions.appendChild(
      publishButton
    );

  }


  /* ARCHIVED */

  if (
    state === "archived"
  ) {

    const republishButton =
      createArticleManagerAction(
        "REPUBLICAR",
        "publish"
      );


    republishButton.addEventListener(
      "click",
      () => {

        republishArchivedArticle(
          article.id
        );

      }
    );


    const draftButton =
      createArticleManagerAction(
        "A BORRADOR",
        ""
      );


    draftButton.addEventListener(
      "click",
      () => {

        moveArchivedArticleToDraft(
          article.id
        );

      }
    );


    actions.append(
      republishButton,
      draftButton
    );

  }


  /* DELETE */

  const deleteButton =
    createArticleManagerAction(
      "ELIMINAR",
      "danger"
    );


  deleteButton.addEventListener(
    "click",
    () => {

      openDeleteConfirmation(
        article.id
      );

    }
  );


  actions.appendChild(
    deleteButton
  );


  row.append(
    number,
    status,
    sport,
    copy,
    author,
    actions
  );


  return row;

}


/* =========================================================
   ACTION BUTTON
========================================================= */

function createArticleManagerAction(
  text,
  modifier
) {

  const button =
    document.createElement(
      "button"
    );


  button.type =
    "button";


  button.className =
    `article-manager-action ${modifier}`.trim();


  button.textContent =
    text;


  return button;

}


/* =========================================================
   CAN A DRAFT BE PUBLISHED?
========================================================= */

function isArticleReadyForPublication(
  article
) {

  return Boolean(

    String(
      article.title || ""
    ).trim() &&

    String(
      article.author || ""
    ).trim() &&

    String(
      article.summary || ""
    ).trim() &&

    String(
      article.content || ""
    ).trim() &&

    [
      "football",
      "tennis",
      "baseball",
      "basketball"
    ].includes(
      article.sport
    )

  );

}


/* =========================================================
   PUBLISH DRAFT DIRECTLY FROM ADMIN
========================================================= */

function publishDraftFromArticleManager(
  articleId
) {

  const article =
    findArticle(
      articleId
    );


  if (
    !article ||
    article.status !==
      "draft" ||
    article.archivedAt
  ) {

    return;

  }


  if (
    !isArticleReadyForPublication(
      article
    )
  ) {

    closeAdminArticleManager();


    openEditor(
      article.id
    );


    showToast(
      "COMPLETA LA NOTICIA ANTES DE PUBLICAR."
    );


    return;

  }


  createInternalBackup(
    "Antes de publicar borrador desde Admin"
  );


  const now =
    new Date().toISOString();


  article.status =
    "published";


  article.archivedAt =
    null;


  article.publishedAt =
    now;


  article.updatedAt =
    now;


  if (
    !persistArticles()
  ) {

    return;

  }


  createInternalBackup(
    "Después de publicar borrador desde Admin"
  );


  renderCurrentView();

  updateManagementCounts();

  updateBackupStatus();


  showToast(
    "NOTICIA PUBLICADA."
  );

}


/* =========================================================
   REFRESH MANAGER WHEN DATA CHANGES
========================================================= */

const step102BaseUpdateManagementCounts =
  updateManagementCounts;


updateManagementCounts =
  function () {

    step102BaseUpdateManagementCounts();


    const manager =
      document.getElementById(
        "adminArticleManagerModal"
      );


    if (
      manager?.classList.contains(
        "open"
      )
    ) {

      renderAdminArticleManager();

    }

  };


/* =========================================================
   BODY SCROLL
========================================================= */

const step102BaseSyncBodyScrollState =
  syncBodyScrollState;


syncBodyScrollState =
  function () {

    step102BaseSyncBodyScrollState();


    const manager =
      document.getElementById(
        "adminArticleManagerModal"
      );


    if (
      manager?.classList.contains(
        "open"
      )
    ) {

      document.body.classList.add(
        "modal-open"
      );

    }

  };


/* =========================================================
   ESCAPE
========================================================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key !== "Escape"
    ) {

      return;

    }


    const manager =
      document.getElementById(
        "adminArticleManagerModal"
      );


    if (
      manager?.classList.contains(
        "open"
      )
    ) {

      closeAdminArticleManager();

    }

  }
);


/* =========================================================
   INSTALL
========================================================= */

createAdminArticleManagerInterface();

updateManagementCounts(); 

/* =========================================================
   PASO 12.2 — TEST SUPABASE
========================================================= */

async function testSportsJournalSupabaseConnection() {

  console.log(
    "SPORTS JOURNAL → Probando conexión con Supabase..."
  );


  if (!window.sportsJournalDb) {

    console.error(
      "SPORTS JOURNAL → Supabase no fue inicializado."
    );

    showToast(
      "ERROR AL INICIAR SUPABASE."
    );

    return;

  }


  const {
    data,
    error
  } =
    await window.sportsJournalDb
      .from("articles")
      .select("id")
      .limit(1);


  if (error) {

    console.error(
      "SPORTS JOURNAL → Error de Supabase:",
      error
    );

    showToast(
      "NO SE PUDO CONECTAR CON SUPABASE."
    );

    return;

  }


  console.log(
    "SPORTS JOURNAL → Supabase conectado correctamente.",
    data
  );


  showToast(
    "SUPABASE CONECTADO ✓"
  );

}


testSportsJournalSupabaseConnection();