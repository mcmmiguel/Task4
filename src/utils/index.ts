

export function calculateDaysDifference(date: string) {
    const registerDate = new Date(date);
    const currentDate = new Date(Date.now());

    const elapsedTime = currentDate.getTime() - registerDate.getTime();

    const differenceInDays = Math.ceil(elapsedTime / (1000 * 60 * 60 * 24));

    return differenceInDays;
}