## Crossmarket project (Giannetti, Cordoni, Chapkovski)
### Instructions: how to launch the server


First you need to install all dependencies:

```shell
pip install -r requirements.txt 
```

Second, you need to install and start Redis server
The simplest instructions on installation both for MacOS and Linux are [available here](https://flaviocopes.com/redis-installation/).

For **MacOS**:

Installation: `brew install redis`

Start the service: `brew services start redis`

------


For Linux **Ubuntu** both installation and service launch: `sudo apt-get install redis-server` 

You can always check that the Rdis server is running by typing in any terminal window:

```shell
redis-cli ping 
```
And you should get the response: `PONG`


-------
As soon as Redis is launched you can start both processes. One process is the main oTree server. It is launched by the command

```shell
otree prodserver 
```

The second process is responsible for scheduled calls made by noise traders. It is launched (in a separate terminal window):

```shell
otree run_huey 
```


As soon as both processes are running, you can access the local server in any browser at the address <https://localhost:8080>