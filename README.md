# chat-space DB統計

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|name|string|null: false|
|email|string|null: false|
|password|string|null: false|

### Association
- has_many messages
- has_many group_users
- has_many groups through: :group_users

## messsagesテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer| |
|body|text| |
|image|string| |
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to group

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false, foreign_key: true|
|group_name|string|null: false|

### Association
- has_many messages
- has_many group_users

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
