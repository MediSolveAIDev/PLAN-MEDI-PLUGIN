# Medisolveai 사내 기획 플러그인

Medisolveai 사내 기획자용 Claude Code 플러그인입니다.

## 설치 방법

```bash
/plugin marketplace add MediSolveAIDev/PLAN-MEDI-PLUGIN
/plugin install plan-medi-plugin@plan-medi-plugin
```

## 포함 구성 요소

| 구성 요소 | 경로 | 설명 |
|-----------|------|------|
| Command | `commands/Hello.md` | 인사 커맨드 |
| Agent | `agents/medical-planner.md` | 기획 에이전트 |
| Hooks | `hooks/hooks.json` | 훅 설정 |
| MCP | `.mcp.json` | MCP 서버 설정 |

## 검증

```bash
claude --plugin-dir .
```

## 라이선스

MIT License
