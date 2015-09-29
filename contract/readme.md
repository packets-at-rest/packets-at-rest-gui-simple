# Contract for GUI-SIMPLE

Use the 'rest-assured' ruby gem to stub out the interaction from the
the server for testing.

## Start the Contract Server

Start the Contract / Stub Server

```shell
gem install rest-assured
cd contract
rest-assured
```

This should load the sqlite3 `rest-assured.db`.

Then use the Collector `rest-assured` in the gui to make requests.

You can view the contract server on http://localhost:4578

### Form Filler

Here is an Example Saved Form in "Web Developer Form Filler" for Chrome (https://github.com/abzubarev/web-developer-form-filler-ext)

```
{"url":"file:///home/shadowbq/sandbox/github-shadowbq/packets-at-rest-gui-simple/www/index.html","autoSubmit":false,"submitQuery":"","content":"{\"collector-selector\":\"http://localhost:4578\",\"api_key\":\"27ee688c-c412-43f8-ad67-ee5287b59e80\",\"start_time\":\"2015-09-23 7:01 am\",\"end_time\":\"2015-09-23 7:30 am\",\"src_addr\":\"1.1.1.1\",\"dst_addr\":\"1.1.1.2\",\"src_port\":\"10000\",\"dst_port\":\"80\",\"sensor-selector\":\"1\"}","name":"Working","hotkey":""}
```
