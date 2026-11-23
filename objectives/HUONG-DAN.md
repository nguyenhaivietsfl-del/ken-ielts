# KEN – Lesson Planning with ICT in ELT – Hướng dẫn cài đặt

Web cho SV soạn giáo án (Tiếng Anh 11 Global Success – Unit 2), chọn 1 trong 2 đề:
- **Đề 1:** Lesson 6 – Writing: An opinion essay about limiting teenagers’ screen time (SGK tr. 24)
- **Đề 2:** Lesson 7 – Communication and Culture/ CLIL (SGK tr. 25–26)

SV soạn trên khung giáo án có sẵn (giống Word: in đậm, nghiêng, gạch đầu dòng, chèn/kẻ bảng, thêm hàng/cột):
I. OBJECTIVES – II. TEACHING AIDS – III. PROCEDURES (A. Organization, B. New lesson). Ở B. New lesson SV chỉ soạn **MỘT hoạt động có ứng dụng ICT in ELT** (chọn trong danh sách). Thời gian 60 phút, điểm tối đa 10.

## Bước 1 – Máy chủ (Google Sheet + Apps Script)
1. Tạo Google Sheet mới, đặt tên "KEN Lesson Planning – Kết quả".
2. Tiện ích → Apps Script, xóa nội dung có sẵn, dán toàn bộ `Code.gs`. Đổi `ADMIN_PASSWORD` nếu muốn.
3. Gắn 2 khóa API: Cài đặt dự án (⚙️) → Thuộc tính tập lệnh → thêm
   - `CLAUDE_API_KEY` = khóa Claude
   - `OPENAI_API_KEY` = khóa OpenAI
   (Dùng lại 2 khóa đã gắn cho web IELTS/PET được.)
4. Chọn hàm `setup` → Chạy → cấp quyền. Chạy thêm `testKeys` để thử khóa (xem Nhật ký thực thi).
5. Triển khai → Tùy chọn triển khai mới → Ứng dụng web; Thực thi: Tôi; Truy cập: Bất kỳ ai → sao chép link `/exec`.

## Bước 2 – Gắn link vào web
Trong `objectives/index.html`, tìm `API_URL: '',` và dán link `/exec` vào giữa hai dấu nháy (hoặc gửi link cho Claude gắn giúp).

## Chấm điểm (AI)
Claude và OpenAI chấm song song, điểm AI = trung bình; một bên lỗi thì dùng bên còn lại. 7 tiêu chí = 10 điểm:
Objectives – Knowledge & Linguistic 2 · Objectives – General, NLS, NL AI, Attitudes 1,5 · Teaching aids 0,5 · Aim(s)/Content(s)/Expected products 1,5 · Teaching steps 2 · Ứng dụng ICT in ELT 2 · Ngôn ngữ & trình bày 0,5.

Quy tắc viết mục tiêu được cài cho AI: mỗi mục tiêu chỉ gồm động từ + nội dung; **không** ghi tiêu chí/điều kiện như "at least 80%", "4 out of 5 questions correctly", "within the given time", "in 1–2 minutes", số từ… (những tiêu chí này thuộc Expected products). Có lỗi này AI trừ điểm và chỉ ra chỗ sửa.

Đổi cách chấm ở đầu `Code.gs`: `AI_ENGINE = 'both' | 'claude' | 'openai'`; đổi model ở `CLAUDE_MODEL`, `OPENAI_MODEL`.

## Giáo viên chữa bài
Khu vực giáo viên (cuối trang) → bấm vào một bài:
- Sửa thẳng trên giáo án của SV như Word; có chữ đỏ, tô vàng, gạch ngang để đánh dấu. Tab "Chỗ đã sửa" so sánh từng dòng.
- Nhập **Điểm GV** (0–10) và nhận xét → Lưu. Điểm cuối = điểm GV (nếu có), không thì điểm AI.
- Chấm lại bằng AI (cả hai / chỉ Claude / chỉ OpenAI); tải Excel.
- SV xem điểm, nhận xét, bài đã chữa và chỗ GV sửa ở **Kết quả của tôi** (đúng họ tên + mã SV).

Sau khi sửa `Code.gs`: Triển khai → Quản lý triển khai → ✏️ → Phiên bản mới → Triển khai (link giữ nguyên).
