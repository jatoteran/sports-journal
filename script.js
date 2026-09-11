// ==========================
// SPORTS JOURNAL
// ==========================

const STORAGE_KEY = "sportsJournalArticlesV2";


// ==========================
// DOM ELEMENTS
// ==========================

const articleForm =
    document.querySelector("#article-form");

const titleInput =
    document.querySelector("#article-title");

const sportInput =
    document.querySelector("#article-sport");

const authorInput =
    document.querySelector("#article-author");

const imageInput =
    document.querySelector("#article-image");

const summaryInput =
    document.querySelector("#article-summary");

const contentInput =
    document.querySelector("#article-content");

const formStatus =
    document.querySelector("#form-status");

const publishButton =
    document.querySelector(".publish-button");

const publishRow =
    document.querySelector(".publish-row");


const imagePreview =
    document.querySelector("#image-preview");

const imagePreviewImg =
    document.querySelector("#image-preview-img");

const imagePreviewError =
    document.querySelector("#image-preview-error");


const articlesList =
    document.querySelector("#articles-list");

const emptyState =
    document.querySelector("#empty-state");

const searchInput =
    document.querySelector("#search-input");


const filterButtons =
    document.querySelectorAll(".filter-button");

const sportNavLinks =
    document.querySelectorAll("[data-sport-nav]");


const leadStory =
    document.querySelector("#lead-story");

const sideStories =
    document.querySelector("#side-stories");


const articleCount =
    document.querySelector("#article-count");

const currentDate =
    document.querySelector("#current-date");


const articleReader =
    document.querySelector("#article-reader");

const readerClose =
    document.querySelector("#reader-close");

const readerImage =
    document.querySelector("#reader-image");

const readerSport =
    document.querySelector("#reader-sport");

const readerTitle =
    document.querySelector("#reader-title");

const readerAuthor =
    document.querySelector("#reader-author");

const readerDate =
    document.querySelector("#reader-date");

const readerSummary =
    document.querySelector("#reader-summary");

const readerBody =
    document.querySelector("#reader-body");


// ==========================
// APP STATE
// ==========================

let articles = loadArticles();

let activeSport = "all";

let searchTerm = "";

let editingArticleId = null;


// ==========================
// CANCEL EDIT BUTTON
// ==========================

const cancelEditButton =
    document.createElement("button");

cancelEditButton.type = "button";

cancelEditButton.className =
    "cancel-edit-button";

cancelEditButton.textContent =
    "CANCEL EDIT";

cancelEditButton.hidden = true;


publishRow.insertBefore(
    cancelEditButton,
    publishButton
);


// ==========================
// LOCAL STORAGE
// ==========================

function loadArticles() {

    const savedArticles =
        localStorage.getItem(
            STORAGE_KEY
        );


    if (!savedArticles) {
        return [];
    }


    try {

        const parsedArticles =
            JSON.parse(
                savedArticles
            );


        if (!Array.isArray(parsedArticles)) {
            return [];
        }


        return parsedArticles;

    } catch (error) {

        console.error(
            "Could not load articles:",
            error
        );


        return [];
    }
}


function saveArticles() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(articles)
    );
}


// ==========================
// HELPERS
// ==========================

function createArticleId() {

    return `${Date.now()}-${Math.random()
        .toString(16)
        .slice(2)}`;
}


function formatSport(sport) {

    const sportNames = {
        football: "Football",
        tennis: "Tennis",
        baseball: "Baseball",
        basketball: "Basketball"
    };


    return sportNames[sport] || sport;
}


function formatArticleDate(date) {

    return new Intl.DateTimeFormat(
        "en-US",
        {
            month: "short",
            day: "2-digit",
            year: "numeric"
        }
    )
        .format(
            new Date(date)
        )
        .toUpperCase();
}


function sortArticles(list) {

    return [...list].sort(
        function (a, b) {

            return (
                new Date(b.createdAt) -
                new Date(a.createdAt)
            );
        }
    );
}


function getValidImageUrl(value) {

    const trimmedValue =
        value.trim();


    if (!trimmedValue) {
        return "";
    }


    try {

        const url =
            new URL(trimmedValue);


        if (
            url.protocol !== "http:" &&
            url.protocol !== "https:"
        ) {
            return "";
        }


        return url.href;

    } catch {
        return "";
    }
}


// ==========================
// CURRENT DATE
// ==========================

