// 获取帖子列表的过滤条件
const taskListFilter = {
  fields: ["id", "title", "author", "vote", "updatedAt"],
  limit: 10,
  order: "updatedAt DESC",
  include: "authorPointer",
  includefilter: { user: { fields: ["id", "username"] } }
};

// 获取帖子详情的过滤条件
const taskByIdFilter = id => ({
  fields: ["id", "title", "author", "vote", "updatedAt", "content"],
  where: { id: id },
  include: "authorPointer",
  includefilter: { user: { fields: ["id", "username"] } }
});

// 获取评论列表的过滤条件
const requireListFilter = taskId => ({
  fields: ["id", "author", "updatedAt", "content"],
  where: { task: taskId },
  limit: 20,
  order: "updatedAt DESC",
  include: "authorPointer",
  includefilter: { user: { fields: ["id", "username"] } }
});

function encodeFilter(filter) {
  return encodeURIComponent(JSON.stringify(filter));
}

export default {
  // 登录
  login: () => "/user/login",
  // 获取帖子列表
  getTaskList: () => `/task?filter=${encodeFilter(taskListFilter)}`,
  // 获取帖子详情
  getTaskById: id => `/task?filter=${encodeFilter(taskByIdFilter(id))}`,
  // 新建帖子
  createTask: () => "/task",
  // 修改帖子
  updateTask: id => `/task/${id}`,
  // 获取评论列表
  getRequireList: taskId =>
    `/require?filter=${encodeFilter(requireListFilter(taskId))}`,
  // 新建评论  
  createRequire: () => "/require"
};
