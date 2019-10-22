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

export function build(name, tagLatest = false){
  const tag = moment().format('YYYYMMDD_HH.mm')
  const repo = `${name}:${tag}`
  console.log(repo.cyan)
  ensure_git_clean()
  build_img(repo)
  if ( tagLatest ) {
    tryExec(`docker tag ${repo} ${name}:latest`)
  } 
  git_tag(tag)
  console.log(`================== img done ==================`.green)
}

// 取一个镜像最新的tag
export function newest_tag(name) {
  const res = exec(`docker images`, {silent:true}).toString()

  // 先取到第一行
  const line = RegExp(`^${name}\\b.*$`, 'm').exec(res)[0]

  // 再取到tag
  const theTag = /\S+\s+(\S+)/.exec(line)[1]

  return theTag
}

// 将一个镜像发布到远端镜像库
export function publish(name, dists, tag = '', dist_tag = ''){
  if ( !tag ) {
    tag = newest_tag(name)
  } 
  if ( !dist_tag ) {
    dist_tag = tag
  } 

  for (const dist of dists.split(',')) {
    const repo = `${dist}/${name}:${dist_tag}`
    console.log(repo.cyan)
    tryExec(`docker tag ${name}:${tag} ${repo}`)
    tryExec(`docker push ${repo}`)
    tryExec(`docker rmi ${repo}`)
  }
}

