const fs = require("node:fs").promises;

console.log("teste")
async function batchUpdateFiles(src) {
    let dirs = await fs.readdir(src);
    console.log(dirs);

    if (dirs && dirs.length > 0) {
        for (const item of dirs) {
            const path = `${src}/${item}`;
            const stat = await fs.stat(path);

            if (stat.isDirectory()) {
                await batchUpdateFiles(path);
            }

            if (stat.isFile() && item.match(/.recipe$/i)) {
                let fileContent = await fs.readFile(path)
                

            }
        }
    }
}

batchUpdateFiles("src");

//objeto dizendo as propriedades de edição em massa
    //propriedade q marca o tipo de arquivo a ser modificado
    //propriedade q marca se deve fazer um backpup ou n
    //propriedade q marca uma pasta especifica. se n tiver preenchido, usa src como padrão
    //propriedade contendo as propriedades desse tipo de arquivo a serem editados
        //propriedade de configuração q determina se deve ser sobrescrito ou adicionado (se for array)
    //deve verificar se caso o tipo de arquivo for frames se os numeros são multiplos de 8
    //se for object, verificar se existem icone e gerar arquivos listando os objetos