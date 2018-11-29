# stupid-great
WebSystemDesign

#11/29
session 관련 수정사항
- 로그인 할 때 sessionstorage 에 jwt,id,session-id 의 key를 가진 세 개의 값이 저장
- jwt 값에는 유저의 id, email, sex, age, job 이 암호화되어 들어가있음
  => /users/verify 에 session에 저장된 jwt의 값을 token 이라는 이름으로 axios 요청 보내주면 유저데이터 (id, email, sex, age, job) 반환해줌
    => frontend/src/views/Test.vue  에 getUserData method 참고
    
- id 값에는 유저의 id가 있는 그대로 저장되어 있음
  => frontend 에서 this.$session.get('id')로 userid 받아서 바로 로그인하고 있는 유저에 관한 정보 바로 갖고 오려고 만들어놓음
  


제가 잘못 이해했거나 더 좋은 방법이 있으면 수정하시고 알려주세요!
