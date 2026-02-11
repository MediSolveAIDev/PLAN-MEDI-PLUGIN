# Medisolveai 사내 기획 플러그인

Medisolveai 사내 기획자용 Claude Code 플러그인입니다.

## 설치 방법

```bash
/plugin marketplace add k984530/plan-medi-plugin
/plugin install plan-medi@plan-medi-marketplace
```

## 포함 구성 요소

| 구성 요소 | 경로 | 설명 |
|-----------|------|------|
| Skill | `skills/example/SKILL.md` | 예시 스킬 템플릿 |
| Command | `commands/example.md` | 예시 커맨드 템플릿 |
| Agent | `agents/medical-planner.md` | 의료 기획 에이전트 |
| Hooks | `hooks/hooks.json` | 훅 설정 |
| MCP | `.mcp.json` | MCP 서버 설정 |

## 검증

```bash
claude --plugin-dir .
```

## 라이선스

MIT License
