import requests, json



def gpt(text, context):
    try:
        text = text.replace('"', '').replace("'", "").replace("\n", "\\n").replace('`', '')
        context = str(context).replace('"', '').replace("'", "").replace("\n", "\\n").replace('`', '')
        session = requests.Session()
        auth = authMindsdb()
        session.post('https://cloud.mindsdb.com/cloud/login', json={
            'email': auth[0],
            'password': auth[1]
        })
        resp = session.post('https://cloud.mindsdb.com/api/sql/query', json={'query':
                            f'''SELECT answer FROM mindsdb.contextgpt4 WHERE text = "{text}" AND context = "{context}"'''})
        resp = resp.json()
        return resp['data'][0][0]
    except Exception as e:
        return f'Fatal error: {e}'


def authMindsdb():
    with open('config.json', 'r') as f:
        data = json.loads(f.read())
    return data['mindsdb_login'], data['mindsdb_password']
