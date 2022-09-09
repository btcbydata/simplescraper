# simplescraper
실시간으로 커뮤니티 게시판의 글번호, 글, 시간을 수집하는 크롤러 

## 폴더 구조
> new_scraper : 파이썬으로 다시 구현한 실시간 스크레이퍼 폴더. firebase의 realtime database로 데이터를 수집함.
>
> node_modules, functions (노드 의존성과 google function 관련 폴더, .gitignore로 무시됨)
>
> simplescraper.js : node.js로 구현된 스크레이퍼. google function 상에서 작동하며 realtime database에 데이터 수집. 현재는 콜백 오류로 작동 정지.
