read -p "Enter database username: " username
mysqldump -u $username -p appointments > ./backup.sql