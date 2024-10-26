
export default function capitalize(str:string) {
    if (!str) return str; // Check for an empty string
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}