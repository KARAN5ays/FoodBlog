export const calculateReadingTime = (content: string): number => {
    if (!content || typeof content !== 'string') {
        return 1;
    }

    // Strip all HTML tags to get plain text
    const plainText = content.replace(/<[^>]+>/g, '');

    // Count the number of words
    const wordCount = plainText.trim().split(/\s+/).filter(word => word.length > 0).length;

    // Calculate the time and add a 1-minute buffer for images/code
    const readingTime = Math.ceil(wordCount / 200) + 1;

    return readingTime;
};

export const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

export const getRelativePath = (url: string, domain: string): string => {
    if (!url) return '#';
    if (!url.startsWith('http')) return url;

    try {
        const urlObj = new URL(url);
        if (urlObj.hostname === domain || urlObj.hostname.replace('www.', '') === domain.replace('www.', '')) {
            return urlObj.pathname + urlObj.search + urlObj.hash;
        }
    } catch (e) {
        console.error('Error parsing URL:', url, e);
    }
    return url;
};
