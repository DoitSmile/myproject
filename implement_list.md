우선적으로 넣을 기능/페이지/api 
-------------------

** User **
auth ->
로그인) token을 발급받아서  로그인
회원가입) 핸드폰으로 전송된 토큰과 입력한 토큰 일치확인
회원수정,회원조회) -> 인증필요 (token)으로 인증
회원삭제-> 비밀번호 입력

api ->
유저조회api
유저수정api
유저삭제api

page -> 
회원가입/회원정보/ 


추후 추가할 기능/페이지
-------------------
관리자페이지 

소셜로그인
포트원으로 결제

** 가상환경 **
docker
gcp 사용 / repository gcp 이용하기 
redis


넣은 기능 
-------------------
회원가입) token생성하여 입력한 핸드폰으로 전송 ( coolsms사용)
유저생성api