function renderCurrentDate() {

    const today =
        new Date();


    currentDate.textContent =
        new Intl.DateTimeFormat(
            "en-US",
            {
                month: "long",
                day: "numeric",
                year: "numeric"
            }
        )
            .format(today)
            .toUpperCase();
}


// ==========================
// IMAGE PREVIEW
// ==========================

imageInput.addEventListener(
    "change",
    updateImagePreview
);


imageInput.addEventListener(
    "blur",
    updateImagePreview
);


function updateImagePreview() {

    const imageUrl =
        getValidImageUrl(
            imageInput.value
        );


    imagePreviewImg.removeAttribute(
        "src"
    );

    imagePreviewError.hidden =
        true;


    if (!imageInput.value.trim()) {

        imagePreview.hidden =
            true;

        return;
    }


    if (!imageUrl) {

        imagePreview.hidden =
            false;

        imagePreviewImg.hidden =
            true;

        imagePreviewError.hidden =
            false;

        return;
    }


    imagePreview.hidden =
        false;

    imagePreviewImg.hidden =
        false;

    imagePreviewError.hidden =
        true;


    imagePreviewImg.src =
        imageUrl;
}


imagePreviewImg.addEventListener(
    "load",
    function () {

        imagePreviewImg.hidden =
            false;

        imagePreviewError.hidden =
            true;
    }
);


imagePreviewImg.addEventListener(
    "error",
    function () {

        imagePreviewImg.hidden =
            true;

        imagePreviewError.hidden =
            false;
    }
);


// ==========================
// CREATE / UPDATE
// ==========================

articleForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        clearFormStatus();


        const title =
            titleInput.value.trim();

        const sport =
            sportInput.value;

        const author =
            authorInput.value.trim();

        const rawImageUrl =
            imageInput.value.trim();

        const imageUrl =
            getValidImageUrl(
                rawImageUrl
            );

        const summary =
            summaryInput.value.trim();

        const content =
            contentInput.value.trim();


        if (
            !title ||
            !sport ||
            !author ||
            !summary ||
            !content
        ) {

            showFormStatus(
                "Complete every required field before publishing.",
                "error"
            );


            return;
        }


        if (
            rawImageUrl &&
            !imageUrl
        ) {

            showFormStatus(
                "Enter a valid http or https image URL.",
                "error"
            );


            return;
        }


        // ==========================
        // UPDATE
        // ==========================

        if (editingArticleId) {

            const articleIndex =
                articles.findIndex(
                    function (article) {

                        return (
                            article.id ===
                            editingArticleId
                        );
                    }
                );


            if (articleIndex === -1) {

                showFormStatus(
                    "The story could not be found.",
                    "error"
                );


                return;
            }


            articles[articleIndex] = {

                ...articles[articleIndex],

                title,
                sport,
                author,
                imageUrl,
                summary,
                content,

                updatedAt:
                    new Date()
                        .toISOString()
            };


            saveArticles();

            renderApp();

            resetEditor();


            showFormStatus(
                "Story updated successfully.",
                "success"
            );


            document
                .querySelector("#articles")
                .scrollIntoView({
                    behavior: "smooth"
                });


            return;
        }


        // ==========================
        // CREATE
        // ==========================

        const article = {

            id: createArticleId(),

            title,
            sport,
            author,
            imageUrl,
            summary,
            content,

            createdAt:
                new Date()
                    .toISOString()
        };


        articles.push(
            article
        );


        saveArticles();

        renderApp();

        resetEditor();


        showFormStatus(
            "Story published successfully.",
            "success"
        );


        document
            .querySelector("#home")
            .scrollIntoView({
                behavior: "smooth"
            });
    }
);


// ==========================
// EDIT ARTICLE
// ==========================

function startEditingArticle(
    articleId
) {

    const article =
        articles.find(
            function (item) {

                return (
                    item.id ===
                    articleId
                );
            }
        );


    if (!article) {
        return;
    }


    editingArticleId =
        article.id;


    titleInput.value =
        article.title;

    sportInput.value =
        article.sport;

    authorInput.value =
        article.author;

    imageInput.value =
        article.imageUrl || "";

    summaryInput.value =
        article.summary;

    contentInput.value =
        article.content;


    updateImagePreview();


    publishButton.textContent =
        "SAVE CHANGES →";


    cancelEditButton.hidden =
        false;


    showFormStatus(
        "Editing story.",
        "success"
    );


    document
        .querySelector("#publish")
        .scrollIntoView({
            behavior: "smooth"
        });


    setTimeout(
        function () {

            titleInput.focus();

        },
        500
    );
}


