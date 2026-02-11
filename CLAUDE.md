# Plan Medi Plugin

사내 기획자용 의료 서비스 기획 지원 플러그인입니다.

## 프로젝트 구조

- `skills/` — 스킬 정의
- `commands/` — 커맨드 정의
- `agents/` — 에이전트 정의
- `hooks/` — 훅 설정
- `.mcp.json` — MCP 서버 설정
- `.claude-plugin/` — 플러그인 매니페스트 및 마켓플레이스 설정

## 개발 가이드

- 새 스킬 추가: `skills/<name>/SKILL.md` 생성 후 `plugin.json`에 등록
- 새 커맨드 추가: `commands/<name>.md` 생성 후 `plugin.json`에 등록
- 새 에이전트 추가: `agents/<name>.md` 생성 후 `plugin.json`에 등록
