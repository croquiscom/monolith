# 카카오스타일 FE 공통 패키지 - Monolith

`Monolith` 패키지는 카카오스타일 FE 에서 공통으로 사용하는 `Hook`, `Component`, `Util`, `Constant` 를 제공하기 위한 패키지 입니다.

## 작업시 주의사항

`Monolith` 패키지의 목적은 모든 카카오스타일 FE 프로덕트에서 사용되는것을 목적으로 제공됩니다.
때문에 전체가 아닌 한개의 프로젝트 혹은 일부 프로젝트에서 사용되는 `Hook`, `Component`, `Util`, `Constant` 의 추가는 금지됩니다.

예외적으로 많은 프로젝트에서 사용하는 경우 `FE챕터 구성원`들과 논의후 추가는 가능합니다.

## 주요 기능

### ESLint 설정

일관된 코드 품질을 위한 ESLint 설정을 제공합니다.

- [ESLint 설정 가이드](./eslint.md) - 기본, Next.js, Nx 모노레포 설정 사용법

## 가이드 리스트

개발 기여, 세팅 등에 필요한 정보는 아래 각 가이드를 참고후 작업하시면 됩니다.

- [컨벤션\_가이드](./convention.md)
- [개발*세팅*가이드](./setting.md)
- [작업\_가이드](./developer.md)
- [ESLint 설정 가이드](./eslint.md)
