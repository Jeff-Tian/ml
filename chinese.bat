@echo off
REM 设置CMD代码页为UTF-8
chcp 65001
REM 设置Git配置
git config --global core.quotepath false
git config --global gui.encoding utf-8
git config --global i18n.commit.encoding utf-8
git config --global i18n.logoutputencoding utf-8
git config --global svn.pathnameencoding utf-8
REM 输出当前设置
echo Git中文显示配置已完成!

