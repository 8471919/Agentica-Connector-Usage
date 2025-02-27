## Agentica-Connector Usage

- 본 레포지토리는 `@agentica/core` 라이브러리의 툴로써 `@wrtnlabs/connector` 를 사용하는 예제를 제공합니다.

## Goal

- 최종적으로는 `handmadeAgent`와 `kakaoMapAgent`, `gmailAgent`를 사용하여 Agent를 만들고, 이를 통해 다음과 같은 대화를 할 수 있어야 합니다.

```
"내 이메일을 알려줘."
"내 이메일을 변경해줘."
"강남역 근처 맛집을 찾아서 내 메일로 보내줘."
```

## 주요 폴더 구조

- `src/agents/` : Agent 구현 폴더
- `src/tools/` : 직접 구현한 클래스 폴더
- `src/gpt.ts` : GPT 설정 파일
- `src/main.ts` : 실행 파일

## 실행 방법

먼저, `.env` 파일을 생성하고 다음과 같이 설정해주세요.
해당 Key들은 직접 발급 받으셔야합니다.

```
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_TEST_SECRET=
KAKAO_TALK_CLIENT_ID=
```

- 만약 Kakao Map Agent만 사용하실 경우 KAKAO_TALK_CLIENT_ID만 입력해주시면 됩니다.
- 만약 Gmail Agent만 사용하실 경우 Google과 관련된 환경 변수들만 입력해주시면 됩니다.

```bash
npm install

npm run dev
```
