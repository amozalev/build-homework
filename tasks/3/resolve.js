import fs from "node:fs";
import path from "node:path";

const packageJSON = JSON.parse(fs.readFileSync("./package.json", "utf-8"));

const {imports} = packageJSON;
const rootDir = path.resolve(".");

const extensionsToResolve = ["js", "ts", "json"];

export function resolve(importPath, parentPath) {
    const importsArr = Object.keys(imports);
    // resolve aliases
    for (const alias of importsArr) {
        const filePath = getFilePathWithExt(path.join(imports[alias], path.relative(alias, importPath)), './', extensionsToResolve);
        if (filePath) {
            return filePath;
        }
    }

    // resolve full path
    const filePath = getFilePathWithExt(importPath, parentPath, extensionsToResolve);
    if (filePath) {
        return filePath;
    }

    return null;
}

function getFilePathWithExt(importPath, parentPath, extensionsToResolve) {
    // extension exists in importPath
    const extension = path.extname(importPath);
    const filePath = getFilePath(importPath, parentPath);
    if (extension && filePath) {
        return filePath;
    }

    // importPath without extension
    for (const ext of extensionsToResolve) {
        const importPathWithExt = `${importPath}.${ext}`;
        const filePath = getFilePath(importPathWithExt, parentPath);
        if (filePath) {
            return filePath;
        }
    }

    return null;
}

function getFilePath(importPath, parentPath) {
    const parentDirname = path.dirname(parentPath);

    const filePath = path.resolve(parentDirname, importPath);
    if (isFileExists(filePath)) {
        return filePath;
    }
    return null;
}

function isFileExists(filePath) {
    try {
        fs.readFileSync(filePath);
        return filePath;
    } catch (err) {
        return null;
    }
}
