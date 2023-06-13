

export const baseApi = 'http://localhost:8888'

export const signUpApi = `${baseApi}/users/signup`;
/**
 * @method POST
 *
*/

export const signInApi = `${baseApi}/users/signin`;
/**
 * @method POST
 *
*/

export const createUserDetail = `${baseApi}/users-detail`
/**
 * @method POST
 *
*/

export const getUserDetail = `${baseApi}/users-detail/get-detail`
/**
 * @method GET
 *
*/

export const getUserDetailById = `${baseApi}/users-detail/get-detail-id`
/**
 * @method GET
 *
*/

export const uploadUserImage = `${baseApi}/users/users-photo`
/**
 * @method POST
 *
*/

export const uploadUserImageToServer = `${baseApi}/users/users-photo/upload-photo-to-server`
/**
 * @method POST
 *
*/

export const uploadPostImageToServer = `${baseApi}/users-post/upload-post-photo-to-server`
/**
 * @method POST
 *
*/

export const getUserPhotoUrl = `${baseApi}/users/users-photo`
/**
 * @method GET
 *
*/

export const sendPost = `${baseApi}/users-post/send-post`
/**
 * @method POST
 *
*/

export const updatePost = `${baseApi}/users-post/update-post`
/**
 * @method PUT
 *
*/

export const deletePost = `${baseApi}/users-post/delete`
/**
 * @method DELETE
 *
*/

export const getAllUsersPost = `${baseApi}/users-post/user-all-post`
/**
 * @method GET
 *
*/

export const getAllUsers = `${baseApi}/users/all`
/**
 * @method GET
 *
*/


export const getAllFollow = `${baseApi}/users-follow/getAllFollow`
/**
 * @method GET
 *
*/

export const followOtherPeople = `${baseApi}/users-follow`
/**
 * @method POST
 *
*/

export const getAllPost = `${baseApi}/users-post/all-post`
/**
 * @method GET
 *
*/

export const getPostDetail = `${baseApi}/users-post/post-detail`
/**
 * @method GET
 *
*/

export const postLikeAPost = `${baseApi}/post-likes`
/**
 * @method POST
 *
*/

export const postCommentAPost = `${baseApi}/post-comment`
/**
 * @method POST
 *
*/

export const getPostAllComment = `${baseApi}/users-post/all-comment/:id`
/**
 * @method POST
 *
*/

export const createBtwChatRoom = `${baseApi}/chat-room/create-btw-chatroom`
/**
 * @method POST
 *
*/

export const getAllUserNotification = `${baseApi}/users-notification`
/**
 * @method GET
 *
*/

export const putReadUserNotification = `${baseApi}/users-notification/read-notification`
/**
 * @method PUT
 *
*/

export const userChangePassword = `${baseApi}/users/change-password`
/**
 * @method PUT
 *
*/