// ==========================
// CANCEL EDIT
// ==========================

cancelEditButton.addEventListener(
    "click",
    function () {

        resetEditor();

        clearFormStatus();
    }
);


function resetEditor() {

    articleForm.reset();

    editingArticleId =
        null;


    publishButton.textContent =
        "PUBLISH STORY →";


    cancelEditButton.hidden =
        true;


    imagePreview.hidden =
        true;

    imagePreviewImg.hidden =
        false;

    imagePreviewError.hidden =
        true;

    imagePreviewImg.removeAttribute(
        "src"
    );
}


// ==========================
// DELETE
// ==========================

function deleteArticle(
    articleId
) {

    const article =
        articles.find(
            function (item) {

                return (
                    item.id ===
                    articleId
                );
            }
        );


    if (!article) {
        return;
    }


    const confirmed =
        window.confirm(
            `Delete "${article.title}"?\n\nThis action cannot be undone.`
        );


    if (!confirmed) {
        return;
    }


    articles =
        articles.filter(
            function (item) {

                return (
                    item.id !==
                    articleId
                );
            }
        );


    saveArticles();


    if (
        editingArticleId ===
        articleId
    ) {

        resetEditor();

        clearFormStatus();
    }


    renderApp();
}


// ==========================
// FORM STATUS
// ==========================

function showFormStatus(
    message,
    type
) {

    formStatus.textContent =
        message;


    formStatus.classList.remove(
        "form-success",
        "form-error"
    );


    if (type === "success") {

        formStatus.classList.add(
            "form-success"
        );
    }


    if (type === "error") {

        formStatus.classList.add(
            "form-error"
        );
    }
}


function clearFormStatus() {

    formStatus.textContent =
        "";


    formStatus.classList.remove(
        "form-success",
        "form-error"
    );
}


// ==========================
// FILTER ARTICLES
// ==========================

function getFilteredArticles() {

    const normalizedSearch =
        searchTerm.toLowerCase();


    return sortArticles(
        articles
    ).filter(
        function (article) {

            const matchesSport =
                activeSport === "all" ||
                article.sport ===
                activeSport;


            const searchableText = `
                ${article.title}
                ${article.summary}
                ${article.author}
                ${formatSport(article.sport)}
                ${article.content}
            `.toLowerCase();


            const matchesSearch =
                searchableText.includes(
                    normalizedSearch
                );


            return (
                matchesSport &&
                matchesSearch
            );
        }
    );
}


// ==========================
// SEARCH
// ==========================

searchInput.addEventListener(
    "input",
    function () {

        searchTerm =
            searchInput.value.trim();


        renderArticleList();
    }
);


// ==========================
// FILTER BUTTONS
// ==========================

filterButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                setActiveSport(
                    button.dataset.sport
                );
            }
        );
    }
);


function setActiveSport(sport) {

    activeSport =
        sport;


    filterButtons.forEach(
        function (button) {

            button.classList.toggle(
                "active",
                button.dataset.sport ===
                    sport
            );
        }
    );


    renderArticleList();
}


// ==========================
// HEADER SPORT LINKS
// ==========================

sportNavLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                const sport =
                    link.dataset.sportNav;


                setActiveSport(
                    sport
                );


                document
                    .querySelector(
                        "#articles"
                    )
                    .scrollIntoView({
                        behavior: "smooth"
                    });
            }
        );
    }
);


// ==========================
// ARTICLE COUNT
// ==========================

function renderArticleCount() {

    const total =
        articles.length;


    articleCount.textContent =
        `${total} ${
            total === 1
                ? "STORY"
                : "STORIES"
        }`;
}


// ==========================
// FRONT PAGE
// ==========================

function renderFrontPage() {

    const sortedArticles =
        sortArticles(
            articles
        );


    renderLeadStory(
        sortedArticles[0]
    );


    renderSideStories(
        sortedArticles.slice(
            1,
            3
        )
    );
}


// ==========================
// LEAD STORY
// ==========================

