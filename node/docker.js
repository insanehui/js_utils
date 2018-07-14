/*
 * 打镜像
 */
const fs = require('fs-extra')
const path = require('path')
const d = path.resolve.bind(null, __dirname)
import moment from 'moment'
import 'colors'

import {exec} from 'shelljs'
import {need} from './cmd_line.js'
import {tryExec} from './shell.js'

function ensure_git_clean() {
  const {stdout} = exec(`git status -s`)
  need(!stdout, 'git not clean')
}

function build_img(repo) {
  tryExec(`docker build -t ${repo} .`)
  const res = exec('docker images', {silent:true}).head({'-n' : 30})
  console.log(res.toString())
}

function git_tag(tag) {
  tryExec(`git tag ${tag}`)
}

export function build(name){
  const tag = moment().format('YYYYMMDD_HH.mm')
  const repo = `${name}:${tag}`
  console.log(repo.cyan)
  ensure_git_clean()
  build_img(repo)
  git_tag(tag)
  console.log(`================== img done ==================`.green)
}
