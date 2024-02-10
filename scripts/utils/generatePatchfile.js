const fs = require("node:fs").promises;

async function readDirectory(path, objects = []) {
    let data = await fs.readdir(path);

    for (const element of data) {
        const item = `${path}/${element}`;
        let stat = await fs.stat(item);

        if (stat.isDirectory()) {
            await readDirectory(item, objects);
        } else if (item.match(/.*.object/)) {
            try {
                let content = await fs.readFile(item, "utf-8");
                let object = JSON.parse(content);
                objects.push(object.objectName);
            } catch (e) {
                console.error(e);
            }
        }
    }

    return objects;
}

module.exports = { readDirectory };