function renderLeadStory(
    article
) {

    leadStory.replaceChildren();


    if (!article) {

        renderLeadPlaceholder();

        return;
    }


    const story =
        document.createElement(
            "div"
        );


    story.className =
        "lead-placeholder is-clickable";


    story.tabIndex = 0;


    story.setAttribute(
        "role",
        "button"
    );


    if (article.imageUrl) {

        story.classList.add(
            "has-image"
        );


        const image =
            document.createElement(
                "img"
            );


        image.className =
            "lead-story-image";


        image.src =
            article.imageUrl;


        image.alt =
            article.title;


        image.addEventListener(
            "error",
            function () {

                image.remove();

                story.classList.remove(
                    "has-image"
                );
            }
        );


        story.append(
            image
        );
    }


    const copy =
        document.createElement(
            "div"
        );


    if (article.imageUrl) {

        copy.className =
            "lead-story-copy";
    }


    const number =
        document.createElement(
            "span"
        );


    number.className =
        "placeholder-number";


    number.textContent =
        "01";


    const category =
        document.createElement(
            "p"
        );


    category.className =
        "story-category";


    category.textContent =
        formatSport(
            article.sport
        );


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


    summary.textContent =
        article.summary;


    copy.append(
        number,
        category,
        title,
        summary
    );


    story.append(
        copy
    );


    story.addEventListener(
        "click",
        function () {

            openArticle(
                article.id
            );
        }
    );


    story.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();


                openArticle(
                    article.id
                );
            }
        }
    );


    leadStory.append(
        story
    );
}


function renderLeadPlaceholder() {

    const placeholder =
        document.createElement(
            "div"
        );


    placeholder.className =
        "lead-placeholder";


    const number =
        document.createElement(
            "span"
        );


    number.className =
        "placeholder-number";


    number.textContent =
        "01";


    const content =
        document.createElement(
            "div"
        );


    const category =
        document.createElement(
            "p"
        );


    category.className =
        "story-category";


    category.textContent =
        "YOUR FRONT PAGE";


    const title =
        document.createElement(
            "h2"
        );


    title.textContent =
        "Your biggest story will lead the edition.";


    const description =
        document.createElement(
            "p"
        );


    description.textContent =
        "Publish your first article and Sports Journal will begin building the front page automatically.";


    content.append(
        category,
        title,
        description
    );


    placeholder.append(
        number,
        content
    );


    leadStory.append(
        placeholder
    );
}


// ==========================
// SIDE STORIES
// ==========================

function renderSideStories(
    featuredArticles
) {

    sideStories.replaceChildren();


    for (
        let index = 0;
        index < 2;
        index++
    ) {

        const article =
            featuredArticles[index];


        if (article) {

            renderRealSideStory(
                article,
                index
            );

        } else {

            renderSidePlaceholder(
                index
            );
        }
    }
}


function renderRealSideStory(
    article,
    index
) {

    const story =
        document.createElement(
            "article"
        );


    story.className =
        "side-story-placeholder is-clickable";


    story.tabIndex =
        0;


    story.setAttribute(
        "role",
        "button"
    );


    if (article.imageUrl) {

        story.classList.add(
            "has-image"
        );


        const image =
            document.createElement(
                "img"
            );


        image.className =
            "side-story-image";


        image.src =
            article.imageUrl;


        image.alt =
            article.title;


        image.addEventListener(
            "error",
            function () {

                image.remove();

                story.classList.remove(
                    "has-image"
                );
            }
        );


        story.append(
            image
        );
    }


    const copy =
        document.createElement(
            "div"
        );


    if (article.imageUrl) {

        copy.className =
            "side-story-copy";
    }


    const number =
        document.createElement(
            "span"
        );


    number.className =
        "side-story-number";


    number.textContent =
        String(index + 2)
            .padStart(
                2,
                "0"
            );


    const category =
        document.createElement(
            "p"
        );


    category.className =
        "story-category";


    category.textContent =
        formatSport(
            article.sport
        );


    const title =
        document.createElement(
            "h3"
        );


    title.textContent =
        article.title;


    copy.append(
        number,
        category,
        title
    );


    story.append(
        copy
    );


    story.addEventListener(
        "click",
        function () {

            openArticle(
                article.id
            );
        }
    );


    story.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();


                openArticle(
                    article.id
                );
            }
        }
    );


    sideStories.append(
        story
    );
}


function renderSidePlaceholder(
    index
) {

    const story =
        document.createElement(
            "article"
        );


    story.className =
        "side-story-placeholder";


    const number =
        document.createElement(
            "span"
        );


    number.textContent =
        String(index + 2)
            .padStart(
                2,
                "0"
            );


    const content =
        document.createElement(
            "div"
        );


    const category =
        document.createElement(
            "p"
        );


    category.className =
        "story-category";


    category.textContent =
        index === 0
            ? "NEXT STORY"
            : "FROM THE DESK";


    const title =
        document.createElement(
            "h3"
        );


    title.textContent =
        index === 0
            ? "Another headline will live here."
            : "Your newsroom grows as you publish.";


    content.append(
        category,
        title
    );


    story.append(
        number,
        content
    );


    sideStories.append(
        story
    );
}


