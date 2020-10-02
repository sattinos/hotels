const path = require('path');
const fs = require('fs-extra');
const parse = require('csv-parse');


class CSVParser {
    public static parseLocalization(localizationFile: string, outputJsonFile: string) {
        const csvFilePath = path.resolve(localizationFile);
        const jsonFilePath = path.resolve(outputJsonFile);

        console.log('parsing:', csvFilePath);
        console.log('to:', jsonFilePath);

        const csvFile = fs.readFileSync(csvFilePath, { encoding: 'utf8' });
        parse(csvFile, { columns: true }, (err: any, output: any) => {
            if (err) {
                console.log('parseLocalization(err):', err);
            } else {
                const localization: any = {};
                for (let rowIndex = 0; rowIndex < output.length; rowIndex++) {
                    const row = output[rowIndex];
                    if (row.key.length === 0) {
                        continue;
                    }
                    localization[row.key] = {
                        en: row.en,
                        ar: row.ar
                    };
                }
                fs.writeFileSync(jsonFilePath, JSON.stringify(localization));
            }
        });
        console.log('done.');
    }
}

CSVParser.parseLocalization('src/assets/localization/localization.csv', 'src/assets/localization/localization.json');