# Description

Необходимо разработать страницу, на которой:

1) В зависимости от выбранного года меняется контент в нижнем блоке (Это реализация раздела истории)

2) Кораблик должен перемещаться от выбранного года к вновь выбранному по траектории кривой. То есть, не прямо, не фейдом, а именно движением по кривой. 

3) Перемещаться кораблик должен как на следующий год, так и через один год, от 2001 до 2013 с одинаковой скоростью. 

# Build

```bash
yarn install
```
if development
```bash
yarn development
```

# Test

```bash
yarn test
```
if with mode watch files then
```bash
yarn test:watch
```
if view coverage then
```bash
yarn test:coverage
```

# Possible errors

[one error](https://stackoverflow.com/questions/16748737/grunt-watch-error-waiting-fatal-error-watch-enospc)

Solution
```
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```
[two error](https://github.com/sindresorhus/gulp-autoprefixer/issues/83)

Solution: update nodejs and remove folder node_modules and again make ```npm install```
