import DataUriParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
    if (!file) return null;
    const parser = new DataUriParser();
    const extName = path.extname(file.originalname).toString(); // e.g. ".pdf"
    const formatted = parser.format(extName, file.buffer); // returns {content: 'data:...'}
    // Return the object that has .content (so your controllers can use fileUri.content)
    return formatted;
}

export default getDataUri;
