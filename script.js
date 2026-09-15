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

/* =========================================================
   PASO 13.1 — SPORTS JOURNAL AUTH
========================================================= */

const sportsJournalAuth = {

  session: null,

  profile: null,

  inviteLanding:
    new URLSearchParams(
      window.location.hash.replace(
        /^#/,
        ""
      )
    ).get("type") === "invite"

};


/* =========================================================
   CREATE AUTH UI
========================================================= */

function createSportsJournalAuthInterface() {

  if (
    document.getElementById(
      "sportsJournalAuthModal"
    )
  ) {

    return;

  }


  const modal =
    document.createElement(
      "div"
    );


  modal.id =
    "sportsJournalAuthModal";


  modal.className =
    "modal sj-auth-modal";


  modal.setAttribute(
    "aria-hidden",
    "true"
  );


  modal.innerHTML = `
    <div
      class="modal-backdrop"
      data-close-sj-auth
    ></div>

    <section
      class="sj-auth-panel"
      aria-label="Cuenta Sports Journal"
    >

      <header
        class="sj-auth-header"
      >

        <div>

          <span>
            SPORTS JOURNAL
          </span>

          <h2
            id="sjAuthHeading"
          >
            INICIAR SESIÓN
          </h2>

        </div>

        <button
          class="close-button sj-auth-close"
          id="sjAuthCloseButton"
          type="button"
          aria-label="Cerrar"
        >
          ×
        </button>

      </header>


      <div
        class="sj-auth-content"
      >

        <!-- LOGIN -->

        <div
          id="sjAuthLoginView"
        >

          <p
            class="sj-auth-intro"
          >
            Accede a la redacción de Sports Journal.
          </p>

          <form
            class="sj-auth-form"
            id="sjLoginForm"
          >

            <label
              class="sj-auth-field"
            >

              <span>
                CORREO
              </span>

              <input
                id="sjLoginEmail"
                type="email"
                autocomplete="email"
                required
              />

            </label>


            <label
              class="sj-auth-field"
            >

              <span>
                CONTRASEÑA
              </span>

              <input
                id="sjLoginPassword"
                type="password"
                autocomplete="current-password"
                required
              />

            </label>


            <div
              class="sj-auth-error"
              id="sjLoginError"
              hidden
            ></div>


            <button
              class="sj-auth-submit"
              type="submit"
            >
              ENTRAR A LA REDACCIÓN →
            </button>

          </form>

        </div>


        <!-- FIRST PASSWORD / CHANGE PASSWORD -->

        <div
          id="sjAuthSetupView"
          hidden
        >

          <p
            class="sj-auth-intro"
            id="sjSetupIntro"
          >
            Tu invitación fue aceptada.
            Completa tu cuenta creando una contraseña.
          </p>


          <form
            class="sj-auth-form"
            id="sjSetupForm"
          >

            <label
              class="sj-auth-field"
            >

              <span>
                NOMBRE EN SPORTS JOURNAL
              </span>

              <input
                id="sjSetupName"
                type="text"
                maxlength="80"
                autocomplete="name"
                placeholder="Tu nombre"
              />

            </label>


            <label
              class="sj-auth-field"
            >

              <span>
                NUEVA CONTRASEÑA
              </span>

              <input
                id="sjSetupPassword"
                type="password"
                minlength="8"
                autocomplete="new-password"
                required
              />

            </label>


            <label
              class="sj-auth-field"
            >

              <span>
                REPETIR CONTRASEÑA
              </span>

              <input
                id="sjSetupPasswordConfirm"
                type="password"
                minlength="8"
                autocomplete="new-password"
                required
              />

            </label>


            <div
              class="sj-auth-error"
              id="sjSetupError"
              hidden
            ></div>


            <button
              class="sj-auth-submit"
              type="submit"
            >
              GUARDAR CONTRASEÑA →
            </button>

          </form>

        </div>


        <!-- ACCOUNT -->

        <div
          id="sjAuthAccountView"
          hidden
        >

          <div
            class="sj-auth-account"
          >

            <span
              class="sj-auth-account-label"
            >
              SESIÓN ACTIVA
            </span>

            <div
              class="sj-auth-account-email"
              id="sjAuthAccountEmail"
            ></div>

            <div
              id="sjAuthAccountName"
            ></div>

            <span
              class="sj-auth-role"
              id="sjAuthRole"
            >
              JOURNALIST
            </span>


            <div
              class="sj-auth-account-actions"
            >

              <button
                class="sj-auth-secondary"
                id="sjChangePasswordButton"
                type="button"
              >
                CAMBIAR CONTRASEÑA
              </button>

              <button
                class="sj-auth-logout"
                id="sjLogoutButton"
                type="button"
              >
                CERRAR SESIÓN
              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  `;


  document.body.appendChild(
    modal
  );


  /* -------------------------------------------------------
     ACCOUNT BUTTON IN SIDE MENU
  ------------------------------------------------------- */

  const authMenuButton =
    document.createElement(
      "button"
    );


  authMenuButton.id =
    "authMenuButton";


  authMenuButton.type =
    "button";


  authMenuButton.className =
    "journal-menu-button";


  authMenuButton.innerHTML = `
    <span>
      CUENTA
    </span>

    <strong
      id="authMenuState"
    >
      ENTRAR
    </strong>
  `;


  frontPageMenuButton.insertAdjacentElement(
    "beforebegin",
    authMenuButton
  );


  /* -------------------------------------------------------
     EVENTS
  ------------------------------------------------------- */

  authMenuButton.addEventListener(
    "click",
    () => {

      closeSideMenu();


      if (
        sportsJournalAuth.session
      ) {

        openSportsJournalAuthModal(
          "account"
        );

      } else {

        openSportsJournalAuthModal(
          "login"
        );

      }

    }
  );


  document
    .querySelectorAll(
      "[data-close-sj-auth]"
    )
    .forEach(
      (element) => {

        element.addEventListener(
          "click",
          closeSportsJournalAuthModal
        );

      }
    );


  document
    .getElementById(
      "sjAuthCloseButton"
    )
    .addEventListener(
      "click",
      closeSportsJournalAuthModal
    );


  document
    .getElementById(
      "sjLoginForm"
    )
    .addEventListener(
      "submit",
      handleSportsJournalLogin
    );


  document
    .getElementById(
      "sjSetupForm"
    )
    .addEventListener(
      "submit",
      handleSportsJournalPasswordSetup
    );


  document
    .getElementById(
      "sjLogoutButton"
    )
    .addEventListener(
      "click",
      handleSportsJournalLogout
    );


  document
    .getElementById(
      "sjChangePasswordButton"
    )
    .addEventListener(
      "click",
      () => {

        openSportsJournalAuthModal(
          "setup",
          false
        );

      }
    );


  /*
    Existing + ESCRIBIR button.

    A visitor gets Login instead of Editor.
  */

  openEditorButton.addEventListener(
    "click",
    (event) => {

      if (
        sportsJournalAuth.session
      ) {

        return;

      }


      event.preventDefault();

      event.stopImmediatePropagation();


      openSportsJournalAuthModal(
        "login"
      );

    },
    true
  );


  menuWriteStoryButton.addEventListener(
    "click",
    (event) => {

      if (
        sportsJournalAuth.session
      ) {

        return;

      }


      event.preventDefault();

      event.stopImmediatePropagation();


      closeSideMenu();


      openSportsJournalAuthModal(
        "login"
      );

    },
    true
  );

}


/* =========================================================
   MODAL MODES
========================================================= */

function openSportsJournalAuthModal(
  mode = "login",
  firstSetup = false
) {

  const modal =
    document.getElementById(
      "sportsJournalAuthModal"
    );


  const loginView =
    document.getElementById(
      "sjAuthLoginView"
    );


  const setupView =
    document.getElementById(
      "sjAuthSetupView"
    );


  const accountView =
    document.getElementById(
      "sjAuthAccountView"
    );


  loginView.hidden =
    mode !== "login";


  setupView.hidden =
    mode !== "setup";


  accountView.hidden =
    mode !== "account";


  const heading =
    document.getElementById(
      "sjAuthHeading"
    );


  if (
    mode === "setup"
  ) {

    heading.textContent =
      firstSetup
        ? "CREAR CONTRASEÑA"
        : "CAMBIAR CONTRASEÑA";


    document
      .getElementById(
        "sjSetupIntro"
      )
      .textContent =
        firstSetup
          ? "Tu invitación fue aceptada. Completa tu cuenta creando una contraseña."
          : "Introduce una nueva contraseña para tu cuenta.";


    document
      .getElementById(
        "sjSetupName"
      )
      .value =
        sportsJournalAuth.profile
          ?.display_name ||
        "";

  } else if (
    mode === "account"
  ) {

    heading.textContent =
      "MI CUENTA";


    renderSportsJournalAccount();

  } else {

    heading.textContent =
      "INICIAR SESIÓN";

  }


  modal.classList.add(
    "open"
  );


  modal.setAttribute(
    "aria-hidden",
    "false"
  );


  syncBodyScrollState();

}


