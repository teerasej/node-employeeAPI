# เลือก image เริ่มต้นแบบที่ติดตั้ง node เวอร์ชั่น 16
FROM node:16-alpine

# กำหนด path ไปที่ directory 
WORKDIR /usr/src/app

# สั่ง copy ไฟล์ package.json  ไปก่อน
COPY package*.json ./

# จากนั้นรันคำสั่งติดตั้ง package
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# ตามด้วย copy ไฟล์ทั้งหมดใน folder ไป
COPY . .

# กำหนดให้ image มีการเปิด port 3000 ให้ตอนที่สร้างเป็น container 
EXPOSE 3000

# ตอนทำงานให้รันทำสั่งต่อไปนี้
CMD [ "node", "index.js" ]