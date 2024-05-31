read -p "Enter database username: " username
FP=./data-dump.sql
if [[ $1 ]];
then
    FP=$1
    FP+=/data-dump.sql
fi
mysqldump -u $username -p appointments > $FP