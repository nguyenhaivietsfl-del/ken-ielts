# KEN – Lesson Plan OBJECTIVES – Hướng dẫn cài đặt

Web cho SV viết phần **I. OBJECTIVES** của giáo án (Tiếng Anh 11 Global Success – Unit 2), chọn 1 trong 2 đề:
- **Đề 1:** Lesson 6 – Writing: An opinion essay about limiting teenagers’ screen time (SGK tr. 24)
- **Đề 2:** Lesson 7 – Communication and Culture/ CLIL (SGK tr. 25–26)

Khung đề mục lấy theo KHBD mẫu Unit 2 – Tiếng Anh 10 (Period 15 Writing, Period 16 CLIL). Thời gian 30 phút, điểm tối đa 10.

## Bước 1 – Máy chủ (Google Sheet + Apps Script)
1. Tạo Google Sheet mới, đặt tên "KEN Objectives – Kết quả".
2. Tiện ích → Apps Script, xóa nội dung có sẵn, dán toàn bộ `Code.gs`. Đổi `ADMIN_PASSWORD` nếu muốn.
3. Gắn 2 khóa API: Cài đặt dự án (⚙️) → Thuộc tính tập lệnh → thêm
   - `CLAUDE_API_KEY` = khóa Claude (sk-ant-…)
   - `OPENAI_API_KEY` = khóa OpenAI (sk-…)
   (Có thể dùng lại đúng 2 khóa đã gắn cho web IELTS/PET.)
4. Chọn hàm `setup` → Chạy → cấp quyền. Có thể chạy `testKeys` để thử khóa (xem Nhật ký thực thi).
5. Triển khai → Tùy chọn triển khai mới → Ứng dụng web; Thực thi: Tôi; Truy cập: Bất kỳ ai → sao chép link `/exec`.

## Bước 2 – Gắn link vào web
Trong `objectives/index.html`, tìm `API_URL: '',` và dán link `/exec` vào giữa hai dấu nháy.

## Chấm điểm
- Nộp bài xong, **Claude và OpenAI chấm song song** theo 7 tiêu chí (Knowledge 2 · General 1 · Linguistic 2,5 · Digital 1,5 · AI 1,5 · Attitudes 0,5 · Ngôn ngữ & tính đo lường 1 = 10 điểm). Điểm AI = trung bình hai bên; nếu một bên lỗi thì dùng bên còn lại.
- Đổi cách chấm ở đầu `Code.gs`: `AI_ENGINE = 'both' | 'claude' | 'openai'`; đổi model ở `CLAUDE_MODEL`, `OPENAI_MODEL`.
- Đáp án tham khảo và tiêu chí chỉ nằm trong `Code.gs` (SV không xem được).

## Giáo viên chữa bài
Khu vực giáo viên (cuối trang) → bấm vào một bài:
- Sửa trực tiếp từng mục; phần thay đổi hiện màu (đỏ = bỏ, xanh = thêm). Có nút chép bản gợi ý của AI vào ô chữa.
- Nhập **Điểm GV** (0–10) và nhận xét → Lưu. Điểm cuối = điểm GV (nếu có), không thì điểm AI.
- Có thể chấm lại bằng AI (cả hai / chỉ Claude / chỉ OpenAI) và tải Excel.
- SV xem điểm, nhận xét và bài chữa ở **Kết quả của tôi** (cần đúng họ tên + mã SV).

Sau khi sửa `Code.gs`: Triển khai → Quản lý triển khai → ✏️ → Phiên bản mới → Triển khai (link giữ nguyên).
