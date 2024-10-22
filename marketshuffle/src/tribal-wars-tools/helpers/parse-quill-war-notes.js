const parseQuillDefensiveNote = (quill) => {

    const dateMatch = quill.match(/(ian\.|feb\.|mar\.|apr\.|mai\.|iun\.|iul\.|aug\.|sep\.|oct\.|noi\.|dec\.)\s*(\d{1,2}),\s*(\d{1,2}):(\d{2})/);
    const dateTime = dateMatch ? dateMatch[0].trim() : '';

    const id = crypto.randomUUID();

    const targetMatch = quill.match(/(atacă|spionează)\s([^\(]+ \(\d+\|\d+\) K\d{2})/);
    const target = targetMatch ? targetMatch[2].trim() : '';

    const links = extractLinks(quill) || []; // Ensure links is always an array
    const world = extractWorld(quill); // Extract the world number

    return { id, dateTime, target, links, world };
};