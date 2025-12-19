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
