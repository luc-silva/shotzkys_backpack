const fs = require("node:fs").promises;

async function batchUpdateFiles(src) {
    let dirs = await fs.readdir(src);
    console.log(dirs);

    if (dirs && dirs.length > 0) {
        for (const item of dirs) {
            const path = `${src}/${item}`;
            const stat =
                await fs.stat(path);

            if (stat.isDirectory()) {
                await batchUpdateFiles(
                    path
                );
            }

            if (
                stat.isFile() &&
                item.match(/.recipe$/i)
            ) {
                let fileContent =
                    await fs.readFile(
                        path
                    );
            }
        }
    }
}

batchUpdateFiles("src");
