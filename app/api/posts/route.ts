import fs from 'fs';
import path from 'path';

// Path ของไฟล์ data.json
const filePath = path.resolve(process.cwd(), 'data.json');

// อ่านข้อมูลจากไฟล์ JSON
const readData = () => {
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(jsonData);
};

// เขียนข้อมูลลงในไฟล์ JSON
const writeData = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

// API Handler
export async function GET(request) {
    const data = readData();
    return new Response(JSON.stringify(data), { status: 200 });
}

export async function POST(request) {
    const newPost = await request.json();
    const data = readData();
    const newId = data.length ? data[data.length - 1].id + 1 : 1;
    const updatedData = [...data, { id: newId, ...newPost }];
    writeData(updatedData);
    return new Response(JSON.stringify({ id: newId }), { status: 201 });
}

export async function PUT(request) {
    const { id, ...rest } = await request.json(); // รับข้อมูลจาก body
    const data = readData(); // อ่านข้อมูลจากไฟล์
    const index = data.findIndex((post) => post.id === id); // ค้นหาโพสต์ตาม ID

    if (index === -1) {
        return new Response(JSON.stringify({ message: 'Post not found' }), { status: 404 });
    }

    data[index] = { id, ...rest }; // อัปเดตข้อมูล
    writeData(data); // เขียนข้อมูลใหม่ลงในไฟล์
    return new Response(JSON.stringify(data[index]), { status: 200 }); // ส่งโพสต์ที่อัปเดตกลับ
}

export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id'));
    const data = readData();
    const updatedData = data.filter((post) => post.id !== id);

    if (data.length === updatedData.length) {
        return new Response(JSON.stringify({ message: 'Post not found' }), { status: 404 });
    }

    writeData(updatedData);
    return new Response(JSON.stringify({ id }), { status: 200 });
}