// ==========================
// ARTICLE LIST
// ==========================

function renderArticleList() {

    const filteredArticles =
        getFilteredArticles();


    articlesList.replaceChildren();


    emptyState.hidden =
        filteredArticles.length !== 0;


    filteredArticles.forEach(
        function (
            article,
            index
        ) {

            const row =
                createArticleRow(
                    article,
                    index
                );


            articlesList.append(
                row
            );
        }
    );
}


// ==========================
// CREATE ARTICLE ROW
// ==========================

function createArticleRow(
    article,
    index
) {

    const row =
        document.createElement(
            "article"
        );


    row.className =
        "article-row";


    const number =
        document.createElement(
            "span"
        );


    number.className =
        "article-number";


    number.textContent =
        String(index + 1)
            .padStart(
                2,
                "0"
            );


    const sport =
        document.createElement(
            "span"
        );


    sport.className =
        "article-sport";


    sport.textContent =
        formatSport(
            article.sport
        );


    const title =
        document.createElement(
            "h3"
        );


    title.textContent =
        article.title;


    const date =
        document.createElement(
            "span"
        );


    date.className =
        "article-row-date";


    date.textContent =
        formatArticleDate(
            article.createdAt
        );


    const actions =
        document.createElement(
            "div"
        );


    actions.className =
        "article-row-actions";


    // READ

    const readButton =
        document.createElement(
            "button"
        );


    readButton.type =
        "button";


    readButton.textContent =
        "READ STORY →";


    readButton.addEventListener(
        "click",
        function () {

            openArticle(
                article.id
            );
        }
    );


    // EDIT

    const editButton =
        document.createElement(
            "button"
        );


    editButton.type =
        "button";


    editButton.textContent =
        "EDIT →";


    editButton.addEventListener(
        "click",
        function () {

            startEditingArticle(
                article.id
            );
        }
    );


    // DELETE

    const deleteButton =
        document.createElement(
            "button"
        );


    deleteButton.type =
        "button";


    deleteButton.className =
        "delete-button";


    deleteButton.textContent =
        "DELETE";


    deleteButton.addEventListener(
        "click",
        function () {

            deleteArticle(
                article.id
            );
        }
    );


    actions.append(
        readButton,
        editButton,
        deleteButton
    );


    row.append(
        number,
        sport,
        title,
        date,
        actions
    );


    return row;
}


// ==========================
// OPEN ARTICLE
// ==========================

function openArticle(
    articleId
) {

    const article =
        articles.find(
            function (item) {

                return (
                    item.id ===
                    articleId
                );
            }
        );


    if (!article) {
        return;
    }


    readerSport.textContent =
        formatSport(
            article.sport
        );


    readerTitle.textContent =
        article.title;


    readerAuthor.textContent =
        `BY ${article.author.toUpperCase()}`;


    readerDate.textContent =
        formatArticleDate(
            article.createdAt
        );


    readerSummary.textContent =
        article.summary;


    readerBody.textContent =
        article.content;


    // IMAGE

    if (article.imageUrl) {

        readerImage.src =
            article.imageUrl;


        readerImage.alt =
            article.title;


        readerImage.hidden =
            false;

    } else {

        hideReaderImage();
    }


    articleReader.hidden =
        false;


    document.body.style.overflow =
        "hidden";


    readerClose.focus();
}


readerImage.addEventListener(
    "error",
    hideReaderImage
);


function hideReaderImage() {

    readerImage.hidden =
        true;


    readerImage.removeAttribute(
        "src"
    );


    readerImage.alt =
        "";
}


// ==========================
// CLOSE ARTICLE
// ==========================

function closeArticle() {

    articleReader.hidden =
        true;


    document.body.style.overflow =
        "";


    hideReaderImage();
}


readerClose.addEventListener(
    "click",
    closeArticle
);


articleReader.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            articleReader
        ) {

            closeArticle();
        }
    }
);


document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            !articleReader.hidden
        ) {

            closeArticle();
        }
    }
);


// ==========================
// RENDER APP
// ==========================

function renderApp() {

    renderArticleCount();

    renderFrontPage();

    renderArticleList();
}


// ==========================
// START APP
// ==========================

renderCurrentDate();

renderApp();