# Auto setup + deploy dYdX bot repo
# Usage: right click run with PowerShell or execute from PowerShell window

cd C:\Users\Administrator\.openclaw\workspace\tools\dydx-bot

git reset --hard

echo node_modules/ > .gitignore
echo .env >> .gitignore
echo npm-debug.log >> .gitignore

git add bot.js package.json README.md .gitignore

git commit -m "init dYdX rebate bot"
git branch -M main
git remote add origin https://github.com/jackchen55668899-ui/dydx-rebate-bot.git
git push -u origin main
