## 🗺프로젝트 아키텍처

![image](https://github.com/jhchoi1182/next-todo/assets/116577489/c959ef3f-656d-4d22-b713-34fcf3006a44)

## 🎉소개

이 프로젝트는 배운 기술을 실제로 적용하며 점진적으로 기능을 추가해 나가는 것을 목표로 진행되고 있는 개인 프로젝트입니다.

<br>

현재 서비스 포맷 - 게시판 서비스  
백엔드 코드 - https://github.com/jhchoi1182/pet-project-back

<br>

## ✨특징

- Next.js + 스프링 부트 풀스택 게시판 서비스
- 소셜 로그인 기능
- PWA 적용
- SEO 최적화 (구글 검색 결과에 노출)
- JavaScript로 정의된 CSS 스타일을 Tailwind CSS의 설정으로 이전하여 FCP 속도 개선
- 페이지 네이션 기능 (각 페이지를 캐시해서 페이지 이동 간 API 호출 최적화)
- invalidateQueries 대신 optimistic uptade 사용
- 상세 페이지에 ISR + SSR 혼합 방식 사용
- 상세 페이지의 API 요청 병렬처리