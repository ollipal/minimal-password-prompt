# Lines of code comparison

Only production lines are counted, so no test/dev files.

Done 2021-02-21, commit 8c65afe5c8d9eaabd2f07e454c872d41a97fc42d

Done with Python. To reproduce:

## minimal-password-prompt

Zero dependencies, only `index.js` so the line count is:

```
$ python -c "print(len(open('../index.js').readlines()))"
48
```

## password-prompt

Running these will print output production dependencies:

```
git clone git@github.com:jdxcode/password-prompt.git
cd password-prompt
npm install --global yarn
yarn install --production
npm list --prod --depth=10 --parseable true
```

Save the output to a file called `pkgs.txt` in `misc/`.

Then to figure out dependency main files, I used:

```python
import json
import os

print("Main files:")
with open('pkgs.txt') as f:
   for line in f:
       line = line.rstrip()
       with open(os.path.join(line, "package.json")) as json_file:
            data = json.load(json_file)
            if "main" in data:
                print(data["main"])
```

output:

```
Main files:
index.js
index.js
src/index.js
semver.js
which.js
index.js
```

With that info, I could create script using `find` command to find the source files:

```python
import os
INSTALL_PATH = # YOUR password-prompt INSTALL PATH

print("Line counts:")
total_line_count = 0
with open('pkgs.txt') as f:
   for line in f:
       line = line.rstrip()
       files = os.popen(f"cd {line} && find index.js semver.js which.js lib/ src/ -type f 2>/dev/null").read()
       for f2 in files.split("\n"):
            if f2 != "": # skip empty
                file_path = os.path.join(line, f2)
                line_count = len(open(file_path).readlines())
                print(file_path[len(INSTALL_PATH):], line_count)
                total_line_count += line_count

print(f"\nTotal line count: {total_line_count}")
```

Output:

```
Line counts:
password-prompt/index.js 115
password-prompt/node_modules/ansi-escapes/index.js 122
password-prompt/node_modules/cross-spawn/index.js 39
password-prompt/node_modules/cross-spawn/lib/enoent.js 59
password-prompt/node_modules/cross-spawn/lib/util/resolveCommand.js 47
password-prompt/node_modules/cross-spawn/lib/util/escape.js 45
password-prompt/node_modules/cross-spawn/lib/util/readShebang.js 32
password-prompt/node_modules/cross-spawn/lib/parse.js 125
password-prompt/node_modules/nice-try/src/index.js 13
password-prompt/node_modules/path-key/index.js 13
password-prompt/node_modules/semver/semver.js 1324
password-prompt/node_modules/shebang-command/index.js 19
password-prompt/node_modules/which/which.js 135
password-prompt/node_modules/shebang-regex/index.js 2
password-prompt/node_modules/isexe/index.js 57

Total line count: 2147
```
