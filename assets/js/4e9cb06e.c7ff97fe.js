"use strict";(self.webpackChunk_croquiscom_monolith=self.webpackChunk_croquiscom_monolith||[]).push([[787],{3881:(e,n,s)=>{s.d(n,{R:()=>i,x:()=>c});var o=s(8101);const t={},r=o.createContext(t);function i(e){const n=o.useContext(r);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:i(e.components),o.createElement(r.Provider,{value:n},e.children)}},4436:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>d,contentTitle:()=>c,default:()=>l,frontMatter:()=>i,metadata:()=>o,toc:()=>a});const o=JSON.parse('{"id":"api/hooks/functions/useCountDownTimer","title":"useCountDownTimer()","description":"\uc8fc\uc5b4\uc9c4 \uc2dc\uac04 \uae4c\uc9c0 1159:99 \ud615\ud0dc\uc758 \uce74\uc6b4\ud2b8\ub2e4\uc6b4\uc744 \ud45c\ud604\ud558\uae30 \uc704\ud574 \uc0ac\uc6a9\ud558\ub294 hook \uc785\ub2c8\ub2e4.","source":"@site/docs/api/hooks/functions/useCountDownTimer.md","sourceDirName":"api/hooks/functions","slug":"/api/hooks/functions/useCountDownTimer","permalink":"/docs/api/hooks/functions/useCountDownTimer","draft":false,"unlisted":false,"editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/api/hooks/functions/useCountDownTimer.md","tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"hooks","permalink":"/docs/api/hooks/"},"next":{"title":"useIsMounted()","permalink":"/docs/api/hooks/functions/useIsMounted"}}');var t=s(5105),r=s(3881);const i={},c="useCountDownTimer()",d={},a=[{value:"Parameters",id:"parameters",level:2},{value:"Returns",id:"returns",level:2},{value:"Example",id:"example",level:2}];function u(e){const n={code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"usecountdowntimer",children:"useCountDownTimer()"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"function useCountDownTimer(__namedParameters): CountdownType\n"})}),"\n",(0,t.jsx)(n.p,{children:"\uc8fc\uc5b4\uc9c4 \uc2dc\uac04 \uae4c\uc9c0 11:59:59:99 \ud615\ud0dc\uc758 \uce74\uc6b4\ud2b8\ub2e4\uc6b4\uc744 \ud45c\ud604\ud558\uae30 \uc704\ud574 \uc0ac\uc6a9\ud558\ub294 hook \uc785\ub2c8\ub2e4.\nhour, minute, second, millisecond \ub2e8\uc704 \uae4c\uc9c0 \uc9c0\uc6d0 \ud569\ub2c8\ub2e4.\n\ucd94\uac00\uc801\uc73c\ub85c ms \ub2e8\uc704\uae4c\uc9c0 \ud45c\ud604\ud558\ub2e4 \ubcf4\ub2c8 \uc131\ub2a5\uc0c1\uc758 \uc774\uc288\uac00 \uc788\uc744\uc218 \uc788\uc5b4 \uc791\uc5c5\uc2dc rerender \uc774\uc288\ub97c \uccb4\ud06c\ud558\uba74\uc11c \ud574\uc8fc\uc2dc\uba74 \uc88b\uc2b5\ub2c8\ub2e4."}),"\n",(0,t.jsx)(n.h2,{id:"parameters",children:"Parameters"}),"\n",(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{children:"Parameter"}),(0,t.jsx)(n.th,{children:"Type"})]})}),(0,t.jsx)(n.tbody,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"__namedParameters"})}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"CountdownProps"})})]})})]}),"\n",(0,t.jsx)(n.h2,{id:"returns",children:"Returns"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.code,{children:"CountdownType"})}),"\n",(0,t.jsx)(n.h2,{id:"example",children:"Example"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-tsx",children:"  // MEMO: 1\uc2dc\uac04 \uce74\uc6b4\ud2b8 \ub2e4\uc6b4\n  const { days, hours, minutes, seconds, milliseconds } = useTimer({ timestamp: dayjs().add(1, 'hours').valueOf() })\n  console.log(days)  // \ub0a8\uc740 \uc77c\n  console.log(hours)  // \ub0a8\uc740 \uc2dc\uac04\n  console.log(minutes)  // \ub0a8\uc740 \ubd84\n  console.log(seconds)  // \ub0a8\uc740 \ucd08\n  console.log(milliseconds)  // \ub0a8\uc740 \ubc00\ub9ac \uc138\ucee8\ub4dc\n\nms \ub97c \uc548\uc4f0\uace0 second \ub2e8\uc704 \uae4c\uc9c0\ub9cc \uc0ac\uc6a9\uc774 \ud544\uc694\ud55c \uacbd\uc6b0\n  // MEMO: \ucd08\ub2e8\uc704 \uc4f0\ub85c\ud2c0\ub9c1 \uc801\uc6a9\n  const { days, hours, minutes, seconds, milliseconds } = useTimer({ timestamp: dayjs().add(1, 'hours').valueOf(), throttle_time: 1_000 })\n"})})]})}function l(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(u,{...e})}):u(e)}}}]);