cd C:\Users\Administrator\.openclaw\workspace\tools\dydx-bot
Remove-Item -Recurse -Force .git
git init
@"
node_modules/
.env
npm-debug.log
"@ > .gitignore
git add bot.js package.json README.md DEPLOYMENT.md setup_deploy.ps1 .gitignore
git commit -m "init dYdX rebate bot"
git branch -M main
git remote add origin https://github.com/jackchen55668899-ui/dydx-rebate-bot.git
git push -u origin main
