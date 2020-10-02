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
                        English: row.English,
                        Arabic: row.Arabic
                        // Add new language here
                    };
                }
                fs.writeFileSync(jsonFilePath, JSON.stringify(localization));
            }
        });
        console.log('done.');
    }
}

const csvFile = 'static/localization/localization.csv';
const outputJson = 'static/localization/localization.json';
CSVParser.parseLocalization(csvFile, outputJson);

