import { UserStatus } from 'meteor/mizzao:user-status';

UserStatus.events.on("connectionLogin", function(fields) {
  // Lấy ID người dùng đã đăng nhập
  const userId = fields.userId;

  // Cập nhật trạng thái người dùng trong cơ sở dữ liệu
  Meteor.users.update(userId, { $set: { status: "online" } });
});

UserStatus.events.on("connectionLogout", function(fields) {
  // Lấy ID người dùng đã đăng xuất
  const userId = fields.userId;

  // Cập nhật trạng thái người dùng trong cơ sở dữ liệu
  Meteor.users.update(userId, { $set: { status: "offline" } });
});