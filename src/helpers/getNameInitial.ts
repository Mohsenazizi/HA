export function getNameInitial(fullName: string) {
    if (!fullName) {
        return;
    }
    return fullName!.match(/(\b\S)?/g)!.join("")!.match(/(^\S|\S$)?/g)!.join("").toUpperCase()
}