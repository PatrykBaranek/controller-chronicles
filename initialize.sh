clientNewEnvPath="./client/.env.local";
serverNewEnvPath="./server/.env";

echo "Initializing client variables";

if [ -f $clientNewEnvPath ]; then
  echo "File already exists. Removing and creating new version"
  rm $clientNewEnvPath
  touch $clientNewEnvPath
else
  touch $clientNewEnvPath
fi

cat "./client/.env.example" > $clientNewEnvPath

echo "Initializing server variables";

if [ -f $serverNewEnvPath  ]; then
  echo "File already exists. Removing and creating new version"
  rm $serverNewEnvPath 
  touch $serverNewEnvPath 
else
  touch $serverNewEnvPath 
fi

cat "./server/.env.example" > $serverNewEnvPath 

echo "Environment variables initialized. Please add values to them"
exit 0
