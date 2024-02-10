const { readDirectory } = require("./utils/generatePatchfile");
const { prepare } = require("./utils/generateFolderStructure");
const fs = require("node:fs").promises;

// create config.patch file
readDirectory("src")
    .then((items) => {
        return items.map((item) => ({
            op: "add",
            path: "/defaultBlueprints/tier1/-",
            value: { item },
        }));
    })
    .then(JSON.stringify)
    .then(async (data) => {
        await fs.writeFile("src/player.config.patch", data);
        console.log("config.patch generated")
    })
    .catch((e) => {
        console.error(`Something went wrong: ${e}`);
    });

//create out/dist folder
prepare("src");
