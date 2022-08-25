import { initializeApp } from "firebase/app";
import { getDatabase, set, update, ref } from "firebase/database";
import axios from 'axios';
import cheerio from 'cheerio';

const firebaseConfig = {
    apiKey: "AIzaSyD3rq7xxnofkGwajV6D62BXGJ4WfF0MIMc",
    authDomain: "fbsimplescraper.firebaseapp.com",
    databaseURL: "https://fbsimplescraper-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fbsimplescraper",
    storageBucket: "fbsimplescraper.appspot.com",
    messagingSenderId: "865553940068",
    appId: "1:865553940068:web:b760ad2a07b362dc796971",
    measurementId: "G-WZPW4DCQGW"
  };

// initialize firebase
const app = initializeApp(firebaseConfig);

// export && initialize realtime database
const database = getDatabase(app);

let today = new Date();

axios.get('https://gall.dcinside.com/board/lists?id=bitcoins_new1')
    .then((htmlParse) => {
        const $ = cheerio.load(htmlParse.data);
        let arr =[];

        $('tbody tr').each((index, element)=>{

            arr.push({
                num : $(element).find('.gall_num').text(),
                title : $(element).find('a').text().trim(),
                time : $(element).find('.gall_date').text(),
                date : today.toLocaleDateString()
            });
        });

        set(ref(database,'dcdata'),arr);

    });

app.delete()

