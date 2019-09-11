All are JSON
Standard type:
```
{
  "type": "text",
  "authorType":"system",  // or "client", "received" - probably need more options
  "data": {
    "text": "Welcome to customer service. Your custom channel is " + this.customChannel +". Someone will be right with you."
  }
}
```

```
{
  "type": "clientToServer",
  "content": "joined"
}
```

```
  "type": "serverToClient",
  "instruction": {
     "type": "join",  // or "leave"
     "channel": "NAMEOFCHANNEL"
    }
  }
```