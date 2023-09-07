import json
import os
import boto3

AppId = os.environ['PinpointApplicationId']
def handler(event, context):
  client = boto3.client('pinpoint')
  print('received event:')
  print(event)
  message = json.loads(event['Records'][0]['Sns']['Message'])
  print(message)
  customerPhoneNumber = message['originationNumber']
  chatBotPhoneNumber = message['destinationNumber']
  client.send_messages(ApplicationId = AppId, MessageRequest={
            'Addresses': {
                customerPhoneNumber: {
                    'ChannelType': 'SMS'
                }
            },
            'MessageConfiguration': {
                'SMSMessage': {
                    'Body': "Texting back",
                    'MessageType': "TRANSACTIONAL",
                    'OriginationNumber': chatBotPhoneNumber
                }
            }
        })
  return 