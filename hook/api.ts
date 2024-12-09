const BASE_URL = '/api/posts';

// GET: ดึงข้อมูลโพสต์
export const getPosts = async () => {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error('Failed to fetch posts');
    return response.json();
};

// POST: สร้างโพสต์ใหม่
export const createPost = async (data) => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create post');
    return response.json();
};

// PUT: อัพเดตโพสต์
export const updatePost = async (id, data) => {
    const response = await fetch(BASE_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...data }), // ส่ง id และข้อมูลใหม่ไปยัง API
    });
    if (!response.ok) throw new Error('Failed to update post');
    return response.json(); // ส่งข้อมูลที่แก้ไขแล้วกลับ
};

// DELETE: ลบโพสต์
export const deletePost = async (id) => {
    const response = await fetch(`${BASE_URL}?id=${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete post');
    return id;
};


