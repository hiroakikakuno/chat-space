
json.message  @message.content
json.image  @message.image
json.user_id  @message.user.id
json.user_name  @message.user.name
json.time  @message.created_at.strftime("%Y/%m/%d %H:%M")
json.id @message.id

