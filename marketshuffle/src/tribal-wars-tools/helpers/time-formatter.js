/** IMPORTANT NOTE: I subtracted 1 hour in all 3 returns statements from parseCustomDate because I'm in Denmark.
 * Remove it when it's no longer needed
*/
export function parseCustomDate(input, minutesOffset = 0) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // Set tomorrow's date

    // Regular expressions
    const regexDateTime = /(\d{1,2})\.(\d{1,2})\. la ora (\d{1,2}):(\d{1,2})(?::(\d{1,2})(?::(\d{1,3}))?)?/; // Includes optional seconds and milliseconds
    const regexTomorrow = /mâine la ora (\d{1,2}):(\d{1,2})(?::(\d{1,2})(?::(\d{1,3}))?)?/; // Includes optional seconds and milliseconds
    const regexToday = /astăzi la ora (\d{1,2}):(\d{1,2})(?::(\d{1,2})(?::(\d{1,3}))?)?/; // Includes optional seconds and milliseconds
    const reportDateFormat = /^(ian\.|feb\.|mar\.|apr\.|mai\.|iun\.|iul\.|aug\.|sep\.|oct\.|noi\.|dec\.) (\d{1,2}), (\d{1,2}):(\d{1,2})$/; // Format: oct. 20, 12:47

    let match;

    // Check for the full date format
    if ((match = regexDateTime.exec(input))) {
        const day = parseInt(match[1], 10);
        const month = parseInt(match[2], 10) - 1; // Month is zero-based in JS
        const hours = parseInt(match[3], 10);
        const minutes = parseInt(match[4], 10);
        const seconds = match[5] ? parseInt(match[5], 10) : 0; // Handle seconds
        const milliseconds = match[6] ? parseInt(match[6], 10) : 0; // Handle milliseconds

        return new Date(today.getFullYear(), month, day, hours - 1, minutes - minutesOffset, seconds, milliseconds);
    }

    // Check for "mâine"
    if ((match = regexTomorrow.exec(input))) {
        const hours = parseInt(match[1], 10);
        const minutes = parseInt(match[2], 10);
        const seconds = match[3] ? parseInt(match[3], 10) : 0; // Handle seconds
        const milliseconds = match[4] ? parseInt(match[4], 10) : 0; // Handle milliseconds

        // Set the time to tomorrow
        return new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), hours - 1, minutes - minutesOffset, seconds, milliseconds);
    }

    // Check for "astăzi"
    if ((match = regexToday.exec(input))) {
        const hours = parseInt(match[1], 10);
        const minutes = parseInt(match[2], 10);
        const seconds = match[3] ? parseInt(match[3], 10) : 0; // Handle seconds
        const milliseconds = match[4] ? parseInt(match[4], 10) : 0; // Handle milliseconds

        // Set the time to today
        return new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours - 1, minutes - minutesOffset, seconds, milliseconds);
    }

    // Check for "oct. 20, 12:47"
    if ((match = reportDateFormat.exec(input))) {
        const monthMap = {
            ian: 0,
            feb: 1,
            mar: 2,
            apr: 3,
            mai: 4,
            iun: 5,
            iul: 6,
            aug: 7,
            sep: 8,
            oct: 9,
            noi: 10,
            dec: 11,
        };

        const month = monthMap[match[1].slice(0, 3)];
        const day = parseInt(match[2], 10);
        const hours = parseInt(match[3], 10);
        const minutes = parseInt(match[4], 10);

        return new Date(today.getFullYear(), month, day, hours - 1, minutes - minutesOffset);
    }

    return input;
}
