---
title: Monolith 개발환경 세팅
description: 프로젝트개발시 설치 및 실행 가이드를 제공합니다.
---

# 프로젝트 설치 및 실행 가이드

monolith 패키지의 패키지매니저는 pnpm을 사용중입니다.

## 프로젝트 설치

### 1. pnpm 설치

```
$ nvm install
```

```
$ nvm use
```

```
$ npm install -g pnpm@9.14.2
```

or corepack 사용시

```
## corepack이 지원중단예정이라 최대한 피해주세요.
$ corepack enable
```

```
$ corepack prepare pnpm@9.14.2 --activate
```

### 2. 프로젝트 의존성 설치

```
$ pnpm install
```

### docusaurus 문서 로컬 실행

```
$ pnpm docs:start
```

### 테스트 실행

```
$ pnpm test
```