function closeSportsJournalAuthModal() {

  const modal =
    document.getElementById(
      "sportsJournalAuthModal"
    );


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
   LOGIN
========================================================= */

async function handleSportsJournalLogin(
  event
) {

  event.preventDefault();


  const email =
    document
      .getElementById(
        "sjLoginEmail"
      )
      .value
      .trim();


  const password =
    document
      .getElementById(
        "sjLoginPassword"
      )
      .value;


  const errorBox =
    document.getElementById(
      "sjLoginError"
    );


  errorBox.hidden =
    true;


  const {
    data,
    error
  } =
    await window.sportsJournalDb
      .auth
      .signInWithPassword({
        email,
        password
      });


  if (error) {

    errorBox.textContent =
      error.message;


    errorBox.hidden =
      false;


    return;

  }


  sportsJournalAuth.session =
    data.session;


  await loadSportsJournalProfile();


  syncSportsJournalAuthUi();


  closeSportsJournalAuthModal();


  showToast(
    "SESIÓN INICIADA ✓"
  );

}


/* =========================================================
   SET / CHANGE PASSWORD
========================================================= */

async function handleSportsJournalPasswordSetup(
  event
) {

  event.preventDefault();


  const password =
    document
      .getElementById(
        "sjSetupPassword"
      )
      .value;


  const confirmation =
    document
      .getElementById(
        "sjSetupPasswordConfirm"
      )
      .value;


  const displayName =
    document
      .getElementById(
        "sjSetupName"
      )
      .value
      .trim();


  const errorBox =
    document.getElementById(
      "sjSetupError"
    );


  errorBox.hidden =
    true;


  if (
    !sportsJournalAuth.session
  ) {

    errorBox.textContent =
      "LA SESIÓN DE INVITACIÓN YA NO ESTÁ ACTIVA.";


    errorBox.hidden =
      false;


    return;

  }


  if (
    password.length < 8
  ) {

    errorBox.textContent =
      "USA UNA CONTRASEÑA DE AL MENOS 8 CARACTERES.";


    errorBox.hidden =
      false;


    return;

  }


  if (
    password !==
    confirmation
  ) {

    errorBox.textContent =
      "LAS CONTRASEÑAS NO COINCIDEN.";


    errorBox.hidden =
      false;


    return;

  }


  const {
    error: passwordError
  } =
    await window.sportsJournalDb
      .auth
      .updateUser({
        password
      });


  if (
    passwordError
  ) {

    errorBox.textContent =
      passwordError.message;


    errorBox.hidden =
      false;


    return;

  }


  if (
    displayName
  ) {

    const userId =
      sportsJournalAuth
        .session
        .user
        .id;


    const {
      error: profileError
    } =
      await window.sportsJournalDb
        .from(
          "profiles"
        )
        .update({
          display_name:
            displayName
        })
        .eq(
          "id",
          userId
        );


    if (
      profileError
    ) {

      console.error(
        "SPORTS JOURNAL → No se pudo actualizar nombre:",
        profileError
      );

    }

  }


  await loadSportsJournalProfile();


  sportsJournalAuth.inviteLanding =
    false;


  /*
    Remove invite tokens from visible URL.
  */

  window.history.replaceState(
    {},
    document.title,
    window.location.pathname
  );


  document
    .getElementById(
      "sjSetupPassword"
    )
    .value =
      "";


  document
    .getElementById(
      "sjSetupPasswordConfirm"
    )
    .value =
      "";


  syncSportsJournalAuthUi();


  openSportsJournalAuthModal(
    "account"
  );


  showToast(
    "CUENTA CONFIGURADA ✓"
  );

}


/* =========================================================
   LOGOUT
========================================================= */

async function handleSportsJournalLogout() {

  const {
    error
  } =
    await window.sportsJournalDb
      .auth
      .signOut();


  if (error) {

    showToast(
      "NO SE PUDO CERRAR LA SESIÓN."
    );


    return;

  }


  sportsJournalAuth.session =
    null;


  sportsJournalAuth.profile =
    null;


  syncSportsJournalAuthUi();


  closeSportsJournalAuthModal();


  showToast(
    "SESIÓN CERRADA."
  );

}


/* =========================================================
   PROFILE
========================================================= */

async function loadSportsJournalProfile() {

  const user =
    sportsJournalAuth
      .session
      ?.user;


  if (!user) {

    sportsJournalAuth.profile =
      null;


    return;

  }


  const {
    data,
    error
  } =
    await window.sportsJournalDb
      .from(
        "profiles"
      )
      .select(
        "id, display_name, role, avatar_url, bio"
      )
      .eq(
        "id",
        user.id
      )
      .maybeSingle();


  if (error) {

    console.error(
      "SPORTS JOURNAL → Error cargando perfil:",
      error
    );


    sportsJournalAuth.profile =
      null;


    return;

  }


  sportsJournalAuth.profile =
    data;

}


/* =========================================================
   ACCOUNT UI
========================================================= */

function renderSportsJournalAccount() {

  const user =
    sportsJournalAuth
      .session
      ?.user;


  if (!user) {

    return;

  }


  document
    .getElementById(
      "sjAuthAccountEmail"
    )
    .textContent =
      user.email || "";


  document
    .getElementById(
      "sjAuthAccountName"
    )
    .textContent =
      sportsJournalAuth
        .profile
        ?.display_name ||
      "SPORTS JOURNAL";


  document
    .getElementById(
      "sjAuthRole"
    )
    .textContent =
      (
        sportsJournalAuth
          .profile
          ?.role ||
        "journalist"
      ).toUpperCase();

}


/* =========================================================
   AUTH UI STATE
========================================================= */

function syncSportsJournalAuthUi() {

  const loggedIn =
    Boolean(
      sportsJournalAuth.session
    );


  document.body.classList.toggle(
    "sj-auth-guest",
    !loggedIn
  );


  const menuState =
    document.getElementById(
      "authMenuState"
    );


  if (menuState) {

    menuState.textContent =
      loggedIn
        ? (
            sportsJournalAuth
              .profile
              ?.role ||
            "CUENTA"
          ).toUpperCase()
        : "ENTRAR";

  }


  if (loggedIn) {

    openEditorButton.textContent =
      "+ ESCRIBIR NOTICIA";


    menuWriteStoryButton
      .querySelector(
        "span"
      )
      .textContent =
        "ESCRIBIR NOTICIA";

  } else {

    openEditorButton.textContent =
      "INICIAR SESIÓN";


    menuWriteStoryButton
      .querySelector(
        "span"
      )
      .textContent =
        "INICIAR SESIÓN";

  }

}


/* =========================================================
   INITIAL AUTH SESSION
========================================================= */

async function initializeSportsJournalAuth() {

  const {
    data,
    error
  } =
    await window
      .sportsJournalDb
      .auth
      .getSession();


  if (error) {

    console.error(
      "SPORTS JOURNAL → Error leyendo sesión:",
      error
    );

  }


  sportsJournalAuth.session =
    data?.session || null;


  if (
    sportsJournalAuth.session
  ) {

    await loadSportsJournalProfile();

  }


  syncSportsJournalAuthUi();


  /*
    Invitation accepted:
    show first-password screen.
  */

  if (
    sportsJournalAuth.session &&
    sportsJournalAuth.inviteLanding
  ) {

    openSportsJournalAuthModal(
      "setup",
      true
    );

  }

}


/* =========================================================
   AUTH EVENTS
========================================================= */

window
  .sportsJournalDb
  .auth
  .onAuthStateChange(
    (event, session) => {

      sportsJournalAuth.session =
        session;


      window.setTimeout(
        async () => {

          if (session) {

            await loadSportsJournalProfile();

          } else {

            sportsJournalAuth.profile =
              null;

          }


          syncSportsJournalAuthUi();

        },
        0
      );

    }
  );


/* =========================================================
   INSTALL
========================================================= */

createSportsJournalAuthInterface();

initializeSportsJournalAuth();

/* =========================================================
   PASO 13.1B — PASSWORD RECOVERY / FIRST PASSWORD
========================================================= */


/* =========================================================
   ADD RECOVERY BUTTON TO LOGIN
========================================================= */

function installSportsJournalPasswordRecovery() {

  if (
    document.getElementById(
      "sjRecoveryButton"
    )
  ) {

    return;

  }


  const loginForm =
    document.getElementById(
      "sjLoginForm"
    );


  if (!loginForm) {

    return;

  }


  const recoveryButton =
    document.createElement(
      "button"
    );


  recoveryButton.id =
    "sjRecoveryButton";


  recoveryButton.type =
    "button";


  recoveryButton.className =
    "sj-auth-recovery";


  recoveryButton.textContent =
    "PRIMERA VEZ / OLVIDÉ MI CONTRASEÑA";


  const recoveryMessage =
    document.createElement(
      "div"
    );


  recoveryMessage.id =
    "sjRecoveryMessage";


  recoveryMessage.className =
    "sj-auth-message";


  recoveryMessage.hidden =
    true;


  loginForm.append(
    recoveryButton,
    recoveryMessage
  );


  recoveryButton.addEventListener(
    "click",
    sendSportsJournalPasswordRecovery
  );

}


/* =========================================================
   SEND PASSWORD EMAIL
========================================================= */

async function sendSportsJournalPasswordRecovery() {

  const emailInput =
    document.getElementById(
      "sjLoginEmail"
    );


  const message =
    document.getElementById(
      "sjRecoveryMessage"
    );


  const errorBox =
    document.getElementById(
      "sjLoginError"
    );


  const email =
    emailInput.value.trim();


  errorBox.hidden =
    true;


  message.hidden =
    true;


  if (!email) {

    errorBox.textContent =
      "ESCRIBE PRIMERO TU CORREO.";


    errorBox.hidden =
      false;


    emailInput.focus();


    return;

  }


  const redirectUrl =
    `${window.location.origin}${window.location.pathname}`;


  const {
    error
  } =
    await window.sportsJournalDb
      .auth
      .resetPasswordForEmail(
        email,
        {
          redirectTo:
            redirectUrl
        }
      );


  if (error) {

    console.error(
      "SPORTS JOURNAL → Error enviando recuperación:",
      error
    );


    errorBox.textContent =
      error.message;


    errorBox.hidden =
      false;


    return;

  }


  message.textContent =
    "REVISA TU CORREO. TE ENVIAMOS UN ENLACE PARA CREAR O CAMBIAR TU CONTRASEÑA.";


  message.hidden =
    false;

}


/* =========================================================
   PASSWORD RECOVERY EVENT
========================================================= */

window
  .sportsJournalDb
  .auth
  .onAuthStateChange(
    (event, session) => {

      if (
        event !==
        "PASSWORD_RECOVERY"
      ) {

        return;

      }


      sportsJournalAuth.session =
        session;


      window.setTimeout(
        async () => {

          await loadSportsJournalProfile();


          syncSportsJournalAuthUi();


          openSportsJournalAuthModal(
            "setup",
            false
          );


          document
            .getElementById(
              "sjSetupIntro"
            )
            .textContent =
              "Tu identidad fue verificada. Crea una nueva contraseña para entrar a Sports Journal.";

        },
        0
      );

    }
  );


/* =========================================================
   INSTALL
========================================================= */

installSportsJournalPasswordRecovery();

/* =========================================================
   PASO 12.3 — MIGRAR LOCALSTORAGE → SUPABASE
========================================================= */

window.migrateSportsJournalLocalArticles =
  async function () {

    console.log(
      "SPORTS JOURNAL → Iniciando migración..."
    );


    /* -----------------------------------------------------
       CHECK DATABASE
    ----------------------------------------------------- */

    if (!window.sportsJournalDb) {

      console.error(
        "Supabase no está conectado."
      );


      showToast(
        "SUPABASE NO ESTÁ CONECTADO."
      );


      return;

    }


    /* -----------------------------------------------------
       CHECK SESSION
    ----------------------------------------------------- */

    const {
      data: sessionData,
      error: sessionError
    } =
      await window
        .sportsJournalDb
        .auth
        .getSession();


    if (
      sessionError ||
      !sessionData.session
    ) {

      console.error(
        "No hay sesión activa.",
        sessionError
      );


      showToast(
        "INICIA SESIÓN ANTES DE MIGRAR."
      );


      return;

    }


    const user =
      sessionData.session.user;


    /* -----------------------------------------------------
       CHECK PROFILE / ADMIN
    ----------------------------------------------------- */

    const {
      data: profile,
      error: profileError
    } =
      await window
        .sportsJournalDb
        .from("profiles")
        .select(
          "id, display_name, role"
        )
        .eq(
          "id",
          user.id
        )
        .single();


    if (profileError) {

      console.error(
        "No se pudo leer el perfil:",
        profileError
      );


      showToast(
        "NO SE PUDO COMPROBAR TU CUENTA."
      );


      return;

    }


    if (
      profile.role !== "admin"
    ) {

      console.warn(
        "Migración bloqueada. Rol actual:",
        profile.role
      );


      showToast(
        "SOLO UN ADMIN PUEDE MIGRAR EL DIARIO."
      );


      return;

    }


    /* -----------------------------------------------------
       CHECK LOCAL ARTICLES
    ----------------------------------------------------- */

    if (
      !Array.isArray(articles) ||
      articles.length === 0
    ) {

      showToast(
        "NO HAY NOTICIAS LOCALES PARA MIGRAR."
      );


      return;

    }


    /* -----------------------------------------------------
       CREATE DATABASE PAYLOAD
    ----------------------------------------------------- */

    const payload =
      articles.map(
        (article) => {

          let databaseStatus =
            article.status === "draft"
              ? "draft"
              : "published";


          if (
            article.archivedAt
          ) {

            databaseStatus =
              "archived";

          }


          return {

            legacy_local_id:
              String(article.id),

            title:
              String(
                article.title || ""
              ),

            sport:
              article.sport,

            author_id:
              user.id,

            author_name:
              String(
                article.author ||
                profile.display_name ||
                "Sports Journal"
              ),

            summary:
              String(
                article.summary || ""
              ),

            content:
              String(
                article.content || ""
              ),

            tags:
              normalizeTags(
                article.tags
              ),

            image_url:
              String(
                article.imageUrl || ""
              ),

            image_position:
              String(
                article.imagePosition ||
                "50% 50%"
              ),

            image_zoom:
              normalizeZoom(
                article.imageZoom
              ),

            image_mode:
              article.imageMode === "full"
                ? "full"
                : "crop",

            status:
              databaseStatus,

            created_by:
              user.id,

            updated_by:
              user.id,

            created_at:
              article.createdAt ||
              new Date().toISOString(),

            updated_at:
              article.updatedAt ||
              article.createdAt ||
              new Date().toISOString(),

            published_at:
              databaseStatus === "draft"
                ? null
                : (
                    article.publishedAt ||
                    article.createdAt ||
                    null
                  ),

            archived_at:
              databaseStatus === "archived"
                ? (
                    article.archivedAt ||
                    new Date().toISOString()
                  )
                : null

          };

        }
      );


    console.log(
      `SPORTS JOURNAL → ${payload.length} artículos preparados.`
    );


    /* -----------------------------------------------------
       UPSERT
       legacy_local_id prevents duplicates
    ----------------------------------------------------- */

    const {
      data,
      error
    } =
      await window
        .sportsJournalDb
        .from("articles")
        .upsert(
          payload,
          {
            onConflict:
              "legacy_local_id"
          }
        )
        .select(
          "id, legacy_local_id, title, status"
        );


    if (error) {

      console.error(
        "SPORTS JOURNAL → Error migrando artículos:",
        error
      );


      showToast(
        "ERROR DURANTE LA MIGRACIÓN."
      );


      return;

    }


    console.table(data);


    console.log(
      "SPORTS JOURNAL → Migración completada.",
      data
    );


    showToast(
      `${data.length} NOTICIAS MIGRADAS ✓`
    );

  };

  /* =========================================================
   PASO 12.4 — VERIFY LOCALSTORAGE → SUPABASE MIGRATION
========================================================= */

window.verifySportsJournalMigration =
  async function () {

    console.log(
      "SPORTS JOURNAL → Verificando migración..."
    );


    /* -----------------------------------------------------
       CHECK CONNECTION
    ----------------------------------------------------- */

    if (!window.sportsJournalDb) {

      console.error(
        "Supabase no está conectado."
      );

      showToast(
        "SUPABASE NO ESTÁ CONECTADO."
      );

      return;
    }


    /* -----------------------------------------------------
       READ CLOUD ARTICLES
    ----------------------------------------------------- */

    const {
      data: cloudArticles,
      error
    } =
      await window.sportsJournalDb
        .from("articles")
        .select(`
          id,
          legacy_local_id,
          title,
          sport,
          author_name,
          summary,
          content,
          tags,
          image_url,
          image_position,
          image_zoom,
          image_mode,
          status,
          created_at,
          published_at,
          archived_at
        `);


    if (error) {

      console.error(
        "SPORTS JOURNAL → No se pudo verificar Supabase:",
        error
      );

      showToast(
        "ERROR AL VERIFICAR LA MIGRACIÓN."
      );

      return;
    }


    /* -----------------------------------------------------
       ONLY MIGRATED LEGACY ARTICLES
    ----------------------------------------------------- */

    const migratedCloudArticles =
      cloudArticles.filter(
        (article) =>
          article.legacy_local_id
      );


    const cloudByLegacyId =
      new Map(
        migratedCloudArticles.map(
          (article) => [
            String(
              article.legacy_local_id
            ),
            article
          ]
        )
      );


    /* -----------------------------------------------------
       RESULTS
    ----------------------------------------------------- */

    const results =
      [];


    let passed =
      0;


    let failed =
      0;


    articles.forEach(
      (localArticle) => {

        const localId =
          String(
            localArticle.id
          );


        const cloudArticle =
          cloudByLegacyId.get(
            localId
          );


        if (!cloudArticle) {

          failed += 1;


          results.push({
            title:
              localArticle.title,

            localId,

            result:
              "❌ NO EXISTE EN SUPABASE"
          });


          return;
        }


        const expectedStatus =
          localArticle.archivedAt
            ? "archived"
            : (
                localArticle.status ===
                  "draft"
                  ? "draft"
                  : "published"
              );


        const localTags =
          normalizeTags(
            localArticle.tags
          );


        const cloudTags =
          Array.isArray(
            cloudArticle.tags
          )
            ? cloudArticle.tags
            : [];


        const checks = {

          title:
            String(
              cloudArticle.title || ""
            ) ===
            String(
              localArticle.title || ""
            ),

          sport:
            cloudArticle.sport ===
            localArticle.sport,

          author:
            String(
              cloudArticle.author_name || ""
            ) ===
            String(
              localArticle.author || ""
            ),

          summary:
            String(
              cloudArticle.summary || ""
            ) ===
            String(
              localArticle.summary || ""
            ),

          content:
            String(
              cloudArticle.content || ""
            ) ===
            String(
              localArticle.content || ""
            ),

          tags:
            JSON.stringify(
              cloudTags
            ) ===
            JSON.stringify(
              localTags
            ),

          imageUrl:
            String(
              cloudArticle.image_url || ""
            ) ===
            String(
              localArticle.imageUrl || ""
            ),

          imageMode:
            cloudArticle.image_mode ===
            (
              localArticle.imageMode ===
                "full"
                ? "full"
                : "crop"
            ),

          status:
            cloudArticle.status ===
            expectedStatus

        };


        const problems =
          Object
            .entries(checks)
            .filter(
              ([, correct]) =>
                !correct
            )
            .map(
              ([name]) =>
                name
            );


        if (
          problems.length === 0
        ) {

          passed += 1;


          results.push({
            title:
              localArticle.title,

            localId,

            result:
              "✅ CORRECTO"
          });

        } else {

          failed += 1;


          results.push({
            title:
              localArticle.title,

            localId,

            result:
              `❌ DIFERENCIAS: ${problems.join(", ")}`
          });

        }

      }
    );


    /* -----------------------------------------------------
       CLOUD ARTICLES WITHOUT LOCAL MATCH
    ----------------------------------------------------- */

    const localIds =
      new Set(
        articles.map(
          (article) =>
            String(
              article.id
            )
        )
      );


    const unexpected =
      migratedCloudArticles.filter(
        (article) =>
          !localIds.has(
            String(
              article.legacy_local_id
            )
          )
      );


    /* -----------------------------------------------------
       CONSOLE REPORT
    ----------------------------------------------------- */

    console.table(
      results
    );


    console.log(
      "SPORTS JOURNAL — MIGRATION REPORT"
    );


    console.log(
      "Local:",
      articles.length
    );


    console.log(
      "Supabase migradas:",
      migratedCloudArticles.length
    );


    console.log(
      "Correctas:",
      passed
    );


    console.log(
      "Con problemas:",
      failed
    );


    console.log(
      "Filas extra:",
      unexpected.length
    );


    if (
      unexpected.length > 0
    ) {

      console.warn(
        "Artículos de Supabase sin correspondencia local:",
        unexpected
      );

    }


    /* -----------------------------------------------------
       FINAL RESULT
    ----------------------------------------------------- */

    const everythingCorrect =
      failed === 0 &&
      unexpected.length === 0 &&
      articles.length ===
        migratedCloudArticles.length;


    if (everythingCorrect) {

      console.log(
        "✅ SPORTS JOURNAL → MIGRACIÓN VERIFICADA."
      );


      showToast(
        `${passed} NOTICIAS VERIFICADAS ✓`
      );

    } else {

      console.warn(
        "⚠ SPORTS JOURNAL → La migración necesita revisión."
      );


      showToast(
        "LA MIGRACIÓN TIENE DIFERENCIAS."
      );

    }


    return {
      everythingCorrect,
      localCount:
        articles.length,
      cloudCount:
        migratedCloudArticles.length,
      passed,
      failed,
      unexpected,
      results
    };

  };

  /* =========================================================
   PASO 12.5 — SPORTS JOURNAL CLOUD MODE
   Supabase becomes the primary article source
========================================================= */

window.SPORTS_JOURNAL_CLOUD_MODE =
  true;


let sportsJournalCloudLoadSequence =
  0;


let sportsJournalCloudAnnounced =
  false;


/* =========================================================
   DATABASE ROW -> SPORTS JOURNAL ARTICLE
========================================================= */

function cloudArticleToSportsJournalArticle(
  row
) {

  const isArchived =
    row.status === "archived";


  const isReview =
    row.status === "review";


  /*
    Our current frontend understands:

    draft
    published
    archivedAt

    "review" will get its own UI in the next workflow step.
    For now we treat it as a non-public draft internally.
  */

  const frontendStatus =
    row.status === "draft" ||
    isReview

      ? "draft"
      : "published";


  return normalizeArticle({

    id:
      row.id,

    cloudId:
      row.id,

    legacyLocalId:
      row.legacy_local_id ||
      null,

    title:
      row.title ||
      "",

    sport:
      row.sport,

    author:
      row.author_name ||
      "SPORTS JOURNAL",

    authorId:
      row.author_id ||
      null,

    summary:
      row.summary ||
      "",

    content:
      row.content ||
      "",

    tags:
      Array.isArray(
        row.tags
      )
        ? row.tags
        : [],

    imageUrl:
      row.image_url ||
      "",

    imagePosition:
      row.image_position ||
      "50% 50%",

    imageZoom:
      row.image_zoom ??
      100,

    imageMode:
      row.image_mode === "full"
        ? "full"
        : "crop",

    status:
      frontendStatus,

    workflowStatus:
      isReview
        ? "review"
        : row.status,

    createdAt:
      row.created_at,

    updatedAt:
      row.updated_at,

    publishedAt:
      row.published_at,

    archivedAt:
      isArchived
        ? (
            row.archived_at ||
            row.updated_at ||
            row.created_at
          )
        : null,

    createdBy:
      row.created_by ||
      null,

    updatedBy:
      row.updated_by ||
      null

  });

}


/* =========================================================
   CLOUD SELECT
========================================================= */

async function loadSportsJournalArticlesFromCloud(
  options = {}
) {

  const {
    silent = false
  } = options;


  if (
    !window.sportsJournalDb
  ) {

    if (!silent) {

      showToast(
        "SUPABASE NO ESTÁ DISPONIBLE."
      );

    }


    return false;

  }


  const currentSequence =
    ++sportsJournalCloudLoadSequence;


  const {
    data,
    error
  } =
    await window
      .sportsJournalDb
      .from("articles")
      .select(`
        id,
        legacy_local_id,
        title,
        slug,
        sport,
        author_id,
        author_name,
        summary,
        content,
        tags,
        image_url,
        image_position,
        image_zoom,
        image_mode,
        status,
        created_by,
        updated_by,
        created_at,
        updated_at,
        published_at,
        archived_at
      `)
      .order(
        "created_at",
        {
          ascending: false
        }
      );


  /*
    A more recent request was started while
    this request was waiting.
  */

  if (
    currentSequence !==
    sportsJournalCloudLoadSequence
  ) {

    return false;

  }


  if (error) {

    console.error(
      "SPORTS JOURNAL → Error cargando artículos desde Supabase:",
      error
    );


    /*
      IMPORTANT:
      We do NOT empty articles.

      Current localStorage data remains available
      as an emergency fallback.
    */

    if (!silent) {

      showToast(
        "USANDO RESPALDO LOCAL · SUPABASE NO RESPONDIÓ."
      );

    }


    return false;

  }


  articles =
    data.map(
      cloudArticleToSportsJournalArticle
    );


  console.log(
    `SPORTS JOURNAL → ${articles.length} artículos cargados desde Supabase.`
  );


  refreshSportsJournalCloudViews();


  cacheSportsJournalCloudSnapshot();


  if (
    !silent &&
    !sportsJournalCloudAnnounced
  ) {

    sportsJournalCloudAnnounced =
      true;


    showToast(
      "MODO CLOUD ACTIVO ✓"
    );

  }


  return true;

}


/* =========================================================
   CLOUD CACHE
========================================================= */

function cacheSportsJournalCloudSnapshot() {

  /*
    Only admins/editors have a complete editorial view.

    We don't want a journalist's restricted dataset
    to overwrite a more complete local backup.
  */

  const role =
    sportsJournalAuth
      ?.profile
      ?.role;


  if (
    role !== "admin" &&
    role !== "editor"
  ) {

    return;

  }


  persistArticles();

}


/* =========================================================
   REFRESH ALL ARTICLE-DEPENDENT UI
========================================================= */

function refreshSportsJournalCloudViews() {

  renderCurrentView();

  updateManagementCounts();

  updateBackupStatus();


  if (
    draftsModal
      ?.classList
      .contains(
        "open"
      )
  ) {

    renderDraftsManager();

  }


  const archiveManager =
    document.getElementById(
      "archiveManagerModal"
    );


  if (
    archiveManager
      ?.classList
      .contains(
        "open"
      )
  ) {

    renderArchivedManager();

  }


  const adminDashboard =
    document.getElementById(
      "adminDashboardModal"
    );


  if (
    adminDashboard
      ?.classList
      .contains(
        "open"
      )
  ) {

    renderAdminDashboard();

  }


  const articleManager =
    document.getElementById(
      "adminArticleManagerModal"
    );


  if (
    articleManager
      ?.classList
      .contains(
        "open"
      )
  ) {

    renderAdminArticleManager();

  }

}


/* =========================================================
   REQUIRE AUTHENTICATION
========================================================= */

async function requireSportsJournalCloudUser() {

  const {
    data,
    error
  } =
    await window
      .sportsJournalDb
      .auth
      .getSession();


  if (
    error ||
    !data?.session
  ) {

    console.error(
      "SPORTS JOURNAL → No authenticated session.",
      error
    );


    openSportsJournalAuthModal(
      "login"
    );


    showToast(
      "INICIA SESIÓN PARA EDITAR EL DIARIO."
    );


    return null;

  }


  sportsJournalAuth.session =
    data.session;


  if (
    !sportsJournalAuth.profile
  ) {

    await loadSportsJournalProfile();

  }


  return data.session.user;

}


/* =========================================================
   DATABASE ERROR
========================================================= */

function showSportsJournalCloudError(
  action,
  error
) {

  console.error(
    `SPORTS JOURNAL → ${action}:`,
    error
  );


  if (
    error?.code === "42501"
  ) {

    showToast(
      "TU CUENTA NO TIENE PERMISO PARA ESA ACCIÓN."
    );


    return;

  }


  showToast(
    "NO SE PUDO GUARDAR EL CAMBIO EN SUPABASE."
  );

}


/* =========================================================
   SAVE ARTICLE — CLOUD VERSION
========================================================= */

saveArticle =
  async function (
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


    const user =
      await requireSportsJournalCloudUser();


    if (!user) {

      return;

    }


    const existingId =
      articleIdInput
        .value
        .trim();


    const existingArticle =
      existingId
        ? findArticle(
            existingId
          )
        : null;


    const now =
      new Date()
        .toISOString();


    /*
      Local safety snapshot before touching the cloud.
    */

    createInternalBackup(

      existingArticle

        ? "Antes de actualizar noticia en Supabase"

        : "Antes de crear noticia en Supabase"

    );


    let publishedAt =
      null;


    if (
      targetStatus === "published"
    ) {

      /*
        Editing a published or archived story
        keeps the original publication date.

        Publishing a draft gets a new publication date.
      */

      if (
        existingArticle &&
        (
          existingArticle.status === "published" ||
          existingArticle.archivedAt
        ) &&
        existingArticle.publishedAt
      ) {

        publishedAt =
          existingArticle.publishedAt;

      } else {

        publishedAt =
          now;

      }

    }


    const authorId =
      existingArticle
        ?.authorId ||
      user.id;


    const authorName =
      authorInput
        .value
        .trim() ||
      sportsJournalAuth
        ?.profile
        ?.display_name ||
      "SPORTS JOURNAL";


    const payload = {

      title:
        titleInput
          .value
          .trim(),

      sport:
        sportInput.value,

      author_id:
        authorId,

      author_name:
        authorName,

      summary:
        summaryInput
          .value
          .trim(),

      content:
        contentInput
          .value
          .trim(),

      tags:
        parseTagsInput(
          tagsInput.value
        ),

      image_url:
        imageUrlInput
          .value
          .trim(),

      image_position:
        `${focusXInput.value}% ${focusYInput.value}%`,

      image_zoom:
        Number(
          imageZoomInput.value
        ),

      image_mode:
        imageModeInput.value === "full"
          ? "full"
          : "crop",

      status:
        targetStatus,

      updated_by:
        user.id,

      published_at:
        publishedAt,

      archived_at:
        null

    };


    let response;


    /* -----------------------------------------------------
       UPDATE EXISTING ARTICLE
    ----------------------------------------------------- */

    if (
      existingArticle
    ) {

      response =
        await window
          .sportsJournalDb
          .from("articles")
          .update(
            payload
          )
          .eq(
            "id",
            existingArticle.id
          )
          .select(
            "id"
          )
          .single();

    }


    /* -----------------------------------------------------
       INSERT NEW ARTICLE
    ----------------------------------------------------- */

    else {

      response =
        await window
          .sportsJournalDb
          .from("articles")
          .insert({

            ...payload,

            author_id:
              user.id,

            created_by:
              user.id,

            legacy_local_id:
              null

          })
          .select(
            "id"
          )
          .single();

    }


    if (
      response.error
    ) {

      showSportsJournalCloudError(
        "Error guardando noticia",
        response.error
      );


      return;

    }


    /*
      Cloud write succeeded.
      Reload the canonical dataset.
    */

    await loadSportsJournalArticlesFromCloud({
      silent: true
    });


    createInternalBackup(
      targetStatus === "draft"
        ? "Después de guardar borrador en Supabase"
        : "Después de publicar noticia en Supabase"
    );


    moveDraftModal
      .classList
      .remove(
        "open"
      );


    moveDraftModal
      .setAttribute(
        "aria-hidden",
        "true"
      );


    editorHasUnsavedChanges =
      false;


    editorInitialState =
      "";


    closeEditorImmediately();


    showToast(

      targetStatus === "draft"

        ? (
            existingArticle
              ?.archivedAt

              ? "NOTICIA MOVIDA A BORRADOR ✓"

              : "BORRADOR GUARDADO EN LA NUBE ✓"
          )

        : (
            existingArticle

              ? (
                  existingArticle
                    .archivedAt

                    ? "NOTICIA REPUBLICADA ✓"

                    : "NOTICIA ACTUALIZADA ✓"
                )

              : "NOTICIA PUBLICADA ✓"
          )

    );

  };


/* =========================================================
   ARCHIVE — CLOUD VERSION
========================================================= */

confirmArchiveArticle =
  async function () {

    if (
      !pendingArchiveArticleId
    ) {

      return;

    }


    const articleId =
      pendingArchiveArticleId;


    const article =
      findArticle(
        articleId
      );


    if (!article) {

      closeArchiveConfirmation();

      return;

    }


    const user =
      await requireSportsJournalCloudUser();


    if (!user) {

      return;

    }


    createInternalBackup(
      "Antes de archivar noticia en Supabase"
    );


    const {
      error
    } =
      await window
        .sportsJournalDb
        .from("articles")
        .update({

          status:
            "archived",

          archived_at:
            new Date()
              .toISOString(),

          updated_by:
            user.id

        })
        .eq(
          "id",
          articleId
        );


    if (error) {

      showSportsJournalCloudError(
        "Error archivando noticia",
        error
      );


      return;

    }


    closeArchiveConfirmation();


    if (
      String(
        currentReaderArticleId
      ) ===
      String(
        articleId
      )
    ) {

      closeReader();

    }


    if (
      editorModal
        .classList
        .contains(
          "open"
        ) &&
      String(
        articleIdInput.value
      ) ===
      String(
        articleId
      )
    ) {

      editorHasUnsavedChanges =
        false;


      closeEditorImmediately();

    }


    await loadSportsJournalArticlesFromCloud({
      silent: true
    });


    createInternalBackup(
      "Después de archivar noticia en Supabase"
    );


    showToast(
      "NOTICIA ARCHIVADA ✓"
    );

  };


/* =========================================================
   REPUBLISH ARCHIVED — CLOUD VERSION
========================================================= */

republishArchivedArticle =
  async function (
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


    const user =
      await requireSportsJournalCloudUser();


    if (!user) {

      return;

    }


    createInternalBackup(
      "Antes de republicar noticia archivada"
    );


    const {
      error
    } =
      await window
        .sportsJournalDb
        .from("articles")
        .update({

          status:
            "published",

          archived_at:
            null,

          /*
            Keep published_at unchanged.
          */

          updated_by:
            user.id

        })
        .eq(
          "id",
          articleId
        );


    if (error) {

      showSportsJournalCloudError(
        "Error republicando noticia",
        error
      );


      return;

    }


    await loadSportsJournalArticlesFromCloud({
      silent: true
    });


    createInternalBackup(
      "Después de republicar noticia archivada"
    );


    showToast(
      "NOTICIA REPUBLICADA ✓"
    );

  };


/* =========================================================
   ARCHIVED -> DRAFT — CLOUD VERSION
========================================================= */

moveArchivedArticleToDraft =
  async function (
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


    const user =
      await requireSportsJournalCloudUser();


    if (!user) {

      return;

    }


    createInternalBackup(
      "Antes de mover archivada a borrador"
    );


    const {
      error
    } =
      await window
        .sportsJournalDb
        .from("articles")
        .update({

          status:
            "draft",

          archived_at:
            null,

          published_at:
            null,

          updated_by:
            user.id

        })
        .eq(
          "id",
          articleId
        );


    if (error) {

      showSportsJournalCloudError(
        "Error moviendo noticia a borrador",
        error
      );


      return;

    }


    await loadSportsJournalArticlesFromCloud({
      silent: true
    });


    createInternalBackup(
      "Después de mover archivada a borrador"
    );


    showToast(
      "NOTICIA MOVIDA A BORRADOR ✓"
    );

  };


/* =========================================================
   PUBLISH DRAFT FROM ADMIN — CLOUD VERSION
========================================================= */

publishDraftFromArticleManager =
  async function (
    articleId
  ) {

    const article =
      findArticle(
        articleId
      );


    if (
      !article ||
      article.status !== "draft" ||
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


    const user =
      await requireSportsJournalCloudUser();


    if (!user) {

      return;

    }


    createInternalBackup(
      "Antes de publicar borrador desde Admin"
    );


    const now =
      new Date()
        .toISOString();


    const {
      error
    } =
      await window
        .sportsJournalDb
        .from("articles")
        .update({

          status:
            "published",

          archived_at:
            null,

          published_at:
            now,

          updated_by:
            user.id

        })
        .eq(
          "id",
          articleId
        );


    if (error) {

      showSportsJournalCloudError(
        "Error publicando borrador",
        error
      );


      return;

    }


    await loadSportsJournalArticlesFromCloud({
      silent: true
    });


    createInternalBackup(
      "Después de publicar borrador desde Admin"
    );


    showToast(
      "NOTICIA PUBLICADA ✓"
    );

  };


/* =========================================================
   DELETE — CLOUD VERSION
========================================================= */

permanentlyDeleteArticle =
  async function () {

    if (
      !pendingDeleteArticleId
    ) {

      return;

    }


    const articleId =
      pendingDeleteArticleId;


    const user =
      await requireSportsJournalCloudUser();


    if (!user) {

      return;

    }


    createInternalBackup(
      "Antes de eliminar noticia de Supabase"
    );


    const {
      error
    } =
      await window
        .sportsJournalDb
        .from("articles")
        .delete()
        .eq(
          "id",
          articleId
        );


    if (error) {

      showSportsJournalCloudError(
        "Error eliminando noticia",
        error
      );


      return;

    }


    /*
      Close confirmation without depending
      on the deleted article still existing.
    */

    confirmModal
      .classList
      .remove(
        "open"
      );


    confirmModal
      .setAttribute(
        "aria-hidden",
        "true"
      );


    pendingDeleteArticleId =
      null;


    if (
      String(
        currentReaderArticleId
      ) ===
      String(
        articleId
      )
    ) {

      closeReader();

    }


    await loadSportsJournalArticlesFromCloud({
      silent: true
    });


    createInternalBackup(
      "Después de eliminar noticia de Supabase"
    );


    syncBodyScrollState();


    showToast(
      "NOTICIA ELIMINADA DE LA NUBE."
    );

  };


/* =========================================================
   RESTORE SAFETY DURING CLOUD TRANSITION
========================================================= */

/*
  Export continues working.

  Restore is temporarily blocked because restoring only
  localStorage would create a different version of the
  newspaper from PostgreSQL.

  We will make restore cloud-aware later.
*/

restoreBackupButton
  .addEventListener(
    "click",
    (event) => {

      if (
        !window
          .SPORTS_JOURNAL_CLOUD_MODE
      ) {

        return;

      }


      event.preventDefault();

      event.stopImmediatePropagation();


      showToast(
        "RESTAURAR EN CLOUD MODE SE ACTIVARÁ CON RESPALDOS DE BASE DE DATOS."
      );

    },
    true
  );


/* =========================================================
   AUTH -> CLOUD REFRESH
========================================================= */

window
  .sportsJournalDb
  .auth
  .onAuthStateChange(
    (
      event,
      session
    ) => {

      const eventsThatChangeVisibility = [
        "INITIAL_SESSION",
        "SIGNED_IN",
        "SIGNED_OUT",
        "USER_UPDATED"
      ];


      if (
        !eventsThatChangeVisibility
          .includes(
            event
          )
      ) {

        return;

      }


      /*
        Give the existing auth code a moment
        to update sportsJournalAuth.profile.
      */

      window.setTimeout(
        () => {

          loadSportsJournalArticlesFromCloud({
            silent: true
          });

        },
        150
      );

    }
  );


/* =========================================================
   INITIAL CLOUD BOOT
========================================================= */

window.setTimeout(
  () => {

    loadSportsJournalArticlesFromCloud({
      silent: false
    });

  },
  250
);

/* =========================================================
   PASO 12.6 — CLOUD BACKUP RESTORE
   Restaurar respaldos directamente en PostgreSQL
========================================================= */

let sportsJournalPendingCloudRestore =
  null;


/* =========================================================
   UUID CHECK
========================================================= */

function isSportsJournalUuid(value) {

  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    .test(
      String(
        value || ""
      )
    );

}


/* =========================================================
   CREATE CLOUD RESTORE INTERFACE
========================================================= */

function installSportsJournalCloudRestore() {

  if (
    document.getElementById(
      "cloudRestoreModal"
    )
  ) {

    return;

  }


  /* -------------------------------------------------------
     REPLACE OLD RESTORE BUTTON

     Esto elimina los listeners anteriores que bloqueaban
     Restore durante la transición a Cloud Mode.
  ------------------------------------------------------- */

  const oldRestoreButton =
    document.getElementById(
      "restoreBackupButton"
    );


  const cloudRestoreButton =
    oldRestoreButton.cloneNode(
      true
    );


  oldRestoreButton.replaceWith(
    cloudRestoreButton
  );


  /* -------------------------------------------------------
     REPLACE OLD FILE INPUT

     Así evitamos que se ejecute el restore antiguo
     basado solamente en localStorage.
  ------------------------------------------------------- */

  const oldBackupInput =
    document.getElementById(
      "backupFileInput"
    );


  const cloudBackupInput =
    oldBackupInput.cloneNode(
      true
    );


  oldBackupInput.replaceWith(
    cloudBackupInput
  );


  /* -------------------------------------------------------
     CREATE CLOUD RESTORE MODAL
  ------------------------------------------------------- */

  const modal =
    document.createElement(
      "div"
    );


  modal.id =
    "cloudRestoreModal";


  modal.className =
    "modal restore-modal";


  modal.setAttribute(
    "aria-hidden",
    "true"
  );


  modal.innerHTML = `
    <div
      class="modal-backdrop"
      data-close-cloud-restore
    ></div>

    <div
      class="restore-panel"
    >

      <span
        class="eyebrow"
      >
        RESPALDO CLOUD
      </span>

      <h2>
        ¿RESTAURAR DIARIO?
      </h2>


      <div
        class="restore-file-card"
      >

        <span>
          ARCHIVO
        </span>

        <strong
          id="cloudRestoreFileName"
        ></strong>

      </div>


      <div
        class="restore-stats"
      >

        <div>

          <span>
            RESPALDO
          </span>

          <strong
            id="cloudRestoreBackupCount"
          ></strong>

        </div>


        <div>

          <span>
            SUPABASE ACTUAL
          </span>

          <strong
            id="cloudRestoreCurrentCount"
          ></strong>

        </div>

      </div>


      <p
        class="restore-description"
      >
        COMBINAR conserva las noticias actuales
        y añade o actualiza las del respaldo.

        REEMPLAZAR elimina el contenido actual
        de la base de datos y restaura exactamente
        las noticias del archivo.
      </p>


      <div
        class="restore-actions"
      >

        <button
          class="secondary-button"
          type="button"
          data-close-cloud-restore
        >
          CANCELAR
        </button>


        <button
          class="merge-button"
          id="cloudMergeBackupButton"
          type="button"
        >
          COMBINAR
        </button>


        <button
          class="replace-button"
          id="cloudReplaceBackupButton"
          type="button"
        >
          REEMPLAZAR
        </button>

      </div>

    </div>
  `;


  document.body.appendChild(
    modal
  );


  /* -------------------------------------------------------
     OPEN FILE PICKER
  ------------------------------------------------------- */

  cloudRestoreButton.addEventListener(
    "click",
    async () => {

      const user =
        await requireSportsJournalCloudUser();


      if (!user) {

        return;

      }


      if (
        sportsJournalAuth
          ?.profile
          ?.role !== "admin"
      ) {

        showToast(
          "SOLO UN ADMIN PUEDE RESTAURAR EL DIARIO."
        );


        return;

      }


      closeSideMenu();


      cloudBackupInput.click();

    }
  );


  /* -------------------------------------------------------
     FILE SELECTED
  ------------------------------------------------------- */

  cloudBackupInput.addEventListener(
    "change",
    handleSportsJournalCloudBackupFile
  );


  /* -------------------------------------------------------
     CLOSE
  ------------------------------------------------------- */

  modal
    .querySelectorAll(
      "[data-close-cloud-restore]"
    )
    .forEach(
      (button) => {

        button.addEventListener(
          "click",
          closeSportsJournalCloudRestore
        );

      }
    );


  /* -------------------------------------------------------
     MERGE
  ------------------------------------------------------- */

  document
    .getElementById(
      "cloudMergeBackupButton"
    )
    .addEventListener(
      "click",
      () => {

        restoreSportsJournalCloudBackup(
          "merge"
        );

      }
    );


  /* -------------------------------------------------------
     REPLACE
  ------------------------------------------------------- */

  document
    .getElementById(
      "cloudReplaceBackupButton"
    )
    .addEventListener(
      "click",
      () => {

        restoreSportsJournalCloudBackup(
          "replace"
        );

      }
    );

}


/* =========================================================
   READ BACKUP FILE
========================================================= */

async function handleSportsJournalCloudBackupFile(
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


    const importedArticles =
      Array.isArray(parsed)

        ? parsed

        : parsed.articles;


    if (
      !Array.isArray(
        importedArticles
      )
    ) {

      throw new Error(
        "El archivo no contiene artículos válidos."
      );

    }


    const validArticles =
      importedArticles.filter(
        (article) =>
          article &&
          typeof article ===
            "object"
      );


    if (
      validArticles.length === 0
    ) {

      throw new Error(
        "El respaldo está vacío."
      );

    }


    sportsJournalPendingCloudRestore = {

      fileName:
        file.name,

      articles:
        validArticles

    };


    document
      .getElementById(
        "cloudRestoreFileName"
      )
      .textContent =
        file.name;


    document
      .getElementById(
        "cloudRestoreBackupCount"
      )
      .textContent =
        `${validArticles.length} ${
          validArticles.length === 1
            ? "NOTICIA"
            : "NOTICIAS"
        }`;


    document
      .getElementById(
        "cloudRestoreCurrentCount"
      )
      .textContent =
        `${articles.length} ${
          articles.length === 1
            ? "NOTICIA"
            : "NOTICIAS"
        }`;


    openSportsJournalCloudRestore();

  } catch (error) {

    console.error(
      "SPORTS JOURNAL → Respaldo inválido:",
      error
    );


    showToast(
      "EL ARCHIVO DE RESPALDO NO ES VÁLIDO."
    );

  }


  event.target.value =
    "";

}


/* =========================================================
   OPEN / CLOSE
========================================================= */

function openSportsJournalCloudRestore() {

  const modal =
    document.getElementById(
      "cloudRestoreModal"
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


function closeSportsJournalCloudRestore() {

  const modal =
    document.getElementById(
      "cloudRestoreModal"
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


  sportsJournalPendingCloudRestore =
    null;


  syncBodyScrollState();

}


/* =========================================================
   BACKUP ARTICLE -> POSTGRES ROW
========================================================= */

function sportsJournalBackupArticleToCloudRow(
  article,
  userId
) {

  const workflowStatus =
    article.workflowStatus ||
    article.status;


  let databaseStatus =
    "published";


  if (
    article.archivedAt ||
    article.archived_at ||
    workflowStatus === "archived"
  ) {

    databaseStatus =
      "archived";

  } else if (
    workflowStatus === "review"
  ) {

    databaseStatus =
      "review";

  } else if (
    article.status === "draft" ||
    workflowStatus === "draft"
  ) {

    databaseStatus =
      "draft";

  }


  const articleId =
    article.cloudId ||
    article.id;


  const hasCloudId =
    isSportsJournalUuid(
      articleId
    );


  const legacyId =
    article.legacyLocalId ||
    article.legacy_local_id ||
    (
      !hasCloudId &&
      article.id

        ? String(
            article.id
          )

        : null
    );


  const createdAt =
    article.createdAt ||
    article.created_at ||
    new Date()
      .toISOString();


  const updatedAt =
    article.updatedAt ||
    article.updated_at ||
    createdAt;


  let publishedAt =
    article.publishedAt ||
    article.published_at ||
    null;


  if (
    (
      databaseStatus === "published" ||
      databaseStatus === "archived"
    ) &&
    !publishedAt
  ) {

    publishedAt =
      createdAt;

  }


  if (
    databaseStatus === "draft" ||
    databaseStatus === "review"
  ) {

    publishedAt =
      null;

  }


  const archivedAt =
    databaseStatus === "archived"

      ? (
          article.archivedAt ||
          article.archived_at ||
          updatedAt
        )

      : null;


  const authorId =
    isSportsJournalUuid(
      article.authorId ||
      article.author_id
    )

      ? (
          article.authorId ||
          article.author_id
        )

      : userId;


  const createdBy =
    isSportsJournalUuid(
      article.createdBy ||
      article.created_by
    )

      ? (
          article.createdBy ||
          article.created_by
        )

      : userId;


  const updatedBy =
    isSportsJournalUuid(
      article.updatedBy ||
      article.updated_by
    )

      ? (
          article.updatedBy ||
          article.updated_by
        )

      : userId;


  const row = {

    title:
      String(
        article.title ||
        ""
      ),

    sport:
      article.sport,

    author_id:
      authorId,

    author_name:
      String(
        article.author ||
        article.author_name ||
        sportsJournalAuth
          ?.profile
          ?.display_name ||
        "SPORTS JOURNAL"
      ),

    summary:
      String(
        article.summary ||
        ""
      ),

    content:
      String(
        article.content ||
        ""
      ),

    tags:
      normalizeTags(
        article.tags
      ),

    image_url:
      String(
        article.imageUrl ||
        article.image_url ||
        ""
      ),

    image_position:
      String(
        article.imagePosition ||
        article.image_position ||
        "50% 50%"
      ),

    image_zoom:
      normalizeZoom(
        article.imageZoom ??
        article.image_zoom
      ),

    image_mode:
      (
        article.imageMode ||
        article.image_mode
      ) === "full"

        ? "full"

        : "crop",

    status:
      databaseStatus,

    created_by:
      createdBy,

    updated_by:
      updatedBy,

    created_at:
      createdAt,

    updated_at:
      updatedAt,

    published_at:
      publishedAt,

    archived_at:
      archivedAt,

    legacy_local_id:
      legacyId

  };


  /*
    Articles that were born in Supabase
    already have a real UUID.

    Legacy articles use legacy_local_id
    instead so the unique constraint prevents
    duplication.
  */

  if (
    hasCloudId &&
    !legacyId
  ) {

    row.id =
      articleId;

  }


  return row;

}


/* =========================================================
   UPSERT CLOUD BACKUP
========================================================= */

async function upsertSportsJournalBackupRows(
  backupArticles,
  userId
) {

  const legacyRows =
    [];


  const cloudRows =
    [];


  backupArticles.forEach(
    (article) => {

      const row =
        sportsJournalBackupArticleToCloudRow(
          article,
          userId
        );


      if (
        row.legacy_local_id
      ) {

        /*
          Do not send a possibly stale cloud id when
          legacy_local_id is the canonical conflict key.
        */

        delete row.id;


        legacyRows.push(
          row
        );

      } else {

        cloudRows.push(
          row
        );

      }

    }
  );


  /* -------------------------------------------------------
     LEGACY UPSERT
  ------------------------------------------------------- */

  if (
    legacyRows.length > 0
  ) {

    const {
      error
    } =
      await window
        .sportsJournalDb
        .from(
          "articles"
        )
        .upsert(
          legacyRows,
          {
            onConflict:
              "legacy_local_id"
          }
        );


    if (error) {

      throw error;

    }

  }


  /* -------------------------------------------------------
     CLOUD-ID UPSERT
  ------------------------------------------------------- */

  if (
    cloudRows.length > 0
  ) {

    const {
      error
    } =
      await window
        .sportsJournalDb
        .from(
          "articles"
        )
        .upsert(
          cloudRows,
          {
            onConflict:
              "id"
          }
        );


    if (error) {

      throw error;

    }

  }


  return (
    legacyRows.length +
    cloudRows.length
  );

}


/* =========================================================
   RESTORE
========================================================= */

async function restoreSportsJournalCloudBackup(
  mode
) {

  if (
    !sportsJournalPendingCloudRestore
  ) {

    return;

  }


  const user =
    await requireSportsJournalCloudUser();


  if (!user) {

    return;

  }


  if (
    sportsJournalAuth
      ?.profile
      ?.role !== "admin"
  ) {

    showToast(
      "SOLO UN ADMIN PUEDE RESTAURAR EL DIARIO."
    );


    return;

  }


  const backup =
    sportsJournalPendingCloudRestore;


  /*
    Keep a local emergency copy before touching
    PostgreSQL.
  */

  createInternalBackup(
    mode === "replace"

      ? "Antes de reemplazar base de datos desde respaldo"

      : "Antes de combinar respaldo con base de datos"
  );


  try {

    /* -----------------------------------------------------
       REPLACE:
       delete current database rows first
    ----------------------------------------------------- */

    if (
      mode === "replace"
    ) {

      const {
        error: deleteError
      } =
        await window
          .sportsJournalDb
          .from(
            "articles"
          )
          .delete()
          .gte(
            "created_at",
            "1900-01-01T00:00:00.000Z"
          );


      if (
        deleteError
      ) {

        throw deleteError;

      }

    }


    /* -----------------------------------------------------
       RESTORE ROWS
    ----------------------------------------------------- */

    const restoredCount =
      await upsertSportsJournalBackupRows(
        backup.articles,
        user.id
      );


    /* -----------------------------------------------------
       LOAD CANONICAL DATABASE STATE
    ----------------------------------------------------- */

    await loadSportsJournalArticlesFromCloud({
      silent: true
    });


    createInternalBackup(
      mode === "replace"

        ? "Después de reemplazar base de datos desde respaldo"

        : "Después de combinar respaldo con base de datos"
    );


    closeSportsJournalCloudRestore();


    showToast(
      `${restoredCount} ${
        restoredCount === 1
          ? "NOTICIA RESTAURADA"
          : "NOTICIAS RESTAURADAS"
      } ✓`
    );


    console.log(
      `SPORTS JOURNAL → Restore Cloud completado (${mode}).`
    );

  } catch (error) {

    console.error(
      "SPORTS JOURNAL → Error restaurando respaldo Cloud:",
      error
    );


    showSportsJournalCloudError(
      "Error restaurando respaldo",
      error
    );

  }

}


/* =========================================================
   BODY SCROLL
========================================================= */

const step126BaseSyncBodyScrollState =
  syncBodyScrollState;


syncBodyScrollState =
  function () {

    step126BaseSyncBodyScrollState();


    const cloudRestore =
      document.getElementById(
        "cloudRestoreModal"
      );


    if (
      cloudRestore
        ?.classList
        .contains(
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


    const cloudRestore =
      document.getElementById(
        "cloudRestoreModal"
      );


    if (
      cloudRestore
        ?.classList
        .contains(
          "open"
        )
    ) {

      closeSportsJournalCloudRestore();

    }

  }
);


/* =========================================================
   INSTALL
========================================================= */

installSportsJournalCloudRestore();

/* =========================================================
   FIX — ACTIVAR RESTAURACIÓN CLOUD
   Elimina definitivamente el bloqueo temporal del Paso 12.5
========================================================= */

function repairSportsJournalCloudRestoreButton() {

  /*
    Aseguramos primero que la interfaz Cloud exista.
  */

  if (
    !document.getElementById(
      "cloudRestoreModal"
    )
  ) {

    installSportsJournalCloudRestore();

  }


  /* =======================================================
     REEMPLAZAR BOTÓN

     cloneNode elimina todos los event listeners antiguos,
     incluido el bloqueo temporal de Cloud Mode.
  ======================================================= */

  const currentRestoreButton =
    document.getElementById(
      "restoreBackupButton"
    );


  const cleanRestoreButton =
    currentRestoreButton.cloneNode(
      true
    );


  currentRestoreButton.replaceWith(
    cleanRestoreButton
  );


  /* =======================================================
     REEMPLAZAR INPUT

     También eliminamos cualquier listener antiguo
     de restauración local.
  ======================================================= */

  const currentBackupInput =
    document.getElementById(
      "backupFileInput"
    );


  const cleanBackupInput =
    currentBackupInput.cloneNode(
      true
    );


  currentBackupInput.replaceWith(
    cleanBackupInput
  );


  /* =======================================================
     BOTÓN → ABRIR JSON
  ======================================================= */

  cleanRestoreButton.addEventListener(
    "click",
    async () => {

      const user =
        await requireSportsJournalCloudUser();


      if (!user) {

        return;

      }


      if (
        sportsJournalAuth
          ?.profile
          ?.role !== "admin"
      ) {

        showToast(
          "SOLO UN ADMIN PUEDE RESTAURAR EL DIARIO."
        );

        return;

      }


      closeSideMenu();


      cleanBackupInput.click();

    }
  );


  /* =======================================================
     JSON SELECCIONADO
  ======================================================= */

  cleanBackupInput.addEventListener(
    "change",
    handleSportsJournalCloudBackupFile
  );


  console.log(
    "SPORTS JOURNAL → Restauración Cloud activada ✓"
  );

}


/* =========================================================
   EJECUTAR FIX
========================================================= */

repairSportsJournalCloudRestoreButton();

/* =========================================================
   PASO 13.2 — MULTIUSER EDITORIAL WORKFLOW
   ADMIN / EDITOR / JOURNALIST
   DRAFT → REVIEW → PUBLISHED
========================================================= */


/* =========================================================
   ROLE HELPERS
========================================================= */

function getSportsJournalRole() {

  return (
    sportsJournalAuth
      ?.profile
      ?.role ||
    null
  );

}


function isSportsJournalAdmin() {

  return (
    getSportsJournalRole() ===
    "admin"
  );

}


function isSportsJournalEditor() {

  return (
    getSportsJournalRole() ===
    "editor"
  );

}


function isSportsJournalJournalist() {

  return (
    getSportsJournalRole() ===
    "journalist"
  );

}


function canSportsJournalPublish() {

  return (
    isSportsJournalAdmin() ||
    isSportsJournalEditor()
  );

}


/* =========================================================
   REVIEW COLLECTION
========================================================= */

function getReviewArticles() {

  return articles
    .filter(
      (article) =>
        article.workflowStatus ===
          "review"
    )
    .sort(
      (a, b) =>
        getArticleActivityTime(b) -
        getArticleActivityTime(a)
    );

}


/* =========================================================
   DRAFTS SHOULD NOT INCLUDE REVIEW
========================================================= */

const step132BaseGetDraftArticles =
  getDraftArticles;


getDraftArticles =
  function () {

    return step132BaseGetDraftArticles()
      .filter(
        (article) =>
          article.workflowStatus !==
          "review"
      );

  };


/* =========================================================
   ADMIN ARTICLE STATE
========================================================= */

const step132BaseGetAdminArticleState =
  getAdminArticleState;


getAdminArticleState =
  function (
    article
  ) {

    if (
      article.workflowStatus ===
      "review"
    ) {

      return "review";

    }


    return step132BaseGetAdminArticleState(
      article
    );

  };


const step132BaseGetAdminArticleStateLabel =
  getAdminArticleStateLabel;


getAdminArticleStateLabel =
  function (
    article
  ) {

    if (
      article.workflowStatus ===
      "review"
    ) {

      return "EN REVISIÓN";

    }


    return step132BaseGetAdminArticleStateLabel(
      article
    );

  };


/* =========================================================
   ADD REVIEW OPTION TO CENTRAL MANAGER
========================================================= */

function installReviewFilterOption() {

  const select =
    document.getElementById(
      "articleManagerStatus"
    );


  if (
    !select ||
    select.querySelector(
      'option[value="review"]'
    )
  ) {

    return;

  }


  const option =
    document.createElement(
      "option"
    );


  option.value =
    "review";


  option.textContent =
    "EN REVISIÓN";


  const archivedOption =
    select.querySelector(
      'option[value="archived"]'
    );


  select.insertBefore(
    option,
    archivedOption
  );

}


/* =========================================================
   CREATE REVIEW MANAGER
========================================================= */

function createSportsJournalReviewInterface() {

  if (
    document.getElementById(
      "reviewManagerModal"
    )
  ) {

    return;

  }


  /* -------------------------------------------------------
     MENU BUTTON
  ------------------------------------------------------- */

  const reviewButton =
    document.createElement(
      "button"
    );


  reviewButton.id =
    "reviewMenuButton";


  reviewButton.type =
    "button";


  reviewButton.className =
    "journal-menu-button";


  reviewButton.innerHTML = `
    <span>
      EN REVISIÓN
    </span>

    <span
      class="menu-count"
      id="reviewCount"
    >
      0
    </span>
  `;


  draftsMenuButton.insertAdjacentElement(
    "afterend",
    reviewButton
  );


  reviewButton.addEventListener(
    "click",
    () => {

      closeSideMenu();

      openSportsJournalReviewManager();

    }
  );


  /* -------------------------------------------------------
     REVIEW MODAL
  ------------------------------------------------------- */

  const modal =
    document.createElement(
      "div"
    );


  modal.id =
    "reviewManagerModal";


  modal.className =
    "modal review-manager-modal";


  modal.setAttribute(
    "aria-hidden",
    "true"
  );


  modal.innerHTML = `
    <div
      class="modal-backdrop"
      data-close-review-manager
    ></div>

    <section
      class="review-manager-panel"
      aria-label="Noticias en revisión"
    >

      <header
        class="review-manager-header"
      >

        <div>

          <span
            class="eyebrow"
          >
            SPORTS JOURNAL · REDACCIÓN
          </span>

          <h2
            id="reviewManagerHeading"
          >
            EN REVISIÓN
          </h2>

        </div>


        <button
          class="close-button"
          type="button"
          data-close-review-manager
          aria-label="Cerrar"
        >
          ×
        </button>

      </header>


      <div
        class="review-manager-list"
        id="reviewManagerList"
      ></div>

    </section>
  `;


  document.body.appendChild(
    modal
  );


  modal
    .querySelectorAll(
      "[data-close-review-manager]"
    )
    .forEach(
      (button) => {

        button.addEventListener(
          "click",
          closeSportsJournalReviewManager
        );

      }
    );

}


/* =========================================================
   OPEN / CLOSE REVIEW
========================================================= */

function openSportsJournalReviewManager() {

  renderSportsJournalReviewManager();


  const modal =
    document.getElementById(
      "reviewManagerModal"
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


function closeSportsJournalReviewManager() {

  const modal =
    document.getElementById(
      "reviewManagerModal"
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
   RENDER REVIEW MANAGER
========================================================= */

function renderSportsJournalReviewManager() {

  const container =
    document.getElementById(
      "reviewManagerList"
    );


  const heading =
    document.getElementById(
      "reviewManagerHeading"
    );


  if (
    !container ||
    !heading
  ) {

    return;

  }


  const reviews =
    getReviewArticles();


  heading.textContent =
    isSportsJournalJournalist()
      ? "MIS NOTICIAS EN REVISIÓN"
      : "COLA DE REVISIÓN";


  container.innerHTML =
    "";


  if (
    reviews.length === 0
  ) {

    container.innerHTML = `
      <div
        class="review-manager-empty"
      >

        <strong>
          SIN NOTICIAS
        </strong>

        <p>
          ${
            isSportsJournalJournalist()

              ? "Todavía no tienes noticias enviadas a revisión."

              : "La redacción no tiene noticias pendientes de revisión."
          }
        </p>

      </div>
    `;


    return;

  }


  reviews.forEach(
    (article, index) => {

      container.appendChild(
        createSportsJournalReviewCard(
          article,
          index
        )
      );

    }
  );

}


/* =========================================================
   REVIEW CARD
========================================================= */

function createSportsJournalReviewCard(
  article,
  index
) {

  const card =
    document.createElement(
      "article"
    );


  card.className =
    "review-story-card";


  /* NUMBER */

  const number =
    document.createElement(
      "div"
    );


  number.className =
    "review-story-number";


  number.textContent =
    String(
      index + 1
    ).padStart(
      2,
      "0"
    );


  /* COPY */

  const copy =
    document.createElement(
      "div"
    );


  copy.className =
    "review-story-copy";


  const state =
    document.createElement(
      "div"
    );


  state.className =
    "review-story-state";


  state.textContent =
    "EN REVISIÓN";


  const sport =
    document.createElement(
      "div"
    );


  sport.className =
    "review-story-sport";


  sport.textContent =
    getSportLabel(
      article.sport
    );


  const title =
    document.createElement(
      "h3"
    );


  title.className =
    "review-story-title";


  title.textContent =
    article.title ||
    "NOTICIA SIN TÍTULO";


  const summary =
    document.createElement(
      "p"
    );


  summary.className =
    "review-story-summary";


  summary.textContent =
    article.summary ||
    "";


  const meta =
    document.createElement(
      "div"
    );


  meta.className =
    "review-story-meta";


  meta.textContent =
    `${article.author} · ENVIADA ${formatEditorDateTime(
      article.updatedAt ||
      article.createdAt
    )}`;


  copy.append(
    state,
    sport,
    title,
    summary,
    meta
  );


  /* ACTIONS */

  const actions =
    document.createElement(
      "div"
    );


  actions.className =
    "review-story-actions";


  const editButton =
    createReviewActionButton(
      canSportsJournalPublish()
        ? "REVISAR"
        : "EDITAR",
      "primary"
    );


  editButton.addEventListener(
    "click",
    () => {

      closeSportsJournalReviewManager();


      openEditor(
        article.id
      );

    }
  );


  actions.appendChild(
    editButton
  );


  if (
    canSportsJournalPublish()
  ) {

    const publishButton =
      createReviewActionButton(
        "PUBLICAR",
        "publish"
      );


    publishButton.addEventListener(
      "click",
      () => {

        publishSportsJournalReview(
          article.id
        );

      }
    );


    const returnButton =
      createReviewActionButton(
        "DEVOLVER",
        ""
      );


    returnButton.addEventListener(
      "click",
      () => {

        returnSportsJournalReviewToDraft(
          article.id
        );

      }
    );


    actions.append(
      publishButton,
      returnButton
    );

  } else {

    const withdrawButton =
      createReviewActionButton(
        "RETIRAR",
        ""
      );


    withdrawButton.addEventListener(
      "click",
      () => {

        returnSportsJournalReviewToDraft(
          article.id
        );

      }
    );


    actions.appendChild(
      withdrawButton
    );

  }


  card.append(
    number,
    copy,
    actions
  );


  return card;

}


/* =========================================================
   REVIEW ACTION BUTTON
========================================================= */

function createReviewActionButton(
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
    `review-action-button ${modifier}`.trim();


  button.textContent =
    text;


  return button;

}


/* =========================================================
   PUBLISH REVIEW
========================================================= */

async function publishSportsJournalReview(
  articleId
) {

  if (
    !canSportsJournalPublish()
  ) {

    showToast(
      "TU CUENTA NO PUEDE PUBLICAR NOTICIAS."
    );


    return;

  }


  const user =
    await requireSportsJournalCloudUser();


  if (!user) {

    return;

  }


  const article =
    findArticle(
      articleId
    );


  if (
    !article ||
    article.workflowStatus !==
      "review"
  ) {

    return;

  }


  createInternalBackup(
    "Antes de publicar noticia en revisión"
  );


  const now =
    new Date()
      .toISOString();


  const {
    error
  } =
    await window
      .sportsJournalDb
      .from("articles")
      .update({

        status:
          "published",

        published_at:
          article.publishedAt ||
          now,

        archived_at:
          null,

        updated_by:
          user.id

      })
      .eq(
        "id",
        articleId
      );


  if (error) {

    showSportsJournalCloudError(
      "Error publicando revisión",
      error
    );


    return;

  }


  await loadSportsJournalArticlesFromCloud({
    silent: true
  });


  createInternalBackup(
    "Después de publicar noticia revisada"
  );


  renderSportsJournalReviewManager();

  updateManagementCounts();


  showToast(
    "NOTICIA APROBADA Y PUBLICADA ✓"
  );

}


/* =========================================================
   REVIEW -> DRAFT
========================================================= */

async function returnSportsJournalReviewToDraft(
  articleId
) {

  const user =
    await requireSportsJournalCloudUser();


  if (!user) {

    return;

  }


  const article =
    findArticle(
      articleId
    );


  if (
    !article ||
    article.workflowStatus !==
      "review"
  ) {

    return;

  }


  /*
    Journalist can only withdraw their own article.

    PostgreSQL also enforces this with RLS.
  */

  if (
    isSportsJournalJournalist() &&
    String(
      article.authorId
    ) !==
    String(
      user.id
    )
  ) {

    showToast(
      "NO PUEDES MODIFICAR ESTA NOTICIA."
    );


    return;

  }


  createInternalBackup(
    "Antes de devolver revisión a borrador"
  );


  const {
    error
  } =
    await window
      .sportsJournalDb
      .from("articles")
      .update({

        status:
          "draft",

        published_at:
          null,

        archived_at:
          null,

        updated_by:
          user.id

      })
      .eq(
        "id",
        articleId
      );


  if (error) {

    showSportsJournalCloudError(
      "Error devolviendo revisión",
      error
    );


    return;

  }


  await loadSportsJournalArticlesFromCloud({
    silent: true
  });


  createInternalBackup(
    "Después de devolver revisión a borrador"
  );


  renderSportsJournalReviewManager();

  updateManagementCounts();


  showToast(
    isSportsJournalJournalist()
      ? "NOTICIA RETIRADA A BORRADORES."
      : "NOTICIA DEVUELTA A BORRADORES."
  );

}


/* =========================================================
   SAVE ARTICLE ROLE RULES
========================================================= */

const step132BaseSaveArticle =
  saveArticle;


saveArticle =
  async function (
    requestedStatus
  ) {

    let targetStatus =
      requestedStatus;


    /*
      Journalist pressing the normal Publish button
      actually submits to editorial review.
    */

    if (
      isSportsJournalJournalist() &&
      requestedStatus ===
        "published"
    ) {

      targetStatus =
        "review";

    }


    /*
      Review requires a complete article,
      just like publication.
    */

    if (
      targetStatus ===
        "review" &&
      !articleForm.reportValidity()
    ) {

      showToast(
        "COMPLETA LA NOTICIA ANTES DE ENVIARLA A REVISIÓN."
      );


      return;

    }


    /*
      Journalist name comes from their real profile,
      not an arbitrary author field.
    */

    if (
      isSportsJournalJournalist() &&
      sportsJournalAuth
        ?.profile
        ?.display_name
    ) {

      authorInput.value =
        sportsJournalAuth
          .profile
          .display_name;

    }


    return step132BaseSaveArticle(
      targetStatus
    );

  };


/* =========================================================
   EDITOR LABELS
========================================================= */

const step132BaseUpdateEditorActionLabels =
  updateEditorActionLabels;


updateEditorActionLabels =
  function (
    article
  ) {

    step132BaseUpdateEditorActionLabels(
      article
    );


    editorStatusValue
      .classList
      .remove(
        "review"
      );


    /* -----------------------------------------------------
       REVIEW ARTICLE
    ----------------------------------------------------- */

    if (
      article
        ?.workflowStatus ===
        "review"
    ) {

      editorStatusValue
        .classList
        .remove(
          "draft",
          "published",
          "archived"
        );


      editorStatusValue
        .classList
        .add(
          "review"
        );


      editorStatusValue.textContent =
        "EN REVISIÓN";


      if (
        canSportsJournalPublish()
      ) {

        saveDraftButtonText.textContent =
          "DEVOLVER A BORRADOR";


        publishButtonText.textContent =
          "PUBLICAR NOTICIA";

      } else {

        saveDraftButtonText.textContent =
          "RETIRAR A BORRADOR";


        publishButtonText.textContent =
          "GUARDAR REVISIÓN";

      }

    }


    /* -----------------------------------------------------
       JOURNALIST DRAFT
    ----------------------------------------------------- */

    else if (
      isSportsJournalJournalist()
    ) {

      publishButtonText.textContent =
        "ENVIAR A REVISIÓN";

    }


    /* -----------------------------------------------------
       JOURNALISTS NEVER ARCHIVE FROM EDITOR
    ----------------------------------------------------- */

    const archiveButton =
      document.getElementById(
        "archiveEditorButton"
      );


    if (
      archiveButton &&
      isSportsJournalJournalist()
    ) {

      archiveButton.hidden =
        true;

    }

  };


/* =========================================================
   OPEN EDITOR ROLE RULES
========================================================= */

const step132BaseOpenEditor =
  openEditor;


openEditor =
  function (
    articleId = null
  ) {

    const role =
      getSportsJournalRole();


    const article =
      articleId
        ? findArticle(
            articleId
          )
        : null;


    /*
      Journalist may only edit:

      - new article
      - own draft
      - own review
    */

    if (
      role === "journalist" &&
      article
    ) {

      const userId =
        sportsJournalAuth
          ?.session
          ?.user
          ?.id;


      const state =
        article.workflowStatus ||
        article.status;


      const ownArticle =
        String(
          article.authorId
        ) ===
        String(
          userId
        );


      const editableState =
        state === "draft" ||
        state === "review";


      if (
        !ownArticle ||
        !editableState
      ) {

        showToast(
          "ESTA NOTICIA YA NO PUEDE SER EDITADA POR EL PERIODISTA."
        );


        return;

      }

    }


    step132BaseOpenEditor(
      articleId
    );


    /*
      Lock journalist identity.
    */

    if (
      role === "journalist"
    ) {

      authorInput.value =
        sportsJournalAuth
          ?.profile
          ?.display_name ||
        authorInput.value;


      authorInput.disabled =
        true;

    } else {

      authorInput.disabled =
        false;

    }


    const currentArticle =
      articleId
        ? findArticle(
            articleId
          )
        : null;


    updateEditorActionLabels(
      currentArticle
    );

  };


/* =========================================================
   REVIEW COUNT
========================================================= */

const step132BaseUpdateManagementCounts =
  updateManagementCounts;


updateManagementCounts =
  function () {

    step132BaseUpdateManagementCounts();


    const reviewCount =
      document.getElementById(
        "reviewCount"
      );


    if (
      reviewCount
    ) {

      reviewCount.textContent =
        getReviewArticles()
          .length;

    }

  };


/* =========================================================
   ROLE UI
========================================================= */

function syncSportsJournalRoleInterface() {

  document.body
    .classList
    .remove(
      "sj-role-admin",
      "sj-role-editor",
      "sj-role-journalist"
    );


  if (
    !sportsJournalAuth
      ?.session
  ) {

    return;

  }


  const role =
    getSportsJournalRole();


  if (role) {

    document.body
      .classList
      .add(
        `sj-role-${role}`
      );

  }


  /*
    Backups are intentionally ADMIN-only.
  */

  const dataBlock =
    document.querySelector(
      ".data-block"
    );


  if (
    dataBlock
  ) {

    dataBlock.hidden =
      role !== "admin";

  }


  updateManagementCounts();

}


/* =========================================================
   PATCH AUTH UI
========================================================= */

const step132BaseSyncSportsJournalAuthUi =
  syncSportsJournalAuthUi;


syncSportsJournalAuthUi =
  function () {

    step132BaseSyncSportsJournalAuthUi();


    syncSportsJournalRoleInterface();

  };


/* =========================================================
   REVIEW MANAGER + BODY SCROLL
========================================================= */

const step132BaseSyncBodyScrollState =
  syncBodyScrollState;


syncBodyScrollState =
  function () {

    step132BaseSyncBodyScrollState();


    const reviewModal =
      document.getElementById(
        "reviewManagerModal"
      );


    if (
      reviewModal
        ?.classList
        .contains(
          "open"
        )
    ) {

      document.body
        .classList
        .add(
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
      event.key !==
      "Escape"
    ) {

      return;

    }


    const reviewModal =
      document.getElementById(
        "reviewManagerModal"
      );


    if (
      reviewModal
        ?.classList
        .contains(
          "open"
        )
    ) {

      closeSportsJournalReviewManager();

    }

  }
);


/* =========================================================
   INSTALL
========================================================= */

createSportsJournalReviewInterface();

installReviewFilterOption();

syncSportsJournalRoleInterface();

updateManagementCounts();

/* =========================================================
   PASO 13.3 — PANEL PERSONAL DEL PERIODISTA
========================================================= */

let journalistDashboardFilter =
  "all";


let journalistDashboardSearch =
  "";


/* =========================================================
   CURRENT JOURNALIST ARTICLES
========================================================= */

function getCurrentJournalistArticles() {

  const userId =
    sportsJournalAuth
      ?.session
      ?.user
      ?.id;


  if (!userId) {

    return [];

  }


  return articles
    .filter(
      (article) =>
        String(
          article.authorId
        ) ===
        String(
          userId
        )
    )
    .sort(
      (a, b) =>
        getArticleActivityTime(b) -
        getArticleActivityTime(a)
    );

}


/* =========================================================
   ARTICLE STATE
========================================================= */

function getJournalistArticleState(
  article
) {

  if (
    article.archivedAt ||
    article.workflowStatus ===
      "archived"
  ) {

    return "archived";

  }


  if (
    article.workflowStatus ===
      "review"
  ) {

    return "review";

  }


  if (
    article.status ===
      "draft"
  ) {

    return "draft";

  }


  return "published";

}


function getJournalistArticleStateLabel(
  article
) {

  const state =
    getJournalistArticleState(
      article
    );


  if (
    state === "review"
  ) {

    return "EN REVISIÓN";

  }


  if (
    state === "draft"
  ) {

    return "BORRADOR";

  }


  if (
    state === "archived"
  ) {

    return "ARCHIVADA";

  }


  return "PUBLICADA";

}


/* =========================================================
   CREATE INTERFACE
========================================================= */

function createJournalistDashboardInterface() {

  if (
    document.getElementById(
      "journalistDashboardModal"
    )
  ) {

    return;

  }


  /* -------------------------------------------------------
     MENU BUTTON
  ------------------------------------------------------- */

  const menuButton =
    document.createElement(
      "button"
    );


  menuButton.id =
    "journalistDashboardMenuButton";


  menuButton.type =
    "button";


  menuButton.className =
    "journal-menu-button";


  menuButton.innerHTML = `
    <span>
      MI PANEL
    </span>

    <span>
      →
    </span>
  `;


  const authButton =
    document.getElementById(
      "authMenuButton"
    );


  authButton.insertAdjacentElement(
    "afterend",
    menuButton
  );


  menuButton.addEventListener(
    "click",
    openJournalistDashboard
  );


  /* -------------------------------------------------------
     MODAL
  ------------------------------------------------------- */

  const modal =
    document.createElement(
      "div"
    );


  modal.id =
    "journalistDashboardModal";


  modal.className =
    "modal journalist-dashboard-modal";


  modal.setAttribute(
    "aria-hidden",
    "true"
  );


  modal.innerHTML = `
    <section
      class="journalist-dashboard-panel"
      aria-label="Panel personal del periodista"
    >

      <header
        class="journalist-dashboard-header"
      >

        <div>

          <span
            class="journalist-dashboard-eyebrow"
          >
            SPORTS JOURNAL · REDACCIÓN
          </span>

          <h2>
            MI PANEL
          </h2>

        </div>


        <button
          class="close-button journalist-dashboard-close"
          id="closeJournalistDashboardButton"
          type="button"
          aria-label="Cerrar panel"
        >
          ×
        </button>

      </header>


      <div
        class="journalist-dashboard-body"
      >

        <!-- PROFILE -->

        <section
          class="journalist-dashboard-profile"
        >

          <div>

            <span
              class="journalist-dashboard-profile-label"
            >
              PERIODISTA
            </span>

            <h3
              class="journalist-dashboard-name"
              id="journalistDashboardName"
            >
              SPORTS JOURNAL
            </h3>

            <div
              class="journalist-dashboard-role"
            >
              PERIODISTA · SPORTS JOURNAL
            </div>

          </div>


          <button
            class="journalist-dashboard-new"
            id="journalistDashboardNewStory"
            type="button"
          >
            + NUEVA NOTICIA
          </button>

        </section>


        <!-- STATS -->

        <section
          class="journalist-stats-grid"
        >

          <button
            class="journalist-stat-card"
            type="button"
            data-journalist-stat="all"
          >

            <span
              class="journalist-stat-label"
            >
              TOTAL
            </span>

            <strong
              id="journalistTotalCount"
            >
              0
            </strong>

            <small>
              MIS NOTICIAS
            </small>

          </button>


          <button
            class="journalist-stat-card"
            type="button"
            data-journalist-stat="draft"
          >

            <span
              class="journalist-stat-label"
            >
              BORRADORES
            </span>

            <strong
              id="journalistDraftCount"
            >
              0
            </strong>

            <small>
              EN PREPARACIÓN
            </small>

          </button>


          <button
            class="journalist-stat-card"
            type="button"
            data-journalist-stat="review"
          >

            <span
              class="journalist-stat-label"
            >
              EN REVISIÓN
            </span>

            <strong
              id="journalistReviewCount"
            >
              0
            </strong>

            <small>
              ENVIADAS A REDACCIÓN
            </small>

          </button>


          <button
            class="journalist-stat-card"
            type="button"
            data-journalist-stat="published"
          >

            <span
              class="journalist-stat-label"
            >
              PUBLICADAS
            </span>

            <strong
              id="journalistPublishedCount"
            >
              0
            </strong>

            <small>
              EN EL DIARIO
            </small>

          </button>


          <button
            class="journalist-stat-card"
            type="button"
            data-journalist-stat="archived"
          >

            <span
              class="journalist-stat-label"
            >
              ARCHIVADAS
            </span>

            <strong
              id="journalistArchivedCount"
            >
              0
            </strong>

            <small>
              RETIRADAS
            </small>

          </button>

        </section>


        <!-- ARTICLES -->

        <section>

          <div
            class="journalist-dashboard-section-heading"
          >

            <span
              class="journalist-dashboard-section-number"
            >
              01
            </span>

            <h3>
              MIS NOTICIAS
            </h3>

          </div>


          <div
            class="journalist-dashboard-tools"
          >

            <label
              class="journalist-dashboard-search"
            >

              <span>
                BUSCAR
              </span>

              <input
                id="journalistDashboardSearch"
                type="search"
                placeholder="TÍTULO, TEMA, DEPORTE..."
                autocomplete="off"
              />

            </label>


            <div
              class="journalist-filter-buttons"
            >

              <button
                class="journalist-filter-button active"
                type="button"
                data-journalist-filter="all"
              >
                TODAS
              </button>


              <button
                class="journalist-filter-button"
                type="button"
                data-journalist-filter="draft"
              >
                BORRADORES
              </button>


              <button
                class="journalist-filter-button"
                type="button"
                data-journalist-filter="review"
              >
                REVISIÓN
              </button>


              <button
                class="journalist-filter-button"
                type="button"
                data-journalist-filter="published"
              >
                PUBLICADAS
              </button>


              <button
                class="journalist-filter-button"
                type="button"
                data-journalist-filter="archived"
              >
                ARCHIVADAS
              </button>

            </div>

          </div>


          <div
            class="journalist-results-summary"
          >

            <span>
              RESULTADOS
            </span>

            <strong
              id="journalistResultsCount"
            >
              0 NOTICIAS
            </strong>

          </div>


          <div
            class="journalist-articles-list"
            id="journalistArticlesList"
          ></div>

        </section>

      </div>

    </section>
  `;


  document.body.appendChild(
    modal
  );


  bindJournalistDashboardEvents();

}


/* =========================================================
   EVENTS
========================================================= */

function bindJournalistDashboardEvents() {

  document
    .getElementById(
      "closeJournalistDashboardButton"
    )
    .addEventListener(
      "click",
      closeJournalistDashboard
    );


  document
    .getElementById(
      "journalistDashboardNewStory"
    )
    .addEventListener(
      "click",
      () => {

        closeJournalistDashboard();

        openEditor();

      }
    );


  document
    .getElementById(
      "journalistDashboardSearch"
    )
    .addEventListener(
      "input",
      (event) => {

        journalistDashboardSearch =
          normalizeSearchText(
            event.target.value
          );


        renderJournalistDashboardArticles();

      }
    );


  document
    .querySelectorAll(
      "[data-journalist-filter]"
    )
    .forEach(
      (button) => {

        button.addEventListener(
          "click",
          () => {

            setJournalistDashboardFilter(
              button.dataset
                .journalistFilter
            );

          }
        );

      }
    );


  document
    .querySelectorAll(
      "[data-journalist-stat]"
    )
    .forEach(
      (button) => {

        button.addEventListener(
          "click",
          () => {

            setJournalistDashboardFilter(
              button.dataset
                .journalistStat
            );

          }
        );

      }
    );

}


/* =========================================================
   OPEN / CLOSE
========================================================= */

function openJournalistDashboard() {

  if (
    !isSportsJournalJournalist()
  ) {

    showToast(
      "ESTE PANEL ES PARA PERIODISTAS."
    );


    return;

  }


  closeSideMenu();


  renderJournalistDashboard();


  const modal =
    document.getElementById(
      "journalistDashboardModal"
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


function closeJournalistDashboard() {

  const modal =
    document.getElementById(
      "journalistDashboardModal"
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
   FILTER
========================================================= */

function setJournalistDashboardFilter(
  filter
) {

  journalistDashboardFilter =
    filter;


  document
    .querySelectorAll(
      "[data-journalist-filter]"
    )
    .forEach(
      (button) => {

        button.classList.toggle(
          "active",
          button.dataset
            .journalistFilter ===
            filter
        );

      }
    );


  document
    .querySelectorAll(
      "[data-journalist-stat]"
    )
    .forEach(
      (button) => {

        button.classList.toggle(
          "active",
          button.dataset
            .journalistStat ===
            filter
        );

      }
    );


  renderJournalistDashboardArticles();

}


/* =========================================================
   RENDER COMPLETE PANEL
========================================================= */

function renderJournalistDashboard() {

  const profile =
    sportsJournalAuth
      ?.profile;


  document
    .getElementById(
      "journalistDashboardName"
    )
    .textContent =
      profile
        ?.display_name ||
      "SPORTS JOURNAL";


  renderJournalistDashboardStats();

  renderJournalistDashboardArticles();

}


/* =========================================================
   STATS
========================================================= */

function renderJournalistDashboardStats() {

  const ownArticles =
    getCurrentJournalistArticles();


  const counts = {

    all:
      ownArticles.length,

    draft:
      0,

    review:
      0,

    published:
      0,

    archived:
      0

  };


  ownArticles.forEach(
    (article) => {

      const state =
        getJournalistArticleState(
          article
        );


      counts[state] +=
        1;

    }
  );


  document
    .getElementById(
      "journalistTotalCount"
    )
    .textContent =
      counts.all;


  document
    .getElementById(
      "journalistDraftCount"
    )
    .textContent =
      counts.draft;


  document
    .getElementById(
      "journalistReviewCount"
    )
    .textContent =
      counts.review;


  document
    .getElementById(
      "journalistPublishedCount"
    )
    .textContent =
      counts.published;


  document
    .getElementById(
      "journalistArchivedCount"
    )
    .textContent =
      counts.archived;

}


/* =========================================================
   FILTERED JOURNALIST ARTICLES
========================================================= */

function getFilteredJournalistDashboardArticles() {

  return getCurrentJournalistArticles()
    .filter(
      (article) => {

        const state =
          getJournalistArticleState(
            article
          );


        if (
          journalistDashboardFilter !==
            "all" &&
          state !==
            journalistDashboardFilter
        ) {

          return false;

        }


        if (
          journalistDashboardSearch
        ) {

          const searchable =
            normalizeSearchText(
              [
                article.title,
                article.summary,
                article.content,
                getSportLabel(
                  article.sport
                ),
                ...normalizeTags(
                  article.tags
                )
              ].join(
                " "
              )
            );


          if (
            !searchable.includes(
              journalistDashboardSearch
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
   RENDER ARTICLE LIST
========================================================= */

function renderJournalistDashboardArticles() {

  const container =
    document.getElementById(
      "journalistArticlesList"
    );


  if (!container) {

    return;

  }


  const items =
    getFilteredJournalistDashboardArticles();


  const resultCounter =
    document.getElementById(
      "journalistResultsCount"
    );


  resultCounter.textContent =
    `${items.length} ${
      items.length === 1
        ? "NOTICIA"
        : "NOTICIAS"
    }`;


  container.innerHTML =
    "";


  if (
    items.length === 0
  ) {

    container.innerHTML = `
      <div
        class="journalist-dashboard-empty"
      >

        <strong>
          SIN NOTICIAS
        </strong>

        <p>
          No hay artículos que coincidan
          con esta búsqueda o estado.
        </p>

      </div>
    `;


    return;

  }


  items.forEach(
    (article, index) => {

      container.appendChild(
        createJournalistDashboardArticleRow(
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

function createJournalistDashboardArticleRow(
  article,
  index
) {

  const state =
    getJournalistArticleState(
      article
    );


  const row =
    document.createElement(
      "article"
    );


  row.className =
    "journalist-article-row";


  /* -------------------------------------------------------
     NUMBER
  ------------------------------------------------------- */

  const number =
    document.createElement(
      "div"
    );


  number.className =
    "journalist-article-number";


  number.textContent =
    String(
      index + 1
    ).padStart(
      2,
      "0"
    );


  /* -------------------------------------------------------
     STATUS
  ------------------------------------------------------- */

  const status =
    document.createElement(
      "div"
    );


  status.className =
    `journalist-article-status ${state}`;


  status.textContent =
    getJournalistArticleStateLabel(
      article
    );


  /* -------------------------------------------------------
     SPORT
  ------------------------------------------------------- */

  const sport =
    document.createElement(
      "div"
    );


  sport.className =
    "journalist-article-sport";


  sport.textContent =
    getSportLabel(
      article.sport
    );


  /* -------------------------------------------------------
     COPY
  ------------------------------------------------------- */

  const copy =
    document.createElement(
      "div"
    );


  copy.className =
    "journalist-article-copy";


  const title =
    document.createElement(
      "h4"
    );


  title.className =
    "journalist-article-title";


  title.textContent =
    article.title?.trim() ||
    "NOTICIA SIN TÍTULO";


  copy.appendChild(
    title
  );


  if (
    article.summary
  ) {

    const summary =
      document.createElement(
        "p"
      );


    summary.className =
      "journalist-article-summary";


    summary.textContent =
      article.summary;


    copy.appendChild(
      summary
    );

  }


  const tags =
    normalizeTags(
      article.tags
    );


  if (
    tags.length > 0
  ) {

    const tagContainer =
      document.createElement(
        "div"
      );


    tagContainer.className =
      "journalist-article-tags";


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
            "journalist-article-tag";


          chip.textContent =
            tag;


          tagContainer.appendChild(
            chip
          );

        }
      );


    copy.appendChild(
      tagContainer
    );

  }


  const meta =
    document.createElement(
      "div"
    );


  meta.className =
    "journalist-article-meta";


  meta.textContent =
    getJournalistDashboardDateText(
      article
    );


  copy.appendChild(
    meta
  );


  /* -------------------------------------------------------
     ACTIONS
  ------------------------------------------------------- */

  const actions =
    document.createElement(
      "div"
    );


  actions.className =
    "journalist-article-actions";


  /* DRAFT */

  if (
    state === "draft"
  ) {

    const editButton =
      createJournalistArticleAction(
        "EDITAR",
        "primary"
      );


    editButton.addEventListener(
      "click",
      () => {

        closeJournalistDashboard();


        openEditor(
          article.id
        );

      }
    );


    actions.appendChild(
      editButton
    );

  }


  /* REVIEW */

  else if (
    state === "review"
  ) {

    const editButton =
      createJournalistArticleAction(
        "EDITAR",
        "primary"
      );


    editButton.addEventListener(
      "click",
      () => {

        closeJournalistDashboard();


        openEditor(
          article.id
        );

      }
    );


    const withdrawButton =
      createJournalistArticleAction(
        "RETIRAR",
        "review"
      );


    withdrawButton.addEventListener(
      "click",
      async () => {

        await returnSportsJournalReviewToDraft(
          article.id
        );


        renderJournalistDashboard();

      }
    );


    actions.append(
      editButton,
      withdrawButton
    );

  }


  /* PUBLISHED */

  else if (
    state === "published"
  ) {

    const readButton =
      createJournalistArticleAction(
        "LEER",
        "primary"
      );


    readButton.addEventListener(
      "click",
      () => {

        closeJournalistDashboard();


        openReader(
          article.id
        );

      }
    );


    actions.appendChild(
      readButton
    );

  }


  /* ARCHIVED */

  else if (
    state === "archived"
  ) {

    const archivedLabel =
      document.createElement(
        "div"
      );


    archivedLabel.className =
      "journalist-article-action";


    archivedLabel.textContent =
      "SIN ACCIONES";


    actions.appendChild(
      archivedLabel
    );

  }


  row.append(
    number,
    status,
    sport,
    copy,
    actions
  );


  return row;

}


/* =========================================================
   ACTION BUTTON
========================================================= */

function createJournalistArticleAction(
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
    `journalist-article-action ${modifier}`.trim();


  button.textContent =
    text;


  return button;

}


/* =========================================================
   DATE LABEL
========================================================= */

function getJournalistDashboardDateText(
  article
) {

  const state =
    getJournalistArticleState(
      article
    );


  if (
    state === "review"
  ) {

    return (
      `ENVIADA A REVISIÓN · ${formatEditorDateTime(
        article.updatedAt ||
        article.createdAt
      )}`
    );

  }


  if (
    state === "published"
  ) {

    return (
      `PUBLICADA · ${formatEditorDateTime(
        article.publishedAt ||
        article.createdAt
      )}`
    );

  }


  if (
    state === "archived"
  ) {

    return (
      `ARCHIVADA · ${formatEditorDateTime(
        article.archivedAt ||
        article.updatedAt
      )}`
    );

  }


  return (
    `ÚLTIMA EDICIÓN · ${formatEditorDateTime(
      article.updatedAt ||
      article.createdAt
    )}`
  );

}


/* =========================================================
   REFRESH AFTER CLOUD CHANGES
========================================================= */

const step133BaseRefreshCloudViews =
  refreshSportsJournalCloudViews;


refreshSportsJournalCloudViews =
  function () {

    step133BaseRefreshCloudViews();


    const dashboard =
      document.getElementById(
        "journalistDashboardModal"
      );


    if (
      dashboard
        ?.classList
        .contains(
          "open"
        )
    ) {

      renderJournalistDashboard();

    }

  };


/* =========================================================
   ROLE CHANGES
========================================================= */

const step133BaseSyncRoleInterface =
  syncSportsJournalRoleInterface;


syncSportsJournalRoleInterface =
  function () {

    step133BaseSyncRoleInterface();


    const dashboard =
      document.getElementById(
        "journalistDashboardModal"
      );


    /*
      Example:
      journalist logs out while dashboard is open.
    */

    if (
      dashboard
        ?.classList
        .contains(
          "open"
        ) &&
      !isSportsJournalJournalist()
    ) {

      closeJournalistDashboard();

    }

  };


/* =========================================================
   BODY SCROLL
========================================================= */

const step133BaseSyncBodyScrollState =
  syncBodyScrollState;


syncBodyScrollState =
  function () {

    step133BaseSyncBodyScrollState();


    const dashboard =
      document.getElementById(
        "journalistDashboardModal"
      );


    if (
      dashboard
        ?.classList
        .contains(
          "open"
        )
    ) {

      document.body
        .classList
        .add(
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
      event.key !==
      "Escape"
    ) {

      return;

    }


    const dashboard =
      document.getElementById(
        "journalistDashboardModal"
      );


    if (
      dashboard
        ?.classList
        .contains(
          "open"
        )
    ) {

      closeJournalistDashboard();

    }

  }
);


/* =========================================================
   INSTALL
========================================================= */

createJournalistDashboardInterface();

syncSportsJournalRoleInterface();