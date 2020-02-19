echo "Serving yourAppName!"
serve -s build -l 443 --ssl-cert "./ssl/woordi.com.crt" --ssl-key "./ssl/woordi.com.key"
