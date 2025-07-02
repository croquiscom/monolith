import { render } from '@testing-library/react';

import { Stack } from './Stack';
import '@testing-library/jest-dom';

describe('Stack', () => {
  it('자식 컴포넌트들을 렌더링합니다', () => {
    const { getByText } = render(
      <Stack>
        <div>1번</div>
        <div>2번</div>
        <div>3번</div>
      </Stack>,
    );
    expect(getByText('1번')).toBeInTheDocument();
    expect(getByText('2번')).toBeInTheDocument();
    expect(getByText('3번')).toBeInTheDocument();
  });

  it('direction prop이 정상적으로 적용됩니다', () => {
    const { container } = render(
      <Stack direction='column'>
        <div>1번</div>
      </Stack>,
    );
    expect(container.firstChild).toHaveStyle({
      display: 'flex',
      flexDirection: 'column',
    });
  });

  it('wrap prop이 정상적으로 적용됩니다', () => {
    const { container } = render(
      <Stack wrap='wrap'>
        <div>1번</div>
      </Stack>,
    );
    expect(container.firstChild).toHaveStyle({
      display: 'flex',
      flexWrap: 'wrap',
    });
  });

  it('align prop이 정상적으로 적용됩니다', () => {
    const { container } = render(
      <Stack align='center'>
        <div>1번</div>
      </Stack>,
    );
    expect(container.firstChild).toHaveStyle({
      display: 'flex',
      alignItems: 'center',
    });
  });

  it('justify prop이 정상적으로 적용됩니다', () => {
    const { container } = render(
      <Stack justify='center'>
        <div>1번</div>
      </Stack>,
    );
    expect(container.firstChild).toHaveStyle({
      display: 'flex',
      justifyContent: 'center',
    });
  });

  it('gap prop이 정상적으로 적용됩니다', () => {
    const { container } = render(
      <Stack gap={10}>
        <div>1번</div>
      </Stack>,
    );
    expect(container.firstChild).toHaveStyle({ gap: '10px' });
  });

  it('width prop이 정상적으로 적용됩니다', () => {
    const { container } = render(
      <Stack width={100}>
        <div>1번</div>
      </Stack>,
    );
    expect(container.firstChild).toHaveStyle({ width: '100px' });
  });

  it('height prop이 정상적으로 적용됩니다', () => {
    const { container } = render(
      <Stack height={100}>
        <div>1번</div>
      </Stack>,
    );
    expect(container.firstChild).toHaveStyle({ height: '100px' });
  });

  it('margin prop이 정상적으로 적용됩니다', () => {
    const { container } = render(
      <Stack m={24}>
        <div>1번</div>
      </Stack>,
    );
    expect(container.firstChild).toHaveStyle({ margin: '24px' });
  });

  it('padding prop이 정상적으로 적용됩니다', () => {
    const { container } = render(
      <Stack p={16}>
        <div>1번</div>
      </Stack>,
    );
    expect(container.firstChild).toHaveStyle({ padding: '16px' });
  });

  it('모든 props가 정상적으로 적용됩니다', () => {
    const { container } = render(
      <Stack
        direction='column'
        wrap='nowrap'
        align='center'
        justify='center'
        gap={10}
        width={100}
        height={100}
        m={24}
        p={16}
        mt={16}
        ml={24}
        mr={24}
        mb={16}
        pt={16}
        pl={24}
        pr={24}
        pb={16}
      >
        <div>1번</div>
      </Stack>,
    );
    expect(container.firstChild).toHaveStyle({
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'nowrap',
      alignItems: 'center',
      justifyContent: 'center',
    });
    expect(container.firstChild).toHaveStyle({
      gap: '10px',
      width: '100px',
      height: '100px',
      margin: '16px 24px 16px 24px',
      padding: '16px 24px 16px 24px',
    });
  });
});
