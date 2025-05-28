# @croquiscom/monolith

KakaoStyle frontend common utility library monorepo

## Packages

This monorepo contains the following packages:

### [@croquiscom/monolith](./packages/utils)
React.js 관련 공통 함수, Hook 등을 제공하는 유틸리티 패키지

### [@croquiscom/eslint-config](./packages/eslint-config)
KakaoStyle 프로젝트를 위한 공통 ESLint 설정 패키지

## Getting Started

### Prerequisites
- Node.js >= 18
- pnpm >= 9.14.2

### Installation

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test
```

## Development

이 프로젝트는 [Turborepo](https://turbo.build/repo)를 사용하여 모노레포를 관리합니다.

### Available Scripts

- `pnpm dev` - 모든 패키지를 개발 모드로 실행
- `pnpm build` - 모든 패키지 빌드
- `pnpm lint` - 모든 패키지 린트 검사
- `pnpm test` - 모든 패키지 테스트 실행
- `pnpm changeset` - 변경사항 기록
- `pnpm version-packages` - 패키지 버전 업데이트
- `pnpm release` - 패키지 배포

### Adding a New Package

1. `packages/` 디렉토리에 새 폴더 생성
2. `package.json` 파일 생성
3. 필요한 설정 파일 추가
4. 루트에서 `pnpm install` 실행

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT
