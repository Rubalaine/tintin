const search = (from: string, query: string[]): string [] => {
    const results: string[] = [];
    query.forEach((q) => {
        if (from.toLowerCase().search(q.toLowerCase()) > -1) {
            results.push(q);
        }
    });
    return results;
}
export default search;