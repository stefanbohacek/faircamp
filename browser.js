const BROWSER_JS_T = {
    nothingFoundForXxx: query => 'Nothing found for \'{query}\''.replace('{query}', query),
    showingFeaturedItems: 'Showing featured items',
    showingXxxResultsForXxx: (count, query) => 'Showing {count} results for \'{query}\''.replace('{count}', count).replace('{query}', query),
    xxxAndOthers: (xxx, othersLink) => '{xxx} and <a href="{others_link}">others</a>'.replace('{xxx}', xxx).replace('{others_link}', othersLink)
};

const LABEL_MODE = false;

const ARTISTS = [
    
];

const RELEASES = [
    {
    
    cover: 'cover_160.jpg?HGIm3X_LQ-M',
    title: 'Those Nights',
    tracks: [
        {
    
    
    number: '1.',
    title: 'Those Nights',
    url: 'those-nights/1/'
}

    ],
    url: 'those-nights/'
}
,
{
    
    cover: 'cover_160.jpg?7-e-_m4Nq-4',
    title: 'The Tide Will Turn',
    tracks: [
        {
    
    
    number: '1.',
    title: 'The Tide Will Turn',
    url: 'the-tide-will-turn/1/'
}

    ],
    url: 'the-tide-will-turn/'
}
,
{
    
    cover: 'cover_160.jpg?tKOk-JH6OgA',
    title: 'Secret Places',
    tracks: [
        {
    
    
    number: '1.',
    title: 'Secret Places',
    url: 'secret-places/1/'
}

    ],
    url: 'secret-places/'
}
,
{
    
    cover: 'cover_160.jpg?vIKkczG3bpA',
    title: 'Secret Machines',
    tracks: [
        {
    
    
    number: '1.',
    title: 'Secret Machines',
    url: 'secret-machines/1/'
}

    ],
    url: 'secret-machines/'
}
,
{
    
    cover: 'cover_160.jpg?cRJLgYuuMMs',
    title: 'Seasons',
    tracks: [
        {
    
    
    number: '1.',
    title: 'Seasons',
    url: 'seasons/1/'
}

    ],
    url: 'seasons/'
}
,
{
    
    cover: 'cover_160.jpg?6nGhL5btVpo',
    title: 'Out of Time',
    tracks: [
        {
    
    
    number: '1.',
    title: 'Out of Time',
    url: 'out-of-time/1/'
}

    ],
    url: 'out-of-time/'
}
,
{
    
    cover: 'cover_160.jpg?8BHANY19jUE',
    title: 'No Sleep',
    tracks: [
        {
    
    
    number: '1.',
    title: 'No Sleep',
    url: 'no-sleep/1/'
}

    ],
    url: 'no-sleep/'
}
,
{
    
    cover: 'cover_160.jpg?KtwSa1KiqvU',
    title: 'Impossible',
    tracks: [
        {
    
    
    number: '1.',
    title: 'Impossible (Excerpt)',
    url: 'impossible/1/'
}

    ],
    url: 'impossible/'
}
,
{
    
    cover: 'cover_160.jpg?wG-5vZ0BvWs',
    title: 'How to Stop Time',
    tracks: [
        {
    
    
    number: '1.',
    title: 'Stefan Bohacek - How to Stop Time',
    url: 'how-to-stop-time/1/'
}

    ],
    url: 'how-to-stop-time/'
}
,
{
    
    cover: 'cover_160.jpg?cVBRuI_Z_w0',
    title: 'Get Down',
    tracks: [
        {
    
    
    number: '1.',
    title: 'Get Down',
    url: 'get-down/1/'
}

    ],
    url: 'get-down/'
}
,
{
    
    cover: 'cover_160.jpg?tAfY_Fzb0fY',
    title: 'Feeling Good',
    tracks: [
        {
    
    
    number: '1.',
    title: 'Feeling Good',
    url: 'feeling-good/1/'
}

    ],
    url: 'feeling-good/'
}
,
{
    
    cover: 'cover_160.jpg?KrXkJ-ppyQQ',
    title: 'Every Night',
    tracks: [
        {
    
    
    number: '1.',
    title: 'Every Night',
    url: 'every-night/1/'
}

    ],
    url: 'every-night/'
}
,
{
    
    cover: 'cover_160.jpg?etL7NcuvdW8',
    title: 'Every Goodbye',
    tracks: [
        {
    
    
    number: '1.',
    title: 'Every Goodbye',
    url: 'every-goodbye/1/'
}

    ],
    url: 'every-goodbye/'
}
,
{
    
    cover: 'cover_160.jpg?D1cfb3u9wtk',
    title: 'Don\'t Sweat It',
    tracks: [
        {
    
    
    number: '1.',
    title: 'Don\'t Sweat It',
    url: 'don-t-sweat-it/1/'
}

    ],
    url: 'don-t-sweat-it/'
}

];
const browser = document.querySelector('#browser');
const browseButtonFooter = document.querySelector('footer button.browse');
const browseButtonHeader = document.querySelector('header button.browse');

