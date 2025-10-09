
import re
import json
import requests
from requests.exceptions import HTTPError, RequestException, Timeout

# defina aqui a URL do item (exemplo do Mercado Livre)
item_id_product='MLB4017798705'
item_id_2='MLB4134044669'
ITEM_ID='MLB3492556799'
token='APP_USR-3414621845496970-100816-d633d3c5efdf2b9355c45ad8d16dc96c-472633863'
product_id='MLB28574077'
seller_id='256258529'
def get_item():
    url = f"https://api.mercadolibre.com/sites/MLB/search?catalog_product_id=MLB28574077&offset=0&limit=1" 
    headers = {"Authorization": f"Bearer {token}"}
    try:
        r = requests.get(url, headers=headers, timeout=10)
        # Se der erro, mostre o corpo para diagnosticar
        try:
            r.raise_for_status()
        except HTTPError as e:
            print("Status:", r.status_code)
            print("Headers:", dict(r.headers))
            # Tente exibir JSON legível; se não for JSON, mostre texto bruto
            try:
                print("Body JSON:", r.json())
            except Exception:
                print("Body:", r.text[:1000])
            raise e

        return r.json()

    except Timeout:
        print("Timeout ao chamar o endpoint.")
    except RequestException as e:
        print("Erro de rede:", e)

if __name__ == '__main__':
    result=get_item()
    print('result: ',result)

    