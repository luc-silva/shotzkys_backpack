const fs = require("node:fs").promises;
const nodepath = require("node:path");

async function prepare(src) {
    try {
        let teste = await fs.access("out");
        if (!teste) {
            await fs.rm("out", { recursive: true, force: true });
        }
    } catch (e) {
        console.error(e);
    }

    await fs.mkdir("out");
    await fs.mkdir("out/objects");
    await fs.mkdir("out/recipes");

    try {
        let teste = await fs.access(`out/player.config.patch`);
        if (!teste) {
            await fs.rm(`out/player.config.patch`);
        }
    } catch (e) {
        console.error(e);
    }

    try {
        await fs.copyFile("src/player.config.patch", "out/player.config.patch");
    } catch (e) {
        console.error("config.patch file not found");
    }

    createObjectFolderStructure(src);
}

async function createObjectFolderStructure(src) {
    let items = await fs.readdir(src);
    for (const item of items) {
        let itemPath = nodepath.join(src, item);
        let objectFolderPath = itemPath.replace("src", `out/objects`);
        let recipesFolderPath = itemPath.replace(src, `out/recipes`);

        let stat = await fs.stat(itemPath);
        if (stat.isDirectory()) {
            if (item.match(/^interface/)) {
                await fs.cp("src/interface", "out/interface", {
                    recursive: true,
                });
            } else {
                await fs.mkdir(objectFolderPath);
                await createObjectFolderStructure(itemPath);
            }
        } else if (
            stat.isFile() &&
            itemPath.match(/.*\.(frames|png|object|animation)$/i)
        ) {
            await fs.copyFile(itemPath, objectFolderPath);
        } else if (stat.isFile() && itemPath.match(/.*\.recipe$/i)) {
            await fs.copyFile(itemPath, recipesFolderPath);
        } else {
            console.log(`File not identified: ${itemPath}`);
        }
    }
}

module.exports = { prepare };
