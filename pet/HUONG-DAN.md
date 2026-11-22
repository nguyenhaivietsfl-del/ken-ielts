# KEN PET Practice – Hướng dẫn cài đặt

Cách làm giống hệt web IELTS, chỉ là một dự án mới, tách riêng.

## Gồm những gì
- `index.html`, `data/`, `img/`: trang web gồm 12 đề × 4 kỹ năng.
  - Reading 12 bài, Listening 11 bài (thiếu Succeed Test 3 vì chưa có đáp án): chấm tự động.
  - Writing 12 bài, Speaking 12 bài (ghi âm): gửi về Google Sheet / Google Drive để giáo viên chấm.
- `audio/`: 11 file nghe, mỗi đề một file đã ghép đủ 4 part (SC1.mp3 … SC8.mp3, B1T1.mp3 … B1T4.mp3). Giải nén gói audio vào thư mục này.
- `Code.gs` + `PetKeys.gs`: máy chủ Google Apps Script. Máy chủ chấm điểm và lưu kết quả. Đáp án chỉ nằm trên máy chủ nên học viên không xem được.

## Bước 1 – Tạo máy chủ (Google Sheet + Apps Script)
1. Tạo một Google Sheet mới, đặt tên "KEN PET – Kết quả".
2. Vào Tiện ích (Extensions) → Apps Script. Xóa nội dung có sẵn rồi dán toàn bộ `Code.gs`.
3. Bấm dấu + (Tệp) → Tập lệnh, đặt tên `PetKeys`, rồi dán toàn bộ `PetKeys.gs`.
4. Ở dòng `const ADMIN_PASSWORD = 'ken2026';`, đổi mật khẩu giáo viên nếu muốn. Bấm Lưu.
5. Chọn hàm `setup` → Chạy, rồi cấp quyền (Advanced → Go to … → Allow).
6. Vào Triển khai (Deploy) → Tùy chọn triển khai mới, chọn loại "Ứng dụng web":
   - Thực thi dưới dạng: Tôi
   - Người có quyền truy cập: Bất kỳ ai
   
   Bấm Triển khai, rồi sao chép đường link kết thúc bằng `/exec`.

## Bước 2 – Gắn link máy chủ vào web
Mở `index.html` bằng Notepad, tìm dòng `API_URL: '',` rồi dán link vào giữa hai dấu nháy:
`API_URL: 'https://script.google.com/macros/s/....../exec',`
Sau đó bấm Lưu.

## Bước 3 – Đưa web lên GitHub
1. Vào github.com → New repository, đặt tên `ken-pet`, chọn Public → Create.
2. Bấm "uploading an existing file", kéo thả `index.html` cùng hai thư mục `data` và `img` → Commit.
3. Upload thư mục `audio`. Mỗi file dưới 19 MB nên tải qua web được; nếu báo lỗi thì chia 2–3 lượt.
4. Vào Settings → Pages → Branch: `main` / `(root)` → Save. Sau 1–2 phút sẽ có link
   `https://nguyenhaivietsfl-del.github.io/ken-pet/`.

## Quy chế đã cài sẵn
Muốn đổi thì sửa `CONFIG` ở đầu phần script của `index.html`.
- **Reading:** 45 phút, 32 câu, chỉ được nộp sau 35 phút (`READING_LOCK_MIN`). Hết giờ bài tự nộp.
  - Câu trắc nghiệm: bấm chọn đáp án.
  - Part 6: gõ một từ, tự chuyển thành chữ thường.
  - Bài đọc có chia đôi màn hình và tô vàng như web IELTS.
- **Listening:** audio phát MỘT LẦN DUY NHẤT, không tua, không dừng.
  - Trong file audio, mỗi đoạn đã được đọc 2 lần như thi thật.
  - Tải lại trang thì audio chạy tiếp đúng theo giờ thật, không nghe lại được.
  - Thời gian = độ dài audio + 2 phút kiểm tra. Chỉ nộp được khi audio kết thúc.
  - Part 3 tự chuyển thành CHỮ IN HOA.
- **Giám sát:** các hành vi sau đều bị cảnh báo và ghi lại: rời tab, chuyển ứng dụng/cửa sổ, thoát toàn màn hình, chia đôi màn hình. Đến lần thứ 5 bài tự nộp (`MAX_VIOLATIONS`). Không cho sao chép, dán hay bấm chuột phải.
- **Kết quả:** quy đổi ra thang điểm Cambridge (ước tính) và trình độ A2 / B1 / B2. Kết quả gửi về trang tính "Results"; khu vực giáo viên có lọc kết quả và tải file Excel.

## Writing và Speaking
- **Writing:** 45 phút, Part 1 email + Part 2 chọn article hoặc story, đếm từ tự động, cấm dán chữ, giám sát như Reading. Bài nộp nằm ở trang tính **Writing**; giáo viên ghi điểm và nhận xét vào cột **Điểm** / **Nhận xét**.
- **Speaking:** kiểm tra micro, máy đọc câu hỏi tiếng Anh, ghi âm liên tục khoảng 12–14 phút (Part 1 phỏng vấn, Part 2 tả 2 ảnh, Part 3 tình huống 2 phút, Part 4 câu hỏi mở rộng). File ghi âm lưu trong thư mục Drive **KEN PET – Bài nói**; trang tính **Speaking** có link file và mốc thời gian từng câu.
- Sau khi thay `Code.gs` mới phải chạy lại hàm `setup` (cấp thêm quyền Google Drive) rồi Triển khai → **Quản lý triển khai** → ✏️ Sửa → Phiên bản: **Phiên bản mới** → Triển khai. Link `/exec` giữ nguyên.

## Thêm đáp án Listening Succeed Test 3 sau này
Khi có đáp án, gửi cho Claude để bổ sung bài này vào web.
