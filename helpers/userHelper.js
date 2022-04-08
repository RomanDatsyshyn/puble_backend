const users = [];

// Join user to chat
const newUser = (id, username, room) => users.push({ id, username, room });

// Get current user
const getActiveUser = (id) => {
  return users.find((user) => user.id === id);
};

// User leaves chat
const exitRoom = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

// Get room users
const getIndividualRoomUsers = (room) => {
  return users.filter((user) => user.room === room);
};

module.exports = {
  newUser,
  getActiveUser,
  exitRoom,
  getIndividualRoomUsers,
};
