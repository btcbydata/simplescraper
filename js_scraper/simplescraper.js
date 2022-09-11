import { set, ref, onValue } from "firebase/database";
import { database } from './fbsetting.js';
import axios from 'axios';
import cheerio from 'cheerio';

let today = new Date();

let url = 'https://gall.dcinside.com/board/lists?id=bitcoins_new1';
let repeattime = 1000* 60 * 1; // 5분
let counttime = 0;
let endtime = 1000* 60 * 60 * 24; // 24시간
let array = [];

const starCountRef = ref(database, 'dcdata');

Firebase.clearPersistence();
console.log('clear');

var interval = setInterval(function(){
    let lastnum = 0;
    let array2 =[];

    onValue(starCountRef, (snapshot) => {
        array =snapshot.val();
        lastnum =array[0].num;
    });

    axios.get(url)
    .then((htmlParse) => {
        const $ = cheerio.load(htmlParse.data);

        $('tbody tr').each((index, element)=>{
            if(index>= 5){ //공지글 제거
                array2.push({
                    num : $(element).find('.gall_num').text(),
                    title : $(element).find('a').text().trim(),
                    time : $(element).find('.gall_date').text(),
                    date : today.toLocaleDateString()
                });

            }
        });
        array2.forEach((item, idx)=>{
            if(item.num > lastnum){
                array.push(item);
                console.log(item); // for test output
            }
        })
        array.sort(function(a, b){
            return b.num - a.num;
        });
        lastnum=array.length;
        set(ref(database,'dcdata'),array);
    });
    counttime += repeattime;
    if(counttime > endtime) { clearInterval(interval);};
}, repeattime);

//app.delete()

