
export function calculateDaysDifference(date: string): string {
    const registerDate = new Date(date);
    const currentDate = new Date(Date.now());

    const elapsedTime = currentDate.getTime() - registerDate.getTime();

    const differenceInDays = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));

    if (differenceInDays === 0) {

        const differenceInHours = Math.floor(elapsedTime / (1000 * 60 * 60));

        if (differenceInHours === 0) {
            const differenceInMinutes = Math.floor(elapsedTime / (1000 * 60));
            return `${differenceInMinutes}m`;
        }

        return `${differenceInHours}h`;

    }

    return `${differenceInDays}d`;
}