const browseResults = browser.querySelector('#results');
const closeButton = browser.querySelector('button');
const searchField = browser.querySelector('input');
const statusField = browser.querySelector('[role="status"]');

const indexSuffix = window.location.pathname.endsWith('index.html') ? 'index.html' : '';
const rootPrefix = browser.dataset.rootPrefix;

function truncateArtistList(artists, othersLink)  {
    const MAX_CHARS = 40;

    if (artists.length > 2) {
        const nameChars = artists.reduce((sum, artist) => sum + artist.name.length, 0);
        const separatorChars = (artists.length - 1) * 2; // All separating ", " between the artists

        if (nameChars + separatorChars > MAX_CHARS) {
            // Here we have more than two artists, we have a char limit,
            // and we cannot fit all artists within the limit, thus
            // we truncate the list.

            if (LABEL_MODE) {
                // In label mode we show at least one artist, then as many
                // additional ones as fit, e.g. "[artist],[artist] and
                // more"
                let charsUsed = 0;
                const truncatedArtists = artists
                    .filter(artist => {
                        if (charsUsed === 0) {
                            charsUsed += artist.name.length;
                            return true;
                        }

                        charsUsed += artist.name.length;
                        return charsUsed < MAX_CHARS;
                    });

                const rArtists = truncatedArtists
                    .map(artist => `<a href="${rootPrefix}${artist.url}${indexSuffix}">${artist.name}</a>`)
                    .join(", ");

                return BROWSER_JS_T.xxxAndOthers(rArtists, othersLink);
            }

            // In artist mode we show only "[catalog artist] and others".
            // Our sorting ensures the catalog artist is the first one,
            // so we can just take that.
            const rArtists = `<a href="${rootPrefix}${artists[0].url}${indexSuffix}">${artists[0].name}</a>`;

            return BROWSER_JS_T.xxxAndOthers(rArtists, othersLink);
        }
    }

    return artists
        .map(artist => `<a href="${rootPrefix}${artist.url}${indexSuffix}">${artist.name}</a>`)
        .join(", ");
}

for (const release of RELEASES) {
    let imgRelease;
    if (release.cover) {
        imgRelease = document.createElement('img');
        imgRelease.src = rootPrefix + release.url + release.cover;
    } else {
        imgRelease = document.createElement('img');
        imgRelease.classList.add('procedural');
        imgRelease.src = rootPrefix + release.url + release.coverProcedural;
    }

    const aText = document.createElement('a');
    aText.href = rootPrefix + release.url + indexSuffix;

    const aImage = aText.cloneNode(true);
    aImage.tabIndex = -1;
    aImage.appendChild(imgRelease);

    aText.dataset.searchable = 'true';
    aText.textContent = release.title;

    const details = document.createElement('div');
    details.appendChild(aText);

    if (release.artists) {
        const artists = document.createElement('div');
        artists.classList.add('artists');
        artists.innerHTML = truncateArtistList(release.artists, `${rootPrefix}${release.url}`);
        details.appendChild(artists);
    }

    const row = document.createElement('div');
    row.appendChild(aImage);
    row.appendChild(details);
    browseResults.appendChild(row);

    for (const track of release.tracks) {
        let imgTrack;
        if (track.cover) {
            imgTrack = document.createElement('img');
            imgTrack.src = rootPrefix + track.url + track.cover;
        } else {
            imgTrack = imgRelease.cloneNode(true);
        }

        const number = document.createElement('span');
        number.classList.add('number');
        number.textContent = track.number;

        const aTitle = document.createElement('a');
        aTitle.href = rootPrefix + track.url + indexSuffix;

        const aImage = aTitle.cloneNode(true);
        aImage.tabIndex = -1;
        aImage.appendChild(imgTrack);

        aTitle.dataset.searchable = 'true';
        aTitle.textContent = track.title;

        const details = document.createElement('div');
        details.appendChild(number);
        details.appendChild(aTitle);

        if (track.artists) {
            const artists = document.createElement('div');
            artists.classList.add('artists');
            artists.innerHTML = truncateArtistList(track.artists, `${rootPrefix}${track.url}`);
            details.appendChild(artists);
        }

        const row = document.createElement('div');
        row.appendChild(aImage);
        row.appendChild(details);
        row.dataset.track = '';
        row.style.setProperty('display', 'none');
        browseResults.appendChild(row);
    }
}

