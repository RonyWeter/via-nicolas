
export function convertDateToString(dateStr: string) {
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleDateString('en-GB');
    return formattedDate;
}

export function convertStringToDate(dateString: string) : any {
    const [day, month, year] = dateString.split('/');
    const travelDateObj = new Date(+year, +month - 1, +day);
    return travelDateObj
}

export function isEmptyOrNull(value: any) {
    return value === '' || value === undefined || value === null;
}