# 카카오스타일 FE 공통 패키지 - Monolith [BETA]

`Monolith` 패키지는 카카오스타일 FE 에서 공통으로 사용하는 `Hook`, `Component`, `Util`, `Constant` 를 제공하기 위한 패키지 입니다.

## 작업시 주의사항

`Monolith` 패키지의 목적은 모든 카카오스타일 FE 프로덕트에서 사용되는것을 목적으로 제공됩니다.
때문에 전체가 아닌 한개의 프로젝트 혹은 일부 프로젝트에서 사용되는 `Hook`, `Component`, `Util`, `Constant` 의 추가는 금지됩니다.

예외적으로 많은 프로젝트에서 사용하는 경우 `FE챕터 구성원`들과 논의후 추가는 가능합니다.

## 가이드 리스트

개발 기여, 세팅 등에 필요한 정보는 아래 각 가이드를 참고후 작업하시면 됩니다.

- [컨벤션\_가이드](./docusaurus/convention.md)
- [개발*세팅*가이드](./docusaurus/setting.md)
- [작업\_가이드](./docusaurus/developer.md)

## AI 어시스턴트(Claude 등)와 함께 사용하기

이 패키지는 AI 코딩 어시스턴트용 API 치트시트 `llms.txt` 를 포함하여 배포됩니다.
설치하면 `node_modules/@croquiscom/monolith/llms.txt` 경로에 전체 API 목록(설명 + 사용 예제)이 존재하며,
소스 코드의 TSDoc 주석에서 자동 생성되므로 항상 설치된 버전과 일치합니다.

AI 어시스턴트가 이미 monolith 에 있는 유틸/훅을 재구현하지 않고 우선 사용하도록 하려면,
**사용하는 프로젝트의 `CLAUDE.md`(또는 `AGENTS.md`)에 아래 내용을 추가해 주세요.**

```markdown
## 공통 라이브러리
- 유틸/훅/공통 컴포넌트를 새로 작성하기 전에 반드시 @croquiscom/monolith 에 있는지 먼저 확인
- API 목록: node_modules/@croquiscom/monolith/llms.txt 를 읽고 판단할 것
- debounce/throttle/delay, 디바이스 판별(isIos/isAndroid), 조건 분기(When) 등은 직접 구현 금지
```

> `llms.txt` 는 배포 시점에 자동 재생성됩니다. 새 유틸을 추가할 때는 TSDoc 주석(설명 + `@example`)만
> 컨벤션에 맞게 작성하면 별도 작업 없이 치트시트에 반영됩니다.

## 패키지 변경사항

패키지별 업데이트 히스토리는 아래 문건 참고 부탁드립니다.

- [CHANGELOG](./CHANGELOG.md)
