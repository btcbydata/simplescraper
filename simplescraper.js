const axios = require("axios");
const cheerio = require("cheerio");
const fs = require('fs'); // filesystem

axios.get('https://gall.dcinside.com/board/lists?id=bitcoins_new1')
    .then((htmlParse) => {
        const $ = cheerio.load(htmlParse.data);
        let arr =[];

        $('tbody tr').each((index, element)=>{

            arr.push({
                num : $(element).find('.gall_num').text(),
                title : $(element).find('a').text().trim(),
                date : $(element).find('.gall_date').text()
            });
        });

        fs.writeFile('./articles.json', JSON.stringify(arr), (error) => { // store data into articles.json
            if (error) throw error;
        })

    })
    .catch((error) => {
        console.log(error);
    });