for (const artist of ARTISTS) {
    const aText = document.createElement('a');
    aText.href = rootPrefix + artist.url + indexSuffix;

    let imageArtist;
    if (artist.image) {
        imageArtist = document.createElement('img');
        imageArtist.classList.add('crop');
        imageArtist.src = rootPrefix + artist.url + artist.image;
    } else {
        imageArtist = document.createElement('span');
        imageArtist.classList.add('placeholder');
    }

    const aImage = aText.cloneNode(true);
    aImage.tabIndex = -1;
    aImage.appendChild(imageArtist);

    aText.dataset.searchable = 'true';
    aText.textContent = artist.name;

    const details = document.createElement('div');
    details.appendChild(aText);

    const row = document.createElement('div');
    row.appendChild(aImage);
    row.appendChild(details);
    browseResults.appendChild(row);
}

function hideBrowser() {
    const browseButton = browseButtonFooter.ariaExpanded === 'true'
        ? browseButtonFooter
        : browseButtonHeader;

    browser.classList.remove('active');
    browseButton.setAttribute('aria-expanded', 'false');
    searchField.value = '';
    statusField.removeAttribute('aria-label');
    statusField.textContent = '';
    for (const result of browseResults.children) {
        const display = result.dataset.track === undefined;
        result.style.setProperty('display', display ? null : 'none');
    }
    browseButton.focus();
}

function showBrowser(browseButton) {
    browser.classList.add('active');
    browseButton.setAttribute('aria-expanded', 'true');
    searchField.focus();
    statusField.setAttribute('aria-label', BROWSER_JS_T.showingFeaturedItems);
    statusField.textContent = '';
}

// When the browse/search modal is open and focus moves outside the page
// entirely (e.g. to the addressbar) but then re-enters the page, we need
// to make sure that it returns back to the browse/search modal (instead of
// to an obscured element in the main body)
document.body.addEventListener('focusin', event => {
    if (browser.classList.contains('active') && !browser.contains(event.target)) {
        searchField.focus();
    }
});

browser.addEventListener('focusout', event => {
    if (browser.classList.contains('active') && event.relatedTarget && !browser.contains(event.relatedTarget)) {
        hideBrowser();
    }
});

browser.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        event.preventDefault();
        hideBrowser();
    }
});

browseButtonFooter.addEventListener('click', () => showBrowser(browseButtonFooter));
browseButtonHeader.addEventListener('click', () => showBrowser(browseButtonHeader));

closeButton.addEventListener('click', hideBrowser);

searchField.addEventListener('input', () => {
    const query = searchField.value.trim();

    if (query.length) {
        const regexp = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
        let shown = 0;

        for (const element of browseResults.children) {
            const title = element.querySelector('[data-searchable]').textContent;
            const display = regexp.test(title);
            element.style.setProperty('display', display ? null : 'none');
            if (display) { shown += 1; }
        }

        if (shown === 0) {
            statusField.removeAttribute('aria-label');
            statusField.textContent = BROWSER_JS_T.nothingFoundForXxx(query);
        } else {
            statusField.setAttribute('aria-label', BROWSER_JS_T.showingXxxResultsForXxx(shown, query));
            statusField.textContent = '';
        }
    } else {
        for (const element of browseResults.children) {
            const display = element.dataset.track === undefined;
            element.style.setProperty('display', display ? null : 'none');
        }

        statusField.setAttribute('aria-label', BROWSER_JS_T.showingFeaturedItems);
        statusField.textContent = '';
    }
});
