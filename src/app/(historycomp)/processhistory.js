export const processedHistory = () => {
    const storedHistory = localStorage.getItem('convHistory');
    const getHistory = storedHistory ? JSON.parse(storedHistory) : [];
    const now = new Date();

    const today = [];
    const yesterday = [];
    const previous7Days = [];
    const previous30Days = [];
    const previous60Days = [];
    const older = [];

    getHistory.forEach(hist => {
        const histDate = new Date(hist.date);
        const diffDays = (now - histDate) / (1000 * 3600 * 24);

        if (histDate.getDate() === now.getDate() && histDate.getMonth() === now.getMonth() && histDate.getFullYear() === now.getFullYear()) {
            today.push(hist);
        } else if (diffDays < 2) {
            yesterday.push(hist);
        } else if (diffDays < 8) {
            previous7Days.push(hist);
        } else if (diffDays < 31) {
            previous30Days.push(hist);
        } else if (diffDays < 61) {
            previous60Days.push(hist);
        } else {
            older.push(hist);
        }
    });

    return {
        today,
        yesterday,
        previous7Days,
        previous30Days,
        previous60Days,
        older
    }
}