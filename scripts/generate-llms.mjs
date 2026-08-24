/**
 * TSDoc 주석(typedoc JSON)에서 AI 어시스턴트용 API 치트시트(llms.txt)를 생성합니다.
 *
 * 문서의 단일 원천은 소스 코드의 TSDoc 주석입니다.
 * Docusaurus 문서와 llms.txt 는 모두 같은 주석에서 생성되므로 별도 관리가 필요 없습니다.
 *
 * 실행: pnpm generate:llms (release:package 에서 자동 실행됨)
 */
import { execSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));

// typedoc HTML 출력(docs/)을 건드리지 않도록 임시 디렉토리에 생성합니다.
const tmp = mkdtempSync(join(tmpdir(), 'monolith-typedoc-'));
const jsonPath = join(tmp, 'api.json');
try {
  execSync(`npx typedoc --json "${jsonPath}" --out "${join(tmp, 'html')}"`, {
    cwd: root,
    stdio: ['ignore', 'ignore', 'inherit'],
  });
  const api = JSON.parse(readFileSync(jsonPath, 'utf8'));
  writeFileSync(join(root, 'llms.txt'), render(api));
  console.log(`llms.txt generated (${api.children?.length ?? 0} exports)`);
} finally {
  rmSync(tmp, { recursive: true, force: true });
}

function render(api) {
  const categories = { components: [], hooks: [], utils: [] };
  for (const child of api.children ?? []) {
    const file = child.sources?.[0]?.fileName ?? '';
    const category = file.includes('/hooks/')
      ? 'hooks'
      : file.includes('/components/')
        ? 'components'
        : 'utils';
    categories[category].push(child);
  }

  const lines = [
    `# @croquiscom/monolith v${pkg.version}`,
    '',
    '카카오스타일 프론트엔드 공통 유틸리티 라이브러리 (React 17/18/19).',
    '유틸 함수, 커스텀 훅, 공통 컴포넌트를 직접 구현하기 전에 반드시 이 목록에 있는지 먼저 확인하고, 있으면 이 패키지를 사용할 것.',
    '이 파일은 소스 TSDoc 주석에서 자동 생성됨. 상세 문서: https://croquiscom.github.io/monolith',
    '',
  ];
  for (const [title, items] of Object.entries(categories)) {
    if (items.length === 0) continue;
    lines.push(`## ${title}`, '');
    for (const item of items.sort((a, b) => a.name.localeCompare(b.name))) {
      lines.push(...renderExport(item));
    }
  }
  return lines.join('\n');
}

function renderExport(item) {
  const comment = item.comment ?? item.signatures?.[0]?.comment;
  const summary = text(comment?.summary).trim();
  const example = comment?.blockTags?.find((tag) => tag.tag === '@example');

  const lines = [`### ${item.name}`, ''];
  lines.push(summary || '(설명 주석 없음)');
  if (example) {
    const code = text(example.content).trim();
    lines.push('', code.startsWith('```') ? code : '```jsx\n' + code + '\n```');
  }
  lines.push('');
  return lines;
}

function text(parts) {
  return (parts ?? []).map((part) => part.text ?? '').join('');
}
