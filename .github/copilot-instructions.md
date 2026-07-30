---
applyTo: "**"
---

## 项目介绍

本项目是采用 Gatsby 框架编写的静态网站，用来托管我的《机器学习》的作业。

## 工作流

本项目根目录有 package.json ，用来执行常用命令，比如：

- pnpm test 可以用来跑测试

等等。

## 工作方式

代码改动不要自动提交，更不要推送！这些都是由用户来审查之后手动执行的工作，不要越俎代庖。

## 强制前置步骤（每次任务开始前必须执行）

**在写任何代码之前，必须先完成以下步骤：**

1. **加载 skills：** 用 read_file 读取所有可用 skill 的 SKILL.md 文件，判断哪些适用于当前任务。
2. **遵循 skill 指导：** 如果任务涉及功能实现或 bug 修复，必须先读取并遵循 `test-driven-development` skill（先写测试、看到失败、再写实现）。
3. **在 todo list 中体现 skill 步骤：** 例如 TDD 任务的 todo list 必须包含"写失败测试"、"验证测试失败"、"写最少实现"、"验证测试通过"等步骤。
4. **不要陷入循环**： 如果发现自己总是在输出循环的内容，要立即停止，并询问用户下一步该怎么做。比如最近输出的文本内容在前面没多久其实已经输出过了，甚至有很多次重复的输出内容，这就是陷入了循环的表现。即：禁止重复说明计划。如果连续两轮你的计划没有变化，立即停止规划，直接执行下一步动作。不要再次解释你将要做什么。直接开始行动。Planning <= 1，超过一次 planning视为失败。必须输出 Action。
5. When using terminal:
  - Avoid commands with large output.
  - Always limit output with head/tail.
  - Prefer:
    git status --short
    git log -10 --oneline
    find ... | head -50
  - If a command appears stuck for more than 30 seconds, stop and continue.

⚠️ 如果跳过以上步骤直接写实现代码，视为违规。