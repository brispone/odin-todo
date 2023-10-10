// Dates should be added in the format of YYYY-MM-DD

function createTask (title, desc, dueDate, highPriority) {
    const completed = false;
    return {
        title,
        desc,
        dueDate,
        highPriority,
        completed
    };
}

export { createTask };