# 17.10 — Một buổi tối dành cho Vy

Web sinh nhật tĩnh với nhân vật chibi, đường chạy Sài Gòn, chèo thuyền mùa mưa, đấu boss Răng Khôn và đoạn kết gia đình đón bằng bánh sinh nhật. Không cần cài thư viện để chạy website.

## Chạy thử

Chạy một static HTTP server tại `dist/`, ví dụ `python -m http.server 8080 --directory dist`, rồi mở `http://localhost:8080`.

Vuốt trái/phải để đổi làn, vuốt lên hoặc chạm để nhảy; dùng nút màn hình để chèo, né, đỡ và đánh. Có tạm dừng, bật/tắt âm thanh và nút **Xem tiếp câu chuyện**. Mọi nhánh đều dẫn đến sinh nhật, không có tăng ca như hình phạt. Âm thanh chỉ phát sau tương tác; chuyển ứng dụng sẽ tự tạm dừng.

## GitHub Pages

Workflow `.github/workflows/pages.yml` triển khai nguyên thư mục `dist/` khi push nhánh `master`. Trong repository Settings → Pages, chọn nguồn **GitHub Actions**. Đường dẫn dự kiến: `https://tranthiendatlagi.github.io/Vy_Birthday/` (chỉ hoạt động khi lần triển khai thành công).

Toàn bộ đường dẫn tài nguyên là tương đối, phù hợp GitHub Pages dưới tên repo. Repo và website có ảnh cá nhân; chọn quyền truy cập phù hợp trước khi chia sẻ. Không đưa token, file đóng gói hoặc thư mục `.qa/` lên repo.

## Nội dung và kiểm tra

- Ảnh, âm thanh: `dist/assets/`; nguồn và ghi chú trong `dist/assets/CREDITS.md`, `ART-DIRECTION.md`.
- Lời chúc: `dist/index.html`; cảnh cửa nhà, chuyển nhánh và nút xem tiếp: `dist/homecoming.js`.
- `node verify-home.cjs`: các nhánh về nhà, cửa mở, nhạc, pause/replay và bỏ qua thử thách.
- `node verify-world.cjs`: phối cảnh, xe cộ, va chạm và bố cục điện thoại.
- `node verify-combat.cjs`: sát thương, né/đỡ, má sưng đỏ và tái đấu.

Các kiểm tra mô phỏng và ảnh Canvas không thay thế thử trên điện thoại thật.
