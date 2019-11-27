# stupid-great
WebSystemDesign

http://35.194.116.240:8081

### Requirements (Linux)

- node & npm
```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```

- mongoDB
```
sudo apt-get install mongodb-server mongodb-clients
```

- pm2
```
npm install pm2 -g
```

### Build

```
/frontend
npm install
npm run build

/backend
npm install 
pm2 start bin/www --watch (for background running)
```
=>http://localhost:8081

### Notice

#12/05
- home에 로딩되는 이미지랑 살까말까 게시판에 있는 이미지의 경로가 public폴더로 되어있어서 public/static/img에 이미지가 저장되어있는경우 
정상적으로 이미지가 로딩이 되지만, npm run build 하고나면 backend 폴더의 public폴더가 계속 초기화?? public폴더의 내용이 계속 바뀌어지기 때문에 
home에 있는 이미지랑 살까말까 게시판 이미지가 안불러와질 수 있어요.
이미지를 넣으면 정상적으로 작동해요! 그래서 이 에러는 무시하시고 진행하시면 됩니다.



#11/29
session 관련 수정사항
- 로그인 할 때 sessionstorage 에 jwt,id,session-id 의 key를 가진 세 개의 값이 저장
- jwt 값에는 유저의 id, email, sex, age, job 이 암호화되어 들어가있음

  - /users/verify 에 session에 저장된 jwt의 값을 token 이라는 이름으로 axios 요청 보내주면 유저데이터 (id, email, sex, age, job) 반환해줌
    
    - frontend/src/views/Test.vue  에 getUserData method 참고
    
- id 값에는 유저의 id가 있는 그대로 저장되어 있음
  - frontend 에서 this.$session.get('id')로 userid 받아서 바로 로그인하고 있는 유저에 관한 정보 바로 갖고 오려고 만들어놓음
  


제가 잘못 이해했거나 더 좋은 방법이 있으면 수정하시고 알려주세요!
