#!/usr/bin/env node

import commander from 'commander';
import prompts from 'prompts';
import { addCommit } from '../lib/scripts/commit';
import { addEslint } from '../lib/scripts/eslint';
import { addRelease } from '../lib/scripts/release';
import { selectListOption, ChoiceEnum } from '../lib/selects'
import { installDeps, logFn } from '../lib/utils';

interface Command extends commander.Command {
  dep: ChoiceEnum[];
}

const program: Command = commander.program as Command;

async function start() {
  program
    .option('-D, --dep [dep...]', '需要集成的工具')
    .parse(process.argv);
  let { dep } = program.opts()

  if (dep === undefined) {
    const { value } = await prompts(selectListOption)
    dep = Array.isArray(value) ? value : value ? [value] : []
    if (!dep?.length) {
      throw new Error(`必须选择dep`)
    }
  }

  const hasEditorConfig = dep.includes(ChoiceEnum.editorConfig)
  const hasTs = dep.includes(ChoiceEnum.ts)
  const hasEslint = dep.includes(ChoiceEnum.eslint)
  const hasCommit = dep.includes(ChoiceEnum.commit)
  const hasRelease = dep.includes(ChoiceEnum.release)

  if (hasEslint) {
    logFn(() => addEslint(hasEditorConfig, hasTs), `eslint`)
  }
  if (hasCommit) {
    logFn(() => addCommit(), `commit`)
  }
  if (hasRelease) {
    logFn(() => addRelease(), `release`)
  }

  installDeps()
}

start()