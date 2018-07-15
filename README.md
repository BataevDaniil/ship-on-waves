# Description

* When pressed on text a ship begin motion to appropriate point a text.
* In mode edit you can:
  * Drag and drop point.
  * Remove point by double click.
  * Edit text.
  * Create new point in mode edit when click on empty place.

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
