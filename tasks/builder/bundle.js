import fs from "node:fs";
import path from "node:path";
import resolve from "../3/resolve.js";

/**
 * Примерный алгоритм работы бандлера:
 * 1. Прочитать entry и собрать список всех вызовов require
 * 2. Пройтись по полученным require (они могут быть вложенными)
 * 3. На выходе получится массив с исходным кодом всех модулей
 * 4. Склеить всё воедино обернув модули и entry в новый рантайм
 *
 * Для чтения файлов используйте fs.readFileSync
 * Для резолва пути до модуля испльзуйте path.resolve (вам нужен путь до родителя где был вызван require)
 * Пока что сборщик упрощен, считаем что require из node_modules нет
 */

const modules = ['const module = {};\n'];

/**
 * @param {string} entryPath - путь к entry бандлинга
 */
export function bundle(entryPath, dirname = '') {
    const absPath = resolve(entryPath, dirname);
    const file = fs.readFileSync(absPath, {encoding: 'utf8'});

    modules.push(`module['${entryPath}'] = function(module, require){\n${file}\n};`);

    const resp = searchRequireCalls(file);

    const require = (modulePath) => {
        const _module = {
            exports: {}
        };

        module[modulePath](_module, require);

        return _module.exports;
    }

    for (let filePath of resp) {
        bundle(filePath, path.dirname(absPath));
    }

    if (!resp.length) {
        return;
    }

    return `
    ${modules.join('\n')}
    const require = ${require};
    (function(module, require){\n${file}\n})(module, require);
    `;
}

/**
 * Функция для поиска в файле вызовов require
 * Возвращает id модулей
 * @param {string} code
 */
function searchRequireCalls(code) {
    return [...code.matchAll(/require\(('|")(.*)('|")\)/g)].map(
        (item) => item[2]
    );
}


