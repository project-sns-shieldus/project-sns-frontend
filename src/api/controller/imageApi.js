import instance from '../axiosInstance';

export const imageApi = {
    createImage: (postId, fileName) => instance.post('/api/images', null, { params: { postId, fileName } }),

    getImagesByPostId: (postId) => instance.get(`/api/images/post/${postId}`),

    getImageById: (imageId) => instance.get(`/api/images/${imageId}`),

    deleteImage: (imageId) => instance.delete(`/api/images/${imageId}`),
};