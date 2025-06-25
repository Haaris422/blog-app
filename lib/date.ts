export function cleanDate(publishDate: string) {
        const date = new Date(publishDate);
        const now = new Date();

        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const isPM = hours >= 12;
        const formattedHour = (hours % 12) || 12;
        const time = `${formattedHour}:${minutes} ${isPM ? 'PM' : 'AM'}`;
        if (year === now.getFullYear()) {
            return `${day} ${month}, ${time}`;
        } else {
            return `${day} ${month} ${year}, ${time}`;
        }

    }