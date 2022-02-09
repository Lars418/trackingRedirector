const TRACKING_URLS = [
    'www.awin1.com',
    'clk.tradedoubler.com',
    't.adcell.com',
    'click.linksynergy.com'
];


chrome.webRequest.onBeforeRequest.addListener(
    ({ url }) => {
        if (isTrackingUrl(url)) {
            return {
                redirectUrl: getActualUrl(url)
            };
        }
    },
    {
        urls: [ '<all_urls>' ],
        types: [ 'main_frame' ]
    },
    [ 'blocking' ]
);

function getActualUrl(url) {
    const { hostname, searchParams } = new URL(url);

    if (hostname.endsWith('awin1.com')) {
        return decodeURIComponent(searchParams.get('ued'));
    }
    else if (hostname === 'clk.tradedoubler.com') {
        return decodeURIComponent(searchParams.get('url'));
    }
    else if (hostname === 't.adcell.com') {
        return decodeURIComponent(searchParams.get('param0'));
    }
    else if (hostname === 'click.linksynergy.com') {
        return decodeURIComponent(searchParams.get('murl'));
    }
    else if (hostname === 'www.dpbolvw.net') {
        return decodeURIComponent(searchParams.get('url'));
    }

    return url;
}

function isTrackingUrl(url) {
    console.log(url, new URL(url).hostname);

    return TRACKING_URLS.some(u => u.includes(new URL(url).hostname));
}