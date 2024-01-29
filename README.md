## 🗺프로젝트 아키텍처

![image](https://github.com/jhchoi1182/next-todo/assets/116577489/c959ef3f-656d-4d22-b713-34fcf3006a44)

## 🎉소개
이 프로젝트는 배운 기술을 실제로 적용하며 점진적으로 기능을 추가해 나가는 것을 목표로 진행되고 있는 개인 프로젝트입니다.   

<br>

현재 기능 - Todo 게시판   
백엔드 코드 - https://github.com/jhchoi1182/pet-project-back

<br>

## ✨특징
* Todo 게시판 프로젝트
  * 로컬 로그인/회원가입 기능
  * todo(contents, dueDate, isDone)
  * Next.js 14버전을 이용해 각 todo 상세 페이지와 댓글 기능 구현
* Next.js + 스프링 부트 풀스택 개발
* Mongo DB를 Spring Boot 서버 API로 마이그레이션한 결과 렌더링 속도 46.22% 개선
* MVC 패턴 적용

<br>

## 📝트러블 슈팅: 렌더링 속도 개선

<br>

기본적인 CRUD임에도 체감상 몽고DB의 req / res 속도가 너무 느리다고 느껴짐

<br>

**로직 변경 1**   
async / await를 기다릴 필요 없이 Optimistic Updates 시킨 후 오류나면 원래대로 되돌리는 로직으로 수정

<br>

**로직 변경 2**   
response로 받아오는 값들 중 불필요한 값들은 메시지로 바꿔서 req/res 속도 단축 시도

<br>

**로직 변경 3**   
React-Query + SWR 기능을 수행하고 사용법도 동일한 커스텀훅으로 개발 후 적용

<br>

**렌더링 속도 테스트**

- 측정 항목 - isDone 수정 시 렌더링 반영까지 걸리는 시간
- 측정 조건 - todo가 10개일 때 수정이 반영되기까지 걸리는 시간

<br>

**before : 10번 평균 3.7ms**

 ![image](https://github.com/jhchoi1182/next-todo/assets/116577489/89c418fd-51e5-40b8-a3bc-193b81cf4440)

<br>

**after : 10번 평균 1.97ms**

![image](https://github.com/jhchoi1182/next-todo/assets/116577489/25ada9e9-d9be-4f34-92bf-b11432788951)

<br>

**렌더링 속도 46.76% 개선**

<br>

**로직 변경 4**   
Next.js 서버사이드에서 Mongo DB를 이용하던 방식을 Spring Boot 서버 API와 연결하는 방식으로 마이그레이션

<br>

**로직 변경 5**   
연결해야하는 api가 늘어남에 따라 React-Query + SWR 기능의 커스텀훅을 삭제한 후 axios와 React-Query로 대체

<br>

**서버 교체 후 : 10번 평균 1.99ms**

![image](https://github.com/jhchoi1182/next-todo/assets/116577489/3bb55d15-cd32-4914-ba09-9ff0b329e1d4)

<br>

**최종 46.22% 개선**
