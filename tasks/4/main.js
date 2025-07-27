import fs from "node:fs";
import { transformer } from "./transformer.js";
import * as astring from "astring";
import { parse } from "acorn";

// read file with source code
const file = fs.readFileSync("./entry.js", "utf8");

// get ast from source code
const ast = parse(file, {ecmaVersion: 2020, sourceType: "module"});

// transform ast
const transformedAst = transformer(ast);

// for AST debug
const jsonStr = JSON.stringify(ast, null, 2)
fs.writeFileSync("./ast.js", jsonStr);


// convert ast to source code
const astCode = astring.generate(transformedAst);

// write source code to file
fs.writeFileSync("./result.js", astCode);
