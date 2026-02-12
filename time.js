function timeAgo(date) {
    const now = new Date();
    const seconds = Math.floor((now - new Date(date)) / 1000);

    if (seconds < 60) {
        return `${seconds} sec ago`;
    } else if (seconds < 3600) {
        const mins = Math.floor(seconds / 60);
        return `${mins} min ago`;
    } else if (seconds < 86400) {
        const hours = Math.floor(seconds / 3600);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (seconds < 604800) {
        const days = Math.floor(seconds / 86400);
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else {
        const weeks = Math.floor(seconds / 604800);
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    }
}

export default timeAgo